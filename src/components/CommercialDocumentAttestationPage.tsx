import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  Phone,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  FileText,
  Building2,
  AlertTriangle,
  Stamp,
  Clock,
  FileStack,
  Globe,
  ArrowRight,
  Check,
  Loader2,
  ZoomIn,
  X,
  FileSearch,
  FileCheck2,
  ShieldCheck,
  Truck,
  Compass,
  Receipt,
  QrCode,
  MapPin,
  Lock,
} from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import {
  useImagePopupHistory,
  scrollToSectionById,
} from "../utils/modalHistory";
import { applyRouteSEO } from "../utils/seo";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion, FAQItem } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { QuoteForm } from "./QuoteForm";
import { useSequentialBoxShine } from "../utils/useSequentialBoxShine";

interface CommercialDocumentAttestationPageProps {
  onNavigate?: (path: string) => void;
}

const COMMERCIAL_ROUTES_OVERVIEW = [
  {
    badge: "Route 1 • Hague Member Countries",
    title: "Chamber of Commerce + MEA Apostille",
    description:
      "For Hague Convention countries (e.g., Germany, Italy, USA, UK, France, Netherlands, Spain, Oman). Your corporate document is first verified by a recognized Chamber of Commerce and then receives the ₹50 MEA Commercial Apostille sticker.",
  },
  {
    badge: "Route 2 • Gulf, Middle East & Non-Hague",
    title: "Chamber of Commerce + MEA + Embassy",
    description:
      "Mandatory for UAE, Qatar, Kuwait, Egypt, Iraq, Vietnam, China, and commercial export shipments to Saudi Arabia. After Chamber of Commerce and MEA attestation, the document is legalized by the destination Embassy in New Delhi.",
  },
  {
    badge: "Route 3 • Export Shipment Origin",
    title: "DGFT e-COO / Chamber Endorsement Route",
    description:
      "For Commercial Invoices, Packing Lists, and Certificates of Origin (COO). Exporters obtain Chamber of Commerce authentication (PHDCCI, FICCI, ASSOCHAM, FIEO) before MEA and Consular Legalization for foreign customs clearance.",
  },
];

const OFFICIAL_COMMERCIAL_FEES_AND_TIMELINES = [
  {
    title: "MEA Commercial Government Fee",
    description:
      "₹50 per commercial document for the official MEA Apostille sticker or MEA Normal Attestation stamp.",
    icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Chamber of Commerce & RAC Fee",
    description:
      "The MEA does not accept business documents directly. Chamber of Commerce endorsement fees and outsourced RAC agency fees apply per document.",
    icon: <Building2 className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Processing Timeframes",
    description:
      "Chamber of Commerce + MEA Apostille typically takes 2–3 working days. Adding Foreign Embassy Legalization (UAE, Qatar, Kuwait, Egypt) takes 4–8 working days.",
    icon: <Clock className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Embassy Commercial Invoice Tariffs",
    description:
      "For non-Hague countries, embassy consular fees are either fixed per corporate document (POA/COI) or calculated slab-wise based on the Commercial Invoice value.",
    icon: <FileStack className="w-5 h-5 text-[#0F766E]" />,
  },
];

interface CommercialDocRouteOption {
  label: string;
  shortName: string;
  recommendedChain: string;
  timelineNote: string;
}

const COMMERCIAL_ROUTE_DOC_OPTIONS: CommercialDocRouteOption[] = [
  {
    label: "Commercial Invoice & Packing List (Export Shipment)",
    shortName: "Commercial Invoice & Packing List",
    recommendedChain:
      "Chamber of Commerce → MEA Attestation/Apostille → Embassy Legalization (if Non-Hague/GCC)",
    timelineNote: "2–3 Working Days (Apostille) | 4–7 Working Days (with Embassy)",
  },
  {
    label: "Certificate of Origin (COO) & Free Sale Certificate (FSC)",
    shortName: "Certificate of Origin (COO) / FSC",
    recommendedChain:
      "Chamber of Commerce Endorsement → MEA → Destination Embassy / Apostille",
    timelineNote: "2–3 Working Days (Apostille) | 4–7 Working Days (with Embassy)",
  },
  {
    label: "Corporate Power of Attorney (POA) & Board Resolution",
    shortName: "Corporate POA & Board Resolution",
    recommendedChain:
      "Company Seal + Chamber of Commerce → MEA Apostille or Embassy Legalization",
    timelineNote: "2–3 Working Days (Hague Apostille) | 5–8 Working Days (Embassy)",
  },
  {
    label: "Certificate of Incorporation (COI) & MOA / AOA",
    shortName: "Incorporation (COI) & MOA / AOA",
    recommendedChain:
      "Chamber of Commerce Verification → MEA Commercial Apostille / Embassy Stamp",
    timelineNote: "2–3 Working Days (Hague Apostille) | 5–8 Working Days (Embassy)",
  },
  {
    label: "Distribution / Agency Agreement & Global Tender Dossier",
    shortName: "Agency Agreement & Tender Dossier",
    recommendedChain:
      "Chamber of Commerce → MEA Authentication → Consular Legalization / Apostille",
    timelineNote: "2–3 Working Days (Apostille) | 5–8 Working Days (Embassy)",
  },
  {
    label: "Pharma WHO-GMP / COPP / Health / Phytosanitary Certificate",
    shortName: "GMP / Health / Pharma Export Certificate",
    recommendedChain:
      "Regulatory Seal + Chamber of Commerce → MEA → Foreign Embassy Legalization",
    timelineNote: "3–4 Working Days (Apostille) | 5–9 Working Days (Embassy)",
  },
  {
    label: "Audited Balance Sheet / Bank Solvency / CA Certificate",
    shortName: "Audited Financial / Solvency Certificate",
    recommendedChain:
      "CA UDIN + Chamber of Commerce → MEA Commercial Apostille / Embassy",
    timelineNote: "2–3 Working Days (Apostille) | 5–7 Working Days (Embassy)",
  },
];

const CHAMBER_JURISDICTION_OPTIONS = [
  "Delhi NCR Apex Chambers (PHDCCI / FICCI / ASSOCHAM / FIEO)",
  "Maharashtra Corporate & Export Hub (Mumbai / Pune / JNPT / Nagpur)",
  "Gujarat Export & Manufacturing Hub (Ahmedabad / Surat / Vadodara / Mundra)",
  "Tamil Nadu & Karnataka Hub (Chennai / Bengaluru / Coimbatore)",
  "Telangana & AP Pharma/IT Hub (Hyderabad / Visakhapatnam)",
  "North India Industrial Hub (Gurugram / Noida / Ludhiana / Jaipur)",
  "All India Registered Pvt. Ltd. / LLP / Partnership / Exporter (IEC)",
];

const COMMERCIAL_DESTINATIONS = [
  "UAE (Dubai / Abu Dhabi — Chamber + MEA + UAE Embassy + MOFA)",
  "Saudi Arabia (KSA — Chamber + MEA Apostille / Saudi Embassy)",
  "Qatar / Kuwait / Bahrain (Chamber + MEA + GCC Embassy)",
  "Germany / Italy / France / Netherlands (Chamber + MEA Apostille)",
  "United States (USA) / United Kingdom (UK) (Chamber + MEA Apostille)",
  "Egypt / Iraq / Jordan / Algeria (Chamber + MEA + Arab Embassy)",
  "Vietnam / China / Thailand / Philippines (Asian Trade Legalization)",
  "Oman / Spain / Poland / Other Hague Convention Country",
];

interface InteractiveCommDocCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  routeFinderDocLabel: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_COMMERCIAL_CARDS: InteractiveCommDocCard[] = [
  {
    id: "comm-invoice-coo",
    title: "Commercial Invoice & COO",
    subtitle: "Export invoices, packing lists & Certificates of Origin.",
    routeBadge: "Chamber of Commerce → MEA → Embassy / Apostille",
    routeFinderDocLabel: "Commercial Invoice & Packing List (Export Shipment)",
    bgTintClass: "bg-[#F6EFE2]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="20"
          y="10"
          width="32"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <rect x="36" y="20" width="3" height="8" rx="1" fill="#EF4444" />
        <rect x="41" y="17" width="3" height="11" rx="1" fill="#0B2545" />
        <rect x="46" y="14" width="3" height="14" rx="1" fill="#0F766E" />
        <line
          x1="26"
          y1="34"
          x2="46"
          y2="34"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="26"
          y1="40"
          x2="42"
          y2="40"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="8" y="28" width="26" height="20" rx="4" fill="#0B2545" />
        <rect x="18" y="36" width="6" height="4" rx="1" fill="#FBBF24" />
      </svg>
    ),
  },
  {
    id: "comm-poa-resolution",
    title: "Corporate POA & Board Resolution",
    subtitle: "Powers of Attorney, Board Minutes & Authority Letters.",
    routeBadge: "Chamber of Commerce → MEA Apostille / Embassy",
    routeFinderDocLabel: "Corporate Power of Attorney (POA) & Board Resolution",
    bgTintClass: "bg-[#EAF2FD]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="34"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="22"
          x2="42"
          y2="22"
          stroke="#0B2545"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="29"
          x2="38"
          y2="29"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="36"
          x2="34"
          y2="36"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="42" cy="44" r="6" fill="#0F766E" />
        <path
          d="M39 44L41 46L45 42"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "comm-coi-moa",
    title: "Incorporation (COI), MOA & AOA",
    subtitle: "Company registration, Memorandum & Articles of Association.",
    routeBadge: "Chamber of Commerce → MEA Commercial Apostille",
    routeFinderDocLabel: "Certificate of Incorporation (COI) & MOA / AOA",
    bgTintClass: "bg-[#E6F6EC]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <rect x="22" y="18" width="20" height="10" rx="2" fill="#0B2545" />
        <line
          x1="20"
          y1="35"
          x2="44"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="42"
          x2="36"
          y2="42"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "comm-pharma-fsc",
    title: "Free Sale (FSC), GMP & Health",
    subtitle: "Pharma WHO-GMP, COPP, Free Sale, Halal & Phytosanitary.",
    routeBadge: "Chamber + MEA → Foreign Embassy Legalization",
    routeFinderDocLabel:
      "Pharma WHO-GMP / COPP / Health / Phytosanitary Certificate",
    bgTintClass: "bg-[#FBECE8]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          d="M32 18V28M27 23H37"
          stroke="#DC2626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="35"
          x2="44"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="42"
          x2="38"
          y2="42"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "comm-agency-tender",
    title: "Agency Contracts & Tender Bids",
    subtitle: "Distribution agreements, JV contracts & global tender docs.",
    routeBadge: "Chamber of Commerce → MEA → Consular Stamp",
    routeFinderDocLabel:
      "Distribution / Agency Agreement & Global Tender Dossier",
    bgTintClass: "bg-[#E0F2FE]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="22"
          x2="44"
          y2="22"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="29"
          x2="40"
          y2="29"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="38" cy="43" r="6" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "comm-financial-audit",
    title: "Balance Sheets & Bank Solvency",
    subtitle: "Audited financial statements, turnover & bank letters.",
    routeBadge: "Chamber of Commerce → MEA Apostille / Embassy",
    routeFinderDocLabel:
      "Audited Balance Sheet / Bank Solvency / CA Certificate",
    bgTintClass: "bg-[#EAEFF5]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="10"
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          d="M22 38L29 31L35 35L43 24"
          stroke="#0F766E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="20"
          y1="45"
          x2="44"
          y2="45"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface CommercialSpecimenItem {
  id: string;
  title: string;
  badge: string;
  image: string;
  privacyLabel: string;
  destinationOrUse: string;
  description: string;
  elementsVerified: string[];
  whatsappMessage: string;
}

const COMMERCIAL_SPECIMENS: CommercialSpecimenItem[] = [
  {
    id: "comm-chamber-apostille-specimen",
    title: "Chamber of Commerce + MEA Commercial Apostille Specimen",
    badge: "Chamber + MEA Apostille",
    image: "/samples/sample_chamber_apostille_commercial.jpg",
    privacyLabel: "Illustrative Sample — Corporate Details Protected",
    destinationOrUse:
      "Hague Convention Countries (Germany, Italy, USA, UK, France, Netherlands, Oman)",
    description:
      "Indian corporate document reverse side showing the recognized Chamber of Commerce authentication seal alongside the Ministry of External Affairs (MEA) Commercial Hague Apostille sticker and CPV circular stamp. Company names, signatory details, QR codes, and serial numbers are permanently masked.",
    elementsVerified: [
      "Recognized Chamber of Commerce Official Endorsement & Rubber Stamp",
      "Ministry of External Affairs (MEA) Commercial Hague Apostille Sticker",
      "CPV Division Consular Circular Stamp & Authorized Officer Signature",
      "Company Name, Signatory Details, QR Code & Serial Numbers Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the Chamber of Commerce + MEA Commercial Apostille specimen and need assistance with our company documents.",
  },
  {
    id: "comm-chamber-stamp-specimen",
    title: "Recognized Chamber of Commerce Authentication Stamp Layout",
    badge: "Chamber of Commerce Seal",
    image: "/samples/sample_chamber_of_commerce_attestation.jpg",
    privacyLabel: "Illustrative Sample — Corporate Details Protected",
    destinationOrUse:
      "Mandatory Pre-Verification Step Before MEA & Foreign Embassy Legalization",
    description:
      "Close-up reference specimen of a recognized Indian Chamber of Commerce authentication stamp, reference number endorsement, and authorized officer signature required before submitting export invoices, COOs, or corporate POAs to the MEA and foreign embassies.",
    elementsVerified: [
      "Official Chamber of Commerce Verification Rubber Stamp & Seal",
      "Authorized Chamber Signatory Endorsement & Reference Date",
      "Compliant with MEA CPV Division & Foreign Embassy Consular Rules",
      "Exporter Name, Invoice Value & Registration Numbers Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, we need Chamber of Commerce attestation and MEA/Embassy legalization for our commercial export documents.",
  },
];

const COMMERCIAL_PROCESS_STEPS = [
  {
    step: 1,
    title: "Corporate Execution & Authorized Signatory Stamp",
    description:
      "Commercial documents are prepared on official company letterhead or stamp paper and signed by an authorized company director or signatory with the company seal.",
  },
  {
    step: 2,
    title: "Chamber of Commerce Attestation",
    description:
      "Before the MEA will accept a business document, it must first be authenticated by a recognized Chamber of Commerce (such as PHDCCI, FIEO, FICCI, ASSOCHAM, or a regional Chamber of Commerce).",
  },
  {
    step: 3,
    title: "MEA Commercial Apostille or Normal Attestation",
    description:
      "After Chamber of Commerce verification, the document is submitted to the Ministry of External Affairs (MEA) in New Delhi for an Apostille sticker (for Hague countries) or normal attestation stamp.",
  },
  {
    step: 4,
    title: "Foreign Embassy Legalization (If Required)",
    description:
      "For non-Hague destinations or countries requiring consular legalization for trade documents (such as UAE, Saudi Arabia, Qatar, Kuwait, Egypt, or Vietnam), the document is legalized by the respective Embassy in New Delhi.",
  },
];

const COMMERCIAL_DOCUMENT_TYPES = [
  {
    title: "Export & Shipping Documents",
    description:
      "Commercial Invoices, Packing Lists, Certificates of Origin (COO), Free Sale Certificates (FSC), and Health/Phytosanitary Certificates.",
    icon: Briefcase,
  },
  {
    title: "Corporate & Legal Documents",
    description:
      "Corporate Power of Attorney (POA), Board Resolutions, Memorandum & Articles of Association (MOA/AOA), and Certificates of Incorporation.",
    icon: Building2,
  },
  {
    title: "Financial & Tender Documents",
    description:
      "Audited Balance Sheets, Bank Solvency Certificates, GMP Certificates, and International Distribution or Agency Agreements.",
    icon: FileText,
  },
];

const SUPPORTING_KYC_ITEMS = [
  "Covering letter on official Company Letterhead stating the purpose and destination country.",
  "Copy of Certificate of Incorporation, Company PAN Card, and GST / IEC Certificate.",
  "Board Resolution or Authority Letter authorizing the signatory who signed the document.",
  "Self-attested ID proof (Passport / PAN / Aadhaar) of the Authorized Signatory.",
];

const COMMERCIAL_TRUST_FACTORS = [
  {
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
    title: "Pre-Submission KYC & Format Audit",
    desc: "We check your letterhead, director stamp, Board Resolution, and IEC/GST supporting papers on WhatsApp before physical submission so Chambers or Embassies don't reject them.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Direct Apex Chamber Liaison",
    desc: "Fast coordination with MEA-recognized Chambers of Commerce in New Delhi alongside our Connaught Place desk.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Exact Embassy Invoice Slab Check",
    desc: "Embassies like UAE, Qatar, Kuwait & Egypt charge commercial fees by invoice slab or document type. We share the exact official consular fee upfront.",
  },
  {
    icon: <Truck className="w-5 h-5 text-teal-700" />,
    title: "Bulk Shipment & Corporate Courier",
    desc: "Dedicated handling for multi-invoice export sets, pharmaceutical dossiers, and urgent tender submissions across all Indian industrial hubs.",
  },
];

const COMMERCIAL_OFFICIAL_PORTALS = [
  {
    title:
      "Trade Connect ePlatform (DGFT / Ministry of Commerce — Certificate of Origin)",
    href: "https://www.trade.gov.in",
  },
  {
    title:
      "Ministry of External Affairs (MEA) — Official Commercial Apostille & Attestation Rules",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title:
      "HCCH — Official Hague Apostille Convention Member Countries Table",
    href: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
  },
];

const POPULAR_EXPORT_AND_CORPORATE_COUNTRIES = [
  { name: "UAE (Chamber + MEA + Embassy)", slug: "/countries/uae-mofa-attestation" },
  { name: "Saudi Arabia (KSA)", slug: "/countries/saudi-arabia-attestation" },
  { name: "Qatar", slug: "/countries/qatar" },
  { name: "Kuwait", slug: "/countries/kuwait" },
  { name: "Germany", slug: "/countries/germany" },
  { name: "Italy", slug: "/countries/italy" },
  { name: "United States (USA)", slug: "/countries/usa" },
  { name: "Oman", slug: "/countries/oman" },
];

const RELATED_COMMERCIAL_GUIDES = [
  {
    title: "Embassy Legalization Services (All Embassies)",
    slug: "/services/embassy-legalization",
    tag: "Non-Hague Consular Route",
  },
  {
    title: "Apostille Services in India (Hague Countries)",
    slug: "/services/apostille",
    tag: "MEA Hague Sticker",
  },
  {
    title: "UAE MOFA & Commercial Invoice Attestation",
    slug: "/countries/uae-mofa-attestation",
    tag: "Middle East Export",
  },
  {
    title: "Certified Arabic, Spanish & European Translation",
    slug: "/services/document-translation",
    tag: "Commercial Translation",
  },
];

export const COMMERCIAL_ATTESTATION_FAQS: FAQItem[] = [
  {
    question:
      "Why is Chamber of Commerce attestation mandatory for commercial documents?",
    answer:
      "Unlike personal or educational certificates (which go through SDM or State HRD), the Ministry of External Affairs (MEA) requires all business, corporate, and export documents to be pre-verified by an authorized Chamber of Commerce in India before MEA submission.",
  },
  {
    question:
      "Do Commercial Invoices and Powers of Attorney require Embassy Legalization for the Middle East?",
    answer:
      "Yes. For GCC and Middle East countries (such as the UAE, Saudi Arabia, Qatar, Kuwait, Iraq, and Egypt), corporate Powers of Attorney, Commercial Invoices, Certificates of Origin, and Agency Agreements generally require Chamber of Commerce attestation, MEA attestation, and Embassy legalization.",
  },
  {
    question: "How are embassy fees calculated for commercial documents?",
    answer:
      "Embassy consular fees for commercial documents vary depending on the destination country's embassy rules. Some embassies charge a flat fee per document type, while others calculate fees based on the invoice amount. We confirm the exact official fee structure after reviewing your document.",
  },
  {
    question:
      "Can our company courier commercial documents from outside Delhi?",
    answer:
      "Yes. Exporters and corporate teams across India courier their signed commercial documents and supporting KYC copies to our Connaught Place, New Delhi desk for Chamber of Commerce, MEA, and Embassy processing.",
  },
  {
    question:
      "What is the official MEA government fee for commercial document apostille?",
    answer:
      "As per official Ministry of External Affairs (MEA) guidelines, the government fee for an MEA Apostille sticker on a commercial document is ₹50 per document (plus nominal outsourced RAC agency charges). Chamber of Commerce verification fees, foreign embassy consular fees, and our coordination charges are separate.",
  },
  {
    question:
      "Which Chambers of Commerce are recognized by the MEA for commercial attestation?",
    answer:
      "The MEA recognizes designated national and regional Chambers of Commerce registered with the Ministry of Commerce, including PHD Chamber of Commerce and Industry (PHDCCI), FICCI, ASSOCHAM, FIEO, and accredited state/regional Chambers of Commerce across India.",
  },
  {
    question:
      "Can a Commercial Invoice and Certificate of Origin (COO) be processed together?",
    answer:
      "Yes. In fact, many foreign embassies (such as the UAE, Qatar, Kuwait, Egypt, and Iraq embassies) require the Commercial Invoice and Certificate of Origin (COO) to be submitted together as a matched export set after Chamber of Commerce and MEA authentication.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const COMMERCIAL_ATTESTATION_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COMMERCIAL_ATTESTATION_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const COMMERCIAL_WHATSAPP_URL = getWhatsAppUrl(
  "Hi, I need help with Commercial Document Attestation"
);

export const CommercialDocumentAttestationPage: React.FC<
  CommercialDocumentAttestationPageProps
> = ({ onNavigate }) => {
  // Interactive Commercial & Chamber Route Finder State
  const [selectedDocLabel, setSelectedDocLabel] = useState<string>(
    COMMERCIAL_ROUTE_DOC_OPTIONS[0].label
  );
  const [selectedChamberRegion, setSelectedChamberRegion] = useState<string>(
    CHAMBER_JURISDICTION_OPTIONS[0]
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    COMMERCIAL_DESTINATIONS[0]
  );
  const [checkedRoute, setCheckedRoute] = useState<{
    docLabel: string;
    chamberRegion: string;
    country: string;
  }>({
    docLabel: COMMERCIAL_ROUTE_DOC_OPTIONS[0].label,
    chamberRegion: CHAMBER_JURISDICTION_OPTIONS[0],
    country: COMMERCIAL_DESTINATIONS[0],
  });
  const [isCheckingRoute, setIsCheckingRoute] = useState<boolean>(false);
  const [routeFlash, setRouteFlash] = useState<boolean>(false);
  const routeResultRef = useRef<HTMLDivElement | null>(null);
  const {
    containerRef: finderSectionRef,
    activeStep: activeFinderShineStep,
    guideToStep: guideFinderStep,
    markInteracted: markFinderInteracted,
  } = useSequentialBoxShine(4);

  // Interactive Multi-Document Commercial Selection State (with inline "Ask now" bar below active card)
  const [selectedCommIds, setSelectedCommIds] = useState<string[]>([
    "comm-invoice-coo",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] =
    useState<string>("comm-invoice-coo");

  // Specimen Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<CommercialSpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyRouteSEO("/services/commercial-document-attestation");
    document.title =
      "Commercial Document Attestation in India | Chamber of Commerce, MEA & Embassy";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Get assistance with commercial document attestation and apostille in India. Chamber of Commerce, MEA, and Embassy legalization for invoices, POA, and corporate documents."
      );
    }
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const handleCheckCommercialRoute = () => {
    setIsCheckingRoute(true);
    setTimeout(() => {
      setCheckedRoute({
        docLabel: selectedDocLabel,
        chamberRegion: selectedChamberRegion,
        country: selectedCountry,
      });
      setIsCheckingRoute(false);
      setRouteFlash(true);
      if (routeResultRef.current) {
        routeResultRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
      setTimeout(() => {
        setRouteFlash(false);
      }, 900);
    }, 180);
  };

  const handleToggleCommCard = (id: string) => {
    setSelectedCommIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (!exists) {
        setActiveAnchorCardId(id);
      } else if (next.length > 0) {
        setActiveAnchorCardId(next[next.length - 1]);
      } else {
        setActiveAnchorCardId(id);
      }
      return next;
    });
  };

  const handleSelectDocInFinder = (
    e: React.MouseEvent<HTMLButtonElement>,
    docLabel: string
  ) => {
    e.stopPropagation();
    setSelectedDocLabel(docLabel);
    setCheckedRoute({
      docLabel,
      chamberRegion: selectedChamberRegion,
      country: selectedCountry,
    });
    setRouteFlash(true);
    scrollToSectionById("commercial-route-finder", "smooth");
    setTimeout(() => {
      setRouteFlash(false);
    }, 1000);
  };

  const handleOpenSpecimen = (specimen: CommercialSpecimenItem) => {
    setIsZoomed(false);
    setSelectedSpecimen(specimen);
  };

  const handleCloseSpecimen = useCallback(() => {
    setIsZoomed(false);
    if (viewerScrollRef.current) {
      viewerScrollRef.current.scrollTo(0, 0);
    }
    if (modalBodyScrollRef.current) {
      modalBodyScrollRef.current.scrollTo(0, 0);
    }
    setSelectedSpecimen(null);
  }, []);

  const handleToggleZoom = () => {
    setIsZoomed((prev) => {
      const next = !prev;
      if (!next && viewerScrollRef.current) {
        viewerScrollRef.current.scrollTo(0, 0);
      }
      return next;
    });
  };

  useImagePopupHistory(
    Boolean(selectedSpecimen),
    handleCloseSpecimen,
    "commercial-attestation-specimen-popup"
  );

  const hasPendingRouteChange =
    selectedDocLabel !== checkedRoute.docLabel ||
    selectedChamberRegion !== checkedRoute.chamberRegion ||
    selectedCountry !== checkedRoute.country;

  const checkedDocObj =
    COMMERCIAL_ROUTE_DOC_OPTIONS.find(
      (d) => d.label === checkedRoute.docLabel
    ) || COMMERCIAL_ROUTE_DOC_OPTIONS[0];

  const routeFinderWhatsAppMessage = `Hello ${BUSINESS_CONFIG.shortName}, I checked the Commercial & Chamber of Commerce Route for:\n• Document: ${checkedDocObj.shortName}\n• Company / Chamber Hub: ${checkedRoute.chamberRegion}\n• Destination: ${checkedRoute.country}\n\nPlease share the Chamber + MEA + Apostille/Embassy timeline and fee quotation.`;

  const selectedCommTitles = INTERACTIVE_COMMERCIAL_CARDS.filter((c) =>
    selectedCommIds.includes(c.id)
  ).map((c) => c.title);

  const multiCommWhatsAppMessage =
    selectedCommTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, our company needs Chamber of Commerce & Commercial Attestation/Apostille for:\n• ${selectedCommTitles.join("\n• ")}\n\nPlease share the required KYC checklist, timeline, and fee breakdown.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need assistance with Commercial Document Attestation & Chamber of Commerce in India. Please guide me on the process and fees.`;

  const renderCommSelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedCommIds.length > 0) {
              setSelectedCommIds([]);
            } else {
              setSelectedCommIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedCommIds.length > 0
              ? "Clear selection"
              : "Select commercial document"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedCommIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedCommIds.length === 0
              ? "Tap the commercial documents you have"
              : selectedCommIds.length === 1
              ? "1 commercial document selected"
              : `${selectedCommIds.length} commercial documents selected`}
          </span>
          {selectedCommTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedCommTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiCommWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#12A652] hover:bg-[#0f9147] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors shrink-0"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
        <span>Ask now</span>
      </a>
    </div>
  );

  return (
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-20 sm:pb-14 text-left">
      {/* Breadcrumb Navigation (Unchanged) */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
            aria-label="Breadcrumb"
          >
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="hover:text-[#0A192F] transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href="/#services"
              onClick={(e) => handleLinkClick(e, "/#services")}
              className="hover:text-[#0A192F] transition-colors"
            >
              Services
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0A192F] font-semibold">
              Commercial Document Attestation
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section (Unchanged) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          {/* Small Badge near H1 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider">
              Chamber + MEA + Embassy Route
            </span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Corporate &amp; Export Compliance
            </span>
          </div>

          {/* H1 (28-32px mobile-first) */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            Commercial Document Attestation for Business &amp; Export
          </h1>

          {/* Subtitle Paragraph (16px Body) */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            Dedicated coordination for authenticating Indian corporate, trade, and export documents for international business setup, customs clearance, and overseas tenders. We manage Chamber of Commerce attestation, MEA Apostille, and Foreign Embassy legalization.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={COMMERCIAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Enquire for Commercial Documents</span>
            </a>

            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Call {BUSINESS_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-6 sm:space-y-8 text-left">
        {/* CRITICAL COMMERCIAL ROUTING WARNING BOX (Same Position & Style as Degree Certificate Page) */}
        <div
          role="alert"
          className="rounded-2xl bg-red-50 border border-red-200 border-l-4 border-l-[#DC2626] p-4 sm:p-5 shadow-2xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
            </div>
            <p className="text-sm sm:text-base text-red-950 font-medium leading-relaxed">
              <strong className="font-extrabold text-[#991B1B]">
                Important Commercial Rule:
              </strong>{" "}
              Commercial &amp; export documents (Invoices, COO, Corporate POA,
              Board Resolutions, COI) <strong>cannot</strong> be processed
              through SDM or State HRD. The Ministry of External Affairs (MEA)
              strictly requires{" "}
              <strong>Chamber of Commerce authentication first</strong>. For
              Hague countries (Germany, Italy, USA, UK), Chamber + MEA Apostille
              is valid; for Gulf &amp; non-Hague nations (UAE, Qatar, Kuwait,
              Egypt, Vietnam), full{" "}
              <strong>Chamber + MEA + Foreign Embassy Legalization</strong> is
              mandatory.
            </p>
          </div>
        </div>

        {/* 6. Disclaimer Box (Kept Intact) */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department, Chamber of Commerce, or embassy. Government and embassy fees and timelines apply. Our charges are separate for coordination and logistics support." />

        {/* 2. Content Block 1: Why Commercial Attestation is Needed (Kept Intact) */}
        <ContentCard title="Why Commercial Document Attestation is Needed">
          <p className="text-base text-slate-700 leading-relaxed text-left">
            When an Indian company exports goods, opens a branch office abroad, registers pharmaceuticals or medical devices, or appoints an overseas representative via Power of Attorney, foreign customs and ministries require official proof that the company and its documents are genuine.
          </p>
          <p className="text-base text-slate-700 leading-relaxed text-left">
            Unlike personal or educational certificates, commercial documents must first be verified by a recognized Chamber of Commerce before they can be submitted to the Ministry of External Affairs (MEA) or a foreign embassy.
          </p>
        </ContentCard>

        {/* NEW COMMERCIAL ADDITION 1: THE 3 COMMERCIAL & CHAMBER ROUTES (Matching Degree Certificate 3-Route Card) */}
        <ContentCard title="The Route Depends on Your Destination & Trade Purpose">
          <p className="text-base text-slate-700 leading-relaxed">
            Every commercial document begins with authorized company execution
            and Chamber of Commerce endorsement, followed by the specific MEA
            and consular route required by your importing country:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {COMMERCIAL_ROUTES_OVERVIEW.map((route, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                    {route.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#0A192F] font-display leading-snug">
                    {route.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {route.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* NEW COMMERCIAL ADDITION 2: INTERACTIVE CHAMBER OF COMMERCE & COMMERCIAL ROUTE FINDER */}
        <section
          id="commercial-route-finder"
          ref={finderSectionRef}
          className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-6 shadow-md border border-teal-500/30 space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                Interactive Corporate &amp; Export Route Check
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Check Chamber of Commerce, MEA &amp; Embassy Route
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full self-start sm:self-center">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>PHDCCI • FICCI • ASSOCHAM • FIEO • MEA</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Dropdown 1: Commercial Document */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="comm-rf-doc"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 1 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  1. Commercial / Export Document
                </label>
                {activeFinderShineStep === 1 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select document</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 1 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="comm-rf-doc"
                  value={selectedDocLabel}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedDocLabel(e.target.value);
                    guideFinderStep(2);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {COMMERCIAL_ROUTE_DOC_OPTIONS.map((doc) => (
                    <option key={doc.label} value={doc.label}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2: Chamber / Corporate Jurisdiction */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="comm-rf-chamber"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 2 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  2. Chamber / Company Location
                </label>
                {activeFinderShineStep === 2 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select location</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 2 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="comm-rf-chamber"
                  value={selectedChamberRegion}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedChamberRegion(e.target.value);
                    guideFinderStep(3);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {CHAMBER_JURISDICTION_OPTIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3: Destination Country */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="comm-rf-country"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 3 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  3. Importing / Destination Country
                </label>
                {activeFinderShineStep === 3 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select country</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 3 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="comm-rf-country"
                  value={selectedCountry}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    guideFinderStep(4);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {COMMERCIAL_DESTINATIONS.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                guideFinderStep(0);
                handleCheckCommercialRoute();
              }}
              disabled={isCheckingRoute}
              className={`w-full sm:w-auto py-2.5 px-5 rounded-xl font-extrabold text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                hasPendingRouteChange
                  ? "bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] ring-2 ring-amber-300/70"
                  : "bg-[#14B8A6] hover:bg-teal-400 text-[#0A192F]"
              } ${
                activeFinderShineStep === 4 ? "fga-finder-box-shine ring-2 ring-amber-300" : ""
              }`}
            >
              {isCheckingRoute ? (
                <>
                  <Loader2 className="w-4 h-4 text-[#0A192F] animate-spin shrink-0" />
                  <span>Checking Chamber Route...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0A192F] shrink-0" />
                  <span>
                    {hasPendingRouteChange
                      ? "Check Updated Commercial Route"
                      : "Check Commercial Route"}
                  </span>
                </>
              )}
            </button>
          </div>

          {hasPendingRouteChange && (
            <div className="rounded-lg bg-amber-400/15 border border-amber-300/40 px-3.5 py-2 text-xs text-amber-200">
              Selection updated. Tap{" "}
              <strong className="text-amber-300">
                &ldquo;Check Updated Commercial Route&rdquo;
              </strong>{" "}
              above to view the authentication chain for{" "}
              <strong className="text-white">{selectedDocLabel}</strong>.
            </div>
          )}

          {/* Result Card */}
          <div
            ref={routeResultRef}
            className={`rounded-xl border px-4 py-3.5 transition-all duration-300 ${
              routeFlash
                ? "bg-emerald-900/95 border-amber-300 ring-2 ring-amber-300/80 shadow-lg"
                : "bg-emerald-950/85 border-emerald-400/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/25 border border-emerald-400/40 text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" />
                    <span>
                      {checkedDocObj.shortName} • {checkedRoute.country}
                    </span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-white pt-0.5">
                  Chain:{" "}
                  <span className="text-amber-300">
                    {checkedDocObj.recommendedChain}
                  </span>
                </p>

                <p className="text-[11px] sm:text-xs text-teal-200">
                  Chamber Hub:{" "}
                  <strong className="text-white">
                    {checkedRoute.chamberRegion}
                  </strong>{" "}
                  • Est. Time:{" "}
                  <strong className="text-amber-200">
                    {checkedDocObj.timelineNote}
                  </strong>{" "}
                  (Official MEA Fee: ₹50/document)
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={getWhatsAppUrl(routeFinderWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* NEW COMMERCIAL ADDITION 3: INTERACTIVE CORPORATE & EXPORT DOCUMENT SELECTOR WITH INLINE "ASK NOW" BAR */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Chamber of Commerce Document Selector
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Commercial &amp; Export Documents You Need to Attest
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick your commercial invoice, Certificate of Origin (COO),
              corporate POA, or company registration papers below — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right below the document you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {INTERACTIVE_COMMERCIAL_CARDS.map((card) => {
              const isSelected = selectedCommIds.includes(card.id);
              const isAnchorForBar = activeAnchorCardId === card.id;
              return (
                <div key={card.id} className="flex flex-col">
                  <div
                    onClick={() => handleToggleCommCard(card.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleCommCard(card.id);
                      }
                    }}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all duration-150 cursor-pointer select-none flex flex-col justify-between gap-3.5 shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "bg-white border-2 border-[#0A192F] ring-2 ring-[#0F766E]/15"
                        : "bg-white border-slate-200/90 hover:border-[#0F766E]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3.5">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${card.bgTintClass} flex items-center justify-center shrink-0`}
                      >
                        {card.illustration}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-sm sm:text-base font-extrabold text-[#0A192F] font-display leading-snug">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-snug">
                          {card.subtitle}
                        </p>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? "bg-[#0F766E] border-2 border-[#0F766E] text-white shadow-2xs"
                            : "bg-white border-2 border-slate-300 text-transparent"
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={(e) =>
                          handleSelectDocInFinder(e, card.routeFinderDocLabel)
                        }
                        className="font-bold text-[#0F766E] hover:text-[#0A192F] transition-colors truncate cursor-pointer text-left"
                      >
                        {card.routeBadge}
                      </button>

                      <span className="inline-flex items-center gap-1 font-extrabold text-[#0A192F] shrink-0">
                        <span>Check Route</span>
                        <ArrowRight className="w-3 h-3 text-[#0F766E]" />
                      </span>
                    </div>
                  </div>

                  {isAnchorForBar && renderCommSelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* NEW COMMERCIAL ADDITION 4: OFFICIAL MEA FEES, CHAMBER & EMBASSY TARIFFS (2x2 Grid) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Official MEA, Chamber &amp; Consular Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official MEA Commercial Fees, Chamber Charges &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_COMMERCIAL_FEES_AND_TIMELINES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-teal-100 flex items-center justify-center shadow-2xs shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Content Block 2: The Step-by-Step Process (4 Vertical Numbered Steps/Cards — Kept Intact) */}
        <ContentCard title="The Step-by-Step Process">
          <div className="space-y-4 pt-1">
            {COMMERCIAL_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-white text-sm font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                  {item.step}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="text-base font-bold text-[#0A192F] font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* NEW COMMERCIAL ADDITION 5: CHAMBER + APOSTILLE VS CHAMBER + EMBASSY VS DGFT e-COO COMPARISON TABLE */}
        <ContentCard title="Chamber + MEA Apostille vs. Chamber + Embassy Legalization — Comparison">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Compare the commercial authentication chains depending on whether
            your foreign buyer, customs authority, or ministry is in a Hague
            Convention country or a Non-Hague / GCC nation:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="py-3 px-3.5 font-extrabold">Feature</th>
                  <th className="py-3 px-3.5 font-extrabold text-teal-300">
                    Chamber + MEA Apostille
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-amber-300">
                    Chamber + MEA + Embassy
                  </th>
                  <th className="py-3 px-3.5 font-extrabold">
                    Certificate of Origin (e-COO)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Authentication Chain
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Company Seal → Chamber of Commerce → MEA Apostille Sticker
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Company Seal → Chamber of Commerce → MEA Stamp → Foreign
                    Embassy
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    DGFT / Chamber COO Issuance → MEA → Destination Embassy
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Estimated Timeline
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-emerald-800">
                    2–3 Working Days
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    4–8 Working Days (varies by destination Embassy)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    2–5 Working Days (matched with Commercial Invoice)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Target Destinations
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Germany, Italy, France, Spain, Netherlands, UK, USA, Poland,
                    Oman
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    UAE, Qatar, Kuwait, Saudi Arabia (Trade Invoices), Egypt,
                    Iraq, Vietnam
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    All Middle East, European, African, and Asian import customs
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Typical Documents
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Corporate POA, COI, MOA/AOA, Board Resolutions, Agency
                    Agreements
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Commercial Invoices, Packing Lists, POA, Free Sale (FSC),
                    WHO-GMP
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Non-Preferential Certificate of Origin &amp; Export Invoice
                    Sets
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 4. Content Block 3: Commercial Documents We Process (3 Cards Grid — Kept Intact) */}
        <ContentCard title="Commercial Documents We Process">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {COMMERCIAL_DOCUMENT_TYPES.map((category, idx) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 flex flex-col justify-between space-y-2.5 text-left"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#0A192F] font-display leading-snug">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ContentCard>

        {/* Supporting Company KYC Checklist Card (Kept Intact) */}
        <ContentCard title="Supporting Company KYC Typically Required">
          <ul className="space-y-3 pt-1">
            {SUPPORTING_KYC_ITEMS.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3F4F6]/80 border border-slate-200 text-base text-slate-700 leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ContentCard>

        {/* NEW COMMERCIAL ADDITION 6: OFFICIAL CHAMBER OF COMMERCE & COMMERCIAL APOSTILLE SPECIMEN PROOF GALLERY */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Tap to Inspect Reference Proofs (2x Zoom)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official Chamber of Commerce &amp; MEA Commercial Apostille Specimens
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect how recognized Indian Chamber of Commerce authentication
              stamps and Government of India MEA Commercial Apostille stickers
              are applied to corporate and export documents. Company details are
              masked for confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMERCIAL_SPECIMENS.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-400 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div
                  className="relative bg-slate-50 cursor-pointer overflow-hidden aspect-[4/3] border-b border-slate-100 flex items-center justify-center p-2"
                  onClick={() => handleOpenSpecimen(sample)}
                >
                  <img
                    src={sample.image}
                    alt={`${sample.title} (${sample.privacyLabel})`}
                    className="w-full h-full object-contain rounded border border-slate-200/70 bg-white group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />

                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0B2545]/90 text-[10px] font-semibold text-teal-300 shadow-2xs pointer-events-none">
                    {sample.badge}
                  </span>

                  <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-1 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-amber-950/85 text-[9px] font-semibold text-amber-200">
                      Company Details Masked
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#0B2545]/90 px-2 py-0.5 rounded">
                      <ZoomIn className="w-3 h-3 text-teal-300" />
                      <span>Tap to View 2x</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3
                      onClick={() => handleOpenSpecimen(sample)}
                      className="text-sm sm:text-base font-bold text-[#0B2545] group-hover:text-teal-800 font-display leading-snug cursor-pointer"
                    >
                      {sample.title}
                    </h3>
                    <p className="text-xs font-medium text-teal-800">
                      {sample.destinationOrUse}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenSpecimen(sample)}
                      className="text-xs font-bold text-[#0B2545] hover:text-teal-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>Inspect Chamber &amp; MEA Seal</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(sample.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F766E] text-xs font-bold transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEW COMMERCIAL ADDITION 7: WHY EXPORTERS & CORPORATE LEGAL TEAMS CHOOSE FATIMA GLOBAL ATTESTATION */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Corporate &amp; Export Compliance Partner
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Why Exporters, Manufacturers &amp; Law Firms Choose Fatima Global
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {COMMERCIAL_TRUST_FACTORS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200 flex flex-col gap-2"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-teal-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-5 border border-teal-400/30">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <QrCode className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Verifiable Chamber &amp; MEA Stamps</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  High-resolution scans of completed Chamber seals, MEA stickers,
                  and Embassy stamps shared with your export desk before courier
                  dispatch.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Connaught Place, New Delhi</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Strategically located at Barakhamba Road, New Delhi 110001 —
                  close to national Chambers, MEA CPV Division, and Diplomatic
                  Missions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Strict Corporate Confidentiality</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Commercial contracts, export pricing, pharmaceutical dossiers,
                  and board resolutions are handled with strict B2B
                  confidentiality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Official Government Reference Link (Highlight Box — Kept Intact) */}
        <section className="bg-white rounded-xl border-2 border-[#0F766E]/30 p-5 sm:p-7 shadow-2xs space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                Official Government of India Resource
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
                Trade Connect ePlatform (Certificate of Origin)
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Official Ministry of Commerce &amp; Industry / DGFT platform for export documentation and Certificates of Origin.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="https://www.trade.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-sm font-bold transition-colors"
              >
                <span>Visit Trade Connect Portal</span>
                <ExternalLink className="w-4 h-4 text-teal-300 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Using Reusable FAQAccordion — Kept Intact + Expanded) */}
        <FAQAccordion
          title="Frequently Asked Questions — Commercial & Chamber of Commerce Attestation"
          items={COMMERCIAL_ATTESTATION_FAQS}
        />

        {/* NEW COMMERCIAL ADDITION 8: OFFICIAL PORTALS, EXPORT DESTINATION LINKS & QUOTE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Official Government & Trade Portals */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official Ministry of Commerce, DGFT &amp; MEA Portals
              </h2>
              <ul className="space-y-2.5">
                {COMMERCIAL_OFFICIAL_PORTALS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F3F4F6] hover:bg-teal-50/70 border border-slate-200 hover:border-[#0F766E] transition-colors group"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] leading-snug">
                        {link.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#0F766E] shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Popular Export & Corporate Destinations + Related Guides */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Commercial Attestation by Export &amp; Trade Destination
                  </h2>
                  <a
                    href="/countries"
                    onClick={(e) => handleLinkClick(e, "/countries")}
                    className="text-xs font-bold text-[#0F766E] hover:text-[#0A192F] inline-flex items-center gap-1"
                  >
                    <span>All Countries</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_EXPORT_AND_CORPORATE_COUNTRIES.map((country) => (
                    <a
                      key={country.slug}
                      href={country.slug}
                      onClick={(e) => handleLinkClick(e, country.slug)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-[#0F766E] text-xs font-bold text-[#0A192F] hover:text-[#0F766E] transition-colors"
                    >
                      {country.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] uppercase tracking-wider">
                  Related Corporate, Consular &amp; Translation Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_COMMERCIAL_GUIDES.map((item) => (
                    <a
                      key={item.slug}
                      href={item.slug}
                      onClick={(e) => handleLinkClick(e, item.slug)}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-[#0F766E] flex items-center justify-between gap-2 transition-colors group"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] block">
                          {item.tag}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] truncate block">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E] shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <QuoteForm
              initialServiceSlug="/chamber-of-commerce-apostille"
              title="Request Commercial Attestation Quote"
              subtitle="Share your commercial document type, invoice count, and destination country. Our New Delhi corporate desk will confirm the Chamber, MEA, and Embassy fee breakdown."
            />
          </div>
        </div>

        {/* 8. Bottom Call to Action (CTA — Kept Intact) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Assistance with Corporate or Export Documents?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your commercial document type and destination country on WhatsApp for Chamber of Commerce, MEA Apostille, and Embassy legalization guidance.
          </p>
          <div className="pt-1">
            <a
              href={COMMERCIAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-base font-bold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Enquire for Commercial Documents on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* SPECIMEN ZOOM 2X LIGHTBOX MODAL */}
      {selectedSpecimen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedSpecimen.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
          onClick={handleCloseSpecimen}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50 shrink-0">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  {selectedSpecimen.privacyLabel}
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-[#0B2545] font-display leading-snug mt-0.5">
                  {selectedSpecimen.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleZoom}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-[#0B2545] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isZoomed ? "Fit Screen" : "Zoom 2x"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseSpecimen}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              ref={modalBodyScrollRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6"
            >
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                <div className="w-full lg:col-span-7 bg-slate-100 rounded-xl border border-slate-200/90 overflow-hidden">
                  <div
                    ref={viewerScrollRef}
                    onClick={handleToggleZoom}
                    className={`w-full p-2 sm:p-3 flex items-center justify-center ${
                      isZoomed
                        ? "overflow-auto max-h-[65vh] items-start justify-start cursor-zoom-out"
                        : "overflow-hidden cursor-zoom-in"
                    }`}
                  >
                    <img
                      src={selectedSpecimen.image}
                      alt={`${selectedSpecimen.title} (${selectedSpecimen.privacyLabel})`}
                      className={`block rounded-lg border border-slate-200 bg-white shadow-2xs transition-all duration-200 ${
                        isZoomed
                          ? "w-[200%] max-w-none h-auto"
                          : "w-full h-auto max-h-[48vh] sm:max-h-[62vh] object-contain"
                      }`}
                    />
                  </div>

                  <div className="px-3 py-2 bg-slate-900 text-white text-[11px] flex items-center justify-between gap-2">
                    <span className="font-medium text-amber-300 truncate">
                      {selectedSpecimen.privacyLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleZoom}
                      className="text-teal-300 font-bold shrink-0 underline underline-offset-2 cursor-pointer"
                    >
                      {isZoomed ? "Reset Zoom" : "Zoom 2x"}
                    </button>
                  </div>
                </div>

                <div className="w-full lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-700 pt-1 lg:pt-0">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#0B2545] font-display text-sm sm:text-base">
                      Commercial Verification Scope &amp; Route
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {selectedSpecimen.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                      Stamps &amp; Features Shown:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedSpecimen.elementsVerified.map((elem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getWhatsAppUrl(selectedSpecimen.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Ask About This Commercial Route on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
