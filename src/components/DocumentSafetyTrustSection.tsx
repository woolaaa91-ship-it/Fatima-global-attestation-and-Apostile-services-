import React, { useState, useRef, useEffect } from "react";
import {
  FileSearch,
  Video,
  Activity,
  PackageCheck,
  MapPin,
  ExternalLink,
  PlayCircle,
  ArrowRight,
  Lock,
  ShieldCheck,
  X,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { scrollToSectionById, useImagePopupHistory } from "../utils/modalHistory";
import { getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface DocumentSafetyTrustSectionProps {
  className?: string;
  onNavigate?: (path: string) => void;
  /** When true, renders without outer section padding and border for embedding inside existing content cards */
  isEmbedded?: boolean;
  cityName?: string;
  heading?: string;
  subheading?: string;
  badgeText?: string;
}

/**
 * Lightweight, lazy-loaded video proof card preview with LQIP/skeleton shimmer
 * that only activates when scrolled near (within 200px of viewport) to protect slow networks.
 */
const LazyVideoProofBadge: React.FC<{
  onOpenModal: () => void;
  cityName?: string;
}> = ({ onOpenModal, cityName }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-2.5 sm:mt-3 pt-2 border-t border-slate-100"
    >
      <button
        type="button"
        onClick={onOpenModal}
        aria-label="View sample video proof unboxing protocol log"
        className="w-full text-left rounded-lg bg-teal-50/70 hover:bg-teal-100/90 border border-teal-200/80 p-2 sm:p-2.5 transition-all duration-200 ease-out motion-safe:hover:scale-[1.015] motion-safe:active:scale-[0.98] active:bg-teal-200/70 group/vid flex items-center justify-between gap-2 cursor-pointer shadow-2xs"
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Skeleton or Loaded Play Indicator */}
          {!isNearViewport ? (
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-200/60 animate-pulse shrink-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <Camera className="w-3.5 h-3.5 text-teal-800 opacity-60" />
            </div>
          ) : (
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-700 text-white shrink-0 flex items-center justify-center shadow-2xs group-hover/vid:bg-teal-800 transition-colors">
              <PlayCircle className="w-4 h-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
            </div>
          )}

          <div className="min-w-0">
            <div className="text-[10px] min-[380px]:text-[11px] font-bold text-teal-950 truncate flex items-center gap-1">
              <span>Sample Video Log</span>
              <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 bg-teal-200/80 text-teal-900 rounded">
                WhatsApp
              </span>
            </div>
            <div className="text-[9px] min-[380px]:text-[10px] text-teal-800/90 truncate">
              {cityName ? `Delhi desk unboxing for ${cityName}` : "Watch 3-point seal inspection"}
            </div>
          </div>
        </div>

        <ArrowRight className="w-3.5 h-3.5 text-teal-700 group-hover/vid:translate-x-0.5 transition-transform shrink-0" />
      </button>
    </div>
  );
};

export const DocumentSafetyTrustSection: React.FC<DocumentSafetyTrustSectionProps> = ({
  className = "",
  onNavigate,
  isEmbedded = false,
  cityName,
  heading,
  subheading,
  badgeText,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useImagePopupHistory(
    isVideoModalOpen,
    () => setIsVideoModalOpen(false),
    "video-proof-protocol-popup"
  );

  const handleWatchProcess = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("how-it-works");
    if (element) {
      scrollToSectionById("how-it-works", "smooth");
    } else if (onNavigate) {
      onNavigate("/#how-it-works");
    } else {
      window.location.href = "/#how-it-works";
    }
  };

  const handleOpenTracking = () => {
    if (onNavigate) {
      onNavigate("/apostille-tracking");
    } else {
      window.location.href = "/apostille-tracking";
    }
  };

  const cards = [
    {
      id: "scan-verify-first",
      step: "Step 1",
      title: "1. Scan First (No Risk)",
      text: cityName
        ? `Do NOT send original documents immediately from ${cityName}. Share a clear photo on WhatsApp. We will verify the seals, check your destination country's rules, and confirm the exact quote for free.`
        : "Do NOT send original documents immediately. Share a clear photo on WhatsApp. We will verify the seals, check your destination country's rules, and confirm the exact quote for free.",
      icon: <FileSearch className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isInteractive: false,
    },
    {
      id: "video-proof-unboxing",
      step: "Step 2",
      title: "2. Video Proof of Unboxing",
      text: cityName
        ? `Once your courier from ${cityName} reaches our New Delhi desk, we record a short video of the sealed envelope being opened and share it with you on WhatsApp before we start any work. 100% transparency.`
        : "Once your courier reaches our New Delhi desk, we record a short video of the sealed envelope being opened and share it with you on WhatsApp before we start any work. 100% transparency.",
      icon: <Video className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isInteractive: false,
      hasVideoBadge: true,
    },
    {
      id: "live-fga-tracking",
      step: "Step 3",
      title: "3. Live FGA Tracking ID",
      text: "As soon as we receive your documents, we generate a unique FGA Tracking ID. You can use this ID on our portal to see live updates (SDM, MEA, Embassy) without calling us repeatedly.",
      icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isInteractive: true,
    },
    {
      id: "tamper-proof-return",
      step: "Step 4",
      title: "4. Tamper-Proof Return",
      text: cityName
        ? `After all stamps are applied, your originals are sealed in tamper-proof packaging and couriered back to ${cityName} via insured courier partners with a tracking number.`
        : "After all stamps are applied, your originals are sealed in tamper-proof packaging and couriered back to you via insured courier partners with a tracking number.",
      icon: <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isInteractive: false,
    },
  ];

  const content = (
    <div className={`max-w-7xl mx-auto ${isEmbedded ? "" : "px-3.5 sm:px-6 lg:px-8"}`}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-5 sm:mb-9">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5 text-teal-700" />
          <span>{badgeText || "Our Document Safety Protocol"}</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight leading-snug break-normal hyphens-none">
          {heading || "Your Documents Are Irreplaceable. Here Is How We Protect Them."}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto break-normal hyphens-none">
          {subheading || (cityName
            ? `We understand your original certificates are irreplaceable. For ${cityName} applicants, we do not ask for originals blindly. Read our 4-step safety protocol.`
            : "We understand your original certificates are irreplaceable. We do not ask for original documents blindly. Read our 4-step safety protocol.")}
        </p>
      </div>

      {/* 4 Trust Cards Grid: 2x2 on mobile, 4x1 on desktop
          CLS Prevention: fixed min-heights (min-h-[250px] min-[380px]:min-h-[270px] sm:min-h-[290px] lg:min-h-[310px])
          ensure layout never jumps when fonts or late assets hydrate. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {cards.map((card) => {
          const isTrackingCard = card.id === "live-fga-tracking";
          const isVideoCard = card.id === "video-proof-unboxing";

          return (
            <div
              key={card.id}
              onClick={isTrackingCard ? handleOpenTracking : undefined}
              role={isTrackingCard ? "button" : undefined}
              tabIndex={isTrackingCard ? 0 : undefined}
              onKeyDown={
                isTrackingCard
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenTracking();
                      }
                    }
                  : undefined
              }
              aria-label={
                isTrackingCard
                  ? "Click to open Live FGA Document Tracking Portal and check live status updates"
                  : undefined
              }
              className={`bg-white rounded-xl border p-3 min-[380px]:p-3.5 sm:p-5 lg:p-6 shadow-xs flex flex-col justify-between group min-h-[250px] min-[380px]:min-h-[270px] sm:min-h-[290px] lg:min-h-[310px] ${
                isTrackingCard
                  ? "border-teal-400/90 hover:border-teal-600 hover:shadow-md cursor-pointer ring-1 ring-teal-500/20 hover:ring-teal-500/40 motion-safe:hover:scale-[1.015] motion-safe:active:scale-[0.985] active:bg-teal-50/70 transition-all duration-200 ease-out relative bg-gradient-to-b from-white to-teal-50/20"
                  : "border-slate-200 hover:border-teal-500/50 hover:shadow-xs transition-colors duration-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3.5 h-8 sm:h-10">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isTrackingCard
                        ? "bg-teal-100 text-teal-800 group-hover:bg-teal-700 group-hover:text-white"
                        : "bg-teal-50 border border-teal-100 group-hover:bg-teal-700 group-hover:text-white"
                    }`}
                  >
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    {isTrackingCard && (
                      <span className="hidden min-[400px]:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[8.5px] sm:text-[9.5px] font-extrabold uppercase tracking-wide border border-emerald-300/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                    <span className="text-[9.5px] sm:text-[11px] font-bold text-teal-800 bg-teal-50/80 px-1.5 sm:px-2 py-0.5 rounded-full border border-teal-200/60 tabular-nums">
                      {card.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-slate-900 font-display group-hover:text-teal-900 transition-colors mb-1.5 sm:mb-2 leading-snug break-normal hyphens-none min-h-[2rem] sm:min-h-[2.5rem] flex items-center">
                  {card.title}
                </h3>
                <p className="text-[10px] min-[380px]:text-[11px] sm:text-xs md:text-sm text-slate-600 leading-relaxed break-normal hyphens-none">
                  {card.text}
                </p>
              </div>

              {/* Dynamic Bottom Elements: Lazy Video Proof badge on Card 2 / Live Tracking on Card 3 */}
              {isVideoCard && (
                <LazyVideoProofBadge
                  onOpenModal={() => setIsVideoModalOpen(true)}
                  cityName={cityName}
                />
              )}

              {isTrackingCard && (
                <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-teal-100 flex items-center justify-between text-[10.5px] sm:text-xs font-bold text-teal-800 group-hover:text-teal-950 transition-colors">
                  <span className="inline-flex items-center gap-1">
                    <span>Open Tracker</span>
                  </span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100/80 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center text-teal-800 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Trust Footer (Physical Office & Courier Recommendation) */}
      <div className="mt-4 sm:mt-6 rounded-xl bg-white border border-slate-200/90 p-3.5 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-emerald-700">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-[#0B2545] leading-snug break-normal hyphens-none">
                Physical Walk-In Office: Barakhamba Road, Connaught Place, New Delhi. You are welcome to visit our desk in person.
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug break-normal hyphens-none">
                We recommend sending documents via insured courier (BlueDart, DTDC, DHL) for added safety.
              </p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Barakhamba+Road+Connaught+Place+New+Delhi+110001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all duration-200 ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] active:bg-slate-300 shrink-0 self-start md:self-auto border border-slate-200"
          >
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>View Location on Google Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* 4. Bottom CTA: WhatsApp Free Review & Process Video */}
      <div className="mt-3.5 sm:mt-5 rounded-xl bg-gradient-to-r from-[#061E3E] via-[#0B2545] to-[#0A2F45] text-white p-3.5 sm:p-5 sm:px-6 border border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 text-left">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0 text-teal-300">
            <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white leading-snug break-normal hyphens-none">
              Share a scan of your document on WhatsApp for a free review.
            </p>
            <p className="text-[10.5px] sm:text-xs text-slate-300 mt-0.5 break-normal hyphens-none">
              Physical Office: Barakhamba Road, Connaught Place, New Delhi 110001
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          <a
            href={getWhatsAppUrl(
              cityName
                ? `Hi, I want to confirm the document safety protocol for my documents from ${cityName} before sending originals.`
                : "Hi, I want to confirm the document safety protocol before sending originals."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] motion-safe:hover:scale-[1.02] hover:shadow-md motion-safe:active:scale-[0.97] active:bg-[#1a9d4b] active:ring-2 active:ring-emerald-300/60 rounded-lg shadow-xs transition-all duration-200 ease-out"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span>Send Scan for Free Review</span>
          </a>

          <a
            href="/#how-it-works"
            onClick={handleWatchProcess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-200 hover:text-white bg-white/10 hover:bg-white/15 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] active:bg-white/20 rounded-lg transition-all duration-200 ease-out"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Watch How Our Process Works</span>
          </a>
        </div>
      </div>

      {/* Video Proof Protocol Modal (Lazy loaded imagery, back-button history supported) */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video Proof of Unboxing Protocol"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                    Zero-Risk Custody Standard
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2545] font-display leading-snug">
                    Video Proof of Unboxing Protocol
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Close video protocol view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Lazy Loaded Visual Proof Simulation Card */}
              <div className="relative rounded-xl border border-teal-200 bg-gradient-to-br from-slate-900 to-teal-950 text-white p-4 overflow-hidden shadow-xs">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Recorded Under High-Definition Camera
                    </span>
                    <span className="text-[10px] font-mono text-teal-200/80">
                      DELHI-DESK-CAM-01
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                    Every incoming courier envelope received at our Connaught Place desk is logged with a 360° unboxing recording before any stamps are processed.
                  </p>
                </div>
              </div>

              {/* 3 Step Protocol Breakdown */}
              <div className="space-y-2.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#0B2545] uppercase tracking-wide">
                  What We Record &amp; Send to Your WhatsApp:
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">1. Courier Seal Integrity Check:</strong>
                      Recording starts with the courier label, barcode, and unbroken exterior tamper tape shown in clear focus.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">2. Envelope Opening &amp; Page Count:</strong>
                      The envelope is unsealed live on desk camera, and each certificate (degree, marksheets, transcript) is counted and shown.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">3. Immediate WhatsApp Dispatch:</strong>
                      The video clip is compressed and sent to your WhatsApp number within 15 minutes of courier receipt along with your FGA Tracking ID.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={getWhatsAppUrl(
                  "Hello Fatima Global Attestation, I would like to confirm the document safety and video proof of unboxing protocol for my documents."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] active:bg-[#1a9d4b] rounded-xl shadow-xs transition-all duration-200 ease-out"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Confirm Safety Protocol on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isEmbedded) {
    return (
      <div
        id="document-safety-protocol"
        className={`w-full scroll-mt-24 ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      id="document-safety-protocol"
      className={`py-7 sm:py-12 bg-slate-50 border-b border-slate-200 overflow-x-hidden scroll-mt-20 ${className}`}
    >
      {content}
    </section>
  );
};
