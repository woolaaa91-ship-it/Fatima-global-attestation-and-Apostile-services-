import React from "react";
import {
  Layers,
  Activity,
  Building2,
  FileSearch,
  Video,
  Receipt,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { scrollToSectionById } from "../utils/modalHistory";

interface WhyChooseUsProps {
  onNavigate?: (path: string) => void;
  className?: string;
  cityName?: string;
  heading?: string;
  badgeText?: string;
  subtitle?: string;
}

export function getWhyChooseUsHeading(cityName?: string): {
  badge: string;
  title: string;
  subtitle: string;
} {
  if (!cityName) {
    // Homepage default
    return {
      badge: "Why Choose Fatima Global Attestation • All-In-One Hub",
      title: "Ek Hi Platform Par Saari Suvidhaen. Why Thousands Trust Us.",
      subtitle:
        "From free WhatsApp scan checks and express SDM attestation to 24/7 live tracking and insured doorstep delivery — experience end-to-end legalization without juggling multiple agencies.",
    };
  }

  const key = cityName.toLowerCase();

  // 1. KERALA (Thiruvananthapuram, Kochi, Kozhikode, etc.)
  if (
    key.includes("thiruvananthapuram") ||
    key.includes("trivandrum") ||
    key.includes("kochi") ||
    key.includes("cochin") ||
    key.includes("kerala") ||
    key.includes("kozhikode") ||
    key.includes("calicut") ||
    key.includes("kottayam")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete NORKA-Roots HRD, MEA Apostille, Gulf Embassy Legalization & insured doorstep courier to your home in ${cityName} — no New Delhi travel needed.`,
    };
  }

  // 2. TAMIL NADU (Chennai, Coimbatore, Madurai, Trichy, etc.)
  if (
    key.includes("chennai") ||
    key.includes("tamil nadu") ||
    key.includes("coimbatore") ||
    key.includes("madurai") ||
    key.includes("trichy") ||
    key.includes("salem")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete Secretariat HRD, MEA Apostille, 120+ Embassy Attestation & priority doorstep courier pickup across ${cityName} — managed directly from New Delhi.`,
    };
  }

  // 3. KARNATAKA (Bangalore, Bengaluru, Mangalore, Mysore, etc.)
  if (
    key.includes("bangalore") ||
    key.includes("bengaluru") ||
    key.includes("karnataka") ||
    key.includes("mangalore") ||
    key.includes("mysore") ||
    key.includes("mysuru")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete Regional Commissioner HRD, MEA Apostille, Embassy Legalization & insured courier pickup across ${cityName} — zero multiple agents.`,
    };
  }

  // 4. TELANGANA & ANDHRA PRADESH (Hyderabad, Visakhapatnam, Vijayawada, etc.)
  if (
    key.includes("hyderabad") ||
    key.includes("telangana") ||
    key.includes("andhra") ||
    key.includes("visakhapatnam") ||
    key.includes("vizag") ||
    key.includes("vijayawada")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete GAD HRD, e-Sanad, MEA Apostille & Gulf Embassy Attestation with insured doorstep courier delivery across ${cityName}.`,
    };
  }

  // 5. PUNJAB & CHANDIGARH (Chandigarh, Jalandhar, Ludhiana, Amritsar, Mohali)
  if (
    key.includes("punjab") ||
    key.includes("chandigarh") ||
    key.includes("jalandhar") ||
    key.includes("ludhiana") ||
    key.includes("amritsar") ||
    key.includes("patiala") ||
    key.includes("mohali")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services Under One Roof. Why Clients in ${cityName} Trust Us.`,
      subtitle: `From fast-track 2-3 day SDM apostille for Europe student visas to Gulf embassy legalization & insured courier across Punjab — everything under one roof.`,
    };
  }

  // 6. WEST BENGAL (Kolkata, Siliguri, Howrah)
  if (
    key.includes("kolkata") ||
    key.includes("west bengal") ||
    key.includes("siliguri") ||
    key.includes("durgapur") ||
    key.includes("howrah")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete Bikash Bhavan HRD, MEA Apostille & Embassy Legalization with insured doorstep courier pickup across ${cityName}.`,
    };
  }

  // 7. MAHARASHTRA (Mumbai, Pune, Nagpur, Nashik, Thane)
  if (
    key.includes("mumbai") ||
    key.includes("pune") ||
    key.includes("maharashtra") ||
    key.includes("nagpur") ||
    key.includes("nashik") ||
    key.includes("thane")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete Mantralaya HRD, Delhi SDM fast-track, MEA Apostille & Embassy Legalization with insured doorstep courier across ${cityName}.`,
    };
  }

  // 8. GUJARAT (Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar)
  if (
    key.includes("ahmedabad") ||
    key.includes("surat") ||
    key.includes("gujarat") ||
    key.includes("vadodara") ||
    key.includes("rajkot") ||
    key.includes("gandhinagar")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
      subtitle: `Complete Gandhinagar HRD, MEA Apostille, Chamber of Commerce & Embassy Legalization with insured doorstep delivery across ${cityName}.`,
    };
  }

  // 9. HINDI-HEARTLAND LOCATIONS (Delhi, NCR, Bihar, UP, Rajasthan, MP, Haryana)
  if (
    key.includes("delhi") ||
    key.includes("noida") ||
    key.includes("gurugram") ||
    key.includes("gurgaon") ||
    key.includes("bihar") ||
    key.includes("patna") ||
    key.includes("uttar pradesh") ||
    key.includes("lucknow") ||
    key.includes("kanpur") ||
    key.includes("varanasi") ||
    key.includes("rajasthan") ||
    key.includes("jaipur") ||
    key.includes("madhya pradesh") ||
    key.includes("bhopal") ||
    key.includes("indore") ||
    key.includes("haryana")
  ) {
    return {
      badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
      title: `Ek Hi Platform Par Saari Suvidhaen. Why Clients in ${cityName} Trust Us.`,
      subtitle: `From free WhatsApp scan checks and express SDM attestation to 24/7 live tracking and insured doorstep delivery — experience end-to-end legalization without juggling multiple agencies.`,
    };
  }

  // DEFAULT (Professional English for other locations)
  return {
    badge: `Why Choose Fatima Global Attestation • ${cityName} Desk`,
    title: `All Services on a Single Platform. Why Clients in ${cityName} Trust Us.`,
    subtitle: `From free WhatsApp scan checks and express SDM attestation to 24/7 live tracking and insured doorstep delivery across ${cityName}.`,
  };
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onNavigate,
  className = "",
  cityName,
  heading,
  badgeText,
  subtitle,
}) => {
  const localizedInfo = getWhyChooseUsHeading(cityName);
  const activeBadge = badgeText || localizedInfo.badge;
  const activeHeading = heading || localizedInfo.title;
  const activeSubtitle = subtitle || localizedInfo.subtitle;
  const handleOpenTracking = () => {
    if (onNavigate) {
      onNavigate("/apostille-tracking");
    } else {
      window.location.href = "/apostille-tracking";
    }
  };

  const handleOpenSafetyProtocol = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("document-safety-protocol");
    if (element) {
      scrollToSectionById("document-safety-protocol", "smooth");
    } else if (onNavigate) {
      onNavigate("/#document-safety-protocol");
    } else {
      window.location.href = "/#document-safety-protocol";
    }
  };

  const allInOneFeatures = [
    "Hague Apostille (125+ Countries)",
    "Non-Hague Embassy Attestation (UAE, Saudi, Qatar, Kuwait)",
    "State HRD, Home Dept (GAD) & Delhi SDM",
    "Commercial Legalization & Chamber of Commerce",
    "Certified Multilingual Translation",
    "Live FGA Tracking Portal (24/7 Updates)",
    "Physical CP Desk, New Delhi (Walk-In)",
    "Insured Pan-India Doorstep Courier",
  ];

  const valueCards = [
    {
      id: "all-in-one",
      badge: "Complete Ecosystem",
      title: "All Services Under One Roof",
      desc: "MEA Apostille, 120+ Embassy Legalization, State HRD, Chamber of Commerce, Certified Translation & Death Claims in one single place. No need to deal with multiple agents.",
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "live-tracking",
      badge: "24/7 Live Portal",
      title: "Live FGA Status Tracking",
      desc: "Unique FGA Tracking ID generated upon receipt. Check real-time milestones (SDM, MEA, Embassy) from your phone without repetitive follow-up calls.",
      icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: true,
    },
    {
      id: "physical-desk",
      badge: "Physical Walk-In",
      title: "Walk-In Connaught Place Office",
      desc: "Direct walk-in documentation desk at Barakhamba Road, Connaught Place, New Delhi—minutes from MEA counters and diplomatic embassies. Not a virtual broker.",
      icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "scan-check",
      badge: "Zero Risk",
      title: "Free Pre-Submission Scan Check",
      desc: "Share a clear photo on WhatsApp first. We verify university seals, registrar signatures, and destination country rules for free before you send original documents.",
      icon: <FileSearch className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "video-proof",
      badge: "100% Transparency",
      title: "Unboxing Video Proof",
      desc: "We record a short video opening your sealed courier packet at our New Delhi desk and share it with you on WhatsApp before starting any work. Zero loss record.",
      icon: <Video className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "fee-transparency",
      badge: "Zero Hidden Costs",
      title: "100% Fee Transparency",
      desc: "Honest upfront quotes showing the official ₹50 MEA postal fee vs agent coordination costs. Clear pricing with zero unexpected post-submission surcharges.",
      icon: <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "fast-track",
      badge: "2-3 Days Option",
      title: "Fast-Track Express Routes",
      desc: "Choose between urgent Delhi SDM route (2-3 working days) for urgent job or study deadlines, or State HRD route for strict destination embassies.",
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
    {
      id: "pan-india",
      badge: "Pan-India Logistics",
      title: "Doorstep Pickup & Return",
      desc: "Insured courier pickup and tamper-proof return delivery across Mumbai, Bangalore, Pune, Hyderabad, Chennai, and 100+ cities—no travel to Delhi required.",
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 group-hover:text-white transition-colors" />,
      isTracking: false,
    },
  ];

  return (
    <section className={`py-6 sm:py-12 bg-slate-50 border-b border-slate-200 overflow-x-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>{activeBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight leading-snug break-normal hyphens-none">
            {activeHeading}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto break-normal hyphens-none">
            {activeSubtitle}
          </p>
        </div>

        {/* All-in-One Highlights Banner (Ek Hi App Mein Saari Suvidhaen) */}
        <div className="mb-5 sm:mb-8 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-[#061E3E] via-[#0B2545] to-[#0D3859] text-white shadow-xs border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-display">
                  One Unified Platform — No Multiple Agents Needed
                </h3>
                <p className="text-[10.5px] sm:text-xs text-slate-300">
                  Every legal verification step is managed directly from our New Delhi Connaught Place desk.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-200 text-[10.5px] sm:text-xs font-semibold border border-teal-400/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Over 5,000+ Documents Secured</span>
              </span>
            </div>
          </div>

          {/* Quick Service Checklist Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
            {allInOneFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[10px] min-[380px]:text-[11px] sm:text-xs text-slate-200"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                <span className="leading-snug break-normal hyphens-none">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8 Feature Value Cards Grid (2x2 on mobile, 4x2 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {valueCards.map((card) => {
            const isInteractive = card.isTracking;
            return (
              <div
                key={card.id}
                onClick={isInteractive ? handleOpenTracking : undefined}
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={
                  isInteractive
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleOpenTracking();
                        }
                      }
                    : undefined
                }
                className={`p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl border bg-white shadow-2xs transition-all flex flex-col justify-between group ${
                  isInteractive
                    ? "border-teal-400/90 hover:border-teal-600 hover:shadow-md cursor-pointer ring-1 ring-teal-500/20 hover:ring-teal-500/40 active:scale-[0.99] relative bg-gradient-to-b from-white to-teal-50/20"
                    : "border-slate-200/90 hover:border-teal-400/70 hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-2.5">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                        isInteractive
                          ? "bg-teal-100 text-teal-800 group-hover:bg-teal-700 group-hover:text-white"
                          : "bg-teal-50 border border-teal-100 group-hover:bg-teal-700 group-hover:text-white"
                      }`}
                    >
                      {card.icon}
                    </div>
                    <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-bold text-teal-800 bg-teal-50/90 px-1.5 sm:px-2 py-0.5 rounded-full border border-teal-200/60 leading-none">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0B2545] font-display group-hover:text-teal-900 transition-colors leading-snug break-normal hyphens-none mb-1 sm:mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[10px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                    {card.desc}
                  </p>
                </div>

                {isInteractive && (
                  <div className="mt-2.5 sm:mt-3 pt-2 border-t border-teal-100 flex items-center justify-between text-[10px] min-[380px]:text-[11px] sm:text-xs font-bold text-teal-800 group-hover:text-teal-950 transition-colors">
                    <span>Open Live Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Action Strip */}
        <div className="mt-4 sm:mt-7 p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 text-emerald-700">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#0B2545] leading-snug break-normal hyphens-none">
                Zero Document Loss Guarantee • Physical Connaught Place Desk
              </p>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-snug break-normal hyphens-none mt-0.5">
                Visit Barakhamba Road, New Delhi or dispatch via BlueDart / DTDC / DHL with live status tracking.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={getWhatsAppUrl("Hi, I want to check why I should choose Fatima Global Attestation for my documents.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-2xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Free Scan Check on WhatsApp</span>
            </a>

            <button
              onClick={handleOpenSafetyProtocol}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5 text-teal-700" />
              <span>Safety Protocol</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
