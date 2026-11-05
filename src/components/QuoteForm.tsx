import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, AlertCircle } from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { SERVICES } from "../data/services";
import { WhatsAppIcon } from "./WhatsAppIcon";

const DESTINATION_COUNTRIES = [
  { name: "United Arab Emirates (UAE)", type: "Embassy & MOFA" },
  { name: "Kingdom of Saudi Arabia (KSA)", type: "Hague Apostille / QVP" },
  { name: "Qatar", type: "Embassy & MOFA" },
  { name: "Kuwait", type: "Embassy Legalization" },
  { name: "Oman", type: "Hague Apostille" },
  { name: "Bahrain", type: "Hague Apostille" },
  { name: "Germany", type: "Hague Apostille" },
  { name: "Italy", type: "Hague Apostille & DOV" },
  { name: "Spain", type: "Hague Apostille" },
  { name: "Portugal", type: "Hague Apostille" },
  { name: "Netherlands", type: "Hague Apostille" },
  { name: "France", type: "Hague Apostille" },
  { name: "Poland", type: "Hague Apostille" },
  { name: "United Kingdom (UK)", type: "Hague Apostille" },
  { name: "United States of America (USA)", type: "Hague Apostille" },
  { name: "Canada", type: "Hague Apostille" },
  { name: "Australia", type: "Hague Apostille" },
  { name: "China", type: "Embassy Legalization" },
  { name: "Vietnam", type: "Embassy Legalization" },
  { name: "Malaysia", type: "Embassy Legalization" },
  { name: "Egypt", type: "Embassy Legalization" },
];

const PURPOSE_OPTIONS = [
  "Employment Visa / Work Permit",
  "Higher Education / University Admission",
  "Family Reunification / Dependent Visa",
  "Permanent Residency / Citizenship",
  "Commercial Export & Trade",
  "Overseas Company Branch Setup / POA",
  "Saudi Arabia Death Claim Assistance",
  "Other Purpose",
];

export interface QuotePrefillDetails {
  serviceSlug?: string;
  destinationCountry?: string;
  purpose?: string;
  documentDetails?: string;
  timestamp?: number;
}

interface QuoteFormProps {
  title?: string;
  subtitle?: string;
  initialServiceSlug?: string;
  prefillDetails?: QuotePrefillDetails | null;
  className?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  title = "Request a Free Attestation Assessment",
  subtitle = "Share your document details below to receive an accurate process route, requirement checklist, and transparent fee quotation.",
  initialServiceSlug = "",
  prefillDetails = null,
  className = "",
}) => {
  const [fullName, setFullName] = useState("");
  const [serviceSlug, setServiceSlug] = useState(initialServiceSlug);
  const [destinationCountry, setDestinationCountry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [documentDetails, setDocumentDetails] = useState("");
  const [city, setCity] = useState("");
  const [validationError, setValidationError] = useState("");
  const [preparedChannel, setPreparedChannel] = useState<"whatsapp" | "email" | null>(null);

  useEffect(() => {
    if (initialServiceSlug) {
      setServiceSlug(initialServiceSlug);
    }
  }, [initialServiceSlug]);

  useEffect(() => {
    if (!prefillDetails) return;
    if (prefillDetails.serviceSlug) {
      setServiceSlug(prefillDetails.serviceSlug);
    }
    if (prefillDetails.destinationCountry) {
      const matchedCountry = DESTINATION_COUNTRIES.find(
        (c) => c.name.toLowerCase() === prefillDetails.destinationCountry?.toLowerCase()
      );
      setDestinationCountry(matchedCountry ? matchedCountry.name : "Other Country");
    }
    if (prefillDetails.purpose) {
      const matchedPurpose = PURPOSE_OPTIONS.find(
        (p) => p.toLowerCase() === prefillDetails.purpose?.toLowerCase()
      );
      setPurpose(matchedPurpose || "Other Purpose");
    }
    if (prefillDetails.documentDetails) {
      setDocumentDetails(prefillDetails.documentDetails);
    }
    setValidationError("");
  }, [prefillDetails]);

  const selectedServiceTitle =
    SERVICES.find((s) => s.slug === serviceSlug)?.shortTitle ||
    (serviceSlug === "other" ? "Other / Multiple Documents" : serviceSlug) ||
    "General Attestation / Apostille Inquiry";

  const validateForm = (): boolean => {
    if (fullName.trim().length < 2) {
      setValidationError("Please enter your name so our documentation desk can address your quotation.");
      return false;
    }
    if (!serviceSlug) {
      setValidationError("Please select the required service category.");
      return false;
    }
    if (!destinationCountry) {
      setValidationError("Please select your destination country.");
      return false;
    }
    if (!purpose) {
      setValidationError("Please select the primary purpose of submission (e.g., Employment, Education, Family Visa).");
      return false;
    }
    setValidationError("");
    return true;
  };

  const buildInquiryMessage = () => {
    const lines = [
      `Hello ${BUSINESS_CONFIG.shortName}, I would like a quotation and process assessment:`,
      ``,
      `• Name: ${fullName.trim() || "Not specified"}`,
      city.trim() ? `• Current City / State: ${city.trim()}` : null,
      `• Service Required: ${selectedServiceTitle}`,
      `• Destination Country: ${destinationCountry || "To be confirmed"}`,
      `• Purpose of Submission: ${purpose || "To be confirmed"}`,
      documentDetails.trim()
        ? `• Document Details: ${documentDetails.trim()}`
        : null,
      ``,
      `Please guide me on the required authentication route, timeline, and fee breakdown.`,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const getMailtoHref = () => {
    const subject = encodeURIComponent(
      `Attestation Quotation Request - ${selectedServiceTitle} (${
        destinationCountry || "India"
      })`
    );
    const body = encodeURIComponent(buildInquiryMessage());
    return `mailto:${BUSINESS_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setPreparedChannel(null);
      return;
    }
    const msg = buildInquiryMessage();
    setPreparedChannel("whatsapp");
    const link = document.createElement("a");
    link.href = getWhatsAppUrl(msg);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailSubmit = () => {
    if (!validateForm()) {
      setPreparedChannel(null);
      return;
    }
    setPreparedChannel("email");
    window.location.href = getMailtoHref();
  };

  return (
    <div
      className={`w-full max-w-full box-border bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-7 overflow-hidden ${className}`}
    >
      <div className="mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          Direct Specialist Review
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <form onSubmit={handleWhatsAppSubmit} noValidate className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (validationError) setValidationError("");
              }}
              placeholder="e.g. Mohammed Tariq"
              className="w-full max-w-full box-border px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
            />
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Current City / State
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. New Delhi, Noida, Mumbai, Dubai"
              className="w-full max-w-full box-border px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={serviceSlug}
              onChange={(e) => {
                setServiceSlug(e.target.value);
                if (validationError) setValidationError("");
              }}
              className="w-full max-w-full box-border px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
            >
              <option value="">Select Required Service...</option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.shortTitle}
                </option>
              ))}
              <option value="other">Other / Multiple Documents</option>
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Destination Country <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={destinationCountry}
              onChange={(e) => {
                setDestinationCountry(e.target.value);
                if (validationError) setValidationError("");
              }}
              className="w-full max-w-full box-border px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
            >
              <option value="">Select Target Country...</option>
              {DESTINATION_COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.type})
                </option>
              ))}
              <option value="Other Country">Other Destination Country</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Purpose of Submission <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
                if (validationError) setValidationError("");
              }}
              className="w-full max-w-full box-border px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50"
            >
              <option value="">Select Purpose of Submission...</option>
              {PURPOSE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Type &amp; Issuing State / University
            </label>
            <textarea
              rows={2}
              value={documentDetails}
              onChange={(e) => setDocumentDetails(e.target.value)}
              placeholder="e.g. B.Tech Degree (Delhi University) + Birth Certificate..."
              className="w-full max-w-full box-border px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-slate-50/50 resize-y"
            />
          </div>
        </div>

        {validationError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium leading-relaxed"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {preparedChannel && !validationError && (
          <div
            role="status"
            className="flex flex-col gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs leading-relaxed"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Enquiry Details Prepared!</span>{" "}
                {preparedChannel === "whatsapp"
                  ? "We have opened WhatsApp with your pre-filled document, destination country, and purpose details. Please press Send inside WhatsApp to transmit your message to our desk."
                  : "We have opened your email client with your pre-filled enquiry details. Please press Send inside your email app to transmit your request."}
              </div>
            </div>
            <div className="pl-6 flex flex-wrap items-center gap-3 pt-0.5">
              <a
                href={getWhatsAppUrl(buildInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-950"
              >
                Click here if WhatsApp did not open automatically →
              </a>
            </div>
          </div>
        )}

        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-3 rounded-xl text-sm shadow-sm transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Get Instant Quote on WhatsApp</span>
            <Send className="w-3.5 h-3.5 shrink-0 opacity-90" />
          </button>

          <button
            type="button"
            onClick={handleEmailSubmit}
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Send via Email</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          <span>
            No obligation • Transparent fee breakdown before submission
          </span>
          <a
            href={`tel:${BUSINESS_CONFIG.telPhone}`}
            className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-amber-700"
          >
            <Phone className="w-3 h-3 text-amber-600" />
            Direct Desk: {BUSINESS_CONFIG.displayPhone}
          </a>
        </div>
      </form>
    </div>
  );
};


