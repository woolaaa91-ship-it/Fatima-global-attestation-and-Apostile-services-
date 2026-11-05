import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import QRCode from "qrcode";
import {
  type BusinessOrderStatus,
  type PublicTimelineEvent,
  type PublicTrackingOrderView,
  type ServerTrackingOrderRecord,
  type TrackingAuditLogEntry,
  type AdminStaffRole,
  BUSINESS_ORDER_STATUSES,
  ADMIN_STAFF_ROLES,
  isAllowedBusinessStatus,
} from "../data/trackingTypes.ts";
import { normalizeCustomerPhone } from "./whatsappIntegration.ts";

export interface PersistentTrackingStore {
  orders: ServerTrackingOrderRecord[];
  auditLogs: TrackingAuditLogEntry[];
  lastSequenceNumber?: number;
  updatedAt: string;
}

const DEFAULT_STARTING_SEQUENCE = 183; // Next generated order starts at FGA-2026-000184

/**
 * Strips HTML tags, script characters, and control characters from user/admin inputs.
 */
export function sanitizePlainText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function normalizeTrackingId(raw: unknown): string {
  if (typeof raw !== "string") return "";
  let cleaned = raw
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .trim();

  if (!cleaned) return "";

  // Strip duplicate FGA- prefixes if pasted (e.g. "FGA-FGA-2026-000184")
  while (cleaned.startsWith("FGA-FGA-")) {
    cleaned = cleaned.slice(4);
  }

  // If user entered "2026-000184" without "FGA-", prepend "FGA-"
  if (/^\d{4}-\d{1,6}$/.test(cleaned)) {
    const [yr, seq] = cleaned.split("-");
    return `FGA-${yr}-${seq.padStart(6, "0")}`;
  }

  // If user entered "2026000184" (10 digits: YYYY + 6-digit seq)
  if (/^\d{10}$/.test(cleaned) && cleaned.startsWith("20")) {
    return `FGA-${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }

  // If user entered "FGA-2026-184" (short sequence), pad to 6 digits
  const fgaShortMatch = cleaned.match(/^FGA-(\d{4})-(\d{1,6})$/);
  if (fgaShortMatch) {
    return `FGA-${fgaShortMatch[1]}-${fgaShortMatch[2].padStart(6, "0")}`;
  }

  // If user entered only sequence digits like "000184" or "184"
  if (/^\d{1,6}$/.test(cleaned)) {
    const year = new Date().getFullYear();
    return `FGA-${year}-${cleaned.padStart(6, "0")}`;
  }

  if (!cleaned.startsWith("FGA-")) {
    cleaned = `FGA-${cleaned.replace(/^FGA/, "").replace(/^-+/, "")}`;
  }

  return cleaned.slice(0, 32);
}

export function normalizePublicToken(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .toLowerCase()
    .replace(/[^a-f0-9]/g, "")
    .trim()
    .slice(0, 128);
}

export function getDefaultStatusSummary(status: BusinessOrderStatus): string {
  switch (status) {
    case "Order Received":
      return "Documents received and registered for processing.";
    case "Documents Under Review":
      return "Documents are under verification review.";
    case "Processing":
      return "Documents are currently in processing.";
    case "Sent for Attestation":
      return "Submitted to the competent authority for attestation/apostille.";
    case "Attestation Completed":
      return "Official attestation/apostille completed.";
    case "Ready for Dispatch":
      return "Completed documents are ready for dispatch.";
    case "Dispatched":
      return "Documents have been dispatched.";
    case "Completed":
    case "Delivered":
      return "Order completed and delivered.";
    case "On Hold — Contact Support":
      return "Order is on hold. Please contact support for assistance.";
    default:
      return `Order status updated to ${status}.`;
  }
}

/**
 * Generates a unique, non-repeating tracking reference for each valid order,
 * e.g. "FGA-2026-000184", guaranteeing zero duplicates across existing orders.
 */
export function generateUniqueTrackingId(
  existingIds: Set<string>,
  currentSequence = DEFAULT_STARTING_SEQUENCE
): { trackingId: string; nextSequence: number } {
  const year = new Date().getFullYear();
  let seq = Math.max(DEFAULT_STARTING_SEQUENCE, currentSequence) + 1;

  // Also inspect existing numeric FGA-YYYY-NNNNNN IDs so sequence never collides
  for (const id of existingIds) {
    const match = id.match(/^FGA-\d{4}-(\d{6})$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num >= seq) {
        seq = num + 1;
      }
    }
  }

  while (existingIds.has(`FGA-${year}-${String(seq).padStart(6, "0")}`)) {
    seq += 1;
  }

  const trackingId = `FGA-${year}-${String(seq).padStart(6, "0")}`;
  return { trackingId, nextSequence: seq };
}

/**
 * Generates a 192-bit (48-hex-character) cryptographically random, unguessable public tracking token
 */
export function generatePublicTrackingToken(): string {
  return crypto.randomBytes(24).toString("hex");
}

export function hashVerificationPin(pin: string): string {
  const normalized = pin.trim();
  const salt = "fga-order-pin-v1";
  return crypto.scryptSync(normalized, salt, 32).toString("hex");
}

export function verifyOrderPin(
  providedPin: string | undefined,
  storedHash: string | null | undefined
): boolean {
  if (!storedHash) return true;
  if (!providedPin || typeof providedPin !== "string") return false;
  const computed = hashVerificationPin(providedPin);
  const a = Buffer.from(computed, "utf-8");
  const b = Buffer.from(storedHash, "utf-8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Strictly maps a server order record to a customer-safe public view.
 * Deduplicates status timeline entries so the same status is never shown multiple times.
 * NEVER includes internalOrderId, customerReference, customerPhone, internalNotes,
 * verificationPinHash, or publicTrackingToken.
 */
export function toPublicTrackingOrderView(
  order: ServerTrackingOrderRecord
): PublicTrackingOrderView {
  const seenStatuses = new Set<string>();
  const cleanTimeline: PublicTimelineEvent[] = [];

  for (const ev of order.publicTimeline) {
    if (!seenStatuses.has(ev.status)) {
      seenStatuses.add(ev.status);
      cleanTimeline.push({
        id: ev.id,
        status: ev.status,
        summary: ev.summary,
        timestamp: ev.timestamp,
      });
    }
  }

  return {
    trackingId: order.trackingId,
    serviceType: order.serviceType,
    documentCategory: order.documentCategory,
    destinationCountry: order.destinationCountry || undefined,
    currentStatus: order.currentStatus,
    updatedAt: order.updatedAt,
    createdAt: order.createdAt,
    publicTimeline: cleanTimeline,
    supportWhatsAppText: `Hello Fatima Global Attestation, I am checking my document order with Tracking Reference: ${order.trackingId} (Current Status: ${order.currentStatus}). Please assist.`,
  };
}

export function isProductionEnvironment(
  envOverride?: NodeJS.ProcessEnv
): boolean {
  const env = envOverride || process.env;
  if (String(env.NODE_ENV || "").trim().toLowerCase() === "production") return true;
  if (Boolean(env.K_SERVICE || env.RENDER || env.VERCEL || env.FLY_APP_NAME || env.HEROKU_APP_ID || env.DIGITALOCEAN_APP_ID)) {
    return true;
  }
  return false;
}

export interface CanonicalDomainValidationResult {
  valid: boolean;
  canonicalOrigin: string | null;
  hostname: string | null;
  error?: string;
}

/**
 * Validates PUBLIC_TRACKING_DOMAIN against trusted production domain rules.
 * Rejects placeholders (such as YOUR_DOMAIN), invalid URLs, credentials, paths,
 * localhost in production, and non-HTTPS origins in production.
 */
export function validateCanonicalTrackingDomain(
  rawDomainInput?: string,
  envOverride?: NodeJS.ProcessEnv
): CanonicalDomainValidationResult {
  const env = envOverride || process.env;
  const raw = (
    rawDomainInput !== undefined
      ? rawDomainInput
      : env.PUBLIC_TRACKING_DOMAIN || ""
  ).trim();

  if (
    !raw ||
    raw.includes("YOUR_DOMAIN") ||
    raw.includes("YOUR-CUSTOM-DOMAIN-HERE") ||
    raw.includes("MY_APP_URL") ||
    raw.toLowerCase().endsWith(".example") ||
    raw.toLowerCase().includes("example.com")
  ) {
    return {
      valid: false,
      canonicalOrigin: null,
      hostname: null,
      error:
        "PUBLIC_TRACKING_DOMAIN is not configured or still contains a placeholder value.",
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return {
      valid: false,
      canonicalOrigin: null,
      hostname: null,
      error: "PUBLIC_TRACKING_DOMAIN is not a valid URL.",
    };
  }

  if (parsed.username || parsed.password || parsed.search || parsed.hash) {
    return {
      valid: false,
      canonicalOrigin: null,
      hostname: null,
      error:
        "PUBLIC_TRACKING_DOMAIN must be a clean origin URL without credentials, query parameters, or hash fragments.",
    };
  }

  const cleanPath = parsed.pathname.replace(/\/+$/, "");
  if (cleanPath && cleanPath !== "") {
    return {
      valid: false,
      canonicalOrigin: null,
      hostname: null,
      error:
        "PUBLIC_TRACKING_DOMAIN must be a root domain origin (e.g. https://fatimaglobalattestation.com) without a subpath.",
    };
  }

  const isProd = isProductionEnvironment(env);
  const hostLower = parsed.hostname.toLowerCase();
  const isLocalHost =
    hostLower === "localhost" ||
    hostLower === "127.0.0.1" ||
    hostLower === "0.0.0.0" ||
    hostLower.endsWith(".localhost");

  if (isProd) {
    if (parsed.protocol !== "https:") {
      return {
        valid: false,
        canonicalOrigin: null,
        hostname: null,
        error: "PUBLIC_TRACKING_DOMAIN must use https:// in production.",
      };
    }
    if (isLocalHost || !hostLower.includes(".")) {
      return {
        valid: false,
        canonicalOrigin: null,
        hostname: null,
        error:
          "PUBLIC_TRACKING_DOMAIN must be a valid public domain name in production (localhost is not permitted).",
      };
    }
  } else {
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return {
        valid: false,
        canonicalOrigin: null,
        hostname: null,
        error: "PUBLIC_TRACKING_DOMAIN must use https:// or http://.",
      };
    }
  }

  // Optional allowlist check if TRUSTED_PRODUCTION_DOMAINS is configured
  const trustedListRaw = (env.TRUSTED_PRODUCTION_DOMAINS || "").trim();
  if (trustedListRaw && !trustedListRaw.includes("YOUR_DOMAIN")) {
    const allowedHosts = trustedListRaw
      .split(",")
      .map((h) =>
        h
          .trim()
          .toLowerCase()
          .replace(/^https?:\/\//, "")
          .replace(/\/+$/, "")
      )
      .filter(Boolean);
    if (allowedHosts.length > 0 && !allowedHosts.includes(hostLower)) {
      return {
        valid: false,
        canonicalOrigin: null,
        hostname: null,
        error: `PUBLIC_TRACKING_DOMAIN host "${hostLower}" does not match TRUSTED_PRODUCTION_DOMAINS.`,
      };
    }
  }

  return {
    valid: true,
    canonicalOrigin: parsed.origin,
    hostname: hostLower,
  };
}

/**
 * Resolves a safe local/preview origin for development mode only.
 * Never trusts arbitrary third-party Host or X-Forwarded-Host values.
 */
export function resolveSafeDevOrigin(
  requestOrigin?: string,
  envOverride?: NodeJS.ProcessEnv
): string {
  const env = envOverride || process.env;
  const candidates = [env.APP_URL, requestOrigin];

  for (const candidate of candidates) {
    if (
      !candidate ||
      candidate.includes("MY_APP_URL") ||
      candidate.includes("YOUR_DOMAIN")
    ) {
      continue;
    }
    try {
      const parsed = new URL(candidate.trim());
      const host = parsed.hostname.toLowerCase();
      const isAllowedDevHost =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host.endsWith(".run.app");
      if (
        (parsed.protocol === "http:" || parsed.protocol === "https:") &&
        isAllowedDevHost
      ) {
        return parsed.origin;
      }
    } catch {
      // Ignore malformed candidate
    }
  }

  const port = Number(env.PORT) || 3000;
  return `http://localhost:${port}`;
}

/**
 * Resolves the secure tracking URL and canonical receipt QR URL for an order.
 * - In production (NODE_ENV=production), requires a validated PUBLIC_TRACKING_DOMAIN
 *   and constructs QR URLs exclusively from that canonical domain (never from Host
 *   or X-Forwarded-Host headers, and never using a YOUR_DOMAIN placeholder).
 * - In development, preserves local/preview workflow while validating any configured
 *   PUBLIC_TRACKING_DOMAIN.
 */
export function buildReceiptQrTargetUrl(
  publicTrackingToken: string,
  requestOrigin?: string,
  envOverride?: NodeJS.ProcessEnv
): {
  canonicalQrUrl: string;
  liveScanUrl: string;
  isProductionDomainConfigured: boolean;
  configuredDomainLabel: string;
} {
  const env = envOverride || process.env;
  const isProd = isProductionEnvironment(env);
  const cleanToken = normalizePublicToken(publicTrackingToken);
  if (!cleanToken || cleanToken.length < 32) {
    throw new Error("Invalid public tracking token for QR URL generation.");
  }

  const domainValidation = validateCanonicalTrackingDomain(undefined, env);

  if (isProd) {
    if (!domainValidation.valid || !domainValidation.canonicalOrigin) {
      throw new Error(
        domainValidation.error ||
          "Production configuration error: PUBLIC_TRACKING_DOMAIN must be set to a valid https:// domain before generating production QR codes."
      );
    }

    const canonicalUrl = `${domainValidation.canonicalOrigin}/apostille-tracking?token=${encodeURIComponent(
      cleanToken
    )}`;

    return {
      canonicalQrUrl: canonicalUrl,
      liveScanUrl: canonicalUrl,
      isProductionDomainConfigured: true,
      configuredDomainLabel: domainValidation.canonicalOrigin,
    };
  }

  // Development / preview mode
  const safeDevOrigin = resolveSafeDevOrigin(requestOrigin, env);
  const liveScanUrl = `${safeDevOrigin}/apostille-tracking?token=${encodeURIComponent(
    cleanToken
  )}`;

  if (domainValidation.valid && domainValidation.canonicalOrigin) {
    const canonicalQrUrl = `${domainValidation.canonicalOrigin}/apostille-tracking?token=${encodeURIComponent(
      cleanToken
    )}`;
    return {
      canonicalQrUrl,
      liveScanUrl,
      isProductionDomainConfigured: true,
      configuredDomainLabel: domainValidation.canonicalOrigin,
    };
  }

  return {
    canonicalQrUrl: liveScanUrl,
    liveScanUrl,
    isProductionDomainConfigured: false,
    configuredDomainLabel: `${safeDevOrigin} (Development Preview — PUBLIC_TRACKING_DOMAIN not set)`,
  };
}

export async function generateOrderQrCodeBundle(
  publicTrackingToken: string,
  useLiveScanUrl = true,
  requestOrigin?: string,
  envOverride?: NodeJS.ProcessEnv
): Promise<{
  canonicalQrUrl: string;
  liveScanUrl: string;
  encodedUrl: string;
  isProductionDomainConfigured: boolean;
  qrSvg: string;
  qrDataUrl: string;
}> {
  const env = envOverride || process.env;
  const isProd = isProductionEnvironment(env);
  const urls = buildReceiptQrTargetUrl(
    publicTrackingToken,
    requestOrigin,
    env
  );

  // If canonical production URL mode is explicitly requested when PUBLIC_TRACKING_DOMAIN is not set, fail safely
  if (!useLiveScanUrl && !urls.isProductionDomainConfigured) {
    const validation = validateCanonicalTrackingDomain(undefined, env);
    throw new Error(
      validation.error ||
        "PUBLIC_TRACKING_DOMAIN is not configured. Set a valid https:// PUBLIC_TRACKING_DOMAIN to generate canonical production QR codes."
    );
  }

  const encodedUrl = isProd
    ? urls.canonicalQrUrl
    : useLiveScanUrl
    ? urls.liveScanUrl
    : urls.canonicalQrUrl;

  const qrSvg = await QRCode.toString(encodedUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 240,
    color: {
      dark: "#0B2545",
      light: "#FFFFFF",
    },
  });

  const qrDataUrl = await QRCode.toDataURL(encodedUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: {
      dark: "#0B2545",
      light: "#FFFFFF",
    },
  });

  return {
    ...urls,
    encodedUrl,
    qrSvg,
    qrDataUrl,
  };
}

/**
 * Sliding-window IP rate limiter for public tracking requests and admin auth protection.
 * NOTE ON MULTI-INSTANCE LIMITATION: This limiter stores hit timestamps in process memory.
 * It enforces limits per Node.js process instance and does not share counters across
 * multiple horizontally scaled server instances unless backed by shared external storage.
 */
export class TrackingRateLimiter {
  private hits = new Map<string, number[]>();
  private readonly windowMs: number;
  private readonly maxAttempts: number;

  constructor(windowMs = 60_000, maxAttempts = 15) {
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
  }

  private pruneAndGetRecent(ipKey: string, now: number): number[] {
    const cutoff = now - this.windowMs;
    // Periodically clean up stale keys if map grows large
    if (this.hits.size > 2000) {
      for (const [k, timestamps] of this.hits.entries()) {
        const filtered = timestamps.filter((t) => t > cutoff);
        if (filtered.length === 0) {
          this.hits.delete(k);
        } else {
          this.hits.set(k, filtered);
        }
      }
    }
    const recent = (this.hits.get(ipKey) || []).filter((t) => t > cutoff);
    if (recent.length > 0) {
      this.hits.set(ipKey, recent);
    } else {
      this.hits.delete(ipKey);
    }
    return recent;
  }

  /**
   * Checks whether ipKey is currently allowed without recording a new hit.
   * Useful for checking if an IP is locked out before verifying credentials.
   */
  public peek(ipKey: string): {
    allowed: boolean;
    remaining: number;
    retryAfterSeconds: number;
  } {
    const now = Date.now();
    const recent = this.pruneAndGetRecent(ipKey, now);

    if (recent.length >= this.maxAttempts) {
      const oldest = recent[0] || now;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldest + this.windowMs - now) / 1000)
      );
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    return {
      allowed: true,
      remaining: Math.max(0, this.maxAttempts - recent.length),
      retryAfterSeconds: 0,
    };
  }

  /**
   * Records a hit for ipKey and returns whether the request is within limits.
   */
  public check(ipKey: string): {
    allowed: boolean;
    remaining: number;
    retryAfterSeconds: number;
  } {
    const now = Date.now();
    const recent = this.pruneAndGetRecent(ipKey, now);

    if (recent.length >= this.maxAttempts) {
      const oldest = recent[0] || now;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldest + this.windowMs - now) / 1000)
      );
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    recent.push(now);
    this.hits.set(ipKey, recent);
    return {
      allowed: true,
      remaining: Math.max(0, this.maxAttempts - recent.length),
      retryAfterSeconds: 0,
    };
  }

  public reset(ipKey: string): void {
    this.hits.delete(ipKey);
  }
}

/**
 * Atomically writes data to targetFile by:
 * 1. Writing to a temporary file in the same directory
 * 2. Flushing file buffers to disk via fs.fsyncSync(fd)
 * 3. Closing the file descriptor via fs.closeSync(fd)
 * 4. Atomically renaming the temporary file over targetFile via fs.renameSync()
 *
 * IMPORTANT DURABILITY LIMITATION:
 * Atomic writes and local backups protect against incomplete writes, process crashes
 * mid-write, and single-file JSON corruption on a persistent filesystem. They DO NOT
 * protect against an ephemeral hosting filesystem being wiped on container redeploy
 * or restart, or against permanent disk loss.
 */
export function resolveWritableDataDir(preferredDir: string): string {
  try {
    if (!fs.existsSync(preferredDir)) {
      fs.mkdirSync(preferredDir, { recursive: true });
    }
    const probeFile = path.join(
      preferredDir,
      `.write_probe_${process.pid}_${Date.now()}`
    );
    fs.writeFileSync(probeFile, "ok", { mode: 0o644 });
    fs.unlinkSync(probeFile);

    // Also verify existing JSON store files are readable by the current user
    const entries = fs.readdirSync(preferredDir);
    for (const entry of entries) {
      if (entry.endsWith(".json")) {
        fs.accessSync(
          path.join(preferredDir, entry),
          fs.constants.R_OK | fs.constants.W_OK
        );
      }
    }
    return preferredDir;
  } catch {
    const fallbackDir = path.join(os.tmpdir(), "fga-data");
    try {
      if (!fs.existsSync(fallbackDir)) {
        fs.mkdirSync(fallbackDir, { recursive: true });
      }
      if (fs.existsSync(preferredDir)) {
        const entries = fs.readdirSync(preferredDir);
        for (const entry of entries) {
          if (entry.endsWith(".json")) {
            const srcFile = path.join(preferredDir, entry);
            const destFile = path.join(fallbackDir, entry);
            if (!fs.existsSync(destFile)) {
              try {
                fs.copyFileSync(srcFile, destFile);
                fs.chmodSync(destFile, 0o644);
              } catch {
                // Ignore if source file is unreadable
              }
            }
          }
        }
      }
    } catch {
      // Ignore fallback seeding errors
    }
    return fallbackDir;
  }
}

export function atomicWriteFileSync(
  targetFile: string,
  content: string,
  mode = 0o644
): void {
  const dir = path.dirname(targetFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const uniqueSuffix = `${process.pid}.${Date.now()}.${crypto
    .randomBytes(4)
    .toString("hex")}`;
  const tempFile = `${targetFile}.${uniqueSuffix}.tmp`;
  let fd: number | null = null;

  try {
    fd = fs.openSync(tempFile, "w", mode);
    fs.writeFileSync(fd, content, "utf8");
    try {
      fs.fsyncSync(fd);
    } catch {
      // Virtual container filesystems (e.g. Cloud Run gVisor/tmpfs) may not support fsync
    }
    fs.closeSync(fd);
    fd = null;

    fs.renameSync(tempFile, targetFile);

    try {
      const dirFd = fs.openSync(dir, "r");
      try {
        fs.fsyncSync(dirFd);
      } finally {
        fs.closeSync(dirFd);
      }
    } catch {
      // Directory fsync may not be supported on all platforms
    }
  } catch (err) {
    if (fd !== null) {
      try {
        fs.closeSync(fd);
      } catch {}
    }
    try {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    } catch {}
    throw err;
  }
}

/**
 * Strictly parses and validates the tracking store JSON payload.
 * Throws a descriptive error if the JSON is malformed or missing required structures.
 */
export function parseAndValidateTrackingStore(
  raw: string,
  sourceLabel: string
): PersistentTrackingStore {
  if (!raw || !raw.trim()) {
    throw new Error(`${sourceLabel} is empty (0 bytes).`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err: any) {
    throw new Error(
      `${sourceLabel} contains invalid JSON: ${err?.message || "syntax error"}`
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${sourceLabel} root value must be a JSON object.`);
  }

  const obj = parsed as Record<string, unknown>;
  if (!Array.isArray(obj.orders)) {
    throw new Error(`${sourceLabel} is missing a valid "orders" array.`);
  }
  if (!Array.isArray(obj.auditLogs)) {
    throw new Error(`${sourceLabel} is missing a valid "auditLogs" array.`);
  }

  for (let i = 0; i < obj.orders.length; i++) {
    const o = obj.orders[i] as Record<string, unknown>;
    if (
      !o ||
      typeof o !== "object" ||
      typeof o.internalOrderId !== "string" ||
      !o.internalOrderId.trim() ||
      typeof o.trackingId !== "string" ||
      !o.trackingId.trim() ||
      typeof o.publicTrackingToken !== "string" ||
      !o.publicTrackingToken.trim() ||
      typeof o.currentStatus !== "string"
    ) {
      throw new Error(
        `${sourceLabel} contains a corrupted order record at index ${i}.`
      );
    }
  }

  const rawOrders = obj.orders as ServerTrackingOrderRecord[];
  const rawLogs = obj.auditLogs as TrackingAuditLogEntry[];

  // Deduplicate publicTimeline per status on each order so no status ever repeats
  const cleanedOrders = rawOrders.map((order) => {
    const seen = new Set<string>();
    const dedupedTimeline: PublicTimelineEvent[] = [];
    for (const ev of Array.isArray(order.publicTimeline)
      ? order.publicTimeline
      : []) {
      if (ev && typeof ev.status === "string" && !seen.has(ev.status)) {
        seen.add(ev.status);
        dedupedTimeline.push(ev);
      }
    }
    return {
      ...order,
      publicTimeline: dedupedTimeline,
    };
  });

  // Strip noisy WHATSAPP_NOTIFICATION_PREPARED and duplicate same-status logs
  const activeOrderIds = new Set(cleanedOrders.map((o) => o.internalOrderId));
  const cleanedLogs = rawLogs.filter((log) => {
    if (!log || typeof log !== "object") return false;
    if (!activeOrderIds.has(log.internalOrderId)) return false;
    if (log.action === "WHATSAPP_NOTIFICATION_PREPARED") return false;
    if (
      log.action === "STATUS_UPDATED" &&
      log.previousStatus &&
      log.previousStatus === log.newStatus
    ) {
      return false;
    }
    return true;
  });

  return {
    orders: cleanedOrders,
    auditLogs: cleanedLogs,
    lastSequenceNumber:
      typeof obj.lastSequenceNumber === "number" &&
      !isNaN(obj.lastSequenceNumber)
        ? obj.lastSequenceNumber
        : DEFAULT_STARTING_SEQUENCE,
    updatedAt:
      typeof obj.updatedAt === "string" && obj.updatedAt.trim()
        ? obj.updatedAt
        : new Date().toISOString(),
  };
}

export interface StoreRecoveryStatus {
  status: "healthy" | "recovered_from_backup" | "manual_recovery_required";
  lastRecoveryAt: string | null;
  lastRecoveryReason: string | null;
  corruptedSnapshotFile: string | null;
}

export class TrackingRepository {
  private readonly storeFile: string;
  private readonly backupFile: string;
  private readonly corruptedFile: string;
  private simulatedFailureMode = false;
  private writeInProgress = false;
  private recoveryStatus: StoreRecoveryStatus = {
    status: "healthy",
    lastRecoveryAt: null,
    lastRecoveryReason: null,
    corruptedSnapshotFile: null,
  };

  constructor(dataDir: string) {
    const writableDir = resolveWritableDataDir(dataDir);
    this.storeFile = path.join(writableDir, "tracking_orders_store.json");
    this.backupFile = path.join(
      writableDir,
      "tracking_orders_store.backup.json"
    );
    this.corruptedFile = path.join(
      writableDir,
      "tracking_orders_store.corrupted.json"
    );
    try {
      this.ensureStoreInitialized();
    } catch (err) {
      console.error(
        "[TrackingRepository] Warning during initial store check:",
        err
      );
    }
  }

  public getRecoveryStatus(): StoreRecoveryStatus {
    return { ...this.recoveryStatus };
  }

  public getBackendConfigStatus(envOverride?: NodeJS.ProcessEnv): {
    activeAdapter: "express_persistent_json" | "supabase_postgres";
    supabaseConfigured: boolean;
    supabaseUrlSet: boolean;
    supabaseServiceRoleKeySet: boolean;
    rlsMigrationFile: string;
    storeFile: string;
    backupFile: string;
    atomicWritesEnabled: boolean;
    recoveryStatus: StoreRecoveryStatus;
    canonicalDomain: CanonicalDomainValidationResult;
    durabilityLimitationNotice: string;
  } {
    const env = envOverride || process.env;
    const supabaseUrlSet = Boolean(
      env.SUPABASE_URL &&
        env.SUPABASE_URL !== "https://YOUR_PROJECT_ID.supabase.co" &&
        env.SUPABASE_URL.trim().startsWith("https://")
    );
    const supabaseServiceRoleKeySet = Boolean(
      env.SUPABASE_SERVICE_ROLE_KEY &&
        env.SUPABASE_SERVICE_ROLE_KEY !== "YOUR_SUPABASE_SERVICE_ROLE_KEY" &&
        env.SUPABASE_SERVICE_ROLE_KEY.trim().length > 20
    );

    return {
      activeAdapter: "express_persistent_json",
      supabaseConfigured: supabaseUrlSet && supabaseServiceRoleKeySet,
      supabaseUrlSet,
      supabaseServiceRoleKeySet,
      rlsMigrationFile: "supabase/migrations/001_apostille_tracking_orders.sql",
      storeFile: "data/tracking_orders_store.json",
      backupFile: "data/tracking_orders_store.backup.json",
      atomicWritesEnabled: true,
      recoveryStatus: this.getRecoveryStatus(),
      canonicalDomain: validateCanonicalTrackingDomain(undefined, env),
      durabilityLimitationNotice:
        "Atomic writes and local backups protect against incomplete writes and single-file JSON corruption, but do NOT protect against an ephemeral hosting filesystem being wiped on container redeploy/restart or permanent disk loss.",
    };
  }

  public setSimulatedFailureMode(enabled: boolean): void {
    this.simulatedFailureMode = enabled;
  }

  private ensureNotSimulatedFailure(): void {
    if (this.simulatedFailureMode) {
      throw new Error(
        "Database connection unavailable (simulated database failure active)."
      );
    }
  }

  private ensureStoreInitialized(): void {
    const primaryExists = fs.existsSync(this.storeFile);
    const backupExists = fs.existsSync(this.backupFile);

    if (!primaryExists && !backupExists) {
      const initial: PersistentTrackingStore = {
        orders: [],
        auditLogs: [],
        lastSequenceNumber: DEFAULT_STARTING_SEQUENCE,
        updatedAt: new Date().toISOString(),
      };
      this.saveStore(initial);
      return;
    }

    // Validate existing store on startup and automatically recover from backup if needed.
    // If both primary and backup are corrupted, loadStore() throws a clear error
    // without overwriting the corrupted store with an empty store.
    this.loadStore();
  }

  public loadStore(): PersistentTrackingStore {
    this.ensureNotSimulatedFailure();

    const primaryExists = fs.existsSync(this.storeFile);
    const backupExists = fs.existsSync(this.backupFile);

    if (primaryExists) {
      try {
        const raw = fs.readFileSync(this.storeFile, "utf-8");
        const validated = parseAndValidateTrackingStore(
          raw,
          "Primary order store (data/tracking_orders_store.json)"
        );

        // Ensure a valid backup copy exists on disk
        if (!backupExists) {
          atomicWriteFileSync(
            this.backupFile,
            JSON.stringify(validated, null, 2)
          );
        }

        return validated;
      } catch (primaryErr: any) {
        const reason = primaryErr?.message || String(primaryErr);
        console.error(
          `[TrackingRepository] Primary store validation failed: ${reason}`
        );

        // Preserve corrupted primary file for manual inspection before attempting recovery
        try {
          fs.copyFileSync(this.storeFile, this.corruptedFile);
        } catch {}

        if (backupExists) {
          try {
            const backupRaw = fs.readFileSync(this.backupFile, "utf-8");
            const recovered = parseAndValidateTrackingStore(
              backupRaw,
              "Backup order store (data/tracking_orders_store.backup.json)"
            );

            // Atomically restore primary store from verified backup
            atomicWriteFileSync(
              this.storeFile,
              JSON.stringify(recovered, null, 2)
            );

            this.recoveryStatus = {
              status: "recovered_from_backup",
              lastRecoveryAt: new Date().toISOString(),
              lastRecoveryReason: `Recovered ${recovered.orders.length} order(s) from backup after primary store error: ${reason}`,
              corruptedSnapshotFile:
                "data/tracking_orders_store.corrupted.json",
            };

            console.warn(
              `[TrackingRepository] Successfully recovered ${recovered.orders.length} order(s) from backup store.`
            );
            return recovered;
          } catch (backupErr: any) {
            this.recoveryStatus = {
              status: "manual_recovery_required",
              lastRecoveryAt: null,
              lastRecoveryReason: `Primary store and backup store are both unreadable. Primary: ${reason}. Backup: ${
                backupErr?.message || String(backupErr)
              }`,
              corruptedSnapshotFile:
                "data/tracking_orders_store.corrupted.json",
            };

            throw new Error(
              `CRITICAL STORAGE RECOVERY REQUIRED: Primary order store is corrupted and backup store could not be validated. Refusing to replace existing store with an empty store.`
            );
          }
        }

        this.recoveryStatus = {
          status: "manual_recovery_required",
          lastRecoveryAt: null,
          lastRecoveryReason: `Primary store is corrupted (${reason}) and no backup store exists.`,
          corruptedSnapshotFile: "data/tracking_orders_store.corrupted.json",
        };

        throw new Error(
          `CRITICAL STORAGE RECOVERY REQUIRED: Primary order store is corrupted (${reason}) and no valid backup store is available. Refusing to overwrite corrupted store with an empty store.`
        );
      }
    }

    if (backupExists) {
      try {
        const backupRaw = fs.readFileSync(this.backupFile, "utf-8");
        const recovered = parseAndValidateTrackingStore(
          backupRaw,
          "Backup order store (data/tracking_orders_store.backup.json)"
        );
        atomicWriteFileSync(
          this.storeFile,
          JSON.stringify(recovered, null, 2)
        );
        this.recoveryStatus = {
          status: "recovered_from_backup",
          lastRecoveryAt: new Date().toISOString(),
          lastRecoveryReason: `Restored missing primary store (${recovered.orders.length} order(s)) from valid backup store.`,
          corruptedSnapshotFile: null,
        };
        return recovered;
      } catch (backupErr: any) {
        this.recoveryStatus = {
          status: "manual_recovery_required",
          lastRecoveryAt: null,
          lastRecoveryReason: `Primary store is missing and backup store is corrupted: ${
            backupErr?.message || String(backupErr)
          }`,
          corruptedSnapshotFile: null,
        };
        throw new Error(
          `CRITICAL STORAGE RECOVERY REQUIRED: Primary store is missing and backup store is corrupted. Refusing to overwrite backup with an empty store.`
        );
      }
    }

    const emptyInitial: PersistentTrackingStore = {
      orders: [],
      auditLogs: [],
      lastSequenceNumber: DEFAULT_STARTING_SEQUENCE,
      updatedAt: new Date().toISOString(),
    };
    this.saveStore(emptyInitial);
    return emptyInitial;
  }

  public saveStore(store: PersistentTrackingStore): void {
    this.ensureNotSimulatedFailure();
    if (this.writeInProgress) {
      throw new Error(
        "Concurrent store write conflict detected; please retry operation."
      );
    }

    this.writeInProgress = true;
    try {
      const nextUpdatedAt = new Date().toISOString();
      const payloadToWrite: PersistentTrackingStore = {
        orders: Array.isArray(store.orders) ? store.orders : [],
        auditLogs: Array.isArray(store.auditLogs) ? store.auditLogs : [],
        lastSequenceNumber:
          typeof store.lastSequenceNumber === "number"
            ? store.lastSequenceNumber
            : DEFAULT_STARTING_SEQUENCE,
        updatedAt: nextUpdatedAt,
      };

      const serializedNext = JSON.stringify(payloadToWrite, null, 2);
      // Validate serialized payload before touching disk
      parseAndValidateTrackingStore(serializedNext, "Outgoing store payload");

      // If current primary file is valid JSON, preserve it in backupFile first
      if (fs.existsSync(this.storeFile)) {
        try {
          const currentRaw = fs.readFileSync(this.storeFile, "utf-8");
          parseAndValidateTrackingStore(currentRaw, "Existing primary store");
          atomicWriteFileSync(this.backupFile, currentRaw);
        } catch {
          // Do not overwrite a valid backupFile with a corrupted primary file
        }
      }

      // Atomically write primary store (temp file -> fsync -> close -> rename)
      atomicWriteFileSync(this.storeFile, serializedNext);
      // Keep backupFile synchronized with latest valid committed state
      atomicWriteFileSync(this.backupFile, serializedNext);

      store.updatedAt = nextUpdatedAt;
    } catch (err: any) {
      console.error("Error saving tracking store:", err);
      throw new Error(
        err?.message || "Database storage atomic write error."
      );
    } finally {
      this.writeInProgress = false;
    }
  }

  public findPublicOrderByTrackingId(
    rawTrackingId: string,
    providedPin?: string
  ): {
    status:
      | "found"
      | "not_found"
      | "pin_required"
      | "invalid_pin"
      | "archived";
    order?: PublicTrackingOrderView;
  } {
    const trackingId = normalizeTrackingId(rawTrackingId);
    if (!trackingId || trackingId.length < 6) {
      return { status: "not_found" };
    }

    const store = this.loadStore();
    const record = store.orders.find(
      (o) => o.trackingId.toUpperCase() === trackingId
    );
    if (!record || record.isArchived) {
      return { status: "not_found" };
    }

    if (record.requiresPin && record.verificationPinHash) {
      if (!providedPin || !providedPin.trim()) {
        return { status: "pin_required" };
      }
      if (!verifyOrderPin(providedPin, record.verificationPinHash)) {
        return { status: "invalid_pin" };
      }
    }

    return {
      status: "found",
      order: toPublicTrackingOrderView(record),
    };
  }

  public findPublicOrderByToken(
    rawToken: string,
    providedPin?: string
  ): {
    status:
      | "found"
      | "not_found"
      | "expired_token"
      | "pin_required"
      | "invalid_pin";
    order?: PublicTrackingOrderView;
  } {
    const token = normalizePublicToken(rawToken);
    if (!token || token.length < 32) {
      return { status: "not_found" };
    }

    const store = this.loadStore();
    const record = store.orders.find((o) => o.publicTrackingToken === token);
    if (!record || record.isArchived) {
      return { status: "not_found" };
    }

    if (record.tokenExpiresAt) {
      const expiryMs = Date.parse(record.tokenExpiresAt);
      if (!isNaN(expiryMs) && Date.now() > expiryMs) {
        return { status: "expired_token" };
      }
    }

    if (record.requiresPin && record.verificationPinHash) {
      if (!providedPin || !providedPin.trim()) {
        return { status: "pin_required" };
      }
      if (!verifyOrderPin(providedPin, record.verificationPinHash)) {
        return { status: "invalid_pin" };
      }
    }

    return {
      status: "found",
      order: toPublicTrackingOrderView(record),
    };
  }

  public createOrder(params: {
    customerReference: string;
    customerPhone?: string;
    customerWhatsAppConsent?: boolean;
    serviceType: string;
    documentCategory: string;
    destinationCountry?: string;
    initialStatus?: BusinessOrderStatus;
    initialPublicSummary?: string;
    internalNotes?: string;
    verificationPin?: string;
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord {
    const store = this.loadStore();
    const existingIds = new Set(
      store.orders.map((o) => o.trackingId.toUpperCase())
    );
    const existingTokens = new Set(
      store.orders.map((o) => o.publicTrackingToken)
    );

    const customerReference = sanitizePlainText(params.customerReference, 200);
    const { displayPhone } = normalizeCustomerPhone(params.customerPhone || "");
    const customerWhatsAppConsent = Boolean(params.customerWhatsAppConsent);
    const serviceType = sanitizePlainText(params.serviceType, 120);
    const documentCategory = sanitizePlainText(params.documentCategory, 100);
    const destinationCountry = sanitizePlainText(
      params.destinationCountry || "",
      80
    );
    const internalNotes = sanitizePlainText(params.internalNotes || "", 2000);
    const actorName = sanitizePlainText(
      params.actorName || "Administrator",
      80
    );
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(
      params.actorRole
    )
      ? params.actorRole
      : "Super Administrator";

    if (!customerReference || !serviceType || !documentCategory) {
      throw new Error(
        "Customer reference, service type, and document category are required."
      );
    }

    const initialStatus: BusinessOrderStatus = isAllowedBusinessStatus(
      params.initialStatus
    )
      ? params.initialStatus
      : "Order Received";

    const now = new Date().toISOString();
    const internalOrderId = crypto.randomUUID();
    const { trackingId, nextSequence } = generateUniqueTrackingId(
      existingIds,
      store.lastSequenceNumber ?? DEFAULT_STARTING_SEQUENCE
    );
    store.lastSequenceNumber = nextSequence;

    let publicTrackingToken = generatePublicTrackingToken();
    while (existingTokens.has(publicTrackingToken)) {
      publicTrackingToken = generatePublicTrackingToken();
    }

    const cleanPin = sanitizePlainText(params.verificationPin || "", 16);
    const requiresPin = cleanPin.length >= 4;
    const verificationPinHash = requiresPin
      ? hashVerificationPin(cleanPin)
      : null;

    const initialSummary =
      sanitizePlainText(params.initialPublicSummary || "", 280) ||
      getDefaultStatusSummary(initialStatus);

    const initialEvent: PublicTimelineEvent = {
      id: crypto.randomUUID(),
      status: initialStatus,
      summary: initialSummary,
      timestamp: now,
    };

    const newOrder: ServerTrackingOrderRecord = {
      internalOrderId,
      trackingId,
      publicTrackingToken,
      customerReference,
      customerPhone: displayPhone || undefined,
      customerWhatsAppConsent,
      whatsappDeliveryStatus: displayPhone
        ? "not_configured_manual_ready"
        : "no_phone_provided",
      whatsappLastNotifiedAt: null,
      verificationPinHash,
      requiresPin,
      serviceType,
      documentCategory,
      destinationCountry: destinationCountry || undefined,
      currentStatus: initialStatus,
      createdAt: now,
      updatedAt: now,
      internalNotes,
      publicTimeline: [initialEvent],
      tokenExpiresAt: null,
      isArchived: false,
      createdBy: `${actorName} (${actorRole})`,
      updatedBy: `${actorName} (${actorRole})`,
    };

    const auditEntry: TrackingAuditLogEntry = {
      auditId: crypto.randomUUID(),
      internalOrderId,
      trackingId,
      actorName,
      actorRole,
      action: "ORDER_CREATED",
      previousStatus: null,
      newStatus: initialStatus,
      details: `Created order ${trackingId} (${serviceType} — ${documentCategory}).`,
      timestamp: now,
    };

    store.orders.unshift(newOrder);
    store.auditLogs.unshift(auditEntry);
    this.saveStore(store);

    return newOrder;
  }

  public recordWhatsAppDispatchOutcome(params: {
    internalOrderId: string;
    deliveryStatus: ServerTrackingOrderRecord["whatsappDeliveryStatus"];
    autoSent: boolean;
    details: string;
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord | null {
    const store = this.loadStore();
    const idx = store.orders.findIndex(
      (o) => o.internalOrderId === params.internalOrderId
    );
    if (idx < 0) return null;

    const order = store.orders[idx];
    const now = new Date().toISOString();
    order.whatsappDeliveryStatus = params.deliveryStatus;

    // Only write an audit log entry when an automated WhatsApp Business API message
    // was actually sent, so manual previewing/preparation never bloats the Audit Log.
    if (params.autoSent) {
      order.whatsappLastNotifiedAt = now;
      store.auditLogs.unshift({
        auditId: crypto.randomUUID(),
        internalOrderId: order.internalOrderId,
        trackingId: order.trackingId,
        actorName: sanitizePlainText(params.actorName || "Administrator", 80),
        actorRole: params.actorRole,
        action: "WHATSAPP_AUTO_SENT",
        previousStatus: order.currentStatus,
        newStatus: order.currentStatus,
        details: sanitizePlainText(params.details, 300),
        timestamp: now,
      });
    }

    this.saveStore(store);
    return order;
  }

  public updateCustomerPhone(params: {
    internalOrderId: string;
    customerPhone: string;
    customerWhatsAppConsent?: boolean;
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord {
    const store = this.loadStore();
    const idx = store.orders.findIndex(
      (o) => o.internalOrderId === params.internalOrderId
    );
    if (idx < 0) {
      throw new Error("Order not found.");
    }

    const order = store.orders[idx];
    const now = new Date().toISOString();
    const { displayPhone } = normalizeCustomerPhone(params.customerPhone || "");
    const actorName = sanitizePlainText(
      params.actorName || "Administrator",
      80
    );
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(
      params.actorRole
    )
      ? params.actorRole
      : "Super Administrator";

    const nextPhone = displayPhone || undefined;
    const phoneChanged = (order.customerPhone || "") !== (nextPhone || "");
    const consentChanged =
      typeof params.customerWhatsAppConsent === "boolean" &&
      order.customerWhatsAppConsent !== params.customerWhatsAppConsent;

    if (!phoneChanged && !consentChanged) {
      return order;
    }

    order.customerPhone = nextPhone;
    if (typeof params.customerWhatsAppConsent === "boolean") {
      order.customerWhatsAppConsent = params.customerWhatsAppConsent;
    }
    order.whatsappDeliveryStatus = displayPhone
      ? "not_configured_manual_ready"
      : "no_phone_provided";
    order.updatedAt = now;
    order.updatedBy = `${actorName} (${actorRole})`;

    if (phoneChanged) {
      store.auditLogs.unshift({
        auditId: crypto.randomUUID(),
        internalOrderId: order.internalOrderId,
        trackingId: order.trackingId,
        actorName,
        actorRole,
        action: "CUSTOMER_PHONE_UPDATED",
        previousStatus: order.currentStatus,
        newStatus: order.currentStatus,
        details: displayPhone
          ? "Updated private customer WhatsApp phone number."
          : "Cleared private customer WhatsApp phone number.",
        timestamp: now,
      });
    }

    this.saveStore(store);
    return order;
  }

  public updateOrderStatus(params: {
    internalOrderId: string;
    newStatus: BusinessOrderStatus;
    publicSummary?: string;
    internalNotes?: string;
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord {
    if (!isAllowedBusinessStatus(params.newStatus)) {
      throw new Error(
        `Invalid business status. Allowed statuses: ${BUSINESS_ORDER_STATUSES.join(
          ", "
        )}`
      );
    }

    const store = this.loadStore();
    const idx = store.orders.findIndex(
      (o) => o.internalOrderId === params.internalOrderId
    );
    if (idx < 0) {
      throw new Error("Order not found.");
    }

    const order = store.orders[idx];
    const previousStatus = order.currentStatus;
    const customSummary = sanitizePlainText(params.publicSummary || "", 280);

    // Prevent duplicate timeline & audit entries when clicking Save on the same status without a new note
    if (params.newStatus === previousStatus && !customSummary) {
      return order;
    }

    const now = new Date().toISOString();
    const actorName = sanitizePlainText(
      params.actorName || "Administrator",
      80
    );
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(
      params.actorRole
    )
      ? params.actorRole
      : "Super Administrator";

    const summaryText =
      customSummary || getDefaultStatusSummary(params.newStatus);

    const newTimelineEvent: PublicTimelineEvent = {
      id: crypto.randomUUID(),
      status: params.newStatus,
      summary: summaryText,
      timestamp: now,
    };

    order.currentStatus = params.newStatus;
    order.updatedAt = now;
    order.updatedBy = `${actorName} (${actorRole})`;

    // Remove any existing timeline event for this exact status so the timeline never shows duplicate status blocks
    order.publicTimeline = [
      newTimelineEvent,
      ...order.publicTimeline.filter((ev) => ev.status !== params.newStatus),
    ];

    if (typeof params.internalNotes === "string") {
      order.internalNotes = sanitizePlainText(params.internalNotes, 2000);
    }

    store.auditLogs.unshift({
      auditId: crypto.randomUUID(),
      internalOrderId: order.internalOrderId,
      trackingId: order.trackingId,
      actorName,
      actorRole,
      action: "STATUS_UPDATED",
      previousStatus,
      newStatus: params.newStatus,
      details:
        previousStatus === params.newStatus
          ? `Updated public timeline note for "${params.newStatus}": "${summaryText}"`
          : `Status changed from "${previousStatus}" to "${params.newStatus}".`,
      timestamp: now,
    });

    this.saveStore(store);
    return order;
  }

  public updateInternalNotes(params: {
    internalOrderId: string;
    internalNotes: string;
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord {
    const store = this.loadStore();
    const idx = store.orders.findIndex(
      (o) => o.internalOrderId === params.internalOrderId
    );
    if (idx < 0) {
      throw new Error("Order not found.");
    }

    const order = store.orders[idx];
    const now = new Date().toISOString();
    const actorName = sanitizePlainText(
      params.actorName || "Administrator",
      80
    );
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(
      params.actorRole
    )
      ? params.actorRole
      : "Super Administrator";

    order.internalNotes = sanitizePlainText(params.internalNotes, 2000);
    order.updatedAt = now;
    order.updatedBy = `${actorName} (${actorRole})`;

    store.auditLogs.unshift({
      auditId: crypto.randomUUID(),
      internalOrderId: order.internalOrderId,
      trackingId: order.trackingId,
      actorName,
      actorRole,
      action: "INTERNAL_NOTE_UPDATED",
      previousStatus: order.currentStatus,
      newStatus: order.currentStatus,
      details: "Updated private internal staff notes.",
      timestamp: now,
    });

    this.saveStore(store);
    return order;
  }

  public rotateOrExpireToken(params: {
    internalOrderId: string;
    mode: "rotate" | "expire_now" | "clear_expiry";
    actorName: string;
    actorRole: AdminStaffRole;
  }): ServerTrackingOrderRecord {
    const store = this.loadStore();
    const idx = store.orders.findIndex(
      (o) => o.internalOrderId === params.internalOrderId
    );
    if (idx < 0) {
      throw new Error("Order not found.");
    }

    const order = store.orders[idx];
    const now = new Date().toISOString();
    const actorName = sanitizePlainText(
      params.actorName || "Administrator",
      80
    );
    const actorRole: AdminStaffRole = ADMIN_STAFF_ROLES.includes(
      params.actorRole
    )
      ? params.actorRole
      : "Super Administrator";

    if (params.mode === "rotate") {
      order.publicTrackingToken = generatePublicTrackingToken();
      order.tokenExpiresAt = null;
      store.auditLogs.unshift({
        auditId: crypto.randomUUID(),
        internalOrderId: order.internalOrderId,
        trackingId: order.trackingId,
        actorName,
        actorRole,
        action: "TOKEN_ROTATED",
        previousStatus: order.currentStatus,
        newStatus: order.currentStatus,
        details:
          "Generated a new cryptographic QR tracking token and invalidated old token.",
        timestamp: now,
      });
    } else if (params.mode === "expire_now") {
      order.tokenExpiresAt = new Date(Date.now() - 60_000).toISOString();
      store.auditLogs.unshift({
        auditId: crypto.randomUUID(),
        internalOrderId: order.internalOrderId,
        trackingId: order.trackingId,
        actorName,
        actorRole,
        action: "TOKEN_EXPIRED",
        previousStatus: order.currentStatus,
        newStatus: order.currentStatus,
        details: "Marked QR tracking token as expired.",
        timestamp: now,
      });
    } else {
      order.tokenExpiresAt = null;
    }

    order.updatedAt = now;
    order.updatedBy = `${actorName} (${actorRole})`;
    this.saveStore(store);
    return order;
  }
}
