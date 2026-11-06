import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronRight,
  CheckCircle2,
  FileCheck2,
  ShieldAlert,
  ArrowRight,
  Stamp,
  GraduationCap,
  FileText,
  Landmark,
  Info,
  ChevronDown,
  Search,
  Building2,
  Lightbulb,
} from "lucide-react";
import {
  VISA_CHECKLIST_COUNTRIES,
  VISA_CHECKLIST_PAGES,
  type VisaChecklistData,
  type VisaTypeSlug,
} from "../data/visaChecklists";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { applyRouteSEO } from "../utils/seo";
import { useRouter } from "../navigation/useRouter";
import { FAQAccordion } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CountryFlag } from "./CountryFlag";

interface VisaChecklistPageProps {
  checklist: VisaChecklistData;
  onNavigate: (path: string) => void;
}

const POPULAR_QUICK_LINKS: { label: string; slug: string; isoCode: string }[] = [
  { label: "Italy Student Visa", slug: "/visa-checklist/italy-student-visa", isoCode: "IT" },
  { label: "Germany Work Visa", slug: "/visa-checklist/germany-work-visa", isoCode: "DE" },
  { label: "Israel Work Visa (B/1)", slug: "/visa-checklist/israel-work-visa", isoCode: "IL" },
  { label: "UK Student Visa", slug: "/visa-checklist/uk-student-visa", isoCode: "GB" },
  { label: "UAE Work Visa", slug: "/visa-checklist/uae-work-visa", isoCode: "AE" },
  { label: "Saudi Work Visa", slug: "/visa-checklist/saudi-arabia-work-visa", isoCode: "SA" },
  { label: "Portugal Work Visa", slug: "/visa-checklist/portugal-work-visa", isoCode: "PT" },
  { label: "Canada Study Permit", slug: "/visa-checklist/canada-student-visa", isoCode: "CA" },
];

export const VisaChecklistPage: React.FC<VisaChecklistPageProps> = ({
  checklist,
  onNavigate,
}) => {
  const router = useRouter(onNavigate);
  const [directorySearch, setDirectorySearch] = useState("");
  const [directoryFilter, setDirectoryFilter] = useState<"all" | VisaTypeSlug>("all");

  // Sync static SEO metadata (Title, Meta Description, Canonical URL & JSON-LD) for this dedicated URL
  useEffect(() => {
    applyRouteSEO(checklist.slug);
  }, [checklist.slug]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    router.push(path);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCountrySlug = e.target.value;
    const nextPath = `/visa-checklist/${nextCountrySlug}-${checklist.visaType}`;
    router.push(nextPath);
  };

  const handleVisaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextVisaType = e.target.value as VisaTypeSlug;
    const nextPath = `/visa-checklist/${checklist.countrySlug}-${nextVisaType}`;
    router.push(nextPath);
  };

  const getCategoryIcon = (index: number) => {
    if (index === 0) {
      return <GraduationCap className="w-5 h-5 text-[#0F766E]" />;
    }
    if (index === 1) {
      return <FileText className="w-5 h-5 text-[#0F766E]" />;
    }
    return <Landmark className="w-5 h-5 text-amber-700" />;
  };

  const filteredDirectoryPages = useMemo(() => {
    const query = directorySearch.trim().toLowerCase();
    return VISA_CHECKLIST_PAGES.filter((item) => {
      if (directoryFilter !== "all" && item.visaType !== directoryFilter) {
        return false;
      }
      if (!query) return true;
      return (
        item.countryName.toLowerCase().includes(query) ||
        item.visaSubtypeNote.toLowerCase().includes(query) ||
        item.visaTypeDisplay.toLowerCase().includes(query) ||
        item.isoCode.toLowerCase().includes(query)
      );
    });
  }, [directorySearch, directoryFilter]);

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden pb-20 sm:pb-16 text-left">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
          >
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="hover:text-[#0B2545] transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href="/#visa-checklists"
              onClick={(e) => handleLinkClick(e, "/#visa-checklists")}
              className="hover:text-[#0B2545] transition-colors"
            >
              Visa Checklist
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0B2545] font-semibold">
              {checklist.countryName} {checklist.visaTypeDisplay}
            </span>
          </nav>
        </div>
      </div>

      {/* 1. HERO SECTION (Dedicated Static Page per Country & Visa Type) */}
      <header className="bg-[#0B2545] text-white py-9 sm:py-13 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <CountryFlag
              isoCode={checklist.isoCode}
              countryName={checklist.countryName}
              size="md"
              className="!w-10 !h-7 rounded shadow-xs border border-white/20"
            />
            <span className="text-xs font-semibold tracking-wider uppercase text-teal-300">
              Visa Checklist · {checklist.visaSubtypeNote}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold font-display tracking-tight leading-tight text-white max-w-4xl">
              {checklist.h1}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-3xl leading-relaxed">
              {checklist.subtitle}
            </p>
          </div>

          {/* URL-Driven Country & Visa Type Dropdowns */}
          <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 sm:p-5 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Navigate to Another Country or Visa Checklist ({VISA_CHECKLIST_COUNTRIES.length} Countries)
              </span>
              <code className="text-[11px] font-mono text-teal-300 bg-slate-950/90 border border-slate-700 px-2.5 py-0.5 rounded-md">
                {checklist.slug}
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Dropdown 1: Select Country */}
              <div>
                <label
                  htmlFor="visa-checklist-country-select"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  1. Select Country ({VISA_CHECKLIST_COUNTRIES.length} Countries Available)
                </label>
                <div className="relative">
                  <select
                    id="visa-checklist-country-select"
                    value={checklist.countrySlug}
                    onChange={handleCountryChange}
                    className="w-full appearance-none rounded-xl bg-slate-950 border border-teal-500/50 hover:border-teal-400 focus:border-teal-300 text-white text-sm font-semibold px-3.5 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500/40 cursor-pointer"
                  >
                    {VISA_CHECKLIST_COUNTRIES.map((c) => (
                      <option key={c.countrySlug} value={c.countrySlug}>
                        {c.countryName} ({c.isHagueMember ? "Hague Apostille" : "Embassy Attestation"})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-teal-300 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Dropdown 2: Select Visa Type */}
              <div>
                <label
                  htmlFor="visa-checklist-type-select"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  2. Select Visa Type
                </label>
                <div className="relative">
                  <select
                    id="visa-checklist-type-select"
                    value={checklist.visaType}
                    onChange={handleVisaTypeChange}
                    className="w-full appearance-none rounded-xl bg-slate-950 border border-teal-500/50 hover:border-teal-400 focus:border-teal-300 text-white text-sm font-semibold px-3.5 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500/40 cursor-pointer"
                  >
                    <option value="student-visa">
                      Student Visa
                    </option>
                    <option value="work-visa">
                      Work Visa
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-teal-300 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Direct URL Links Between Student Visa & Work Visa for Current Country */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  Dedicated Pages for {checklist.countryName}:
                </span>
                <a
                  href={`/visa-checklist/${checklist.countrySlug}-student-visa`}
                  onClick={(e) =>
                    handleLinkClick(
                      e,
                      `/visa-checklist/${checklist.countrySlug}-student-visa`
                    )
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    checklist.visaType === "student-visa"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {checklist.countryName} Student Visa
                </a>
                <a
                  href={`/visa-checklist/${checklist.countrySlug}-work-visa`}
                  onClick={(e) =>
                    handleLinkClick(
                      e,
                      `/visa-checklist/${checklist.countrySlug}-work-visa`
                    )
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    checklist.visaType === "work-visa"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {checklist.countryName} Work Visa
                </a>
              </div>

              <a
                href={getWhatsAppUrl(checklist.ctaWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Check My Document Route on WhatsApp</span>
              </a>
            </div>

            {/* Popular Checklists Bar */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">
                Popular Checklists:
              </span>
              {POPULAR_QUICK_LINKS.map((q) => (
                <a
                  key={q.slug}
                  href={q.slug}
                  onClick={(e) => handleLinkClick(e, q.slug)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                    checklist.slug === q.slug
                      ? "bg-amber-400/20 text-amber-300 border-amber-400/50"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-teal-400 hover:text-white"
                  }`}
                >
                  <CountryFlag
                    isoCode={q.isoCode}
                    countryName={q.label}
                    size="sm"
                    className="!w-3.5 !h-2.5 rounded-xs shrink-0"
                  />
                  <span>{q.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-10 sm:space-y-12">
        {/* 2. IMPORTANT INFO BOX (Dynamic per country) */}
        <section
          aria-labelledby="important-visa-rule-heading"
          className="bg-white rounded-2xl border border-teal-200 p-5 sm:p-7 shadow-xs space-y-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Official VFS / Embassy Convention &amp; Legalization Summary
              </span>
              <h2
                id="important-visa-rule-heading"
                className="text-lg sm:text-xl font-extrabold text-[#0B2545] font-display"
              >
                {checklist.importantInfoTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {checklist.importantInfoText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            {checklist.importantHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-1"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B2545] block leading-snug">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-slate-900 text-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                <strong className="text-white">Official Visa Submission Channel in India:</strong>{" "}
                {checklist.submissionChannel}
              </span>
            </div>
            <span className="text-amber-300 font-semibold">
              {checklist.visaSubtypeNote}
            </span>
          </div>
        </section>

        {/* 3. THE CHECKLIST (Cards with "Apostille Required" badges & Service Call-to-Action) */}
        <section aria-labelledby="visa-checklist-cards-heading" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
              Document-by-Document Checklist &amp; Legalization Guide
            </span>
            <h2
              id="visa-checklist-cards-heading"
              className="text-xl sm:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight"
            >
              {checklist.countryName} {checklist.visaTypeDisplay} Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Below are the three core document groups required for your {checklist.countryName}{" "}
              {checklist.visaTypeDisplay.toLowerCase()} application, along with the exact authentication and translation services we provide at Fatima Global Attestation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {checklist.requirementCards.map((card, idx) => {
              const isTeal = card.badgeTone === "teal";
              return (
                <article
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    {/* Prominent Apostille / Attestation Badge */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold tracking-wide border shadow-2xs ${
                          isTeal
                            ? "bg-[#0F766E] text-white border-[#0F766E]"
                            : "bg-amber-100 text-amber-950 border-amber-300"
                        }`}
                      >
                        {isTeal ? (
                          <FileCheck2 className="w-3.5 h-3.5 text-teal-200 shrink-0" />
                        ) : (
                          <Stamp className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        )}
                        <span>{card.badgeText}</span>
                      </span>
                    </div>

                    {/* Category Title */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isTeal
                            ? "bg-teal-50 border-teal-100"
                            : "bg-amber-50 border-amber-200"
                        }`}
                      >
                        {getCategoryIcon(idx)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          0{idx + 1}. Document Group
                        </span>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#0B2545] font-display leading-snug">
                          {card.categoryTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Core Documents Included */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 rounded-xl p-3 border border-slate-200/80 leading-relaxed">
                      {card.documentsText}
                    </p>

                    {/* Detailed Points */}
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      {card.helperPoints.map((pt, pointIdx) => (
                        <li key={pointIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* "We Provide This Service" Call-to-Action Footer */}
                  {card.weProvideService && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-3 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] block">
                          Service Provided by Fatima Global Attestation
                        </span>
                        <p className="text-xs text-slate-700 font-medium leading-snug">
                          {card.ourServiceSummary}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <a
                          href={getWhatsAppUrl(
                            `Hi, I need help with ${card.categoryTitle} (${card.badgeText}) for my ${checklist.countryName} ${checklist.visaTypeDisplay}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#0F766E] text-white text-xs font-bold transition-colors shadow-2xs"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                          <span>{card.whatsappCtaLabel}</span>
                        </a>

                        <a
                          href={card.ourServiceLinkPath}
                          onClick={(e) =>
                            handleLinkClick(e, card.ourServiceLinkPath)
                          }
                          className="inline-flex items-center justify-center gap-1 text-xs font-bold text-[#0F766E] hover:text-[#0B2545] transition-colors py-1"
                        >
                          <span>{card.ourServiceLinkLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* 3B. PRACTICAL VFS / EMBASSY SUBMISSION TIPS (Human-First Guidance) */}
        <section
          aria-labelledby="visa-human-tips-heading"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                Practical Indian Applicant Guidance · Avoid Common VFS Queries
              </span>
              <h2
                id="visa-human-tips-heading"
                className="text-lg sm:text-2xl font-extrabold text-[#0B2545] font-display"
              >
                4 Important Things to Check Before Your {checklist.countryName}{" "}
                {checklist.visaTypeDisplay} Appointment
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklist.humanTips.map((tip, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B2545] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#0B2545]">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Services & All Country Visa Checklists Directory */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
              Our Services for {checklist.countryName} Applicants
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0B2545] font-display">
              Apostille, Attestation &amp; Certified Translation Links
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {checklist.relatedServiceLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="group rounded-xl border border-slate-200 hover:border-[#0F766E] bg-slate-50/70 hover:bg-teal-50/30 p-4 transition-colors flex flex-col justify-between gap-2"
              >
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-[#0F766E] transition-colors flex items-center justify-between gap-1.5">
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Searchable Directory of All Countries (Student & Work Visa Checklists) */}
          <div className="pt-6 border-t border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                  Complete Global Visa Checklist Directory ({VISA_CHECKLIST_COUNTRIES.length} Countries · {VISA_CHECKLIST_PAGES.length} Guides)
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0B2545] font-display">
                  Browse Student &amp; Work Visa Checklists for All Countries
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setDirectoryFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    directoryFilter === "all"
                      ? "bg-[#0B2545] text-white"
                      : "bg-slate-100 text-slate-600 hover:text-[#0B2545]"
                  }`}
                >
                  All ({VISA_CHECKLIST_PAGES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDirectoryFilter("student-visa")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    directoryFilter === "student-visa"
                      ? "bg-[#0F766E] text-white"
                      : "bg-slate-100 text-slate-600 hover:text-[#0B2545]"
                  }`}
                >
                  Student Visas ({VISA_CHECKLIST_COUNTRIES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setDirectoryFilter("work-visa")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    directoryFilter === "work-visa"
                      ? "bg-[#0F766E] text-white"
                      : "bg-slate-100 text-slate-600 hover:text-[#0B2545]"
                  }`}
                >
                  Work Visas ({VISA_CHECKLIST_COUNTRIES.length})
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder="Search any country or visa type (e.g., Israel Work Visa, Italy Student, Portugal, Germany, Lithuania, Russia, Japan)..."
                aria-label="Search country visa checklists"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 focus:border-[#0F766E] focus:bg-white text-xs sm:text-sm text-slate-800 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredDirectoryPages.map((item) => {
                const isActive = item.slug === checklist.slug;
                return (
                  <a
                    key={item.slug}
                    href={item.slug}
                    onClick={(e) => handleLinkClick(e, item.slug)}
                    className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                      isActive
                        ? "bg-[#0B2545] text-white border-[#0B2545]"
                        : "bg-slate-50/80 text-slate-700 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CountryFlag
                        isoCode={item.isoCode}
                        countryName={item.countryName}
                        size="sm"
                        className="!w-4 !h-3 rounded-xs shrink-0"
                      />
                      <span className="truncate">
                        {item.countryName}{" "}
                        {item.visaType === "student-visa" ? "Student Visa" : "Work Visa"}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 shrink-0 opacity-60" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. DISCLAIMER (CRITICAL) */}
        <section aria-label="Official Visa Checklist Disclaimer">
          <div className="rounded-2xl bg-amber-50/90 border border-amber-300 p-5 sm:p-6 flex items-start gap-3.5 text-amber-950 shadow-2xs">
            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 block">
                Important Advisory &amp; Private Agency Disclaimer
              </span>
              <p className="text-xs sm:text-sm leading-relaxed font-medium text-amber-950">
                {checklist.disclaimerText}
              </p>
            </div>
          </div>
        </section>

        {/* 5. FAQS (Accordion) */}
        <section
          aria-labelledby="visa-checklist-faq-heading"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
              Frequently Asked Questions
            </span>
            <h2
              id="visa-checklist-faq-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#0B2545] font-display tracking-tight"
            >
              {checklist.countryName} {checklist.visaTypeDisplay} FAQs
            </h2>
          </div>

          <FAQAccordion items={checklist.faqs} />
        </section>

        {/* 6. CTA SECTION */}
        <section
          aria-labelledby="visa-checklist-cta-heading"
          className="rounded-2xl bg-[#0B2545] text-white p-6 sm:p-10 border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
              Connaught Place, New Delhi Desk · Pan-India Courier Support
            </span>
            <h2
              id="visa-checklist-cta-heading"
              className="text-xl sm:text-3xl font-extrabold text-white font-display tracking-tight"
            >
              Need Help Preparing Your {checklist.countryName}{" "}
              {checklist.visaTypeDisplay} Documents?
            </h2>
            <p className="text-xs sm:text-sm text-amber-300 font-semibold leading-relaxed">
              We provide Apostille, Attestation, and Translation services for this visa.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Share your document list or scan on WhatsApp and our team will guide you on the exact authentication route and timeline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={getWhatsAppUrl(checklist.ctaWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span>Check My Document Route on WhatsApp</span>
            </a>

            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Call {BUSINESS_CONFIG.displayPhone}</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};
