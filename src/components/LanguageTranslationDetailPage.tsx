import React, { useEffect } from "react";
import {
  ChevronRight,
  Phone,
  Languages,
  GraduationCap,
  FileText,
  Scale,
  Plane,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Stamp,
  Clock,
  FileCheck2,
} from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { applyRouteSEO } from "../utils/seo";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { QuoteForm } from "./QuoteForm";
import {
  ACCEPTED_DOCUMENT_CATEGORIES_SPEC,
  INTERNATIONAL_LANGUAGE_PAGES,
  REGIONAL_TO_ENGLISH_LANGUAGE_PAGES,
  type LanguageTranslationPageData,
} from "../data/languageTranslations";

interface LanguageTranslationDetailPageProps {
  page: LanguageTranslationPageData;
  onNavigate?: (path: string) => void;
}

const RELATED_ATTESTATION_SERVICES = [
  {
    title: "MEA Apostille Services in India",
    subtitle: "Hague Convention sticker for 120+ member countries.",
    slug: "/services/apostille",
    badge: "MEA Apostille",
  },
  {
    title: "Embassy Legalization Services",
    subtitle: "Consular attestation for UAE, Qatar, Kuwait, Vietnam & more.",
    slug: "/services/embassy-legalization",
    badge: "Embassy Attestation",
  },
  {
    title: "MOFA Attestation Assistance",
    subtitle: "Gulf Ministry of Foreign Affairs verification guidance.",
    slug: "/services/mofa-attestation",
    badge: "Gulf MOFA",
  },
  {
    title: "Degree Certificate Apostille & HRD",
    subtitle: "Educational certificate authentication for study & work visas.",
    slug: "/services/degree-certificate-apostille",
    badge: "Educational Docs",
  },
  {
    title: "Notary Public Attestation",
    subtitle: "Initial notary verification for affidavits & translated records.",
    slug: "/services/notary-public",
    badge: "Notary & SDM",
  },
  {
    title: "Commercial Document Attestation",
    subtitle: "Chamber of Commerce & MEA legalization for corporate files.",
    slug: "/services/commercial-document-attestation",
    badge: "Corporate & Export",
  },
];

export const LanguageTranslationDetailPage: React.FC<
  LanguageTranslationDetailPageProps
> = ({ page, onNavigate }) => {
  useEffect(() => {
    applyRouteSEO(page.slug);
  }, [page.slug]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const whatsappEnquiryUrl = getWhatsAppUrl(
    `Hello ${BUSINESS_CONFIG.shortName}, I need a quotation for ${page.cardTitle} (${page.h1}). Please guide me on the document translation process, timeline, and fees.`
  );

  const sameCategoryPeers = (
    page.category === "international"
      ? INTERNATIONAL_LANGUAGE_PAGES
      : REGIONAL_TO_ENGLISH_LANGUAGE_PAGES
  ).filter((item) => item.slug !== page.slug);

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
              href="/services/document-translation"
              onClick={(e) =>
                handleLinkClick(e, "/services/document-translation")
              }
              className="hover:text-[#0A192F] transition-colors"
            >
              Language Translation Services
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0A192F] font-semibold">
              {page.cardTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section (One Clear H1 + Introduction + WhatsApp & Quotation CTAs) */}
      <header className="bg-[#0A192F] text-white py-8 sm:py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 inline-flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{page.heroBadge}</span>
          </span>

          <h1 className="text-[28px] sm:text-[34px] lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight text-left">
            {page.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl text-left">
            {page.introParagraphs[0]}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Enquire on WhatsApp</span>
            </a>

            <a
              href="#request-quotation"
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
        {/* 2. Detailed Introduction to the Specific Language Translation Service */}
        <ContentCard title={`Overview of ${page.cardTitle} in India`}>
          <div className="space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed">
            {page.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
            <div className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                <Globe className="w-4 h-4 shrink-0" />
                <span>Translation Scope</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#0A192F]">
                {page.directionBadge}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Educational, Personal, Legal, Visa &amp; Commercial Documents.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                <FileCheck2 className="w-4 h-4 shrink-0" />
                <span>Name &amp; Layout Accuracy</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#0A192F]">
                Passport-Matched Spelling
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mirror-formatted translation checked against your Passport copy.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Typical Turnaround</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#0A192F]">
                24–48 Working Hours
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Digital PDF draft shared for verification prior to finalization.
              </p>
            </div>
          </div>
        </ContentCard>

        {/* 3. Types of Documents Accepted for Translation */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Accepted Document Categories
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Types of Documents Accepted for {page.cardTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fatima Global Attestation assists students, families, working
              professionals, legal representatives, and companies with{" "}
              {page.cardTitle.toLowerCase()} across five core document categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 6. Educational Document Translation */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display">
                    Educational Document Translation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {page.educationalDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.educational.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. Personal Document Translation */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display">
                    Personal Document Translation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {page.personalDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.personal.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 8. Legal Document Translation */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display">
                    Legal Document Translation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {page.legalDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.legal.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 10. Commercial Document Translation */}
            <div className="p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display">
                    Commercial Document Translation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {page.commercialDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.commercial.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A192F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 9. Immigration and Visa Document Translation (Full-Width Card) */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white border border-teal-500/30 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center shrink-0">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                  Consular, Visa &amp; Residence Permit Dossiers
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white font-display">
                  Immigration and Visa Document Translation ({page.languageName})
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {page.immigrationVisaDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {ACCEPTED_DOCUMENT_CATEGORIES_SPEC.immigration.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/8 border border-white/15 text-xs font-semibold text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Translation Process Explained Step by Step */}
        <ContentCard
          title={`Step-by-Step ${page.cardTitle} Process`}
        >
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our streamlined 4-step workflow ensures your {page.cardTitle.toLowerCase()}{" "}
            is accurately formatted, reviewed for passport spelling alignment,
            and prepared for submission:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {page.processSteps.map((stepObj) => (
              <div
                key={stepObj.step}
                className="p-4 sm:p-5 rounded-xl bg-[#F3F4F6] border border-slate-200 flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-amber-300 text-sm font-extrabold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                  {stepObj.step}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0A192F] font-display">
                    {stepObj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {stepObj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 12. Apostille and Attestation Assistance Where Required (Internal Links) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] inline-flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Translation + Document Legalization Support</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Apostille &amp; Embassy Attestation Assistance for Translated Documents
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {page.apostilleAttestationNote}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {RELATED_ATTESTATION_SERVICES.map((srv) => (
              <a
                key={srv.slug}
                href={srv.slug}
                onClick={(e) => handleLinkClick(e, srv.slug)}
                className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-teal-50/60 border border-slate-200 hover:border-[#0F766E] transition-all flex flex-col justify-between gap-2.5 group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] block">
                    {srv.badge}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#0A192F] group-hover:text-[#0F766E] font-display">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0A192F] group-hover:text-[#0F766E]">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0F766E]" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Related Language Translation Services (Internal Linking Grid) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Explore Other Translation Services
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-display">
                {page.category === "international"
                  ? "Other International Language Translation Services"
                  : "Other Indian Regional Language to English Translation Services"}
              </h2>
            </div>
            <a
              href="/services/document-translation"
              onClick={(e) =>
                handleLinkClick(e, "/services/document-translation")
              }
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0F766E] hover:text-[#0A192F]"
            >
              <span>View All 26 Language Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sameCategoryPeers.slice(0, 6).map((peer) => (
              <a
                key={peer.slug}
                href={peer.slug}
                onClick={(e) => handleLinkClick(e, peer.slug)}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-[#0F766E] flex items-center justify-between gap-2 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#0A192F] text-teal-300 flex items-center justify-center shrink-0">
                    <Languages className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] truncate">
                    {peer.cardTitle}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E] shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer Box */}
        <DisclaimerBox text="Fatima Global Attestation is an independent document assistance consultancy. We are not a government department or embassy. Document translation charges are separate from Notary, SDM, MEA Apostille, or Embassy fees." />

        {/* 14 & 15. WhatsApp Enquiry CTA + Request a Quotation Form */}
        <div
          id="request-quotation"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start scroll-mt-20"
        >
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0A192F] text-white rounded-2xl p-5 sm:p-6 space-y-4 border border-slate-800 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>Fast WhatsApp Document Check</span>
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Need {page.cardTitle} Assistance?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Send a clear scan or photo of your document on WhatsApp. Our
                team will review the page count, confirm the turnaround time,
                and advise if Notary, SDM, MEA Apostille, or Embassy attestation
                is required for your destination.
              </p>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <span>
                    Exact passport spelling cross-check before finalization
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <span>
                    Mirror-formatted layout for Educational, Personal, Legal &amp;
                    Commercial records
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <span>
                    End-to-end Notary, SDM, MEA Apostille &amp; Embassy support
                  </span>
                </li>
              </ul>
              <div className="pt-1 flex flex-col gap-2.5">
                <a
                  href={whatsappEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-sm font-bold shadow-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                  <span>Send Document on WhatsApp</span>
                </a>
                <a
                  href={`tel:${BUSINESS_CONFIG.telPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Call {BUSINESS_CONFIG.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm
              initialServiceSlug="/document-translation-services"
              title={`Request a Quotation for ${page.cardTitle}`}
              subtitle={`Share your document type, page count, and destination country for ${page.cardTitle.toLowerCase()}.`}
              prefillDetails={{
                serviceSlug: "/document-translation-services",
                documentDetails: `${page.cardTitle} — `,
              }}
            />
          </div>
        </div>

        {/* 13. Dedicated Frequently Asked Questions Section at Bottom */}
        <section
          id="language-translation-faqs"
          aria-labelledby="language-faq-heading"
          itemScope
          itemType="https://schema.org/FAQPage"
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-2xs scroll-mt-20"
        >
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Document Requirements • Translation Verification • Delivery Timelines
            </span>
            <h2
              id="language-faq-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight"
            >
              Frequently Asked Questions — {page.cardTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Key guidelines on source document requirements, translation
              verification and attestation support, and delivery timelines for{" "}
              {page.cardTitle.toLowerCase()}.
            </p>
          </div>

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
                exact spelling cross-verification. Originals are only needed if
                physical MEA Apostille or Embassy stamping is also required.
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
                Formatted in a structured{" "}
                <strong className="text-[#0A192F]">A4 mirror layout</strong>{" "}
                with a translator verification statement, plus optional{" "}
                <strong className="text-[#0A192F]">
                  Notary, SDM, MEA Apostille &amp; Embassy
                </strong>{" "}
                attestation coordination.
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
            title={`Common Questions About ${page.cardTitle}`}
            items={page.faqs}
          />

          {/* Embedded JSON-LD FAQPage Structured Data for Google Search Rich Results */}
          <script
            id="fga-language-faqpage-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${
                  typeof window !== "undefined" && window.location?.origin
                    ? window.location.origin
                    : "https://fatimaglobalattestation.com"
                }${page.slug}#faqpage`,
                name: `Frequently Asked Questions — ${page.cardTitle}`,
                url: `${
                  typeof window !== "undefined" && window.location?.origin
                    ? window.location.origin
                    : "https://fatimaglobalattestation.com"
                }${page.slug}`,
                mainEntity: page.faqs.map((faq, idx) => ({
                  "@type": "Question",
                  "@id": `${
                    typeof window !== "undefined" && window.location?.origin
                      ? window.location.origin
                      : "https://fatimaglobalattestation.com"
                  }${page.slug}#faq-question-${idx + 1}`,
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        </section>
      </main>
    </div>
  );
};
