import React from "react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { SERVICES } from "../data/services";
import {
  DEDICATED_SEO_PAGES,
  PAN_INDIA_LOCATION_PAGES,
} from "../data/dedicatedPages";
import { scrollToPageTop } from "../utils/modalHistory";
import { Phone, Mail, MapPin, ShieldAlert, ArrowUpRight, ArrowUp } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenLegal: (type: "privacy" | "terms" | "disclaimer" | "refund") => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onReplayIntro }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Short Legal Disclaimer Line */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs text-slate-300 text-center sm:text-left">
          <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626] shrink-0 hidden sm:inline-block" />
          <p className="leading-snug font-medium">
            Fatima Global Attestation is a private assistance agency. We are not a government department or embassy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer inline-block max-w-full overflow-hidden" onClick={() => onNavigate("/")}>
              <BrandLogo variant="full" inverted={true} className="max-w-full" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Professional assistance with Apostille, SDM Attestation, MEA Verification, Chamber of Commerce processing, and Embassy Legalization for Indian documents destined for global academic, employment, and commercial purposes.
            </p>

            <p className="text-xs italic text-teal-300/90 font-medium">
              "{BUSINESS_CONFIG.tagline}"
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{BUSINESS_CONFIG.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="break-all">{BUSINESS_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Core Services Column 1 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Dedicated Service Pages
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {DEDICATED_SEO_PAGES.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(p.slug);
                    }}
                    className="hover:text-teal-300 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {p.h1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Column 2 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Countries, Guides &amp; Local SEO
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {DEDICATED_SEO_PAGES.filter((p) => p.category !== "location")
                .slice(6)
                .map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(p.slug);
                      }}
                      className="hover:text-teal-300 transition-colors text-left flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {p.h1}
                      </span>
                    </a>
                  </li>
                ))}
              {PAN_INDIA_LOCATION_PAGES.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(p.slug);
                    }}
                    className="hover:text-teal-300 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {p.h1}
                    </span>
                  </a>
                </li>
              ))}
              {SERVICES.slice(0, 3).map((s) => (
                <li key={s.id}>
                  <a
                    href={s.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(s.slug);
                    }}
                    className="hover:text-teal-300 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {s.shortTitle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & WhatsApp */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Company & Help
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/countries"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/countries");
                  }}
                  className="hover:text-teal-300 transition-colors font-semibold text-teal-300/90"
                >
                  Explore All Countries (A–Z)
                </a>
              </li>
              <li>
                <a
                  href="/#route-finder"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/#route-finder");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Document Route Finder
                </a>
              </li>
              <li>
                <a
                  href="/#proof-gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/#proof-gallery");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Real Proof & Specimens
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/blog");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Knowledge Centre & Guides
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/about-us");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/faqs");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="/apostille-tracking"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/apostille-tracking");
                  }}
                  className="hover:text-teal-300 transition-colors font-semibold text-teal-300/90"
                >
                  Document Tracking &amp; Verification
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/contact-us");
                  }}
                  className="hover:text-teal-300 transition-colors"
                >
                  Contact &amp; Location
                </a>
              </li>
            </ul>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors shadow-xs select-none"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Direct WhatsApp Help</span>
              <ArrowUpRight className="w-3 h-3 text-white/80 shrink-0" />
            </a>
          </div>
        </div>

        {/* PAN India States & Cities Local SEO Links */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              Apostille &amp; Attestation Services Across Indian States &amp; Cities
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-400">
            {PAN_INDIA_LOCATION_PAGES.map((loc, idx) => {
              const shortName = loc.h1.replace(
                /^Apostille & Attestation Agent in\s+/i,
                ""
              );
              return (
                <React.Fragment key={loc.slug}>
                  <a
                    href={loc.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(loc.slug);
                    }}
                    className="hover:text-teal-300 transition-colors whitespace-nowrap"
                  >
                    Apostille in {shortName}
                  </a>
                  {idx < PAN_INDIA_LOCATION_PAGES.length - 1 && (
                    <span aria-hidden="true" className="text-slate-700">
                      •
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 pr-12 sm:pr-0">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} FATIMA GLOBAL ATTESTATION. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <button
              onClick={() => onOpenLegal("privacy")}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal("terms")}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal("disclaimer")}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal("refund")}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            {onReplayIntro && (
              <>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                  title="Replay brand welcome introduction"
                >
                  Replay Intro
                </button>
              </>
            )}
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => scrollToPageTop("smooth")}
              className="inline-flex items-center gap-1 hover:text-teal-300 text-slate-300 font-semibold transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
