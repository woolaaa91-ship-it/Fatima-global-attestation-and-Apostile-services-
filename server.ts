import express, { type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {
  type KnowledgeRecord,
  type ResearchBudgetLedger,
  type DocumentCategory,
  type OfficialSourceCitation,
  INITIAL_BUDGET_LEDGER,
  INITIAL_KNOWLEDGE_RECORDS,
  PRIORITY_RESEARCH_QUEUE,
  buildKnowledgeRecordId,
} from "./src/data/knowledgeBase.ts";
import {
  resolveRouteSEO,
  generateRobotsTxt,
  generateSitemapXml,
} from "./src/utils/seo.ts";
import { getVisaChecklistByPath } from "./src/data/visaChecklists.ts";
import {
  TrackingRepository,
  TrackingRateLimiter,
  generateOrderQrCodeBundle,
  buildReceiptQrTargetUrl,
  validateCanonicalTrackingDomain,
  isProductionEnvironment,
  resolveSafeDevOrigin,
  resolveWritableDataDir,
  atomicWriteFileSync,
  generateUniqueTrackingId,
  toPublicTrackingOrderView,
  sanitizePlainText,
} from "./src/services/trackingStoreServer.ts";
import {
  validateGovernmentVerificationUrl,
  ADMIN_STAFF_ROLES,
  type AdminStaffRole,
} from "./src/data/trackingTypes.ts";
import {
  getEsanadAdapterStatus,
  requestOfficialEsanadVerification,
} from "./src/services/esanadIntegration.ts";
import {
  getWhatsAppBusinessApiStatus,
  dispatchOrPrepareCustomerWhatsApp,
  buildCustomerWhatsAppTrackingMessage,
  buildManualWhatsAppShareUrl,
} from "./src/services/whatsappIntegration.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = resolveWritableDataDir(path.resolve(__dirname, "data"));
const STORE_FILE = path.join(DATA_DIR, "knowledge_store.json");
const LOCAL_ADMIN_TOKEN_FILE = path.join(DATA_DIR, ".admin_token");

const MAX_BUDGET_HARD_CAP = 2000;
const DEFAULT_CONSERVATIVE_LIMIT = 200;

// Concurrency & duplicate in-flight guards
const inFlightResearchIds = new Set<string>();
let isBatchRunning = false;

interface PersistentKnowledgeStore {
  ledger: ResearchBudgetLedger;
  records: KnowledgeRecord[];
  updatedAt: string;
}

export interface AdminTokenConfigResult {
  token: string | null;
  source: "env" | "local_file" | "unconfigured_production";
  isProduction: boolean;
  configured: boolean;
  configurationError: string | null;
}

/**
 * Retrieves the server-side admin token configuration.
 * - In production (NODE_ENV=production), strictly requires an explicitly configured
 *   TRACKING_ADMIN_TOKEN environment variable (minimum 16 chars, non-placeholder).
 *   Fails securely if missing; NEVER generates or returns a local preview fallback token.
 * - In isolated local development (NODE_ENV !== "production"), uses TRACKING_ADMIN_TOKEN
 *   if set, or falls back to a 0600 local preview token file in data/.admin_token.
 */
let fallbackMemoryAdminToken: string | null = null;

export function getConfiguredAdminToken(
  envOverride?: NodeJS.ProcessEnv
): AdminTokenConfigResult {
  const env = envOverride || process.env;
  const isProd = isProductionEnvironment(env);

  const rawTrackingToken = (env.TRACKING_ADMIN_TOKEN || "").trim();
  const rawKnowledgeToken = !isProd
    ? (env.KNOWLEDGE_ADMIN_TOKEN || "").trim()
    : "";
  const candidateEnvToken = rawTrackingToken || rawKnowledgeToken;

  const isPlaceholder =
    !candidateEnvToken ||
    candidateEnvToken === "SET_STRONG_ADMIN_SECRET_TOKEN" ||
    candidateEnvToken === "YOUR_ADMIN_TOKEN";

  if (!isPlaceholder && candidateEnvToken.length >= 16) {
    return {
      token: candidateEnvToken,
      source: "env",
      isProduction: isProd,
      configured: true,
      configurationError: null,
    };
  }

  if (isProd) {
    return {
      token: null,
      source: "unconfigured_production",
      isProduction: true,
      configured: false,
      configurationError:
        "Production admin authentication is not configured. Set a strong TRACKING_ADMIN_TOKEN environment variable (minimum 16 characters) on the server.",
    };
  }

  // Isolated development / preview environment only
  if (!isPlaceholder && candidateEnvToken.length >= 8) {
    return {
      token: candidateEnvToken,
      source: "env",
      isProduction: false,
      configured: true,
      configurationError: null,
    };
  }

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LOCAL_ADMIN_TOKEN_FILE)) {
      const saved = fs.readFileSync(LOCAL_ADMIN_TOKEN_FILE, "utf-8").trim();
      if (saved.length >= 16) {
        return {
          token: saved,
          source: "local_file",
          isProduction: false,
          configured: true,
          configurationError: null,
        };
      }
    }

    const generated = crypto.randomBytes(24).toString("hex");
    atomicWriteFileSync(LOCAL_ADMIN_TOKEN_FILE, generated, 0o600);
    return {
      token: generated,
      source: "local_file",
      isProduction: false,
      configured: true,
      configurationError: null,
    };
  } catch {
    if (!fallbackMemoryAdminToken) {
      fallbackMemoryAdminToken = crypto.randomBytes(24).toString("hex");
    }
    return {
      token: fallbackMemoryAdminToken,
      source: "local_file",
      isProduction: false,
      configured: true,
      configurationError: null,
    };
  }
}

export function verifyAdminToken(
  provided: string | undefined,
  envOverride?: NodeJS.ProcessEnv
): boolean {
  if (!provided || typeof provided !== "string") return false;
  const trimmed = provided.trim();
  if (!trimmed) return false;

  const tokenConfig = getConfiguredAdminToken(envOverride);
  if (!tokenConfig.configured || !tokenConfig.token) {
    return false;
  }

  const a = Buffer.from(trimmed, "utf-8");
  const b = Buffer.from(tokenConfig.token, "utf-8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Extracts client IP exclusively from Express's validated req.ip or the direct
 * TCP socket remoteAddress. Never trusts raw unvalidated X-Forwarded-For headers.
 */
export function getClientIpKey(req: Request): string {
  const rawIp = req.ip || req.socket?.remoteAddress || "127.0.0.1";
  return String(rawIp).replace(/^::ffff:/i, "").trim() || "127.0.0.1";
}

// Strict failed-authentication rate limiter: max 5 failed attempts per 15 minutes per client IP.
// Successful authenticated requests do not consume the failed-attempt allowance.
const ADMIN_AUTH_WINDOW_MS = 15 * 60 * 1000;
const ADMIN_AUTH_MAX_FAILED_ATTEMPTS = 5;
const adminAuthLimiter = new TrackingRateLimiter(
  ADMIN_AUTH_WINDOW_MS,
  ADMIN_AUTH_MAX_FAILED_ATTEMPTS
);

function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ipKey = getClientIpKey(req);
  const lockStatus = adminAuthLimiter.peek(ipKey);

  if (!lockStatus.allowed) {
    res.setHeader("Retry-After", String(lockStatus.retryAfterSeconds));
    res.setHeader("X-RateLimit-Remaining", "0");
    res.status(429).json({
      error: `Too many failed administrator authentication attempts from your IP address. Please wait ${lockStatus.retryAfterSeconds} seconds before trying again.`,
      code: "ADMIN_AUTH_RATE_LIMITED",
      retryAfterSeconds: lockStatus.retryAfterSeconds,
    });
    return;
  }

  const tokenConfig = getConfiguredAdminToken();
  if (!tokenConfig.configured) {
    const failRate = adminAuthLimiter.check(ipKey);
    res.setHeader("X-RateLimit-Remaining", String(failRate.remaining));
    res.status(503).json({
      error:
        tokenConfig.configurationError ||
        "Administrator authentication is not configured on the server.",
      code: "ADMIN_AUTH_NOT_CONFIGURED",
    });
    return;
  }

  const headerToken =
    (req.headers["x-admin-token"] as string | undefined) ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : undefined);

  if (!verifyAdminToken(headerToken)) {
    const failRate = adminAuthLimiter.check(ipKey);
    res.setHeader("X-RateLimit-Remaining", String(failRate.remaining));
    res.status(401).json({
      error:
        "Unauthorized: A valid administrator authentication token (x-admin-token) is required.",
      code: "UNAUTHORIZED",
    });
    return;
  }

  next();
}

function loadStore(): PersistentKnowledgeStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw) as PersistentKnowledgeStore;

      // Sync seed records metadata & ensure all initial seed records exist
      const seedMap = new Map(INITIAL_KNOWLEDGE_RECORDS.map((s) => [s.id, s]));
      const existingIds = new Set<string>();

      parsed.records = parsed.records.map((rec) => {
        existingIds.add(rec.id);
        const seedMatch = seedMap.get(rec.id);
        if (
          seedMatch &&
          rec.lastVerifiedDate === "2025-02-15" &&
          rec.researchMetadata?.researchedAt === "2025-02-15T00:00:00Z"
        ) {
          return {
            ...rec,
            verificationStatus: seedMatch.verificationStatus,
            researchMetadata: {
              ...seedMatch.researchMetadata,
            },
          };
        }
        return rec;
      });

      for (const seed of INITIAL_KNOWLEDGE_RECORDS) {
        if (!existingIds.has(seed.id)) {
          parsed.records.push(seed);
        }
      }

      parsed.ledger.maxBudgetLimit = MAX_BUDGET_HARD_CAP;
      if (
        !parsed.ledger.configuredConservativeLimit ||
        parsed.ledger.configuredConservativeLimit > MAX_BUDGET_HARD_CAP ||
        parsed.ledger.configuredConservativeLimit < 1
      ) {
        parsed.ledger.configuredConservativeLimit = Math.min(
          parsed.ledger.configuredConservativeLimit ||
            DEFAULT_CONSERVATIVE_LIMIT,
          MAX_BUDGET_HARD_CAP
        );
      }
      return parsed;
    }
  } catch (err) {
    console.error(
      "Failed to read knowledge store, initializing from seed:",
      err
    );
  }

  const initialStore: PersistentKnowledgeStore = {
    ledger: { ...INITIAL_BUDGET_LEDGER },
    records: [...INITIAL_KNOWLEDGE_RECORDS],
    updatedAt: new Date().toISOString(),
  };
  saveStore(initialStore);
  return initialStore;
}

const BACKUP_FILE = path.join(DATA_DIR, "knowledge_store.backup.json");

function saveStore(store: PersistentKnowledgeStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    store.updatedAt = new Date().toISOString();
    const serialized = JSON.stringify(store, null, 2);
    if (fs.existsSync(STORE_FILE)) {
      try {
        const existingRaw = fs.readFileSync(STORE_FILE, "utf-8");
        JSON.parse(existingRaw);
        atomicWriteFileSync(BACKUP_FILE, existingRaw);
      } catch {
        // Ignore if existing primary knowledge store was malformed
      }
    }
    atomicWriteFileSync(STORE_FILE, serialized);
  } catch (err) {
    console.error("Failed to write knowledge store:", err);
  }
}

function classifyAuthorityType(
  url: string
): OfficialSourceCitation["authorityType"] {
  const lower = url.toLowerCase();
  if (lower.includes("mea.gov.in") || lower.includes("esanad.nic.in")) {
    return "MEA_INDIA";
  }
  if (lower.includes("hcch.net")) {
    return "HCCH";
  }
  if (
    lower.includes("embassy") ||
    lower.includes("consulate") ||
    lower.includes("diplo.de") ||
    lower.includes("esteri.it") ||
    lower.includes("china-embassy")
  ) {
    return "EMBASSY_CONSULATE";
  }
  if (
    lower.includes(".gov") ||
    lower.includes(".gob") ||
    lower.includes(".gc.ca") ||
    lower.includes("mofa.")
  ) {
    return "GOVERNMENT_PORTAL";
  }
  return "WEB_GROUNDING";
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

/**
 * Performs a single Google Search Grounded research request for an Indian document authentication route.
 * Enforces:
 * - In-flight concurrency lock per recordId
 * - Deduplication cache check before spending budget
 * - Hard cap of 2,000 requests and configurable conservative limit (default 200)
 * - Zero blind retries on quota/rate-limit errors
 */
async function performGroundedRouteResearch(params: {
  destinationCountry: string;
  documentCategory: DocumentCategory;
  documentType: string;
  purpose?: string;
  store: PersistentKnowledgeStore;
  forceRefresh?: boolean;
}): Promise<{
  record: KnowledgeRecord;
  reusedCachedRecord: boolean;
}> {
  const {
    destinationCountry,
    documentCategory,
    documentType,
    purpose,
    store,
    forceRefresh,
  } = params;

  const recordId = buildKnowledgeRecordId(
    destinationCountry,
    documentCategory,
    documentType
  );

  // 0. Prevent concurrent duplicate requests for the same recordId
  if (inFlightResearchIds.has(recordId)) {
    throw new Error(
      `Conflict (409): A research request for "${recordId}" is already in progress.`
    );
  }

  // 1. Check deduplication & existing verified record
  const existingRecord = store.records.find((r) => r.id === recordId);
  if (
    existingRecord &&
    existingRecord.verificationStatus === "verified" &&
    !forceRefresh
  ) {
    store.ledger.deduplicationHits += 1;
    saveStore(store);
    return { record: existingRecord, reusedCachedRecord: true };
  }

  // 2. Check strict research budget (max 2,000 requests and conservative configured limit)
  const effectiveLimit = Math.min(
    MAX_BUDGET_HARD_CAP,
    store.ledger.maxBudgetLimit,
    store.ledger.configuredConservativeLimit
  );
  if (store.ledger.requestsAttempted >= effectiveLimit) {
    throw new Error(
      `Research budget limit reached (${store.ledger.requestsAttempted}/${effectiveLimit} requests attempted; strict upper cap is ${MAX_BUDGET_HARD_CAP}).`
    );
  }

  const ai = getGeminiClient();
  if (!ai) {
    throw new Error(
      "GEMINI_API_KEY is not configured on the server. Configure GEMINI_API_KEY in Settings > Secrets to run live Google Search grounded research."
    );
  }

  inFlightResearchIds.add(recordId);

  // Increment attempted counter BEFORE request
  store.ledger.requestsAttempted += 1;
  store.ledger.lastRequestTimestamp = new Date().toISOString();
  saveStore(store);

  const selectedModel = "gemini-3.8-flash";

  const prompt = `You are a senior Indian consular & document-legalization compliance researcher for Fatima Global Attestation.
Research the official authentication/legalization procedure for an INDIAN-ISSUED document being submitted to ${destinationCountry}.

Document Details:
- Document Category: ${documentCategory.toUpperCase()}
- Specific Document Type: ${documentType}
- Destination Country: ${destinationCountry}
${purpose ? `- Intended Purpose: ${purpose}` : ""}

CRITICAL RESEARCH RULES:
1. Check whether the 1961 Hague Apostille Convention is IN FORCE between the Republic of India and ${destinationCountry}.
   - IMPORTANT EXCEPTION: Although Mainland China joined the Hague Convention in Nov 2023, India lodged a formal objection under Article 12, so the Apostille Convention DOES NOT apply between India and Mainland China (embassy legalization is required).
2. Determine the exact step-by-step authentication sequence in India.
3. Strictly separate:
   - "verifiedStatutoryRules": Confirmed statutory/treaty rules.
   - "itemsRequiringConfirmation": Items that depend on the specific employer, university, state HRD vs SDM preference, or local translation requirements.

Return ONLY a valid JSON object matching this exact structure (no markdown code fences):
{
  "countryCode": "2-letter ISO code",
  "isHagueConventionApplicable": true or false,
  "treatyStatusNote": "Concise explanation of treaty status between India and ${destinationCountry}",
  "authenticationRouteTitle": "Clear title of the route",
  "stepByStepSequence": [
    {
      "stepNumber": 1,
      "authority": "Authority Name",
      "description": "What is performed at this step",
      "isMandatory": true,
      "conditionNote": "Optional condition note"
    }
  ],
  "verifiedStatutoryRules": ["Rule 1", "Rule 2"],
  "itemsRequiringConfirmation": ["Item 1", "Item 2"],
  "translationRequirement": {
    "required": "conditional",
    "details": "Explanation of language/translation rules"
  },
  "specialCountryRequirements": ["Special requirement 1"],
  "confidenceScore": "high"
}`;

  try {
    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
      },
    });

    const rawText = response.text || "";
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Model response did not contain valid structured JSON.");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Extract ONLY genuine Google Search grounding citations returned by the API
    const groundingSources: OfficialSourceCitation[] = [];
    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const seenUrls = new Set<string>();

    for (const chunk of chunks) {
      const uri = chunk.web?.uri;
      const title = chunk.web?.title;
      if (uri && !seenUrls.has(uri)) {
        seenUrls.add(uri);
        groundingSources.push({
          title: title || uri,
          url: uri,
          authorityType: classifyAuthorityType(uri),
        });
      }
    }

    const hasOfficialCitation = groundingSources.some(
      (s) =>
        s.authorityType === "MEA_INDIA" ||
        s.authorityType === "HCCH" ||
        s.authorityType === "EMBASSY_CONSULATE" ||
        s.authorityType === "GOVERNMENT_PORTAL"
    );
    const confidence: "high" | "medium" | "requires_human_review" =
      parsed.confidenceScore === "high"
        ? "high"
        : parsed.confidenceScore === "medium"
        ? "medium"
        : "requires_human_review";

    const verificationStatus =
      confidence === "high" && hasOfficialCitation && groundingSources.length >= 2
        ? "verified"
        : groundingSources.length >= 1
        ? "partially_verified"
        : "requires_further_verification";

    const newRecord: KnowledgeRecord = {
      id: recordId,
      destinationCountry,
      countryCode: String(parsed.countryCode || "IN").slice(0, 4),
      isHagueConventionApplicable:
        destinationCountry.toLowerCase().includes("china") &&
        !destinationCountry.toLowerCase().includes("hong kong") &&
        !destinationCountry.toLowerCase().includes("macao")
          ? false
          : Boolean(parsed.isHagueConventionApplicable),
      treatyStatusNote: String(
        parsed.treatyStatusNote ||
          "Researched against 1961 Hague Apostille Convention and MEA India guidelines."
      ),
      documentCategory,
      documentType,
      authenticationRouteTitle: String(
        parsed.authenticationRouteTitle ||
          (parsed.isHagueConventionApplicable
            ? "Hague Apostille Convention Route"
            : "Bilateral Embassy Legalization Route")
      ),
      stepByStepSequence: Array.isArray(parsed.stepByStepSequence)
        ? parsed.stepByStepSequence.map((s: any, idx: number) => ({
            stepNumber: Number(s.stepNumber || idx + 1),
            authority: String(s.authority || `Step ${idx + 1}`),
            description: String(s.description || ""),
            isMandatory: s.isMandatory !== false,
            conditionNote: s.conditionNote ? String(s.conditionNote) : undefined,
          }))
        : [],
      verifiedStatutoryRules: Array.isArray(parsed.verifiedStatutoryRules)
        ? parsed.verifiedStatutoryRules.map(String)
        : [],
      itemsRequiringConfirmation: Array.isArray(
        parsed.itemsRequiringConfirmation
      )
        ? parsed.itemsRequiringConfirmation.map(String)
        : [],
      translationRequirement: {
        required:
          parsed.translationRequirement?.required === true
            ? true
            : parsed.translationRequirement?.required === false
            ? false
            : "conditional",
        details: String(
          parsed.translationRequirement?.details ||
            "Confirm whether the receiving authority requires a certified translation in the destination country's official language."
        ),
      },
      specialCountryRequirements: Array.isArray(
        parsed.specialCountryRequirements
      )
        ? parsed.specialCountryRequirements.map(String)
        : [],
      verificationStatus,
      lastVerifiedDate: new Date().toISOString().split("T")[0],
      officialSources: groundingSources.slice(0, 6),
      researchMetadata: {
        modelUsed: selectedModel,
        groundedSearchUsed: true,
        confidenceScore: confidence,
        researchedAt: new Date().toISOString(),
        notes: `Researched via Google Search grounding (${chunks.length} grounding chunks retrieved).`,
      },
    };

    const existingIdx = store.records.findIndex((r) => r.id === recordId);
    if (existingIdx >= 0) {
      store.records[existingIdx] = newRecord;
    } else {
      store.records.unshift(newRecord);
    }

    store.ledger.requestsCompleted += 1;
    store.ledger.lastError = null;
    saveStore(store);

    return { record: newRecord, reusedCachedRecord: false };
  } catch (err: any) {
    store.ledger.requestsFailed += 1;
    store.ledger.lastError = err?.message || String(err);
    saveStore(store);
    throw err;
  } finally {
    inFlightResearchIds.delete(recordId);
  }
}

async function startServer() {
  const app = express();

  // Configure proxy trust strictly when TRUSTED_PROXY_HOPS is explicitly set to a
  // positive integer N matching the deployment reverse-proxy topology.
  // Defaults to false so arbitrary X-Forwarded-For headers cannot spoof client IPs.
  const rawProxyHops = (process.env.TRUSTED_PROXY_HOPS || "").trim();
  const parsedProxyHops = /^\d+$/.test(rawProxyHops)
    ? parseInt(rawProxyHops, 10)
    : null;
  if (parsedProxyHops !== null && parsedProxyHops > 0) {
    app.set("trust proxy", parsedProxyHops);
  } else {
    app.set("trust proxy", false);
  }

  app.use(express.json({ limit: "2mb" }));

  // Ensure initial store & admin token are initialized on disk
  const bootStore = loadStore();
  saveStore(bootStore);
  const adminTokenInfo = getConfiguredAdminToken();

  // ==========================================================================
  // PUBLIC READ-ONLY API 1: GET /api/knowledge/status
  // ==========================================================================
  app.get("/api/knowledge/status", (_req, res) => {
    const store = loadStore();
    const hasApiKey = Boolean(
      process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" &&
        process.env.GEMINI_API_KEY.trim() !== ""
    );

    const effectiveCap = Math.min(
      MAX_BUDGET_HARD_CAP,
      store.ledger.maxBudgetLimit,
      store.ledger.configuredConservativeLimit
    );
    const budgetRemaining = Math.max(
      0,
      effectiveCap - store.ledger.requestsAttempted
    );

    const seededRecordsCount = store.records.filter(
      (r) => !r.researchMetadata?.groundedSearchUsed
    ).length;
    const liveResearchedRecordsCount = store.records.filter(
      (r) => r.researchMetadata?.groundedSearchUsed === true
    ).length;

    const recordsVerified = store.records.filter(
      (r) => r.verificationStatus === "verified"
    ).length;
    const recordsPartiallyVerified = store.records.filter(
      (r) => r.verificationStatus === "partially_verified"
    ).length;
    const recordsRequiringVerification = store.records.filter(
      (r) =>
        r.verificationStatus === "requires_further_verification" ||
        r.verificationStatus === "draft_researched"
    ).length;

    res.json({
      systemHealth: {
        customerQueryMode: "SAVED_KNOWLEDGE_ONLY",
        automaticLiveSearchEnabled: false,
        geminiApiConfigured: hasApiKey,
        selectedModel: "gemini-3.8-flash",
        googleSearchGroundingSupported: true,
        adminAuthProtected: true,
        adminTokenSource: adminTokenInfo.source,
        databaseType: "Persistent Server JSON Store (data/knowledge_store.json)",
        backupFile: "data/knowledge_store.backup.json",
        updatedAt: store.updatedAt,
      },
      budget: {
        ...store.ledger,
        budgetRemaining,
        effectiveCap,
      },
      metrics: {
        totalRecordsSaved: store.records.length,
        seededRecordsCount,
        liveResearchedRecordsCount,
        recordsResearched: liveResearchedRecordsCount,
        recordsVerified,
        recordsPartiallyVerified,
        recordsRequiringVerification,
        priorityQueueTotal: PRIORITY_RESEARCH_QUEUE.length,
        priorityQueueCompleted: PRIORITY_RESEARCH_QUEUE.filter((q) => {
          const id = buildKnowledgeRecordId(
            q.destinationCountry,
            q.documentCategory,
            q.documentType
          );
          return store.records.some((r) => r.id === id);
        }).length,
      },
    });
  });

  // ==========================================================================
  // PUBLIC READ-ONLY API 2: GET /api/knowledge/records
  // ==========================================================================
  app.get("/api/knowledge/records", (_req, res) => {
    const store = loadStore();
    const queueWithStatus = PRIORITY_RESEARCH_QUEUE.map((item) => {
      const recordId = buildKnowledgeRecordId(
        item.destinationCountry,
        item.documentCategory,
        item.documentType
      );
      const existing = store.records.find((r) => r.id === recordId);
      return {
        ...item,
        recordId,
        isResearched: Boolean(existing),
        verificationStatus: existing?.verificationStatus || null,
      };
    });

    res.json({
      records: store.records,
      priorityQueue: queueWithStatus,
      ledger: store.ledger,
    });
  });

  // ==========================================================================
  // PUBLIC READ-ONLY API 3: POST /api/knowledge/lookup
  // Used by RouteFinder to retrieve verified evidence or safely return Needs Verification
  // ==========================================================================
  app.post("/api/knowledge/lookup", (req, res) => {
    const { destinationCountry, documentCategory, documentType } = req.body || {};
    if (!destinationCountry || !documentCategory || !documentType) {
      res.status(400).json({ error: "Missing lookup parameters." });
      return;
    }

    const store = loadStore();
    const exactId = buildKnowledgeRecordId(
      destinationCountry,
      documentCategory,
      documentType
    );

    const exactRecord = store.records.find((r) => r.id === exactId);
    if (exactRecord) {
      res.json({
        matchType: "exact",
        effectiveVerificationStatus: exactRecord.verificationStatus,
        record: exactRecord,
      });
      return;
    }

    // Look for same country + same category (Partial match -> requires document-specific confirmation)
    const categoryMatch = store.records.find(
      (r) =>
        r.destinationCountry.toLowerCase() ===
          String(destinationCountry).toLowerCase() &&
        r.documentCategory === documentCategory
    );
    if (categoryMatch) {
      res.json({
        matchType: "country_category",
        effectiveVerificationStatus: "partially_verified",
        note: `General ${destinationCountry} (${documentCategory}) treaty rule matched, but specific rules for "${documentType}" require verification.`,
        record: categoryMatch,
      });
      return;
    }

    // Look for same country (General treaty match only -> requires category & document verification)
    const countryMatch = store.records.find(
      (r) =>
        r.destinationCountry.toLowerCase() ===
        String(destinationCountry).toLowerCase()
    );
    if (countryMatch) {
      res.json({
        matchType: "country_general",
        effectiveVerificationStatus: "partially_verified",
        note: `Country treaty status matched for ${destinationCountry}, but specific ${documentCategory} ("${documentType}") sequence needs verification.`,
        record: countryMatch,
      });
      return;
    }

    // Unsupported or ambiguous case -> safely return Needs Verification
    res.json({
      matchType: "none",
      effectiveVerificationStatus: "requires_further_verification",
      note: `Insufficient saved official evidence for "${documentType}" (${documentCategory}) to "${destinationCountry}". Needs verification before submission.`,
      record: null,
    });
  });

  // ==========================================================================
  // ADMIN AUTH CHECK: POST /api/knowledge/auth-check
  // ==========================================================================
  app.post("/api/knowledge/auth-check", requireAdminAuth, (_req, res) => {
    res.json({ authorized: true });
  });

  // ==========================================================================
  // PROTECTED ADMIN API 4: POST /api/knowledge/research
  // ==========================================================================
  app.post("/api/knowledge/research", requireAdminAuth, async (req, res) => {
    try {
      const {
        destinationCountry,
        documentCategory,
        documentType,
        purpose,
        forceRefresh,
      } = req.body || {};

      if (!destinationCountry || !documentCategory || !documentType) {
        res.status(400).json({
          error:
            "destinationCountry, documentCategory, and documentType are required.",
        });
        return;
      }

      const store = loadStore();
      const result = await performGroundedRouteResearch({
        destinationCountry: String(destinationCountry).trim(),
        documentCategory: documentCategory as DocumentCategory,
        documentType: String(documentType).trim(),
        purpose: purpose ? String(purpose).trim() : undefined,
        store,
        forceRefresh: Boolean(forceRefresh),
      });

      res.json({
        success: true,
        reusedCachedRecord: result.reusedCachedRecord,
        record: result.record,
        ledger: store.ledger,
      });
    } catch (err: any) {
      const status = String(err?.message).includes("Conflict (409)") ? 409 : 500;
      res.status(status).json({
        error: err?.message || "Failed to complete grounded research request.",
      });
    }
  });

  // ==========================================================================
  // PROTECTED ADMIN API 5: POST /api/knowledge/research-batch
  // ==========================================================================
  app.post(
    "/api/knowledge/research-batch",
    requireAdminAuth,
    async (req, res) => {
      if (isBatchRunning) {
        res.status(409).json({
          error: "Conflict (409): A batch research job is already running.",
        });
        return;
      }

      isBatchRunning = true;
      try {
        const requestedBatchSize = Number(req.body?.batchSize) || 3;
        const tierFilter = Number(req.body?.tierFilter) || 0;
        const safeBatchSize = Math.min(Math.max(1, requestedBatchSize), 5);

        const store = loadStore();
        const pendingItems = PRIORITY_RESEARCH_QUEUE.filter((item) => {
          if (tierFilter && item.priorityTier !== tierFilter) return false;
          const id = buildKnowledgeRecordId(
            item.destinationCountry,
            item.documentCategory,
            item.documentType
          );
          return !store.records.some(
            (r) => r.id === id && r.verificationStatus === "verified"
          );
        }).slice(0, safeBatchSize);

        if (pendingItems.length === 0) {
          res.json({
            success: true,
            message:
              "All prioritized queue items in the selected tier are already researched and verified.",
            processedCount: 0,
            results: [],
            ledger: store.ledger,
          });
          return;
        }

        const results: Array<{
          queueId: string;
          status: "completed" | "reused" | "failed";
          record?: KnowledgeRecord;
          error?: string;
        }> = [];

        for (const item of pendingItems) {
          try {
            const resItem = await performGroundedRouteResearch({
              destinationCountry: item.destinationCountry,
              documentCategory: item.documentCategory,
              documentType: item.documentType,
              purpose: item.rationale,
              store,
              forceRefresh: false,
            });
            results.push({
              queueId: item.id,
              status: resItem.reusedCachedRecord ? "reused" : "completed",
              record: resItem.record,
            });
          } catch (itemErr: any) {
            results.push({
              queueId: item.id,
              status: "failed",
              error: itemErr?.message || String(itemErr),
            });
            // Stop batch immediately on quota/rate-limit or budget exhaustion
            break;
          }
        }

        res.json({
          success: true,
          processedCount: results.length,
          results,
          ledger: store.ledger,
        });
      } catch (err: any) {
        res.status(500).json({
          error: err?.message || "Batch research failed.",
        });
      } finally {
        isBatchRunning = false;
      }
    }
  );

  // ==========================================================================
  // PROTECTED ADMIN API 6: POST /api/knowledge/update-budget
  // ==========================================================================
  app.post("/api/knowledge/update-budget", requireAdminAuth, (req, res) => {
    const newLimit = Number(req.body?.configuredConservativeLimit);
    if (isNaN(newLimit) || newLimit < 1) {
      res.status(400).json({ error: "Invalid budget limit value." });
      return;
    }
    const store = loadStore();
    store.ledger.maxBudgetLimit = MAX_BUDGET_HARD_CAP;
    store.ledger.configuredConservativeLimit = Math.min(
      MAX_BUDGET_HARD_CAP,
      Math.max(1, Math.floor(newLimit))
    );
    saveStore(store);
    res.json({
      success: true,
      ledger: store.ledger,
    });
  });

  // ==========================================================================
  // PROTECTED ADMIN API 7: POST /api/knowledge/verify-record
  // ==========================================================================
  app.post("/api/knowledge/verify-record", requireAdminAuth, (req, res) => {
    const { id, verificationStatus, updatedRecord, action } = req.body || {};
    if (!id) {
      res.status(400).json({ error: "Record id is required." });
      return;
    }

    const store = loadStore();
    const idx = store.records.findIndex((r) => r.id === id);
    if (idx < 0) {
      res.status(404).json({ error: "Record not found." });
      return;
    }

    if (action === "delete") {
      store.records.splice(idx, 1);
      saveStore(store);
      res.json({ success: true, deletedId: id });
      return;
    }

    if (updatedRecord && typeof updatedRecord === "object") {
      store.records[idx] = {
        ...store.records[idx],
        ...updatedRecord,
        id: store.records[idx].id,
        lastVerifiedDate: new Date().toISOString().split("T")[0],
      };
    }

    if (
      verificationStatus === "verified" ||
      verificationStatus === "partially_verified" ||
      verificationStatus === "requires_further_verification" ||
      verificationStatus === "draft_researched"
    ) {
      store.records[idx].verificationStatus = verificationStatus;
      store.records[idx].lastVerifiedDate = new Date()
        .toISOString()
        .split("T")[0];
    }

    saveStore(store);
    res.json({
      success: true,
      record: store.records[idx],
    });
  });

  // ==========================================================================
  // PROTECTED ADMIN API 8: POST /api/knowledge/import & GET /api/knowledge/export
  // ==========================================================================
  app.post("/api/knowledge/import", requireAdminAuth, (req, res) => {
    const incomingRecords = req.body?.records;
    if (!Array.isArray(incomingRecords)) {
      res
        .status(400)
        .json({ error: "Expected 'records' array in JSON payload." });
      return;
    }

    const store = loadStore();
    let importedCount = 0;
    let updatedCount = 0;

    for (const item of incomingRecords) {
      if (
        !item ||
        !item.destinationCountry ||
        !item.documentCategory ||
        !item.documentType
      ) {
        continue;
      }
      const id =
        item.id ||
        buildKnowledgeRecordId(
          item.destinationCountry,
          item.documentCategory,
          item.documentType
        );
      const existingIdx = store.records.findIndex((r) => r.id === id);
      const sanitizedRecord: KnowledgeRecord = {
        ...item,
        id,
        lastVerifiedDate:
          item.lastVerifiedDate || new Date().toISOString().split("T")[0],
      };

      if (existingIdx >= 0) {
        store.records[existingIdx] = sanitizedRecord;
        updatedCount += 1;
      } else {
        store.records.push(sanitizedRecord);
        importedCount += 1;
      }
    }

    saveStore(store);
    res.json({
      success: true,
      importedCount,
      updatedCount,
      totalRecords: store.records.length,
    });
  });

  app.get("/api/knowledge/export", requireAdminAuth, (_req, res) => {
    const store = loadStore();
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="fatima-global-knowledge-base-${new Date().toISOString().split("T")[0]}.json"`
    );
    res.send(JSON.stringify(store, null, 2));
  });

  // ==========================================================================
  // APOSTILLE TRACKING & VERIFICATION MODULE BACKEND
  // ==========================================================================
  const trackingRepo = new TrackingRepository(DATA_DIR);
  const publicTrackingLimiter = new TrackingRateLimiter(60_000, 15);

  const extractAdminActor = (
    req: Request
  ): { actorName: string; actorRole: AdminStaffRole } => {
    const rawName = sanitizePlainText(
      (req.headers["x-admin-actor"] as string) ||
        req.body?.actorName ||
        "Authorized Staff",
      80
    );
    const rawRole = sanitizePlainText(
      (req.headers["x-admin-role"] as string) ||
        req.body?.actorRole ||
        "Super Administrator",
      60
    ) as AdminStaffRole;
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(rawRole)
      ? rawRole
      : "Super Administrator";
    return {
      actorName: rawName || "Authorized Staff",
      actorRole,
    };
  };

  // 1. PUBLIC ORDER TRACKING LOOKUP (Rate-limited, strips all internal fields)
  app.post("/api/tracking/lookup", (req, res) => {
    const ipKey = getClientIpKey(req);
    const rate = publicTrackingLimiter.check(ipKey);
    res.setHeader("X-RateLimit-Remaining", String(rate.remaining));

    if (!rate.allowed) {
      res.setHeader("Retry-After", String(rate.retryAfterSeconds));
      res.status(429).json({
        error: `Too many tracking attempts from your connection. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
        retryAfterSeconds: rate.retryAfterSeconds,
      });
      return;
    }

    try {
      const { trackingId, token, verificationPin } = req.body || {};

      if (token && typeof token === "string" && token.trim().length > 0) {
        const result = trackingRepo.findPublicOrderByToken(
          token,
          verificationPin
        );
        if (result.status === "expired_token") {
          res.status(410).json({
            error:
              "This receipt QR tracking link has expired or been rotated. Please enter your Tracking ID manually or contact Fatima Global Attestation support.",
            code: "EXPIRED_TOKEN",
          });
          return;
        }
        if (result.status === "pin_required") {
          res.status(403).json({
            error:
              "This order requires a customer verification code (PIN) for additional privacy protection.",
            code: "PIN_REQUIRED",
            pinRequired: true,
          });
          return;
        }
        if (result.status === "invalid_pin") {
          res.status(403).json({
            error: "The verification code (PIN) entered does not match this order.",
            code: "INVALID_PIN",
            pinRequired: true,
          });
          return;
        }
        if (result.status !== "found" || !result.order) {
          res.status(404).json({
            error:
              "No matching active order was found for this QR token. Please check your receipt or enter your Tracking ID manually.",
            code: "NOT_FOUND",
          });
          return;
        }
        res.json({
          found: true,
          lookupMethod: "qr_token",
          order: result.order,
        });
        return;
      }

      if (
        trackingId &&
        typeof trackingId === "string" &&
        trackingId.trim().length > 0
      ) {
        const result = trackingRepo.findPublicOrderByTrackingId(
          trackingId,
          verificationPin
        );
        if (result.status === "pin_required") {
          res.status(403).json({
            error:
              "This order requires a customer verification code (PIN). Please enter the verification code provided on your receipt.",
            code: "PIN_REQUIRED",
            pinRequired: true,
          });
          return;
        }
        if (result.status === "invalid_pin") {
          res.status(403).json({
            error: "Invalid verification code (PIN). Please check your receipt and try again.",
            code: "INVALID_PIN",
            pinRequired: true,
          });
          return;
        }
        if (result.status !== "found" || !result.order) {
          res.status(404).json({
            error:
              "No saved order was found with that Tracking ID. Please verify the Tracking ID on your Fatima Global Attestation receipt (format: FGA-YYYY-XXXXXX).",
            code: "NOT_FOUND",
          });
          return;
        }
        res.json({
          found: true,
          lookupMethod: "tracking_id",
          order: result.order,
        });
        return;
      }

      res.status(400).json({
        error: "Please provide a valid Tracking ID or scan a receipt QR token.",
        code: "MISSING_INPUT",
      });
    } catch (err: any) {
      res.status(503).json({
        error:
          "The tracking database is temporarily unavailable. Please try again in a few moments or contact our support desk on WhatsApp.",
        code: "DATABASE_UNAVAILABLE",
      });
    }
  });

  // 2. OFFICIAL GOVERNMENT APOSTILLE QR URL VALIDATOR & e-SANAD ADAPTER
  app.post("/api/esanad/validate-url", (req, res) => {
    const rawUrl = typeof req.body?.url === "string" ? req.body.url : "";
    const validation = validateGovernmentVerificationUrl(rawUrl);
    res.json(validation);
  });

  app.get("/api/esanad/status", (_req, res) => {
    res.json(getEsanadAdapterStatus());
  });

  app.post("/api/esanad/verify", async (_req, res) => {
    const result = await requestOfficialEsanadVerification();
    res.status(503).json(result);
  });

  /**
   * Resolves the origin for QR code and tracking links safely:
   * - In production (NODE_ENV=production), uses ONLY the validated PUBLIC_TRACKING_DOMAIN
   *   and never reads Host or X-Forwarded-Host headers.
   * - In development, allows only validated localhost / 127.0.0.1 / .run.app preview origins.
   */
  const getRequestOrigin = (req: Request): string => {
    if (isProductionEnvironment()) {
      const domainValidation = validateCanonicalTrackingDomain();
      return domainValidation.valid && domainValidation.canonicalOrigin
        ? domainValidation.canonicalOrigin
        : "";
    }
    const xfProto = req.headers["x-forwarded-proto"];
    const proto =
      (Array.isArray(xfProto) ? xfProto[0] : xfProto)?.split(",")[0]?.trim() ||
      req.protocol ||
      "http";
    const candidateHost = req.get("host") || `localhost:${PORT}`;
    const candidateOrigin = `${proto}://${candidateHost}`;
    return resolveSafeDevOrigin(candidateOrigin);
  };

  const buildAdminBootstrapPayload = (
    req?: Request,
    envOverride?: NodeJS.ProcessEnv
  ) => {
    const tokenInfo = getConfiguredAdminToken(envOverride);
    const backendConfig = trackingRepo.getBackendConfigStatus(envOverride);

    // Strict security isolation: preview token is ONLY provided to local machine loopback requests (localhost/127.0.0.1).
    // In production, remote preview domains, or Cloud Run containers, previewToken is ALWAYS null.
    const hostname = req ? (req.hostname || "").toLowerCase() : "";
    const isStrictLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";

    const isIsolatedDevPreview =
      !tokenInfo.isProduction &&
      isStrictLocalhost &&
      tokenInfo.source === "local_file" &&
      Boolean(tokenInfo.token);

    return {
      environmentMode: tokenInfo.isProduction ? "production" : "development",
      adminConfigured: tokenInfo.configured,
      adminConfigurationError: tokenInfo.configurationError,
      adminTokenSource: tokenInfo.source,
      previewTokenAvailable: isIsolatedDevPreview,
      previewToken: isIsolatedDevPreview ? tokenInfo.token : null,
      backendConfig,
      esanadStatus: getEsanadAdapterStatus(),
      whatsappStatus: getWhatsAppBusinessApiStatus(),
    };
  };

  // 3. ADMIN BOOTSTRAP & AUTHENTICATION CHECK FOR TRACKING DASHBOARD
  app.get("/api/tracking/admin/bootstrap", (req, res) => {
    res.json(buildAdminBootstrapPayload(req));
  });

  app.post("/api/tracking/admin/auth-check", requireAdminAuth, (req, res) => {
    const actor = extractAdminActor(req);
    res.json({
      authorized: true,
      actorName: actor.actorName,
      actorRole: actor.actorRole,
    });
  });

  // 4. ADMIN ORDERS LIST & AUDIT LOGS (Protected)
  app.get("/api/tracking/admin/orders", requireAdminAuth, (_req, res) => {
    try {
      const store = trackingRepo.loadStore();
      res.json({
        orders: store.orders,
        auditLogs: store.auditLogs.slice(0, 200),
        updatedAt: store.updatedAt,
        backendConfig: trackingRepo.getBackendConfigStatus(),
        esanadStatus: getEsanadAdapterStatus(),
        whatsappStatus: getWhatsAppBusinessApiStatus(),
      });
    } catch (err: any) {
      res.status(503).json({
        error: err?.message || "Failed to load orders from database.",
      });
    }
  });

  // 5. ADMIN CREATE NEW TRACKING ORDER (Protected)
  app.post("/api/tracking/admin/orders", requireAdminAuth, async (req, res) => {
    try {
      const actor = extractAdminActor(req);
      const {
        customerReference,
        customerPhone,
        customerWhatsAppConsent,
        serviceType,
        documentCategory,
        destinationCountry,
        initialStatus,
        initialPublicSummary,
        internalNotes,
        verificationPin,
      } = req.body || {};

      const created = trackingRepo.createOrder({
        customerReference,
        customerPhone,
        customerWhatsAppConsent,
        serviceType,
        documentCategory,
        destinationCountry,
        initialStatus,
        initialPublicSummary,
        internalNotes,
        verificationPin,
        actorName: actor.actorName,
        actorRole: actor.actorRole,
      });

      const reqOrigin = getRequestOrigin(req);
      const qrBundle = await generateOrderQrCodeBundle(
        created.publicTrackingToken,
        true,
        reqOrigin
      );

      const whatsappNotification = await dispatchOrPrepareCustomerWhatsApp({
        trackingId: created.trackingId,
        secureTrackingUrl: qrBundle.liveScanUrl,
        customerPhone: created.customerPhone,
        customerConsent: created.customerWhatsAppConsent,
        currentStatus: created.currentStatus,
        isStatusUpdate: false,
      });

      const finalOrder =
        trackingRepo.recordWhatsAppDispatchOutcome({
          internalOrderId: created.internalOrderId,
          deliveryStatus: whatsappNotification.deliveryStatus,
          autoSent: whatsappNotification.autoSent,
          details: whatsappNotification.statusExplanation,
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        }) || created;

      res.status(201).json({
        success: true,
        order: finalOrder,
        qrBundle,
        whatsappNotification,
      });
    } catch (err: any) {
      res.status(400).json({
        error: err?.message || "Failed to create order.",
      });
    }
  });

  // 6. ADMIN UPDATE ORDER STATUS (Protected)
  app.patch(
    "/api/tracking/admin/orders/:internalOrderId/status",
    requireAdminAuth,
    async (req, res) => {
      try {
        const actor = extractAdminActor(req);
        const { internalOrderId } = req.params;
        const { newStatus, publicSummary, internalNotes } = req.body || {};

        const updated = trackingRepo.updateOrderStatus({
          internalOrderId,
          newStatus,
          publicSummary,
          internalNotes,
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        });

        const reqOrigin = getRequestOrigin(req);
        const qrBundle = await generateOrderQrCodeBundle(
          updated.publicTrackingToken,
          true,
          reqOrigin
        );
        const whatsappNotification = await dispatchOrPrepareCustomerWhatsApp({
          trackingId: updated.trackingId,
          secureTrackingUrl: qrBundle.liveScanUrl,
          customerPhone: updated.customerPhone,
          customerConsent: false, // Do not auto-fire on status update unless explicitly triggered
          currentStatus: updated.currentStatus,
          isStatusUpdate: true,
        });

        res.json({
          success: true,
          order: updated,
          qrBundle,
          whatsappNotification,
        });
      } catch (err: any) {
        res.status(400).json({
          error: err?.message || "Failed to update order status.",
        });
      }
    }
  );

  // 6B. ADMIN UPDATE PRIVATE CUSTOMER PHONE NUMBER (Protected)
  app.patch(
    "/api/tracking/admin/orders/:internalOrderId/customer-phone",
    requireAdminAuth,
    async (req, res) => {
      try {
        const actor = extractAdminActor(req);
        const { internalOrderId } = req.params;
        const { customerPhone, customerWhatsAppConsent } = req.body || {};

        const updated = trackingRepo.updateCustomerPhone({
          internalOrderId,
          customerPhone: String(customerPhone || ""),
          customerWhatsAppConsent:
            typeof customerWhatsAppConsent === "boolean"
              ? customerWhatsAppConsent
              : undefined,
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        });

        const reqOrigin = getRequestOrigin(req);
        const qrBundle = await generateOrderQrCodeBundle(
          updated.publicTrackingToken,
          true,
          reqOrigin
        );
        const messageText = buildCustomerWhatsAppTrackingMessage({
          trackingId: updated.trackingId,
          secureTrackingUrl: qrBundle.liveScanUrl,
          currentStatus: updated.currentStatus,
          isStatusUpdate: false,
        });
        const manualWhatsAppUrl = buildManualWhatsAppShareUrl(
          updated.customerPhone,
          messageText
        );

        res.json({
          success: true,
          order: updated,
          whatsappNotification: {
            autoSent: false,
            deliveryStatus: updated.whatsappDeliveryStatus,
            messageText,
            manualWhatsAppUrl,
            recipientPhoneFormatted: updated.customerPhone || null,
            statusExplanation: updated.customerPhone
              ? "Private customer WhatsApp number saved. Ready to share tracking link on WhatsApp."
              : "Customer phone cleared.",
            dispatchedAt: new Date().toISOString(),
          },
        });
      } catch (err: any) {
        res.status(400).json({
          error: err?.message || "Failed to update customer phone number.",
        });
      }
    }
  );

  // 6C. ADMIN PREPARE / DISPATCH CUSTOMER WHATSAPP MESSAGE (Protected)
  app.post(
    "/api/tracking/admin/orders/:internalOrderId/whatsapp-share",
    requireAdminAuth,
    async (req, res) => {
      try {
        const actor = extractAdminActor(req);
        const { internalOrderId } = req.params;
        const isStatusUpdate = Boolean(req.body?.isStatusUpdate);

        const store = trackingRepo.loadStore();
        const order = store.orders.find(
          (o) => o.internalOrderId === internalOrderId
        );
        if (!order) {
          res.status(404).json({ error: "Order not found." });
          return;
        }

        const reqOrigin = getRequestOrigin(req);
        const qrBundle = await generateOrderQrCodeBundle(
          order.publicTrackingToken,
          true,
          reqOrigin
        );

        const whatsappNotification = await dispatchOrPrepareCustomerWhatsApp({
          trackingId: order.trackingId,
          secureTrackingUrl: qrBundle.liveScanUrl,
          customerPhone: order.customerPhone,
          customerConsent: Boolean(order.customerWhatsAppConsent),
          currentStatus: order.currentStatus,
          isStatusUpdate,
        });

        trackingRepo.recordWhatsAppDispatchOutcome({
          internalOrderId: order.internalOrderId,
          deliveryStatus: whatsappNotification.deliveryStatus,
          autoSent: whatsappNotification.autoSent,
          details: whatsappNotification.statusExplanation,
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        });

        res.json({
          success: true,
          whatsappNotification,
        });
      } catch (err: any) {
        res.status(400).json({
          error: err?.message || "Failed to prepare WhatsApp share message.",
        });
      }
    }
  );

  // 7. ADMIN UPDATE INTERNAL NOTES (Protected)
  app.patch(
    "/api/tracking/admin/orders/:internalOrderId/notes",
    requireAdminAuth,
    (req, res) => {
      try {
        const actor = extractAdminActor(req);
        const { internalOrderId } = req.params;
        const { internalNotes } = req.body || {};

        const updated = trackingRepo.updateInternalNotes({
          internalOrderId,
          internalNotes: String(internalNotes || ""),
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        });

        res.json({
          success: true,
          order: updated,
        });
      } catch (err: any) {
        res.status(400).json({
          error: err?.message || "Failed to update internal notes.",
        });
      }
    }
  );

  // 8. ADMIN ROTATE OR EXPIRE RECEIPT QR TOKEN (Protected)
  app.post(
    "/api/tracking/admin/orders/:internalOrderId/token",
    requireAdminAuth,
    async (req, res) => {
      try {
        const actor = extractAdminActor(req);
        const { internalOrderId } = req.params;
        const mode =
          req.body?.mode === "expire_now"
            ? "expire_now"
            : req.body?.mode === "clear_expiry"
            ? "clear_expiry"
            : "rotate";

        const updated = trackingRepo.rotateOrExpireToken({
          internalOrderId,
          mode,
          actorName: actor.actorName,
          actorRole: actor.actorRole,
        });

        const reqOrigin = getRequestOrigin(req);
        const qrBundle = await generateOrderQrCodeBundle(
          updated.publicTrackingToken,
          true,
          reqOrigin
        );

        res.json({
          success: true,
          order: updated,
          qrBundle,
        });
      } catch (err: any) {
        res.status(400).json({
          error: err?.message || "Failed to update QR token.",
        });
      }
    }
  );

  // 9. ADMIN GENERATE QR CODE & WHATSAPP SHARE BUNDLE FOR BUSINESS RECEIPT (Protected)
  app.get(
    "/api/tracking/admin/orders/:internalOrderId/qr",
    requireAdminAuth,
    async (req, res) => {
      try {
        const { internalOrderId } = req.params;
        const useLiveScanUrl = req.query.mode !== "canonical";
        const store = trackingRepo.loadStore();
        const order = store.orders.find(
          (o) => o.internalOrderId === internalOrderId
        );
        if (!order) {
          res.status(404).json({ error: "Order not found." });
          return;
        }
        const reqOrigin = getRequestOrigin(req);
        const qrBundle = await generateOrderQrCodeBundle(
          order.publicTrackingToken,
          useLiveScanUrl,
          reqOrigin
        );
        const whatsappMessageText = buildCustomerWhatsAppTrackingMessage({
          trackingId: order.trackingId,
          secureTrackingUrl: qrBundle.liveScanUrl,
          currentStatus: order.currentStatus,
          isStatusUpdate: false,
        });
        const manualWhatsAppUrl = buildManualWhatsAppShareUrl(
          order.customerPhone,
          whatsappMessageText
        );
        res.json({
          trackingId: order.trackingId,
          serviceType: order.serviceType,
          documentCategory: order.documentCategory,
          currentStatus: order.currentStatus,
          createdAt: order.createdAt,
          tokenExpiresAt: order.tokenExpiresAt || null,
          whatsappMessageText,
          manualWhatsAppUrl,
          ...qrBundle,
        });
      } catch (err: any) {
        const msg = err?.message || "Failed to generate QR code.";
        const status =
          msg.includes("PUBLIC_TRACKING_DOMAIN") ||
          msg.includes("configuration error") ||
          msg.includes("Canonical production domain")
            ? 400
            : 500;
        res.status(status).json({
          error: msg,
          code:
            status === 400
              ? "INVALID_TRACKING_DOMAIN_CONFIG"
              : "QR_GENERATION_FAILED",
        });
      }
    }
  );

  // 10. ADMIN EXPORT / DOWNLOAD COMPLETE BACKUP SNAPSHOT (Protected)
  app.get("/api/tracking/admin/backup/export", requireAdminAuth, (_req, res) => {
    try {
      const store = trackingRepo.loadStore();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `fatima_tracking_backup_${timestamp}.json`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(store, null, 2));
    } catch (err: any) {
      res.status(500).json({
        error: err?.message || "Failed to generate backup export.",
      });
    }
  });

  // 11. ADMIN AUTOMATED SECURITY & ACCEPTANCE SELF-TEST SUITE (Protected)
  app.post("/api/tracking/admin/self-test", requireAdminAuth, async (req, res) => {
    const results: Array<{
      id: string;
      name: string;
      passed: boolean;
      detail: string;
    }> = [];

    // Acceptance Test 1: Unique, non-repeating tracking reference (e.g. FGA-2026-000184)
    const testSet = new Set<string>();
    const firstGen = generateUniqueTrackingId(testSet, 183);
    testSet.add(firstGen.trackingId);
    const secondGen = generateUniqueTrackingId(testSet, firstGen.nextSequence);
    const uniqueRefPassed =
      /^FGA-\d{4}-\d{6}$/.test(firstGen.trackingId) &&
      firstGen.trackingId.endsWith("000184") &&
      secondGen.trackingId.endsWith("000185") &&
      firstGen.trackingId !== secondGen.trackingId;

    results.push({
      id: "unique_tracking_reference",
      name: "1. Unique Non-Repeating Tracking Reference (FGA-YYYY-NNNNNN)",
      passed: uniqueRefPassed,
      detail: uniqueRefPassed
        ? `Confirmed: Sequential collision-free generator produces ${firstGen.trackingId}, ${secondGen.trackingId} without duplicates.`
        : "Tracking reference generator failed format or uniqueness check.",
    });

    // Acceptance Test 2: QR Code contains ONLY secure tracking URL (no PII) and maps to correct order
    const reqOrigin = getRequestOrigin(req);
    const sampleToken = "b".repeat(48);
    const testQr = await generateOrderQrCodeBundle(sampleToken, true, reqOrigin);
    const qrUrlClean =
      testQr.encodedUrl.includes(`/apostille-tracking?token=${sampleToken}`) &&
      !testQr.encodedUrl.includes("YOUR_DOMAIN") &&
      !testQr.encodedUrl.includes("phone") &&
      !testQr.encodedUrl.includes("name") &&
      testQr.qrDataUrl.startsWith("data:image/png;base64,");

    results.push({
      id: "qr_code_security",
      name: "2. Unique QR Code & Receipt Print Readiness (Zero PII in QR)",
      passed: qrUrlClean,
      detail: qrUrlClean
        ? "Confirmed: QR code encodes only the secure token URL (/apostille-tracking?token=...) with zero personal details and no YOUR_DOMAIN placeholder."
        : "QR code URL check failed.",
    });

    // Acceptance Test 3: Customer WhatsApp Message & Manual vs Auto API Honesty
    const waTest = await dispatchOrPrepareCustomerWhatsApp({
      trackingId: "FGA-2026-000184",
      secureTrackingUrl: testQr.liveScanUrl,
      customerPhone: "+91 98765 43210",
      customerConsent: true,
    });
    const waApiStatus = getWhatsAppBusinessApiStatus();
    const waPassed =
      waTest.messageText.includes("Tracking Reference: FGA-2026-000184") &&
      waTest.messageText.includes(testQr.liveScanUrl) &&
      waTest.manualWhatsAppUrl.startsWith("https://wa.me/919876543210?text=") &&
      waTest.autoSent === waApiStatus.readyForAutomaticDelivery;

    results.push({
      id: "whatsapp_sharing_honesty",
      name: "3. Customer WhatsApp Message & Honest Manual/API Delivery",
      passed: waPassed,
      detail: waPassed
        ? `Confirmed: Pre-filled message includes Tracking Reference & secure link; manual wa.me sharing works without paid API (autoSent=${waTest.autoSent}).`
        : "WhatsApp message or honest delivery status check failed.",
    });

    // Acceptance Test 4: Invalid Tracking ID rejection (never fakes order progress)
    const invalidLookup = trackingRepo.findPublicOrderByTrackingId(
      "FGA-2026-999999"
    );
    results.push({
      id: "invalid_tracking_id",
      name: "4. Invalid Tracking ID Rejection (Zero Fake Progress)",
      passed: invalidLookup.status === "not_found" && !invalidLookup.order,
      detail:
        invalidLookup.status === "not_found"
          ? "Confirmed: Unknown tracking IDs return not_found (HTTP 404) with zero fabricated progress."
          : "Unexpected response for non-existent tracking ID.",
    });

    // Acceptance Test 5: Public Data Sanitization (No Phone, Address, Notes, or PII Exposed)
    const mockServerOrder = {
      internalOrderId: "00000000-0000-0000-0000-000000000001",
      trackingId: "FGA-2026-000184",
      publicTrackingToken: "a".repeat(48),
      customerReference: "SECRET_PASSPORT_Z9999999",
      customerPhone: "+919876543210",
      customerWhatsAppConsent: true,
      verificationPinHash: "secret_hash",
      requiresPin: false,
      serviceType: "SDM + Apostille Services",
      documentCategory: "Personal / Civil Documents",
      currentStatus: "Processing" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      internalNotes: "CONFIDENTIAL STAFF NOTE: Do not expose publicly",
      publicTimeline: [],
      createdBy: "Admin",
      updatedBy: "Admin",
    };
    const publicProjection = toPublicTrackingOrderView(mockServerOrder);
    const serialized = JSON.stringify(publicProjection);
    const leaked =
      serialized.includes("SECRET_PASSPORT") ||
      serialized.includes("9876543210") ||
      serialized.includes("customerPhone") ||
      serialized.includes("CONFIDENTIAL STAFF NOTE") ||
      serialized.includes("internalOrderId") ||
      serialized.includes("publicTrackingToken");

    results.push({
      id: "pii_redaction",
      name: "5. Customer Phone, PII & Internal Notes Redaction",
      passed: !leaked,
      detail: !leaked
        ? "Confirmed: customerPhone, customerReference, internalNotes, and publicTrackingToken are completely stripped from public responses."
        : "Leak detected in public projection!",
    });

    // Acceptance Test 6: Priority 1 — Production Admin Bootstrap Isolation & Fail-Closed Auth
    const prodMissingBootstrap = buildAdminBootstrapPayload(undefined, {
      NODE_ENV: "production",
      TRACKING_ADMIN_TOKEN: "",
    });
    const prodConfiguredBootstrap = buildAdminBootstrapPayload(undefined, {
      NODE_ENV: "production",
      TRACKING_ADMIN_TOKEN: "test-only-ephemeral-value-not-a-real-secret-token",
    });
    const prodMissingRejectsAuth = verifyAdminToken("any-token-value", {
      NODE_ENV: "production",
      TRACKING_ADMIN_TOKEN: "",
    });
    const priority1Passed =
      prodMissingBootstrap.previewToken === null &&
      prodMissingBootstrap.previewTokenAvailable === false &&
      prodMissingBootstrap.adminConfigured === false &&
      prodConfiguredBootstrap.previewToken === null &&
      prodConfiguredBootstrap.previewTokenAvailable === false &&
      prodConfiguredBootstrap.adminConfigured === true &&
      prodMissingRejectsAuth === false;

    results.push({
      id: "priority_1_bootstrap_security",
      name: "6. Priority 1: Production Bootstrap Never Exposes Token & Fails Closed",
      passed: priority1Passed,
      detail: priority1Passed
        ? "Confirmed: Production mode never returns previewToken, requires TRACKING_ADMIN_TOKEN, and fails closed when unconfigured."
        : "Production bootstrap security check failed.",
    });

    // Acceptance Test 7: Priority 2 — Atomic Order-Store Writes & Corrupted JSON Backup Recovery
    let priority2Passed = false;
    let priority2Detail = "";
    const tempTestDir = path.join(
      DATA_DIR,
      `.self_test_atomic_${process.pid}_${Date.now()}`
    );
    try {
      const testRepo = new TrackingRepository(tempTestDir);
      const createdTestOrder = testRepo.createOrder({
        customerReference: "Self-Test Client",
        serviceType: "SDM + Apostille Services",
        documentCategory: "Educational Documents",
        actorName: "SelfTest",
        actorRole: "Super Administrator",
      });
      // Simulate primary store corruption (truncated JSON) while valid backup exists
      const primaryPath = path.join(tempTestDir, "tracking_orders_store.json");
      const backupPath = path.join(
        tempTestDir,
        "tracking_orders_store.backup.json"
      );
      fs.writeFileSync(primaryPath, "{corrupted_truncated_json", "utf8");
      const recoveredStore = testRepo.loadStore();
      const recoveredOrderMatch =
        recoveredStore.orders.length === 1 &&
        recoveredStore.orders[0].trackingId === createdTestOrder.trackingId &&
        testRepo.getRecoveryStatus().status === "recovered_from_backup";

      // Simulate both primary and backup corrupted: must throw error and NEVER overwrite with empty store
      fs.writeFileSync(primaryPath, "{broken_primary", "utf8");
      fs.writeFileSync(backupPath, "{broken_backup", "utf8");
      let refusedEmptyOverwrite = false;
      try {
        testRepo.loadStore();
      } catch (err: any) {
        const rawPrimaryAfter = fs.readFileSync(primaryPath, "utf8");
        refusedEmptyOverwrite =
          String(err?.message || "").includes(
            "CRITICAL STORAGE RECOVERY REQUIRED"
          ) && rawPrimaryAfter === "{broken_primary";
      }

      priority2Passed = recoveredOrderMatch && refusedEmptyOverwrite;
      priority2Detail = priority2Passed
        ? "Confirmed: Atomic temp-file + fsync + rename writes succeed, corrupted primary store recovers automatically from backup, and unrecoverable corruption refuses to overwrite with an empty store."
        : "Atomic store write or backup recovery check failed.";
    } catch (err: any) {
      priority2Passed = false;
      priority2Detail = `Atomic store test error: ${err?.message || String(err)}`;
    } finally {
      try {
        fs.rmSync(tempTestDir, { recursive: true, force: true });
      } catch {}
    }

    results.push({
      id: "priority_2_atomic_store_and_recovery",
      name: "7. Priority 2: Atomic Order-Store Writes & Corrupted JSON Recovery",
      passed: priority2Passed,
      detail: priority2Detail,
    });

    // Acceptance Test 8: Priority 3 — Admin Auth Brute-Force Rate Limiting (5 failed / 15m -> HTTP 429)
    const badAuthCheck = verifyAdminToken("invalid-unauthorized-token-attempt");
    const testAdminLimiter = new TrackingRateLimiter(15 * 60 * 1000, 5);
    for (let i = 0; i < 5; i++) {
      testAdminLimiter.check("203.0.113.55");
    }
    const sixthAdminAttempt = testAdminLimiter.peek("203.0.113.55");
    const otherStaffIpAttempt = testAdminLimiter.peek("203.0.113.99");
    const priority3Passed =
      badAuthCheck === false &&
      sixthAdminAttempt.allowed === false &&
      sixthAdminAttempt.retryAfterSeconds > 0 &&
      otherStaffIpAttempt.allowed === true;

    results.push({
      id: "priority_3_admin_rate_limiting",
      name: "8. Priority 3: Admin Auth Rate Limiting (5 Failed / 15m -> HTTP 429)",
      passed: priority3Passed,
      detail: priority3Passed
        ? `Confirmed: 5 failed attempts trigger HTTP 429 (Retry-After: ${sixthAdminAttempt.retryAfterSeconds}s) for the offending IP without locking out other staff IPs.`
        : "Admin authentication rate limiter check failed.",
    });

    // Acceptance Test 9: Priority 4 — Trusted Canonical Tracking URL Validation
    let prodMissingDomainFailsSafely = false;
    try {
      buildReceiptQrTargetUrl(sampleToken, "https://evil-spoofed-host.com", {
        NODE_ENV: "production",
        PUBLIC_TRACKING_DOMAIN: "https://YOUR_DOMAIN",
      });
    } catch (err: any) {
      prodMissingDomainFailsSafely = String(err?.message || "").includes(
        "PUBLIC_TRACKING_DOMAIN"
      );
    }

    const prodValidQrUrls = buildReceiptQrTargetUrl(
      sampleToken,
      "https://evil-spoofed-host.com",
      {
        NODE_ENV: "production",
        PUBLIC_TRACKING_DOMAIN: "https://fatimaglobalattestation.com",
      }
    );
    const priority4Passed =
      prodMissingDomainFailsSafely &&
      prodValidQrUrls.canonicalQrUrl ===
        `https://fatimaglobalattestation.com/apostille-tracking?token=${sampleToken}` &&
      prodValidQrUrls.liveScanUrl ===
        `https://fatimaglobalattestation.com/apostille-tracking?token=${sampleToken}` &&
      !prodValidQrUrls.canonicalQrUrl.includes("evil-spoofed-host.com") &&
      !prodValidQrUrls.canonicalQrUrl.includes("YOUR_DOMAIN");

    results.push({
      id: "priority_4_canonical_qr_domain",
      name: "9. Priority 4: Trusted Canonical QR Domain & Host-Spoofing Protection",
      passed: priority4Passed,
      detail: priority4Passed
        ? "Confirmed: Production QR URLs use only validated https:// PUBLIC_TRACKING_DOMAIN, reject YOUR_DOMAIN placeholders, and ignore spoofed Host headers."
        : "Canonical QR domain validation check failed.",
    });

    res.json({
      allPassed: results.every((r) => r.passed),
      testedAt: new Date().toISOString(),
      results,
    });
  });

  // ==========================================================================
  // Dynamic robots.txt, sitemap.xml & X-Robots-Tag Header Enforcement
  // ==========================================================================
  app.use("/api", (_req, res, next) => {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    next();
  });

  app.get("/robots.txt", (_req, res) => {
    res
      .status(200)
      .setHeader("Content-Type", "text/plain; charset=utf-8")
      .send(generateRobotsTxt());
  });

  app.get("/sitemap.xml", (_req, res) => {
    res
      .status(200)
      .setHeader("Content-Type", "application/xml; charset=utf-8")
      .send(generateSitemapXml());
  });

  // ==========================================================================
  // Server-Side Route SEO Injection Helper for Crawlers & Social Previews
  // ==========================================================================
  const escapeHtmlAttr = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const injectRouteSEOIntoHtml = (
    rawHtml: string,
    reqPath: string
  ): { html: string; status: number; robots: string } => {
    const seo = resolveRouteSEO(reqPath);
    const safeTitle = escapeHtmlAttr(seo.title);
    const safeDesc = escapeHtmlAttr(seo.description);
    const safeUrl = escapeHtmlAttr(seo.canonicalUrl);
    const safeImg = escapeHtmlAttr(seo.ogImage);

    let html = rawHtml
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="robots" content="${seo.robots}" />`
      )
      .replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="canonical" href="${safeUrl}" />`
      )
      .replace(
        /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:type" content="${seo.ogType}" />`
      )
      .replace(
        /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:url" content="${safeUrl}" />`
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:title" content="${safeTitle}" />`
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:image" content="${safeImg}" />`
      )
      .replace(
        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:title" content="${safeTitle}" />`
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:description" content="${safeDesc}" />`
      )
      .replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:image" content="${safeImg}" />`
      );

    const jsonLdBlock =
      seo.jsonLd.length > 0
        ? `<script id="fga-route-structured-data" type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`
        : "";
    html = html.replace(
      /<script\s+id="fga-route-structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
      jsonLdBlock
    );

    // Inject static SEO H1 and checklist summary inside <noscript> for non-JS crawlers on /visa-checklist/[slug]
    const reqPathClean = (reqPath.split("?")[0] || "/").replace(/\/+$/, "") || "/";
    if (reqPathClean.startsWith("/visa-checklist/")) {
      const checklist = getVisaChecklistByPath(reqPathClean);
      if (checklist) {
        const staticSeoSnapshot = `<noscript id="fga-static-visa-checklist"><article><h1>${escapeHtmlAttr(
          checklist.h1
        )}</h1><p>${escapeHtmlAttr(checklist.subtitle)}</p><h2>${escapeHtmlAttr(
          checklist.importantInfoTitle
        )}</h2><p>${escapeHtmlAttr(checklist.importantInfoText)}</p></article></noscript>`;
        html = html.replace(/<\/body>/i, `${staticSeoSnapshot}</body>`);
      }
    }

    return {
      html,
      status: seo.isFound ? 200 : 404,
      robots: seo.robots,
    };
  };

  // Canonical 301 redirects for bare /visa-checklist or legacy /visa-checklists/:slug
  app.get(["/visa-checklist", "/visa-checklists"], (_req, res) => {
    res.redirect(301, "/visa-checklist/italy-student-visa");
  });

  app.get("/visa-checklists/:slug", (req, res) => {
    res.redirect(301, `/visa-checklist/${req.params.slug}`);
  });

  const isHtmlRouteRequest = (reqPath: string): boolean => {
    if (
      reqPath.startsWith("/api/") ||
      reqPath.startsWith("/src/") ||
      reqPath.startsWith("/@") ||
      reqPath.startsWith("/node_modules/") ||
      reqPath.startsWith("/assets/") ||
      reqPath.startsWith("/samples/")
    ) {
      return false;
    }
    return !/\.[a-zA-Z0-9]+$/.test(reqPath);
  };

  // Health check endpoints for Cloud Run startup/liveness probes
  app.get(
    ["/healthz", "/health", "/_ah/health", "/_ah/warmup", "/readyz", "/livez"],
    (_req, res) => {
      res.status(200).json({ status: "ok" });
    }
  );

  // ==========================================================================
  // Vite Middleware (Development) or Static Dist (Production / Cloud Run)
  // ==========================================================================
  const distPath = path.resolve(__dirname, "dist");
  const distIndexFile = path.join(distPath, "index.html");

  const isDevServerProcess =
    process.env.npm_lifecycle_event === "dev" ||
    process.execArgv.some((arg) => arg.includes("tsx")) ||
    process.argv.some((arg) => arg.includes("tsx"));

  const isCloudRunOrStart =
    process.env.npm_lifecycle_event === "start" ||
    process.env.NODE_ENV === "production" ||
    (typeof process.env.K_SERVICE === "string" &&
      !process.env.K_SERVICE.startsWith("ais-dev-")) ||
    !isDevServerProcess;

  const serveStaticDist = () => {
    // 1. Immutable Long-Term Edge CDN Caching for Bundled Static Assets
    app.use(
      express.static(distPath, {
        index: false,
        maxAge: "365d",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          } else {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );

    app.use((req, res, next) => {
      const fullReqUrl = req.originalUrl || req.url || "/";
      const routePath = fullReqUrl.split("?")[0] || "/";
      if (
        (req.method !== "GET" && req.method !== "HEAD") ||
        !isHtmlRouteRequest(routePath)
      ) {
        return next();
      }
      try {
        const targetHtmlFile = fs.existsSync(distIndexFile)
          ? distIndexFile
          : path.resolve(__dirname, "index.html");
        const rawHtml = fs.readFileSync(targetHtmlFile, "utf-8");
        const { html, robots } = injectRouteSEOIntoHtml(rawHtml, fullReqUrl);
        res
          .status(200)
          .setHeader("Content-Type", "text/html; charset=utf-8")
          .setHeader("X-Robots-Tag", robots)
          .setHeader(
            "Cache-Control",
            "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
          )
          .send(html);
      } catch (err) {
        next(err);
      }
    });
  };

  if (isCloudRunOrStart && fs.existsSync(distIndexFile)) {
    serveStaticDist();
  } else {
    let viteInstance: any = null;
    let viteInitPromise: Promise<any> | null = null;

    const getOrInitVite = async () => {
      if (viteInstance) return viteInstance;
      if (!viteInitPromise) {
        viteInitPromise = (async () => {
          const { createServer: createViteServer } = await import("vite");
          const v = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
          });
          viteInstance = v;
          return v;
        })().catch((err) => {
          viteInitPromise = null;
          throw err;
        });
      }
      return viteInitPromise;
    };

    try {
      await getOrInitVite();
    } catch (viteErr) {
      console.warn(
        "Initial Vite load deferred (dependencies may still be installing):",
        viteErr
      );
    }

    app.use(async (req, res, next) => {
      try {
        const vite = await getOrInitVite();
        if (req.url && req.url.startsWith("/src/")) {
          vite.moduleGraph.invalidateAll();
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate"
          );
        }
        return vite.middlewares(req, res, next);
      } catch {
        return next();
      }
    });

    app.use(async (req, res, next) => {
      const fullReqUrl = req.originalUrl || req.url || "/";
      const routePath = fullReqUrl.split("?")[0] || "/";
      if (
        (req.method !== "GET" && req.method !== "HEAD") ||
        !isHtmlRouteRequest(routePath)
      ) {
        return next();
      }
      try {
        const vite = await getOrInitVite();
        const indexFile = path.resolve(__dirname, "index.html");
        const template = fs.readFileSync(indexFile, "utf-8");
        const transformed = await vite.transformIndexHtml(
          req.originalUrl,
          template
        );
        const { html, robots } = injectRouteSEOIntoHtml(
          transformed,
          fullReqUrl
        );
        res
          .status(200)
          .setHeader("Content-Type", "text/html")
          .setHeader("X-Robots-Tag", robots)
          .send(html);
      } catch {
        try {
          const targetHtmlFile = fs.existsSync(distIndexFile)
            ? distIndexFile
            : path.resolve(__dirname, "index.html");
          const rawHtml = fs.readFileSync(targetHtmlFile, "utf-8");
          const { html, robots } = injectRouteSEOIntoHtml(rawHtml, fullReqUrl);
          res
            .status(200)
            .setHeader("Content-Type", "text/html")
            .setHeader("X-Robots-Tag", robots)
            .send(html);
        } catch (fallbackErr) {
          next(fallbackErr);
        }
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Fatima Global Attestation Server running on http://0.0.0.0:${PORT}`
    );
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
