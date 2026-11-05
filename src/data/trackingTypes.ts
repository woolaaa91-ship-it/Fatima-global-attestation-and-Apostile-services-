/**
 * FATIMA GLOBAL ATTESTATION — Apostille Tracking & Verification Types & Validation Rules
 * Shared between Express backend (server.ts) and React frontend components.
 */

export const BUSINESS_ORDER_STATUSES = [
  "Order Received",
  "Documents Under Review",
  "Processing",
  "Sent for Attestation",
  "Attestation Completed",
  "Ready for Dispatch",
  "Dispatched",
  "Completed",
  "Delivered",
  "On Hold — Contact Support",
] as const;

export type BusinessOrderStatus = (typeof BUSINESS_ORDER_STATUSES)[number];

export const TRACKING_DOCUMENT_CATEGORIES = [
  "Educational Documents",
  "Personal / Civil Documents",
  "Commercial & Export Documents",
  "Mixed Document Dossier",
] as const;

export type TrackingDocumentCategory =
  (typeof TRACKING_DOCUMENT_CATEGORIES)[number];

export const TRACKING_SERVICE_TYPES = [
  "SDM + Apostille Services",
  "Apostille Services in India (MEA)",
  "e-Sanad (Paper Documents) Assistance",
  "SDM + MEA Attestation",
  "Chamber of Commerce + Apostille",
  "Chamber of Commerce + MEA Attestation",
  "Document Translation Services",
  "Embassy Legalization Services",
  "UAE Embassy Attestation & MOFA",
  "Saudi Arabia Document Attestation / Apostille",
  "Saudi Arabia Death Claim Assistance",
  "Educational Document Attestation",
  "Personal Document Attestation",
] as const;

export const ADMIN_STAFF_ROLES = [
  "Super Administrator",
  "Operations Manager",
  "Verification Officer",
] as const;

export type AdminStaffRole = (typeof ADMIN_STAFF_ROLES)[number];

export interface PublicTimelineEvent {
  id: string;
  status: BusinessOrderStatus;
  summary: string;
  timestamp: string;
}

/**
 * Full server-side order record.
 * NEVER return this directly to public/unauthenticated clients.
 */
export interface ServerTrackingOrderRecord {
  internalOrderId: string;
  trackingId: string;
  publicTrackingToken: string;
  customerReference: string;
  customerPhone?: string;
  customerWhatsAppConsent?: boolean;
  whatsappDeliveryStatus?:
    | "not_configured_manual_ready"
    | "auto_sent_via_api"
    | "auto_send_failed"
    | "consent_not_granted_manual_ready"
    | "no_phone_provided";
  whatsappLastNotifiedAt?: string | null;
  verificationPinHash?: string | null;
  requiresPin: boolean;
  serviceType: string;
  documentCategory: string;
  destinationCountry?: string;
  currentStatus: BusinessOrderStatus;
  createdAt: string;
  updatedAt: string;
  internalNotes: string;
  publicTimeline: PublicTimelineEvent[];
  tokenExpiresAt?: string | null;
  isArchived?: boolean;
  createdBy: string;
  updatedBy: string;
}

/**
 * Strictly customer-safe order projection.
 * Excludes internalOrderId, customerReference, customerPhone, internalNotes,
 * verificationPinHash, and staff names.
 */
export interface PublicTrackingOrderView {
  trackingId: string;
  serviceType: string;
  documentCategory: string;
  destinationCountry?: string;
  currentStatus: BusinessOrderStatus;
  updatedAt: string;
  createdAt: string;
  publicTimeline: PublicTimelineEvent[];
  supportWhatsAppText: string;
}

export interface TrackingAuditLogEntry {
  auditId: string;
  internalOrderId: string;
  trackingId: string;
  actorName: string;
  actorRole: string;
  action:
    | "ORDER_CREATED"
    | "STATUS_UPDATED"
    | "INTERNAL_NOTE_UPDATED"
    | "CUSTOMER_PHONE_UPDATED"
    | "WHATSAPP_NOTIFICATION_PREPARED"
    | "WHATSAPP_AUTO_SENT"
    | "TIMELINE_EVENT_ADDED"
    | "TOKEN_ROTATED"
    | "TOKEN_EXPIRED"
    | "ORDER_ARCHIVED"
    | "ORDER_RESTORED";
  previousStatus?: BusinessOrderStatus | null;
  newStatus?: BusinessOrderStatus | null;
  details: string;
  timestamp: string;
}

/**
 * Official Indian Government e-Sanad / MEA Verification URLs
 */
export const OFFICIAL_GOVERNMENT_VERIFICATION_URLS = {
  checkStatus: "https://esanad.nic.in/checkStatus",
  eRegister: "https://esanad.nic.in/eregister",
  meaPortal: "https://www.mea.gov.in",
} as const;

export interface UrlValidationResult {
  isValidUrl: boolean;
  isHttps: boolean;
  hostname: string;
  normalizedUrl: string;
  trustLevel:
    | "official_esanad_portal"
    | "official_indian_gov_domain"
    | "unverified_or_suspicious_domain"
    | "invalid_format";
  warningMessage: string | null;
  canProceedToOfficialPortal: boolean;
}

/**
 * Validates any URL (such as one scanned from a physical Apostille QR code)
 * before opening or trusting the destination domain.
 * Never claims a document is genuine based solely on URL/QR structure.
 */
export function validateGovernmentVerificationUrl(
  rawInput: string
): UrlValidationResult {
  const trimmed = (rawInput || "").trim();
  if (!trimmed) {
    return {
      isValidUrl: false,
      isHttps: false,
      hostname: "",
      normalizedUrl: "",
      trustLevel: "invalid_format",
      warningMessage:
        "Please enter or paste a complete URL starting with https://",
      canProceedToOfficialPortal: false,
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      isValidUrl: false,
      isHttps: false,
      hostname: "",
      normalizedUrl: "",
      trustLevel: "invalid_format",
      warningMessage:
        "Invalid URL format. Official government verification links must be valid URLs (for example, https://esanad.nic.in/...).",
      canProceedToOfficialPortal: false,
    };
  }

  const isHttps = parsed.protocol === "https:";
  const host = parsed.hostname.toLowerCase();

  const isOfficialEsanad =
    host === "esanad.nic.in" || host.endsWith(".esanad.nic.in");
  const isOfficialGovIn =
    host === "mea.gov.in" ||
    host.endsWith(".mea.gov.in") ||
    host.endsWith(".gov.in") ||
    host.endsWith(".nic.in");

  if (!isHttps) {
    return {
      isValidUrl: true,
      isHttps: false,
      hostname: host,
      normalizedUrl: parsed.toString(),
      trustLevel: "unverified_or_suspicious_domain",
      warningMessage:
        "Security Warning: This link does not use encrypted HTTPS (https://). Do not enter personal or certificate details on non-HTTPS pages.",
      canProceedToOfficialPortal: false,
    };
  }

  if (isOfficialEsanad) {
    return {
      isValidUrl: true,
      isHttps: true,
      hostname: host,
      normalizedUrl: parsed.toString(),
      trustLevel: "official_esanad_portal",
      warningMessage: null,
      canProceedToOfficialPortal: true,
    };
  }

  if (isOfficialGovIn) {
    return {
      isValidUrl: true,
      isHttps: true,
      hostname: host,
      normalizedUrl: parsed.toString(),
      trustLevel: "official_indian_gov_domain",
      warningMessage:
        "This link points to an official Indian government (.gov.in / .nic.in) domain, though not the primary esanad.nic.in portal. Note that government QR formats can vary by issuing system or year—always verify certificate details carefully on the portal.",
      canProceedToOfficialPortal: true,
    };
  }

  return {
    isValidUrl: true,
    isHttps: true,
    hostname: host,
    normalizedUrl: parsed.toString(),
    trustLevel: "unverified_or_suspicious_domain",
    warningMessage: `Suspicious / Unofficial Domain Warning: The domain "${host}" is NOT an official Government of India (.nic.in or .gov.in) portal. Fraudulent certificates often use lookalike third-party domains. Do NOT trust verification results from unofficial domains.`,
    canProceedToOfficialPortal: false,
  };
}

export function isAllowedBusinessStatus(
  val: unknown
): val is BusinessOrderStatus {
  return (
    typeof val === "string" &&
    (BUSINESS_ORDER_STATUSES as readonly string[]).includes(val)
  );
}
