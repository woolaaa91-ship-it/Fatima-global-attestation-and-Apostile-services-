import React, { useState, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
  Phone,
  MessageCircle,
  ExternalLink,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Clock,
  IndianRupee,
  FileText,
  Sparkles,
  FileSearch,
  ZoomIn,
  X,
  ArrowRight,
  Building2,
  Stamp,
  Globe,
  Laptop,
  Database,
  RefreshCw,
} from "lucide-react";
import { ContentCard } from "./PageLayout";
import { FAQAccordion } from "./FAQAccordion";
import { QuoteForm, QuotePrefillDetails } from "./QuoteForm";
import { useImagePopupHistory } from "../utils/modalHistory";
import { useSequentialBoxShine } from "../utils/useSequentialBoxShine";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";

const TwoByTwoGrid: React.FC<{
  items: { title: string; description: string }[];
}> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {items.map((item, idx) => (
      <div
        key={idx}
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-1.5"
      >
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
);

interface ESanadGuidePageProps {
  onNavigate: (path: string) => void;
}

interface ESanadDocCategoryItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  routeSummary: string;
  timeline: string;
  keyRequirement: string;
  whatsappText: string;
}

const ESANAD_DOCUMENT_CATEGORIES: ESanadDocCategoryItem[] = [
  {
    id: "verify-apostille-id",
    title: "Verify Existing MEA Apostille ('no.' Document ID)",
    badge: "Status Check",
    description:
      "Check the authenticity and live status of an already-issued MEA Apostille or e-Apostille sticker on esanad.nic.in/checkStatus.",
    routeSummary: "Locate 'no.' Document ID on Sticker → Enter on esanad.nic.in/checkStatus → Captcha → View Live Record",
    timeline: "Instant Online Portal Check (or Free WhatsApp Check by Our Team)",
    keyRequirement:
      "Must enter the alphanumeric/numeric Document ID next to 'no.' on the sticker—do NOT enter the bottom 7/8-digit sticker serial number.",
    whatsappText:
      "Hi, I want to verify my MEA Apostille Document ID ('no.' number) on the e-Sanad portal. Please assist.",
  },
  {
    id: "cbse-nad-digital",
    title: "CBSE / Central University Digital e-Sanad",
    badge: "NAD / DigiLocker",
    description:
      "Contactless e-Sanad attestation/apostille for certificates already hosted in the National Academic Depository (NAD) or DigiLocker.",
    routeSummary: "e-Sanad Portal Registration → Fetch via NAD/DigiLocker → BharatKosh Fee (₹50) → MEA Digital e-Apostille",
    timeline: "5–10 Working Days (Online Portal) | 2–3 Working Days via Physical Delhi SDM Route",
    keyRequirement:
      "Your exact name, roll number, and year of passing must exist in the issuing board/university's digital repository.",
    whatsappText:
      "Hi, I need guidance on CBSE / Central University digital e-Sanad vs fast-track physical Apostille.",
  },
  {
    id: "state-univ-degree-fallback",
    title: "State University Degree (Physical SDM / HRD Fallback)",
    badge: "Most Requested",
    description:
      "For state universities not integrated with e-Sanad digital repositories, or where the university PIA does not verify online.",
    routeSummary: "Physical Route: Notary Public → Delhi SDM (or State HRD) → MEA Physical Apostille Sticker",
    timeline: "2–3 Working Days (Delhi SDM + MEA) | 6–15+ Working Days (State HRD + MEA)",
    keyRequirement:
      "Original Degree Certificate + Clear Passport Copy (Avoids weeks of waiting on unverified e-Sanad portal requests).",
    whatsappText:
      "Hi, my university degree is not in DigiLocker/e-Sanad or is taking too long. I need physical SDM / HRD + MEA Apostille.",
  },
  {
    id: "birth-marriage-esanad",
    title: "Birth & Marriage Certificate (e-Sanad vs SDM Route)",
    badge: "Personal Docs",
    description:
      "Comparison and processing for Municipal Birth, Marriage, and PCC certificates through e-Sanad vs physical Delhi SDM + MEA.",
    routeSummary: "Fastest Route: Notary Public → Delhi SDM → MEA Physical Apostille (Accepted in 120+ Hague Nations)",
    timeline: "2–3 Working Days via Physical Delhi SDM + MEA Route",
    keyRequirement:
      "Clear original/digital municipal certificate with QR/barcode + Passport copy of certificate holder.",
    whatsappText:
      "Hi, I need Birth / Marriage Certificate Apostille and want to check e-Sanad vs 2-3 day Delhi SDM route.",
  },
  {
    id: "stuck-esanad-rescue",
    title: "Stuck / Pending e-Sanad Application Rescue",
    badge: "Urgent Deadlines",
    description:
      "Applied on esanad.nic.in and your status is stuck at 'Submitted / Pending with Issuing Authority (PIA)' with a visa deadline approaching?",
    routeSummary: "Switch to Physical Original Submission: Notary + Delhi SDM (or State HRD) + MEA Apostille via Outsourced Agency",
    timeline: "2–3 Working Days (Delhi SDM Fast-Track Route)",
    keyRequirement:
      "Original physical certificate + Passport copy (Note: Government fees already paid on e-Sanad are non-refundable by MEA).",
    whatsappText:
      "Hi, my e-Sanad application is stuck/pending with the Issuing Authority and I have an urgent visa deadline. Please help with physical fast-track.",
  },
  {
    id: "non-hague-embassy-route",
    title: "Non-Hague Embassy Legalization (UAE, Saudi, Qatar, Kuwait)",
    badge: "Gulf & Non-Hague",
    description:
      "Even if a document is verified on e-Sanad or by MEA, Gulf countries require physical Embassy & MOFA legalization stickers.",
    routeSummary: "Notary / SDM / HRD → MEA Attestation → Destination Embassy (New Delhi) → MOFA",
    timeline: "5–10 Working Days (Complete End-to-End Embassy Chain)",
    keyRequirement:
      "Original certificate + Passport copy (e-Sanad digital PDF alone is not sufficient without Embassy stamp for Gulf visas).",
    whatsappText:
      "Hi, I need document attestation for a Gulf / Non-Hague country (UAE / Saudi / Qatar / Kuwait) and need help with MEA + Embassy legalization.",
  },
];

interface ESanadEligibilitySelection {
  docCategory: string;
  repositoryStatus: string;
  destinationType: string;
}

const DOC_CATEGORY_OPTIONS = [
  "Already Apostilled Document — Need Status / Verification Check",
  "State University Degree / Marksheet (Paper Original)",
  "CBSE / ICSE / Central University Digital Certificate",
  "Birth / Marriage Certificate (Municipal / State Issued)",
  "Stuck / Pending e-Sanad Application — Need Fast-Track Alternative",
  "Passport Office Police Clearance Certificate (PSK PCC)",
];

const REPOSITORY_STATUS_OPTIONS = [
  "Have MEA Sticker — Checking 'no.' Document ID Status",
  "Physical Paper Certificate Only (Not in DigiLocker / NAD)",
  "Available in DigiLocker / NAD Digital Repository",
  "Applied on esanad.nic.in — Pending with Issuing Authority (PIA)",
];

const DESTINATION_TYPE_OPTIONS = [
  "Hague Convention Countries (Germany, Italy, USA, UK, Schengen, Australia)",
  "Non-Hague Countries (UAE, Saudi Arabia, Qatar, Kuwait, China, Vietnam)",
];

const ESANAD_GUIDE_FAQS = [
  {
    question: "Can all Indian documents be attested through e-Sanad?",
    answer:
      "No. Only documents issued by authorities, boards, or universities that are officially integrated with the e-Sanad digital repository (such as CBSE or specific state portals) can be processed completely online. Most older degrees, private documents, and state-issued certificates still require the physical attestation route.",
  },
  {
    question: "Why is my e-Sanad status not showing when I enter my sticker number?",
    answer:
      "A common mistake is entering the 7 or 8-digit serial number printed at the very bottom of the Apostille sticker. You must enter the 'Document ID' printed next to 'no.' in the middle-left section of the sticker (or your e-Sanad Application ID).",
  },
  {
    question: "How long does e-Sanad verification take?",
    answer:
      "For documents already available in a linked digital repository (NAD/DigiLocker), it can take a few working days. However, if the Issuing Authority must manually verify the record online, timelines depend entirely on that state department or university.",
  },
  {
    question: "What if my university is not listed on e-Sanad?",
    answer:
      "If your university or issuing authority is not integrated with e-Sanad, you must use the physical attestation route (State HRD or Delhi SDM verification followed by physical MEA submission through an authorized agency).",
  },
  {
    question: "Is the ₹50 government fee paid on esanad.nic.in refundable if my document is rejected?",
    answer:
      "No. According to official Ministry of External Affairs (MEA) e-Sanad guidelines, once the government fee (₹50 for Apostille / ₹40 for Normal Attestation) is paid via BharatKosh, it is strictly non-refundable—even if the Pre-Verification Issuing Authority (PIA) rejects the document due to mismatching details or non-availability of digital records.",
  },
  {
    question: "What should I do if my e-Sanad application is stuck at 'Pending with Issuing Authority'?",
    answer:
      "When you apply under the non-digital / paper document category on e-Sanad, your request is routed electronically to your university registrar or state department (PIA). Many state universities do not actively process online e-Sanad verifications, causing applications to remain stuck for weeks. If you have a university admission or work visa deadline, the fastest solution is to submit your physical original document through the Delhi SDM + MEA route (completed in 2–3 working days).",
  },
  {
    question: "Is a physical MEA Apostille sticker equally valid as an e-Sanad digital Apostille?",
    answer:
      "Yes. Both the physical computer-generated MEA Apostille sticker (affixed on the back of your original document) and the e-Sanad digital e-Apostille carry a unique 'no.' Document ID verifiable on esanad.nic.in/checkStatus. In fact, many foreign embassies and employers still prefer the physical original certificate bearing the tangible MEA Apostille sticker and official seal.",
  },
  {
    question: "Can I use e-Sanad alone for UAE, Saudi Arabia, Qatar, or Kuwait visas?",
    answer:
      "Not by itself. UAE, Saudi Arabia, Qatar, and Kuwait are Non-Hague Convention countries. Even if a document receives normal MEA attestation, it still requires physical Embassy Legalization (UAE Embassy, Saudi Culture/Embassy, Qatar Embassy, or Kuwait Embassy in New Delhi) followed by MOFA attestation.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const ESanadGuidePage: React.FC<ESanadGuidePageProps> = ({
  onNavigate,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    ESANAD_DOCUMENT_CATEGORIES[0].id
  );
  const [eligibility, setEligibility] = useState<ESanadEligibilitySelection>({
    docCategory: DOC_CATEGORY_OPTIONS[0],
    repositoryStatus: REPOSITORY_STATUS_OPTIONS[0],
    destinationType: DESTINATION_TYPE_OPTIONS[0],
  });
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefillDetails | null>(
    null
  );
  const [activeSampleModal, setActiveSampleModal] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const inlineAskNowRef = useRef<HTMLDivElement | null>(null);

  useImagePopupHistory(
    Boolean(activeSampleModal),
    () => {
      setActiveSampleModal(null);
      setIsZoomed(false);
    },
    "esanad-step-specimen-popup"
  );

  const selectedCategory =
    ESANAD_DOCUMENT_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    ESANAD_DOCUMENT_CATEGORIES[0];

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        inlineAskNowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 60);
    }
  };

  // Compute dynamic recommendation for the 3-dropdown e-Sanad Eligibility & Route Finder
  const getEligibilityOutcome = () => {
    const isNonHague = eligibility.destinationType.includes("Non-Hague");
    const isStatusCheck =
      eligibility.docCategory.includes("Already Apostilled") ||
      eligibility.repositoryStatus.includes("Have MEA Sticker");
    const isStuck =
      eligibility.docCategory.includes("Stuck / Pending") ||
      eligibility.repositoryStatus.includes("Pending with Issuing Authority");
    const isDigitalRepo =
      eligibility.repositoryStatus.includes("Available in DigiLocker") ||
      eligibility.docCategory.includes("CBSE / ICSE");

    if (isStatusCheck) {
      return {
        badge: "Instant Online Status Verification",
        routeTitle:
          "Locate 'no.' Document ID on Sticker → Verify at esanad.nic.in/checkStatus",
        estimatedTime: "Instant Online Check (Free Portal Verification)",
        feeSummary:
          "₹0 Verification Fee on Official Portal (Do NOT enter bottom sticker serial number)",
        explanation:
          "Look at the middle-left of your MEA Apostille sticker right next to 'no.' (for example: A2506187450 or HRSI0002039326). Enter that exact Document ID on esanad.nic.in/checkStatus along with the captcha code to see your live government record.",
      };
    }

    if (isNonHague) {
      return {
        badge: "Non-Hague Embassy Legalization Required",
        routeTitle:
          "Notary / SDM or State HRD → Physical MEA Attestation → Destination Embassy → MOFA",
        estimatedTime: "5–10 Working Days (Complete MEA + Embassy Legalization)",
        feeSummary:
          "MEA Normal Attestation + Official Embassy Consular Fees + Agency Coordination",
        explanation:
          "Gulf and Non-Hague nations (UAE, Saudi Arabia, Qatar, Kuwait, China) do not accept a standalone Apostille or e-Sanad digital PDF. Your physical document must undergo pre-authentication, MEA normal attestation, and physical Embassy stamping in New Delhi.",
      };
    }

    if (isStuck || !isDigitalRepo) {
      return {
        badge: "Recommended Fast-Track Physical Alternative",
        routeTitle:
          "Original Certificate → Notary Public → Delhi SDM Verification → MEA Physical Apostille Sticker",
        estimatedTime: "2–3 Working Days (Physical Delhi SDM + MEA Route)",
        feeSummary:
          "₹50 Official MEA Apostille Fee + Outsourced Agency Fee + SDM/Notary Coordination",
        explanation:
          "When a certificate is not in DigiLocker/NAD or your university PIA does not respond online on esanad.nic.in, online applications can remain stuck for weeks. Submitting the physical original via the Delhi SDM + MEA route completes genuine MEA Apostille in 2–3 working days.",
      };
    }

    return {
      badge: "Eligible for Digital e-Sanad OR 2–3 Day Physical SDM Route",
      routeTitle:
        "Option A: Online e-Sanad (NAD/DigiLocker) | Option B: Physical Delhi SDM + MEA (2–3 Days)",
      estimatedTime:
        "5–10 Working Days (Online Portal) OR 2–3 Working Days (Physical SDM Route)",
      feeSummary:
        "₹50 Official MEA Fee via BharatKosh (Online) or Physical Outsourced Submission",
      explanation:
        "Because your certificate is hosted in NAD/DigiLocker, you can apply online at esanad.nic.in. However, if your foreign university or visa office requires the physical original certificate bearing the tangible MEA Apostille sticker on the back, choose the 2–3 day Delhi SDM + MEA physical route.",
    };
  };

  const outcome = getEligibilityOutcome();
  const {
    containerRef: finderBoxRef,
    activeStep: activeFinderStep,
    guideToStep,
  } = useSequentialBoxShine(3);

  const handlePrefillQuoteFromFinder = () => {
    setQuotePrefill({
      destinationCountry: eligibility.destinationType,
      documentDetails: `Category: ${eligibility.docCategory} | Status: ${eligibility.repositoryStatus} | Recommended Route: ${outcome.routeTitle} (${outcome.estimatedTime})`,
      timestamp: Date.now(),
    });
    const el = document.getElementById("esanad-quote-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Structured Data for SEO (FAQPage + HowTo + GovernmentService Reference) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "HowTo",
                name: "How to Check Your e-Sanad Status & Verify MEA Apostille Online",
                description:
                  "Step-by-step official guide to verifying an MEA Apostille sticker or checking e-Sanad application status on esanad.nic.in/checkStatus using the Document ID ('no.') or Application ID.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Find your Document ID",
                    text: "Locate the Document ID next to 'no' on the MEA Apostille sticker. Do not use the bottom Sticker Serial Number.",
                    image:
                      "https://fatimaglobalattestation.com/assets/aistudio/esanad_step1_doc_id.png",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter details on the e-Sanad portal",
                    text: "Visit https://esanad.nic.in/checkStatus, enter your Application ID or Document ID, type the Captcha, and click Submit.",
                    image:
                      "https://fatimaglobalattestation.com/assets/aistudio/esanad_step2_portal.png",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Check the result shown by the portal",
                    text: "View your Application ID, Document ID, and live application status displayed by the portal.",
                    image:
                      "https://fatimaglobalattestation.com/assets/aistudio/esanad_step3_result.png",
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: ESANAD_GUIDE_FAQS.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#0B2545] text-slate-300 text-xs pt-3.5 pb-1 px-4">
        <nav
          aria-label="Breadcrumb"
          className="max-w-5xl mx-auto flex flex-wrap items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-400">Guides</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-teal-400 font-semibold">e-Sanad Guide</span>
        </nav>
      </div>

      {/* Hero Section (Preserved 100% Intact) */}
      <section className="bg-[#0B2545] text-white pt-6 pb-10 sm:pt-8 sm:pb-14 px-4 border-b-4 border-teal-600 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4">
            Official Portal Reference • MEA & NIC Digital Attestation
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 font-display">
            e-Sanad Guide: Application, Status, and Document IDs
          </h1>
          <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-8">
            e-Sanad is an initiative by the Ministry of External Affairs (MEA) and NIC to provide contactless, paperless, and faceless document attestation and apostille services in India. Learn how to navigate the online portal.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={getWhatsAppUrl("Hi, I need help with e-Sanad document processing")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Need help with e-Sanad?
            </a>
            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              Call {BUSINESS_CONFIG.displayPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* 1. CRITICAL WARNING BOX (Placed right below Hero) */}
        <div
          role="alert"
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 sm:p-6 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-700" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-red-100 text-red-900 text-[11px] font-extrabold uppercase tracking-wider">
                Critical Portal & Verification Rules (Read Before Using e-Sanad)
              </div>
              <p className="text-red-950 font-bold text-sm sm:text-base leading-relaxed">
                Important: (1) To check your Apostille status on{" "}
                <span className="underline decoration-red-400">
                  esanad.nic.in/checkStatus
                </span>
                , you MUST enter the{" "}
                <span className="bg-red-100 px-1.5 py-0.5 rounded font-extrabold">
                  Document ID printed next to &ldquo;no.&rdquo;
                </span>{" "}
                in the middle-left of the sticker—do NOT enter the 7 or 8-digit
                Sticker Serial Number at the bottom. (2) Most state universities
                and older municipal certificates are NOT linked to e-Sanad&apos;s
                digital repository; if your application is stuck at{" "}
                <em>&ldquo;Pending with Issuing Authority&rdquo;</em> or your
                university is not integrated, you must use the physical{" "}
                <strong>Delhi SDM + MEA (2–3 working days)</strong> or{" "}
                <strong>State HRD + MEA</strong> attestation route.
              </p>
            </div>
          </div>
        </div>

        {/* Preserved DisclaimerBox */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-950 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            Fatima Global Attestation is a private assistance agency. We are not the e-Sanad portal, MEA, or a government body. We assist clients in understanding the process and coordinating physical/document verification where required.
          </p>
        </div>

        {/* 2. Content Block 1: What is e-Sanad? (Preserved + Expanded with 3 Route Cards) */}
        <ContentCard title="What is e-Sanad? & How the 3 Verification Routes Work">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-5">
            e-Sanad is an online portal (esanad.nic.in) designed to simplify the document attestation process. Instead of physically visiting multiple government offices, eligible digital documents can be uploaded, verified by the issuing authority, and digitally signed by the MEA.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Route 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <Database className="w-3.5 h-3.5" />
                  Route 1 • Digital Repository
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  NAD / DigiLocker Integrated e-Sanad
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Only for boards and central universities integrated with the
                  government&apos;s digital repository (e.g., recent CBSE mark
                  sheets or NAD-enabled universities). The document is fetched
                  digitally and issued an e-Apostille after ₹50 BharatKosh fee
                  payment.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] font-bold text-teal-800">
                Timeline: 5–10 Working Days (Online Portal)
              </div>
            </div>

            {/* Route 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <Laptop className="w-3.5 h-3.5" />
                  Route 2 • Non-Repository Paper Upload
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  State PIA Online Verification Route
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For non-digital certificates where the applicant uploads a
                  scanned PDF on esanad.nic.in. The request goes to the State
                  Pre-Verification Issuing Authority (PIA) or University
                  Registrar. Often delayed if the university does not verify
                  online.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] font-bold text-amber-800">
                Timeline: 2–6+ Weeks (Depends on University PIA)
              </div>
            </div>

            {/* Route 3 */}
            <div className="bg-teal-50/60 border-2 border-teal-500/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <Stamp className="w-3.5 h-3.5" />
                  Route 3 • Fastest Physical Fallback
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  Physical Delhi SDM / State HRD + MEA
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  When your university is not on e-Sanad, or your visa requires
                  the physical original certificate with the tangible MEA
                  Apostille sticker on the back. Completed via Notary + Delhi
                  SDM (or State HRD) + MEA.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-teal-200 text-[11px] font-extrabold text-teal-900">
                Timeline: 2–3 Working Days (Delhi SDM + MEA)
              </div>
            </div>
          </div>
        </ContentCard>

        {/* 3. OFFICIAL GOVERNMENT PORTAL: Verify Government Apostille / How to Check Your e-Sanad Status (100% Preserved + Enhanced with Click-to-Zoom) */}
        <section
          id="verify-esanad-steps"
          className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-8 lg:p-10"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Official Government Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight font-display">
                Verify Government Apostille
              </h2>
              <p className="text-base sm:text-lg font-bold text-teal-700 mt-1">
                How to Check Your e-Sanad Status
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Follow these 3 simple steps to verify your document online on the
              official Government of India e-Sanad portal. (Click any image to
              inspect in 2x zoom).
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mt-7">
            {/* Step 1 */}
            <div className="flex flex-col bg-slate-50/70 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-amber-300 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  Step 1
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0B2545] leading-snug">
                    Find your Document ID
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Use the{" "}
                    <span className="font-bold text-emerald-700">
                      Document ID
                    </span>{" "}
                    next to <span className="font-bold">&ldquo;no&rdquo;</span>{" "}
                    on the portal (do{" "}
                    <span className="font-bold text-red-600 underline">not</span>{" "}
                    use the bottom Sticker Serial Number).
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setActiveSampleModal({
                    src: "/assets/aistudio/esanad_step1_doc_id.png",
                    title: "Step 1: Find Your Document ID ('no.' Number) on the MEA Apostille Sticker",
                    subtitle:
                      "Always enter the Document ID printed next to 'no.' (green box). Never enter the bottom 7/8-digit sticker serial number (red box).",
                  })
                }
                className="p-3 sm:p-4 flex-1 flex items-center justify-center bg-slate-100/70 cursor-zoom-in group relative"
              >
                <img
                  src="/assets/aistudio/esanad_step1_doc_id.png"
                  alt="Step 1: Locate Document ID next to no. on Apostille sticker and avoid bottom Sticker Serial Number"
                  className="w-full h-auto max-h-80 object-contain rounded-xl border border-slate-200 bg-white shadow-xs group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
                <span className="absolute bottom-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545]/85 text-white text-[11px] font-semibold backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  Zoom
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col bg-slate-50/70 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-amber-300 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  Step 2
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0B2545] leading-snug">
                    Enter details on the e-Sanad portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Enter your{" "}
                    <span className="font-bold text-slate-800">
                      Application ID
                    </span>{" "}
                    OR{" "}
                    <span className="font-bold text-slate-800">
                      Document ID
                    </span>
                    , type the Captcha, and click{" "}
                    <span className="font-bold text-teal-700">Submit</span>.
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setActiveSampleModal({
                    src: "/assets/aistudio/esanad_step2_portal.png",
                    title: "Step 2: Enter Document ID or Application ID on esanad.nic.in/checkStatus",
                    subtitle:
                      "Enter the Document ID ('no.' number) or Application ID, solve the Captcha, and click Submit.",
                  })
                }
                className="p-3 sm:p-4 flex-1 flex items-center justify-center bg-slate-100/70 cursor-zoom-in group relative"
              >
                <img
                  src="/assets/aistudio/esanad_step2_portal.png"
                  alt="Step 2: Enter Application ID or Document ID and Captcha on official e-Sanad status page"
                  className="w-full h-auto max-h-80 object-contain rounded-xl border border-slate-200 bg-white shadow-xs group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
                <span className="absolute bottom-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545]/85 text-white text-[11px] font-semibold backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  Zoom
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col bg-slate-50/70 rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
              <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-amber-300 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  Step 3
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0B2545] leading-snug">
                    Check the result shown by the portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    View your{" "}
                    <span className="font-bold text-slate-800">
                      Application ID
                    </span>
                    ,{" "}
                    <span className="font-bold text-slate-800">
                      Document ID
                    </span>
                    , and live{" "}
                    <span className="font-bold text-emerald-700">
                      application status
                    </span>{" "}
                    displayed by the portal.
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setActiveSampleModal({
                    src: "/assets/aistudio/esanad_step3_result.png",
                    title: "Step 3: Live e-Sanad Portal Status Verification Output",
                    subtitle:
                      "Official verification result showing Application ID, Document ID, and verified status on esanad.nic.in.",
                  })
                }
                className="p-3 sm:p-4 flex-1 flex items-center justify-center bg-slate-100/70 cursor-zoom-in group relative"
              >
                <img
                  src="/assets/aistudio/esanad_step3_result.png"
                  alt="Step 3: Check Application Status result on the official e-Sanad portal"
                  className="w-full h-auto max-h-80 object-contain rounded-xl border border-slate-200 bg-white shadow-xs group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
                <span className="absolute bottom-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545]/85 text-white text-[11px] font-semibold backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  Zoom
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Tip & Action Button */}
          <div className="mt-7 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-amber-50/60 rounded-2xl p-4 sm:p-5 border border-amber-200/70">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-extrabold text-[#0B2545]">Tip:</span>{" "}
                Always enter the{" "}
                <span className="font-bold text-emerald-800">Document ID</span>{" "}
                or{" "}
                <span className="font-bold text-[#0B2545]">Application ID</span>
                ,{" "}
                <span className="font-bold text-red-700 underline">not</span>{" "}
                the Sticker Serial Number at the bottom.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://esanad.nic.in/checkStatus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B2545] hover:bg-slate-900 text-amber-300 font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Check Your Apostille</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-right mt-2.5">
            Redirects to the official Government of India e-Sanad portal (
            <span className="font-mono text-slate-600">
              esanad.nic.in/checkStatus
            </span>
            )
          </p>
        </section>

        {/* 4. Interactive e-Sanad Eligibility, Status & Alternative Route Finder */}
        <section
          ref={finderBoxRef}
          className="bg-gradient-to-br from-[#0B2545] via-[#0f3159] to-[#133b69] text-white rounded-3xl p-5 sm:p-8 shadow-lg border border-teal-500/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive e-Sanad Route & Status Checker
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 font-display">
                Check If Your Certificate Works on e-Sanad or Needs 2–3 Day SDM Route
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Select your document category, current repository/sticker status,
              and destination country to see the exact verification path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Dropdown 1 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                1. Document / Scenario Category
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 1 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={eligibility.docCategory}
                  onChange={(e) => {
                    setEligibility((prev) => ({
                      ...prev,
                      docCategory: e.target.value,
                    }));
                    guideToStep(2);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {DOC_CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                2. Digital Repository / Sticker Status
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 2 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={eligibility.repositoryStatus}
                  onChange={(e) => {
                    setEligibility((prev) => ({
                      ...prev,
                      repositoryStatus: e.target.value,
                    }));
                    guideToStep(3);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {REPOSITORY_STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                3. Destination Country Type
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 3 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={eligibility.destinationType}
                  onChange={(e) => {
                    setEligibility((prev) => ({
                      ...prev,
                      destinationType: e.target.value,
                    }));
                    guideToStep(0, 0);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {DESTINATION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-extrabold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                {outcome.badge}
              </span>
              <span className="text-xs font-bold text-teal-300">
                Est. Time: {outcome.estimatedTime}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
              {outcome.routeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {outcome.explanation}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/15">
              <div className="text-xs text-slate-300">
                <span className="font-bold text-teal-300">Fee Structure:</span>{" "}
                {outcome.feeSummary}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrefillQuoteFromFinder}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Get Route Estimate
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Hi, I checked the e-Sanad Route Finder:\n• Category: ${eligibility.docCategory}\n• Status: ${eligibility.repositoryStatus}\n• Destination: ${eligibility.destinationType}\nPlease advise on the fastest process.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp This Route
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive e-Sanad & Physical Fallback Selector with Inline "Ask now" Bar */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
                Select Your Specific e-Sanad Scenario
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] mt-1 font-display">
                e-Sanad Status Verification & Physical Fallback Assistance
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Tap any card below to view requirements and ask our team directly
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ESANAD_DOCUMENT_CATEGORIES.map((item) => {
              const isSelected = item.id === selectedCategoryId;
              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(item.id)}
                    className={`text-left rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0B2545] text-white border-teal-500 shadow-md ring-2 ring-teal-500/30"
                        : "bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-teal-500/20 text-teal-300 border border-teal-400/30"
                              : "bg-teal-50 text-teal-800 border border-teal-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            isSelected ? "text-amber-300" : "text-teal-700"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select →"}
                        </span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-extrabold leading-snug mb-1.5 ${
                          isSelected ? "text-white" : "text-[#0B2545]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>

                  {/* Mobile Inline "Ask now" Panel right below the selected card */}
                  {isSelected && (
                    <div
                      ref={inlineAskNowRef}
                      className="sm:hidden col-span-1 bg-teal-50/90 border-2 border-teal-600 rounded-xl p-4 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-900">
                          Selected Scenario Details
                        </span>
                        <span className="text-[11px] font-bold text-[#0B2545]">
                          {selectedCategory.timeline}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#0B2545]">
                        Route: {selectedCategory.routeSummary}
                      </p>
                      <p className="text-xs text-slate-700">
                        <span className="font-bold">Key Rule:</span>{" "}
                        {selectedCategory.keyRequirement}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={getWhatsAppUrl(selectedCategory.whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#25D366] text-white font-extrabold text-xs shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Ask now on WhatsApp
                        </a>
                        <a
                          href={`tel:${BUSINESS_CONFIG.telPhone}`}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg bg-[#0B2545] text-white font-bold text-xs"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-300" />
                          Call
                        </a>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Desktop/Tablet Inline "Ask now" Bar below grid */}
          <div className="hidden sm:flex mt-5 bg-gradient-to-r from-teal-50 via-white to-teal-50/70 border-2 border-teal-600/40 rounded-xl p-4 sm:p-5 items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0B2545] text-teal-300 text-[11px] font-extrabold uppercase tracking-wider">
                  {selectedCategory.badge}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                  {selectedCategory.title}
                </h4>
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-bold text-[#0B2545]">Verified Route:</span>{" "}
                {selectedCategory.routeSummary} •{" "}
                <span className="font-bold text-teal-800">
                  {selectedCategory.timeline}
                </span>
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Requirement:</span>{" "}
                {selectedCategory.keyRequirement}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={getWhatsAppUrl(selectedCategory.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Ask now
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.telPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                {BUSINESS_CONFIG.displayPhone}
              </a>
            </div>
          </div>
        </section>

        {/* 6. Content Block 2: Official e-Sanad & MEA Fees & Timelines (2x2 Grid from Homepage) */}
        <ContentCard title="Official e-Sanad & MEA Fees, Refund Rules & Timelines">
          <TwoByTwoGrid
            items={[
              {
                title: "Official MEA e-Sanad Fee (₹50 / ₹40)",
                description:
                  "On esanad.nic.in, the statutory MEA fee via BharatKosh is ₹50 per document for e-Apostille and ₹40 for Normal Attestation. Note: BharatKosh government payments are strictly non-refundable if your Issuing Authority rejects the record.",
              },
              {
                title: "Document ID ('no.') vs. Sticker Serial Number",
                description:
                  "Every genuine MEA Apostille sticker has two numbers: the 'no.' Document ID in the middle-left (used on esanad.nic.in/checkStatus) and a 7/8-digit stationary serial number at the bottom. Always enter the 'no.' Document ID.",
              },
              {
                title: "Online Portal vs. Physical SDM Timelines",
                description:
                  "NAD/DigiLocker digital certificates take 5–10 working days online. Non-repository state university applications on e-Sanad can remain pending for weeks. The physical Delhi SDM + MEA route takes just 2–3 working days.",
              },
              {
                title: "Each Certificate Requires Separate Verification",
                description:
                  "Whether applying through e-Sanad or physical MEA submission, each degree, provisional certificate, transcript, or mark sheet is treated as a separate public document requiring its own ₹50 MEA fee and unique Document ID.",
              },
            ]}
          />
        </ContentCard>

        {/* 7. Detailed Comparison Table: Online e-Sanad Portal vs Physical Delhi SDM + MEA vs Physical State HRD + MEA */}
        <ContentCard title="Comparison: Online e-Sanad Portal vs. Physical Delhi SDM Route vs. Physical State HRD">
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0B2545] text-white">
                  <th className="py-3 px-3.5 rounded-tl-xl font-bold">
                    Feature / Criterion
                  </th>
                  <th className="py-3 px-3.5 font-bold">
                    Online e-Sanad Portal (esanad.nic.in)
                  </th>
                  <th className="py-3 px-3.5 font-bold text-teal-300">
                    Physical Delhi SDM + MEA Route
                  </th>
                  <th className="py-3 px-3.5 rounded-tr-xl font-bold">
                    Physical State HRD / Home + MEA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Eligible Documents
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Primarily NAD / DigiLocker integrated boards (CBSE, select
                    central institutions)
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 font-semibold bg-teal-50/40">
                    All Indian Degrees, Birth, Marriage, PCC, Affidavits (All 28
                    States & UTs)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    State University Degrees where foreign embassy mandates
                    State HRD stamp
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Typical Processing Time
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    5–10 days (Digital Repo) | 2–6+ weeks if State PIA must
                    verify manually
                  </td>
                  <td className="py-3 px-3.5 text-teal-900 font-extrabold bg-teal-50/40">
                    2–3 Working Days (Fastest & Most Predictable)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    6–15+ Working Days (Depends on University Registrar reply)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Output Format
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Downloadable PDF e-Apostille with digital signature
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 font-semibold bg-teal-50/40">
                    Physical Original Certificate bearing MEA Apostille Sticker +
                    Official Stamp
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Physical Original Certificate bearing State HRD Seal + MEA
                    Apostille Sticker
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Verifiable on esanad.nic.in/checkStatus?
                  </td>
                  <td className="py-3 px-3.5 text-emerald-700 font-bold">
                    Yes (via Application ID / Document ID)
                  </td>
                  <td className="py-3 px-3.5 text-emerald-700 font-bold bg-teal-50/40">
                    Yes (via &ldquo;no.&rdquo; Document ID printed on the
                    physical MEA sticker)
                  </td>
                  <td className="py-3 px-3.5 text-emerald-700 font-bold">
                    Yes (via &ldquo;no.&rdquo; Document ID printed on the
                    physical MEA sticker)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Risk of Stuck Application
                  </td>
                  <td className="py-3 px-3.5 text-amber-800 font-medium">
                    High for non-DigiLocker state degrees (PIA often unresponsive)
                  </td>
                  <td className="py-3 px-3.5 text-teal-900 font-bold bg-teal-50/40">
                    Minimal — Pre-screened before physical submission
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Moderate — Requires university verification letter
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 8. Content Block 3: Required Documents & Details Checklist */}
        <ContentCard title="Required Checklist for e-Sanad Status Check & Physical MEA Fallback">
          <p className="text-slate-600 text-xs sm:text-sm mb-4">
            Keep the following details ready depending on whether you are
            verifying an existing Apostille sticker online or submitting
            documents for physical attestation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              {
                title: "For Online Apostille Status Check (esanad.nic.in/checkStatus)",
                detail:
                  "Exact alphanumeric/numeric Document ID printed next to 'no.' on the MEA Apostille sticker (or your 14+ digit e-Sanad Application ID).",
              },
              {
                title: "For Digital Repository e-Sanad Application",
                detail:
                  "Active DigiLocker / NAD account linked with your Aadhaar/Mobile, exact Roll Number, Year of Passing, and clear Passport scan.",
              },
              {
                title: "For Fast-Track Physical Delhi SDM + MEA Route (2–3 Days)",
                detail:
                  "Original Certificate (Degree, Birth, Marriage, PCC, or Affidavit) + Clear Front & Back Passport Copy of the document holder.",
              },
              {
                title: "For State HRD / Home Department Route",
                detail:
                  "Original Degree Certificate, All Year/Semester Mark Sheets, University Enrollment details, and Passport Copy.",
              },
              {
                title: "Name & Date of Birth Consistency Check",
                detail:
                  "Ensure the spelling of your name on the certificate matches your passport. Minor discrepancies can trigger automatic rejection on e-Sanad.",
              },
              {
                title: "For Non-Hague Gulf Countries (UAE, Saudi, Qatar, Kuwait)",
                detail:
                  "Original certificate + Passport copy + Visa/Offer Letter copy (if required by the specific Gulf Embassy in New Delhi).",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#0B2545]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 9. 4-Step How Our e-Sanad & Physical Attestation Assistance Works */}
        <ContentCard title="How We Help When e-Sanad Is Confusing, Unavailable, or Stuck">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Free Sticker / Eligibility Audit",
                desc: "Share a photo of your certificate or MEA Apostille sticker on WhatsApp. We verify whether your university is active on e-Sanad or check your 'no.' Document ID status.",
              },
              {
                step: "02",
                title: "Correct Route Selection",
                desc: "We advise honestly whether you can complete it yourself on esanad.nic.in for ₹50 or if you need the 2–3 day physical Delhi SDM / State HRD route.",
              },
              {
                step: "03",
                title: "Physical Pre-Authentication & MEA",
                desc: "For non-digital certificates or urgent visa deadlines, we coordinate Notary, Delhi SDM (or State HRD), and official MEA Apostille sticker issuance.",
              },
              {
                step: "04",
                title: "Portal Verification & Secure Delivery",
                desc: "Before dispatching your original document via tracked courier, we share the 'no.' Document ID so you can verify it live on esanad.nic.in/checkStatus.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0B2545] text-teal-300 font-extrabold text-xs mb-3">
                  {item.step}
                </span>
                <h3 className="text-sm font-extrabold text-[#0B2545] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 10. Why Choose Fatima Global for e-Sanad & Physical MEA Coordination */}
        <ContentCard title="Why Applicants Consult Fatima Global for e-Sanad & Physical Apostille">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0B2545] mb-1">
                Honest Digital vs. Physical Advice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your certificate is eligible for self-service online e-Sanad,
                we tell you upfront. If your university PIA does not respond
                online, we save you weeks of delay via the physical route.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0B2545] mb-1">
                2–3 Day Rescue for Stuck Cases
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have an upcoming student visa or work permit appointment while
                your e-Sanad application is stuck at &ldquo;Submitted&rdquo;? We
                execute physical Delhi SDM + MEA Apostille in 2–3 working days.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0B2545] mb-1">
                100% Verifiable &lsquo;no.&rsquo; Document IDs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every physical MEA Apostille sticker we coordinate carries an
                authentic government Document ID next to &ldquo;no.&rdquo; that
                you can verify directly on esanad.nic.in/checkStatus.
              </p>
            </div>
          </div>
        </ContentCard>

        {/* 11. Official Government Portals & Reference Links */}
        <ContentCard title="Official Government e-Sanad & MEA Portal Links">
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            For direct self-service applications and official status checks, use
            these official Government of India portals:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: "e-Sanad Status Verification",
                url: "https://esanad.nic.in/checkStatus",
                desc: "Verify Apostille 'no.' Document ID or Application ID",
              },
              {
                label: "e-Sanad Main Portal",
                url: "https://esanad.nic.in/",
                desc: "Official NIC & MEA Contactless Attestation Portal",
              },
              {
                label: "e-Sanad Official FAQs",
                url: "https://esanad.nic.in/faq",
                desc: "Government instructions on NAD & PIA verification",
              },
              {
                label: "MEA Apostille Guidelines",
                url: "https://www.mea.gov.in/apostille-menu.htm",
                desc: "Ministry of External Affairs CPV Division rules",
              },
            ].map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 hover:bg-[#0B2545] border border-slate-200 hover:border-[#0B2545] rounded-xl p-3.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold text-[#0B2545] group-hover:text-teal-300">
                      {portal.label}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 group-hover:text-slate-200 leading-relaxed">
                    {portal.desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-teal-700 group-hover:text-amber-300 mt-2 truncate">
                  {portal.url.replace("https://", "")}
                </span>
              </a>
            ))}
          </div>
        </ContentCard>

        {/* 12. Related Attestation & Apostille Services Internal Links */}
        <ContentCard title="Related MEA Apostille, State HRD & Embassy Services">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: "Degree Certificate Apostille",
                desc: "Delhi SDM vs State HRD vs e-Sanad routes for Indian universities",
                path: "/services/degree-certificate-apostille",
              },
              {
                title: "MEA Apostille Services in India",
                desc: "Physical MEA sticker for 120+ Hague Convention countries",
                path: "/services/apostille",
              },
              {
                title: "Notary Public & SDM Attestation",
                desc: "First-stage Notary and Sub-Divisional Magistrate verification",
                path: "/services/notary-public",
              },
              {
                title: "Embassy Legalization Services",
                desc: "Full attestation chain for Non-Hague & Gulf nations",
                path: "/services/embassy-legalization",
              },
              {
                title: "Commercial Document Attestation",
                desc: "Chamber of Commerce + MEA Apostille for corporate exports",
                path: "/services/commercial-document-attestation",
              },
              {
                title: "Certified Document Translation",
                desc: "Arabic, German, Italian, French & Spanish visa translations",
                path: "/services/document-translation",
              },
            ].map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className="text-left bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-500/40 rounded-xl p-3.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0B2545] group-hover:text-teal-800">
                    {link.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-700 shrink-0" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {link.desc}
                </p>
              </button>
            ))}
          </div>
        </ContentCard>

        {/* 13. FAQs Section (Preserves all 4 original FAQs + 4 new high-intent SEO FAQs) */}
        <ContentCard title="Frequently Asked Questions About e-Sanad">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Common Portal & Verification Questions</span>
          </div>
          <FAQAccordion items={ESANAD_GUIDE_FAQS} />
        </ContentCard>

        {/* 14. Request a Detailed Quotation & Guidance Form */}
        <section id="esanad-quote-section" className="scroll-mt-20">
          <QuoteForm
            title="Need Fast-Track Physical Apostille or Help With a Stuck e-Sanad Application?"
            subtitle="Share your document details below. We will verify whether your certificate can be processed online or provide a 2–3 working day physical Delhi SDM + MEA quote."
            prefillDetails={quotePrefill}
          />
        </section>

        {/* 15. Bottom Call to Action (Preserved 100% Intact) */}
        <div className="bg-[#0B2545] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold mb-1.5 font-display">
              Have Questions About e-Sanad or Physical Document Attestation?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              If your document is not eligible for online e-Sanad processing, our team can coordinate the physical SDM, State HRD, and MEA attestation route for you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("/contact-us")}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 transition-colors cursor-pointer"
          >
            Contact Our Team
          </button>
        </div>
      </div>

      {/* 2x Zoom Lightbox Modal for e-Sanad Step Screenshots */}
      {activeSampleModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => {
            setActiveSampleModal(null);
            setIsZoomed(false);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-3.5 bg-[#0B2545] text-white flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold">
                  {activeSampleModal.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                  {activeSampleModal.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-teal-300 transition-colors cursor-pointer"
                >
                  {isZoomed ? "1x Fit" : "2x Zoom"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSampleModal(null);
                    setIsZoomed(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 overflow-auto flex-1 bg-slate-100 flex items-center justify-center">
              <img
                src={activeSampleModal.src}
                alt={activeSampleModal.title}
                onClick={() => setIsZoomed((z) => !z)}
                className={`rounded-xl border border-slate-200 bg-white shadow-md transition-transform duration-200 cursor-zoom-in ${
                  isZoomed
                    ? "scale-150 sm:scale-175 origin-top cursor-zoom-out my-12"
                    : "max-h-[72vh] w-auto object-contain"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
