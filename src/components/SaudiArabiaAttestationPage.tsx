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

interface SaudiArabiaAttestationPageProps {
  onNavigate?: (path: string) => void;
}

const SAUDI_PROCESS_STEPS = [
  {
    step: 1,
    title: "Indian State Verification (State HRD / SDM / Chamber)",
    description:
      "Educational degrees often require State HRD verification (especially for work visas and professional licensing). Personal documents require SDM/Home Department authentication, and commercial documents require Chamber of Commerce attestation.",
  },
  {
    step: 2,
    title: "MEA Apostille or Normal Attestation",
    description:
      "The document is submitted to the Ministry of External Affairs (MEA) in India for the Hague Apostille sticker or normal attestation stamp depending on the required route.",
  },
  {
    step: 3,
    title: "Certified Arabic Translation (Where Required)",
    description:
      "Legal documents, Powers of Attorney (Wakala), inheritance/death claim files, and specific certificates often require certified English-to-Arabic translation.",
  },
  {
    step: 4,
    title: "Saudi Embassy Legalization (When Mandated)",
    description:
      "For commercial records, legal claims, or cases where the Saudi authority explicitly requires consular legalization, the document is stamped by the Royal Embassy of Saudi Arabia in New Delhi.",
  },
];

const SAUDI_DOCUMENT_CATEGORIES = [
  {
    title: "Educational Documents",
    description:
      "Degrees, Diplomas, Mark Sheets for Employment Visas, Saudi Council of Engineers (SCE), SCFHS, and professional verification.",
    icon: GraduationCap,
  },
  {
    title: "Personal & Family Documents",
    description:
      "Marriage Certificates, Birth Certificates, PCC, and Affidavits for Family Residence (Iqama) and Dependent Visas.",
    icon: FileText,
  },
  {
    title: "Commercial & Legal Documents",
    description:
      "Power of Attorney (Wakala), Legal Heir & Death Claim Files, Commercial Invoices, Certificates of Origin, and Agency Agreements.",
    icon: Briefcase,
  },
];

export const SAUDI_ATTESTATION_FAQS: FAQItem[] = [
  {
    question:
      "Is an MEA Apostille accepted for Saudi Arabia, or do I need Saudi Embassy attestation?",
    answer:
      "Saudi Arabia is a member of the Hague Apostille Convention, so an MEA Apostille is widely accepted for many personal and educational documents. However, certain employers, commercial chambers, and Saudi courts (for Wakala or death claim cases) still require full Saudi Embassy attestation. Always confirm the exact requirement with your Saudi sponsor or employer.",
  },
  {
    question:
      "Is State HRD mandatory for engineering and medical degrees for Saudi Arabia?",
    answer:
      "For most Saudi employment visas and professional registrations (such as Saudi Council of Engineers or SCFHS), State HRD attestation from the state where your university is located is strongly recommended or mandatory before MEA authentication.",
  },
  {
    question: "Do documents for Saudi Arabia require Arabic translation?",
    answer:
      "Standard English educational degrees usually do not require translation for MEA Apostille, though some Saudi authorities may ask for Arabic translation upon arrival. However, legal documents like Powers of Attorney (Wakala), Legal Heir Certificates, and court documents generally require certified Arabic translation.",
  },
  {
    question:
      "How long does the Saudi Arabia document authentication process take?",
    answer:
      "Timelines depend on whether your document follows the SDM + MEA Apostille route, the State HRD + MEA route, or full Saudi Embassy legalization. State HRD timelines vary by university and state. We provide a clear estimate after reviewing your document scans.",
  },
  {
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
];

export const SAUDI_ATTESTATION_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SAUDI_ATTESTATION_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const SAUDI_WHATSAPP_URL = getWhatsAppUrl(
  "Hi, I need help with Saudi Arabia Document Attestation"
);

export const SaudiArabiaAttestationPage: React.FC<
  SaudiArabiaAttestationPageProps
> = ({ onNavigate }) => {
  useEffect(() => {
    document.title =
      "Saudi Arabia Document Attestation from India | Apostille & Embassy Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Need Saudi Arabia document attestation from India? Understand the MEA Apostille, State HRD, and Saudi Embassy legalization process for work and family visas."
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
              Saudi Arabia Attestation
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
              Apostille &amp; Embassy Routes
            </span>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Kingdom of Saudi Arabia (KSA)
            </span>
          </div>

          {/* H1 (28-32px mobile-first) */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            Saudi Arabia Document Attestation Services from India
          </h1>

          {/* Subtitle Paragraph (16px Body) */}
          <p className="text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            Complete guidance and assistance for authenticating Indian educational, personal, legal, and commercial documents for use in the Kingdom of Saudi Arabia (KSA). We help you navigate State HRD/SDM verification, MEA Apostille, Arabic translation, and Royal Embassy of Saudi Arabia legalization.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={SAUDI_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Enquire about Saudi Attestation on WhatsApp</span>
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
        <DisclaimerBox text="Fatima Global Attestation is a private assistance agency. We are not a government department, the Royal Embassy of Saudi Arabia, or Saudi MOFA. We assist with document coordination, submission, and logistics. Final attestation is subject to the respective authorities' approval." />

        {/* 2. Content Block 1: Apostille vs. Saudi Embassy Attestation (Card Style) */}
        <ContentCard title="MEA Apostille vs. Saudi Embassy Attestation: What You Should Know">
          <p className="text-base text-slate-700 leading-relaxed text-left">
            Saudi Arabia is a member of the Hague Apostille Convention. As a result, many Indian personal and educational documents are now accepted in Saudi Arabia with an MEA Apostille sticker (often preceded by State HRD or SDM verification).
          </p>
          <p className="text-base text-slate-700 leading-relaxed text-left">
            However, specific categories—such as commercial export documents, Powers of Attorney (Wakala), legal heir and death claim files, or specific employer/ministry mandates—still require full Royal Embassy of Saudi Arabia legalization in New Delhi along with certified Arabic translation. We review your sponsor or authority checklist before initiating the process.
          </p>
        </ContentCard>

        {/* Interactive Pre-filled WhatsApp Consultation Box for Saudi Arabia (Placed near top for immediate UX & Conversion) */}
        <DirectWhatsAppConsultationBox
          subjectName="Kingdom of Saudi Arabia (KSA)"
          shortName="Saudi Arabia"
          countryIsoCode="SA"
          routeBadge="Hague Apostille & Royal Embassy of Saudi Arabia Route"
          kickerText="Direct Country Desk Consultation"
        />

        {/* 3. Content Block 2: The Step-by-Step Process (4 Vertical Numbered Steps/Cards) */}
        <ContentCard title="The Step-by-Step Process">
          <div className="space-y-4 pt-1">
            {SAUDI_PROCESS_STEPS.map((item) => (
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
            {SAUDI_DOCUMENT_CATEGORIES.map((category, idx) => {
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

        {/* 5. Official Reference Link (Highlight Box) */}
        <section className="bg-white rounded-xl border-2 border-[#0F766E]/30 p-5 sm:p-7 shadow-2xs space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                Official Government Portal
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
                Saudi Ministry of Foreign Affairs (MOFA)
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Reference the official Ministry of Foreign Affairs portal of the Kingdom of Saudi Arabia for consular and attestation information.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="https://www.mofa.gov.sa/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white text-sm font-bold transition-colors"
              >
                <span>Saudi MOFA Official Portal</span>
                <ExternalLink className="w-4 h-4 text-teal-300 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* 7. FAQs Section (Using Reusable FAQAccordion) */}
        <FAQAccordion
          title="Frequently Asked Questions"
          items={SAUDI_ATTESTATION_FAQS}
        />

        {/* 8. Bottom Call to Action (CTA) */}
        <section className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Need Guidance for Saudi Arabia Document Attestation?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Share your document type and Saudi visa or sponsor requirement on WhatsApp so we can confirm whether you need State HRD, MEA Apostille, or Saudi Embassy attestation.
          </p>
          <div className="pt-1">
            <a
              href={SAUDI_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-base font-bold shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
              <span>Enquire about Saudi Attestation on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* JSON-LD FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SAUDI_ATTESTATION_FAQ_SCHEMA),
        }}
      />
    </div>
  );
};
