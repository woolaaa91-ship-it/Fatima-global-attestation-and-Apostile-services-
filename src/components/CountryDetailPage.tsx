import React, { useState } from "react";
import {
  CountryDirectoryEntry,
  PRIORITY_12_COUNTRIES,
  COUNTRY_DIRECTORY,
  MEA_PROTOCOL_REFERENCE_URL,
} from "../data/countryDirectory";
import { SERVICES } from "../data/services";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CountryFlag } from "./CountryFlag";
import { QuoteForm } from "./QuoteForm";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion } from "./FAQAccordion";
import { DirectWhatsAppConsultationBox } from "./DirectWhatsAppConsultationBox";
import {
  ChevronRight,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Compass,
  Phone,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Users,
  Briefcase,
  Scale,
  Languages,
  Landmark,
  FileCheck2,
  ListChecks,
} from "lucide-react";

interface CountryDetailPageProps {
  country: CountryDirectoryEntry;
  onNavigate: (path: string) => void;
}

const DOCUMENT_TYPE_OPTIONS = [
  "Educational Document (Degree / Diploma / Marksheet / Bonafide)",
  "Personal Document (Birth / Marriage Certificate / PCC)",
  "Legal Document (Power of Attorney / Wakala / Affidavit / Legal Heir)",
  "Commercial Document (Certificate of Origin / Invoice / Board Resolution)",
  "Multiple / Other Documents",
];

const PURPOSE_OPTIONS = [
  "Employment Visa / Work Permit",
  "Higher Education / University Admission",
  "Family / Dependent Visa Sponsorship",
  "Commercial Export / Corporate Branch Setup",
  "Legal / Property / Court / Heirship Filing",
  "Permanent Residency / Civil Registration",
];

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({
  country,
  onNavigate,
}) => {
  const [selectedDocType, setSelectedDocType] = useState<string>(
    DOCUMENT_TYPE_OPTIONS[0]
  );
  const [selectedPurpose, setSelectedPurpose] = useState<string>(
    PURPOSE_OPTIONS[0]
  );

  const relatedServices = SERVICES.filter((s) =>
    country.relatedServiceSlugs.includes(s.slug)
  );

  // Related priority and verified countries for cross-navigation
  const relatedCountries = [
    ...PRIORITY_12_COUNTRIES.filter((c) => c.slug !== country.slug),
    ...COUNTRY_DIRECTORY.filter(
      (c) =>
        c.isIndexable &&
        !c.isPriority12 &&
        c.slug !== country.slug
    ),
  ].slice(0, 11);

  const prefilledWhatsAppMessage = [
    `Hello ${BUSINESS_CONFIG.shortName}, I need document authentication guidance and quotation:`,
    ``,
    `• Destination Country: ${country.name}`,
    `• Document Category: ${selectedDocType}`,
    `• Intended Purpose: ${selectedPurpose}`,
    `• Applicable Route: ${country.heroBadge}`,
    ``,
    `Please confirm the exact procedure and requirements for my documents.`,
  ].join("\n");

  const getStatusBadgeClasses = (
    status: CountryDirectoryEntry["verificationStatus"]
  ) => {
    if (status === "Verified") {
      return "bg-emerald-500/20 text-emerald-200 border-emerald-400/40";
    }
    if (status === "Partially Verified") {
      return "bg-teal-500/20 text-teal-200 border-teal-400/40";
    }
    return "bg-amber-500/20 text-amber-200 border-amber-400/40";
  };

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 min-w-0"
            aria-label="Breadcrumb"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href="/countries"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/countries");
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Countries
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate">
              {country.name}
            </span>
          </nav>
        </div>
      </div>

      {/* SECTION 1 & 2: Country-Specific Hero Section + Country Flag & Destination Name */}
      <header className="bg-gradient-to-br from-[#0A192F] via-[#0B2545] to-[#0F3F49] text-white border-b border-slate-800 py-9 sm:py-14">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-4xl min-w-0">
            {/* Top Status & Region Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#F3C969] border border-[#D49B27]/50">
                <Globe2 className="w-3.5 h-3.5 text-[#D49B27] shrink-0" />
                <span>{country.heroBadge}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 text-slate-200 border border-white/15">
                <span>Region: {country.continent}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadgeClasses(
                  country.verificationStatus
                )}`}
              >
                {country.verificationStatus ===
                "Route requires confirmation" ? (
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{country.verificationStatus}</span>
              </span>
            </div>

            {/* Country Flag + Destination Name & H1 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 pt-1">
              <CountryFlag
                isoCode={country.isoCode}
                countryName={country.name}
                size="lg"
                className="border-white/30 shadow-md"
              />
              <div className="space-y-1 min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                  Destination Country: {country.name} ({country.isoCode})
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
                  {country.h1}
                </h1>
              </div>
            </div>

            {/* Country-Specific Attestation & Apostille Summary */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {country.summary}
            </p>

            {/* Applicable Route Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#F3C969]">
                Applicable Route(s) from India:
              </span>
              {country.applicableRoutes.map((route) => (
                <span
                  key={route}
                  className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold"
                >
                  {route}
                </span>
              ))}
            </div>

            {/* Hero Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={getWhatsAppUrl(prefilledWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>WhatsApp Enquiry for {country.shortName}</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.telPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F3C969]" />
                <span>Call {BUSINESS_CONFIG.displayPhone}</span>
              </a>

              <a
                href="/countries"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/countries");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 hover:bg-white/15 border border-white/15 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explore All Countries</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <DisclaimerBox />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Columns: All 13 Structured Country Content Sections */}
          <main className="lg:col-span-7 min-w-0 space-y-7">
            {/* SECTION 3 & 4: Country-Specific Attestation/Apostille Information & Applicable Route from India */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                  Treaty Status &amp; Official Procedure from India
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                    country.isApostilleMember
                      ? "bg-teal-50 text-[#0F766E] border-teal-200"
                      : "bg-amber-50 text-[#92600A] border-amber-200"
                  }`}
                >
                  {country.isApostilleMember
                    ? "Hague Apostille Member Country"
                    : "Embassy Legalization & MOFA Route"}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-serif">
                Applicable Authentication Route for {country.name} from India
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {country.routeOverview}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                <strong className="text-[#0A192F]">
                  Important Route Dependency Note:
                </strong>{" "}
                The exact authentication sequence depends on the document category, the issuing Indian state or university, and the instructions of the receiving employer, university, ministry, or embassy in {country.name}.
              </div>
            </section>

            {/* Interactive Pre-filled WhatsApp Enquiry CTA (Moved near top for immediate conversion & UX) */}
            <DirectWhatsAppConsultationBox
              subjectName={country.name}
              shortName={country.shortName}
              countryIsoCode={country.isoCode}
              routeBadge={country.heroBadge}
              kickerText="Direct Country Desk Consultation"
            />

            {/* SECTION 10: Step-by-Step Authentication Process from India */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                  Step-by-Step Workflow
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-serif">
                  Step-by-Step Process for {country.shortName}{" "}
                  {country.isApostilleMember
                    ? "Apostille & Attestation"
                    : "Certificate Attestation"}
                </h2>
              </div>

              <div className="space-y-3.5">
                {country.stepByStepProcess.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0A192F] text-[#F3C969] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#D49B27]/50">
                      {step.stepNumber}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h3 className="text-sm font-bold text-[#0A192F]">
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {step.authority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTIONS 5, 6, 7, 8: Educational, Personal, Commercial & Legal Document Requirements */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                  Document Category Requirements
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-serif">
                  Educational, Personal, Commercial &amp; Legal Document Requirements for{" "}
                  {country.shortName}
                </h2>
              </div>

              <div className="space-y-3.5">
                {/* 5. Educational Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F]">
                    <GraduationCap className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>
                      Educational Documents (Degrees, Diplomas, Marksheets, Transcripts, School Certificates)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {country.categoryGuidance.educational}
                  </p>
                </div>

                {/* 6. Personal Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F]">
                    <Users className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>
                      Personal &amp; Civil Documents (Birth, Marriage, PCC, Medical, Divorce, Death Certificates)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {country.categoryGuidance.personal}
                  </p>
                </div>

                {/* 7. Commercial Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F]">
                    <Briefcase className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>
                      Commercial &amp; Export Documents (Certificate of Origin, Commercial Invoices, Packing Lists, Board Resolutions)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {country.categoryGuidance.commercial}
                  </p>
                </div>

                {/* 8. Legal Documents */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A192F]">
                    <Scale className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>
                      Legal Documents (Power of Attorney / Wakala, Affidavits, Single Status, Legal Heirship, Court Documents)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {country.categoryGuidance.legal}
                  </p>
                </div>

                {/* Translation Guidance */}
                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-950">
                    <Languages className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>Certified Translation &amp; Language Requirements</span>
                  </div>
                  <p className="text-xs text-teal-900/90 leading-relaxed">
                    {country.translationRequirement}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: Supporting Documents & Special Conditions */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-[#0F766E] shrink-0" />
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-serif">
                  Supporting Documents &amp; Special Conditions for{" "}
                  {country.shortName}
                </h2>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {country.supportingDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              {country.itemsRequiringConfirmation.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Case-Specific Points Confirmed Before Submission</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-950/90 leading-relaxed">
                    {country.itemsRequiringConfirmation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-amber-700">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* SECTION 11: Country-Specific FAQs */}
            {country.faqs && country.faqs.length > 0 && (
              <FAQAccordion
                title={`Frequently Asked Questions — ${country.name}`}
                subtitle={`Common questions regarding document attestation, MEA Hague Apostille, and consular legalization for ${country.shortName}.`}
                items={country.faqs}
              />
            )}

            {/* Official Diplomatic & Treaty Reference Links */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-serif flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#0F766E] shrink-0" />
                  <span>Official Diplomatic &amp; Treaty Reference Links</span>
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {country.missionNote}
                </p>
              </div>

              <div className="space-y-2.5">
                {country.officialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900 block break-words">
                        {link.title}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5 break-all">
                        {link.authority} • {link.url}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#0F766E] shrink-0" />
                  </a>
                ))}
              </div>
            </section>

            {/* SECTION 13: Related Services and Related Country Links */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-serif">
                  Related Authentication Services for {country.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedServices.map((rel) => (
                    <a
                      key={rel.id}
                      href={rel.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(rel.slug);
                      }}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-colors group flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-bold text-slate-900 group-hover:text-teal-950">
                        {rel.shortTitle}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                    </a>
                  ))}
                  <a
                    href="/services/apostille"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("/services/apostille");
                    }}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-colors group flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-slate-900 group-hover:text-teal-950">
                      MEA Apostille Services
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                  </a>
                  <a
                    href="/services/embassy-legalization"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("/services/embassy-legalization");
                    }}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-colors group flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-slate-900 group-hover:text-teal-950">
                      Embassy Legalization Services
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Other Country Landing Pages */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <span className="text-xs font-bold text-[#0A192F] block">
                  Explore Other Destination Country Guides:
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedCountries.map((other) => {
                    const otherPath = `/countries/${other.canonicalSlug}`;
                    return (
                      <a
                        key={other.slug}
                        href={otherPath}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(otherPath);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200/80 hover:border-teal-200 text-xs font-semibold transition-colors"
                      >
                        <CountryFlag
                          isoCode={other.isoCode}
                          countryName={other.shortName}
                          size="sm"
                        />
                        <span>{other.shortName}</span>
                      </a>
                    );
                  })}
                  <a
                    href="/countries"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("/countries");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#0F766E] text-white text-xs font-bold transition-colors"
                  >
                    <span>Explore All Countries →</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href="/#route-finder"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/#route-finder");
                  }}
                  className="p-4 rounded-xl bg-[#0A192F] text-white hover:bg-slate-900 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Compass className="w-5 h-5 text-[#D49B27] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold block">
                        Interactive Document Route Finder
                      </span>
                      <span className="text-[11px] text-slate-300 block">
                        Compare document-specific verification pathways on our homepage
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D49B27] shrink-0" />
                </a>
              </div>
            </section>
          </main>

          {/* Right 5 Columns: Quotation Form */}
          <aside className="lg:col-span-5 min-w-0">
            <QuoteForm
              initialServiceSlug="/embassy-legalization-all-countries"
              prefillDetails={{
                serviceSlug: "/embassy-legalization-all-countries",
                destinationCountry: country.name,
              }}
              title={`Request Route Assessment for ${country.shortName}`}
              subtitle="Provide your document type and purpose below. Our documentation desk will confirm the exact authentication route."
            />
          </aside>
        </div>
      </div>
    </div>
  );
};
