import React, { useEffect } from "react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import {
  ChevronRight,
  Globe2,
  FileCheck2,
  CheckCircle2,
  Lock,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandLogo } from "./BrandLogo";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold">About Us</span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
              Professional Consultancy
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
              About Fatima Global Attestation
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
              Assisting individuals, students, professionals, and multinational enterprises in authenticating Indian documents for international academic, commercial, and personal use.
            </p>
            <p className="text-sm font-medium text-teal-800 italic">
              "{BUSINESS_CONFIG.tagline}"
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
        
        {/* Story & Scope Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-7 min-w-0 space-y-5 text-slate-700 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
              Simplifying Cross-Border Document Authentication
            </h2>
            <p>
              When moving abroad—whether to pursue university degrees, take up employment, sponsor a spouse, or expand commercial exports—foreign governments and institutions require official proof that your Indian certificates are genuine. Navigating the requirements between Notary, Sub-Divisional Magistrate (SDM), State Home Department (HRD), Ministry of External Affairs (MEA), and foreign embassies can be overwhelming.
            </p>
            <p>
              <strong>FATIMA GLOBAL ATTESTATION</strong> was established to provide clear, reliable guidance and end-to-end facilitation for clients in India and Non-Resident Indians (NRIs) globally. We analyze destination requirements, conduct preliminary document checks to avoid rejections, coordinate with recognized trade bodies, and manage submission logistics with complete transparency.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/#services");
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
              >
                <span>View Our Core Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </a>
              <a
                href={getWhatsAppUrl("Hello Fatima Global Attestation, I would like to learn more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-400/35 flex items-center justify-center mb-3 shadow-xs">
                  <ShieldCheck className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Connaught Place, New Delhi
                </span>
                <span className="text-sm font-extrabold text-white mt-1 font-display">
                  New Delhi &amp; Pan-India Coordination Desk
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-bold tracking-wide bg-slate-950/75 backdrop-blur-xs px-2.5 py-1 rounded">
                    New Delhi &amp; Pan-India Desk
                  </span>
                  <BrandLogo variant="mark" className="w-6 h-6 rounded-sm" />
                </div>
              </div>
              <div className="p-4 bg-white border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block">
                  International Compliance Standards
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block leading-normal">
                  Experienced facilitation across Hague Convention countries and consular missions in New Delhi.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
              Our Core Operational Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We hold ourselves to rigorous standards of accuracy, honesty, and client confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Procedural Accuracy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We do not use a one-size-fits-all approach. Every document is routed strictly according to its legal type and the specific receiving country's active mandates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Document Confidentiality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal identity records and commercial trade data are treated with utmost care. Scans and records are guarded with secure digital practices.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Honest, Real Guidance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We provide transparent quotations with no hidden surprises, realistic timeframes, and upfront notification of any potential authority backlogs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
