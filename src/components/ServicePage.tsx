import React, { useEffect, useState } from "react";
import { ServiceItem, SERVICES } from "../data/services";
import { QuoteForm } from "./QuoteForm";
import { getWhatsAppUrl, BUSINESS_CONFIG } from "../config/business";
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Phone,
  Compass,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandLogo } from "./BrandLogo";
import { CountryDirectory } from "./CountryDirectory";
import { DisclaimerBox } from "./DisclaimerBox";
import { DirectWhatsAppConsultationBox } from "./DirectWhatsAppConsultationBox";
import { DocumentSafetyTrustSection } from "./DocumentSafetyTrustSection";

interface ServicePageProps {
  service: ServiceItem;
  onNavigate: (path: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setOpenFaqIndex(0);
  }, [service.slug]);

  // Find related service objects
  const relatedServicesList = SERVICES.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  return (
    <div className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 min-w-0" aria-label="Breadcrumb">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="hover:text-slate-900 transition-colors shrink-0"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/#services");
              }}
              className="hover:text-slate-900 transition-colors shrink-0"
            >
              Services
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate">
              {service.shortTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* Service Header / Hero Banner */}
      <header className="bg-white border-b border-slate-200 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 min-w-0 space-y-4">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                {service.badge}
              </span>
              
              {/* Single Clear H1 Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
                {service.title}
              </h1>

              {/* Introductory Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                {service.intro}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-xs transition-colors group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.telPhone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Call {BUSINESS_CONFIG.displayPhone}</span>
                </a>

                <a
                  href="#service-quote"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("#service-quote");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
                >
                  <span>Request a Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
                </a>
              </div>
            </div>

            {/* Service Icon Focal Card */}
            <div className="lg:col-span-4 min-w-0">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-400/35 flex items-center justify-center mb-2.5 shadow-xs">
                    <ShieldCheck className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    {service.badge}
                  </span>
                  <span className="text-sm font-extrabold text-white mt-1 font-display line-clamp-2">
                    {service.shortTitle}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold tracking-wide bg-slate-950/75 backdrop-blur-xs px-2.5 py-1 rounded">
                      {service.shortTitle}
                    </span>
                    <BrandLogo variant="mark" className="w-6 h-6 rounded-sm" />
                  </div>
                </div>
                <div className="p-3 bg-white text-[11px] text-slate-500 text-center border-t border-slate-100">
                  Authentication assistance compliant with MEA and consular standards.
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <DisclaimerBox />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Main 8-Column Details */}
          <main className="lg:col-span-7 min-w-0 space-y-8 sm:space-y-10">
            {(service.slug === "/embassy-legalization-all-countries" ||
              service.slug === "/embassy-legalization-services") && (
              <CountryDirectory onNavigate={onNavigate} />
            )}

            {/* Section 4: Who May Need the Service */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Who Needs This Service?
              </h2>
              <ul className="space-y-3">
                {service.whoNeeds.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 5: Eligible Documents */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-5">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Eligible Document Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.eligibleDocuments.map((cat, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                      {cat.category}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {cat.items.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-1.5">
                          <span className="text-teal-600">›</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Step-by-Step Process */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-5">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Step-by-Step Process
              </h2>
              <div className="space-y-4">
                {service.stepByStepProcess.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-3.5 rounded-lg bg-slate-50/80 border border-slate-100">
                    <div className="w-7 h-7 rounded-md bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Required Documents */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Required Documents & Information
              </h2>
              <div className="space-y-2.5">
                {service.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Important Notes */}
            <section className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-display">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Important Procedural Notes</span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950/90 leading-relaxed">
                {service.importantNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Interactive Pre-filled WhatsApp Consultation Box */}
            <DirectWhatsAppConsultationBox
              subjectName={service.title}
              shortName={service.shortTitle}
              routeBadge={service.shortTitle}
              kickerText="Direct Service Desk Consultation"
            />

            {/* Document Safety & Custody Trust Protocol */}
            <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
              <DocumentSafetyTrustSection onNavigate={onNavigate} isEmbedded={true} />
            </div>

            {/* Section 9: Service-Specific FAQs */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Frequently Asked Questions for {service.shortTitle}
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? "border-teal-500/60 bg-white shadow-xs ring-1 ring-teal-500/20"
                          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer transition-colors group"
                      >
                        <span className={`leading-snug break-words min-w-0 pr-2 ${isOpen ? "text-teal-950" : "group-hover:text-teal-900"}`}>
                          {faq.question}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        }`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 bg-slate-50/40 border-t border-slate-100 leading-relaxed whitespace-pre-line pt-2.5">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 12: Related Services & Internal Tools */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <div className="space-y-3">
                <h2 className="text-base font-bold text-slate-900 font-display">
                  Related Authentication Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {relatedServicesList.map((rel) => (
                    <a
                      key={rel.id}
                      href={rel.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(rel.slug);
                      }}
                      className="p-3 text-left rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-colors group flex flex-col justify-between"
                    >
                      <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900 break-words leading-snug">
                        {rel.shortTitle}
                      </span>
                      <span className="text-[11px] text-teal-700 flex items-center gap-1 mt-2">
                        <span>View details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/#route-finder"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/#route-finder");
                  }}
                  className="p-3.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold block truncate">
                        Document Route Finder
                      </span>
                      <span className="text-[11px] text-slate-300 block truncate">
                        Check your exact country &amp; document route
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                </a>

                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/blog");
                  }}
                  className="p-3.5 rounded-lg bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200 text-teal-950 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold block truncate">
                        Knowledge Centre &amp; Guides
                      </span>
                      <span className="text-[11px] text-teal-800 block truncate">
                        Read procedural &amp; country checklists
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                </a>
              </div>
            </section>

          </main>

          {/* Sticky 5-Column Sidebar: Quote Request Form & WhatsApp CTA */}
          <aside className="lg:col-span-5 min-w-0 space-y-6">
            
            {/* WhatsApp Quick Assistance Box */}
            <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">
                New Delhi Desk • Pan-India Support
              </span>
              <h3 className="text-base font-bold text-white font-display">
                Have urgent questions about {service.shortTitle}?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our documentation team at {BUSINESS_CONFIG.address} to verify document eligibility, country rules, and fee estimates.
              </p>
              <a
                href={getWhatsAppUrl(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Section 11: Quote Request Form */}
            <div id="service-quote" className="scroll-mt-24">
              <QuoteForm
                initialServiceSlug={service.slug}
                title={`Get a Quote for ${service.shortTitle}`}
                subtitle="Submit your document details to receive transparent estimates and procedural instructions."
              />
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
