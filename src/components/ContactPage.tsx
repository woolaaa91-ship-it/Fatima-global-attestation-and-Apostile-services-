import React from "react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { SERVICES } from "../data/services";
import { QuoteForm } from "./QuoteForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandLogo } from "./BrandLogo";

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {

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
            <span className="text-slate-900 font-semibold">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
              Direct Assistance & Support
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display tracking-tight">
              Contact Fatima Global Attestation
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Connect with our document authentication consultants. We provide pre-submission checks, quotation estimates, and procedural guidance for all Indian personal, educational, and commercial papers.
            </p>
          </div>
        </div>
      </header>

      {/* Contact Content Grid */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Left Column: Business Details & Services List */}
          <div className="lg:col-span-5 min-w-0 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-5 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 font-display border-b border-slate-100 pb-3">
                Business Contact Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Telephone / Mobile
                    </span>
                    <a
                      href={`tel:${BUSINESS_CONFIG.telPhone}`}
                      className="text-slate-900 font-semibold hover:text-teal-700 transition-colors"
                    >
                      {BUSINESS_CONFIG.displayPhone}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      (Consultation line)
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-[#25D366]">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Business WhatsApp
                    </span>
                    <a
                      href={getWhatsAppUrl("Hello Fatima Global Attestation, I would like to enquire about document attestation.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      +{BUSINESS_CONFIG.whatsappNumber}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Fastest response for document scans and queries
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="text-slate-900 font-semibold hover:text-teal-700 transition-colors break-all"
                    >
                      {BUSINESS_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Consultation Desk & Network
                    </span>
                    <p className="text-slate-800 font-medium">
                      {BUSINESS_CONFIG.address}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {BUSINESS_CONFIG.serviceCoverage}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Business Hours
                    </span>
                    <p className="text-slate-800 font-medium">
                      {BUSINESS_CONFIG.businessHours}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {BUSINESS_CONFIG.sundayHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl("Hello Fatima Global Attestation, I would like to get in touch directly regarding document attestation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Links to All 8 Services Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 font-display border-b border-slate-100 pb-3">
                Our Core Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {SERVICES.map((s) => (
                  <a
                    key={s.id}
                    href={s.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(s.slug);
                    }}
                    className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-900 transition-colors flex items-center justify-between group min-w-0"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-teal-900 truncate">
                      {s.shortTitle}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700 shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            </div>

            {/* Document Custody & Coverage */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Document Custody &amp; Delhi NCR / Pan-India Coverage</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Original documents should only be submitted at our Connaught Place, New Delhi desk or dispatched via tracked courier after our team has reviewed clear digital scans on WhatsApp and confirmed processing eligibility. We assist clients across New Delhi, Noida, Gurugram, Ghaziabad, Faridabad, all Indian states, and NRIs abroad.
              </p>
            </div>

          </div>

          {/* Right Column: Contact & Quotation Form */}
          <div className="lg:col-span-7 min-w-0">
            <QuoteForm
              title="Send Us a Message or Request a Quote"
              subtitle="Fill in your details below and our team will get back to you with the required procedure, checklist, and quotation."
            />
          </div>

        </div>
      </div>
    </div>
  );
};
