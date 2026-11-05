/**
 * FATIMA GLOBAL ATTESTATION — Customer WhatsApp Notification & Sharing Service
 *
 * Rules enforced:
 * 1. Prepares the exact customer-specific WhatsApp tracking message containing
 *    their unique Tracking Reference and secure token-based tracking URL.
 * 2. If an approved Meta WhatsApp Business Cloud API integration is configured
 *    (WHATSAPP_BUSINESS_API_ENABLED=true, WHATSAPP_CLOUD_API_ACCESS_TOKEN,
 *    WHATSAPP_CLOUD_API_PHONE_NUMBER_ID) AND customer consent is recorded,
 *    sends the message automatically after order creation.
 * 3. If no WhatsApp Business API is configured, generates the manual WhatsApp
 *    deep link (https://wa.me/...) with the pre-filled message so authorized
 *    staff can review and send it manually. Never claims a message was sent
 *    automatically when it was not.
 */

import type { BusinessOrderStatus } from "../data/trackingTypes.ts";
import { BUSINESS_CONFIG } from "../config/business.ts";

export type WhatsAppDeliveryMode =
  | "not_configured_manual_ready"
  | "auto_sent_via_api"
  | "auto_send_failed"
  | "consent_not_granted_manual_ready"
  | "no_phone_provided";

export interface WhatsAppAdapterStatus {
  apiEnabled: boolean;
  credentialsConfigured: boolean;
  readyForAutomaticDelivery: boolean;
  providerLabel: string;
  honestStatusMessage: string;
}

export interface CustomerWhatsAppDispatchResult {
  autoSent: boolean;
  deliveryStatus: WhatsAppDeliveryMode;
  messageText: string;
  manualWhatsAppUrl: string;
  recipientPhoneFormatted: string | null;
  statusExplanation: string;
  apiMessageId?: string | null;
  dispatchedAt: string;
}

/**
 * Normalizes a customer phone number for internal storage and wa.me links.
 * Returns empty string if no valid digits are present.
 */
export function normalizeCustomerPhone(raw: unknown): {
  displayPhone: string;
  waMeDigits: string;
} {
  if (typeof raw !== "string") {
    return { displayPhone: "", waMeDigits: "" };
  }
  const trimmed = raw.trim();
  if (!trimmed) {
    return { displayPhone: "", waMeDigits: "" };
  }

  const digitsOnly = trimmed.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return { displayPhone: "", waMeDigits: "" };
  }

  // If 10-digit Indian mobile number (starting with 6-9), prepend 91
  const waMeDigits =
    digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)
      ? `91${digitsOnly}`
      : digitsOnly.startsWith("0") && digitsOnly.length === 11
      ? `91${digitsOnly.slice(1)}`
      : digitsOnly;

  const displayPhone = `+${waMeDigits}`;
  return { displayPhone, waMeDigits };
}

/**
 * Builds the exact customer WhatsApp message containing their Tracking Reference
 * and secure tracking URL.
 */
export function buildCustomerWhatsAppTrackingMessage(params: {
  trackingId: string;
  secureTrackingUrl: string;
  currentStatus?: BusinessOrderStatus;
  isStatusUpdate?: boolean;
}): string {
  const { trackingId, secureTrackingUrl, currentStatus, isStatusUpdate } =
    params;

  if (isStatusUpdate && currentStatus) {
    return [
      `Hello! Your Fatima Global Attestation order status has been updated to: ${currentStatus}.`,
      ``,
      `Tracking Reference: ${trackingId}`,
      ``,
      `Track your order status here: ${secureTrackingUrl}`,
      ``,
      `You can use this link to check the latest available status. For assistance, contact us on WhatsApp at ${BUSINESS_CONFIG.displayPhone}.`,
      ``,
      `Thank you for choosing Fatima Global Attestation.`,
    ].join("\n");
  }

  return [
    `Hello! Your Fatima Global Attestation order has been registered successfully.`,
    ``,
    `Tracking Reference: ${trackingId}`,
    ``,
    `Track your order status here: ${secureTrackingUrl}`,
    ``,
    `You can use this link to check the latest available status. For assistance, contact us on WhatsApp at ${BUSINESS_CONFIG.displayPhone}.`,
    ``,
    `Thank you for choosing Fatima Global Attestation.`,
  ].join("\n");
}

/**
 * Builds a manual WhatsApp share URL (https://wa.me/...) pre-filled with the
 * customer's message so authorized staff can review and send it manually.
 */
export function buildManualWhatsAppShareUrl(
  rawCustomerPhone: string | undefined,
  messageText: string
): string {
  const { waMeDigits } = normalizeCustomerPhone(rawCustomerPhone || "");
  const encodedText = encodeURIComponent(messageText);
  if (waMeDigits) {
    return `https://wa.me/${waMeDigits}?text=${encodedText}`;
  }
  return `https://wa.me/?text=${encodedText}`;
}

export function getWhatsAppBusinessApiStatus(): WhatsAppAdapterStatus {
  const apiEnabled =
    String(process.env.WHATSAPP_BUSINESS_API_ENABLED || "")
      .trim()
      .toLowerCase() === "true";

  const accessToken = (
    process.env.WHATSAPP_CLOUD_API_ACCESS_TOKEN || ""
  ).trim();
  const phoneNumberId = (
    process.env.WHATSAPP_CLOUD_API_PHONE_NUMBER_ID || ""
  ).trim();

  const credentialsConfigured = Boolean(
    accessToken &&
      accessToken !== "YOUR_WHATSAPP_CLOUD_API_ACCESS_TOKEN" &&
      phoneNumberId &&
      phoneNumberId !== "YOUR_WHATSAPP_PHONE_NUMBER_ID"
  );

  const readyForAutomaticDelivery = apiEnabled && credentialsConfigured;

  return {
    apiEnabled,
    credentialsConfigured,
    readyForAutomaticDelivery,
    providerLabel: readyForAutomaticDelivery
      ? "Meta WhatsApp Business Cloud API (Active)"
      : "Manual Staff WhatsApp Sharing (No Paid API Configured)",
    honestStatusMessage: readyForAutomaticDelivery
      ? "Approved WhatsApp Business Cloud API is configured and active for consented customer notifications."
      : "WhatsApp Business API is not configured. Orders prepare a pre-filled WhatsApp message so authorized staff can review and send it manually.",
  };
}

/**
 * Dispatches or prepares the customer WhatsApp tracking notification.
 * Never simulates or falsely claims automatic API delivery when not configured.
 */
export async function dispatchOrPrepareCustomerWhatsApp(params: {
  trackingId: string;
  secureTrackingUrl: string;
  customerPhone?: string;
  customerConsent?: boolean;
  currentStatus?: BusinessOrderStatus;
  isStatusUpdate?: boolean;
}): Promise<CustomerWhatsAppDispatchResult> {
  const now = new Date().toISOString();
  const messageText = buildCustomerWhatsAppTrackingMessage({
    trackingId: params.trackingId,
    secureTrackingUrl: params.secureTrackingUrl,
    currentStatus: params.currentStatus,
    isStatusUpdate: params.isStatusUpdate,
  });

  const { displayPhone, waMeDigits } = normalizeCustomerPhone(
    params.customerPhone || ""
  );
  const manualWhatsAppUrl = buildManualWhatsAppShareUrl(
    params.customerPhone,
    messageText
  );

  const apiStatus = getWhatsAppBusinessApiStatus();

  if (!waMeDigits) {
    return {
      autoSent: false,
      deliveryStatus: "no_phone_provided",
      messageText,
      manualWhatsAppUrl,
      recipientPhoneFormatted: null,
      statusExplanation:
        "No customer phone number was entered. Staff can still click 'Share Tracking Link on WhatsApp' to choose a contact and send the pre-filled message manually.",
      dispatchedAt: now,
    };
  }

  if (!params.customerConsent) {
    return {
      autoSent: false,
      deliveryStatus: "consent_not_granted_manual_ready",
      messageText,
      manualWhatsAppUrl,
      recipientPhoneFormatted: displayPhone,
      statusExplanation:
        "Automatic WhatsApp sending skipped (customer opt-in consent not checked). Pre-filled WhatsApp message is ready for manual review and sending.",
      dispatchedAt: now,
    };
  }

  if (!apiStatus.readyForAutomaticDelivery) {
    return {
      autoSent: false,
      deliveryStatus: "not_configured_manual_ready",
      messageText,
      manualWhatsAppUrl,
      recipientPhoneFormatted: displayPhone,
      statusExplanation:
        "No WhatsApp Business API is configured. Message was NOT sent automatically — click 'Share Tracking Link on WhatsApp' to open WhatsApp with the pre-filled message and send it manually.",
      dispatchedAt: now,
    };
  }

  // Real Meta WhatsApp Business Cloud API call when explicitly configured
  const accessToken = (
    process.env.WHATSAPP_CLOUD_API_ACCESS_TOKEN || ""
  ).trim();
  const phoneNumberId = (
    process.env.WHATSAPP_CLOUD_API_PHONE_NUMBER_ID || ""
  ).trim();

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(
        phoneNumberId
      )}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: waMeDigits,
          type: "text",
          text: {
            preview_url: true,
            body: messageText,
          },
        }),
      }
    );

    const data: any = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        autoSent: false,
        deliveryStatus: "auto_send_failed",
        messageText,
        manualWhatsAppUrl,
        recipientPhoneFormatted: displayPhone,
        statusExplanation: `WhatsApp Cloud API returned HTTP ${
          response.status
        }: ${
          data?.error?.message || "Delivery failed"
        }. Please use the manual 'Share Tracking Link on WhatsApp' button.`,
        dispatchedAt: now,
      };
    }

    const msgId = data?.messages?.[0]?.id || null;
    return {
      autoSent: true,
      deliveryStatus: "auto_sent_via_api",
      messageText,
      manualWhatsAppUrl,
      recipientPhoneFormatted: displayPhone,
      statusExplanation: `Automatically sent via WhatsApp Business Cloud API to ${displayPhone}.`,
      apiMessageId: msgId,
      dispatchedAt: now,
    };
  } catch (err: any) {
    return {
      autoSent: false,
      deliveryStatus: "auto_send_failed",
      messageText,
      manualWhatsAppUrl,
      recipientPhoneFormatted: displayPhone,
      statusExplanation: `WhatsApp Cloud API network error (${
        err?.message || "unavailable"
      }). Please use the manual 'Share Tracking Link on WhatsApp' button.`,
      dispatchedAt: now,
    };
  }
}
