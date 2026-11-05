import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Stamp,
  Building2,
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
  ExternalLink,
  Scale,
  FileSignature,
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

interface NotaryPublicAttestationPageProps {
  onNavigate?: (path: string) => void;
}

const NOTARY_WHY_MATTERS_BULLETS = [
  "Single Status / Bachelorhood / Unmarried Affidavits for marriage abroad.",
  "Name Discrepancy / One-and-the-Same Person Affidavits.",
  "Date of Birth & No-Objection Affidavits (NOC) for child passport or visa sponsorship.",
  "General and Special Power of Attorney (POA) for property, banking, or overseas legal representation.",
  "Preliminary Notarization of Birth, Marriage, PCC, and Educational Certificates prior to SDM + MEA Apostille.",
];

const NOTARY_3_ROUTES = [
  {
    badge: "Route 1 • Pre-SDM & Pre-MEA Step",
    title: "Preliminary Notarization for Apostille & Attestation",
    description:
      "Personal and educational certificates (Birth, Marriage, Death, PCC, Degrees) and certified translations are first endorsed by a Government-Appointed Advocate Notary before submission to the Delhi SDM and Ministry of External Affairs (MEA).",
  },
  {
    badge: "Route 2 • e-Stamp Sworn Declarations",
    title: "Affidavit Drafting, e-Stamp & Notarization",
    description:
      "Drafting and execution of Single Status (Bachelorhood) Affidavits, Name Discrepancy Declarations, Date of Birth Affidavits, and No-Objection Certificates (NOC) on Non-Judicial e-Stamp paper with Notary seal and Entry Register number.",
  },
  {
    badge: "Route 3 • POA & Wakala Execution",
    title: "Power of Attorney (POA / Wakala) Notarization & Legalization",
    description:
      "Execution of General & Special Powers of Attorney (POA), Saudi Wakala, and Legal Heir declarations before an Advocate Notary, followed by SDM, MEA, and Foreign Embassy legalization.",
  },
];

const OFFICIAL_NOTARY_FEES_AND_TIMELINES = [
  {
    title: "Advocate Notary Endorsement",
    description:
      "Includes the Government-Appointed Notary's circular seal, Notarial Welfare Stamp, Register Entry Number, and official signature under the Notaries Act, 1952.",
    icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Non-Judicial e-Stamp Paper",
    description:
      "Sworn affidavits and Powers of Attorney are executed on official Non-Judicial e-Stamp paper (typically ₹10 to ₹500 denomination based on document category).",
    icon: <FileSignature className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Processing Time",
    description:
      "Standalone Notary & e-Stamp drafting takes 2–4 hours (same day). Combined Notary + Delhi SDM + MEA Apostille takes 2–3 working days.",
    icon: <Clock className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "MEA Government Fee (When Legalized)",
    description:
      "When proceeding from Notary + SDM to the Ministry of External Affairs, the official MEA government fee is ₹50 per document (+ ~₹18–₹90 RAC fee).",
    icon: <FileStack className="w-5 h-5 text-[#0F766E]" />,
  },
];

const REQUIRED_NOTARY_CHECKLIST = [
  "Original Certificate (for pre-SDM notarization) or Approved Draft Text (for Affidavit / POA).",
  "Clear Copy of Passport (First & Last Page) and Aadhaar / PAN Card of the Deponent / Executor.",
  "Passport-Size Photographs (required for Power of Attorney, Wakala, and Single Status Affidavits).",
  "Supporting Relationship / Address Proof (e.g., Parents' ID or Birth/Marriage record for family affidavits).",
];

interface NotaryDocumentOption {
  label: string;
  shortName: string;
  recommendedChain: string;
  timelineNote: string;
}

const NOTARY_DOCUMENT_OPTIONS: NotaryDocumentOption[] = [
  {
    label: "Single Status / Bachelorhood / Unmarried Affidavit",
    shortName: "Single Status Affidavit",
    recommendedChain:
      "e-Stamp Paper Drafting → Advocate Notary Seal & Entry No. → Delhi SDM → MEA Apostille / Embassy",
    timelineNote: "Same Day (Notary) | 2–3 Working Days (Notary + SDM + MEA)",
  },
  {
    label: "General / Special Power of Attorney (POA / Saudi Wakala)",
    shortName: "Power of Attorney (POA / Wakala)",
    recommendedChain:
      "e-Stamp POA Execution → Advocate Notary Seal → Delhi SDM → MEA → Foreign Embassy Legalization",
    timelineNote: "Same Day (Notary) | 2–3 Days (MEA) | +Embassy Time",
  },
  {
    label: "Birth / Marriage / Death Certificate (Pre-SDM Notarization)",
    shortName: "Birth / Marriage / Death Certificate",
    recommendedChain:
      "Advocate Notary Public Attestation → Sub-Divisional Magistrate (SDM) → MEA Apostille / Attestation",
    timelineNote: "2–3 Working Days (Complete Notary + SDM + MEA Route)",
  },
  {
    label: "Name Discrepancy / One-and-the-Same Person Affidavit",
    shortName: "Name Discrepancy Affidavit",
    recommendedChain:
      "e-Stamp Affidavit → Advocate Notary Seal → Delhi SDM → MEA Apostille / Embassy",
    timelineNote: "Same Day (Notary) | 2–3 Working Days (with SDM + MEA)",
  },
  {
    label: "No-Objection Certificate (NOC) / Child Visa Sponsorship Affidavit",
    shortName: "NOC / Sponsorship Affidavit",
    recommendedChain:
      "e-Stamp NOC Drafting → Advocate Notary Public → Delhi SDM → MEA Apostille / Attestation",
    timelineNote: "Same Day (Notary) | 2–3 Working Days (with SDM + MEA)",
  },
  {
    label: "Police Clearance (PCC) / Educational / Medical Certificate",
    shortName: "PCC / Educational / Medical Record",
    recommendedChain:
      "Preliminary Advocate Notary Endorsement → Delhi SDM → MEA Apostille / Normal Attestation",
    timelineNote: "2–3 Working Days (Complete Notary + SDM + MEA Route)",
  },
  {
    label: "True Copy Notarization (Passport, ID, Bank Statements, Transcripts)",
    shortName: "True Copy Notarization",
    recommendedChain:
      "Original Sighting → 'True Copy Attested' Stamp + Circular Notary Seal & Register Entry",
    timelineNote: "Same Day (2–4 Hours) | +2–3 Days if SDM & MEA Required",
  },
];

const NOTARY_EXECUTION_MODES = [
  "Notary + Delhi SDM + MEA Apostille (For Hague Countries)",
  "Notary + SDM + MEA + Foreign Embassy (UAE, Saudi, Qatar, Kuwait)",
  "e-Stamp Paper Drafting + Notary + SDM + MEA",
  "Standalone Advocate Notary Attestation Only (Domestic / True Copy)",
];

const NOTARY_DESTINATIONS = [
  "Hague Convention Countries (Germany, Italy, UK, USA, France, Spain, Australia)",
  "United Arab Emirates (UAE Work, Family & Property POA)",
  "Saudi Arabia (KSA Wakala, Legal Heir, Family & Work Visa)",
  "Qatar, Kuwait, Oman & Bahrain (GCC Missions)",
  "Canada, New Zealand, Malaysia & Other Countries",
  "Domestic Use in India (Courts, Banks, Passport Office, FRRO)",
];

interface InteractiveNotaryDocCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  routeFinderDocLabel: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_NOTARY_DOC_CARDS: InteractiveNotaryDocCard[] = [
  {
    id: "notary-single-status",
    title: "Single Status / Bachelorhood Affidavit",
    subtitle: "Unmarried declaration on e-Stamp paper for marriage abroad.",
    routeBadge: "e-Stamp + Notary → SDM → MEA Apostille",
    routeFinderDocLabel:
      "Single Status / Bachelorhood / Unmarried Affidavit",
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
        <rect x="20" y="16" width="24" height="6" rx="1.5" fill="#0F766E" />
        <line
          x1="20"
          y1="28"
          x2="42"
          y2="28"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="35"
          x2="38"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="40"
          cy="44"
          r="5.5"
          fill="#0B2545"
          stroke="#D49B27"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    id: "notary-poa-wakala",
    title: "Power of Attorney (POA & Wakala)",
    subtitle: "General/Special POA, Saudi Wakala & Legal Heir declarations.",
    routeBadge: "Notary + SDM → MEA → Foreign Embassy",
    routeFinderDocLabel:
      "General / Special Power of Attorney (POA / Saudi Wakala)",
    bgTintClass: "bg-[#F6EFE2]",
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
        <rect x="20" y="17" width="24" height="6" rx="1.5" fill="#0B2545" />
        <line
          x1="20"
          y1="29"
          x2="44"
          y2="29"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="36"
          x2="36"
          y2="36"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="41" cy="44" r="5" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "notary-pre-sdm-certs",
    title: "Birth, Marriage & PCC (Pre-SDM Notary)",
    subtitle: "Mandatory Notary endorsement prior to Delhi SDM & MEA.",
    routeBadge: "Notary Public → Delhi SDM → MEA",
    routeFinderDocLabel:
      "Birth / Marriage / Death Certificate (Pre-SDM Notarization)",
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
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <circle
          cx="26"
          cy="24"
          r="6"
          stroke="#0B2545"
          strokeWidth="2"
          fill="#E2E8F0"
        />
        <line
          x1="20"
          y1="36"
          x2="44"
          y2="36"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="43"
          x2="38"
          y2="43"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="42" cy="24" r="4.5" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: "notary-name-dob-affidavit",
    title: "Name Discrepancy & DOB Affidavits",
    subtitle: "One-and-the-same person, spelling variation & birth affidavits.",
    routeBadge: "e-Stamp + Notary → SDM → MEA Apostille",
    routeFinderDocLabel:
      "Name Discrepancy / One-and-the-Same Person Affidavit",
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
        <line
          x1="20"
          y1="22"
          x2="44"
          y2="22"
          stroke="#DC2626"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="30"
          x2="40"
          y2="30"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="38"
          x2="34"
          y2="38"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="44" r="4.5" fill="#0B2545" />
      </svg>
    ),
  },
  {
    id: "notary-noc-sponsorship",
    title: "NOC & Child Visa Sponsorship Affidavit",
    subtitle: "Parental consent, travel NOC & financial support declarations.",
    routeBadge: "e-Stamp + Notary → SDM → MEA",
    routeFinderDocLabel:
      "No-Objection Certificate (NOC) / Child Visa Sponsorship Affidavit",
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
        <path
          d="M32 18L42 22V29C42 34.5 37.8 38.8 32 41C26.2 38.8 22 34.5 22 29V22L32 18Z"
          fill="#0F766E"
        />
        <path
          d="M28.5 29.5L31 32L36 26.5"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="22"
          y1="47"
          x2="42"
          y2="47"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "notary-true-copy",
    title: "True Copy & Translation Notarization",
    subtitle: "Passport copies, bank statements, degrees & translations.",
    routeBadge: "Certified True Copy + Notary Public Seal",
    routeFinderDocLabel:
      "True Copy Notarization (Passport, ID, Bank Statements, Transcripts)",
    bgTintClass: "bg-[#EAEFF5]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="18"
          y="8"
          width="32"
          height="40"
          rx="3"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.8"
        />
        <rect
          x="12"
          y="14"
          width="32"
          height="40"
          rx="3"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="25"
          x2="38"
          y2="25"
          stroke="#0B2545"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="33"
          x2="34"
          y2="33"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="36" cy="44" r="5" fill="#0F766E" />
      </svg>
    ),
  },
];

interface NotarySpecimenItem {
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

const NOTARY_SPECIMENS: NotarySpecimenItem[] = [
  {
    id: "notary-sdm-attestation-specimen",
    title: "Advocate Notary Public & Delhi SDM Authentication Specimen (Pre-MEA Step)",
    badge: "Notary + SDM Specimen",
    image: "/samples/notary_sdm_attestation_specimen.jpg",
    privacyLabel:
      "Illustrative Sample — Notary Reg. No., Entry No. & Officer Name Masked",
    destinationOrUse:
      "Mandatory Preliminary Endorsement on Indian Documents Prior to MEA Legalization",
    description:
      "Authentic reverse-side specimen showing how an Indian public document or sworn affidavit is first endorsed by a Government of India Advocate Notary Public (circular NOTARY GOVT. OF INDIA seal + ATTESTED NOTARY PUBLIC DELHI stamp) and subsequently authenticated by the Sub-Divisional Magistrate — SDM (E), Govt. of NCT of Delhi. Notary registration numbers, entry numbers, and officer names are blurred for privacy.",
    elementsVerified: [
      "Circular 'NOTARY • GOVT. OF INDIA' Official Seal (Reg. No. & Name Blurred)",
      "'ATTESTED — NOTARY PUBLIC DELHI (INDIA)' Endorsement & Green Signature",
      "Notary Register Entry Number & Signature Block Masked for Privacy",
      "Subsequent 'SDM (ELECTION) • SDM (E) Govt. of NCT of Delhi' Seal (Name Blurred)",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the Notary Public & Delhi SDM Authentication Specimen and need assistance with notarization and legalization.",
  },
  {
    id: "notary-circular-seal-closeup",
    title: "Advocate Notary Public Circular Seal & 'ATTESTED' Endorsement (Close-Up)",
    badge: "Official Notary Public Seal",
    image: "/samples/notary_public_seal_closeup.jpg",
    privacyLabel:
      "Illustrative Sample — Advocate Name & Registration Number Masked",
    destinationOrUse:
      "Affidavits, Powers of Attorney (POA), True Copies & Pre-SDM Verification",
    description:
      "Close-up view of the official Advocate Notary Public attestation block issued under the Notaries Act, 1952 in Delhi (India). Displays the circular Government of India Notary seal, the 'ATTESTED — NOTARY PUBLIC DELHI (INDIA)' ink stamp, green ink signature, and masked register entry number.",
    elementsVerified: [
      "Government-Appointed Advocate Notary Circular Seal (Notaries Act, 1952)",
      "Official 'ATTESTED — NOTARY PUBLIC DELHI (INDIA)' Ink Stamp",
      "Authorized Notary Signature in Green Ink",
      "Advocate Name, Registration Number & Entry Number Blurred for Privacy",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need Advocate Notary Public attestation / Affidavit drafting in New Delhi. Please share the process.",
  },
];

const NOTARY_4_STEP_WORKFLOW = [
  {
    step: 1,
    title: "Document / Draft Review",
    description:
      "Share your certificate scan or affidavit/POA text on WhatsApp. We verify passport name consistency and destination embassy formatting rules.",
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 2,
    title: "e-Stamp & Advocate Notary Seal",
    description:
      "For affidavits and POAs, we execute the text on Non-Judicial e-Stamp paper and apply the official Advocate Notary circular seal, entry number, and signature.",
    icon: <FileCheck2 className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 3,
    title: "Delhi SDM & MEA Authentication",
    description:
      "For international use, the notarized document proceeds to the Sub-Divisional Magistrate (SDM) and Ministry of External Affairs (MEA) for Apostille or Normal Attestation.",
    icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 4,
    title: "Scan Proof & Tracked Delivery",
    description:
      "We share high-resolution scans of the notarized and attested document on WhatsApp and dispatch the physical original via tracked courier.",
    icon: <Truck className="w-5 h-5 text-teal-700" />,
  },
];

const NOTARY_TRUST_FACTORS = [
  {
    icon: <Scale className="w-5 h-5 text-teal-700" />,
    title: "Notaries Act, 1952 Compliant",
    desc: "Every notarization is executed by a licensed Advocate Notary with a valid Government of India / State registration number and register entry.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Embassy-Accepted Affidavit Formats",
    desc: "Whether you need a Single Status Affidavit for Europe, a Saudi Wakala, or a UAE POA, we ensure the exact legal clauses required by the destination authority.",
  },
  {
    icon: <Truck className="w-5 h-5 text-teal-700" />,
    title: "Notary + SDM + MEA in One Flow",
    desc: "Instead of visiting courts for Notary, SDM offices, and RAC centers separately, we coordinate the complete chain under one roof in New Delhi.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Transparent e-Stamp & Fee Breakdown",
    desc: "Clear upfront pricing covering Non-Judicial e-Stamp paper, Advocate Notary charges, SDM verification, and the ₹50 official MEA fee.",
  },
];

const NOTARY_OFFICIAL_PORTALS = [
  {
    title: "Ministry of External Affairs (MEA) — Official Apostille & Attestation Guidelines",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title: "Department of Legal Affairs (Ministry of Law & Justice) — Notaries Cell",
    href: "https://legalaffairs.gov.in/",
  },
  {
    title: "SHCIL (Stock Holding Corporation of India) — Official e-Stamping Portal",
    href: "https://www.shcilestamp.com/",
  },
];

const POPULAR_NOTARY_COUNTRIES = [
  { name: "Germany (Single Status / Study)", slug: "/countries/germany" },
  { name: "Italy (Nulla Osta / DOV)", slug: "/countries/italy" },
  { name: "UAE (POA / Family Visa)", slug: "/countries/uae-mofa-attestation" },
  { name: "Saudi Arabia (Wakala / KSA)", slug: "/countries/saudi-arabia-attestation" },
  { name: "United Kingdom (UK)", slug: "/countries/uk" },
  { name: "United States (USA)", slug: "/countries/usa" },
  { name: "Qatar", slug: "/countries/qatar" },
  { name: "Kuwait", slug: "/countries/kuwait" },
];

const RELATED_NOTARY_GUIDES = [
  {
    title: "Apostille Services in India (SDM + MEA)",
    slug: "/services/apostille",
    tag: "Hague Apostille",
  },
  {
    title: "Embassy Legalization Services (Non-Hague)",
    slug: "/services/embassy-legalization",
    tag: "Consular Chain",
  },
  {
    title: "Saudi Arabia Death Claim & Wakala Assistance",
    slug: "/services/saudi-death-claim",
    tag: "Wakala & Legal Heir",
  },
  {
    title: "Certified Document Translation Services",
    slug: "/services/document-translation",
    tag: "Translation + Notary",
  },
];

export const NOTARY_PUBLIC_FAQS: FAQItem[] = [
  {
    question:
      "Can I get a Single Status Affidavit drafted, notarized, and apostilled in one workflow?",
    answer:
      "Yes. Once you share the required text format or destination country guidelines along with your passport and Aadhaar copies, we assist with e-Stamp paper execution, Notary attestation, SDM authentication, and MEA Apostille.",
  },
  {
    question:
      "Does a Power of Attorney executed in India for use in the UAE or Saudi Arabia need more than Notary?",
    answer:
      "Yes. A Power of Attorney executed in India for use in the UAE or Saudi Arabia must be notarized, authenticated by SDM/State authorities, attested by the Ministry of External Affairs (MEA), and legalized by the respective Embassy in New Delhi.",
  },
  {
    question: "Is an Indian Notary Public stamp alone valid in foreign countries?",
    answer:
      "No. Under international document legalization rules, a standalone Indian Notary Public stamp is only valid within India. For use in any foreign country, the notarized document must be counter-authenticated by the Sub-Divisional Magistrate (SDM) or State Home Department and then attested by the Ministry of External Affairs (MEA) via an Apostille sticker (for Hague countries) or Normal Attestation + Embassy Legalization (for non-Hague countries).",
  },
  {
    question:
      "What elements must be present on a valid Notary Public attestation for SDM and MEA acceptance?",
    answer:
      "For the Sub-Divisional Magistrate (SDM) and Ministry of External Affairs (MEA) to accept a notarized document, it must carry the Advocate Notary's circular seal (showing name, jurisdiction, and Government registration number), the 'ATTESTED — NOTARY PUBLIC' endorsement stamp, Notarial Welfare/Fee stamp, Notarial Register Entry Number, date, and official signature.",
  },
  {
    question:
      "What denomination of Non-Judicial e-Stamp paper is used for international affidavits and Powers of Attorney?",
    answer:
      "In Delhi NCR and most Indian states, personal affidavits (such as Single Status, Name Discrepancy, Date of Birth, or NOC declarations) are typically executed on ₹10 to ₹100 Non-Judicial e-Stamp paper, while General or Special Powers of Attorney (POA / Wakala) are executed on ₹100 to ₹500 e-Stamp paper depending on state stamp duty rules.",
  },
  {
    question:
      "Why do Birth, Marriage, and Police Clearance Certificates require Notary attestation before SDM?",
    answer:
      "Under the fast-track Delhi SDM route, the Sub-Divisional Magistrate authenticates the document following preliminary verification and endorsement by a licensed Advocate Notary Public in Delhi, which then enables the Ministry of External Affairs (MEA) to affix the ₹50 Apostille sticker or Normal Attestation stamp.",
  },
  {
    question:
      "How long does it take to complete Notary + Delhi SDM + MEA Apostille?",
    answer:
      "Standalone Notary attestation and e-Stamp affidavit preparation can be completed on the same working day (2–4 hours). When combined with Delhi SDM verification and MEA Apostille or Normal Attestation, the complete process typically takes 2–3 working days.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const NOTARY_PUBLIC_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: NOTARY_PUBLIC_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const NOTARY_HERO_WHATSAPP_URL = getWhatsAppUrl(
  "Hello Fatima Global Attestation, I need assistance with Notary Public Attestation / Affidavit / POA preparation for international use."
);

export const NotaryPublicAttestationPage: React.FC<
  NotaryPublicAttestationPageProps
> = ({ onNavigate }) => {
  // Interactive Notary Route Finder State
  const [selectedDocLabel, setSelectedDocLabel] = useState<string>(
    NOTARY_DOCUMENT_OPTIONS[0].label
  );
  const [selectedMode, setSelectedMode] = useState<string>(
    NOTARY_EXECUTION_MODES[0]
  );
  const [selectedDestination, setSelectedDestination] = useState<string>(
    NOTARY_DESTINATIONS[0]
  );
  const [checkedRoute, setCheckedRoute] = useState<{
    docLabel: string;
    mode: string;
    destination: string;
  }>({
    docLabel: NOTARY_DOCUMENT_OPTIONS[0].label,
    mode: NOTARY_EXECUTION_MODES[0],
    destination: NOTARY_DESTINATIONS[0],
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

  // Interactive Multi-Document Notary Selection State (with inline "Ask now" bar below active card)
  const [selectedNotaryIds, setSelectedNotaryIds] = useState<string[]>([
    "notary-single-status",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] = useState<string>(
    "notary-single-status"
  );

  // Specimen 2x Zoom Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<NotarySpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyRouteSEO("/services/notary-public");
    document.title =
      "Notary Public Attestation in India | Affidavits, POA & Pre-MEA Notarization | Fatima Global Attestation";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Professional assistance with Notary Public attestation, affidavit drafting, Power of Attorney execution, and initial notarization required prior to SDM and MEA Apostille in India."
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

  const handleCheckNotaryRoute = () => {
    setIsCheckingRoute(true);
    setTimeout(() => {
      setCheckedRoute({
        docLabel: selectedDocLabel,
        mode: selectedMode,
        destination: selectedDestination,
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

  const handleToggleNotaryCard = (id: string) => {
    setSelectedNotaryIds((prev) => {
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
      mode: selectedMode,
      destination: selectedDestination,
    });
    setRouteFlash(true);
    scrollToSectionById("notary-route-finder", "smooth");
    setTimeout(() => {
      setRouteFlash(false);
    }, 1000);
  };

  const handleOpenSpecimen = (specimen: NotarySpecimenItem) => {
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
    "notary-public-specimen-popup"
  );

  const hasPendingRouteChange =
    selectedDocLabel !== checkedRoute.docLabel ||
    selectedMode !== checkedRoute.mode ||
    selectedDestination !== checkedRoute.destination;

  const checkedDocObj =
    NOTARY_DOCUMENT_OPTIONS.find((d) => d.label === checkedRoute.docLabel) ||
    NOTARY_DOCUMENT_OPTIONS[0];

  const routeFinderWhatsAppMessage = `Hello ${BUSINESS_CONFIG.shortName}, I checked the Notary & Legalization Route for:\n• Document / Affidavit: ${checkedDocObj.shortName}\n• Execution Mode: ${checkedRoute.mode}\n• Destination: ${checkedRoute.destination}\n\nPlease share the e-Stamp/Notary requirement, timeline, and fee breakdown.`;

  const selectedNotaryTitles = INTERACTIVE_NOTARY_DOC_CARDS.filter((c) =>
    selectedNotaryIds.includes(c.id)
  ).map((c) => c.title);

  const multiNotaryWhatsAppMessage =
    selectedNotaryTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, I need Notary Public & Attestation assistance for:\n• ${selectedNotaryTitles.join("\n• ")}\n\nPlease share the e-Stamp / Notary / SDM / MEA process, timeline, and fees.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need assistance with Notary Public Attestation in India. Please guide me on the process and fees.`;

  const renderNotarySelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedNotaryIds.length > 0) {
              setSelectedNotaryIds([]);
            } else {
              setSelectedNotaryIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedNotaryIds.length > 0
              ? "Clear selection"
              : "Select document for notarization"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedNotaryIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedNotaryIds.length === 0
              ? "Tap the documents or affidavits you need"
              : selectedNotaryIds.length === 1
              ? "1 document selected"
              : `${selectedNotaryIds.length} documents selected`}
          </span>
          {selectedNotaryTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedNotaryTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiNotaryWhatsAppMessage)}
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
      {/* Breadcrumb Navigation */}
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
              Notary Public Attestation
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section (Preserved from dedicatedPages.ts) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
            Foundational Legal Step • Affidavits, POA &amp; True Copies
          </span>

          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            Notary Public Attestation &amp; Affidavit Services in India
          </h1>

          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            Notary Public attestation is the foundational first step in India&apos;s document legalization hierarchy. Issued by a government-appointed Advocate Notary under the Notaries Act, 1952, notarization certifies the execution of affidavits, powers of attorney, and document copies before they proceed to Sub-Divisional Magistrate (SDM), State Home Department, and Ministry of External Affairs (MEA) authentication.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={NOTARY_HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat with us for Notary &amp; Affidavit Services</span>
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
        {/* 1. CRITICAL WARNING BOX (Placed right below Hero, matching Degree Certificate Apostille) */}
        <div
          role="alert"
          className="rounded-2xl bg-red-50 border border-red-200 p-4 sm:p-5 shadow-2xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
            </div>
            <p className="text-sm sm:text-base text-red-950 font-medium leading-relaxed">
              <strong className="font-extrabold text-[#991B1B]">
                Important:
              </strong>{" "}
              A standalone Indian Notary Public stamp is purely a domestic
              certification and is{" "}
              <strong className="font-bold text-[#991B1B]">
                NOT accepted on its own
              </strong>{" "}
              by foreign immigration authorities, embassies, or overseas courts.
              For international validity, a notarized document must subsequently
              be authenticated by the{" "}
              <strong className="font-bold text-[#991B1B]">
                Sub-Divisional Magistrate (SDM) / State Home Department
              </strong>{" "}
              and receive an{" "}
              <strong className="font-bold text-[#991B1B]">
                MEA Apostille
              </strong>{" "}
              (for Hague countries) or{" "}
              <strong className="font-bold text-[#991B1B]">
                MEA + Foreign Embassy Legalization
              </strong>{" "}
              (for Non-Hague countries).
            </p>
          </div>
        </div>

        {/* 2. Content Block 1: Why Notary Attestation Matters for International Documents (Preserved + 3 Route Sub-Cards) */}
        <ContentCard title="Why Notary Attestation Matters for International Documents">
          <p className="text-base text-slate-700 leading-relaxed">
            Neither the Sub-Divisional Magistrate (SDM) nor the Ministry of External Affairs (MEA) accepts unverified personal declarations or raw personal documents without preliminary notarial verification.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            A proper Notary attestation for international use requires the Advocate Notary&apos;s official circular embossed/ink seal, registration number, notary welfare stamp, signature, and date.
          </p>

          <ul className="space-y-2.5 pt-1">
            {NOTARY_WHY_MATTERS_BULLETS.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            {NOTARY_3_ROUTES.map((route, idx) => (
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

        {/* 3. Content Block 2: Is Notary Attestation Alone Valid Abroad? (Preserved from dedicatedPages.ts) */}
        <ContentCard title="Is Notary Attestation Alone Valid Abroad?">
          <p className="text-base text-slate-700 leading-relaxed">
            No. A standalone Indian Notary Public stamp is purely a domestic certification and is not recognized by foreign immigration authorities, embassies, or overseas courts on its own. To make a notarized document legally valid outside India, it must subsequently be authenticated by the Sub-Divisional Magistrate (SDM) / State Home Department and then receive an MEA Apostille (for Hague countries) or MEA + Foreign Embassy Legalization (for Non-Hague countries).
          </p>
        </ContentCard>

        {/* 4. INTERACTIVE NOTARY, AFFIDAVIT & LEGALIZATION ROUTE FINDER */}
        <section
          id="notary-route-finder"
          ref={finderSectionRef}
          className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-6 shadow-md border border-teal-500/30 space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                Interactive Notary, SDM &amp; MEA Route Check
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Check e-Stamp, Notary, SDM &amp; MEA Chain for Your Document
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full self-start sm:self-center">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Notaries Act, 1952 • SDM • MEA</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Dropdown 1: Document / Affidavit Type */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="notary-rf-doc"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 1 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  1. Document / Affidavit Type
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
                  id="notary-rf-doc"
                  value={selectedDocLabel}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedDocLabel(e.target.value);
                    guideFinderStep(2);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {NOTARY_DOCUMENT_OPTIONS.map((doc) => (
                    <option key={doc.label} value={doc.label}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2: Execution & Legalization Mode */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="notary-rf-mode"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 2 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  2. Required Authentication Level
                </label>
                {activeFinderShineStep === 2 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select level</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 2 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="notary-rf-mode"
                  value={selectedMode}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedMode(e.target.value);
                    guideFinderStep(3);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {NOTARY_EXECUTION_MODES.map((modeItem) => (
                    <option key={modeItem} value={modeItem}>
                      {modeItem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3: Destination Country */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="notary-rf-dest"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 3 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  3. Destination Country / Jurisdiction
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
                  id="notary-rf-dest"
                  value={selectedDestination}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedDestination(e.target.value);
                    guideFinderStep(4);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {NOTARY_DESTINATIONS.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
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
                handleCheckNotaryRoute();
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
                  <span>Checking Notary Route...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0A192F] shrink-0" />
                  <span>
                    {hasPendingRouteChange
                      ? "Check Updated Notary Route"
                      : "Check Notary Route"}
                  </span>
                </>
              )}
            </button>
          </div>

          {hasPendingRouteChange && (
            <div className="rounded-lg bg-amber-400/15 border border-amber-300/40 px-3.5 py-2 text-xs text-amber-200">
              Selection updated. Tap{" "}
              <strong className="text-amber-300">
                &ldquo;Check Updated Notary Route&rdquo;
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
                      {checkedDocObj.shortName} • {checkedRoute.destination}
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
                  Selected Level:{" "}
                  <strong className="text-white">{checkedRoute.mode}</strong> •
                  Est. Time:{" "}
                  <strong className="text-amber-200">
                    {checkedDocObj.timelineNote}
                  </strong>
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

        {/* 5. INTERACTIVE DOCUMENT-WISE SELECTOR WITH INLINE "ASK NOW" BAR */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Affidavits, POAs &amp; Certificates We Notarize
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Documents or Affidavits You Need to Notarize
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick your Single Status Affidavit, Power of Attorney (POA /
              Wakala), Birth/Marriage Certificate, or Name Discrepancy Affidavit
              below — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right below the document you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {INTERACTIVE_NOTARY_DOC_CARDS.map((card) => {
              const isSelected = selectedNotaryIds.includes(card.id);
              const isAnchorForBar = activeAnchorCardId === card.id;
              return (
                <div key={card.id} className="flex flex-col">
                  <div
                    onClick={() => handleToggleNotaryCard(card.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleNotaryCard(card.id);
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

                  {isAnchorForBar && renderNotarySelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Official Notary, e-Stamp & MEA Fees & Timelines (2x2 Grid) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Notaries Act &amp; MEA Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Notary, e-Stamp &amp; Legalization Fees &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_NOTARY_FEES_AND_TIMELINES.map((item, idx) => (
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

        {/* 7. COMPARISON TABLE: STANDALONE NOTARY VS SDM + MEA APOSTILLE VS EMBASSY LEGALIZATION */}
        <ContentCard title="Standalone Notary vs. Notary + SDM + MEA Apostille vs. Embassy Legalization">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Compare the three levels of notarial and consular authentication in
            India depending on where your document will be presented:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="py-3 px-3.5 font-extrabold">Feature</th>
                  <th className="py-3 px-3.5 font-extrabold">
                    Standalone Notary Public Only
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-teal-300">
                    Notary + Delhi SDM + MEA Apostille
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-amber-300">
                    Notary + SDM + MEA + Foreign Embassy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Estimated Timeline
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Same Day (2–4 Hours)
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-emerald-800">
                    2–3 Working Days
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    5–12 Working Days (depends on destination Embassy)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Stamps &amp; Seals Applied
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Advocate Notary Circular Seal + &lsquo;ATTESTED&rsquo; Stamp
                    + Entry No.
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Notary Seal + Delhi SDM Stamp + ₹50 MEA Hague Apostille
                    Sticker
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Notary Seal + SDM Stamp + MEA Normal Stamp + Foreign Embassy
                    Sticker
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Valid Outside India?
                  </td>
                  <td className="py-3 px-3.5 text-red-700 font-semibold">
                    No — Domestic India Use Only
                  </td>
                  <td className="py-3 px-3.5 text-emerald-800 font-semibold">
                    Yes — All 120+ Hague Convention Countries
                  </td>
                  <td className="py-3 px-3.5 text-emerald-800 font-semibold">
                    Yes — UAE, Qatar, Kuwait, Saudi Courts &amp; Non-Hague
                    Nations
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Best Suited For
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Indian courts, domestic banks, rent/lease deeds &amp; local
                    true copies
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Single Status Affidavits, POAs, NOCs &amp; Birth/Marriage
                    certs for Europe, UK, USA, Australia
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    UAE Powers of Attorney, Saudi Wakala / Death Claims, Qatar
                    &amp; Kuwait visas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 8. Required Documents Checklist */}
        <ContentCard title="Required Documents Checklist for Notary & Affidavit Execution">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {REQUIRED_NOTARY_CHECKLIST.map((docItem, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3F4F6] border border-slate-200 text-sm sm:text-base font-medium text-[#0A192F] leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>{docItem}</span>
              </li>
            ))}
          </ul>
        </ContentCard>

        {/* 9. 4-STEP NOTARY, SDM & MEA WORKFLOW */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Step-by-Step Notarial &amp; SDM Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              How Our 4-Step Notary Public &amp; SDM Attestation Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {NOTARY_4_STEP_WORKFLOW.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200/90 flex flex-col justify-between gap-2.5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg bg-white border border-teal-100 flex items-center justify-center shadow-2xs shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100 shrink-0 tabular-nums">
                      Step {item.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0A192F] font-display leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. OFFICIAL NOTARY PUBLIC & DELHI SDM SPECIMEN PROOF GALLERY (2X ZOOM) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Tap to Inspect Reference Proofs (2x Zoom)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official Advocate Notary Public &amp; Delhi SDM Attestation Specimens
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect how the Government of India Advocate Notary Public circular
              seal, <strong className="text-[#0A192F]">ATTESTED</strong> ink
              endorsement, and subsequent{" "}
              <strong className="text-[#0A192F]">
                Sub-Divisional Magistrate (SDM)
              </strong>{" "}
              seal appear on Indian documents. Registration numbers, entry
              numbers, and officer names are blurred for privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NOTARY_SPECIMENS.map((sample) => (
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
                      Reg. No. &amp; Names Masked
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
                      <span>Inspect Notary &amp; SDM Seal</span>
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

        {/* 11. WHY CLIENTS CHOOSE FATIMA GLOBAL ATTESTATION FOR NOTARY & AFFIDAVIT SERVICES */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              End-to-End Notarial &amp; Consular Coordination
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Why Applicants &amp; NRIs Choose Fatima Global Attestation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {NOTARY_TRUST_FACTORS.map((item, idx) => (
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
                  <span>Official Register Entry &amp; e-Stamp</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Every notarized affidavit and POA is recorded with an Advocate
                  Notary Entry Number and Government e-Stamp certificate where
                  required.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Connaught Place, New Delhi</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Direct coordination from Barakhamba Road, New Delhi 110001 —
                  close to Patiala House Courts, SDM offices, and MEA CPV
                  Division.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>PAN-India &amp; NRI Courier Support</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Doorstep pickup across India and direct DHL/FedEx dispatch for
                  NRIs in Europe, UK, USA, UAE, and Saudi Arabia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Disclaimer Box */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department, court, or embassy. Government fees (₹50 for MEA), e-Stamp duty, and timelines apply. Our charges are separate for documentation coordination and logistics." />

        {/* 13. FAQs Section */}
        <FAQAccordion
          title="Frequently Asked Questions — Notary Public Attestation & Affidavits"
          items={NOTARY_PUBLIC_FAQS}
        />

        {/* 14. OFFICIAL PORTALS, INTERNAL LINKS & QUOTE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Official Government Portals */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official Legal, e-Stamp &amp; MEA Reference Portals
              </h2>
              <ul className="space-y-2.5">
                {NOTARY_OFFICIAL_PORTALS.map((link, idx) => (
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

            {/* Popular Destination Countries + Related Guides */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Affidavit, POA &amp; Notary Legalization by Destination Country
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
                  {POPULAR_NOTARY_COUNTRIES.map((country) => (
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
                  Related Attestation &amp; Legalization Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_NOTARY_GUIDES.map((item) => (
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
              initialServiceSlug="/services/notary-public"
              title="Request Notary & Affidavit Quote"
              subtitle="Share your affidavit or certificate type and destination country. Our New Delhi desk will confirm e-Stamp, Notary, SDM, and MEA steps."
            />
          </div>
        </div>

        {/* 15. Bottom Call to Action (CTA) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Notary Public Attestation, e-Stamp Affidavit, or POA Legalization?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your document scan or affidavit requirement on WhatsApp to confirm whether standalone Notary, SDM + MEA Apostille, or Foreign Embassy legalization applies.
          </p>
          <div className="pt-1">
            <a
              href={NOTARY_HERO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-extrabold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Check My Notary &amp; SDM Route on WhatsApp</span>
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
                      Notarial &amp; SDM Verification Scope
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
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-extrabold shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Enquire About Notary &amp; SDM on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JSON-LD FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(NOTARY_PUBLIC_FAQ_SCHEMA),
        }}
      />
    </div>
  );
};
