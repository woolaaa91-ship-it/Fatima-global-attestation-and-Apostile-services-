import React, { useState } from "react";
import { SERVICES, ServiceItem } from "../data/services";
import { PRIORITY_12_COUNTRIES } from "../data/countryDirectory";
import {
  VISA_CHECKLIST_PAGES,
  VISA_CHECKLIST_COUNTRIES,
  VisaTypeSlug,
} from "../data/visaChecklists";
import { getWhatsAppUrl } from "../config/business";
import {
  FileCheck2,
  Stamp,
  Globe2,
  FileBadge,
  Building2,
  Briefcase,
  Languages,
  Landmark,
  HeartHandshake,
  GraduationCap,
  Users,
  ArrowRight,
  MapPin,
  BookOpen,
  Search,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CountryFlag } from "./CountryFlag";

interface ServicesGridProps {
  onSelectService: (slug: string) => void;
}

interface FeaturedServiceCard {
  id: string;
  title: string;
  description: string;
  slug: string;
  isHighlightedTeal?: boolean;
  iconBgClass: string;
  arrowBgClass: string;
  icon: React.ReactNode;
}

const FEATURED_SERVICES: FeaturedServiceCard[] = [
  {
    id: "featured-apostille",
    title: "Apostille Services",
    description:
      "MEA Hague Apostille for educational, personal and commercial documents.",
    slug: "/services/apostille",
    iconBgClass: "bg-[#EAF2FD]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <FileCheck2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#1D72E8]" />,
  },
  {
    id: "featured-degree-apostille",
    title: "Degree Certificate Apostille",
    description:
      "HRD, SDM verification and e-Sanad assistance for university degrees.",
    slug: "/services/degree-certificate-apostille",
    iconBgClass: "bg-[#E6F6EC]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <GraduationCap className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0D9458]" />,
  },
  {
    id: "featured-commercial",
    title: "Commercial Attestation",
    description:
      "Chamber of Commerce (PHDCCI/FIEO), Export Invoices, POA & Packing Lists.",
    slug: "/services/commercial-document-attestation",
    iconBgClass: "bg-[#EEF2FF]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <Briefcase className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#4338CA]" />,
  },
  {
    id: "featured-embassy-legalisation",
    title: "Embassy Legalization",
    description:
      "Consular attestation for Non-Hague countries via MEA & Foreign Embassies.",
    slug: "/services/embassy-legalization",
    iconBgClass: "bg-[#F3EBFB]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <Landmark className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#7E22CE]" />,
  },
  {
    id: "featured-translation",
    title: "Document Translation",
    description:
      "Certified translation in Arabic, French, German, Spanish & more.",
    slug: "/services/document-translation",
    iconBgClass: "bg-[#FDF0E6]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <Languages className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#EA580C]" />,
  },
  {
    id: "featured-notary",
    title: "Notary Public Attestation",
    description:
      "Affidavits, Single Status, POA execution and initial notarization.",
    slug: "/services/notary-public",
    iconBgClass: "bg-[#F1F5F9]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <Stamp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0A192F]" />,
  },
  {
    id: "featured-esanad",
    title: "e-Sanad Guide & Status",
    description:
      "Official esanad.nic.in application guide, digital verification & status check.",
    slug: "/guides/e-sanad",
    iconBgClass: "bg-[#E0F2FE]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <BookOpen className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0284C7]" />,
  },
  {
    id: "featured-saudi-death-claim",
    title: "Saudi Arabia Death Claim Assistance",
    description:
      "Legal Heir, Wakala (POA), Arabic translation & Saudi Embassy routing.",
    slug: "/services/saudi-death-claim",
    isHighlightedTeal: true,
    iconBgClass: "bg-[#DFF3E6]",
    arrowBgClass:
      "bg-[#D2F0DC] text-[#15803D] group-hover:bg-[#15803D] group-hover:text-white",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#15803D]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 14V6" />
        <path d="M12 6C9.5 4.5 6.5 5.5 5.5 7.5" />
        <path d="M12 6C14.5 4.5 17.5 5.5 18.5 7.5" />
        <path d="M12 7.5C9.5 7 7.5 8.5 7 10.5" />
        <path d="M12 7.5C14.5 7 16.5 8.5 17 10.5" />
        <path d="M12 6C11 3.5 13 3.5 12 6" />
        <path d="M6 20L17 15" />
        <path d="M18 20L7 15" />
      </svg>
    ),
  },
  {
    id: "featured-mofa-attestation",
    title: "MOFA Attestation Services",
    description:
      "Ministry of Foreign Affairs (MOFA) & Embassy attestation for UAE, Qatar, Kuwait, Saudi Arabia, Oman & Bahrain.",
    slug: "/services/mofa-attestation",
    iconBgClass: "bg-[#FEF3C7]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <Globe2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#B45309]" />,
  },
  {
    id: "featured-visa-checklists",
    title: `Visa Checklists (${VISA_CHECKLIST_COUNTRIES.length} Countries)`,
    description:
      `Italy Student Visa, Germany Work Visa, Israel B/1 Work Visa, UK, USA, UAE & ${VISA_CHECKLIST_COUNTRIES.length} countries' VFS document checklists.`,
    slug: "/visa-checklist/italy-student-visa",
    iconBgClass: "bg-[#E0F2FE]",
    arrowBgClass:
      "bg-[#E6F4F1] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    icon: <FileBadge className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0369A1]" />,
  },
];

// Priority 12 countries are sourced directly from PRIORITY_12_COUNTRIES in ../data/countryDirectory

// Icon mapper for all specialized services
const getServiceIcon = (id: string) => {
  switch (id) {
    case "sdm-apostille":
      return <Stamp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "apostille-only":
      return <FileCheck2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "e-sanad-paper":
      return <FileBadge className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "sdm-mea":
    case "uae-attestation":
      return <Globe2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "coc-apostille":
      return <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "coc-mea":
      return <Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "translation":
      return <Languages className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "embassy-legalization":
    case "embassy-legalization-all-countries":
    case "saudi-attestation":
      return <Landmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "saudi-death-claim":
      return <HeartHandshake className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "educational-attestation":
      return <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    case "personal-attestation":
      return <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
    default:
      return <FileCheck2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0F766E]" />;
  }
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
}) => {
  const [checklistTab, setChecklistTab] = useState<VisaTypeSlug>("student-visa");
  const [checklistSearch, setChecklistSearch] = useState("");
  const [showAllChecklists, setShowAllChecklists] = useState(false);

  const filteredChecklists = VISA_CHECKLIST_PAGES.filter((item) => {
    if (item.visaType !== checklistTab) return false;
    const q = checklistSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      item.countryName.toLowerCase().includes(q) ||
      item.visaSubtypeNote.toLowerCase().includes(q) ||
      item.isoCode.toLowerCase().includes(q)
    );
  });

  const displayedChecklists =
    checklistSearch.trim().length > 0 || showAllChecklists
      ? filteredChecklists
      : filteredChecklists.slice(0, 12);

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectService("#all-core-services");
  };

  const renderCompactServiceCard = (service: ServiceItem) => (
    <div
      key={service.id}
      onClick={() => onSelectService(service.slug)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectService(service.slug);
        }
      }}
      className="bg-white hover:bg-teal-50/15 active:bg-teal-50/40 rounded-xl border border-slate-200/90 hover:border-[#0F766E] active:border-[#0F766E] shadow-2xs hover:shadow-xs active:scale-[0.985] transition-all duration-150 flex flex-col justify-between overflow-hidden group min-w-0 box-border cursor-pointer select-none"
    >
      <a
        href={service.slug}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelectService(service.slug);
        }}
        className="p-3 min-[380px]:p-3.5 sm:p-4 space-y-2 sm:space-y-2.5 cursor-pointer flex-1 flex flex-col min-w-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <div className="flex items-center justify-between gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100/70 transition-colors">
            {getServiceIcon(service.id)}
          </div>
          <span className="text-[9px] min-[380px]:text-[9.5px] font-bold text-teal-800 bg-teal-50/80 border border-teal-200/60 px-1.5 min-[380px]:px-2 py-0.5 rounded-full uppercase tracking-wide text-right break-normal hyphens-none max-w-[70%] leading-tight">
            {service.badge}
          </span>
        </div>

        <h3 className="text-[15px] sm:text-base font-extrabold text-[#0B2545] group-hover:text-[#0F766E] transition-colors font-display leading-snug break-normal hyphens-none min-w-0">
          {service.shortTitle || service.title}
        </h3>

        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none min-w-0">
          {service.summary}
        </p>
      </a>

      <div className="px-3 sm:px-3.5 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={service.slug}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelectService(service.slug);
          }}
          className="inline-flex items-center gap-1 px-2 py-0.5 min-[380px]:px-2.5 min-[380px]:py-1 rounded-md bg-[#0A192F] hover:bg-[#0F766E] text-white text-[10px] min-[380px]:text-[10.5px] font-bold transition-colors cursor-pointer select-none shadow-2xs"
        >
          <span>Open Guide</span>
          <ArrowRight className="w-2.5 h-2.5 text-[#F3C969] group-hover:text-white motion-safe:group-hover:translate-x-0.5 transition-transform shrink-0" />
        </a>

        <a
          href={getWhatsAppUrl(service.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-6 h-6 min-[380px]:w-7 min-[380px]:h-7 flex items-center justify-center text-[#25D366] hover:bg-emerald-50 rounded-md transition-colors shrink-0"
          title={`Enquire on WhatsApp about ${service.shortTitle}`}
          aria-label={`Enquire on WhatsApp about ${service.shortTitle}`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5 min-[380px]:w-4 min-[380px]:h-4 text-[#25D366]" />
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="services"
      className="py-7 sm:py-12 bg-white border-b border-slate-200 overflow-x-hidden scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 box-border space-y-10 sm:space-y-12">
        {/* 1. Dedicated Core Service Pages */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Dedicated Service Pages
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-serif tracking-tight">
                Our Attestation &amp; Apostille Services
              </h2>
            </div>
            <a
              href="#all-core-services"
              onClick={handleViewAllClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F766E] hover:text-[#0A192F] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
            >
              <span>View All Pathways</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {FEATURED_SERVICES.map((card) => (
              <a
                key={card.id}
                href={card.slug}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService(card.slug);
                }}
                className={`group rounded-2xl p-4 border transition-all duration-150 active:scale-[0.985] motion-reduce:transition-none flex flex-col justify-between gap-3 text-left cursor-pointer select-none shadow-2xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-w-0 box-border ${
                  card.isHighlightedTeal
                    ? "bg-[#EFFAF3] active:bg-[#DEF5E6] border-[#CBEAD6] hover:border-[#86EFAC]"
                    : "bg-white hover:bg-teal-50/15 active:bg-teal-50/40 border-slate-200/90 hover:border-[#0F766E] active:border-[#0F766E]"
                }`}
              >
                <div className="space-y-2.5 min-w-0">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${card.iconBgClass}`}
                  >
                    {card.icon}
                  </div>

                  <h3 className="text-[15px] sm:text-base font-extrabold text-[#0A192F] group-hover:text-[#0F766E] transition-colors font-serif leading-snug break-words min-w-0">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed break-words min-w-0">
                    {card.description}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0F766E]">
                    Open Page
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${card.arrowBgClass}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-0.5 transition-transform duration-200 motion-reduce:transition-none" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 2. Featured 12 Priority Countries Section */}
        <div
          id="countries"
          className="pt-8 border-t border-slate-200/80 scroll-mt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5 sm:mb-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                Country-Specific Legalization &amp; Apostille Routes
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] font-serif tracking-tight">
                Attestation &amp; Apostille by Destination Country
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Select your destination country to view specific educational, personal, commercial, and legal document authentication steps from India.
              </p>
            </div>
            <a
              href="/countries"
              onClick={(e) => {
                e.preventDefault();
                onSelectService("/countries");
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F766E] hover:text-[#0A192F] transition-colors shrink-0"
            >
              <span>Explore All Countries</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
            {PRIORITY_12_COUNTRIES.map((country) => {
              const targetUrl = `/countries/${country.canonicalSlug}`;
              const isApostille = country.isApostilleMember;
              return (
                <a
                  key={country.slug}
                  href={targetUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectService(targetUrl);
                  }}
                  className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-teal-50/20 active:bg-teal-50/50 border border-slate-200/90 hover:border-[#0F766E] active:border-[#0F766E] active:scale-[0.985] transition-all duration-150 group flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md min-w-0 box-border cursor-pointer select-none"
                >
                  <div className="space-y-2.5 min-w-0">
                    {/* Top row: Flag + Route Type Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <CountryFlag
                        isoCode={country.isoCode}
                        countryName={country.featuredCardTitle}
                        size="md"
                        className="!w-11 !h-7.5 sm:!w-12 sm:!h-8 rounded-md shadow-2xs border border-slate-200/90"
                      />
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${
                          isApostille
                            ? "bg-teal-50 text-[#0F766E] border-teal-200"
                            : "bg-amber-50/90 text-[#92600A] border-amber-200"
                        }`}
                      >
                        {isApostille ? "Hague Apostille" : "Embassy + MOFA"}
                      </span>
                    </div>

                    {/* Country Name & Route Subtitle */}
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base sm:text-[17px] font-extrabold text-[#0B2545] group-hover:text-[#0F766E] transition-colors font-display leading-snug break-normal hyphens-none flex items-center justify-between gap-1.5">
                        <span>{country.featuredCardTitle}</span>
                        <ArrowRight className="w-4 h-4 text-[#0F766E] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </h3>
                      <span className="text-[11px] sm:text-xs font-bold text-[#0F766E] block leading-tight break-normal hyphens-none">
                        {country.featuredCardRouteLabel}
                      </span>
                    </div>

                    {/* Relevant Service Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {country.featuredCardDescription}
                    </p>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg bg-[#0A192F] group-hover:bg-[#0F766E] group-active:bg-[#0F766E] text-white text-[10.5px] sm:text-[11px] font-semibold shadow-2xs transition-colors">
                      <span>Open Country Guide</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F3C969] group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </span>
                    <span className="text-[11px] font-bold text-[#0F766E]">
                      {country.isoCode}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Clear Button Below the 12 Priority Country Cards */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <a
              href="/countries"
              onClick={(e) => {
                e.preventDefault();
                onSelectService("/countries");
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#D49B27]/40"
            >
              <Globe2 className="w-4 h-4 text-[#D49B27] shrink-0" />
              <span>Explore All Countries →</span>
            </a>
          </div>
        </div>

        {/* 2B. High-Traffic SEO Section: Visa Checklists (All Countries) */}
        <div
          id="visa-checklists"
          className="pt-8 border-t border-slate-200/80 scroll-mt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4 sm:mb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
                VFS Global &amp; Embassy Document Preparation Guides · {VISA_CHECKLIST_COUNTRIES.length} Countries
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A192F] font-serif tracking-tight">
                Visa Checklists (Student &amp; Work Visa Document Guides)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Simplified country visa checklists for Indian applicants (Italy, Germany, Israel B/1 Work Visa, UK, USA, Canada, UAE, Saudi Arabia, Portugal, Poland &amp; {VISA_CHECKLIST_COUNTRIES.length} countries) highlighting required MEA Apostille, Embassy Attestation &amp; Translation.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/90 shrink-0">
              <button
                type="button"
                onClick={() => setChecklistTab("student-visa")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  checklistTab === "student-visa"
                    ? "bg-[#0A192F] text-white shadow-2xs"
                    : "text-slate-600 hover:text-[#0A192F]"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#D49B27]" />
                <span>Student Visa ({VISA_CHECKLIST_COUNTRIES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setChecklistTab("work-visa")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  checklistTab === "work-visa"
                    ? "bg-[#0A192F] text-white shadow-2xs"
                    : "text-slate-600 hover:text-[#0A192F]"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#D49B27]" />
                <span>Work Visa ({VISA_CHECKLIST_COUNTRIES.length})</span>
              </button>
            </div>
          </div>

          {/* Search Bar for 50 Countries */}
          <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={checklistSearch}
                onChange={(e) => setChecklistSearch(e.target.value)}
                placeholder="Search any country visa checklist (e.g., Israel, Italy, Germany, Portugal, Lithuania, Japan, Russia, UAE)..."
                aria-label="Search country visa checklist"
                className="w-full rounded-xl bg-slate-50 border border-slate-200/90 focus:border-[#0F766E] focus:bg-white text-xs sm:text-sm text-slate-800 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowAllChecklists((prev) => !prev)}
              className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100/80 text-[#0F766E] border border-teal-200 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              {showAllChecklists
                ? "Show Featured 12 Countries"
                : `Show All ${filteredChecklists.length} Countries`}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {displayedChecklists.map((item) => (
              <a
                key={item.slug}
                href={item.slug}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService(item.slug);
                }}
                className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-teal-50/20 border border-slate-200/90 hover:border-[#0F766E] transition-all duration-150 group flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md min-w-0 box-border cursor-pointer select-none"
              >
                <div className="space-y-2.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <CountryFlag
                      isoCode={item.isoCode}
                      countryName={item.countryName}
                      size="md"
                      className="!w-11 !h-7.5 rounded-md shadow-2xs border border-slate-200/90"
                    />
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-[#0F766E] border border-teal-200 shrink-0">
                      {item.visaType === "student-visa" ? "Student Visa" : "Work Visa"}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-extrabold text-[#0B2545] group-hover:text-[#0F766E] transition-colors font-display leading-snug">
                      {item.countryName} {item.visaTypeDisplay} Checklist
                    </h3>
                    <span className="text-[11px] font-bold text-[#0F766E] block leading-tight truncate">
                      {item.visaSubtypeNote}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.importantInfoText}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A192F] group-hover:bg-[#0F766E] text-white text-[11px] font-semibold transition-colors">
                    <span>Open Checklist</span>
                    <ArrowRight className="w-3 h-3 text-[#F3C969] group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {item.isHagueMember ? "Apostille" : "Embassy"}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {!showAllChecklists && checklistSearch.trim().length === 0 && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllChecklists(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer border border-[#D49B27]/40"
              >
                <FileBadge className="w-4 h-4 text-[#D49B27] shrink-0" />
                <span>
                  View All {filteredChecklists.length}{" "}
                  {checklistTab === "student-visa" ? "Student Visa" : "Work Visa"}{" "}
                  Country Checklists →
                </span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Local SEO Banner Card: Connaught Place, New Delhi Desk (PAN-India Courier) */}
        <div className="rounded-2xl bg-[#0A192F] text-white p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Connaught Place, New Delhi 110001 • Serving PAN India</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white font-display">
              Looking for an Apostille &amp; Attestation Agency in Delhi or via Courier?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Based at Barakhamba Road, Connaught Place, New Delhi, our desk handles direct submissions in the capital and supports applicants across all Indian states and abroad via secure courier.
            </p>
          </div>
          <a
            href="/locations/apostille-agent-delhi"
            onClick={(e) => {
              e.preventDefault();
              onSelectService("/locations/apostille-agent-delhi");
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-teal-600 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors shrink-0"
          >
            <span>New Delhi Desk Details</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4. Complete Specialized Authentication & Legalization Pathways Directory */}
        <div
          id="all-core-services"
          className="pt-7 sm:pt-9 border-t border-slate-200/80 scroll-mt-20"
        >
          <div className="max-w-2xl mx-auto text-center space-y-1.5 mb-6 sm:mb-7">
            <div className="text-[11px] font-bold tracking-wider text-[#0F766E] uppercase">
              Specialized Authentication Pathways
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-display tracking-tight">
              All Attestation, Apostille &amp; Legalization Pathways
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore detailed document checklists and step-by-step workflows for each specific authentication route.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {SERVICES.map(renderCompactServiceCard)}
          </div>
        </div>
      </div>
    </section>
  );
};
