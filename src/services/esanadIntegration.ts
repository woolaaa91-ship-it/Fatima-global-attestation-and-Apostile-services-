/**
 * FATIMA GLOBAL ATTESTATION — Official e-Sanad / MEA Live Integration Interface
 * =============================================================================
 * ARCHITECTURAL & COMPLIANCE RULES:
 * 1. Do NOT invent an API endpoint, credentials, response schema, or government status.
 * 2. Do NOT enable this integration until official MEA / NIC API documentation
 *    and authorized access credentials are formally supplied.
 * 3. Do NOT scrape government pages, bypass CAPTCHA, or automate form submissions.
 * 4. Never confuse Fatima Global Attestation's internal business order status with
 *    official government processing status.
 */

import { OFFICIAL_GOVERNMENT_VERIFICATION_URLS } from "../data/trackingTypes.ts";

export interface EsanadIntegrationConfig {
  enabled: boolean;
  officialApiBaseUrl: string | null;
  officialClientIdConfigured: boolean;
  officialClientSecretConfigured: boolean;
}

export interface EsanadAdapterStatusResponse {
  liveIntegrationEnabled: boolean;
  statusCode:
    | "DISABLED_AWAITING_OFFICIAL_CREDENTIALS"
    | "SERVICE_UNAVAILABLE"
    | "READY";
  userMessage: string;
  technicalNotice: string;
  officialFallbackUrls: {
    checkStatus: string;
    eRegister: string;
  };
  checkedAt: string;
}

export interface EsanadVerificationLookupResult {
  completedViaLiveApi: false;
  reasonCode:
    | "OFFICIAL_API_NOT_ENABLED"
    | "MISSING_AUTHORIZED_CREDENTIALS"
    | "OFFICIAL_SERVICE_UNAVAILABLE";
  message: string;
  redirectUrl: string;
  eRegisterUrl: string;
  retryAvailable: boolean;
  timestamp: string;
}

export function getEsanadIntegrationConfig(): EsanadIntegrationConfig {
  const rawEnabled = process.env.ESANAD_LIVE_API_ENABLED === "true";
  const apiBaseUrl = process.env.ESANAD_OFFICIAL_API_BASE_URL?.trim() || null;
  const hasClientId = Boolean(
    process.env.ESANAD_OFFICIAL_CLIENT_ID &&
      process.env.ESANAD_OFFICIAL_CLIENT_ID !== "NOT_CONFIGURED" &&
      process.env.ESANAD_OFFICIAL_CLIENT_ID.trim().length > 0
  );
  const hasClientSecret = Boolean(
    process.env.ESANAD_OFFICIAL_CLIENT_SECRET &&
      process.env.ESANAD_OFFICIAL_CLIENT_SECRET !== "NOT_CONFIGURED" &&
      process.env.ESANAD_OFFICIAL_CLIENT_SECRET.trim().length > 0
  );

  // Strictly refuse to enable unless all official credentials and endpoint are explicitly provided
  const enabled =
    rawEnabled && Boolean(apiBaseUrl) && hasClientId && hasClientSecret;

  return {
    enabled,
    officialApiBaseUrl: apiBaseUrl,
    officialClientIdConfigured: hasClientId,
    officialClientSecretConfigured: hasClientSecret,
  };
}

export function getEsanadAdapterStatus(): EsanadAdapterStatusResponse {
  const cfg = getEsanadIntegrationConfig();

  if (!cfg.enabled) {
    return {
      liveIntegrationEnabled: false,
      statusCode: "DISABLED_AWAITING_OFFICIAL_CREDENTIALS",
      userMessage:
        "Direct live government API lookup is currently disabled because authorized MEA/NIC e-Sanad API credentials are not configured. Please verify your government Apostille or application status directly on the official e-Sanad portal.",
      technicalNotice:
        "Server-side e-Sanad adapter is in strict standby mode. No government pages are scraped and no CAPTCHA is bypassed.",
      officialFallbackUrls: {
        checkStatus: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.checkStatus,
        eRegister: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.eRegister,
      },
      checkedAt: new Date().toISOString(),
    };
  }

  return {
    liveIntegrationEnabled: false,
    statusCode: "SERVICE_UNAVAILABLE",
    userMessage:
      "Official e-Sanad API integration requires a verified government schema specification before live queries can be executed. Please use the official e-Sanad portal directly.",
    technicalNotice:
      "Credentials detected, but live schema execution remains locked until official NIC/MEA response specification is registered.",
    officialFallbackUrls: {
      checkStatus: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.checkStatus,
      eRegister: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.eRegister,
    },
    checkedAt: new Date().toISOString(),
  };
}

export async function requestOfficialEsanadVerification(): Promise<EsanadVerificationLookupResult> {
  const cfg = getEsanadIntegrationConfig();

  if (!cfg.enabled) {
    return {
      completedViaLiveApi: false,
      reasonCode: "OFFICIAL_API_NOT_ENABLED",
      message:
        "Authorized MEA/NIC e-Sanad API access is not enabled on this server. To verify a government-issued Apostille or check an official e-Sanad application number, please proceed directly to the official Government of India e-Sanad portal.",
      redirectUrl: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.checkStatus,
      eRegisterUrl: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.eRegister,
      retryAvailable: true,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    completedViaLiveApi: false,
    reasonCode: "OFFICIAL_SERVICE_UNAVAILABLE",
    message:
      "The official live e-Sanad API connection is currently unavailable or awaiting schema registration. Please retry later or verify directly on the official e-Sanad portal.",
    redirectUrl: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.checkStatus,
    eRegisterUrl: OFFICIAL_GOVERNMENT_VERIFICATION_URLS.eRegister,
    retryAvailable: true,
    timestamp: new Date().toISOString(),
  };
}
