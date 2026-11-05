import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  ExternalLink,
  Phone,
  ShieldCheck,
  Globe,
  ArrowRight,
  Compass,
  CheckCircle2,
  ZoomIn,
  X,
  FileSearch,
  Truck,
  FileCheck2,
  Receipt,
  Award,
  Stamp,
  Check,
  Loader2,
  MapPin,
  Lock,
  QrCode,
  Clock,
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
import { DocumentSafetyTrustSection } from "./DocumentSafetyTrustSection";
import { useSequentialBoxShine } from "../utils/useSequentialBoxShine";

interface ApostilleServicesPageProps {
  onNavigate?: (path: string) => void;
}

interface ApostilleSpecimenItem {
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

const APOSTILLE_SPECIMENS: ApostilleSpecimenItem[] = [
  {
    id: "apostille-degree-specimen",
    title: "MEA Apostille Sticker on Degree Certificate",
    badge: "Official MEA Apostille Specimen",
    image: "/assets/aistudio/apostille_specimen_clean.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Hague Convention Countries (UK, USA, Germany, Italy, Australia, France)",
    description:
      "Official MEA Apostille specimen on an Indian educational degree certificate showing the computer-generated Hague Convention sticker, CPV Division seal, and preliminary state authentication endorsement. All personal names, serial numbers, QR codes, and signatures are permanently masked.",
    elementsVerified: [
      "Government of India Ministry of External Affairs (MEA) Apostille Sticker",
      "Unique Computer-Generated Serial Number & Hague Convention Header",
      "Preliminary State / SDM Verification Endorsement & Embossed Seal",
      "Personal Names, Certificate Numbers, QR Code & Signatures Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the Official MEA Apostille Specimen on your Apostille page and need assistance with my document.",
  },
  {
    id: "apostille-sdm-specimen",
    title: "SDM Verification + MEA Hague Apostille Certificate",
    badge: "SDM + MEA Apostille",
    image: "/samples/sample_sdm_apostille_qr.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Hague Member Nations (Europe, USA, Canada, Oman, Saudi Arabia)",
    description:
      "Complete SDM + MEA Hague Apostille chain showing the placement of the Notary Public seal, Sub-Divisional Magistrate (SDM) stamp, and MEA Apostille sticker. All personal names, addresses, certificate numbers, QR codes, and handwritten notes are permanently masked.",
    elementsVerified: [
      "Notary Public Official Circular Seal Layout",
      "Sub-Divisional Magistrate (SDM) Official Emblem Seal",
      "Ministry of External Affairs (MEA) Hague Apostille Sticker Layout",
      "Personal Names, Serial Numbers, QR Code & Signatures Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with SDM + MEA Apostille for my document.",
  },
  {
    id: "apostille-marriage-specimen",
    title: "Marriage Certificate SDM Verification & MEA Apostille",
    badge: "Personal Certificate Apostille",
    image: "/samples/sample_marriage_certificate_apostille.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse: "Spouse & Family Reunion Visas in Hague Countries",
    description:
      "Marriage certificate reverse side illustrating SDM authentication and MEA Apostille sticker placement for family visa sponsorship. All personal names, certificate numbers, addresses, signatures, and handwritten notes are permanently masked.",
    elementsVerified: [
      "Notary Public & Sub-Divisional Magistrate (SDM) Official Seals",
      "Ministry of External Affairs (MEA) Hague Apostille Sticker",
      "CPV Division Consular Circular Stamp",
      "Holder Name, Certificate No., Address & Notes Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need Marriage Certificate MEA Apostille for a family/dependent visa.",
  },
  {
    id: "apostille-pcc-specimen",
    title: "Police Clearance Certificate (PCC) MEA Apostille",
    badge: "PCC Apostille",
    image: "/samples/sample_pcc_mea_apostille.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse: "European Work Permits & Residency Visas",
    description:
      "Police Clearance Certificate (PCC) reverse side showing the placement of the MEA Apostille sticker and CPV Division circular seal for European immigration submissions. Applicant name, certificate number, serial number, and signatures are permanently masked.",
    elementsVerified: [
      "Ministry of External Affairs (MEA) Apostille Sticker on PCC",
      "Official CPV Division Circular Consular Stamp",
      "Hague Convention Standard Header & Guilloche Pattern",
      "Applicant Name, Certificate No. & Signatures Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need MEA Apostille on my Police Clearance Certificate (PCC).",
  },
];

interface ApostilleDocumentOption {
  label: string;
  shortName: string;
  shortRoute: string;
  guideSlug: string;
  guideLabel: string;
}

const APOSTILLE_DOCUMENTS: ApostilleDocumentOption[] = [
  {
    label: "Degree Certificate (Bachelor's / Master's / PhD)",
    shortName: "Degree Certificate",
    shortRoute: "Notary / SDM or State HRD → MEA Apostille",
    guideSlug: "/services/degree-certificate-apostille",
    guideLabel: "Educational Apostille Guide",
  },
  {
    label: "Diploma / Consolidated Marksheet",
    shortName: "Diploma / Marksheet",
    shortRoute: "Notary / SDM or State HRD → MEA Apostille",
    guideSlug: "/services/degree-certificate-apostille",
    guideLabel: "Educational Apostille Guide",
  },
  {
    label: "Birth Certificate",
    shortName: "Birth Certificate",
    shortRoute: "Notary + SDM / State Home Dept → MEA Apostille",
    guideSlug: "/personal-document-attestation",
    guideLabel: "Personal Document Guide",
  },
  {
    label: "Marriage Certificate",
    shortName: "Marriage Certificate",
    shortRoute: "Notary + SDM / State Home Dept → MEA Apostille",
    guideSlug: "/personal-document-attestation",
    guideLabel: "Personal Document Guide",
  },
  {
    label: "Police Clearance Certificate (PCC)",
    shortName: "Police Clearance Certificate (PCC)",
    shortRoute: "SDM / RPO Verification → MEA Apostille",
    guideSlug: "/sdm-apostille-services",
    guideLabel: "SDM + Apostille Guide",
  },
  {
    label: "Single Status / Bachelorhood Affidavit",
    shortName: "Single Status Affidavit",
    shortRoute: "Notary + SDM Authentication → MEA Apostille",
    guideSlug: "/sdm-apostille-services",
    guideLabel: "SDM + Apostille Guide",
  },
  {
    label: "Power of Attorney (POA)",
    shortName: "Power of Attorney (POA)",
    shortRoute: "Notary + SDM / Chamber → MEA Apostille",
    guideSlug: "/sdm-apostille-services",
    guideLabel: "POA Apostille Guide",
  },
  {
    label: "Commercial Document (COI / Invoice / COO)",
    shortName: "Commercial Document",
    shortRoute: "Chamber of Commerce → MEA Apostille",
    guideSlug: "/services/commercial-document-attestation",
    guideLabel: "Commercial Apostille Guide",
  },
];

const HAGUE_COUNTRIES = [
  "United Kingdom (UK)",
  "United States (USA)",
  "Germany",
  "Italy",
  "France",
  "Australia",
  "Canada",
  "Saudi Arabia",
  "Oman",
  "Netherlands",
  "Spain",
  "Poland",
  "Israel",
  "Other Hague Country",
];

interface InteractiveDocSelectCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  routeFinderDocLabel: string;
  guideSlug: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_DOCUMENT_CARDS: InteractiveDocSelectCard[] = [
  {
    id: "doc-degree",
    title: "Degree & education",
    subtitle: "Degrees, diplomas and mark sheets.",
    routeBadge: "HRD / SDM → MEA Apostille",
    routeFinderDocLabel: "Degree Certificate (Bachelor's / Master's / PhD)",
    guideSlug: "/services/degree-certificate-apostille",
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
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="24"
          x2="40"
          y2="24"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="31"
          x2="36"
          y2="31"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="38"
          x2="30"
          y2="38"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M22 10L6 17L22 24L38 17L22 10Z" fill="#0B2545" />
        <path
          d="M12 20V26C12 28.5 16.5 30.5 22 30.5C27.5 30.5 32 28.5 32 26V20"
          fill="#1E3A5F"
        />
        <path
          d="M35 18V27"
          stroke="#D49B27"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect
          x="26"
          y="42"
          width="30"
          height="10"
          rx="5"
          transform="rotate(-12 26 42)"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="1.6"
        />
        <circle cx="42" cy="44" r="3.5" fill="#DC2626" />
        <path
          d="M41 47L39 54M43 47L46 53"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "doc-marriage",
    title: "Marriage certificate",
    subtitle: "For spouse visas and family moves.",
    routeBadge: "SDM / Home Dept → MEA Apostille",
    routeFinderDocLabel: "Marriage Certificate",
    guideSlug: "/personal-document-attestation",
    bgTintClass: "bg-[#FBECE8]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="10"
          width="34"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          d="M29 18C27.8 16.5 25.5 16.5 24.5 18C23.5 19.5 24.5 21.5 29 24.5C33.5 21.5 34.5 19.5 33.5 18C32.5 16.5 30.2 16.5 29 18Z"
          fill="#E11D48"
        />
        <line
          x1="18"
          y1="29"
          x2="38"
          y2="29"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="35"
          x2="34"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="39"
          cy="43"
          r="8"
          stroke="#D97706"
          strokeWidth="2.8"
          fill="none"
        />
        <circle
          cx="48"
          cy="41"
          r="8"
          stroke="#F59E0B"
          strokeWidth="2.8"
          fill="none"
        />
        <polygon points="46,30 48,27 50,30 48,32" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: "doc-birth",
    title: "Birth certificate",
    subtitle: "One you already hold, for visas and schools.",
    routeBadge: "SDM / Home Dept → MEA Apostille",
    routeFinderDocLabel: "Birth Certificate",
    guideSlug: "/personal-document-attestation",
    bgTintClass: "bg-[#E6F6EC]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="10"
          width="34"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="20"
          x2="38"
          y2="20"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="27"
          x2="36"
          y2="27"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="34"
          x2="30"
          y2="34"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="39"
          cy="44"
          rx="4"
          ry="6.5"
          transform="rotate(-14 39 44)"
          fill="#EF4444"
        />
        <circle cx="35" cy="36" r="1.4" fill="#EF4444" />
        <circle cx="38" cy="35" r="1.3" fill="#EF4444" />
        <circle cx="41" cy="35.5" r="1.2" fill="#EF4444" />
        <ellipse
          cx="49"
          cy="41"
          rx="4"
          ry="6.5"
          transform="rotate(12 49 41)"
          fill="#EF4444"
        />
        <circle cx="47" cy="33" r="1.3" fill="#EF4444" />
        <circle cx="50" cy="33" r="1.4" fill="#EF4444" />
        <circle cx="53" cy="34.5" r="1.2" fill="#EF4444" />
      </svg>
    ),
  },
  {
    id: "doc-commercial",
    title: "Commercial documents",
    subtitle: "Company, trade and export papers.",
    routeBadge: "Chamber of Commerce → MEA Apostille",
    routeFinderDocLabel: "Commercial Document (COI / Invoice / COO)",
    guideSlug: "/services/commercial-document-attestation",
    bgTintClass: "bg-[#F6EFE2]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="22"
          y="10"
          width="32"
          height="40"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <rect x="38" y="21" width="3" height="7" rx="1" fill="#EF4444" />
        <rect x="43" y="18" width="3" height="10" rx="1" fill="#0B2545" />
        <rect x="48" y="15" width="3" height="13" rx="1" fill="#0F766E" />
        <line
          x1="28"
          y1="34"
          x2="48"
          y2="34"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="40"
          x2="44"
          y2="40"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="8" y="28" width="28" height="22" rx="4" fill="#0B2545" />
        <path
          d="M17 28V25C17 23.9 17.9 23 19 23H25C26.1 23 27 23.9 27 25V28"
          stroke="#0B2545"
          strokeWidth="2.5"
        />
        <rect x="19" y="37" width="6" height="4" rx="1" fill="#FBBF24" />
      </svg>
    ),
  },
  {
    id: "doc-pcc",
    title: "PCC & Single Status",
    subtitle: "Police Clearance & unmarried affidavits.",
    routeBadge: "SDM / RPO → MEA Apostille",
    routeFinderDocLabel: "Police Clearance Certificate (PCC)",
    guideSlug: "/sdm-apostille-services",
    bgTintClass: "bg-[#E0F2FE]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="12"
          y="10"
          width="34"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="20"
          x2="38"
          y2="20"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="27"
          x2="34"
          y2="27"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M44 26L54 30V39C54 46 49.5 51.5 44 54C38.5 51.5 34 46 34 39V30L44 26Z"
          fill="#0F766E"
        />
        <path
          d="M40 40L43 43L49 37"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "doc-other",
    title: "Other documents",
    subtitle: "Experience letters, POA, affidavits and more.",
    routeBadge: "Notary + SDM → MEA Apostille",
    routeFinderDocLabel: "Power of Attorney (POA)",
    guideSlug: "/sdm-apostille-services",
    bgTintClass: "bg-[#EAEFF5]",
    illustration: (
      <svg
        viewBox="0 0 64 64"
        className="w-12 h-12 sm:w-14 sm:h-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="16"
          y="12"
          width="32"
          height="28"
          rx="3"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="22"
          y1="20"
          x2="42"
          y2="20"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="26"
          x2="38"
          y2="26"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M10 28H54L50 50H14L10 28Z" fill="#0B2545" />
        <rect x="24" y="36" width="16" height="5" rx="2" fill="#FFFFFF" />
        <line
          x1="27"
          y1="38.5"
          x2="37"
          y2="38.5"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface DocumentCategoryBreakdown {
  badge: string;
  title: string;
  routeSummary: string;
  guideSlug: string;
  guideCta: string;
  coveredDocuments: string[];
}

const DOCUMENT_CATEGORY_BREAKDOWNS: DocumentCategoryBreakdown[] = [
  {
    badge: "ACADEMIC",
    title: "Educational Documents",
    routeSummary: "State HRD / SDM Verification → MEA Apostille",
    guideSlug: "/services/degree-certificate-apostille",
    guideCta: "Explore Educational Apostille Guide",
    coveredDocuments: [
      "Degrees, certificates and Diplomas",
      "Academic Transcripts and Mark Sheets",
      "School Leaving Certificates (SSC / HSC)",
      "Professional Qualification Certificates",
      "Migration and Provisional Certificates",
    ],
  },
  {
    badge: "PERSONAL",
    title: "Personal Documents",
    routeSummary: "Notary + SDM / State Home Dept → MEA Apostille",
    guideSlug: "/personal-document-attestation",
    guideCta: "Explore Personal Document Guide",
    coveredDocuments: [
      "Birth and Marriage Certificates",
      "Death Certificates",
      "Affidavits and Statutory Declarations",
      "Experience Letters and Salary Certificates",
      "Police Clearance Certificates (PCC)",
      "No Objection Certificates (NOC)",
    ],
  },
  {
    badge: "COMMERCIAL",
    title: "Commercial Documents",
    routeSummary: "Chamber of Commerce → MEA Apostille",
    guideSlug: "/services/commercial-document-attestation",
    guideCta: "Explore Commercial Document Guide",
    coveredDocuments: [
      "Power of Attorney (PoA)",
      "Certificate of Origin and Commercial Invoices",
      "Company Incorporation Documents",
      "Export and Trade Certificates",
      "Memorandum and Articles of Association",
    ],
  },
];

const APOSTILLE_4_PROCESS_STEPS = [
  {
    step: 1,
    title: "Document Verification",
    description: "We check if state HRD/SDM is needed.",
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 2,
    title: "State Authentication",
    description: "Notary/SDM/HRD submission.",
    icon: <FileCheck2 className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 3,
    title: "MEA Apostille",
    description: "Final sticker application.",
    icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 4,
    title: "Secure Delivery",
    description: "Tracked courier to your address.",
    icon: <Truck className="w-5 h-5 text-teal-700" />,
  },
];

const APOSTILLE_GENERAL_STEPS = [
  {
    step: 1,
    title: "Notarization & State Verification",
    description:
      "For personal and educational documents, initial verification by a Notary, SDM, or State HRD is often required before MEA submission.",
  },
  {
    step: 2,
    title: "e-Sanad (If Applicable)",
    description:
      "For eligible digital documents, the process can be initiated online via the government e-Sanad portal.",
  },
  {
    step: 3,
    title: "MEA Apostille",
    description:
      "The final Apostille sticker is applied by the MEA in New Delhi.",
  },
];

const APOSTILLE_TRUST_FACTORS = [
  {
    icon: <FileCheck2 className="w-5 h-5 text-teal-700" />,
    title: "Pre-Submission Check",
    desc: "We check your scan first to confirm seal clarity and document eligibility before you send originals.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Correct State Routing",
    desc: "We ensure HRD/SDM is done correctly based on your issuing state and destination country.",
  },
  {
    icon: <Truck className="w-5 h-5 text-teal-700" />,
    title: "Secure Courier",
    desc: "Tracked delivery across India and abroad in protective document sleeves.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Transparent Fees",
    desc: "Government fee + our service fee explained clearly upfront with zero hidden charges.",
  },
];

const OFFICIAL_RESOURCES = [
  {
    title: "Ministry of External Affairs (MEA) - Apostille Guidelines",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title: "HCCH - Apostille Convention Status Table",
    href: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
  },
];

const POPULAR_HAGUE_DESTINATIONS = [
  { name: "Germany", slug: "/countries/germany" },
  { name: "Italy", slug: "/countries/italy" },
  { name: "United Kingdom (UK)", slug: "/countries/uk" },
  { name: "United States (USA)", slug: "/countries/usa" },
  { name: "France", slug: "/countries/france" },
  { name: "Australia", slug: "/countries/australia" },
  { name: "Saudi Arabia", slug: "/countries/saudi-arabia" },
  { name: "Israel", slug: "/countries/israel" },
];

const RELATED_APOSTILLE_GUIDES = [
  {
    title: "Degree Certificate Apostille",
    slug: "/services/degree-certificate-apostille",
    tag: "Educational Documents",
  },
  {
    title: "Commercial Document Attestation",
    slug: "/services/commercial-document-attestation",
    tag: "Business & Export",
  },
  {
    title: "e-Sanad Guide: Application & Status",
    slug: "/guides/e-sanad",
    tag: "Official Portal Guide",
  },
  {
    title: "Apostille Agent in Connaught Place, Delhi",
    slug: "/locations/apostille-agent-delhi",
    tag: "New Delhi Office",
  },
];

export const APOSTILLE_PAGE_FAQS: FAQItem[] = [
  {
    question: "How much is the official MEA fee for an apostille?",
    answer:
      "As per official MEA guidelines, the government fee is ₹50 per document. Our service charges are separate and cover the coordination, document pickup, and delivery.",
  },
  {
    question: "Can I get an apostille directly from the MEA?",
    answer:
      "The MEA does not accept documents directly from individuals at its counter. You must go through designated Regional Authentication Centres (RACs) or the e-Sanad portal.",
  },
  {
    question: "How long does the apostille process take?",
    answer:
      "Timeframes vary based on the issuing state and document type. If state verification (HRD) is required first, it can take longer. We confirm the estimated timeline after reviewing your document.",
  },
  {
    question:
      "What is the difference between MEA Apostille and Embassy Attestation?",
    answer:
      "An MEA Apostille sticker is valid across all 120+ Hague Convention member countries (such as the UK, USA, Germany, Italy, France, Australia, Oman, and Saudi Arabia) without needing embassy legalization. Non-Hague countries (such as UAE, Qatar, and Kuwait) require further Embassy Attestation and MOFA verification.",
  },
  {
    question:
      "What documents are required to apply for an MEA Apostille in India?",
    answer:
      "Generally, you need the original certificate (Degree, Birth, Marriage, PCC, or Commercial document) along with a clear copy of the document holder's passport (front and back pages). For commercial documents, a company covering letter and Chamber of Commerce endorsement are required.",
  },
  {
    question:
      "Can NRIs living abroad get Indian documents apostilled through Fatima Global Attestation without visiting India?",
    answer:
      "Yes. NRIs in the UK, USA, Europe, Australia, Canada, GCC, and worldwide can send their Indian certificates via international courier or through a family member in India. Fatima Global Attestation coordinates the complete SDM/HRD and MEA Apostille process in New Delhi and dispatches the apostilled originals back via tracked international courier.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
  {
    question: "Is it safe to send my original documents via courier? What if they get lost?",
    answer:
      "We understand original certificates are irreplaceable. We strongly recommend using a reputable, insured courier service (like Blue Dart or DTDC) with tracking. Once received at our Connaught Place desk, your documents are stored securely. We provide a unique FGA Tracking ID so you know exactly where your document is at every stage.",
  },
  {
    question: "Can I submit my documents directly to the MEA myself?",
    answer:
      "No. As per official MEA guidelines, individuals cannot submit documents directly at the MEA counter. The collection and delivery of documents for attestation/apostille have been outsourced to authorized agencies. We act as your authorized coordinator to handle this submission for you.",
  },
  {
    question: "What if my document is rejected by MEA or the Embassy?",
    answer:
      "We do a \"Pre-Submission Scan Check\" before you send originals. We check for common rejection reasons like laminated certificates, name mismatches, or unclear seals. If we spot an issue, we inform you immediately, saving you time and courier costs.",
  },
  {
    question: "Are there any hidden charges after I send my documents?",
    answer:
      "No. We provide a transparent quote before starting. The MEA government fee is fixed at ₹50 per document. Our service charge covers the coordination, SDM/HRD routing, and logistics. There are no surprise fees.",
  },
  {
    question: "How do I verify that the Apostille sticker on my document is genuine?",
    answer:
      "Once the process is complete, you can verify the MEA Apostille sticker using the unique Document ID printed on it. We have provided a step-by-step guide on this page under \"Verify Government Apostille\" with the official e-Sanad portal link.",
  },
  {
    question: "Why is my document stuck at HRD or Embassy for so many days?",
    answer:
      "Government processing times at State HRD and Embassies vary and are outside our direct control. However, your FGA Tracking ID will show you exactly which stage your document is at. You can also WhatsApp us for a specific update.",
  },
];

const PAN_INDIA_SERVICE_CITIES = [
  "New Delhi & NCR",
  "Mumbai & Pune (Maharashtra)",
  "Bengaluru (Karnataka)",
  "Hyderabad (Telangana)",
  "Chennai (Tamil Nadu)",
  "Kochi & Trivandrum (Kerala)",
  "Ahmedabad & Surat (Gujarat)",
  "Kolkata (West Bengal)",
  "Chandigarh & Jalandhar (Punjab)",
  "Lucknow & Noida (UP)",
  "Jaipur (Rajasthan)",
  "Patna (Bihar) & All States",
];

export const ApostilleServicesPage: React.FC<ApostilleServicesPageProps> = ({
  onNavigate,
}) => {
  // Route Finder form state vs verified checked state
  const [selectedDocLabel, setSelectedDocLabel] = useState<string>(
    APOSTILLE_DOCUMENTS[0].label
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    HAGUE_COUNTRIES[0]
  );
  const [checkedRoute, setCheckedRoute] = useState<{
    docLabel: string;
    country: string;
  }>({
    docLabel: APOSTILLE_DOCUMENTS[0].label,
    country: HAGUE_COUNTRIES[0],
  });
  const [isCheckingRoute, setIsCheckingRoute] = useState<boolean>(false);
  const [routeFlash, setRouteFlash] = useState<boolean>(false);
  const routeResultRef = useRef<HTMLDivElement | null>(null);
  const {
    containerRef: finderSectionRef,
    activeStep: activeFinderShineStep,
    guideToStep: guideFinderStep,
    markInteracted: markFinderInteracted,
  } = useSequentialBoxShine(3);

  // Interactive Multi-Document Checklist State ("Gather your documents. We'll take it from here.")
  // Track both selected IDs and the last-interacted card ID so the "Ask now" bar appears directly below the card the user selected!
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([
    "doc-degree",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] =
    useState<string>("doc-degree");

  // Specimen Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<ApostilleSpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  // Sync full SEO metadata, OpenGraph, Canonical, and single unified JSON-LD graph
  useEffect(() => {
    applyRouteSEO("/services/apostille");
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

  const handleScrollToRouteFinder = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    scrollToSectionById("apostille-route-finder", "smooth");
  };

  const handleCheckRouteClick = () => {
    guideFinderStep(0);
    setIsCheckingRoute(true);
    setTimeout(() => {
      setCheckedRoute({
        docLabel: selectedDocLabel,
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

  const handleToggleDocumentCard = (id: string) => {
    setSelectedDocIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (!exists) {
        // User just selected this card -> place the "Ask now" bar right below this card
        setActiveAnchorCardId(id);
      } else if (next.length > 0) {
        // User unchecked this card -> move the "Ask now" bar below the most recently selected remaining card
        setActiveAnchorCardId(next[next.length - 1]);
      } else {
        // 0 cards selected -> keep the prompt bar right below the card they just interacted with
        setActiveAnchorCardId(id);
      }
      return next;
    });
  };

  const handleSelectDocInRouteFinder = (
    e: React.MouseEvent<HTMLButtonElement>,
    docLabel: string
  ) => {
    e.stopPropagation();
    setSelectedDocLabel(docLabel);
    setCheckedRoute({
      docLabel,
      country: selectedCountry,
    });
    setRouteFlash(true);
    scrollToSectionById("apostille-route-finder", "smooth");
    setTimeout(() => {
      setRouteFlash(false);
    }, 1000);
  };

  const handleOpenSpecimen = (specimen: ApostilleSpecimenItem) => {
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
    "apostille-specimen-popup"
  );

  const hasPendingRouteChange =
    selectedDocLabel !== checkedRoute.docLabel ||
    selectedCountry !== checkedRoute.country;

  const checkedDocObj =
    APOSTILLE_DOCUMENTS.find((d) => d.label === checkedRoute.docLabel) ||
    APOSTILLE_DOCUMENTS[0];

  const routeFinderWhatsAppMessage = `Hello ${BUSINESS_CONFIG.shortName}, I checked the Apostille Route for ${checkedDocObj.label} (${checkedRoute.country}). Please share the timeline and charges.`;

  // Build combined WhatsApp message for ticked documents in "Gather your documents"
  const selectedDocumentTitles = INTERACTIVE_DOCUMENT_CARDS.filter((c) =>
    selectedDocIds.includes(c.id)
  ).map((c) => c.title);

  const multiDocWhatsAppMessage =
    selectedDocumentTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, I need MEA Apostille assistance for the following document(s):\n• ${selectedDocumentTitles.join("\n• ")}\n\nPlease share the required process, timeline, and fee estimate.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need assistance with MEA Apostille Services in India. Please guide me on the process and fees.`;

  const renderSelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedDocIds.length > 0) {
              setSelectedDocIds([]);
            } else {
              setSelectedDocIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedDocIds.length > 0 ? "Clear selection" : "Select document"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedDocIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedDocIds.length === 0
              ? "Tap the documents you have"
              : selectedDocIds.length === 1
              ? "1 document selected"
              : `${selectedDocIds.length} documents selected`}
          </span>
          {selectedDocumentTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedDocumentTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiDocWhatsAppMessage)}
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
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-12">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Apostille Services in India
            </span>
          </nav>
        </div>
      </div>

      {/* =====================================================================
          1. HERO SECTION (Unique Authoritative Navy-Teal-Gold Header)
         ===================================================================== */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#0E4858] text-white border-b border-slate-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.16),transparent_48%),radial-gradient(circle_at_15%_80%,rgba(234,179,8,0.10),transparent_45%)]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-11">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Stamp className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Hague Convention 1961 • MEA &amp; e-Sanad Assistance</span>
              </div>

              <h1 className="text-[26px] sm:text-4xl lg:text-[42px] font-extrabold text-white font-display tracking-tight leading-tight">
                Apostille Services in India
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Professional assistance with MEA Apostille for educational,
                personal, and commercial documents. We coordinate the process so
                you don&apos;t have to run between government offices.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.telPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0A192F] text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#0F766E] shrink-0" />
                  <span>Talk to an Expert</span>
                </a>

                <a
                  href={getWhatsAppUrl(
                    "Hello Fatima Global Attestation, I need assistance with MEA Apostille Services in India."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="#apostille-route-finder"
                  onClick={handleScrollToRouteFinder}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-teal-200 text-xs sm:text-sm font-bold transition-colors"
                >
                  <span>Check Document Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-slate-900/75 border border-teal-400/30 p-4 sm:p-5 shadow-lg space-y-3.5 backdrop-blur-xs">
                <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-300/35 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-amber-300" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                        Ministry of External Affairs
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-white block">
                        Hague Convention Sticker
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                    120+ Nations
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                    <span>
                      Official MEA Government Fee:{" "}
                      <strong className="text-amber-300">₹50 / Sticker</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                    <span>
                      Valid for UK, USA, Europe, Australia, Oman &amp; KSA
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                    <span>
                      No Embassy Attestation needed for Hague countries
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => handleOpenSpecimen(APOSTILLE_SPECIMENS[0])}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-200 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Inspect Official MEA Apostille Specimen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. INTERACTIVE WIDGET: DOCUMENT ROUTE FINDER (Responsive Check Route)
         ===================================================================== */}
      <section
        id="apostille-route-finder"
        ref={finderSectionRef}
        className="py-6 sm:py-9 bg-white border-b border-slate-200 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-6 shadow-md border border-teal-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                  Quick Route Check
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                  Find Apostille Route for Your Document
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full self-start sm:self-center">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Hague Convention Countries</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              {/* Dropdown 1: Select Document */}
              <div className="sm:col-span-5 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <label
                    htmlFor="apostille-rf-doc"
                    className={`block text-xs font-bold transition-colors ${
                      activeFinderShineStep === 1 ? "text-amber-300" : "text-teal-200"
                    }`}
                  >
                    1. Select Document
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
                    id="apostille-rf-doc"
                    value={selectedDocLabel}
                    onFocus={markFinderInteracted}
                    onChange={(e) => {
                      setSelectedDocLabel(e.target.value);
                      guideFinderStep(2);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    {APOSTILLE_DOCUMENTS.map((doc) => (
                      <option key={doc.label} value={doc.label}>
                        {doc.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dropdown 2: Select Destination Country */}
              <div className="sm:col-span-4 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <label
                    htmlFor="apostille-rf-country"
                    className={`block text-xs font-bold transition-colors ${
                      activeFinderShineStep === 2 ? "text-amber-300" : "text-teal-200"
                    }`}
                  >
                    2. Select Destination Country
                  </label>
                  {activeFinderShineStep === 2 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                      <span>Select country</span>
                    </span>
                  )}
                </div>
                <div
                  className={`relative rounded-xl transition-all duration-300 ${
                    activeFinderShineStep === 2 ? "fga-finder-box-shine" : ""
                  }`}
                >
                  <select
                    id="apostille-rf-country"
                    value={selectedCountry}
                    onFocus={markFinderInteracted}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      guideFinderStep(3);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                  >
                    {HAGUE_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Button: Check Route */}
              <div className="sm:col-span-3">
                <button
                  type="button"
                  onClick={handleCheckRouteClick}
                  disabled={isCheckingRoute}
                  className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    hasPendingRouteChange
                      ? "bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] ring-2 ring-amber-300/70"
                      : "bg-[#14B8A6] hover:bg-teal-400 text-[#0A192F]"
                  } ${
                    activeFinderShineStep === 3 ? "fga-finder-box-shine ring-2 ring-amber-300" : ""
                  }`}
                >
                  {isCheckingRoute ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#0A192F] animate-spin shrink-0" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#0A192F] shrink-0" />
                      <span>
                        {hasPendingRouteChange
                          ? "Check Updated Route"
                          : "Check Route"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {hasPendingRouteChange && (
              <div className="rounded-lg bg-amber-400/15 border border-amber-300/40 px-3.5 py-2 text-xs text-amber-200 flex items-center justify-between gap-2">
                <span>
                  Selection changed to{" "}
                  <strong className="text-white">{selectedDocLabel}</strong> for{" "}
                  <strong className="text-white">{selectedCountry}</strong>. Tap{" "}
                  <strong className="text-amber-300">
                    &ldquo;Check Updated Route&rdquo;
                  </strong>{" "}
                  above to update result.
                </span>
              </div>
            )}

            {/* Concise, Responsive Result Bar */}
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
                        Route Verified • {checkedDocObj.shortName} →{" "}
                        {checkedRoute.country}
                      </span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-extrabold text-white pt-0.5">
                    This document requires MEA Apostille. (No embassy needed for
                    Hague countries).
                  </p>

                  <p className="text-[11px] sm:text-xs text-teal-200">
                    Standard Chain:{" "}
                    <strong className="text-amber-300">
                      {checkedDocObj.shortRoute}
                    </strong>{" "}
                    for{" "}
                    <strong className="text-white">
                      {checkedRoute.country}
                    </strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={checkedDocObj.guideSlug}
                    onClick={(e) => handleLinkClick(e, checkedDocObj.guideSlug)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-teal-200 text-xs font-bold transition-colors"
                  >
                    <span>{checkedDocObj.guideLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={getWhatsAppUrl(routeFinderWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. DOCUMENT-WISE APOSTILLE SECTION (Inline "Ask now" Bar Directly Below
             the Selected Document Card + Academic/Personal/Commercial SEO Cards)
         ===================================================================== */}
      <section
        id="documents-we-assist-with"
        className="py-8 sm:py-12 bg-white border-b border-slate-200 overflow-x-hidden scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          {/* PART A: Interactive Multi-Select Document Cards ("Gather your documents. We'll take it from here.") */}
          <div className="space-y-5 sm:space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                <span className="w-6 h-0.5 bg-[#0F766E] rounded-full" />
                <span>Documents We Assist With</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A192F] font-display tracking-tight leading-[1.15]">
                Gather your documents. We&apos;ll take it from here.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tick everything you need help with, then send one enquiry — the{" "}
                <strong className="text-[#0A192F]">Ask now</strong> bar appears
                right under the document you select.
              </p>
            </div>

            {/* Interactive Document-Wise Cards Grid with Inline "Ask now" Bar Under the Active Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-start">
              {INTERACTIVE_DOCUMENT_CARDS.map((card) => {
                const isSelected = selectedDocIds.includes(card.id);
                const isAnchorForBar = activeAnchorCardId === card.id;
                return (
                  <div key={card.id} className="flex flex-col">
                    <div
                      onClick={() => handleToggleDocumentCard(card.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleToggleDocumentCard(card.id);
                        }
                      }}
                      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-150 cursor-pointer select-none flex flex-col justify-between gap-3.5 shadow-2xs hover:shadow-md ${
                        isSelected
                          ? "bg-white border-2 border-[#0A192F] ring-2 ring-[#0F766E]/15"
                          : "bg-white border-slate-200/90 hover:border-[#0F766E]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3.5">
                        {/* Left Illustration Box */}
                        <div
                          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl ${card.bgTintClass} flex items-center justify-center shrink-0`}
                        >
                          {card.illustration}
                        </div>

                        {/* Center Title & Description */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display leading-snug">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                            {card.subtitle}
                          </p>
                        </div>

                        {/* Right Interactive Checkbox */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                            isSelected
                              ? "bg-[#0F766E] border-2 border-[#0F766E] text-white shadow-2xs"
                              : "bg-white border-2 border-slate-300 text-transparent"
                          }`}
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                        </div>
                      </div>

                      {/* Card Footer: Route Badge + Direct Guide Link */}
                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleSelectDocInRouteFinder(
                              e,
                              card.routeFinderDocLabel
                            )
                          }
                          className="font-bold text-[#0F766E] hover:text-[#0A192F] transition-colors truncate cursor-pointer text-left"
                        >
                          {card.routeBadge}
                        </button>

                        <a
                          href={card.guideSlug}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLinkClick(e, card.guideSlug);
                          }}
                          className="inline-flex items-center gap-1 font-extrabold text-[#0A192F] hover:text-[#0F766E] shrink-0 transition-colors"
                        >
                          <span>Open Guide</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Inline Action Bar Directly Underneath the Selected / Active Document Card */}
                    {isAnchorForBar && renderSelectionActionBar()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PART B: SEO Document Category Breakdown Cards (ACADEMIC, PERSONAL, COMMERCIAL) */}
          <div className="pt-6 border-t border-slate-200/80 space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Document-Wise MEA Apostille Coverage
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] font-display tracking-tight">
                Indian Documents Covered Under MEA Apostille
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We handle all Indian-issued documents across educational,
                personal, and commercial categories — ensuring each goes through
                the correct authentication channel as mandated by the Ministry
                of External Affairs (MEA).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3">
              {DOCUMENT_CATEGORY_BREAKDOWNS.map((cat) => (
                <div
                  key={cat.badge}
                  className="relative bg-white rounded-3xl border border-slate-200/95 shadow-xs hover:shadow-md transition-shadow pt-8 pb-6 px-5 sm:px-7 flex flex-col justify-between gap-5"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-5 py-1.5 rounded-full bg-white border-[1.5px] border-[#0F766E] text-[#0F766E] text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                      {cat.badge}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-bold text-[#0F766E]">
                        {cat.routeSummary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-[#0A192F]">
                        Covered Documents:
                      </span>
                    </div>

                    <ul className="space-y-3 pt-1">
                      {cat.coveredDocuments.map((docItem, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-700 leading-snug"
                        >
                          <ArrowRight className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                          <span>{docItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href={cat.guideSlug}
                      onClick={(e) => handleLinkClick(e, cat.guideSlug)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-[#0F766E] text-xs sm:text-sm font-bold text-[#0A192F] hover:text-[#0F766E] flex items-center justify-between gap-2 transition-colors"
                    >
                      <span>{cat.guideCta}</span>
                      <ArrowRight className="w-4 h-4 text-[#0F766E] shrink-0" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PROCESS STEPS (4-Step Grid matching Homepage "How It Works")
         ===================================================================== */}
      <section className="py-7 sm:py-10 bg-slate-50 border-b border-slate-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-1.5 mb-6">
            <div className="text-[11px] font-bold tracking-wider text-[#008DA8] uppercase">
              Seamless Workflow
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0B2545] font-display tracking-tight">
              Our MEA Apostille Process — Step by Step
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {APOSTILLE_4_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between gap-2.5 min-w-0"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50/70 border border-teal-100 flex items-center justify-center shadow-2xs shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 shrink-0">
                      Step {item.step}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-display leading-snug break-words">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. DOCUMENT SPECIMEN / PROOF SECTION ("Tap to View" + "Zoom 2x" UI)
         ===================================================================== */}
      <section className="py-7 sm:py-10 bg-white border-b border-slate-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-6">
            <div className="text-[11px] font-bold tracking-wider text-[#008DA8] uppercase">
              Tap to View Reference Proofs
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0B2545] font-display tracking-tight">
              Official MEA Apostille Specimen
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tap any specimen below to inspect the Government of India MEA
              Apostille sticker and SDM seal layout with 2x zoom. Personal
              details are masked for privacy.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {APOSTILLE_SPECIMENS.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-400 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden group min-w-0"
              >
                <div
                  className="relative bg-slate-50 cursor-pointer overflow-hidden aspect-[3/3.5] border-b border-slate-100 flex items-center justify-center p-1.5 sm:p-2"
                  onClick={() => handleOpenSpecimen(sample)}
                >
                  <img
                    src={sample.image}
                    alt={`${sample.title} (${sample.privacyLabel})`}
                    className="w-full h-full object-contain rounded border border-slate-200/70 bg-white group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />

                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#0B2545]/90 text-[9px] sm:text-[10px] font-semibold text-teal-300 shadow-2xs truncate max-w-[85%] pointer-events-none">
                    {sample.badge}
                  </span>

                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between gap-1 pointer-events-none">
                    <span className="px-1.5 py-0.5 rounded bg-amber-950/85 text-[8px] sm:text-[9px] font-semibold text-amber-200 truncate">
                      Details Protected
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-white bg-[#0B2545]/90 px-1.5 py-0.5 rounded shrink-0">
                      <ZoomIn className="w-2.5 h-2.5 text-teal-300" />
                      <span>Tap to View</span>
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2 min-w-0">
                  <div className="space-y-1 min-w-0">
                    <h3
                      onClick={() => handleOpenSpecimen(sample)}
                      className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-teal-800 font-display leading-snug line-clamp-2 cursor-pointer break-words"
                    >
                      {sample.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-medium text-teal-800 line-clamp-1">
                      {sample.destinationOrUse}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenSpecimen(sample)}
                      className="text-[11px] sm:text-xs font-semibold text-[#0B2545] hover:text-teal-700 transition-colors inline-flex items-center gap-1 cursor-pointer select-none min-w-0 truncate"
                    >
                      <ZoomIn className="w-3 h-3 text-teal-700 shrink-0" />
                      <span className="truncate">Zoom 2x</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(sample.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center text-[#25D366] hover:bg-emerald-50 rounded-md transition-colors shrink-0"
                      title="Enquire on WhatsApp"
                      aria-label="Enquire on WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. TRUST FACTORS & FATIMA GLOBAL ATTESTATION AUTHORITY GUARANTEE
         ===================================================================== */}
      <section className="py-7 sm:py-11 bg-slate-50 border-b border-slate-200 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-1.5">
            <div className="text-[11px] font-bold tracking-wider text-[#008DA8] uppercase">
              Why Clients Across India &amp; Abroad Trust Us
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight">
              Why Choose Fatima Global Attestation for MEA Apostille
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your original certificates are irreplaceable. We combine direct
              New Delhi coordination in Connaught Place with strict document
              safety, transparent government fee disclosure, and verifiable QR
              tracking.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {APOSTILLE_TRUST_FACTORS.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-2 transition-colors hover:border-teal-300 min-w-0"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-display leading-snug break-words">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug break-words">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Fatima Global Attestation — Verified Customer Protection & E-E-A-T Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-5 sm:p-6 border border-teal-400/30 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/35 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>
                    Fatima Global Attestation • Customer Protection Guarantee
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-extrabold text-white font-display leading-snug">
                  100% Genuine MEA Apostille with Serial &amp; QR Verification —
                  Coordinated from Connaught Place, New Delhi
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                      <QrCode className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>Verifiable MEA Sticker</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-snug">
                      Every MEA Apostille carries a unique government serial
                      number &amp; QR code shared via scan before dispatch.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                      <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>New Delhi Central Desk</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-snug">
                      Barakhamba Road, Connaught Place, New Delhi 110001 — close
                      to MEA CPV Division &amp; RAC channels.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                      <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>Safe Original Handling</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-snug">
                      Zero lamination tampering, waterproof hard-board courier
                      sleeves &amp; live step-by-step status updates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2.5 bg-slate-950/55 p-4 rounded-xl border border-teal-400/25">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Already Submitted Your Document?</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Track your document verification &amp; MEA Apostille progress
                  online or verify your receipt with Fatima Global Attestation.
                </p>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 pt-1">
                  <a
                    href="/apostille-tracking"
                    onClick={(e) => handleLinkClick(e, "/apostille-tracking")}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0A192F] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Track Apostille Order Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/about-us"
                    onClick={(e) => handleLinkClick(e, "/about-us")}
                    className="w-full py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>About Fatima Global Attestation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7 & 8. CONTENT BLOCKS, DISCLAIMER, OFFICIAL LINKS & FAQs
         ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-6 sm:space-y-8">
        {/* Private Agency Disclaimer Box */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. Government fees and timelines apply. Our charges are separate for the coordination and logistics support provided." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
          {/* Left 7 Columns: Core Content Cards, Official Links, FAQs */}
          <div className="lg:col-span-7 min-w-0 space-y-6">
            {/* Content Block 1: What is an Apostille? */}
            <ContentCard title="What is an Apostille?">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                An Apostille is a stamp or sticker issued by the Ministry of
                External Affairs (MEA), Government of India, under the Hague
                Convention of 1961. It authenticates the origin of a public
                document for use in member countries. If your destination
                country is part of this convention, an Apostille is usually
                sufficient and replaces the need for embassy legalization.
              </p>
            </ContentCard>

            {/* Content Block 2: The General Process (3 Vertical Numbered Steps/Cards) */}
            <ContentCard title="The General Process">
              <div className="space-y-3.5 pt-1">
                {APOSTILLE_GENERAL_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-3.5 sm:gap-4 p-4 rounded-xl bg-[#F3F4F6] border border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-white text-sm font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1 min-w-0">
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
            </ContentCard>

            {/* Content Block 3: Required Documents & Apostille vs. Embassy Attestation (SEO Completeness) */}
            <ContentCard title="Required Documents & Apostille vs. Embassy Attestation">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                  <h3 className="text-sm font-bold text-[#0A192F] font-display">
                    Mandatory Documents Required for MEA Apostille:
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>
                        <strong>Original Document</strong> to be apostilled
                        (Degree, Birth, Marriage, PCC, POA, or Commercial
                        Certificate).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>
                        <strong>Clear Passport Copy</strong> (front and back bio
                        pages) of the document holder.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>
                        <strong>For Commercial Documents:</strong> Company
                        Covering Letter on letterhead &amp; Chamber of Commerce
                        endorsement.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] block">
                      Hague Member Countries (120+)
                    </span>
                    <h4 className="font-bold text-[#0A192F]">
                      MEA Apostille Sticker Only
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Accepted directly in UK, USA, Germany, Italy, France,
                      Australia, Canada, Oman, Saudi Arabia &amp; Israel. No
                      foreign embassy stamp needed.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                      Non-Hague Countries
                    </span>
                    <h4 className="font-bold text-[#0A192F]">
                      MEA + Embassy Attestation
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Destinations like UAE, Qatar &amp; Kuwait require state
                      authentication, MEA normal attestation, and Embassy + MOFA
                      legalization.
                    </p>
                  </div>
                </div>
              </div>
            </ContentCard>

            {/* Content Block 4: Pan-India Doorstep Pickup & NRI Apostille Support (Local & National SEO + Trust) */}
            <ContentCard title="Pan-India Doorstep Pickup & NRI Document Apostille Support">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Whether your certificate was issued in Delhi, Maharashtra,
                  Karnataka, Telangana, Tamil Nadu, Kerala, Gujarat, Punjab,
                  Uttar Pradesh, West Bengal, or any other state in India,{" "}
                  <strong className="text-[#0A192F]">
                    Fatima Global Attestation
                  </strong>{" "}
                  coordinates the complete authentication chain from our central
                  office in{" "}
                  <strong className="text-[#0A192F]">
                    Connaught Place, New Delhi
                  </strong>
                  . You do not need to travel to New Delhi in person.
                </p>

                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] font-display">
                    Doorstep Courier Collection &amp; State-Wise Document
                    Coverage:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {PAN_INDIA_SERVICE_CITIES.map((city) => (
                      <span
                        key={city}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-semibold text-[#0A192F]"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#0A192F]">
                    Dedicated Support for NRIs Living Abroad:
                  </strong>{" "}
                  Clients residing in the UK, USA, Germany, Italy, France,
                  Netherlands, Australia, Canada, Saudi Arabia, Oman, or UAE can
                  dispatch their Indian originals via DHL/FedEx or through a
                  family member in India. We share high-resolution scan proofs of
                  the completed{" "}
                  <strong className="text-[#0A192F]">
                    MEA Apostille sticker
                  </strong>{" "}
                  before shipping the documents directly to your overseas
                  address.
                </div>
              </div>
            </ContentCard>

            {/* Official Links Section (MEA & HCCH) */}
            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official Government &amp; Treaty Resources
              </h2>

              <ul className="space-y-2.5">
                {OFFICIAL_RESOURCES.map((link, idx) => (
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

              <p className="text-xs text-slate-600 italic">
                We recommend checking official government portals for the most
                current rules and fees.
              </p>
            </section>

            {/* Document Safety & Custody Trust Protocol */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
              <DocumentSafetyTrustSection onNavigate={onNavigate} isEmbedded={true} />
            </div>

            {/* FAQs Accordion (5 Comprehensive FAQs matching JSON-LD FAQPage Schema) */}
            <FAQAccordion
              title="Frequently Asked Questions — MEA Apostille"
              subtitle="Key facts on the official ₹50 MEA fee, submission via RACs / e-Sanad, required documents, and processing timelines."
              items={APOSTILLE_PAGE_FAQS}
            />

            {/* Internal SEO Links: Popular Hague Destination Countries & Related Guides */}
            <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Popular Hague Apostille Destination Countries
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
                  {POPULAR_HAGUE_DESTINATIONS.map((country) => (
                    <a
                      key={country.slug}
                      href={country.slug}
                      onClick={(e) => handleLinkClick(e, country.slug)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-[#0F766E] text-xs font-bold text-[#0A192F] hover:text-[#0F766E] transition-colors"
                    >
                      {country.name} Apostille
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] uppercase tracking-wider">
                  Related Apostille &amp; Portal Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_APOSTILLE_GUIDES.map((item) => (
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

          {/* Right 5 Columns: Sticky Enquiry / Quote Form */}
          <aside
            id="apostille-enquire"
            className="lg:col-span-5 min-w-0 lg:sticky lg:top-20 scroll-mt-24 space-y-6"
          >
            <QuoteForm
              initialServiceSlug="/sdm-apostille-services"
              title="Request MEA Apostille Assessment"
              subtitle="Select your document category and Hague destination country. Our New Delhi desk will confirm the exact timeline and fee breakdown."
            />
          </aside>
        </div>
      </main>

      {/* =====================================================================
          SPECIMEN ZOOM 2X LIGHTBOX MODAL
         ===================================================================== */}
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
                      Verification Scope &amp; Route
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {selectedSpecimen.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                      Layout &amp; Privacy Features Shown:
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
                    <span>Inquire About This Process on WhatsApp</span>
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
