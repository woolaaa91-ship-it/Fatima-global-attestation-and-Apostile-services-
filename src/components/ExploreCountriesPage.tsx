import React from "react";
import { CountryDirectory } from "./CountryDirectory";
import { DisclaimerBox } from "./DisclaimerBox";
import { QuoteForm } from "./QuoteForm";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  ChevronRight,
  Globe2,
  Stamp,
  Landmark,
  Phone,
  CheckCircle2,
} from "lucide-react";

interface ExploreCountriesPageProps {
  onNavigate: (path: string) => void;
}

export const ExploreCountriesPage: React.FC<ExploreCountriesPageProps> = ({
  onNavigate,
}) => {
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
            <span className="text-slate-900 font-semibold truncate">
              Explore All Countries
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#0A192F] via-[#0B2545] to-[#0F3F49] text-white py-10 sm:py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D49B27]/50 text-[#F3C969] text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#D49B27] shrink-0" />
              <span>Country-Wise Attestation &amp; Apostille Directory</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
              Document Attestation &amp; Apostille by Destination Country
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Compare official authentication routes from India for Hague Apostille Convention countries (such as Germany, Italy, Israel, UK, USA, Canada, Australia, France, and Saudi Arabia) and Embassy Legalization &amp; MOFA destinations (such as UAE, Qatar, Kuwait, China Mainland, and Egypt).
            </p>

            {/* Route Comparison Cards inside Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white/10 border border-teal-400/30 backdrop-blur-xs space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-300">
                  <Stamp className="w-4 h-4 shrink-0" />
                  <span>1. Hague Apostille Convention Route</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  For 120+ Hague member countries (Germany, Italy, UK, USA, Canada, Australia, France, Israel, Saudi Arabia, Oman). Preliminary SDM / State HRD / Chamber verification followed by an official MEA Hague Apostille sticker.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-[#D49B27]/40 backdrop-blur-xs space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F3C969]">
                  <Landmark className="w-4 h-4 shrink-0" />
                  <span>2. Embassy Legalization &amp; MOFA Route</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  For Non-Hague destinations (UAE, Qatar, Kuwait, Egypt, Vietnam, and Mainland China treaty exception). Requires State HRD / SDM / Chamber verification, MEA Normal Attestation, Foreign Embassy legalization in India, and destination MOFA.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl(
                  `Hello ${BUSINESS_CONFIG.shortName}, I need country-specific document attestation / apostille guidance.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                <span>Ask Country Desk on WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.telPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F3C969] shrink-0" />
                <span>Call {BUSINESS_CONFIG.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <DisclaimerBox />

        {/* Interactive Country Directory (Search, Continent, Route Type, A-Z) */}
        <CountryDirectory onNavigate={onNavigate} />

        {/* Quote Request Section */}
        <section className="max-w-4xl mx-auto pt-2">
          <QuoteForm
            initialServiceSlug="/services/embassy-legalization"
            title="Need Help Confirming Your Destination Country's Route?"
            subtitle="Provide your document type and destination country below. Our New Delhi desk will verify the exact State HRD, SDM, MEA, and Embassy requirements."
          />
        </section>
      </main>
    </div>
  );
};
