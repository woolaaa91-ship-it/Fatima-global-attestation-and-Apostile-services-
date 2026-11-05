/**
 * FATIMA GLOBAL ATTESTATION - Business Configuration
 * Centralized settings for contact numbers, branding, and disclaimers.
 */

export const BUSINESS_CONFIG = {
  name: "Fatima Global Attestation & Apostille Services",
  shortName: "Fatima Global Attestation",
  tagline: "YOUR DOCUMENTS, READY FOR THE WORLD",
  subheading: "APOSTILLE • ATTESTATION • EMBASSY LEGALIZATION • TRANSLATION",
  /**
   * CONFIGURABLE SITE URL:
   * Only accepts valid http(s):// origins so placeholder strings never leak into canonical/OG tags.
   */
  siteUrl: (() => {
    const candidates = [
      typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_SITE_URL : undefined,
      typeof process !== "undefined" ? process.env?.APP_URL : undefined,
      typeof process !== "undefined" ? process.env?.VITE_SITE_URL : undefined,
      typeof process !== "undefined" ? process.env?.SITE_URL : undefined,
    ];
    for (const candidate of candidates) {
      if (
        typeof candidate === "string" &&
        /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(candidate.trim()) &&
        !candidate.includes("YOUR-CUSTOM-DOMAIN-HERE")
      ) {
        return candidate.trim().replace(/\/+$/, "");
      }
    }
    return "https://fatimaglobalattestation.com";
  })(),
  
  /**
   * IMPORTANT CONFIGURATION:
   * Business WhatsApp number in international format without '+' or spaces.
   * Example for India: "919876543210".
   * Replace this placeholder with your actual registered WhatsApp business number.
   */
  whatsappNumber: "919310862661",
  
  /**
   * Business phone number formatted for display and tel: links
   */
  displayPhone: "+91 93108 62661",
  telPhone: "+919310862661",

  /**
   * Business email address
   */
  email: "info@fatimaglobalattestation.com", // PLACEHOLDER: Replace with actual business email
  
  /**
   * Business physical location / office address
   */
  address: "Barakhamba Road, Connaught Place, New Delhi 110001, India",
  serviceCoverage: "Pan-India document collection and courier facilitation across all states and Union Territories.",

  /**
   * Business hours
   */
  businessHours: "Monday to Saturday: 9:30 AM – 6:30 PM (IST)",
  sundayHours: "Sunday: Closed (WhatsApp enquiries monitored periodically)",

  /**
   * Mandatory Regulatory Disclaimer
   */
  disclaimer:
    "Fatima Global Attestation is an independent private documentation consultancy. We are not a government department, Ministry of External Affairs (MEA) office, embassy, high commission, or consulate. Final document acceptance, authentication, legalization, and visa decisions rest with the relevant authorities.",
};

/**
 * Builds a valid WhatsApp web/api URL with prefilled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = BUSINESS_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultMessage = `Hello Fatima Global Attestation, I would like to enquire about document attestation and apostille assistance.`;
  const message = customMessage || defaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
