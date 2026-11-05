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
  Check,
  ZoomIn,
  X,
  FileCheck2,
  ShieldCheck,
  QrCode,
  ExternalLink,
  GraduationCap,
  Users,
  Briefcase,
  Scale,
} from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { useImagePopupHistory } from "../utils/modalHistory";
import { applyRouteSEO } from "../utils/seo";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion, FAQItem } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { DirectWhatsAppConsultationBox } from "./DirectWhatsAppConsultationBox";
import { CountryFlag } from "./CountryFlag";
import { QuoteForm } from "./QuoteForm";

interface MofaAttestationPageProps {
  onNavigate?: (path: string) => void;
}

interface MofaSpecimenItem {
  id: string;
  title: string;
  subtitle: string;
  authorityBadge: string;
  privacyLabel: string;
  image: string;
  description: string;
  elementsVerified: string[];
  whatsappMessage: string;
}

const MOFA_SPECIMEN_ITEMS: MofaSpecimenItem[] = [
  {
    id: "uae-mofa-digital-specimen",
    title:
      "Authentic UAE Ministry of Foreign Affairs (MOFA) Digital Attestation + UAE Embassy Seal",
    subtitle:
      "Verified specimen showing UAE Embassy New Delhi round green consular seal (150 AED) and UAE MOFA digital verification certificate (150 AED) with official verify.mofa.gov.ae link.",
    authorityBadge: "UAE Embassy + UAE MOFA Verified",
    privacyLabel: "Reference numbers & personal details blurred for client privacy",
    image:
      "/assets/aistudio/Screenshot_2026-10-30-02-34-57-68_40deb401b9ffe8e1df2f1cc5ba480b12_2_c9e36b53.jpg",
    description:
      "This real client specimen demonstrates how an Indian document is legalized for the United Arab Emirates: first authenticated by State/SDM and MEA in New Delhi, stamped by the UAE Embassy in New Delhi (150 AED mission fee), and finally certified by the UAE Ministry of Foreign Affairs (MOFA — 150 AED fee) with online verification at verify.mofa.gov.ae.",
    elementsVerified: [
      "Header: United Arab Emirates — Ministry of Foreign Affairs (MOFA) bilingual English & Arabic certificate.",
      "Certification Clause: Confirms that the attestation issued by the Ministry of External Affairs (MEA), Government of India has been verified.",
      "Official Fee Breakdown: UAE Mission Attestation Fee (150 AED) + UAE MOFA Attestation Fee (150 AED).",
      "Digital Portal Verification: Direct verification at https://verify.mofa.gov.ae using the reference number.",
      "Consular Seal: Official green round stamp of the Embassy of the United Arab Emirates, New Delhi.",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I reviewed the UAE MOFA Digital Attestation specimen on your MOFA Attestation page. Please guide me on getting my documents attested for UAE / Gulf MOFA.",
  },
];

interface MofaInteractiveDocItem {
  id: string;
  title: string;
  categoryBadge: string;
  chainSummary: string;
  purposeNote: string;
  timeline: string;
}

const MOFA_SELECTABLE_DOCUMENTS: MofaInteractiveDocItem[] = [
  {
    id: "mofa-degree",
    title: "Degree / Diploma Certificate for MOFA Attestation",
    categoryBadge: "Educational • Work Visa / Golden Visa",
    chainSummary:
      "State HRD or Delhi SDM → Indian MEA → Gulf Embassy (New Delhi) → Destination MOFA",
    purposeNote:
      "Mandatory for UAE Employment Visa, Golden Visa, Qatar Work Permit, Kuwait Article 18 Visa, and Saudi professional licensing.",
    timeline: "5–8 Working Days (India Leg) + Destination MOFA",
  },
  {
    id: "mofa-marriage",
    title: "Marriage Certificate for MOFA Attestation",
    categoryBadge: "Personal • Spouse & Family Sponsorship",
    chainSummary:
      "Notary + SDM / Home Dept → Indian MEA → Gulf Embassy → Destination MOFA",
    purposeNote:
      "Required for sponsoring husband/wife residence visa (Iqama / Family Visa) in UAE, Qatar, Kuwait, Saudi Arabia, Oman, and Bahrain.",
    timeline: "5–7 Working Days (India Leg) + Destination MOFA",
  },
  {
    id: "mofa-birth",
    title: "Birth Certificate for MOFA Attestation",
    categoryBadge: "Personal • Child Dependent Visa & Schooling",
    chainSummary:
      "Notary + SDM / Home Dept → Indian MEA → Gulf Embassy → Destination MOFA",
    purposeNote:
      "Required for newborn/child family residency visa sponsorship and international school admissions across GCC countries.",
    timeline: "5–7 Working Days (India Leg) + Destination MOFA",
  },
  {
    id: "mofa-qatar-set",
    title: "Qatar Complete Degree Set (Degree + Marksheets + Bonafide)",
    categoryBadge: "Qatar Embassy + Qatar MOFA",
    chainSummary:
      "HRD/SDM → Indian MEA → Qatar Embassy (3-Doc Set) → State of Qatar MOFA",
    purposeNote:
      "Qatar Embassy & Qatar MOFA strictly require Original Degree + All Final Year Marksheets + Original University Bonafide Certificate together.",
    timeline: "6–9 Working Days in New Delhi + Qatar MOFA",
  },
  {
    id: "mofa-poa-wakala",
    title: "Power of Attorney (POA / Wakala) & Legal Heir Certificate",
    categoryBadge: "Legal • Court, Property & Death Claim",
    chainSummary:
      "Notary + SDM (+ Arabic Translation) → Indian MEA → Gulf Embassy → MOFA",
    purposeNote:
      "Used for Saudi Sharia Courts, UAE/Kuwait property transactions, bank account closure, and death claim compensation (EOSB / GOSI).",
    timeline: "5–8 Working Days in New Delhi",
  },
  {
    id: "mofa-commercial",
    title: "Commercial Invoice, Certificate of Origin & Board Resolution",
    categoryBadge: "Commercial • Export & Branch Setup",
    chainSummary:
      "Chamber of Commerce → Indian MEA → Gulf Embassy → Destination MOFA",
    purposeNote:
      "Required for LLC/freezone company setup in Dubai/Abu Dhabi/Riyadh/Doha, bank account opening, and customs export clearance.",
    timeline: "5–8 Working Days (Chamber + MEA + Embassy)",
  },
];

const COUNTRY_MOFA_GUIDES = [
  {
    country: "United Arab Emirates (UAE MOFA / MOFAIC)",
    isoCode: "AE",
    slug: "/countries/uae-mofa-attestation",
    route: "State HRD/SDM → Indian MEA → UAE Embassy (New Delhi) → UAE MOFA",
    feeNote: "UAE Mission Fee: 150 AED • UAE MOFA Fee: 150 AED (Personal/Academic)",
    portal: "https://verify.mofa.gov.ae",
    details:
      "Even though UAE is not a Hague Apostille country, UAE has modernized its final attestation into a Combined Digital Embassy + MOFA e-Attestation Certificate. Without the prior Indian MEA and UAE Embassy New Delhi stamps, UAE MOFA will not attest an Indian certificate.",
  },
  {
    country: "State of Qatar (Qatar MOFA — Doha)",
    isoCode: "QA",
    slug: "/countries/qatar-attestation",
    route:
      "HRD/SDM → Indian MEA → Qatar Embassy (New Delhi) → Qatar MOFA (Doha)",
    feeNote:
      "Requires 3-Document Set for Degrees (Degree + Marksheets + Bonafide)",
    portal: "https://mofa.gov.qa",
    details:
      "Qatar is a Non-Hague country. For employment visas in Doha, educational degrees must be accompanied by final-year marksheets and a university bonafide certificate during Indian MEA and Qatar Embassy attestation before final Qatar MOFA stamping.",
  },
  {
    country: "State of Kuwait (Kuwait MOFA — Shuwaikh)",
    isoCode: "KW",
    slug: "/countries/kuwait-attestation",
    route:
      "State HRD/SDM → Indian MEA → Kuwait Embassy (New Delhi) → Kuwait MOFA",
    feeNote: "Mandatory for Article 18 Work Visa & Article 22 Family Visa",
    portal: "https://www.mofa.gov.kw",
    details:
      "Kuwait does not accept Hague Apostille. All Indian degrees, marriage certificates, birth certificates, and PCCs must complete Indian MEA + Embassy of the State of Kuwait (New Delhi) attestation before final stamping at the Kuwait Ministry of Foreign Affairs.",
  },
  {
    country: "Kingdom of Saudi Arabia (Saudi MOFA)",
    isoCode: "SA",
    slug: "/countries/saudi-arabia-attestation",
    route:
      "State HRD/SDM → MEA Apostille or Saudi Embassy → Saudi MOFA (Riyadh/Jeddah)",
    feeNote: "Hague Apostille for General Docs • Embassy + MOFA for Wakala/Commercial",
    portal: "https://www.mofa.gov.sa",
    details:
      "While Saudi Arabia accepts MEA Hague Apostille for standard personal and academic certificates, legal documents (Sharia Wakala, Legal Heir/Death Claim dossiers), commercial records, and specific ministry visas still require Royal Embassy of Saudi Arabia + Saudi MOFA attestation.",
  },
];

export const MOFA_ATTESTATION_FAQS: FAQItem[] = [
  {
    question:
      "What is the difference between MEA Attestation in India and MOFA Attestation?",
    answer:
      "In India, the foreign ministry is called the Ministry of External Affairs (MEA), located in New Delhi. In Gulf countries (UAE, Qatar, Kuwait, Saudi Arabia, Bahrain, Oman), the foreign ministry is called the Ministry of Foreign Affairs (MOFA). For an Indian document to receive a Gulf MOFA stamp, it must first be authenticated in India by State HRD/SDM, Indian MEA, and the respective Gulf Embassy in New Delhi.",
  },
  {
    question:
      "Can I get UAE MOFA or Qatar MOFA attestation directly without Indian MEA and Embassy stamps?",
    answer:
      "No. The Ministry of Foreign Affairs (MOFA) in UAE, Qatar, Kuwait, or Saudi Arabia only verifies the seal and signature of their own Embassy in New Delhi. Their Embassy in New Delhi will only stamp your document after it carries the Indian Ministry of External Affairs (MEA) stamp.",
  },
  {
    question:
      "What are the official government fees for Indian MEA and UAE Embassy + MOFA attestation?",
    answer:
      "In India, the official MEA government fee is ₹50 per document for the Normal Attestation stamp (plus a nominal ₹18–₹90 outsourced agency service fee). For UAE, the official consular fee is 150 AED for UAE Mission (Embassy) attestation and 150 AED for UAE MOFA attestation for personal/educational certificates.",
  },
  {
    question:
      "How can I verify my UAE MOFA attestation online?",
    answer:
      "Once your document receives the UAE digital attestation certificate, you can verify it online at the official UAE Ministry of Foreign Affairs portal (https://verify.mofa.gov.ae) using the Issue Date and Reference Number printed on the certificate.",
  },
  {
    question:
      "Is State HRD mandatory before MEA, Embassy, and MOFA attestation for degree certificates?",
    answer:
      "It depends on the destination country and university. Kuwait Embassy, Saudi Cultural Mission (SACM), and specific government employers require State HRD verification. However, for most UAE, Qatar, and Oman private-sector employment visas, the faster 2–3 working day Delhi SDM + MEA + Embassy route is widely accepted.",
  },
  {
    question:
      "What documents are required for Qatar Embassy and Qatar MOFA degree attestation?",
    answer:
      "For educational degree attestation for Qatar, you must submit three documents together: (1) Original Degree Certificate, (2) Original Final Year Marksheets / Transcripts, and (3) an Original Bonafide / Verification Certificate from your college or university, along with a clear Passport copy.",
  },
  {
    question:
      "Do I need MOFA attestation on Marriage and Birth Certificates for a Gulf Family Visa?",
    answer:
      "Yes. To sponsor your spouse or children on a family residence visa in UAE, Qatar, Kuwait, or Oman, your Indian Marriage Certificate and child's Birth Certificate must complete SDM/Home Dept → Indian MEA → Gulf Embassy in New Delhi → Destination MOFA attestation.",
  },
  {
    question:
      "How long does the complete MEA + Embassy + MOFA attestation process take from India?",
    answer:
      "The Indian leg (Delhi SDM + MEA + Gulf Embassy in New Delhi) typically takes 5 to 8 working days. For UAE, the combined Embassy + Digital MOFA attestation is issued together during the submission cycle. If State HRD verification is required first, add 7 to 15 working days depending on your state university.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const MOFA_ATTESTATION_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MOFA_ATTESTATION_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const MofaAttestationPage: React.FC<MofaAttestationPageProps> = ({
  onNavigate,
}) => {
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([
    "mofa-degree",
  ]);
  const [activeAnchorCardId, setActiveAnchorCardId] =
    useState<string>("mofa-degree");
  const [selectedSpecimen, setSelectedSpecimen] =
    useState<MofaSpecimenItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);

  const closeSpecimenModal = useCallback(() => {
    setSelectedSpecimen(null);
    setIsZoomed(false);
  }, []);

  useImagePopupHistory(
    Boolean(selectedSpecimen),
    closeSpecimenModal,
    "mofa-specimen"
  );

  useEffect(() => {
    applyRouteSEO("/services/mofa-attestation");
    document.title =
      "MOFA Attestation Services in India | UAE, Qatar, Kuwait & Saudi MOFA";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Complete MOFA Attestation Services from India for UAE, Qatar, Kuwait, Saudi Arabia, Bahrain & Oman. Coordinate State HRD/SDM, Indian MEA, Gulf Embassy & Digital MOFA verification."
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

  const toggleDocSelection = (id: string) => {
    setSelectedDocIds((prev) => {
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

  const selectedDocTitles = MOFA_SELECTABLE_DOCUMENTS.filter((d) =>
    selectedDocIds.includes(d.id)
  ).map((d) => d.title);

  const multiMofaWhatsAppMessage =
    selectedDocTitles.length > 0
      ? [
          `Hello ${BUSINESS_CONFIG.shortName}, I need MOFA Attestation (MEA + Gulf Embassy + MOFA) guidance for the following document(s):`,
          ``,
          ...selectedDocTitles.map((t, i) => `${i + 1}. ${t}`),
          ``,
          `Please confirm the exact State HRD/SDM, Indian MEA, Embassy, and MOFA fee & timeline.`,
        ].join("\n")
      : `Hello ${BUSINESS_CONFIG.shortName}, I need help with MOFA Attestation (UAE / Qatar / Kuwait / Saudi Arabia) from India.`;

  const renderMofaSelectionActionBar = () => (
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
            selectedDocIds.length > 0
              ? "Clear selection"
              : "Select MOFA document"
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
              ? "Tap the MOFA documents you have"
              : selectedDocIds.length === 1
              ? "1 document selected"
              : `${selectedDocIds.length} documents selected`}
          </span>
          {selectedDocTitles.length > 0 ? (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              {selectedDocTitles.join(", ")}
            </span>
          ) : (
            <span className="text-[11px] sm:text-xs font-semibold text-teal-300 truncate block mt-0.5">
              UAE • Qatar • Kuwait • Saudi • Bahrain • Oman
            </span>
          )}
        </div>
      </div>

      <a
        href={getWhatsAppUrl(multiMofaWhatsAppMessage)}
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
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-16 text-left">
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
              MOFA Attestation Services
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section (Matches Homepage & Core Service Pages) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider">
              MEA + Gulf Embassy + MOFA Route
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              UAE • Qatar • Kuwait • Saudi Arabia • Bahrain • Oman
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
            MOFA Attestation Services from India (Ministry of Foreign Affairs)
          </h1>

          <p className="text-base text-slate-200 leading-relaxed max-w-3xl">
            Complete end-to-end assistance for authenticating Indian educational, personal, legal, and commercial documents for Gulf &amp; Non-Hague countries. We coordinate Indian State HRD/SDM verification, Ministry of External Affairs (MEA) stamping, Foreign Embassy legalization in New Delhi, and final Ministry of Foreign Affairs (MOFA) attestation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppUrl(multiMofaWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat with us for MOFA Attestation</span>
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

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-6 sm:space-y-8">
        {/* CRITICAL WARNING / CLARIFICATION BOX (Indian MEA vs Destination MOFA) */}
        <div
          role="region"
          aria-label="Important Clarification on MEA vs MOFA Attestation"
          className="rounded-xl bg-red-50 border-2 border-red-200 p-4 sm:p-6 shadow-2xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-700" />
            </div>
            <div className="space-y-1.5 text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-800 block">
                Critical Rule — Indian MEA vs. Foreign MOFA Attestation
              </span>
              <p className="text-sm sm:text-base font-semibold text-red-950 leading-relaxed">
                Important: In India, the foreign ministry is the <strong>Ministry of External Affairs (MEA, New Delhi)</strong>, while in Gulf countries (UAE, Qatar, Kuwait, Saudi Arabia) it is called the <strong>Ministry of Foreign Affairs (MOFA)</strong>. You <strong>cannot</strong> submit an Indian document directly to UAE/Qatar/Kuwait MOFA—it must first carry <strong>Indian State/SDM + Indian MEA + Gulf Embassy (New Delhi)</strong> stamps.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Box */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency based in Connaught Place, New Delhi. We are not a government department, MEA, Foreign Embassy, or MOFA. Government fees (₹50 MEA fee + official Embassy/MOFA consular tariffs) and timelines apply. Our charges are separate for document coordination and secure courier logistics." />

        {/* Interactive Pre-filled WhatsApp Consultation Box (Placed near top with sequential shine animation) */}
        <DirectWhatsAppConsultationBox
          subjectName="MOFA Attestation (UAE, Qatar, Kuwait & Saudi)"
          shortName="MOFA Attestation"
          routeBadge="State/SDM → Indian MEA → Gulf Embassy → Destination MOFA"
          kickerText="Direct MOFA & Embassy Desk Consultation"
        />

        {/* REAL VERIFIED UAE MOFA + EMBASSY SPECIMEN PROOF CARD */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Real Verified Specimen Proof • Click Image to Zoom 2x
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
                How an Authentic MOFA &amp; Embassy Attested Document Looks
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>verify.mofa.gov.ae Verified</span>
            </span>
          </div>

          {MOFA_SPECIMEN_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-50 border border-slate-200/90 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center"
            >
              {/* Specimen Image Thumbnail */}
              <div className="lg:col-span-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSpecimen(item);
                    setIsZoomed(false);
                  }}
                  className="w-full group relative rounded-xl overflow-hidden border-2 border-slate-200 hover:border-[#0F766E] bg-white shadow-xs transition-all cursor-pointer text-left"
                >
                  <div className="aspect-[4/5] w-full bg-slate-100 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="px-3.5 py-2.5 bg-[#0A192F] text-white flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-amber-300 truncate">
                      {item.authorityBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-teal-300 shrink-0">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Tap to Zoom 2x</span>
                    </span>
                  </div>
                </button>
              </div>

              {/* Specimen Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded inline-block">
                    {item.privacyLabel}
                  </span>
                  <h3 className="text-base sm:text-xl font-extrabold text-[#0A192F] font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A192F] block">
                    Key Official Security Elements Shown on Specimen:
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {item.elementsVerified.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpecimen(item);
                      setIsZoomed(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4 text-amber-300" />
                    <span>Inspect Full MOFA Certificate</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(item.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Enquire for Similar MOFA Attestation</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 2. Content Block: The 4-Stage MOFA Legalization Chain from India */}
        <ContentCard
          title="How MOFA Attestation Works from India (4-Step Official Chain)"
          subtitle="Because Gulf countries require chain authentication, every Indian document passes through 4 sequential verifications before it is legally valid abroad:"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {[
              {
                step: "Step 1",
                badge: "Indian State Level",
                title: "State HRD / Delhi SDM / Chamber of Commerce",
                desc: "Educational degrees are authenticated by State HRD or Delhi SDM. Personal certificates (Marriage/Birth/PCC) are verified by SDM or State Home Dept. Commercial documents are stamped by the Chamber of Commerce.",
              },
              {
                step: "Step 2",
                badge: "Government of India",
                title: "Ministry of External Affairs (MEA, New Delhi)",
                desc: "After state/SDM authentication, the Ministry of External Affairs (MEA) in New Delhi affixes its official Normal Attestation stamp & signature on the reverse of the certificate (₹50 government fee).",
              },
              {
                step: "Step 3",
                badge: "Diplomatic Mission in India",
                title: "Destination Gulf Embassy Attestation (New Delhi)",
                desc: "The MEA-attested document is submitted to the Embassy of the destination country in New Delhi (UAE Embassy, Qatar Embassy, Kuwait Embassy, Saudi Embassy, Oman or Bahrain Embassy).",
              },
              {
                step: "Step 4",
                badge: "Final Destination Ministry",
                title: "Ministry of Foreign Affairs (MOFA) Attestation",
                desc: "Finally, the Ministry of Foreign Affairs (MOFA) of the Gulf country verifies its Embassy's seal (for UAE, this is now issued digitally as a combined UAE Embassy + MOFA e-Attestation certificate).",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 sm:p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#0A192F] text-amber-300 text-xs font-extrabold">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0A192F] font-display leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 3. Country-by-Country MOFA Guide (UAE, Qatar, Kuwait, Saudi Arabia) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              GCC &amp; Middle East Foreign Ministry Protocols
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              MOFA Attestation Requirements by Destination Country
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Each Gulf Cooperation Council (GCC) nation has specific documentation rules for Embassy and MOFA legalization:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COUNTRY_MOFA_GUIDES.map((item) => (
              <div
                key={item.country}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CountryFlag
                      isoCode={item.isoCode}
                      countryName={item.country}
                      size="md"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0A192F] font-display leading-snug">
                        {item.country}
                      </h3>
                      <span className="text-[11px] font-bold text-[#0F766E] block">
                        {item.feeNote}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-teal-50/80 border border-teal-200 text-xs font-bold text-teal-950">
                    Route: {item.route}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <a
                    href={item.slug}
                    onClick={(e) => handleLinkClick(e, item.slug)}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0F766E] hover:text-[#0A192F] transition-colors"
                  >
                    <span>Open Country Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={item.portal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#0F766E]"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Multi-Select Document Checklist for MOFA Attestation */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
              <span className="w-6 h-0.5 bg-[#0F766E] rounded-full" />
              <span>Documents We Assist With • Tap Your Documents</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Select the Documents You Need for MOFA Attestation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tick everything you need help with, then send one enquiry — the{" "}
              <strong className="text-[#0A192F]">Ask now</strong> bar appears
              right under the document you select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
            {MOFA_SELECTABLE_DOCUMENTS.map((doc) => {
              const isSelected = selectedDocIds.includes(doc.id);
              const isAnchorForBar = activeAnchorCardId === doc.id;
              return (
                <div key={doc.id} className="flex flex-col">
                  <div
                    onClick={() => toggleDocSelection(doc.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleDocSelection(doc.id);
                      }
                    }}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all duration-150 cursor-pointer select-none flex flex-col justify-between gap-3.5 shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "bg-white border-2 border-[#0A192F] ring-2 ring-[#0F766E]/15"
                        : "bg-white border-slate-200/90 hover:border-[#0F766E]"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-teal-50/70 px-2.5 py-1 rounded-md border border-teal-200 leading-snug">
                          {doc.categoryBadge}
                        </span>
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#0F766E] border-2 border-[#0F766E] text-white shadow-2xs"
                              : "bg-white border-2 border-slate-300 text-transparent"
                          }`}
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display leading-snug">
                        {doc.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {doc.purposeNote}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex flex-col gap-1.5 text-[11px] sm:text-xs">
                      <span className="font-extrabold text-[#0A192F] leading-snug">
                        {doc.chainSummary}
                      </span>
                      <span className="font-bold text-[#0F766E]">
                        {doc.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Inline Action Bar Directly Underneath the Selected / Active Document Card */}
                  {isAnchorForBar && renderMofaSelectionActionBar()}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Official Fees & Comparison Table: Indian MEA vs. Embassy vs. Destination MOFA */}
        <ContentCard
          title="Comparison: Indian MEA Attestation vs. Embassy Attestation vs. Gulf MOFA"
          subtitle="Understand the exact role, authority, and fee structure of each stage in the attestation chain:"
        >
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A192F] text-white">
                  <th className="py-3 px-3.5 font-bold border-b border-slate-800">
                    Stage &amp; Authority
                  </th>
                  <th className="py-3 px-3.5 font-bold border-b border-slate-800">
                    Jurisdiction &amp; Location
                  </th>
                  <th className="py-3 px-3.5 font-bold border-b border-slate-800">
                    Official Fee &amp; Output Format
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] align-top">
                    1. State HRD / SDM / Chamber
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 align-top">
                    State Secretariat / NCT of Delhi SDM / Chamber of Commerce
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 align-top">
                    Primary authentication seal verifying the Indian issuing authority.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] align-top">
                    2. Indian MEA Attestation
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 align-top">
                    Ministry of External Affairs (CPV Division, New Delhi)
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 align-top">
                    ₹50 Government Fee (+ nominal RAC fee). Official MEA ink stamp or Apostille sticker.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] align-top">
                    3. Foreign Embassy Attestation
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 align-top">
                    UAE / Qatar / Kuwait / Saudi Embassy in New Delhi (Chanakyapuri)
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 align-top">
                    Consular tariff per document (e.g., 150 AED for UAE Mission). Verifies the Indian MEA stamp.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3.5 font-bold text-[#0A192F] align-top">
                    4. Destination MOFA Attestation
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 align-top">
                    Ministry of Foreign Affairs in UAE, Qatar, Kuwait, Saudi Arabia, Oman, Bahrain
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 align-top">
                    Final legalization inside destination country / Digital MOFA Portal (e.g., 150 AED UAE MOFA fee).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 6. Required Documents Checklist */}
        <ContentCard title="Required Documents Checklist for MOFA & Embassy Legalization">
          <ul className="space-y-2.5 pt-1">
            {[
              "Original Certificate (Degree, Diploma, Marriage Certificate, Birth Certificate, PCC, POA, or Commercial Document) without plastic lamination.",
              "Clear Front & Back Passport Copy of the document holder (and spouse passport copy for Marriage Certificates).",
              "All Semester / Final Year Marksheets & University Bonafide Certificate (Strictly mandatory for Qatar Embassy & Qatar MOFA).",
              "Employer Offer Letter / Visa Copy or Sponsor ID (where requested by the specific Gulf Embassy).",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ContentCard>

        {/* 7. FAQs Section */}
        <FAQAccordion
          title="Frequently Asked Questions — MOFA Attestation Services"
          subtitle="Clear answers regarding Indian MEA vs. Foreign MOFA, UAE digital MOFA verification, Qatar 3-document rules, and timelines."
          items={MOFA_ATTESTATION_FAQS}
        />

        {/* 8. Quote Form */}
        <QuoteForm
          initialServiceSlug="/services/mofa-attestation"
          title="Request MOFA & Embassy Attestation Quotation"
          subtitle="Share your document category and destination Gulf country below. Our New Delhi desk will confirm the exact MEA, Embassy, and MOFA requirements."
        />
      </main>

      {/* Specimen 2x Zoom Modal */}
      {selectedSpecimen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedSpecimen.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
          onClick={closeSpecimenModal}
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
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-[#0B2545] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isZoomed ? "Fit Screen" : "Zoom 2x"}</span>
                </button>
                <button
                  type="button"
                  onClick={closeSpecimenModal}
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
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className={`w-full p-2 sm:p-3 flex items-center justify-center ${
                      isZoomed
                        ? "overflow-auto max-h-[65vh] items-start justify-start cursor-zoom-out"
                        : "overflow-hidden cursor-zoom-in"
                    }`}
                  >
                    <img
                      src={selectedSpecimen.image}
                      alt={selectedSpecimen.title}
                      className={`block rounded-lg border border-slate-200 bg-white shadow-2xs transition-all duration-200 ${
                        isZoomed
                          ? "w-[200%] max-w-none h-auto"
                          : "w-full h-auto max-h-[55vh] object-contain"
                      }`}
                    />
                  </div>
                </div>

                <div className="w-full lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-700">
                  <p className="text-slate-600 leading-relaxed text-xs">
                    {selectedSpecimen.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedSpecimen.elementsVerified.map((elem, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <span>{elem}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppUrl(selectedSpecimen.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Enquire About MOFA Attestation on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(MOFA_ATTESTATION_FAQ_SCHEMA),
        }}
      />
    </div>
  );
};
