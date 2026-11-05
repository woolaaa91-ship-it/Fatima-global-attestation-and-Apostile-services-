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
  GraduationCap,
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

interface DegreeCertificateApostillePageProps {
  onNavigate?: (path: string) => void;
}

const UNIVERSITY_ROUTES = [
  {
    badge: "Route 1 • Fastest Option",
    title: "The Delhi SDM Route",
    description:
      "Fastest for many students. The degree is notarized, verified by an SDM in Delhi, and then sent to the MEA.",
  },
  {
    badge: "Route 2 • State Department",
    title: "The State HRD Route",
    description:
      "If your university or foreign employer specifically asks for state verification. The Education/HRD department of the state where your university sits must verify the degree first.",
  },
  {
    badge: "Route 3 • Digital Repository",
    title: "The e-Sanad Route",
    description:
      "Only for universities/boards integrated with the government's online portal (e.g., CBSE, some central universities). The document must be in a digital repository.",
  },
];

const OFFICIAL_MEA_FEES_AND_TIMELINES = [
  {
    title: "MEA Government Fee",
    description: "₹50 per document (Apostille sticker).",
    icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Outsourced Agency Fee",
    description:
      "The MEA does not accept documents directly. Outsourced agencies charge a small service fee (approx. ₹18 for educational documents).",
    icon: <Building2 className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Processing Time",
    description:
      "Delhi SDM route usually takes 2-3 working days after submission. State HRD routes can take 6-10 working days depending on the university's response time.",
    icon: <Clock className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Mark Sheets are Separate",
    description:
      "Each mark sheet and transcript is treated as a separate document. Each requires its own ₹50 MEA fee.",
    icon: <FileStack className="w-5 h-5 text-[#0F766E]" />,
  },
];

const REQUIRED_DOCUMENTS_CHECKLIST = [
  "Original Degree Certificate (or Provisional).",
  "Passport Copy (mandatory for e-Sanad and MEA submission).",
  "All Mark Sheets (if required by the receiving authority).",
  "Proof of University/State (for HRD routing).",
];

interface DegreeDocumentOption {
  label: string;
  shortName: string;
  recommendedChain: string;
  timelineNote: string;
}

const DEGREE_DOCUMENT_OPTIONS: DegreeDocumentOption[] = [
  {
    label: "Bachelor's Degree (B.Tech / B.E. / B.Sc / B.Com / B.A.)",
    shortName: "Bachelor's Degree Certificate",
    recommendedChain: "Notary + Delhi SDM or State HRD → MEA Apostille",
    timelineNote: "2–3 Working Days (SDM) | 6–10 Working Days (State HRD)",
  },
  {
    label: "Master's Degree (MBA / M.Tech / M.Sc / MCA / M.A.)",
    shortName: "Master's Degree Certificate",
    recommendedChain: "Notary + Delhi SDM or State HRD → MEA Apostille",
    timelineNote: "2–3 Working Days (SDM) | 6–10 Working Days (State HRD)",
  },
  {
    label: "MBBS / Nursing / Pharmacy / Medical Degree",
    shortName: "Medical / Nursing Degree",
    recommendedChain: "State HRD / Delhi SDM → MEA Apostille",
    timelineNote: "2–3 Working Days (SDM) | 6–12 Working Days (State HRD)",
  },
  {
    label: "Consolidated Marksheet / Official University Transcript",
    shortName: "Consolidated Marksheet / Transcript",
    recommendedChain:
      "Notary + Delhi SDM or State HRD → Separate ₹50 MEA Apostille Sticker",
    timelineNote: "2–3 Working Days (SDM) | Treated as separate document",
  },
  {
    label: "Engineering / Polytechnic Diploma Certificate",
    shortName: "Diploma Certificate",
    recommendedChain: "State Technical Board / Delhi SDM → MEA Apostille",
    timelineNote: "2–3 Working Days (SDM) | 6–10 Working Days (State Board)",
  },
  {
    label: "Provisional Degree / Migration / MOI Certificate",
    shortName: "Provisional Degree / MOI",
    recommendedChain: "Notary + Delhi SDM → MEA Apostille",
    timelineNote: "2–3 Working Days (Fastest for recent graduates)",
  },
  {
    label: "PhD / Doctorate / Post-Graduate Diploma",
    shortName: "PhD / Doctorate Degree",
    recommendedChain: "Notary + Delhi SDM or State HRD → MEA Apostille",
    timelineNote: "2–3 Working Days (SDM) | 6–10 Working Days (State HRD)",
  },
];

const UNIVERSITY_STATE_OPTIONS = [
  "Delhi NCR Universities (DU, JNU, IPU, Jamia, IIT Delhi, IGNOU)",
  "Maharashtra Universities (Mumbai, Pune SPPU, Nagpur, SNDT)",
  "Karnataka Universities (VTU, Bangalore Univ, Manipal, Mysore)",
  "Telangana & AP Universities (JNTU, Osmania, Andhra Univ)",
  "Tamil Nadu Universities (Anna Univ, Madras Univ, SRM, VIT)",
  "Kerala Universities (KTU, Kerala Univ, Calicut, MG Univ)",
  "Uttar Pradesh & Bihar (AKTU, BHU, AMU, Lucknow, Patna Univ)",
  "Punjab, Haryana & Chandigarh (PU, PTU, GNDU, Kurukshetra)",
  "Gujarat & Rajasthan (GTU, Gujarat Univ, Rajasthan Univ)",
  "West Bengal, MP & Other State / Central Universities",
];

const DEGREE_HAGUE_DESTINATIONS = [
  "Germany (Student Visa / EU Blue Card / APS)",
  "Italy (Study Visa / DOV / CIMEA)",
  "United Kingdom (UK Study / Skilled Worker)",
  "United States (USA Higher Ed / H-1B / WES)",
  "France (Campus France / Work Permit)",
  "Australia (Skilled Migration / Student Visa)",
  "Netherlands (Highly Skilled Migrant / Study)",
  "Poland / Spain / Other EU Nations",
  "Saudi Arabia (Hague Member Employment)",
  "Oman (Hague Member Employment)",
];

interface InteractiveEduDocCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  routeFinderDocLabel: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_EDU_DOCUMENT_CARDS: InteractiveEduDocCard[] = [
  {
    id: "edu-bachelor-master",
    title: "Bachelor's & Master's Degree",
    subtitle: "B.Tech, B.E., MBA, M.Tech, B.Sc, B.Com, B.A. & PhD.",
    routeBadge: "State HRD / Delhi SDM → MEA Apostille",
    routeFinderDocLabel:
      "Bachelor's Degree (B.Tech / B.E. / B.Sc / B.Com / B.A.)",
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
        <circle cx="42" cy="44" r="4" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: "edu-marksheets",
    title: "Consolidated & All Marksheets",
    subtitle: "Semester mark sheets, transcripts & grade cards.",
    routeBadge: "Separate ₹50 MEA Sticker per Marksheet",
    routeFinderDocLabel:
      "Consolidated Marksheet / Official University Transcript",
    bgTintClass: "bg-[#E6F6EC]",
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
          y1="24"
          x2="38"
          y2="24"
          stroke="#0F766E"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="31"
          x2="36"
          y2="31"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="38"
          x2="32"
          y2="38"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="37" cy="45" r="4.5" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "edu-medical-nursing",
    title: "MBBS, Nursing & Pharmacy",
    subtitle: "Medical degrees, B.Sc/GNM Nursing & Registration.",
    routeBadge: "HRD / SDM → MEA Apostille",
    routeFinderDocLabel: "MBBS / Nursing / Pharmacy / Medical Degree",
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
    id: "edu-provisional",
    title: "Provisional Degree & MOI",
    subtitle: "Provisional certificate, Migration & Medium of Instruction.",
    routeBadge: "Notary + Delhi SDM → MEA Apostille",
    routeFinderDocLabel: "Provisional Degree / Migration / MOI Certificate",
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
        <line
          x1="20"
          y1="22"
          x2="42"
          y2="22"
          stroke="#94A3B8"
          strokeWidth="2"
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
        <path
          d="M42 32L52 36V44C52 50 47.5 54.5 42 57C36.5 54.5 32 50 32 44V36L42 32Z"
          fill="#0F766E"
        />
        <path
          d="M38 44L41 47L46 41"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "edu-diploma",
    title: "Engineering & Technical Diploma",
    subtitle: "State Polytechnic, BTE, ITI & Post-Graduate Diplomas.",
    routeBadge: "State Board / SDM → MEA Apostille",
    routeFinderDocLabel: "Engineering / Polytechnic Diploma Certificate",
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
          y="12"
          width="36"
          height="40"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <rect x="20" y="20" width="24" height="8" rx="2" fill="#0B2545" />
        <line
          x1="20"
          y1="35"
          x2="42"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="42"
          x2="34"
          y2="42"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "edu-school-cbse",
    title: "10th / 12th Board Certificates",
    subtitle: "CBSE, ICSE, NIOS & State Board Secondary Certificates.",
    routeBadge: "e-Sanad / SDM / HRD → MEA Apostille",
    routeFinderDocLabel:
      "Consolidated Marksheet / Official University Transcript",
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
        <circle cx="32" cy="24" r="6" fill="#0F766E" />
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
          x1="24"
          y1="43"
          x2="40"
          y2="43"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface DegreeSpecimenItem {
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

const DEGREE_APOSTILLE_SPECIMENS: DegreeSpecimenItem[] = [
  {
    id: "degree-mea-apostille-specimen",
    title: "MEA Apostille Sticker on University Degree Certificate",
    badge: "Official Degree Apostille Specimen",
    image: "/assets/aistudio/apostille_specimen_clean.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Student Visas & Work Permits in Germany, Italy, UK, USA, France & Australia",
    description:
      "Official Government of India Ministry of External Affairs (MEA) Hague Apostille sticker affixed on the reverse of an Indian university degree certificate, alongside preliminary state/SDM verification endorsement. Personal names, roll numbers, QR codes, and signatures are permanently masked.",
    elementsVerified: [
      "Ministry of External Affairs (MEA) Computer-Generated Apostille Sticker",
      "Unique Serial Number & Hague Convention of 1961 Standard Header",
      "Preliminary State HRD / SDM Verification Stamp & Official Seal",
      "Student Name, University Roll Number, QR Code & Signatures Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the Degree Certificate MEA Apostille Specimen and need assistance with my educational documents.",
  },
  {
    id: "degree-sdm-apostille-specimen",
    title: "Delhi SDM Verification + MEA Hague Apostille on Educational Certificate",
    badge: "Fast-Track SDM + MEA Route",
    image: "/samples/sample_sdm_apostille_qr.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "2–3 Working Days Route for Foreign Universities & Employers Accepting SDM",
    description:
      "Educational certificate authenticated via the fast-track Delhi SDM route showing the Notary Public stamp, Sub-Divisional Magistrate (SDM) Delhi seal, and final MEA Hague Apostille sticker. All personal identifiers and serial numbers are permanently masked.",
    elementsVerified: [
      "Notary Public Official Authentication Endorsement",
      "Sub-Divisional Magistrate (SDM) New Delhi Official Emblem Stamp",
      "MEA Hague Convention Apostille Sticker & CPV Division Seal",
      "All Personal Details, Serial Numbers & Signatures Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I want to check if the 2-3 day Delhi SDM + MEA Apostille route is accepted for my degree certificate.",
  },
];

const DEGREE_4_STEP_WORKFLOW = [
  {
    step: 1,
    title: "University & Scan Pre-Check",
    description:
      "Share your degree scan on WhatsApp. We verify university recognition (UGC/AICTE) and confirm whether Delhi SDM, State HRD, or e-Sanad applies.",
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 2,
    title: "State HRD or Delhi SDM Verification",
    description:
      "Your original degree is authenticated either by the respective State HRD department or via the fast-track Delhi SDM route.",
    icon: <FileCheck2 className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 3,
    title: "Official MEA Apostille Sticker",
    description:
      "Submitted to the Ministry of External Affairs (MEA) in New Delhi through authorized RAC channels for the ₹50 government Apostille sticker.",
    icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 4,
    title: "Scan Proof & Tracked Delivery",
    description:
      "We share a high-resolution scan of the apostilled degree and dispatch your original certificate in a hard-board sleeve via tracked courier.",
    icon: <Truck className="w-5 h-5 text-teal-700" />,
  },
];

const DEGREE_TRUST_FACTORS = [
  {
    icon: <GraduationCap className="w-5 h-5 text-teal-700" />,
    title: "Zero Lamination Damage",
    desc: "If your degree certificate is laminated, we safely remove lamination corner-by-corner without tearing university security fibres before stamping.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Honest HRD vs SDM Guidance",
    desc: "We never push unnecessary routes. We advise clearly when 2-3 day Delhi SDM works vs when universities in Italy/Germany strictly require State HRD.",
  },
  {
    icon: <Truck className="w-5 h-5 text-teal-700" />,
    title: "PAN-India & NRI Courier",
    desc: "Doorstep degree pickup across all Indian states and direct DHL/FedEx dispatch for Indian graduates living in the UK, USA, Europe, or GCC.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Clear Per-Document Breakdown",
    desc: "Transparent breakdown of the ₹50 MEA government fee, ~₹18 agency fee, and our coordination fee for degrees and individual mark sheets.",
  },
];

const DEGREE_OFFICIAL_PORTALS = [
  {
    title: "Ministry of External Affairs (MEA) — Official Apostille Guidelines",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title: "e-Sanad Portal (NIC / MEA) — Online Digital Document Verification",
    href: "https://esanad.nic.in/",
  },
  {
    title: "HCCH — Official Hague Apostille Member Countries Status Table",
    href: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
  },
];

const POPULAR_STUDY_ABROAD_COUNTRIES = [
  { name: "Germany (APS / Study)", slug: "/countries/germany" },
  { name: "Italy (DOV / CIMEA)", slug: "/countries/italy" },
  { name: "United Kingdom (UK)", slug: "/countries/uk" },
  { name: "United States (USA)", slug: "/countries/usa" },
  { name: "France", slug: "/countries/france" },
  { name: "Australia", slug: "/countries/australia" },
  { name: "Saudi Arabia", slug: "/countries/saudi-arabia" },
  { name: "Oman", slug: "/countries/oman" },
];

const RELATED_EDUCATIONAL_GUIDES = [
  {
    title: "Apostille Services in India (All Documents)",
    slug: "/services/apostille",
    tag: "Core MEA Service",
  },
  {
    title: "e-Sanad Guide: Application & University Eligibility",
    slug: "/guides/e-sanad",
    tag: "Digital Portal Guide",
  },
  {
    title: "UAE MOFA Attestation for Indian Degrees",
    slug: "/countries/uae-mofa-attestation",
    tag: "Gulf Non-Hague Route",
  },
  {
    title: "Certified Document Translation (German, Italian, French)",
    slug: "/services/document-translation",
    tag: "Embassy & University Translation",
  },
];

export const DEGREE_APOSTILLE_FAQS: FAQItem[] = [
  {
    question: "Can I use an MEA Apostille for a UAE work visa?",
    answer:
      "No. The UAE is not a member of the Hague Apostille Convention. An MEA Apostille is not accepted. You will need the full Embassy attestation route (State HRD → MEA → UAE Embassy → UAE MOFA).",
  },
  {
    question: "Is State HRD verification mandatory for a degree apostille?",
    answer:
      "It depends on the receiving authority. For many foreign universities and employers, the Delhi SDM route is accepted. However, if the destination specifically demands state verification, you must go through the State HRD department.",
  },
  {
    question: "Can I apostille a degree certificate through e-Sanad?",
    answer:
      "Only if your university or board has integrated with the e-Sanad portal and your document is available in their digital repository. Most state universities are still not fully integrated.",
  },
  {
    question: "How long does the apostille process take?",
    answer:
      "The Delhi SDM route is the fastest, usually taking 2-3 working days after submission. If your document requires State HRD verification first, it can take 6-10 working days depending on the university.",
  },
  {
    question:
      "Do I need a separate MEA Apostille sticker for my mark sheets and transcripts?",
    answer:
      "Yes. Under official MEA guidelines, each physical certificate (Degree Certificate, Consolidated Marksheet, Semester Marksheet, or Official Transcript) is treated as a separate public document and requires its own ₹50 MEA Apostille sticker.",
  },
  {
    question:
      "Can a Provisional Degree Certificate or Private University degree be apostilled?",
    answer:
      "Yes. A Provisional Degree Certificate issued by a UGC/AICTE-recognized Indian university can be apostilled (usually within 2–3 working days via the Delhi SDM route) if your final convocation degree has not yet been issued. Degrees from UGC-approved private and deemed universities are also eligible for MEA Apostille.",
  },
  {
    question:
      "Can NRIs or students already abroad get their Indian degree apostilled without visiting India?",
    answer:
      "Yes. You do not need to visit government offices in person. You can courier your original degree from abroad (or have a family member in India hand it over via doorstep pickup). Fatima Global Attestation coordinates the SDM/HRD and MEA Apostille in New Delhi and ships the apostilled degree back via tracked DHL/FedEx courier.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const DEGREE_APOSTILLE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DEGREE_APOSTILLE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const DegreeCertificateApostillePage: React.FC<
  DegreeCertificateApostillePageProps
> = ({ onNavigate }) => {
  // Interactive Degree Route Finder State
  const [selectedDocLabel, setSelectedDocLabel] = useState<string>(
    DEGREE_DOCUMENT_OPTIONS[0].label
  );
  const [selectedUnivState, setSelectedUnivState] = useState<string>(
    UNIVERSITY_STATE_OPTIONS[0]
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    DEGREE_HAGUE_DESTINATIONS[0]
  );
  const [checkedRoute, setCheckedRoute] = useState<{
    docLabel: string;
    univState: string;
    country: string;
  }>({
    docLabel: DEGREE_DOCUMENT_OPTIONS[0].label,
    univState: UNIVERSITY_STATE_OPTIONS[0],
    country: DEGREE_HAGUE_DESTINATIONS[0],
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

  // Interactive Multi-Document Educational Selection State (with inline "Ask now" bar below active card)
  const [selectedEduIds, setSelectedEduIds] = useState<string[]>([
    "edu-bachelor-master",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] = useState<string>(
    "edu-bachelor-master"
  );

  // Specimen Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<DegreeSpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyRouteSEO("/services/degree-certificate-apostille");
    document.title =
      "Degree Certificate Apostille in India | State HRD & MEA Process";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Need to apostille your degree certificate for a Hague country? Learn the State HRD vs SDM routes, MEA fees (₹50), and e-Sanad eligibility for Indian universities."
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

  const handleCheckDegreeRoute = () => {
    setIsCheckingRoute(true);
    setTimeout(() => {
      setCheckedRoute({
        docLabel: selectedDocLabel,
        univState: selectedUnivState,
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

  const handleToggleEduCard = (id: string) => {
    setSelectedEduIds((prev) => {
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
      univState: selectedUnivState,
      country: selectedCountry,
    });
    setRouteFlash(true);
    scrollToSectionById("degree-route-finder", "smooth");
    setTimeout(() => {
      setRouteFlash(false);
    }, 1000);
  };

  const handleOpenSpecimen = (specimen: DegreeSpecimenItem) => {
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
    "degree-apostille-specimen-popup"
  );

  const hasPendingRouteChange =
    selectedDocLabel !== checkedRoute.docLabel ||
    selectedUnivState !== checkedRoute.univState ||
    selectedCountry !== checkedRoute.country;

  const checkedDocObj =
    DEGREE_DOCUMENT_OPTIONS.find((d) => d.label === checkedRoute.docLabel) ||
    DEGREE_DOCUMENT_OPTIONS[0];

  const routeFinderWhatsAppMessage = `Hello ${BUSINESS_CONFIG.shortName}, I checked the Degree Apostille Route for:\n• Document: ${checkedDocObj.shortName}\n• University State: ${checkedRoute.univState}\n• Destination: ${checkedRoute.country}\n\nPlease confirm whether Delhi SDM, State HRD, or e-Sanad is best and share the timeline & fees.`;

  const selectedEduTitles = INTERACTIVE_EDU_DOCUMENT_CARDS.filter((c) =>
    selectedEduIds.includes(c.id)
  ).map((c) => c.title);

  const multiEduWhatsAppMessage =
    selectedEduTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, I need Degree / Educational Apostille assistance for:\n• ${selectedEduTitles.join("\n• ")}\n\nPlease share the State HRD vs Delhi SDM route, timeline, and fee breakdown.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need assistance with Degree Certificate Apostille in India. Please guide me on the process and fees.`;

  const renderEduSelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedEduIds.length > 0) {
              setSelectedEduIds([]);
            } else {
              setSelectedEduIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedEduIds.length > 0
              ? "Clear selection"
              : "Select educational document"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedEduIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedEduIds.length === 0
              ? "Tap the educational documents you have"
              : selectedEduIds.length === 1
              ? "1 educational document selected"
              : `${selectedEduIds.length} educational documents selected`}
          </span>
          {selectedEduTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedEduTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiEduWhatsAppMessage)}
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
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-20 sm:pb-14">
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
              Degree Certificate Apostille
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section (Unchanged) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
            Educational Document Authentication • State HRD, MEA &amp; e-Sanad
          </span>

          {/* H1 (28-32px mobile-first) */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            Degree Certificate Apostille &amp; Educational Document Authentication
          </h1>

          {/* Subtitle Paragraph (16px Body) */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl">
            Guidance and assistance for authenticating your university degrees, diplomas, and mark sheets for overseas employment, higher education, or visa purposes. We help you navigate the State HRD, MEA, and e-Sanad processes.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppUrl("Hi, I need help with Degree Certificate Apostille")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat with us for Educational Documents</span>
            </a>

            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Call {BUSINESS_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container (Below the Hero Section) */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-6 sm:space-y-8">
        {/* 1. CRITICAL WARNING BOX (Placed right below the Hero, before any other content) */}
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
                Important:
              </strong>{" "}
              An MEA Apostille is only valid for Hague Convention countries
              (e.g., UK, USA, Germany, Australia). It is NOT accepted for Gulf
              countries like UAE, Saudi Arabia, Qatar, or Kuwait. For Gulf
              countries, full Embassy and MOFA attestation is required.
            </p>
          </div>
        </div>

        {/* 2. Content Block 1: The Route Depends on Your University (Use a Card) */}
        <ContentCard title="The Route Depends on Your University">
          <p className="text-base text-slate-700 leading-relaxed">
            There is no single universal process for every degree. The exact
            steps depend on the state where your university is located and the
            receiving authority&apos;s requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {UNIVERSITY_ROUTES.map((route, idx) => (
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

        {/* NEW EDUCATIONAL ADDITION 1: INTERACTIVE DEGREE ROUTE & UNIVERSITY STATE FINDER */}
        <section
          id="degree-route-finder"
          ref={finderSectionRef}
          className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-6 shadow-md border border-teal-500/30 space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                Interactive University &amp; Degree Route Check
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Check State HRD vs. Delhi SDM Route for Your Degree
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full self-start sm:self-center">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Indian Universities • Hague Convention</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Dropdown 1: Educational Certificate Type */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="degree-rf-doc"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 1 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  1. Educational Document
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
                  id="degree-rf-doc"
                  value={selectedDocLabel}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedDocLabel(e.target.value);
                    guideFinderStep(2);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {DEGREE_DOCUMENT_OPTIONS.map((doc) => (
                    <option key={doc.label} value={doc.label}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2: University State / Board */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="degree-rf-state"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 2 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  2. University State / Board
                </label>
                {activeFinderShineStep === 2 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select state</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 2 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="degree-rf-state"
                  value={selectedUnivState}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedUnivState(e.target.value);
                    guideFinderStep(3);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {UNIVERSITY_STATE_OPTIONS.map((stateItem) => (
                    <option key={stateItem} value={stateItem}>
                      {stateItem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3: Destination Country */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="degree-rf-country"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 3 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  3. Destination Country
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
                  id="degree-rf-country"
                  value={selectedCountry}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    guideFinderStep(4);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {DEGREE_HAGUE_DESTINATIONS.map((country) => (
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
                handleCheckDegreeRoute();
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
                  <span>Checking University Route...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0A192F] shrink-0" />
                  <span>
                    {hasPendingRouteChange
                      ? "Check Updated Degree Route"
                      : "Check Degree Route"}
                  </span>
                </>
              )}
            </button>
          </div>

          {hasPendingRouteChange && (
            <div className="rounded-lg bg-amber-400/15 border border-amber-300/40 px-3.5 py-2 text-xs text-amber-200">
              Selection updated. Tap{" "}
              <strong className="text-amber-300">
                &ldquo;Check Updated Degree Route&rdquo;
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
                  University Region:{" "}
                  <strong className="text-white">
                    {checkedRoute.univState}
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

        {/* NEW EDUCATIONAL ADDITION 2: EDUCATIONAL DOCUMENT-WISE SELECTOR WITH INLINE "ASK NOW" BAR */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Educational Documents We Authenticate
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Academic Certificates You Need to Apostille
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick your degree, consolidated marksheet, diploma, or provisional
              certificate below — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right below the certificate you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {INTERACTIVE_EDU_DOCUMENT_CARDS.map((card) => {
              const isSelected = selectedEduIds.includes(card.id);
              const isAnchorForBar = activeAnchorCardId === card.id;
              return (
                <div key={card.id} className="flex flex-col">
                  <div
                    onClick={() => handleToggleEduCard(card.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleEduCard(card.id);
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

                  {isAnchorForBar && renderEduSelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Content Block 2: Official MEA Fees & Timelines (2x2 Grid from Homepage) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Official MEA Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official MEA Fees &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_MEA_FEES_AND_TIMELINES.map((item, idx) => (
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

        {/* NEW EDUCATIONAL ADDITION 3: DELHI SDM VS STATE HRD VS E-SANAD COMPARISON TABLE */}
        <ContentCard title="Delhi SDM vs. State HRD vs. e-Sanad — Which Route Should You Choose?">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Before submitting your original university degree, compare the 3
            official authentication channels recognized for MEA Apostille in
            India:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="py-3 px-3.5 font-extrabold">Feature</th>
                  <th className="py-3 px-3.5 font-extrabold text-teal-300">
                    Delhi SDM + MEA Route
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-amber-300">
                    State HRD + MEA Route
                  </th>
                  <th className="py-3 px-3.5 font-extrabold">
                    e-Sanad Digital Route
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Estimated Timeline
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-emerald-800">
                    2–3 Working Days
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    6–10+ Working Days (depends on university verification)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    7–15 Working Days (online repository response)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Eligible Universities
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    All UGC / AICTE / AIU recognized Indian universities &amp;
                    colleges
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    State &amp; Central universities within that specific Indian
                    state
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Only boards/universities integrated with NAD / DigiLocker /
                    e-Sanad
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Physical Original Needed?
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Yes — physical original degree receives SDM seal + MEA
                    sticker
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Yes — physical original degree receives HRD stamp + MEA
                    sticker
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Digital PDF certificate verified online via e-Sanad portal
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Best Suited For
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Most European work visas, USA, UK, Australia, Spain, Poland
                    &amp; urgent submissions
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    When foreign university (e.g., some Italian DOV / German
                    admissions) explicitly demands State HRD
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    CBSE certificates &amp; recent digital degrees already in
                    government repository
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 4. Content Block 3: Required Documents Checklist (Clean list with checkmarks) */}
        <ContentCard title="Required Documents Checklist">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {REQUIRED_DOCUMENTS_CHECKLIST.map((docItem, idx) => (
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

        {/* NEW EDUCATIONAL ADDITION 4: 4-STEP DEGREE APOSTILLE WORKFLOW */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Step-by-Step Educational Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              How Our 4-Step Degree Certificate Apostille Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {DEGREE_4_STEP_WORKFLOW.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200/90 flex flex-col justify-between gap-2.5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg bg-white border border-teal-100 flex items-center justify-center shadow-2xs shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100 shrink-0">
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

        {/* NEW EDUCATIONAL ADDITION 5: OFFICIAL DEGREE APOSTILLE SPECIMEN PROOF GALLERY */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Tap to Inspect Reference Proofs (2x Zoom)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official MEA Apostille Specimen on Educational Certificates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect how the Government of India MEA Hague Apostille sticker
              and SDM/HRD authentication seals are placed on the reverse side of
              an Indian degree certificate. Student details are masked for
              privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEGREE_APOSTILLE_SPECIMENS.map((sample) => (
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
                      Student Details Masked
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
                      <span>Inspect Stamp &amp; Sticker</span>
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

        {/* NEW EDUCATIONAL ADDITION 6: WHY STUDENTS & UNIVERSITIES TRUST FATIMA GLOBAL ATTESTATION */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Safe Handling of Original University Certificates
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Why Graduates &amp; Professionals Choose Fatima Global Attestation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {DEGREE_TRUST_FACTORS.map((item, idx) => (
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
                  <span>Verifiable MEA Serial &amp; QR</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Every apostilled degree carries an official MEA serial number
                  and QR code shared via scan before dispatch.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Connaught Place, New Delhi</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Direct submission coordination from Barakhamba Road, New Delhi
                  110001 — close to MEA CPV Division &amp; RACs.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>NRI &amp; Study Abroad Support</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Students already in Germany, Italy, UK, USA, or Canada can send
                  degrees via courier without visiting India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Disclaimer Box (Match the style from homepage) */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. Government fees (₹50) and timelines apply. Our charges are separate for coordination and logistics." />

        {/* 6. FAQs Section (Use the Accordion component) */}
        <FAQAccordion
          title="Frequently Asked Questions — Degree Certificate Apostille"
          items={DEGREE_APOSTILLE_FAQS}
        />

        {/* NEW EDUCATIONAL ADDITION 7: OFFICIAL PORTALS, INTERNAL LINKS & QUOTE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Official Government & University Portals */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official MEA &amp; e-Sanad Educational Verification Portals
              </h2>
              <ul className="space-y-2.5">
                {DEGREE_OFFICIAL_PORTALS.map((link, idx) => (
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

            {/* Popular Study & Work Abroad Hague Destinations + Related Guides */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Degree Apostille by Study &amp; Work Destination Country
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
                  {POPULAR_STUDY_ABROAD_COUNTRIES.map((country) => (
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
                  Related Educational &amp; Attestation Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_EDUCATIONAL_GUIDES.map((item) => (
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
              initialServiceSlug="/educational-document-attestation"
              title="Request Degree Apostille Quote"
              subtitle="Share your university state and destination country. Our New Delhi desk will confirm whether Delhi SDM, State HRD, or e-Sanad applies."
            />
          </div>
        </div>

        {/* PAN INDIA STATE HRD DIRECTORY (Internal SEO Links for "HRD Service in Lucknow", etc.) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              PAN India State HRD &amp; University Verification Desk
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-display tracking-tight">
              State HRD Attestation Services by State &amp; Capital City
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Searching for <strong>HRD service in Lucknow</strong>, <strong>Bihar HRD in Patna</strong>, <strong>Maharashtra Mantralaya HRD in Mumbai</strong>, <strong>Kerala NORKA HRD</strong>, or <strong>Telangana GAD in Hyderabad</strong>? Select your state or capital city below for dedicated State Higher Education Department (HRD) and 2–3 day Delhi SDM routing guidance:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              {
                label: "HRD Service in Lucknow (UP HRD)",
                sub: "AKTU, Lucknow Univ, BHU, AMU, CCSU",
                slug: "/locations/apostille-agent-lucknow",
              },
              {
                label: "Uttar Pradesh State HRD Desk",
                sub: "Vidhan Bhawan Secretariat & SDM Route",
                slug: "/locations/apostille-agent-uttar-pradesh",
              },
              {
                label: "HRD Service in Patna (Bihar HRD)",
                sub: "Vikash Bhawan • Patna, Magadh, LNMU",
                slug: "/locations/apostille-agent-patna",
              },
              {
                label: "HRD Service in Mumbai (Mantralaya)",
                sub: "Mumbai Univ, SPPU Pune, Nagpur Univ",
                slug: "/locations/apostille-agent-mumbai",
              },
              {
                label: "Kerala NORKA-Roots HRD Attestation",
                sub: "Kochi, Trivandrum, Kozhikode • KTU, MG Univ",
                slug: "/locations/apostille-agent-kerala",
              },
              {
                label: "HRD Service in Hyderabad (Telangana GAD)",
                sub: "Osmania Univ, JNTUH, Kakatiya Univ",
                slug: "/locations/apostille-agent-hyderabad",
              },
              {
                label: "HRD Service in Chennai (Tamil Nadu)",
                sub: "Fort St. George Secretariat • Anna Univ, Madras Univ",
                slug: "/locations/apostille-agent-chennai",
              },
              {
                label: "HRD Service in Bangalore (Karnataka)",
                sub: "VTU Belagavi, Bangalore Univ, RGUHS",
                slug: "/locations/apostille-agent-bangalore",
              },
              {
                label: "HRD Service in Chandigarh & Punjab",
                sub: "Panjab Univ, PTU, GNDU Amritsar, LPU",
                slug: "/locations/apostille-agent-chandigarh",
              },
              {
                label: "HRD Service in Kolkata (Bikash Bhavan)",
                sub: "Calcutta Univ, Jadavpur Univ, MAKAUT",
                slug: "/locations/apostille-agent-kolkata",
              },
              {
                label: "HRD Service in Jaipur (Rajasthan HRD)",
                sub: "Rajasthan Univ, RTU Kota, RUHS",
                slug: "/locations/apostille-agent-jaipur",
              },
              {
                label: "HRD Service in Ahmedabad & Gujarat",
                sub: "Gandhinagar HRD • GTU, Gujarat Univ",
                slug: "/locations/apostille-agent-ahmedabad",
              },
              {
                label: "HRD Service in Bhopal (MP HRD)",
                sub: "Vallabh Bhawan • RGPV, DAVV Indore",
                slug: "/locations/apostille-agent-bhopal",
              },
              {
                label: "HRD Service in Srinagar & Kashmir",
                sub: "J&K Civil Secretariat • Kashmir Univ, Jammu Univ",
                slug: "/locations/apostille-agent-kashmir",
              },
              {
                label: "HRD Service in Delhi NCR (DU / IP / JMI)",
                sub: "Delhi Higher Education Directorate & SDM",
                slug: "/locations/apostille-agent-delhi",
              },
            ].map((item) => (
              <a
                key={item.slug}
                href={item.slug}
                onClick={(e) => handleLinkClick(e, item.slug)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-[#0F766E] transition-colors flex flex-col justify-between gap-1 group"
              >
                <span className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] font-display">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-600">{item.sub}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 7. Call to Action (CTA) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Unsure Which Route Applies to Your University Degree?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your university name and destination country on WhatsApp for a
            quick check of whether Delhi SDM, State HRD, or e-Sanad applies.
          </p>
          <div className="pt-1">
            <a
              href={getWhatsAppUrl("Hi, I need help with Degree Certificate Apostille")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-extrabold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Check My Degree Route on WhatsApp</span>
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
                      Educational Verification Scope &amp; Route
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
                    <span>Ask About This Degree Route on WhatsApp</span>
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
