import React, { useState, useEffect } from "react";
import { getWhatsAppUrl } from "../config/business";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICES } from "../data/services";
import { DEDICATED_SEO_PAGES } from "../data/dedicatedPages";
import { BrandLogo } from "./BrandLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((window.scrollY || window.pageYOffset || 0) > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(path);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/#services", hasDropdown: true },
    { label: "Countries", path: "/countries" },
    { label: "UAE Attestation", path: "/countries/uae-mofa-attestation" },
    { label: "Saudi Attestation", path: "/countries/saudi-arabia-attestation" },
    { label: "e-Sanad Guide", path: "/guides/e-sanad" },
    { label: "Track & Verify", path: "/apostille-tracking" },
    { label: "Delhi Desk", path: "/locations/apostille-agent-delhi" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  const isServiceRouteActive =
    SERVICES.some((s) => s.slug === currentPath) ||
    DEDICATED_SEO_PAGES.some((p) => p.slug === currentPath);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 bg-white border-b transition-shadow duration-200 py-2 sm:py-2.5 ${
        isScrolled
          ? "border-slate-200/90 shadow-[0_6px_18px_-2px_rgba(15,23,42,0.09)]"
          : "border-slate-200/75 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 min-w-0">
          {/* Zone 1: Official Brand Logo Lockup */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/");
            }}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm group py-0.5 cursor-pointer min-w-0 shrink"
            aria-label="Fatima Global Attestation Home"
          >
            <BrandLogo variant="compact" className="h-7 sm:h-10 md:h-11" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <a
                      href="/#services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("/#services");
                      }}
                      className={`flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors hover:text-[#0A192F] ${
                        isServiceRouteActive
                          ? "text-[#0F766E] font-semibold"
                          : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen
                            ? "rotate-180 text-[#0F766E]"
                            : "text-slate-400"
                        }`}
                      />
                    </a>

                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-84 pt-2 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 overflow-hidden">
                          <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/70">
                            <span className="text-[11px] font-semibold text-[#0F766E] uppercase tracking-wider">
                              Dedicated Service &amp; Country Pages
                            </span>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto py-1 divide-y divide-slate-100">
                            {DEDICATED_SEO_PAGES.filter(
                              (p) =>
                                p.category !== "location" ||
                                p.slug === "/locations/apostille-agent-delhi"
                            ).map((p) => (
                              <a
                                key={p.slug}
                                href={p.slug}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(p.slug);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors flex items-center justify-between gap-3 ${
                                  currentPath === p.slug
                                    ? "bg-teal-50 text-[#0F766E] font-bold"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0A192F]"
                                }`}
                              >
                                <span className="truncate">{p.h1}</span>
                                <span className="text-[10px] text-slate-400 shrink-0 font-normal">
                                  Open →
                                </span>
                              </a>
                            ))}
                          </div>
                          <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                            <a
                              href="/#services"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("/#services");
                              }}
                              className="text-xs font-semibold text-[#0F766E] hover:text-[#0A192F] transition-colors"
                            >
                              View All Services &amp; Countries Grid
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                item.path === "/"
                  ? currentPath === "/"
                  : item.path.startsWith("#")
                  ? false
                  : currentPath === item.path;

              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  className={`py-1 whitespace-nowrap transition-colors hover:text-[#0A192F] ${
                    isActive ? "text-[#0F766E] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Actions: Quick Track Link + Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/apostille-tracking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/apostille-tracking");
              }}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition-colors ${
                currentPath === "/apostille-tracking"
                  ? "bg-[#0F766E] text-white"
                  : "bg-[#0A192F] text-white hover:bg-slate-900"
              }`}
            >
              Track &amp; Verify
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-3.5 pt-2.5 pb-6 shadow-xl max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/");
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                currentPath === "/"
                  ? "bg-teal-50 text-[#0F766E] border-teal-200"
                  : "bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              Home
            </a>

            <a
              href="/countries"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/countries");
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                currentPath === "/countries" || currentPath.startsWith("/countries/")
                  ? "bg-teal-50 text-[#0F766E] border-teal-200"
                  : "bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              All Countries (A–Z)
            </a>

            <a
              href="/guides/e-sanad"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/guides/e-sanad");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-[#0F766E] bg-teal-50/80 border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              e-Sanad Guide
            </a>

            <a
              href="/countries/uae-mofa-attestation"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/countries/uae-mofa-attestation");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              UAE MOFA Attestation
            </a>

            <a
              href="/countries/saudi-arabia-attestation"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/countries/saudi-arabia-attestation");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              Saudi Attestation
            </a>

            <a
              href="/locations/apostille-agent-delhi"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/locations/apostille-agent-delhi");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              Delhi (CP) Desk
            </a>

            <a
              href="/apostille-tracking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/apostille-tracking");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              Track &amp; Verify
            </a>

            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/blog");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              Knowledge Centre
            </a>

            <a
              href="/contact-us"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/contact-us");
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50/70 text-[#0A192F] border-slate-200/80 hover:bg-slate-100 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Dedicated Service Pages Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-left text-xs font-bold text-[#0A192F] uppercase tracking-wider cursor-pointer focus:outline-none"
              >
                <span>Dedicated Service &amp; Country Pages</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-[#0F766E]" : ""
                  }`}
                />
              </button>
              <a
                href="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/#services");
                }}
                className="text-xs text-[#0F766E] font-bold hover:underline shrink-0"
              >
                View Grid →
              </a>
            </div>

            {mobileServicesOpen && (
              <div className="p-1.5 divide-y divide-slate-100">
                {DEDICATED_SEO_PAGES.filter(
                  (p) =>
                    p.category !== "location" ||
                    p.slug === "/locations/apostille-agent-delhi"
                ).map((p) => (
                  <a
                    key={p.slug}
                    href={p.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(p.slug);
                    }}
                    className={`block w-full text-left px-2.5 py-2 rounded-md text-xs font-medium leading-snug transition-colors ${
                      currentPath === p.slug
                        ? "bg-teal-50 text-[#0F766E] font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {p.h1}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <a
              href={getWhatsAppUrl(
                "Hello Fatima Global Attestation, I would like to request guidance for document attestation/apostille services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
