import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  Phone,
  ArrowRight,
  Stamp,
  Landmark,
  Globe2,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Clock,
  FileStack,
  Globe,
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

interface EmbassyLegalizationPageProps {
  onNavigate?: (path: string) => void;
}

const PRE_EMBASSY_ROUTES = [
  {
    badge: "Route 1 • Educational Certificates",
    title: "State HRD or Delhi SDM → MEA → Embassy",
    description:
      "For university degrees, diplomas, and mark sheets needed for work visas in UAE, Qatar, Kuwait, Saudi Arabia, Vietnam, or China. Verified by State HRD or Delhi SDM, stamped by MEA, and legalized by the destination Embassy.",
  },
  {
    badge: "Route 2 • Personal & Civil Certificates",
    title: "SDM or State Home Dept → MEA → Embassy",
    description:
      "For Marriage Certificates, Birth Certificates, PCC, Medical Fitness, and Personal POA used for spouse/family residence visas in the Middle East and Asia. Authenticated by SDM/Home Dept and MEA before Embassy stamping.",
  },
  {
    badge: "Route 3 • Commercial & Trade Papers",
    title: "Chamber of Commerce → MEA → Embassy",
    description:
      "For Commercial Invoices, Certificates of Origin (COO), Corporate POA, and Agency Agreements. Must be endorsed by a recognized Chamber of Commerce and MEA before Foreign Embassy consular legalization.",
  },
];

const OFFICIAL_EMBASSY_FEES_AND_TIMELINES = [
  {
    title: "Pre-Embassy MEA Government Fee",
    description:
      "₹50 per document for the mandatory Ministry of External Affairs (MEA) Normal Attestation ink stamp (plus nominal outsourced RAC agency fee).",
    icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Foreign Embassy Consular Fee",
    description:
      "Each Embassy in New Delhi (UAE, Qatar, Kuwait, Saudi, Egypt, Vietnam) sets its own consular fee in INR/USD/AED based on document category or invoice value.",
    icon: <Landmark className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Embassy Processing Timeline",
    description:
      "Most foreign embassies in New Delhi take 3–7 working days after MEA attestation. If State HRD verification is required first, add 6–10 working days.",
    icon: <Clock className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Supporting Sets & Translations",
    description:
      "Certain embassies (e.g., Qatar requires Degree + Final Marksheet + Bonafide; Egypt/Kuwait/Saudi may require Arabic translation) mandate supporting sets.",
    icon: <FileStack className="w-5 h-5 text-[#0F766E]" />,
  },
];

const REQUIRED_EMBASSY_CHECKLIST = [
  "Original Certificate / Document (without lamination on the reverse side).",
  "Clear Front & Back Passport Copy of the Applicant.",
  "All Mark Sheets / Transcripts (mandatory for Qatar & specific GCC degree attestations).",
  "Visa Copy / Offer Letter / Company Covering Letter (where requested by the specific Embassy).",
];

interface EmbassyRouteDocOption {
  label: string;
  shortName: string;
  preMeaStep: string;
  timelineNote: string;
}

const EMBASSY_ROUTE_DOC_OPTIONS: EmbassyRouteDocOption[] = [
  {
    label: "Degree / Diploma Certificate (Employment Visa)",
    shortName: "Degree / Diploma Certificate",
    preMeaStep: "State HRD or Delhi SDM → MEA Normal Stamp → Destination Embassy",
    timelineNote: "5–8 Working Days (SDM + MEA + Embassy) | +HRD time if required",
  },
  {
    label: "Marriage Certificate (Spouse / Family Residence Visa)",
    shortName: "Marriage Certificate",
    preMeaStep: "Notary + Delhi SDM / Home Dept → MEA Stamp → Destination Embassy",
    timelineNote: "5–7 Working Days (Complete SDM + MEA + Embassy Chain)",
  },
  {
    label: "Birth Certificate (Child Dependent Visa / Schooling)",
    shortName: "Birth Certificate",
    preMeaStep: "Notary + Delhi SDM / Home Dept → MEA Stamp → Destination Embassy",
    timelineNote: "5–7 Working Days (Complete SDM + MEA + Embassy Chain)",
  },
  {
    label: "Police Clearance Certificate (PCC) / Medical Certificate",
    shortName: "PCC / Medical Certificate",
    preMeaStep: "SDM / RPO → MEA Normal Attestation → Destination Embassy",
    timelineNote: "5–7 Working Days in New Delhi",
  },
  {
    label: "Personal Power of Attorney (POA) / Legal Heir / Wakala",
    shortName: "Personal POA / Legal Heir Certificate",
    preMeaStep: "Notary + SDM (+ Arabic Translation if needed) → MEA → Embassy",
    timelineNote: "5–8 Working Days in New Delhi",
  },
  {
    label: "Commercial Invoice, Certificate of Origin (COO) & Corporate POA",
    shortName: "Commercial Invoice / COO / Corporate POA",
    preMeaStep: "Chamber of Commerce → MEA Normal Stamp → Embassy Commercial Wing",
    timelineNote: "4–8 Working Days (Chamber + MEA + Embassy)",
  },
  {
    label: "School Transfer Certificate (TC) / Marksheets / Transcripts",
    shortName: "Transfer Certificate (TC) / Marksheets",
    preMeaStep: "SDM / Education Dept → MEA Stamp → Destination Embassy",
    timelineNote: "5–8 Working Days in New Delhi",
  },
];

const EMBASSY_MISSIONS_IN_DELHI = [
  "UAE Embassy, New Delhi (+ UAE MOFA Coordination)",
  "Embassy of the State of Qatar, New Delhi",
  "Embassy of the State of Kuwait, New Delhi",
  "Royal Embassy of Saudi Arabia, New Delhi",
  "Embassy of Egypt / Iraq / Jordan / Libya, New Delhi",
  "Embassy of Vietnam / Thailand / Malaysia / Indonesia",
  "Embassy of China / Taipei (TECC Taiwan) / Philippines",
  "Other Diplomatic Mission / High Commission in New Delhi",
];

const PRE_VERIFICATION_MODES = [
  "Fast-Track Delhi SDM + MEA Normal Attestation",
  "State HRD / Higher Education Dept + MEA Attestation",
  "State Home Department / GAD + MEA Attestation",
  "Recognized Chamber of Commerce + MEA Attestation (Commercial)",
];

interface InteractiveEmbassyDocCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  routeFinderDocLabel: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_EMBASSY_CARDS: InteractiveEmbassyDocCard[] = [
  {
    id: "emb-degree-work",
    title: "Degree & Diploma (Work Visa)",
    subtitle: "University degrees, engineering, nursing & technical diplomas.",
    routeBadge: "HRD / SDM → MEA → Foreign Embassy",
    routeFinderDocLabel: "Degree / Diploma Certificate (Employment Visa)",
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
        <path d="M22 10L6 17L22 24L38 17L22 10Z" fill="#0B2545" />
        <path
          d="M12 20V26C12 28.5 16.5 30.5 22 30.5C27.5 30.5 32 28.5 32 26V20"
          fill="#1E3A5F"
        />
        <line
          x1="20"
          y1="35"
          x2="40"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="42" cy="44" r="5" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: "emb-marriage-family",
    title: "Marriage Certificate (Family Visa)",
    subtitle: "For sponsoring spouse residence visa in UAE, Qatar & Kuwait.",
    routeBadge: "SDM / Home Dept → MEA → Embassy",
    routeFinderDocLabel:
      "Marriage Certificate (Spouse / Family Residence Visa)",
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
        <circle
          cx="39"
          cy="43"
          r="7.5"
          stroke="#D97706"
          strokeWidth="2.6"
          fill="none"
        />
        <circle
          cx="47"
          cy="41"
          r="7.5"
          stroke="#F59E0B"
          strokeWidth="2.6"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "emb-birth-child",
    title: "Birth Certificate & School TC",
    subtitle: "For child dependent visas & international school admissions.",
    routeBadge: "SDM / Home Dept → MEA → Embassy",
    routeFinderDocLabel: "Birth Certificate (Child Dependent Visa / Schooling)",
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
          width="34"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="22"
          x2="40"
          y2="22"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="29"
          x2="36"
          y2="29"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="42" r="6" fill="#10B981" />
      </svg>
    ),
  },
  {
    id: "emb-pcc-medical",
    title: "PCC, Medical & Affidavits",
    subtitle: "Police Clearance, medical fitness & single status declarations.",
    routeBadge: "SDM / RPO → MEA → Embassy Stamp",
    routeFinderDocLabel:
      "Police Clearance Certificate (PCC) / Medical Certificate",
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
          width="34"
          height="42"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          d="M42 28L52 32V40C52 47 47.5 52 42 54C36.5 52 32 47 32 40V32L42 28Z"
          fill="#0F766E"
        />
        <path
          d="M38 41L41 44L47 38"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "emb-poa-wakala",
    title: "POA, Wakala & Legal Heirship",
    subtitle: "Personal Power of Attorney, succession & death claim papers.",
    routeBadge: "SDM + Translation → MEA → Embassy",
    routeFinderDocLabel:
      "Personal Power of Attorney (POA) / Legal Heir / Wakala",
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
        <line
          x1="20"
          y1="22"
          x2="44"
          y2="22"
          stroke="#0B2545"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="30"
          x2="38"
          y2="30"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="43" r="5.5" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "emb-commercial-export",
    title: "Commercial Invoices, COO & POA",
    subtitle: "Export invoices, Certificates of Origin & corporate contracts.",
    routeBadge: "Chamber of Commerce → MEA → Embassy",
    routeFinderDocLabel:
      "Commercial Invoice, Certificate of Origin (COO) & Corporate POA",
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
          height="40"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <rect x="8" y="28" width="26" height="20" rx="4" fill="#0B2545" />
        <rect x="18" y="36" width="6" height="4" rx="1" fill="#FBBF24" />
      </svg>
    ),
  },
];

interface EmbassySpecimenItem {
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

const EMBASSY_SPECIMENS: EmbassySpecimenItem[] = [
  {
    id: "embassy-mofa-uae-specimen",
    title: "Foreign Embassy Legalization & MOFA Attestation Specimen",
    badge: "Embassy + MOFA Legalization",
    image:
      "/assets/aistudio/Screenshot_2026-10-30-02-34-57-68_40deb401b9ffe8e1df2f1cc5ba480b12_2_c9e36b53.jpg",
    privacyLabel: "Illustrative Sample — Reference & Verification Codes Masked",
    destinationOrUse:
      "UAE, Qatar, Kuwait, Saudi Arabia & Middle East Work / Family Visas",
    description:
      "Official bilingual (English/Arabic) Ministry of Foreign Affairs (MOFA) and Embassy of the United Arab Emirates, New Delhi attestation certificate verifying the authentication issued by the Ministry of External Affairs (MEA), Government of India. Reference numbers and digital verification codes are permanently masked for applicant privacy.",
    elementsVerified: [
      "Bilingual Ministry of Foreign Affairs (MOFA) Official Certificate Header",
      "Verification of Ministry of External Affairs, Government of India Attestation",
      "Green Circular Consular Stamp of Embassy of the UAE — New Delhi",
      "Digital MOFA Seal with Reference Numbers & Verification Codes Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the Foreign Embassy & MOFA Legalization Specimen and need assistance with my document.",
  },
  {
    id: "embassy-sdm-mea-specimen",
    title: "Delhi SDM + MEA Normal Attestation Stamp (Mandatory Pre-Embassy Step)",
    badge: "Pre-Embassy MEA Stamp",
    image: "/samples/sample_sdm_mea_attestation.jpg",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Required on All Documents Before Submitting to Any Foreign Embassy in India",
    description:
      "Close-up specimen showing the Sub-Divisional Magistrate (SDM) New Delhi seal and the Ministry of External Affairs (MEA) Normal Attestation ink stamp and signature required before any non-Hague foreign embassy in New Delhi will accept an Indian document for consular legalization.",
    elementsVerified: [
      "Sub-Divisional Magistrate (SDM) New Delhi Official Seal",
      "Ministry of External Affairs (MEA) Consular Normal Attestation Ink Stamp",
      "Authorized MEA Section Officer Countersignature",
      "Personal Names, Reference Numbers & Signatures Permanently Masked",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need SDM + MEA Normal Attestation and Foreign Embassy Legalization for my document.",
  },
];

const LEGALIZATION_STEPS = [
  {
    step: 1,
    title: "State Verification (SDM/HRD)",
    description:
      "Preliminary verification by the relevant Indian state authority based on the document type.",
  },
  {
    step: 2,
    title: "MEA Attestation",
    description:
      "The document is authenticated by the Ministry of External Affairs in New Delhi.",
  },
  {
    step: 3,
    title: "Embassy Submission",
    description:
      "The MEA-attested document is submitted to the specific foreign embassy (e.g., Saudi Embassy, Qatar Embassy) in India.",
  },
  {
    step: 4,
    title: "Final Delivery",
    description:
      "Once the embassy stamps the document, it is securely couriered back to you, ready for use abroad.",
  },
];

const EMBASSY_TRUST_FACTORS = [
  {
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
    title: "Embassy-Specific Rule Check",
    desc: "Every embassy in Chanakyapuri, New Delhi has distinct rules (e.g., Qatar demands final transcripts + bonafide; Kuwait/Egypt may require Arabic translation). We verify compliance before submission.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Authorized Consular Submission",
    desc: "Most embassies do not accept direct walk-in applications from individuals. We submit through authorized diplomatic and VFS/consular channels.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Transparent Consular Tariffs",
    desc: "Clear breakdown of the ₹50 MEA fee, official Embassy consular fee, and our service coordination charge with zero hidden costs.",
  },
  {
    icon: <Truck className="w-5 h-5 text-teal-700" />,
    title: "Pan-India & Overseas Delivery",
    desc: "Doorstep pickup across all Indian cities and direct tracked DHL/FedEx delivery to expatriates already living in the UAE, Qatar, Kuwait, Saudi Arabia, or Asia.",
  },
];

const EMBASSY_OFFICIAL_PORTALS = [
  {
    title:
      "Ministry of External Affairs (MEA) — Official Consular Attestation & Apostille Guidelines",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title:
      "MEA Protocol Division — Foreign Diplomatic Missions & Embassies in New Delhi",
    href: "https://www.mea.gov.in/",
  },
  {
    title:
      "e-Sanad Portal (NIC / MEA) — Digital Document Verification",
    href: "https://esanad.nic.in/",
  },
];

const POPULAR_EMBASSY_COUNTRIES = [
  { name: "UAE Embassy & MOFA", slug: "/countries/uae-mofa-attestation" },
  { name: "Saudi Arabia Embassy", slug: "/countries/saudi-arabia-attestation" },
  { name: "Qatar Embassy", slug: "/countries/qatar" },
  { name: "Kuwait Embassy", slug: "/countries/kuwait" },
  { name: "Oman", slug: "/countries/oman" },
  { name: "Bahrain", slug: "/countries/bahrain" },
  { name: "Malaysia", slug: "/countries/malaysia" },
  { name: "All Countries Directory", slug: "/countries" },
];

const RELATED_EMBASSY_GUIDES = [
  {
    title: "UAE MOFA Attestation from India",
    slug: "/countries/uae-mofa-attestation",
    tag: "UAE Work & Family Visa",
  },
  {
    title: "Saudi Arabia Document Attestation",
    slug: "/countries/saudi-arabia-attestation",
    tag: "Saudi Cultural & Consular",
  },
  {
    title: "Commercial Document & Chamber Attestation",
    slug: "/services/commercial-document-attestation",
    tag: "Export & Corporate Legalization",
  },
  {
    title: "Certified Arabic, French & Spanish Translation",
    slug: "/services/document-translation",
    tag: "Embassy Translation",
  },
];

export const EMBASSY_LEGALIZATION_FAQS: FAQItem[] = [
  {
    question:
      "What is the difference between embassy attestation and legalization?",
    answer:
      "They generally mean the same thing. Embassy legalization (or consular legalization) is the process of getting a document stamped by the embassy of the destination country in India to make it legally valid there.",
  },
  {
    question: "How do I know if I need an apostille or embassy legalization?",
    answer:
      "It depends on the destination country. If it is a member of the Hague Convention (like the UK, USA, or France), an apostille is usually sufficient. If it is a non-Hague country (like Saudi Arabia or Kuwait), it needs embassy legalization.",
  },
  {
    question: "Can I submit my documents directly to the embassy?",
    answer:
      "Most foreign embassies in India do not accept documents directly from individuals. They require submissions through authorized agencies or specific VFS centers. We handle this submission process for you.",
  },
  {
    question: "Does the embassy keep my original document?",
    answer:
      "In most cases, the embassy stamps the original document or attaches a sticker and returns it. We ensure the safe return of your original documents.",
  },
  {
    question:
      "Why does Qatar Embassy require mark sheets and a bonafide letter along with the degree certificate?",
    answer:
      "For educational degree attestation, the Embassy of the State of Qatar in New Delhi strictly requires the Original Degree Certificate, Original Final Year Marksheet/Transcript, and a University Verification/Bonafide Certificate to be attested together as a complete academic set.",
  },
  {
    question:
      "What is MOFA attestation and is it required after Embassy Legalization in India?",
    answer:
      "MOFA stands for the Ministry of Foreign Affairs of your destination country (such as UAE MOFA, Qatar MOFA, or Kuwait MOFA). After your document is attested by the MEA and legalized by the destination Embassy in New Delhi, the final step upon arrival abroad is MOFA counter-attestation. For UAE, we also coordinate UAE MOFA attestation.",
  },
  {
    question:
      "Can NRIs living in the Gulf or Asia get Indian documents legalized by an embassy in New Delhi without visiting India?",
    answer:
      "Yes. Expatriates residing in the UAE, Qatar, Kuwait, Saudi Arabia, Vietnam, Malaysia, or elsewhere can dispatch their original Indian certificates via international courier (or through a family member in India). Fatima Global Attestation completes the SDM/HRD, MEA, and Foreign Embassy legalization in New Delhi and couriers the legalized originals back safely.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const EMBASSY_LEGALIZATION_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: EMBASSY_LEGALIZATION_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const EMBASSY_WHATSAPP_URL = getWhatsAppUrl(
  "Hi, I need help with Embassy Legalization"
);

export const EmbassyLegalizationPage: React.FC<
  EmbassyLegalizationPageProps
> = ({ onNavigate }) => {
  // Interactive Foreign Embassy Route Finder State
  const [selectedDocLabel, setSelectedDocLabel] = useState<string>(
    EMBASSY_ROUTE_DOC_OPTIONS[0].label
  );
  const [selectedEmbassy, setSelectedEmbassy] = useState<string>(
    EMBASSY_MISSIONS_IN_DELHI[0]
  );
  const [selectedPreMode, setSelectedPreMode] = useState<string>(
    PRE_VERIFICATION_MODES[0]
  );
  const [checkedRoute, setCheckedRoute] = useState<{
    docLabel: string;
    embassy: string;
    preMode: string;
  }>({
    docLabel: EMBASSY_ROUTE_DOC_OPTIONS[0].label,
    embassy: EMBASSY_MISSIONS_IN_DELHI[0],
    preMode: PRE_VERIFICATION_MODES[0],
  });
  const [isCheckingRoute, setIsCheckingRoute] = useState<boolean>(false);
  const [routeFlash, setRouteFlash] = useState<boolean>(false);
  const routeResultRef = useRef<HTMLDivElement | null>(null);

  // Interactive Multi-Document Embassy Selection State (with inline "Ask now" bar below active card)
  const [selectedEmbIds, setSelectedEmbIds] = useState<string[]>([
    "emb-degree-work",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] =
    useState<string>("emb-degree-work");

  // Specimen Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<EmbassySpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    applyRouteSEO("/services/embassy-legalization");
    document.title =
      "Embassy Legalization Services | Attestation for Foreign Countries";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn the difference between apostille and embassy legalization. Assistance for non-Hague countries and consular attestation from India."
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

  const {
    containerRef: finderSectionRef,
    activeStep: activeFinderShineStep,
    guideToStep: guideFinderStep,
    markInteracted: markFinderInteracted,
  } = useSequentialBoxShine(4);

  const handleCheckEmbassyRoute = () => {
    guideFinderStep(0);
    setIsCheckingRoute(true);
    setTimeout(() => {
      setCheckedRoute({
        docLabel: selectedDocLabel,
        embassy: selectedEmbassy,
        preMode: selectedPreMode,
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

  const handleToggleEmbCard = (id: string) => {
    setSelectedEmbIds((prev) => {
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
      embassy: selectedEmbassy,
      preMode: selectedPreMode,
    });
    setRouteFlash(true);
    scrollToSectionById("embassy-route-finder", "smooth");
    setTimeout(() => {
      setRouteFlash(false);
    }, 1000);
  };

  const handleOpenSpecimen = (specimen: EmbassySpecimenItem) => {
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
    "embassy-legalization-specimen-popup"
  );

  const hasPendingRouteChange =
    selectedDocLabel !== checkedRoute.docLabel ||
    selectedEmbassy !== checkedRoute.embassy ||
    selectedPreMode !== checkedRoute.preMode;

  const checkedDocObj =
    EMBASSY_ROUTE_DOC_OPTIONS.find((d) => d.label === checkedRoute.docLabel) ||
    EMBASSY_ROUTE_DOC_OPTIONS[0];

  const routeFinderWhatsAppMessage = `Hello ${BUSINESS_CONFIG.shortName}, I checked the Embassy Legalization Route for:\n• Document: ${checkedDocObj.shortName}\n• Destination Mission: ${checkedRoute.embassy}\n• Pre-MEA Verification: ${checkedRoute.preMode}\n\nPlease confirm the exact consular fee, required supporting documents, and timeline.`;

  const selectedEmbTitles = INTERACTIVE_EMBASSY_CARDS.filter((c) =>
    selectedEmbIds.includes(c.id)
  ).map((c) => c.title);

  const multiEmbWhatsAppMessage =
    selectedEmbTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, I need Foreign Embassy Legalization & MEA Attestation assistance for:\n• ${selectedEmbTitles.join("\n• ")}\n\nPlease share the destination embassy requirements, timeline, and fee breakdown.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need assistance with Foreign Embassy Legalization in New Delhi. Please guide me on the process and fees.`;

  const renderEmbSelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedEmbIds.length > 0) {
              setSelectedEmbIds([]);
            } else {
              setSelectedEmbIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedEmbIds.length > 0
              ? "Clear selection"
              : "Select document for embassy legalization"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedEmbIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedEmbIds.length === 0
              ? "Tap the documents you need legalized"
              : selectedEmbIds.length === 1
              ? "1 document selected for Embassy Legalization"
              : `${selectedEmbIds.length} documents selected for Embassy Legalization`}
          </span>
          {selectedEmbTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedEmbTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiEmbWhatsAppMessage)}
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
              Embassy Legalization
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section (Unchanged) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
            Consular Attestation Chain • Non-Hague Countries
          </span>

          {/* H1 (28-32px mobile-first) */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            Embassy Legalization: When You Need More Than an Apostille
          </h1>

          {/* Subtitle Paragraph (16px Body) */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            If your destination country is not a member of the Hague Convention, an MEA Apostille is not enough. We coordinate the complete embassy legalization (consular attestation) process for Indian documents.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={EMBASSY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Enquire about Embassy Legalization</span>
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
        {/* CRITICAL CONSULAR WARNING BOX (Same Position & Style as Degree Certificate Page) */}
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
                Important Consular Rule:
              </strong>{" "}
              Foreign Embassies in New Delhi (including UAE, Qatar, Kuwait,
              Saudi Arabia, Egypt, Vietnam, China, and Malaysia) will{" "}
              <strong>not</strong> accept any Indian document directly. Every
              document must first receive preliminary verification (State HRD,
              Delhi SDM, or Chamber of Commerce) followed by the{" "}
              <strong>Ministry of External Affairs (MEA) Normal Attestation stamp</strong>{" "}
              before the Embassy will legalize it.
            </p>
          </div>
        </div>

        {/* 6. Disclaimer Box (Kept Intact) */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. Embassy fees and processing times are determined by the respective embassies and may change without notice." />

        {/* 2. Content Block 1: Apostille vs. Embassy Legalization (Two Distinct Cards — Kept Intact) */}
        <ContentCard title="Apostille vs. Embassy Legalization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Card A (Apostille) */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-2.5 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                    Hague Convention Route
                  </span>
                  <h3 className="text-base font-bold text-[#0A192F] font-display">
                    Apostille
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For Hague Convention Countries (e.g., USA, UK, Germany, Australia). A single MEA sticker is usually sufficient.
              </p>
            </div>

            {/* Card B (Embassy Legalization) */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-2.5 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                    Consular Attestation Route
                  </span>
                  <h3 className="text-base font-bold text-[#0A192F] font-display">
                    Embassy Legalization
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For Non-Hague Countries (e.g., Saudi Arabia, Qatar, Kuwait, UAE*). Requires MEA stamp followed by physical stamping at the destination country&apos;s Embassy in India. *Note: Some UAE employers still request full embassy legalization despite UAE being a Hague member.
              </p>
            </div>
          </div>
        </ContentCard>

        {/* NEW EMBASSY ADDITION 1: THE 3 PRE-EMBASSY AUTHENTICATION ROUTES BY DOCUMENT TYPE */}
        <ContentCard title="The Pre-Embassy Route Depends on Your Document Category">
          <p className="text-base text-slate-700 leading-relaxed">
            Before we submit your document to a foreign embassy in Chanakyapuri,
            New Delhi, it must pass through the specific Indian verification
            channel mandated for that document type:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {PRE_EMBASSY_ROUTES.map((route, idx) => (
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

        {/* NEW EMBASSY ADDITION 2: INTERACTIVE FOREIGN EMBASSY & CONSULAR ROUTE FINDER */}
        <section
          id="embassy-route-finder"
          ref={finderSectionRef}
          className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-4 sm:p-6 shadow-md border border-teal-500/30 space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                Interactive Consular Legalization Check
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Check MEA &amp; Foreign Embassy Attestation Route
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full self-start sm:self-center">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>All Embassies in New Delhi</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Dropdown 1: Document Category */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="emb-rf-doc"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 1 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  1. Document to Legalize
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
                  id="emb-rf-doc"
                  value={selectedDocLabel}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedDocLabel(e.target.value);
                    guideFinderStep(2);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {EMBASSY_ROUTE_DOC_OPTIONS.map((doc) => (
                    <option key={doc.label} value={doc.label}>
                      {doc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2: Destination Foreign Embassy */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="emb-rf-mission"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 2 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  2. Destination Foreign Embassy
                </label>
                {activeFinderShineStep === 2 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select embassy</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 2 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="emb-rf-mission"
                  value={selectedEmbassy}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedEmbassy(e.target.value);
                    guideFinderStep(3);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {EMBASSY_MISSIONS_IN_DELHI.map((mission) => (
                    <option key={mission} value={mission}>
                      {mission}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3: Pre-MEA Authentication Route */}
            <div className="sm:col-span-4 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <label
                  htmlFor="emb-rf-pre"
                  className={`block text-xs font-bold transition-colors ${
                    activeFinderShineStep === 3 ? "text-amber-300" : "text-teal-200"
                  }`}
                >
                  3. Pre-MEA Verification Route
                </label>
                {activeFinderShineStep === 3 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/60 text-[10px] font-extrabold text-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Select route</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeFinderShineStep === 3 ? "fga-finder-box-shine" : ""
                }`}
              >
                <select
                  id="emb-rf-pre"
                  value={selectedPreMode}
                  onFocus={markFinderInteracted}
                  onChange={(e) => {
                    setSelectedPreMode(e.target.value);
                    guideFinderStep(4);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-white text-[#0A192F] border border-slate-300 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                >
                  {PRE_VERIFICATION_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={handleCheckEmbassyRoute}
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
                  <span>Checking Consular Route...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0A192F] shrink-0" />
                  <span>
                    {hasPendingRouteChange
                      ? "Check Updated Embassy Route"
                      : "Check Embassy Route"}
                  </span>
                </>
              )}
            </button>
          </div>

          {hasPendingRouteChange && (
            <div className="rounded-lg bg-amber-400/15 border border-amber-300/40 px-3.5 py-2 text-xs text-amber-200">
              Selection updated. Tap{" "}
              <strong className="text-amber-300">
                &ldquo;Check Updated Embassy Route&rdquo;
              </strong>{" "}
              above to view the consular legalization chain for{" "}
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
                      {checkedDocObj.shortName} • {checkedRoute.embassy}
                    </span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-white pt-0.5">
                  Consular Chain:{" "}
                  <span className="text-amber-300">
                    {checkedDocObj.preMeaStep}
                  </span>
                </p>

                <p className="text-[11px] sm:text-xs text-teal-200">
                  Selected Route:{" "}
                  <strong className="text-white">{checkedRoute.preMode}</strong>{" "}
                  • Est. Time:{" "}
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

        {/* NEW EMBASSY ADDITION 3: INTERACTIVE EMBASSY DOCUMENT SELECTOR WITH INLINE "ASK NOW" BAR */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Documents Covered for Foreign Embassy Attestation
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Documents You Need Legalized by an Embassy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick your degree, marriage certificate, birth certificate, PCC, or
              commercial papers below — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right below the document you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {INTERACTIVE_EMBASSY_CARDS.map((card) => {
              const isSelected = selectedEmbIds.includes(card.id);
              const isAnchorForBar = activeAnchorCardId === card.id;
              return (
                <div key={card.id} className="flex flex-col">
                  <div
                    onClick={() => handleToggleEmbCard(card.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleEmbCard(card.id);
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

                  {isAnchorForBar && renderEmbSelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Content Block 2: Why is it required? (Card Style — Kept Intact) */}
        <ContentCard title="Why is it required?">
          <p className="text-base text-slate-700 leading-relaxed text-left">
            Embassy legalization (or consular legalization) proves to the foreign government that your Indian document is authentic. The destination embassy will only verify and stamp the document if it has already been authenticated by the Indian Ministry of External Affairs (MEA).
          </p>
        </ContentCard>

        {/* NEW EMBASSY ADDITION 4: OFFICIAL MEA FEES, EMBASSY CONSULAR TARIFFS & TIMELINES (2x2 Grid) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Official MEA &amp; Diplomatic Mission Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official MEA Fees, Embassy Consular Tariffs &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_EMBASSY_FEES_AND_TIMELINES.map((item, idx) => (
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

        {/* 4. Content Block 3: The Standard Legalization Process (4 Vertical Numbered Steps/Cards — Kept Intact) */}
        <ContentCard title="The Standard Legalization Process">
          <div className="space-y-4 pt-1">
            {LEGALIZATION_STEPS.map((item) => (
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

        {/* NEW EMBASSY ADDITION 5: EMBASSY-WISE CONSULAR COMPARISON TABLE */}
        <ContentCard title="Embassy-Wise Legalization Rules in New Delhi — Quick Comparison">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Each foreign embassy in New Delhi follows specific documentation and
            pre-verification rules before stamping Indian certificates:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="py-3 px-3.5 font-extrabold">
                    Foreign Embassy
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-teal-300">
                    Pre-MEA Requirement
                  </th>
                  <th className="py-3 px-3.5 font-extrabold text-amber-300">
                    Special Supporting Documents
                  </th>
                  <th className="py-3 px-3.5 font-extrabold">
                    Post-Embassy Step Abroad
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    UAE Embassy, New Delhi
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Delhi SDM / State HRD / Chamber + MEA Stamp
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Original Certificate + Clear Passport Copy
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    UAE MOFA Attestation (Coordinated by us)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Qatar Embassy, New Delhi
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    State HRD / Delhi SDM / Chamber + MEA Stamp
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    For Degrees: Degree + Final Marksheet + University Bonafide
                    Set
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Qatar MOFA Attestation in Doha
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Kuwait Embassy, New Delhi
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    State HRD / Delhi SDM / Chamber + MEA Stamp
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Original Certificate + Passport Copy (+ Arabic Translation
                    where applicable)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Kuwait MOFA Attestation
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] bg-slate-50">
                    Saudi Arabia / Egypt / Vietnam / China
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    State HRD / SDM / Chamber + MEA Attestation
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Passport Copy, Offer Letter / Visa Copy or Commercial Invoice
                    Set
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Destination Ministry of Foreign Affairs (MOFA)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* NEW EMBASSY ADDITION 6: REQUIRED DOCUMENTS CHECKLIST FOR EMBASSY SUBMISSION */}
        <ContentCard title="Required Documents Checklist for Embassy Legalization">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {REQUIRED_EMBASSY_CHECKLIST.map((docItem, idx) => (
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

        {/* NEW EMBASSY ADDITION 7: OFFICIAL EMBASSY & MEA SPECIMEN PROOF GALLERY */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Tap to Inspect Reference Proofs (2x Zoom)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Official Foreign Embassy, MOFA &amp; MEA Attestation Specimens
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect how the Sub-Divisional Magistrate (SDM) seal, Ministry of
              External Affairs (MEA) Normal Attestation stamp, and Foreign
              Embassy / MOFA legalization stickers appear on Indian documents.
              Personal details are masked for privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EMBASSY_SPECIMENS.map((sample) => (
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
                      Applicant Details Masked
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
                      <span>Inspect Consular Stamps</span>
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

        {/* NEW EMBASSY ADDITION 8: WHY VISA APPLICANTS & EXPATRIATES CHOOSE FATIMA GLOBAL ATTESTATION */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Direct Consular &amp; Diplomatic Mission Coordination
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Why Expatriates, Families &amp; Exporters Trust Fatima Global
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {EMBASSY_TRUST_FACTORS.map((item, idx) => (
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
                  <span>Scan Proof Before Dispatch</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  We share clear digital scans of your MEA and Foreign Embassy
                  consular stamps on WhatsApp before dispatching originals.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Connaught Place &amp; Chanakyapuri</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Central New Delhi office at Barakhamba Road (110001) with
                  daily submissions to MEA CPV Division and Chanakyapuri
                  embassies.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Gulf &amp; NRI Courier Support</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Already working in Dubai, Doha, Kuwait City, or Riyadh? Send
                  your Indian certificates by courier for full New Delhi
                  legalization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Content Block 4: Link to Country Directory (Kept Intact) */}
        <section className="bg-white rounded-xl border-2 border-[#0F766E]/30 p-5 sm:p-7 shadow-2xs space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
                  Check Your Destination Country Rules
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  Not sure if your destination country requires an apostille or embassy legalization?
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <a
                href="/countries"
                onClick={(e) => handleLinkClick(e, "/#country-directory")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-sm font-bold transition-colors"
              >
                <span>Browse our Country Directory</span>
                <ArrowRight className="w-4 h-4 text-teal-300 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Using Reusable FAQAccordion — Kept Intact + Expanded) */}
        <FAQAccordion
          title="Frequently Asked Questions — Foreign Embassy Legalization"
          items={EMBASSY_LEGALIZATION_FAQS}
        />

        {/* NEW EMBASSY ADDITION 9: OFFICIAL PORTALS, EMBASSY DESTINATION LINKS & QUOTE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Official Government & Consular Portals */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official MEA &amp; Consular Verification Portals
              </h2>
              <ul className="space-y-2.5">
                {EMBASSY_OFFICIAL_PORTALS.map((link, idx) => (
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

            {/* Popular Embassy Destinations + Related Guides */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Popular Foreign Embassies We Coordinate With
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
                  {POPULAR_EMBASSY_COUNTRIES.map((country) => (
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
                  Related Embassy, MOFA &amp; Translation Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_EMBASSY_GUIDES.map((item) => (
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
              initialServiceSlug="/embassy-legalization-services"
              title="Request Embassy Legalization Quote"
              subtitle="Select your document category and destination embassy. Our New Delhi desk will confirm the MEA + Embassy consular fee and timeline."
            />
          </div>
        </div>

        {/* 8. Bottom Call to Action (CTA — Kept Intact) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Help with Foreign Embassy Legalization?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your document type and destination country on WhatsApp so we can confirm the exact MEA and embassy attestation process.
          </p>
          <div className="pt-1">
            <a
              href={EMBASSY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-base font-bold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Enquire about Embassy Legalization</span>
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
                      Consular Legalization Scope &amp; Route
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
                    <span>Ask About This Embassy Route on WhatsApp</span>
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
