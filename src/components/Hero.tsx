import React, { useState, useRef, useCallback } from "react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { useImagePopupHistory, scrollToSectionById } from "../utils/modalHistory";
import {
  ShieldCheck,
  FileText,
  Globe,
  ZoomIn,
  X,
  Phone,
  ChevronRight,
  ArrowRight,
  Handshake,
  Clock,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { OptimizedImage } from "./OptimizedImage";

interface HeroProps {
  onExploreServices: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestQuote }) => {
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState(false);
  const [isHeroZoomed, setIsHeroZoomed] = useState(false);
  const heroViewerScrollRef = useRef<HTMLDivElement | null>(null);

  const handleOpenSpecimenModal = () => {
    setIsHeroZoomed(false);
    setIsSpecimenModalOpen(true);
  };

  const handleCloseSpecimenModal = useCallback(() => {
    setIsHeroZoomed(false);
    if (heroViewerScrollRef.current) {
      heroViewerScrollRef.current.scrollTo(0, 0);
    }
    setIsSpecimenModalOpen(false);
  }, []);

  const handleToggleHeroZoom = () => {
    setIsHeroZoomed((prev) => {
      const next = !prev;
      if (!next && heroViewerScrollRef.current) {
        heroViewerScrollRef.current.scrollTo(0, 0);
      }
      return next;
    });
  };

  useImagePopupHistory(
    isSpecimenModalOpen,
    handleCloseSpecimenModal,
    "hero-specimen-popup"
  );

  const handleFindRouteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!scrollToSectionById("route-finder", "smooth")) {
      onRequestQuote();
    }
  };

  const handleCheckSafetyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSectionById("document-safety-protocol", "smooth", { pushHash: true });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#D7E9FA] via-[#EDF5FC] to-[#FFFFFF] border-b border-slate-200/80">
      {/* Soft Sky, Teal & Warm Gold Sweeping Background Curves */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <svg
          className="absolute left-0 top-[18%] w-full h-[360px] sm:h-[440px]"
          viewBox="0 0 1200 440"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-80 170 C 260 350, 620 360, 1280 210 L 1280 440 L -80 440 Z"
            fill="url(#heroWaveFill)"
            fillOpacity="0.8"
          />
          <path
            d="M-60 155 C 280 335, 650 335, 1260 190"
            stroke="#E5BC5E"
            strokeOpacity="0.5"
            strokeWidth="2.5"
          />
          <path
            d="M-60 210 C 300 375, 660 365, 1260 230"
            stroke="#008DA8"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="heroWaveFill" x1="0" y1="0" x2="1200" y2="440" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDF4DC" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E4F3F7" stopOpacity="0.65" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-5 pb-4 sm:pb-7 box-border">
        {/* Top Service Categories Pill Strip — compact on mobile to avoid unnecessary wrapping */}
        <div className="flex justify-center mb-2.5 sm:mb-4 relative z-20">
          <div className="w-full sm:w-auto inline-flex flex-wrap items-center justify-center gap-x-1 min-[390px]:gap-x-1.5 sm:gap-x-3 gap-y-0.5 px-2.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-2xs text-[8.5px] min-[375px]:text-[9px] min-[410px]:text-[9.5px] sm:text-xs font-extrabold tracking-tight sm:tracking-wider text-[#0B2545] uppercase text-center max-w-full box-border">
            <span className="whitespace-nowrap">APOSTILLE</span>
            <span className="text-[#D49B27]" aria-hidden="true">•</span>
            <span className="whitespace-nowrap">ATTESTATION</span>
            <span className="text-[#D49B27]" aria-hidden="true">•</span>
            <span className="whitespace-nowrap">EMBASSY LEGALISATION</span>
            <span className="text-[#D49B27]" aria-hidden="true">•</span>
            <span className="whitespace-nowrap">DOCUMENT TRANSLATION</span>
          </div>
        </div>

        {/* Main Hero Upper Area: Compact non-overlapping responsive grid */}
        <div className="relative z-20 grid grid-cols-12 gap-2 sm:gap-6 items-center">
          {/* Left Column on Desktop / Top Compact Heading + Tagline + Side-by-Side Description & Artwork on Mobile */}
          <div className="col-span-12 sm:col-span-7 space-y-2 sm:space-y-3.5 text-left min-w-0">
            {/* Main SEO Heading (H1) — responsive sizing so it occupies fewer lines on mobile */}
            <h1 className="text-[22px] min-[360px]:text-[23.5px] min-[390px]:text-[25.5px] sm:text-4xl lg:text-[44px] font-extrabold text-[#0B2545] tracking-tight leading-[1.12] sm:leading-[1.14] font-serif break-normal hyphens-none">
              Attestation &amp; Apostille Services in India
            </h1>

            {/* Outlined Gold-Accented Tagline Pill with 4-Point Gold Star */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FAFBFD]/95 border-[1.5px] border-[#DFB04B] shadow-2xs max-w-full box-border">
                <svg
                  className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#D89B22] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
                </svg>
                <span className="text-[9.5px] min-[360px]:text-[10.5px] min-[390px]:text-[11.5px] sm:text-sm md:text-[15px] font-extrabold tracking-[0.03em] sm:tracking-[0.09em] text-[#0B2545] uppercase font-sans leading-none break-normal">
                  YOUR DOCUMENTS, READY FOR THE WORLD
                </span>
              </div>
            </div>

            {/* Mobile-only side-by-side Description + Right-Positioned Compact Artwork with balanced top alignment */}
            <div className="grid grid-cols-12 gap-2 items-start sm:block pt-0.5 sm:pt-0">
              <p className="col-span-7 min-[390px]:col-span-8 sm:col-span-12 text-[12px] min-[375px]:text-[12.5px] min-[410px]:text-[13px] sm:text-base text-[#2B3B4E] leading-[1.45] sm:leading-[1.5] font-normal min-w-0 break-normal hyphens-none pt-1 sm:pt-0">
                Professional assistance with apostille, document attestation, translation and embassy legalization for personal, educational and business documents.
              </p>

              {/* Mobile Illustration Column — pulled up slightly to eliminate top sky dead-space */}
              <div className="col-span-5 flex justify-end sm:hidden -mt-4">
                <div
                  onClick={handleOpenSpecimenModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenSpecimenModal();
                    }
                  }}
                  title="Tap to view authentic MEA Apostille specimen"
                  aria-label="View authentic Government of India MEA Apostille specimen"
                  className="w-full max-w-[122px] min-[375px]:max-w-[132px] min-[410px]:max-w-[142px] cursor-pointer group focus:outline-none select-none"
                >
                  <OptimizedImage
                    src="/assets/aistudio/hero_reference_illustration.png"
                    alt="Passport and Apostille Document Legalization Illustration"
                    className="w-full h-auto object-contain motion-safe:group-hover:scale-[1.02] transition-transform duration-300 select-none"
                    priority={true}
                    sizes="(max-width: 640px) 140px, 285px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tablet/Desktop Illustration Column (strictly in grid flow) */}
          <div className="hidden sm:flex sm:col-span-5 justify-end items-center min-w-0">
            <div
              onClick={handleOpenSpecimenModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenSpecimenModal();
                }
              }}
              title="Tap to view authentic MEA Apostille specimen"
              aria-label="View authentic Government of India MEA Apostille specimen"
              className="w-full max-w-[250px] md:max-w-[285px] cursor-pointer group focus:outline-none select-none"
            >
              <OptimizedImage
                src="/assets/aistudio/hero_reference_illustration.png"
                alt="Passport and Apostille Document Legalization Illustration"
                className="w-full h-auto object-contain motion-safe:group-hover:scale-[1.02] transition-transform duration-300 select-none"
                priority={true}
                sizes="(max-width: 640px) 140px, 285px"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Navy-to-Deep-Teal Primary Call-to-Action Button */}
        <div className="mt-2.5 sm:mt-4 relative z-20 w-full">
          <a
            href="#route-finder"
            onClick={handleFindRouteClick}
            className="fga-cta-subtle-glow w-full flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#061E3E] via-[#0B2F57] to-[#085A6C] hover:from-[#04152D] hover:to-[#064857] active:scale-[0.99] text-white border border-teal-300/40 transition-all duration-300 motion-reduce:transition-none cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 box-border"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-teal-100" />
              </span>
              <span className="text-[15px] min-[360px]:text-[16px] min-[390px]:text-[17px] sm:text-2xl font-bold text-white font-serif tracking-tight leading-snug break-normal min-w-0">
                Find My Attestation Process
              </span>
            </div>
            <ArrowRight className="fga-cta-arrow-nudge w-5 h-5 sm:w-6 sm:h-6 text-white motion-safe:group-hover:translate-x-1.5 transition-transform duration-200 motion-reduce:transition-none shrink-0" />
          </a>
        </div>

        {/* Distinctive Security Clearance Pass: Check Document Safety Protocol */}
        <div className="mt-2.5 sm:mt-3 relative z-20 w-full">
          <a
            href="#document-safety-protocol"
            onClick={handleCheckSafetyClick}
            className="w-full flex items-center justify-between gap-2.5 sm:gap-4 px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-50/95 via-white to-teal-50/95 border-[1.5px] border-emerald-400/80 hover:border-emerald-600 shadow-xs hover:shadow-md motion-safe:hover:scale-[1.015] motion-safe:active:scale-[0.985] active:bg-emerald-100/90 active:border-emerald-600 active:ring-2 active:ring-emerald-400/40 transition-all duration-200 ease-out cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 box-border"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-2xs flex items-center justify-center shrink-0 motion-safe:group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-100" />
              </span>
              <div className="flex flex-col text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5 leading-none mb-0.5 sm:mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 break-normal">
                    Verified Custody &amp; Security
                  </span>
                </div>
                <span className="text-[14px] min-[360px]:text-[15px] sm:text-[16.5px] font-bold text-[#0B2545] font-serif tracking-tight leading-snug group-hover:text-teal-900 transition-colors break-normal whitespace-normal">
                  Check Document Safety
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold shadow-2xs transition-all shrink-0">
              <span className="hidden min-[380px]:inline whitespace-nowrap">View Protocol</span>
              <span className="min-[380px]:hidden whitespace-nowrap">View</span>
              <ArrowRight className="w-3.5 h-3.5 motion-safe:group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </a>
        </div>

        {/* Small Subtle Social Proof Counter */}
        <div className="mt-1.5 sm:mt-2 flex items-center justify-center gap-1.5 text-center relative z-20 select-none">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-slate-600">
            Over <span className="font-bold text-slate-900">5,000+</span> Documents Secured
          </span>
        </div>

        {/* Three Compact Feature Highlights */}
        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1.5 sm:gap-3.5 relative z-20">
          {/* 1. All Document Types */}
          <div className="rounded-lg sm:rounded-xl bg-[#EDF4FC] border border-[#DAE8F8] px-1.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-center sm:justify-start text-left gap-1.5 sm:gap-2.5 shadow-2xs min-w-0 box-border">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#D7E8FA] flex items-center justify-center shrink-0">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-[#1D72E8]" />
            </div>
            <span className="text-[9.5px] min-[375px]:text-[10px] sm:text-xs font-bold text-[#0B2545] leading-tight break-normal hyphens-none min-w-0">
              All Document Types
            </span>
          </div>

          {/* 2. Transparent Guidance */}
          <div className="rounded-lg sm:rounded-xl bg-[#E8F7EE] border border-[#CFEEDE] px-1.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-center sm:justify-start text-left gap-1.5 sm:gap-2.5 shadow-2xs min-w-0 box-border">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#D0F0DE] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#12A150]" />
            </div>
            <span className="text-[9.5px] min-[375px]:text-[10px] sm:text-xs font-bold text-[#0B2545] leading-tight break-normal hyphens-none min-w-0">
              Transparent Guidance
            </span>
          </div>

          {/* 3. Global Support */}
          <div className="rounded-lg sm:rounded-xl bg-[#FDF7E2] border border-[#F3E6BC] px-1.5 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-center sm:justify-start text-left gap-1.5 sm:gap-2.5 shadow-2xs min-w-0 box-border">
            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-[#F6EBC2] flex items-center justify-center shrink-0">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#15803D]" />
            </div>
            <span className="text-[9.5px] min-[375px]:text-[10px] sm:text-xs font-bold text-[#0B2545] leading-tight break-normal hyphens-none min-w-0">
              Global Support
            </span>
          </div>
        </div>

        {/* Four Core Trust & Service Pillars Strip (Trusted & Reliable | End-to-End Support | Secure Document Handling | 120+ Countries) */}
        <div className="mt-3 sm:mt-4 relative z-20">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/95 shadow-2xs overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-slate-200/80 lg:divide-x">
              {/* 1. Trusted & Reliable */}
              <div className="p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 text-left border-r border-slate-200/80 lg:border-r-0 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FDF6E4] border border-[#EBD399] flex items-center justify-center shrink-0">
                  <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#B6841B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] min-[375px]:text-xs sm:text-[13px] font-extrabold text-[#0B2545] leading-tight break-normal hyphens-none">
                    Trusted &amp; Reliable
                  </div>
                  <div className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-0.5 break-normal hyphens-none">
                    Secure and professional service
                  </div>
                </div>
              </div>

              {/* 2. End-to-End Support */}
              <div className="p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 text-left min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FDF6E4] border border-[#EBD399] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#B6841B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] min-[375px]:text-xs sm:text-[13px] font-extrabold text-[#0B2545] leading-tight break-normal hyphens-none">
                    End-to-End Support
                  </div>
                  <div className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-0.5 break-normal hyphens-none">
                    From verification to delivery
                  </div>
                </div>
              </div>

              {/* 3. Secure Document Handling */}
              <div className="p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 text-left border-r border-slate-200/80 lg:border-r-0 sm:border-t lg:border-t-0 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FDF6E4] border border-[#EBD399] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B6841B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] min-[375px]:text-xs sm:text-[13px] font-extrabold text-[#0B2545] leading-tight break-normal hyphens-none">
                    Secure Document Handling
                  </div>
                  <div className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-0.5 break-normal hyphens-none">
                    Confidential and safe processing
                  </div>
                </div>
              </div>

              {/* 4. 120+ Countries */}
              <div className="p-2.5 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 text-left sm:border-t border-slate-200/80 lg:border-t-0 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FDF6E4] border border-[#EBD399] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#B6841B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] min-[375px]:text-xs sm:text-[13px] font-extrabold text-[#0B2545] leading-tight break-normal hyphens-none">
                    120+ Countries
                  </div>
                  <div className="text-[9.5px] min-[375px]:text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-0.5 break-normal hyphens-none">
                    Hague &amp; Non-Hague destinations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Official MEA Hague Apostille • Authentic Document Specimen Section (Before Our Services) */}
        <div className="mt-4 sm:mt-6 relative z-20">
          <div className="bg-white rounded-2xl border border-slate-200/95 shadow-sm overflow-hidden">
            {/* Specimen Top Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50/90">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                  Official MEA Hague Apostille • Authentic Document Specimen
                </span>
                <h2 className="text-sm sm:text-lg font-bold text-[#0B2545] font-display leading-snug mt-0.5 break-words">
                  Government of India MEA Hague Apostille on Degree Certificate
                </h2>
              </div>
              <button
                type="button"
                onClick={handleOpenSpecimenModal}
                className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-[#0B2545] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <ZoomIn className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>Zoom 2x</span>
              </button>
            </div>

            {/* Specimen Content Body */}
            <div className="p-3.5 sm:p-6">
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                {/* 1. Specimen Image Preview (tapping opens full specimen popup with 2x zoom & Back-button support) */}
                <div
                  onClick={handleOpenSpecimenModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenSpecimenModal();
                    }
                  }}
                  aria-label="Open Government of India MEA Hague Apostille on Degree Certificate specimen popup"
                  className="w-full lg:col-span-7 bg-slate-100 rounded-xl border border-slate-200/90 overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <div className="relative w-full p-2.5 sm:p-3 flex items-center justify-center bg-slate-100/80 overflow-hidden">
                    <OptimizedImage
                      src="/assets/aistudio/apostille_specimen_clean.jpg"
                      alt="Government of India MEA Apostille Sticker on Degree Certificate (Illustrative Sample — Personal Details Protected)"
                      className="block rounded-lg border border-slate-200 bg-white shadow-2xs w-full h-auto max-h-[340px] sm:max-h-[420px] object-contain motion-safe:group-hover:scale-[1.01] transition-all duration-200"
                      priority={false}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="px-3 sm:px-4 py-2.5 bg-slate-900 text-white text-[11px] sm:text-xs flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-200 min-w-0 break-words">
                      Tap image to toggle 2x high-resolution zoom
                    </span>
                    <span className="text-teal-300 font-bold shrink-0 underline underline-offset-2">
                      Zoom In +
                    </span>
                  </div>
                </div>

                {/* 2. Verification Scope & Route Details */}
                <div className="w-full lg:col-span-5 space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#0B2545] font-display text-sm sm:text-base">
                      Verification Scope &amp; Route
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-[13px]">
                      Original degree certificate authenticated with the Government of India MEA Hague Apostille sticker, official state administration authentication, red embossed seal, and MEA CPV Division Section Officer signature, valid across 120+ Hague member nations worldwide.
                    </p>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                    <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                      Authenticity Markers on this Specimen:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {[
                        "Government of India Ministry of External Affairs (MEA) Apostille Sticker",
                        "Red Notarial / Authentication Embossed Rosette Seal",
                        "Additional Secretary to Govt General Administration Dept Verification",
                        "MEA Section Officer (Attestation & CPV Division) Official Signature & Serial No.",
                      ].map((elem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getWhatsAppUrl("Hello Fatima Global Attestation, I saw your authentic MEA Apostille degree specimen on the website and need assistance with an identical Apostille process for my document.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Inquire About This Process on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Crystal-Clear Lightbox when clicking Hero Specimen Image */}
      {isSpecimenModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Authentic Degree Certificate Apostille Specimen"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
          onClick={handleCloseSpecimenModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50 shrink-0">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                  Official MEA Hague Apostille • Authentic Document Specimen
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-[#0B2545] font-display leading-snug mt-0.5">
                  Government of India MEA Hague Apostille on Degree Certificate
                </h3>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleHeroZoom}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-[#0B2545] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isHeroZoomed ? "Fit Screen" : "Zoom 2x"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseSpecimenModal}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close specimen view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Body Wrapper */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                {/* 1. Dedicated Crystal-Clear Specimen Image Viewer */}
                <div className="w-full lg:col-span-7 bg-slate-100 rounded-xl border border-slate-200/90 overflow-hidden">
                  <div
                    ref={heroViewerScrollRef}
                    onClick={handleToggleHeroZoom}
                    className={`w-full p-2 sm:p-3 flex items-center justify-center ${
                      isHeroZoomed
                        ? "overflow-auto max-h-[65vh] items-start justify-start cursor-zoom-out"
                        : "overflow-hidden cursor-zoom-in"
                    }`}
                  >
                    <OptimizedImage
                      src="/assets/aistudio/apostille_specimen_clean.jpg"
                      alt="Authentic Government of India MEA Apostille Sticker on Degree Certificate"
                      className={`block rounded-lg border border-slate-200 bg-white shadow-2xs transition-all duration-200 ${
                        isHeroZoomed
                          ? "w-[200%] max-w-none h-auto"
                          : "w-full h-auto max-h-[48vh] sm:max-h-[62vh] object-contain"
                      }`}
                      priority={true}
                    />
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="px-3 py-2 bg-slate-900 text-white text-[11px] flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-200 truncate">
                      Tap image to toggle 2x high-resolution zoom
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleHeroZoom}
                      className="text-teal-300 font-bold shrink-0 underline underline-offset-2 cursor-pointer"
                    >
                      {isHeroZoomed ? "Reset Zoom" : "Zoom In +"}
                    </button>
                  </div>
                </div>

                {/* 2. Details Breakdown below image on mobile, right column on desktop */}
                <div className="w-full lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-700 pt-1 lg:pt-0">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#0B2545] font-display text-sm sm:text-base">
                      Verification Scope &amp; Route
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Original degree certificate authenticated with the Government of India MEA Hague Apostille sticker, official state administration authentication, red embossed seal, and MEA CPV Division Section Officer signature, valid across 120+ Hague member nations worldwide.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                      Authenticity Markers on this Specimen:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {[
                        "Government of India Ministry of External Affairs (MEA) Apostille Sticker",
                        "Red Notarial / Authentication Embossed Rosette Seal",
                        "Additional Secretary to Govt General Administration Dept Verification",
                        "MEA Section Officer (Attestation & CPV Division) Official Signature & Serial No.",
                      ].map((elem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getWhatsAppUrl("Hello Fatima Global Attestation, I saw your authentic MEA Apostille degree specimen on the website and need assistance with an identical Apostille process for my document.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Inquire About This Process on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
