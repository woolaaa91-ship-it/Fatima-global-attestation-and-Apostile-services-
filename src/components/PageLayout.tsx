import React from "react";
import {
  ChevronRight,
  Phone,
  ArrowRight,
  ExternalLink,
  Compass,
  BookOpen,
  MapPin,
} from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { DisclaimerBox } from "./DisclaimerBox";
import { QuoteForm } from "./QuoteForm";
import { DirectWhatsAppConsultationBox } from "./DirectWhatsAppConsultationBox";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface OfficialPortalLink {
  label: string;
  url: string;
  authority: string;
  description: string;
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  intro: string;
  whatsappMessage?: string;
  targetKeywords?: string[];
  onEnquireClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  intro,
  whatsappMessage,
  targetKeywords,
  onEnquireClick,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 py-7 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-3.5 sm:space-y-4">
          <div className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
            {kicker}
          </div>

          {/* H1: 28px-32px on mobile/tablet, scaling cleanly on desktop */}
          <h1 className="text-[28px] sm:text-[32px] lg:text-4xl font-extrabold text-[#0A192F] font-display tracking-tight leading-[1.18]">
            {title}
          </h1>

          {/* Body: 16px readable prose */}
          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            {intro}
          </p>

          {/* Prominent WhatsApp CTA + Call + Enquire */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat on WhatsApp ({BUSINESS_CONFIG.displayPhone})</span>
            </a>

            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold text-[#0A192F] bg-white hover:bg-[#F3F4F6] border border-slate-300 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
              <span>Call {BUSINESS_CONFIG.displayPhone}</span>
            </a>

            {onEnquireClick && (
              <button
                type="button"
                onClick={onEnquireClick}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold text-[#0F766E] bg-teal-50/80 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer"
              >
                <span>Request Free Guidance</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
              </button>
            )}
          </div>

          {/* Search Intent / Topic Scope Summary (Unboxed clean metadata with middot separators) */}
          {targetKeywords && targetKeywords.length > 0 && (
            <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-slate-700">Key Topics:</span>
              {targetKeywords.map((kw, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span>{kw}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface ContentCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section
      className={`bg-white rounded-xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs ${className}`}
    >
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display leading-snug">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
};

interface OfficialLinksCardProps {
  links: OfficialPortalLink[];
}

export const OfficialLinksCard: React.FC<OfficialLinksCardProps> = ({
  links,
}) => {
  if (!links || links.length === 0) return null;

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
          Official Government &amp; Authority Portals
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Direct reference links to official government ministries, conventions, and verification portals:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#F3F4F6]/80 hover:bg-teal-50/70 border border-slate-200 hover:border-[#0F766E]/40 transition-all group flex flex-col justify-between gap-2"
          >
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  {link.authority}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F766E] shrink-0 mt-0.5" />
              </div>
              <h3 className="text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] transition-colors">
                {link.label}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {link.description}
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 truncate">
              {link.url}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

interface PageLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  kicker: string;
  title: string;
  intro: string;
  whatsappMessage?: string;
  targetKeywords?: string[];
  quoteServiceSlug?: string;
  quoteTitle?: string;
  relatedLinks?: {
    title: string;
    slug: string;
    category: string;
  }[];
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  breadcrumbs,
  kicker,
  title,
  intro,
  whatsappMessage,
  targetKeywords,
  quoteServiceSlug,
  quoteTitle,
  relatedLinks,
  onNavigate,
  children,
}) => {
  const scrollToEnquire = () => {
    const el = document.getElementById("page-enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      onNavigate("/contact-us");
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-16 sm:pb-12">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  {crumb.path && !isLast ? (
                    <a
                      href={crumb.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(crumb.path!);
                      }}
                      className="hover:text-[#0A192F] transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-[#0A192F] font-semibold">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Reusable PageHeader */}
      <PageHeader
        kicker={kicker}
        title={title}
        intro={intro}
        whatsappMessage={whatsappMessage}
        targetKeywords={targetKeywords}
        onEnquireClick={scrollToEnquire}
      />

      {/* Main Content + Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
        {/* Mandatory Private Agency Disclaimer Box at Top of Page Body */}
        <div className="mb-6 sm:mb-8">
          <DisclaimerBox />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-9 items-start">
          {/* 7-Column Primary Content */}
          <main className="lg:col-span-7 min-w-0 space-y-6 sm:space-y-7">
            {children}

            <DirectWhatsAppConsultationBox
              subjectName={title}
              shortName={kicker}
              routeBadge={kicker}
              kickerText="Direct Desk Consultation"
            />

            {/* Related Dedicated Pages */}
            {relatedLinks && relatedLinks.length > 0 && (
              <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 space-y-4">
                <h2 className="text-lg font-bold text-[#0A192F] font-display">
                  Related Attestation, Country &amp; Guide Pages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.slug);
                      }}
                      className="p-3.5 rounded-xl bg-[#F3F4F6]/80 hover:bg-teal-50 border border-slate-200 hover:border-[#0F766E]/40 transition-colors group flex flex-col justify-between gap-1.5"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                        {item.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-[#0F766E] leading-snug">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#0F766E] inline-flex items-center gap-1 pt-0.5 font-semibold">
                        <span>Open Dedicated Page</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="/#route-finder"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("/#route-finder");
                    }}
                    className="p-3.5 rounded-xl bg-[#0A192F] text-white hover:bg-slate-900 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate">
                          Document Route Finder
                        </span>
                        <span className="text-[11px] text-slate-300 block truncate">
                          Check your exact country route
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  </a>

                  <a
                    href="/locations/apostille-agent-delhi"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("/locations/apostille-agent-delhi");
                    }}
                    className="p-3.5 rounded-xl bg-teal-50/80 hover:bg-teal-100 border border-teal-200 text-[#0A192F] transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <MapPin className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate">
                          Connaught Place, New Delhi Desk
                        </span>
                        <span className="text-[11px] text-slate-600 block truncate">
                          PAN-India Courier &amp; Submission Support
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                  </a>
                </div>
              </section>
            )}
          </main>

          {/* 5-Column Sticky Sidebar: Direct WhatsApp Card + Enquiry Form */}
          <aside className="lg:col-span-5 min-w-0 space-y-6 lg:sticky lg:top-20">
            <div className="bg-[#0A192F] text-white rounded-xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                Connaught Place, New Delhi • PAN-India Service
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                Need Document Review or Process Guidance?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Share your document type and destination country on WhatsApp. Our team verifies whether you require Notary, SDM, State HRD, Chamber of Commerce, MEA Apostille, or Embassy Legalization.
              </p>
              <a
                href={getWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Inquire on WhatsApp ({BUSINESS_CONFIG.displayPhone})</span>
              </a>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>Direct Desk Call:</span>
                <a
                  href={`tel:${BUSINESS_CONFIG.telPhone}`}
                  className="font-bold text-teal-300 hover:underline"
                >
                  {BUSINESS_CONFIG.displayPhone}
                </a>
              </div>
            </div>

            <div id="page-enquiry-form" className="scroll-mt-24">
              <QuoteForm
                initialServiceSlug={quoteServiceSlug}
                title={quoteTitle || `Enquire About ${title}`}
                subtitle="Provide your document type and destination country for accurate procedural guidance."
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <BookOpen className="w-4 h-4 text-[#0F766E] shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#0A192F] block truncate">
                    Official e-Sanad Guide &amp; Status
                  </span>
                  <span className="text-[11px] text-slate-600 block truncate">
                    Check online verification &amp; portal steps
                  </span>
                </div>
              </div>
              <a
                href="/guides/e-sanad"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/guides/e-sanad");
                }}
                className="text-xs font-bold text-[#0F766E] hover:underline shrink-0"
              >
                Read Guide →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
