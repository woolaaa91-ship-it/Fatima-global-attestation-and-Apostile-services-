import React, { useEffect } from "react";
import {
  ChevronRight,
  Phone,
  ExternalLink,
  GraduationCap,
  FileText,
  Briefcase,
} from "lucide-react";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion, FAQItem } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { DirectWhatsAppConsultationBox } from "./DirectWhatsAppConsultationBox";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";

interface UaeMofaAttestationPageProps {
  onNavigate?: (path: string) => void;
}

const UAE_PROCESS_STEPS = [
  {
    step: 1,
    title: "Indian State Verification (HRD/SDM)",
    description:
      "For educational documents, State HRD attestation is often required. For personal documents like birth/marriage certificates, SDM/Home Department attestation is needed. (Commercial docs need Chamber of Commerce).",
  },
  {
    step: 2,
    title: "MEA Attestation",
    description:
      "The document is submitted to the Ministry of External Affairs (MEA) in India for official stamping.",
  },
  {
    step: 3,
    title: "UAE Embassy Attestation",
    description:
      "The Indian document is then stamped by the UAE Embassy in New Delhi.",
  },
  {
    step: 4,
    title: "UAE MOFA Attestation",
    description:
      "The final validation is done digitally/by the Ministry of Foreign Affairs and International Cooperation (MOFA) within the UAE.",
  },
];

const DOCUMENT_CATEGORIES = [
  {
    title: "Educational Documents",
    description:
      "Degrees, Diplomas, Mark Sheets (Requires HRD + MEA + UAE Embassy + MOFA)",
    icon: GraduationCap,
  },
  {
    title: "Personal Documents",
    description:
      "Birth, Marriage, PCC (Requires SDM + MEA + UAE Embassy + MOFA)",
    icon: FileText,
  },
  {
    title: "Commercial Documents",
    description:
      "Invoices, POA, Incorporation (Requires Chamber + MEA + UAE Embassy + MOFA)",
    icon: Briefcase,
  },
];

export const UAE_MOFA_FAQS: FAQItem[] = [
  {
    question: "How do I verify my UAE MOFA attestation online?",
    answer:
      "The UAE Ministry of Foreign Affairs provides a digital verification portal on their official website where you can enter the document details (like the sticker number) to check the validity of the stamp.",
  },
  {
    question: "Can I skip the UAE Embassy and just get MOFA?",
    answer:
      "No. For Indian-issued documents, the UAE Embassy in India must stamp the document first. The UAE MOFA will only attest a document that already carries the UAE Embassy stamp.",
  },
  {
    question: "Is an MEA Apostille enough for UAE?",
    answer:
      "While UAE is a Hague member, many employers and government departments still strictly require the full Embassy and MOFA attestation chain. It is highly recommended to get the full MOFA attestation for work and family visas.",
  },
  {
    question: "How long does the full UAE MOFA process take?",
    answer:
      "Timelines vary based on the document type and current embassy processing times. It generally takes a few weeks. We provide an estimated timeline after reviewing your documents.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const UAE_MOFA_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: UAE_MOFA_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const UAE_WHATSAPP_URL = getWhatsAppUrl(
  "Hi, I need help with UAE MOFA Attestation"
);

export const UaeMofaAttestationPage: React.FC<UaeMofaAttestationPageProps> = ({
  onNavigate,
}) => {
  useEffect(() => {
    document.title =
      "UAE MOFA Attestation from India | Embassy & Ministry Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Understand UAE MOFA attestation from India. Learn the steps: Indian authentication, UAE Embassy attestation, and UAE Ministry of Foreign Affairs (MOFA) stamp."
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
              Countries
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0A192F] font-semibold">
              UAE MOFA Attestation
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          {/* Small Badge near H1 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider">
              Embassy + MOFA Route
            </span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              United Arab Emirates
            </span>
          </div>

          {/* H1 (28-32px mobile-first) */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            UAE MOFA Attestation Services from India
          </h1>

          {/* Subtitle Paragraph (16px Body) */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            Complete assistance for authenticating Indian documents for use in the United Arab Emirates. We coordinate the mandatory chain: Indian State Verification, MEA, UAE Embassy, and the final UAE Ministry of Foreign Affairs (MOFA) stamping.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={UAE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Enquire about UAE Attestation on WhatsApp</span>
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
        {/* 6. Disclaimer Box (Important) */}
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department, embassy, or MOFA. We assist with document coordination, submission, and logistics. Final attestation is subject to the respective authorities' approval." />

        {/* 2. Content Block 1: Why UAE MOFA Attestation is Required (Card Style) */}
        <ContentCard title="Why UAE MOFA Attestation is Required">
          <p className="text-base text-slate-700 leading-relaxed text-left">
            The UAE Ministry of Foreign Affairs (MOFA) is the final authority that legalizes foreign documents for use inside the UAE. Whether you are moving for a job, sponsoring your family, or doing business, the UAE government requires documents to be fully authenticated to ensure their authenticity.
          </p>
        </ContentCard>

        {/* Interactive Pre-filled WhatsApp Consultation Box for UAE (Placed near top for immediate UX & Conversion) */}
        <DirectWhatsAppConsultationBox
          subjectName="United Arab Emirates (UAE)"
          shortName="UAE"
          countryIsoCode="AE"
          routeBadge="Non-Hague Route • State/SDM → MEA → UAE Embassy → UAE MOFA"
          kickerText="Direct Country Desk Consultation"
        />

        {/* 3. Content Block 2: The Step-by-Step Process (4 Vertical Numbered Steps/Cards) */}
        <ContentCard title="The Step-by-Step Process">
          <div className="space-y-4 pt-1">
            {UAE_PROCESS_STEPS.map((item) => (
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

        {/* 4. Content Block 3: Document Categories (3 Cards Grid) */}
        <ContentCard title="Document Categories">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {DOCUMENT_CATEGORIES.map((category, idx) => {
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

        {/* 5. Official Verification Link (Highlight Box) */}
        <section className="bg-white rounded-xl border-2 border-[#0F766E]/30 p-5 sm:p-7 shadow-2xs space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                Official UAE Government Resource
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
                Verify Your UAE MOFA Attestation
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Once the process is complete, you can verify the authenticity of the UAE MOFA stamp online.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="https://www.mofa.gov.ae/en/services/attestation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-sm font-bold transition-colors"
              >
                <span>UAE MOFA Verification Portal</span>
                <ExternalLink className="w-4 h-4 text-teal-300 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Using Reusable FAQAccordion) */}
        <FAQAccordion
          title="Frequently Asked Questions"
          items={UAE_MOFA_FAQS}
        />

        {/* 8. Bottom Call to Action (CTA) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Help with UAE Embassy &amp; MOFA Attestation?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your document type (Degree, Birth, Marriage, or Commercial) on WhatsApp to confirm the exact State HRD/SDM, MEA, UAE Embassy, and MOFA requirements.
          </p>
          <div className="pt-1">
            <a
              href={UAE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-base font-bold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Enquire about UAE Attestation on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* JSON-LD FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(UAE_MOFA_FAQ_SCHEMA),
        }}
      />
    </div>
  );
};
