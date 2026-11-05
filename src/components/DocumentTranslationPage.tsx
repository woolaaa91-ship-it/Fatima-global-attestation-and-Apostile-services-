import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronRight,
  Phone,
  Languages,
  FileText,
  GraduationCap,
  Briefcase,
  Scale,
  Plane,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Stamp,
  Clock,
  FileStack,
  Check,
  ZoomIn,
  X,
  FileSearch,
  FileCheck2,
  ShieldCheck,
  Truck,
  Compass,
  Receipt,
  MapPin,
  Lock,
  ExternalLink,
} from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { useImagePopupHistory } from "../utils/modalHistory";
import { applyRouteSEO } from "../utils/seo";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion, FAQItem } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { QuoteForm } from "./QuoteForm";
import {
  INTERNATIONAL_LANGUAGE_PAGES,
  REGIONAL_TO_ENGLISH_LANGUAGE_PAGES,
  ACCEPTED_DOCUMENT_CATEGORIES_SPEC,
} from "../data/languageTranslations";

interface DocumentTranslationPageProps {
  onNavigate?: (path: string) => void;
}

const OFFICIAL_TRANSLATION_FEES_AND_TIMELINES = [
  {
    title: "Document Translation Charges",
    description:
      "Quoted per page or document based on the specific international language or Indian regional language to English pair and formatting complexity.",
    icon: <Languages className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "MEA Government Fee (If Attested)",
    description:
      "When your translated document requires MEA Apostille or Normal Attestation, the official MEA government fee is ₹50 per document (+ RAC agency fee).",
    icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Turnaround Time",
    description:
      "Indian regional language to English translations typically take 24–48 hours. International language translations (Arabic, German, Italian, French, Spanish, etc.) take 1–3 working days.",
    icon: <Clock className="w-5 h-5 text-[#0F766E]" />,
  },
  {
    title: "Original + Translation Stamping",
    description:
      "When an embassy or destination authority requires both the original certificate and the translated document to carry MEA/Embassy stamps, each is processed as a separate document.",
    icon: <FileStack className="w-5 h-5 text-[#0F766E]" />,
  },
];

const REQUIRED_TRANSLATION_CHECKLIST = [
  "Clear PDF Scan or High-Resolution Photo of the Original Document (all pages, front & back).",
  "Passport Copy of the Applicant / Spouse (mandatory to match exact English name spelling).",
  "Original Physical Certificate (only if SDM, MEA Apostille, or Foreign Embassy stamping is also required).",
  "Target Language & Destination Authority Details (e.g., Saudi Embassy, German Consulate, Italy Visa, MEA).",
];

const TRANSLATION_ROUTE_STEPS = [
  {
    step: 1,
    title: "Source Document & Passport Spelling Verification",
    description:
      "We review your original document scan and cross-verify all personal names, parent names, and dates against your Passport copy.",
  },
  {
    step: 2,
    title: "Mirror-Layout Professional Translation",
    description:
      "Our language specialists translate the document in a structured format that mirrors your source certificate and share a draft for your review.",
  },
  {
    step: 3,
    title: "Notary, SDM, MEA Apostille or Embassy Coordination",
    description:
      "Where required for your destination country, we coordinate Notary verification, SDM authentication, MEA Apostille, or Foreign Embassy attestation.",
  },
];

const TRANSLATION_4_STEP_WORKFLOW = [
  {
    step: 1,
    title: "Share Scan & Passport Spelling",
    description:
      "Send a clear scan of your certificate and passport copy on WhatsApp so we lock in exact name spellings and dates.",
    icon: <FileSearch className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 2,
    title: "Mirror-Layout Translation & Draft Check",
    description:
      "Our translator prepares a formatted translation matching your source certificate's layout and shares a draft for review.",
    icon: <FileCheck2 className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 3,
    title: "Notary, SDM & MEA / Embassy Assistance",
    description:
      "Where required for visa or consular use, we coordinate Notary endorsement, SDM authentication, MEA Apostille, or Embassy legalization.",
    icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
  },
  {
    step: 4,
    title: "Digital PDF + Tracked Courier Delivery",
    description:
      "Receive the high-resolution scanned PDF on WhatsApp/Email and physical documents via tracked courier.",
    icon: <Truck className="w-5 h-5 text-teal-700" />,
  },
];

interface InteractiveTranslationDocCard {
  id: string;
  title: string;
  subtitle: string;
  routeBadge: string;
  bgTintClass: string;
  illustration: React.ReactNode;
}

const INTERACTIVE_TRANSLATION_DOC_CARDS: InteractiveTranslationDocCard[] = [
  {
    id: "trans-marriage-birth",
    title: "Personal Documents (Birth & Marriage)",
    subtitle:
      "Birth Certificates, Marriage Certificates, Death Certificates, Affidavits, Passports & Driving Licences.",
    routeBadge: "Translation + Notary → SDM + MEA",
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
          width="36"
          height="44"
          rx="4"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="20"
          x2="42"
          y2="20"
          stroke="#0F766E"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="27"
          x2="38"
          y2="27"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="34"
          x2="34"
          y2="34"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="26"
          cy="44"
          r="5"
          stroke="#D97706"
          strokeWidth="2.2"
          fill="none"
        />
        <circle
          cx="34"
          cy="44"
          r="5"
          stroke="#0F766E"
          strokeWidth="2.2"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "trans-degree-academic",
    title: "Educational Documents (Degrees & Mark Sheets)",
    subtitle:
      "Degree Certificates, Diplomas, Mark Sheets, Academic Transcripts & School Certificates.",
    routeBadge: "MEA Apostille + Document Translation",
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
        <line
          x1="20"
          y1="28"
          x2="40"
          y2="28"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="35"
          x2="36"
          y2="35"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="43" r="4.5" fill="#0F766E" />
      </svg>
    ),
  },
  {
    id: "trans-wakala-legal-heir",
    title: "Legal Documents (POA, Court & Agreements)",
    subtitle:
      "Power of Attorney (Wakala), Court Documents, Legal Heir Records, Agreements & Legal Notices.",
    routeBadge: "Translation → Notary + SDM + MEA",
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
        <rect x="20" y="18" width="24" height="6" rx="2" fill="#0B2545" />
        <line
          x1="20"
          y1="31"
          x2="44"
          y2="31"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="38"
          x2="38"
          y2="38"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="41" cy="45" r="5" fill="#D97706" />
      </svg>
    ),
  },
  {
    id: "trans-commercial-export",
    title: "Commercial Documents (Invoices & Company Docs)",
    subtitle:
      "Invoices, Business Agreements, Company Documents & Certificates of Incorporation.",
    routeBadge: "Translation + Chamber / MEA",
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
        <rect x="20" y="20" width="24" height="7" rx="2" fill="#0F766E" />
        <line
          x1="20"
          y1="34"
          x2="42"
          y2="34"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="41"
          x2="34"
          y2="41"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface TranslationSpecimenItem {
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

const TRANSLATION_SPECIMENS: TranslationSpecimenItem[] = [
  {
    id: "arabic-marriage-translation-specimen",
    title:
      "English to Arabic Formatted Translation Specimen (Marriage Certificate — شهادة زواج)",
    badge: "Arabic Translation Specimen",
    image:
      "/assets/aistudio/arabic_marriage_certificate_original_style_A4_f4196b02.png",
    privacyLabel:
      "Illustrative Translation Specimen — Exact Name Spelling Preserved",
    destinationOrUse:
      "Saudi Arabia, UAE, Qatar, Kuwait & Middle East Family / Residence Visa Submissions",
    description:
      "Formatted English-to-Arabic translation specimen of a Government of Kerala Certificate of Marriage (Form No. IV, Rule 11(1)). Demonstrates how our translators mirror the exact A4 tabular structure of the original Indian certificate while retaining personal names, addresses, and registration numbers in their exact original English spelling alongside Arabic fields so there is zero spelling mismatch with the applicant's passport.",
    elementsVerified: [
      "Mirror-Format A4 Layout Matching Original Government Certificate Structure",
      "Arabic Header & Field Labels (حكومة ولاية كيرالا — شهادة زواج)",
      "Exact English Passport Name & Address Spellings Retained to Prevent Visa Rejection",
      "Certificate Serial, Registration Number (286/2016) & Issuing Authority Accurately Mapped",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I viewed the English to Arabic Marriage Certificate Translation Specimen and need a quote for document translation.",
  },
  {
    id: "source-kerala-marriage-certificate-specimen",
    title:
      "Source Indian Certificate Reference (Form No. IV Marriage Certificate — Pre-Translation)",
    badge: "Source Document Reference",
    image:
      "/assets/aistudio/Screenshot_2026-11-01-20-27-39-70_439a3fec0400f8974d35eed09a31f914_2_42250226.jpg",
    privacyLabel: "Source Format Reference — Compare with Arabic Translation",
    destinationOrUse:
      "Compare Original Indian Certificate Layout with Target Arabic Translation",
    description:
      "Original English format of the Government of Kerala Department of Local Self Government Certificate of Marriage (Form No. IV) used as the source document for the Arabic translation specimen. Comparing both cards shows how every section—Husband's Details, Wife's Details, Party Particulars, Registration Details, and Local Registrar endorsement—is structured line-for-line in the target translation.",
    elementsVerified: [
      "Government of Kerala Department of Local Self Government Form No. IV Layout",
      "Side-by-Side Husband & Wife Photograph & Personal Details Table",
      "Registration Number, Date of Marriage & Local Registrar Endorsement Block",
      "Direct 1:1 Structural Correspondence with the Arabic Translation Specimen",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I want to get my Indian certificate translated and attested. Please check my document.",
  },
];

const TRANSLATION_TRUST_FACTORS = [
  {
    icon: <Languages className="w-5 h-5 text-teal-700" />,
    title: "Passport-Exact Name Spelling",
    desc: "We cross-verify every name, father's name, and place name against your Passport copy before finalizing the translation to prevent embassy queries.",
  },
  {
    icon: <Compass className="w-5 h-5 text-teal-700" />,
    title: "Mirror-Layout Formatting",
    desc: "We preserve the tabular structure, registration numbers, seal annotations, and layout of your original certificate in the translated document.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
    title: "Translation + MEA Under One Roof",
    desc: "No need to coordinate separately between translators, notaries, and attestation agents. We handle Document Translation, Notary, SDM, MEA, and Embassy stamping together.",
  },
  {
    icon: <Receipt className="w-5 h-5 text-teal-700" />,
    title: "Draft Review Before Finalization",
    desc: "We share a soft-copy PDF draft of the translation on WhatsApp so you can verify all names and dates before physical printing and notarization.",
  },
];

const TRANSLATION_OFFICIAL_PORTALS = [
  {
    title:
      "Ministry of External Affairs (MEA) — Official Apostille & Attestation Guidelines",
    href: "https://mea.gov.in/apostille-menu.htm",
  },
  {
    title: "e-Sanad Portal (NIC / MEA) — Digital Document Verification",
    href: "https://esanad.nic.in/",
  },
  {
    title: "HCCH — Official Hague Apostille Convention Member Countries",
    href: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
  },
];

const POPULAR_TRANSLATION_COUNTRIES = [
  { name: "Saudi Arabia (Arabic)", slug: "/countries/saudi-arabia-attestation" },
  { name: "UAE (Arabic / MOFA)", slug: "/countries/uae-mofa-attestation" },
  { name: "Qatar (Arabic / Embassy)", slug: "/countries/qatar" },
  { name: "Kuwait (Arabic / Embassy)", slug: "/countries/kuwait" },
  { name: "Germany (German)", slug: "/countries/germany" },
  { name: "Italy (Italian)", slug: "/countries/italy" },
  { name: "France (French)", slug: "/countries/france" },
  { name: "Spain (Spanish)", slug: "/countries/spain" },
];

const RELATED_TRANSLATION_GUIDES = [
  {
    title: "Apostille Services in India (Hague Countries)",
    slug: "/services/apostille",
    tag: "Core MEA Service",
  },
  {
    title: "Embassy Legalization Services (Non-Hague)",
    slug: "/services/embassy-legalization",
    tag: "Consular Attestation",
  },
  {
    title: "MOFA Attestation Assistance (Gulf Countries)",
    slug: "/services/mofa-attestation",
    tag: "MOFA Attestation",
  },
  {
    title: "Degree Certificate Apostille & HRD Guide",
    slug: "/services/degree-certificate-apostille",
    tag: "Educational Documents",
  },
];

export const DOCUMENT_TRANSLATION_FAQS: FAQItem[] = [
  {
    question:
      "What documents are required to start a language translation order? Do I need to submit original physical certificates?",
    answer:
      "To start a document translation, you only need to share a clear PDF scan or high-resolution photo of all pages of your document (front and back, including stamps) along with a copy of the applicant's Passport on WhatsApp or Email. Original physical certificates are only required if your destination authority also mandates physical SDM, State HRD, MEA Apostille, or Foreign Embassy stamps on the original document.",
  },
  {
    question:
      "Why is sharing a Passport copy mandatory before translating a certificate into English or an international language?",
    answer:
      "Phonetic spelling of Indian names from regional scripts into English, Arabic, or European languages can vary. Cross-checking against your Passport copy before finalization ensures that the applicant's name, spouse's name, and parents' names in the translated document match your Passport character-for-character, preventing embassy or visa queries.",
  },
  {
    question:
      "How is translation certification and verification handled for visa, MEA Apostille, and embassy submissions?",
    answer:
      "Every translation is prepared in a structured A4 mirror-layout matching your source document line-by-line (including registration numbers, dates, and seal notations) and issued with a formal translation verification statement. Where required by your destination country, we also coordinate Notary Public attestation, SDM authentication, Ministry of External Affairs (MEA) Apostille, or Foreign Embassy legalization.",
  },
  {
    question:
      "When does a translated document require Notary, SDM, MEA Apostille, or Embassy attestation?",
    answer:
      "If your original certificate is in a regional Indian language (such as Hindi, Urdu, Punjabi, Marathi, Tamil, or Gujarati), the MEA requires a notarized and SDM-authenticated English translation before issuing an Apostille or Normal Attestation stamp. Similarly, for countries like Italy, Spain, Germany, Saudi Arabia, UAE, or China, embassies and municipal authorities often require the translated copy to be notarized, apostilled, or attested alongside the original certificate.",
  },
  {
    question:
      "What is the delivery timeline for document translation services in India?",
    answer:
      "Standard 1–2 page personal or educational certificates (such as Birth Certificates, Marriage Certificates, PCC, or Degree Certificates) typically take 24 to 48 working hours for Indian regional-to-English translation and 1 to 3 working days for international languages (Arabic, German, Spanish, Italian, French, Chinese, Russian, etc.). Multi-page legal agreements, court decrees, academic transcripts, or commercial dossiers generally take 2 to 4 working days depending on word count and formatting.",
  },
  {
    question:
      "How do I review the translation draft, and how are the final translated documents delivered?",
    answer:
      "Before printing or notarization, we share a digital PDF draft on WhatsApp or Email so you can verify all names, dates, and certificate details. Once approved, you receive the final high-resolution PDF immediately on WhatsApp/Email, and physical hard copies (including notarized, apostilled, or embassy-attested sets) are dispatched across India and abroad via tracked courier.",
  },
  {
    question:
      "Which international and Indian regional languages do you translate?",
    answer:
      "We provide professional document translation for 14 international languages (Czech, Spanish, Dutch, Chinese, Portuguese, German, Russian, Korean, Vietnamese, Arabic, Italian, French, Hebrew, and Serbian) and 12 Indian regional languages into English (Hindi, Punjabi, Marathi, Tamil, Kannada, Gujarati, Bangla, Urdu, Malayalam, Telugu, Assamese, and Odia to English).",
  },
  {
    question:
      "Can the MEA apostille a certificate that is issued only in Hindi, Punjabi, Marathi, or Urdu?",
    answer:
      "The Ministry of External Affairs (MEA) requires documents issued solely in regional Indian languages to be accompanied by a complete English translation, duly notarized and authenticated by the SDM or State Home Department, before the MEA Apostille or Normal Attestation stamp is applied.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export function buildDocumentTranslationFaqSchema(
  canonicalPageUrl = "https://fatimaglobalattestation.com/services/document-translation"
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalPageUrl}#faqpage`,
    name: "Frequently Asked Questions — Professional Language Translation Services in India",
    description:
      "Frequently asked questions covering source document requirements, passport spelling verification, translation certification and attestation procedures, and delivery timelines for international and Indian regional language translations.",
    url: canonicalPageUrl,
    mainEntity: DOCUMENT_TRANSLATION_FAQS.map((faq, idx) => ({
      "@type": "Question",
      "@id": `${canonicalPageUrl}#faq-question-${idx + 1}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export const DOCUMENT_TRANSLATION_FAQ_SCHEMA =
  buildDocumentTranslationFaqSchema();

const TRANSLATION_WHATSAPP_URL = getWhatsAppUrl(
  "Hi, I need a quote for professional language translation services"
);

export const DocumentTranslationPage: React.FC<
  DocumentTranslationPageProps
> = ({ onNavigate }) => {
  // Interactive Multi-Document Translation Selection State (with inline "Ask now" bar below active card)
  const [selectedTransDocIds, setSelectedTransDocIds] = useState<string[]>([
    "trans-marriage-birth",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] = useState<string>(
    "trans-marriage-birth"
  );

  // Specimen 2x Zoom Lightbox State
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<TranslationSpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  const canonicalPageUrl =
    typeof window !== "undefined" && window.location?.origin
      ? `${window.location.origin}/services/document-translation`
      : "https://fatimaglobalattestation.com/services/document-translation";

  const faqPageJsonLd = buildDocumentTranslationFaqSchema(canonicalPageUrl);

  useEffect(() => {
    const activePath =
      typeof window !== "undefined" && window.location?.pathname
        ? window.location.pathname
        : "/services/document-translation";
    applyRouteSEO(activePath);
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

  const handleToggleTransDocCard = (id: string) => {
    setSelectedTransDocIds((prev) => {
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

  const handleOpenSpecimen = (specimen: TranslationSpecimenItem) => {
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
    "document-translation-specimen-popup"
  );

  const selectedTransDocTitles = INTERACTIVE_TRANSLATION_DOC_CARDS.filter((c) =>
    selectedTransDocIds.includes(c.id)
  ).map((c) => c.title);

  const multiTransWhatsAppMessage =
    selectedTransDocTitles.length > 0
      ? `Hello ${BUSINESS_CONFIG.shortName}, I need Professional Language Translation assistance for:\n• ${selectedTransDocTitles.join("\n• ")}\n\nPlease share the language translation fee, turnaround time, and Notary/MEA attestation process.`
      : `Hello ${BUSINESS_CONFIG.shortName}, I need Professional Language Translation services. Please guide me on the process and fees.`;

  const renderTranslationSelectionActionBar = () => (
    <div className="mt-2.5 rounded-2xl bg-[#0A192F] text-white px-3.5 sm:px-5 py-3 shadow-lg border border-teal-400/35 flex items-center justify-between gap-2.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedTransDocIds.length > 0) {
              setSelectedTransDocIds([]);
            } else {
              setSelectedTransDocIds([activeAnchorCardId]);
            }
          }}
          title={
            selectedTransDocIds.length > 0
              ? "Clear selection"
              : "Select document for translation"
          }
          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            selectedTransDocIds.length > 0
              ? "bg-white text-[#0A192F]"
              : "bg-white/15 border border-white/40 text-transparent"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-white block leading-tight">
            {selectedTransDocIds.length === 0
              ? "Tap the documents you need to translate"
              : selectedTransDocIds.length === 1
              ? "1 document category selected"
              : `${selectedTransDocIds.length} document categories selected`}
          </span>
          {selectedTransDocTitles.length > 0 && (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedTransDocTitles.join(", ")}
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiTransWhatsAppMessage)}
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
              Professional Language Translation Services in India
            </span>
          </nav>
        </div>
      </div>

      {/* SECTION 1: PAGE HEADING */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 inline-flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span>
              International &amp; Regional Document Translation • Visa, Apostille &amp; Embassy Support
            </span>
          </span>

          {/* H1: Professional Language Translation Services in India */}
          <h1 className="text-[28px] sm:text-[34px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            Professional Language Translation Services in India
          </h1>

          {/* Introduction */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            Fatima Global Attestation provides professional document translation services for educational, personal, legal, immigration and commercial documents. We assist customers with international language translation, Arabic translation and Indian regional language to English translation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={TRANSLATION_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Get a Translation Quote on WhatsApp</span>
            </a>

            <a
              href="#translation-quote-form"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0A192F] text-sm font-extrabold shadow-xs transition-colors"
            >
              <span>Request a Quotation</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
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
        {/* SECTION 2: INTERNATIONAL LANGUAGE TRANSLATION (14 Clickable Cards) */}
        <section
          id="international-language-translation"
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Global Embassy, Visa &amp; Apostille Language Services
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              International Language Translation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Select any international language below to view accepted document
              categories, translation workflow, and apostille or embassy
              attestation guidance:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERNATIONAL_LANGUAGE_PAGES.map((lang) => (
              <a
                key={lang.slug}
                href={lang.slug}
                onClick={(e) => handleLinkClick(e, lang.slug)}
                className="p-5 rounded-xl bg-[#F3F4F6] hover:bg-white border border-slate-200 hover:border-[#0F766E] shadow-2xs hover:shadow-md transition-all duration-150 flex flex-col justify-between gap-4 text-left group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                      <Languages className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#0A192F] group-hover:text-[#0F766E] font-display leading-snug transition-colors">
                      {lang.cardTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {lang.shortCardDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 truncate">
                    {lang.commonDestinations.slice(0, 2).join(" • ")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0A192F] group-hover:bg-[#0F766E] text-white text-xs font-bold transition-colors shrink-0">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:text-white transition-colors" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 3: INDIAN REGIONAL LANGUAGE TO ENGLISH TRANSLATION (12 Clickable Cards) */}
        <section
          id="regional-language-translation"
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Regional Indian Certificates to English for MEA, Visas &amp; Embassies
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Indian Regional Language to English Translation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Certificates issued in regional Indian scripts must be translated
              into English for MEA Apostille, foreign embassy attestation, and
              overseas visa applications. Click any regional language pair below
              to view full details:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_TO_ENGLISH_LANGUAGE_PAGES.map((lang) => (
              <a
                key={lang.slug}
                href={lang.slug}
                onClick={(e) => handleLinkClick(e, lang.slug)}
                className="p-5 rounded-xl bg-[#F3F4F6] hover:bg-white border border-slate-200 hover:border-[#0F766E] shadow-2xs hover:shadow-md transition-all duration-150 flex flex-col justify-between gap-4 text-left group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                      <Languages className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#0A192F] group-hover:text-[#0F766E] font-display leading-snug transition-colors">
                      {lang.cardTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {lang.shortCardDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#0F766E] truncate">
                    Regional → English
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0A192F] group-hover:bg-[#0F766E] text-white text-xs font-bold transition-colors shrink-0">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:text-white transition-colors" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* IMPORTANT PROCEDURAL NOTE */}
        <div
          role="alert"
          className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 sm:p-5 shadow-2xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-800" />
            </div>
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              <strong className="font-extrabold text-[#0A192F]">
                Important Note for MEA &amp; Embassy Submissions:
              </strong>{" "}
              If your original certificate is issued in Hindi, Urdu, Punjabi,
              Marathi, Gujarati, Tamil, or another regional Indian language, it
              must be accompanied by an accurate{" "}
              <strong className="font-bold text-[#0F766E]">
                English Translation
              </strong>{" "}
              duly notarized and authenticated by the SDM before the Ministry of
              External Affairs (MEA) applies an Apostille or Normal Attestation
              stamp.
            </p>
          </div>
        </div>

        {/* TYPES OF DOCUMENTS ACCEPTED FOR TRANSLATION (5 Detailed Categories from Section 8) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Documents Accepted for Translation
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Educational, Personal, Legal, Visa &amp; Commercial Documents We Translate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We assist individuals, families, students, legal representatives,
              and corporate entities with document translation across all major
              categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Educational Documents */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#0A192F] font-display">
                  Educational Documents
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.educational.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Documents */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#0A192F] font-display">
                  Personal Documents
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.personal.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Documents */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#0A192F] font-display">
                  Legal Documents
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.legal.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial Documents */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#0A192F] font-display">
                  Commercial Documents
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.commercial.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Immigration & Visa Documents */}
          <div className="p-5 rounded-xl bg-[#0A192F] text-white border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 text-[#F59E0B] flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white font-display">
                  Immigration &amp; Visa Supporting Documents
                </h3>
                <p className="text-xs text-slate-300">
                  Prepared for embassies, consulates, and overseas immigration authorities
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.immigration.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 border border-white/15 text-xs font-semibold text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE DOCUMENT-WISE SELECTOR WITH INLINE "ASK NOW" BAR */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Quick Document Enquiry on WhatsApp
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Document Category You Need to Translate
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick your document category below — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right below the card you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {INTERACTIVE_TRANSLATION_DOC_CARDS.map((card) => {
              const isSelected = selectedTransDocIds.includes(card.id);
              const isAnchorForBar = activeAnchorCardId === card.id;
              return (
                <div key={card.id} className="flex flex-col">
                  <div
                    onClick={() => handleToggleTransDocCard(card.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleTransDocCard(card.id);
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
                      <span className="font-bold text-[#0F766E] truncate">
                        {card.routeBadge}
                      </span>

                      <span className="inline-flex items-center gap-1 font-extrabold text-[#0A192F] shrink-0">
                        <span>Select Category</span>
                        <ArrowRight className="w-3 h-3 text-[#0F766E]" />
                      </span>
                    </div>
                  </div>

                  {isAnchorForBar && renderTranslationSelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* TRANSLATION, NOTARY & MEA FEES & TIMELINES */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Transparent Pricing &amp; Turnaround
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Document Translation &amp; Attestation Fees &amp; Timelines
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_TRANSLATION_FEES_AND_TIMELINES.map((item, idx) => (
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

        {/* REQUIRED DOCUMENTS CHECKLIST */}
        <ContentCard title="Required Documents Checklist for Document Translation">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {REQUIRED_TRANSLATION_CHECKLIST.map((docItem, idx) => (
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

        {/* THE TRANSLATION & ATTESTATION ROUTE */}
        <ContentCard title="The Translation & Attestation Route">
          <div className="space-y-4 pt-1">
            {TRANSLATION_ROUTE_STEPS.map((item) => (
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

        {/* 4-STEP END-TO-END TRANSLATION & DELIVERY WORKFLOW */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Step-by-Step Translation Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              How Our 4-Step Document Translation &amp; Legalization Process Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {TRANSLATION_4_STEP_WORKFLOW.map((item) => (
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

        {/* OFFICIAL TRANSLATION & SOURCE CERTIFICATE SPECIMEN PROOF GALLERY (2X ZOOM) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Tap to Inspect Reference Proofs (2x Zoom)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Formatted Document Translation &amp; Source Certificate Specimens
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Inspect how an Indian Certificate of Marriage is translated
              line-by-line into formatted Arabic while preserving the exact A4
              tabular layout and original English passport name spellings so
              there is zero discrepancy during embassy or visa verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRANSLATION_SPECIMENS.map((sample) => (
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
                      Exact Layout &amp; Spelling Preserved
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
                      <span>Inspect Translation Format</span>
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

        {/* WHY CLIENTS CHOOSE FATIMA GLOBAL ATTESTATION FOR DOCUMENT TRANSLATION */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Accurate &amp; Structured Document Translations
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Why Families, Students &amp; Corporates Choose Fatima Global Attestation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TRANSLATION_TRUST_FACTORS.map((item, idx) => (
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
                  <Stamp className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Notary, SDM &amp; MEA Coordination</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Complete coordination for Notary verification, SDM
                  authentication, and MEA Apostille or Embassy attestation where
                  required.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Connaught Place, New Delhi Desk</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Direct submission coordination from Barakhamba Road, New Delhi
                  110001 for SDM, MEA Apostille, and Foreign Embassies.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/8 border border-white/15 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-300">
                  <Lock className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>PAN-India &amp; NRI Digital Support</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Share scans from anywhere in India or abroad; receive PDF
                  drafts on WhatsApp and physical copies via tracked courier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Box */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. Government fees and timelines apply. Translation charges are separate from attestation fees." />

        {/* OFFICIAL PORTALS, INTERNAL LINKS & QUOTE FORM */}
        <div
          id="translation-quote-form"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start scroll-mt-20"
        >
          <div className="lg:col-span-7 space-y-6">
            {/* Official Government Portals */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Official MEA &amp; Consular Verification Portals
              </h2>
              <ul className="space-y-2.5">
                {TRANSLATION_OFFICIAL_PORTALS.map((link, idx) => (
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

            {/* Popular Translation Destination Countries + Related Guides */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                    Translation &amp; Attestation by Destination Country
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
                  {POPULAR_TRANSLATION_COUNTRIES.map((country) => (
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
                  Related Attestation &amp; Legalization Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RELATED_TRANSLATION_GUIDES.map((item) => (
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
              initialServiceSlug="/services/document-translation"
              title="Request Language Translation Quotation"
              subtitle="Share your source language, target language, and whether you also need Notary, MEA Apostille, or Foreign Embassy attestation."
            />
          </div>
        </div>

        {/* DEDICATED FREQUENTLY ASKED QUESTIONS SECTION (Document Requirements, Translation Certification & Delivery Timelines) */}
        <section
          id="translation-faqs"
          aria-labelledby="translation-faq-heading"
          itemScope
          itemType="https://schema.org/FAQPage"
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-2xs scroll-mt-20"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Document Requirements • Translation Verification • Delivery Timelines
            </span>
            <h2
              id="translation-faq-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Clear answers on source document requirements, translation
              verification and attestation procedures, and standard turnaround
              timelines for international and Indian regional language
              translations.
            </p>
          </div>

          {/* 3 Quick-Reference Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-amber-300 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0A192F] font-display">
                  1. Document Requirements
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear PDF scan or photo (front &amp; back) plus a{" "}
                <strong className="text-[#0A192F]">Passport copy</strong> for
                character-for-character name verification. Originals are only
                required if physical MEA Apostille or Embassy stamping is also
                needed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0A192F] font-display">
                  2. Translation Verification &amp; Attestation
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prepared in a structured{" "}
                <strong className="text-[#0A192F]">A4 mirror layout</strong>{" "}
                with a formal translator verification statement, plus optional{" "}
                <strong className="text-[#0A192F]">
                  Notary, SDM, MEA Apostille &amp; Embassy
                </strong>{" "}
                attestation support.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0A192F] font-display">
                  3. Delivery Timelines &amp; Dispatch
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-[#0A192F]">24–48 working hours</strong>{" "}
                for standard 1–2 page certificates and{" "}
                <strong className="text-[#0A192F]">2–4 working days</strong> for
                multi-page legal or commercial files, with WhatsApp PDF draft
                review and tracked courier delivery.
              </p>
            </div>
          </div>

          <FAQAccordion
            title="Common Questions on Requirements, Certification & Turnaround Time"
            items={DOCUMENT_TRANSLATION_FAQS}
          />

          {/* Embedded JSON-LD FAQPage Structured Data for Google Search Rich Results */}
          <script
            id="fga-translation-faqpage-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqPageJsonLd),
            }}
          />
        </section>

        {/* Bottom Call to Action (CTA) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Professional Translation for Your Documents?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Send a clear photo or scan of your document on WhatsApp to confirm
            translation and attestation requirements.
          </p>
          <div className="pt-1">
            <a
              href={TRANSLATION_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-base font-bold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Get a Translation Quote on WhatsApp</span>
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
                      Translation Format &amp; Verification Scope
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {selectedSpecimen.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                      Key Elements Shown:
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
                    <span>Enquire About This Translation on WhatsApp</span>
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
