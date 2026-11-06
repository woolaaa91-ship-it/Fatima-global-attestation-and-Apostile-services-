/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  Suspense,
  lazy,
} from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { RouteFinder } from "./components/RouteFinder";
import { ServicesGrid } from "./components/ServicesGrid";
import { DisclaimerBox } from "./components/DisclaimerBox";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { BrandIntro } from "./components/BrandIntro";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingFallback } from "./components/LoadingFallback";
import type { QuotePrefillDetails } from "./components/QuoteForm";

// Lazy-loaded Below-the-Fold Homepage Sections (Optimized Bundle Size)
const DocumentSafetyTrustSection = lazy(() =>
  import("./components/DocumentSafetyTrustSection").then((m) => ({
    default: m.DocumentSafetyTrustSection,
  }))
);
const SampleEvidenceGallery = lazy(() =>
  import("./components/SampleEvidenceGallery").then((m) => ({
    default: m.SampleEvidenceGallery,
  }))
);
const HowItWorks = lazy(() =>
  import("./components/HowItWorks").then((m) => ({
    default: m.HowItWorks,
  }))
);
const WhyChooseUs = lazy(() =>
  import("./components/WhyChooseUs").then((m) => ({
    default: m.WhyChooseUs,
  }))
);
const QuoteForm = lazy(() =>
  import("./components/QuoteForm").then((m) => ({
    default: m.QuoteForm,
  }))
);
const FaqSection = lazy(() =>
  import("./components/FaqSection").then((m) => ({
    default: m.FaqSection,
  }))
);
const LegalModal = lazy(() =>
  import("./components/LegalModal").then((m) => ({
    default: m.LegalModal,
  }))
);

// Lazy-loaded Subpages and Admin Routes (Split into Separate On-Demand Chunks)
const ServicePage = lazy(() =>
  import("./components/ServicePage").then((m) => ({
    default: m.ServicePage,
  }))
);
const ApostilleServicesPage = lazy(() =>
  import("./components/ApostilleServicesPage").then((m) => ({
    default: m.ApostilleServicesPage,
  }))
);
const DegreeCertificateApostillePage = lazy(() =>
  import("./components/DegreeCertificateApostillePage").then((m) => ({
    default: m.DegreeCertificateApostillePage,
  }))
);
const UaeMofaAttestationPage = lazy(() =>
  import("./components/UaeMofaAttestationPage").then((m) => ({
    default: m.UaeMofaAttestationPage,
  }))
);
const SaudiArabiaAttestationPage = lazy(() =>
  import("./components/SaudiArabiaAttestationPage").then((m) => ({
    default: m.SaudiArabiaAttestationPage,
  }))
);
const CommercialDocumentAttestationPage = lazy(() =>
  import("./components/CommercialDocumentAttestationPage").then((m) => ({
    default: m.CommercialDocumentAttestationPage,
  }))
);
const EmbassyLegalizationPage = lazy(() =>
  import("./components/EmbassyLegalizationPage").then((m) => ({
    default: m.EmbassyLegalizationPage,
  }))
);
const ESanadGuidePage = lazy(() =>
  import("./components/ESanadGuidePage").then((m) => ({
    default: m.ESanadGuidePage,
  }))
);
const DocumentTranslationPage = lazy(() =>
  import("./components/DocumentTranslationPage").then((m) => ({
    default: m.DocumentTranslationPage,
  }))
);
const NotaryPublicAttestationPage = lazy(() =>
  import("./components/NotaryPublicAttestationPage").then((m) => ({
    default: m.NotaryPublicAttestationPage,
  }))
);
const SaudiDeathClaimPage = lazy(() =>
  import("./components/SaudiDeathClaimPage").then((m) => ({
    default: m.SaudiDeathClaimPage,
  }))
);
const MofaAttestationPage = lazy(() =>
  import("./components/MofaAttestationPage").then((m) => ({
    default: m.MofaAttestationPage,
  }))
);
const CityLandingPage = lazy(() =>
  import("./components/CityLandingPage").then((m) => ({
    default: m.CityLandingPage,
  }))
);
const DedicatedSeoPage = lazy(() =>
  import("./components/DedicatedSeoPage").then((m) => ({
    default: m.DedicatedSeoPage,
  }))
);
const ContactPage = lazy(() =>
  import("./components/ContactPage").then((m) => ({
    default: m.ContactPage,
  }))
);
const AboutPage = lazy(() =>
  import("./components/AboutPage").then((m) => ({
    default: m.AboutPage,
  }))
);
const BlogList = lazy(() =>
  import("./components/BlogList").then((m) => ({
    default: m.BlogList,
  }))
);
const BlogPostView = lazy(() =>
  import("./components/BlogPostView").then((m) => ({
    default: m.BlogPostView,
  }))
);
const BlogCMS = lazy(() =>
  import("./components/BlogCMS").then((m) => ({
    default: m.BlogCMS,
  }))
);
const KnowledgeAdmin = lazy(() =>
  import("./components/KnowledgeAdmin").then((m) => ({
    default: m.KnowledgeAdmin,
  }))
);
const ApostilleTrackingPage = lazy(() =>
  import("./components/ApostilleTrackingPage").then((m) => ({
    default: m.ApostilleTrackingPage,
  }))
);
const TrackingAdminPage = lazy(() =>
  import("./components/TrackingAdminPage").then((m) => ({
    default: m.TrackingAdminPage,
  }))
);
const CountryDetailPage = lazy(() =>
  import("./components/CountryDetailPage").then((m) => ({
    default: m.CountryDetailPage,
  }))
);
const ExploreCountriesPage = lazy(() =>
  import("./components/ExploreCountriesPage").then((m) => ({
    default: m.ExploreCountriesPage,
  }))
);
const LanguageTranslationDetailPage = lazy(() =>
  import("./components/LanguageTranslationDetailPage").then((m) => ({
    default: m.LanguageTranslationDetailPage,
  }))
);
const VisaChecklistSlugPage = lazy(() =>
  import("./app/visa-checklist/[slug]/page")
);
import { SERVICES, ServiceItem } from "./data/services";
import {
  getDedicatedPageByPath,
  resolveLocationRoute,
  DedicatedSeoPageData,
} from "./data/dedicatedPages";
import { getCountryBySlug, CountryDirectoryEntry } from "./data/countryDirectory";
import { getAllBlogPosts, BlogPost } from "./data/blog";
import { applyRouteSEO } from "./utils/seo";
import {
  shouldIgnoreAppPopState,
  scrollToPageTop,
  scrollToSectionById,
} from "./utils/modalHistory";
import {
  getLanguageTranslationByPath,
  type LanguageTranslationPageData,
} from "./data/languageTranslations";
import {
  getVisaChecklistByPath,
  VISA_CHECKLIST_PAGES,
  type VisaChecklistData,
} from "./data/visaChecklists";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const raw = window.location.pathname || "/";
    return raw === "/" ? "/" : raw.replace(/\/+$/, "") || "/";
  });

  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | "disclaimer" | "refund" | null>(null);
  const [forceIntro, setForceIntro] = useState<boolean>(false);
  const [introKey, setIntroKey] = useState<number>(0);
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefillDetails | null>(null);

  // Track pending anchor target or history popstate scroll restoration across route transitions
  const pendingAnchorRef = useRef<string | null>(null);
  const pendingPopScrollYRef = useRef<number | null>(null);
  const isInitialMountRef = useRef<boolean>(true);

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem("fg_intro_seen_v1");
    } catch {}
    setForceIntro(true);
    setIntroKey((prev) => prev + 1);
  };

  // Sync state with browser URL navigation (ignoring modal-only history pops)
  useEffect(() => {
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    const handlePopState = (event: PopStateEvent) => {
      if (shouldIgnoreAppPopState()) {
        return;
      }
      const raw = window.location.pathname || "/";
      const nextPath = raw === "/" ? "/" : raw.replace(/\/+$/, "") || "/";
      const rawHash = (window.location.hash || "").replace(/^#/, "").trim();

      if (rawHash) {
        pendingAnchorRef.current = rawHash;
        pendingPopScrollYRef.current = null;
      } else if (
        event.state &&
        typeof event.state.__fgaRouteScrollY === "number"
      ) {
        pendingPopScrollYRef.current = event.state.__fgaRouteScrollY;
        pendingAnchorRef.current = null;
      } else {
        pendingPopScrollYRef.current = 0;
        pendingAnchorRef.current = null;
      }

      setCurrentPath((prev) => {
        if (prev === nextPath) {
          if (rawHash) {
            requestAnimationFrame(() => {
              scrollToSectionById(rawHash, "smooth");
            });
          } else {
            const restoreY = pendingPopScrollYRef.current ?? 0;
            pendingPopScrollYRef.current = null;
            window.scrollTo({ top: restoreY, left: 0, behavior: "instant" as ScrollBehavior });
          }
          return prev;
        }
        return nextPath;
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Deterministic post-render scroll management whenever currentPath changes
  useLayoutEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      const initialHash = (window.location.hash || "").replace(/^#/, "").trim();
      if (initialHash) {
        requestAnimationFrame(() => {
          scrollToSectionById(initialHash, "smooth");
        });
        setTimeout(() => {
          scrollToSectionById(initialHash, "smooth");
        }, 120);
      } else {
        scrollToPageTop("instant");
      }
      return;
    }

    if (pendingAnchorRef.current) {
      const targetAnchor = pendingAnchorRef.current;
      pendingAnchorRef.current = null;
      pendingPopScrollYRef.current = null;
      scrollToPageTop("instant");
      requestAnimationFrame(() => {
        scrollToSectionById(targetAnchor, "smooth");
      });
      setTimeout(() => {
        scrollToSectionById(targetAnchor, "smooth");
      }, 100);
      return;
    }

    if (pendingPopScrollYRef.current !== null) {
      const restoreY = pendingPopScrollYRef.current;
      pendingPopScrollYRef.current = null;
      try {
        window.scrollTo({ top: restoreY, left: 0, behavior: "instant" as ScrollBehavior });
      } catch {
        window.scrollTo(0, restoreY);
      }
      requestAnimationFrame(() => {
        try {
          window.scrollTo({ top: restoreY, left: 0, behavior: "instant" as ScrollBehavior });
        } catch {
          window.scrollTo(0, restoreY);
        }
      });
      return;
    }

    // Standard SPA page navigation: always open at the very top of the destination page
    scrollToPageTop("instant");
    requestAnimationFrame(() => {
      scrollToPageTop("instant");
    });
  }, [currentPath]);

  const saveCurrentScrollStateInHistory = () => {
    if (typeof window === "undefined") return;
    try {
      const currentY =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0;
      const existingState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};
      window.history.replaceState(
        { ...existingState, __fgaRouteScrollY: currentY },
        "",
        window.location.href
      );
    } catch {}
  };

  const navigateTo = (path: string) => {
    if (!path) return;

    // 1. In-page or homepage section hash navigation (e.g. "#services", "/#services", "#all-core-services", "/#route-finder")
    if (path.startsWith("#") || path.startsWith("/#")) {
      const cleanId = path.replace(/^\/?#/, "").trim();
      if (!cleanId) return;

      // If it's a pure "#anchor" that already exists on the currently rendered non-home page (e.g. "#service-quote" or "#country-directory")
      if (path.startsWith("#") && currentPath !== "/") {
        const localElem = document.getElementById(cleanId);
        if (localElem) {
          saveCurrentScrollStateInHistory();
          try {
            window.history.pushState(
              { __fgaRouteScrollY: window.scrollY || 0, __fgaAnchor: cleanId },
              "",
              `${currentPath}#${cleanId}`
            );
          } catch {}
          requestAnimationFrame(() => {
            scrollToSectionById(cleanId, "smooth");
          });
          return;
        }
      }

      // Target section is on the Homepage ("/")
      saveCurrentScrollStateInHistory();
      try {
        window.history.pushState(
          { __fgaRouteScrollY: 0, __fgaAnchor: cleanId },
          "",
          `/#${cleanId}`
        );
      } catch {}

      if (currentPath === "/") {
        // Wait 1 animation frame so any closing mobile menu drawer updates header height before measuring offset
        requestAnimationFrame(() => {
          scrollToSectionById(cleanId, "smooth");
        });
      } else {
        pendingAnchorRef.current = cleanId;
        pendingPopScrollYRef.current = null;
        scrollToPageTop("instant");
        setCurrentPath("/");
      }
      return;
    }

    // 2. Full route navigation (with optional query string or #hash)
    const [pathAndQuery, hashPart] = path.split("#");
    const [rawPathOnly, queryPart] = (pathAndQuery || "/").split("?");
    const normalizedPath =
      !rawPathOnly || rawPathOnly === "/"
        ? "/"
        : rawPathOnly.replace(/\/+$/, "") || "/";
    const querySuffix = queryPart ? `?${queryPart}` : "";
    const hashSuffix = hashPart ? `#${hashPart}` : "";
    const fullUrlToPush = `${normalizedPath}${querySuffix}${hashSuffix}`;

    saveCurrentScrollStateInHistory();

    try {
      window.history.pushState(
        { __fgaRouteScrollY: 0, __fgaAnchor: hashPart || null },
        "",
        fullUrlToPush
      );
    } catch {}

    if (hashPart) {
      if (normalizedPath === currentPath) {
        requestAnimationFrame(() => {
          scrollToSectionById(hashPart, "smooth");
        });
      } else {
        pendingAnchorRef.current = hashPart;
        pendingPopScrollYRef.current = null;
        scrollToPageTop("instant");
        setCurrentPath(normalizedPath);
      }
      return;
    }

    pendingAnchorRef.current = null;
    pendingPopScrollYRef.current = null;

    if (normalizedPath !== currentPath) {
      setCurrentPath(normalizedPath);
    } else {
      scrollToPageTop("instant");
    }
  };

  // Find if current path is a dedicated SEO page (/services/*, /countries/*, /guides/*, /locations/*)
  const activeDedicatedPage: DedicatedSeoPageData | undefined =
    getDedicatedPageByPath(currentPath);

  // Find if current path is one of the 26 dedicated Language Translation SEO pages (/translation/*)
  const activeTranslationPage: LanguageTranslationPageData | undefined =
    currentPath.startsWith("/translation/")
      ? getLanguageTranslationByPath(currentPath)
      : undefined;

  // Find if current path is a Visa Checklist page (/visa-checklist/[slug])
  const activeVisaChecklist: VisaChecklistData | undefined =
    currentPath === "/visa-checklist" || currentPath === "/visa-checklists"
      ? VISA_CHECKLIST_PAGES[0]
      : currentPath.startsWith("/visa-checklist/") ||
        currentPath.startsWith("/visa-checklists/")
      ? getVisaChecklistByPath(currentPath)
      : undefined;

  // Ensure bare /visa-checklist or legacy /visa-checklists/* URLs always resolve to their dedicated /visa-checklist/[slug] URL
  useEffect(() => {
    if (activeVisaChecklist && currentPath !== activeVisaChecklist.slug) {
      try {
        window.history.replaceState(
          window.history.state || {},
          "",
          activeVisaChecklist.slug
        );
      } catch {}
      setCurrentPath(activeVisaChecklist.slug);
    }
  }, [activeVisaChecklist, currentPath]);

  // Find if current path is a city/state location landing page
  const activeLocationRoute = resolveLocationRoute(currentPath);

  // Find if current path is a service page
  const activeService: ServiceItem | undefined = SERVICES.find(
    (s) => s.slug === currentPath
  );

  // Find if current path is a country detail page (/countries/:slug or /country/:slug)
  const isCountryRoute =
    ((currentPath.startsWith("/countries/") &&
      currentPath !== "/countries/uae-mofa-attestation" &&
      currentPath !== "/countries/saudi-arabia-attestation") ||
      (currentPath.startsWith("/country/") && currentPath !== "/country"));
  const activeCountry: CountryDirectoryEntry | undefined = isCountryRoute
    ? getCountryBySlug(currentPath)
    : undefined;

  // Find if current path is a blog post (only read localStorage when on /blog/*)
  const isBlogPost = currentPath.startsWith("/blog/") && currentPath !== "/blog";
  const postSlug = isBlogPost ? currentPath.replace("/blog/", "") : "";
  const activePost: BlogPost | undefined = isBlogPost
    ? getAllBlogPosts().find((p) => p.slug === postSlug)
    : undefined;

  // Synchronize per-page title, meta description, canonical URL, OpenGraph, robots, and JSON-LD
  useEffect(() => {
    applyRouteSEO(currentPath);
  }, [currentPath]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      {/* Animated Brand Intro Overlay */}
      <BrandIntro
        key={introKey}
        forceShow={forceIntro}
        onComplete={() => setForceIntro(false)}
      />

      {/* Top Navigation */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Page Routing with Error Boundary & High-Performance Suspense */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback type="page" />}>
          <div className="flex-1 w-full max-w-full min-w-0 pt-13 sm:pt-16">
            {currentPath === "/services/apostille" ||
        currentPath === "/apostille-services-india" ? (
          <ApostilleServicesPage onNavigate={navigateTo} />
        ) : currentPath === "/services/degree-certificate-apostille" ||
          currentPath === "/educational-document-attestation" ? (
          <DegreeCertificateApostillePage onNavigate={navigateTo} />
        ) : currentPath === "/countries/uae-mofa-attestation" ? (
          <UaeMofaAttestationPage onNavigate={navigateTo} />
        ) : currentPath === "/countries/saudi-arabia-attestation" ? (
          <SaudiArabiaAttestationPage onNavigate={navigateTo} />
        ) : currentPath === "/services/commercial-document-attestation" ||
          currentPath === "/commercial-document-attestation" ||
          currentPath === "/chamber-of-commerce-apostille" ||
          currentPath === "/chamber-of-commerce-mea-attestation" ? (
          <CommercialDocumentAttestationPage onNavigate={navigateTo} />
        ) : currentPath === "/services/embassy-legalization" ||
          currentPath === "/embassy-legalisation-india" ||
          currentPath === "/embassy-legalization-services" ? (
          <EmbassyLegalizationPage onNavigate={navigateTo} />
        ) : currentPath === "/guides/e-sanad" ||
          currentPath === "/e-sanad-guide" ||
          currentPath === "/e-sanad-status" ||
          currentPath === "/e-sanad-paper-documents" ? (
          <ESanadGuidePage onNavigate={navigateTo} />
        ) : currentPath === "/services/document-translation" ||
          currentPath === "/document-translation-services" ||
          currentPath === "/services/language-translation" ||
          currentPath === "/language-translation-services" ? (
          <DocumentTranslationPage onNavigate={navigateTo} />
        ) : activeTranslationPage ? (
          <LanguageTranslationDetailPage
            key={activeTranslationPage.slug}
            page={activeTranslationPage}
            onNavigate={navigateTo}
          />
        ) : currentPath === "/services/notary-public" ||
          currentPath === "/notary-attestation-india" ||
          currentPath === "/notary-public-attestation" ? (
          <NotaryPublicAttestationPage onNavigate={navigateTo} />
        ) : currentPath === "/services/saudi-death-claim" ||
          currentPath === "/saudi-arabia-death-claim-assistance" ||
          currentPath === "/saudi-death-claim-assistance" ||
          currentPath === "/saudi-death-compensation-documents" ? (
          <SaudiDeathClaimPage onNavigate={navigateTo} />
        ) : currentPath === "/services/mofa-attestation" ||
          currentPath === "/mofa-attestation" ||
          currentPath === "/mofa-attestation-services" ||
          currentPath === "/gulf-mofa-attestation" ? (
          <MofaAttestationPage onNavigate={navigateTo} />
        ) : activeVisaChecklist ? (
          <VisaChecklistSlugPage
            key={activeVisaChecklist.slugParam}
            params={{ slug: activeVisaChecklist.slugParam }}
            onNavigate={navigateTo}
          />
        ) : activeLocationRoute ? (
          <CityLandingPage
            key={activeLocationRoute.slug}
            cityName={activeLocationRoute.cityName}
            slug={activeLocationRoute.slug}
            onNavigate={navigateTo}
          />
        ) : currentPath === "/countries" ? (
          <ExploreCountriesPage onNavigate={navigateTo} />
        ) : activeCountry ? (
          <CountryDetailPage
            key={activeCountry.slug}
            country={activeCountry}
            onNavigate={navigateTo}
          />
        ) : activeDedicatedPage ? (
          <DedicatedSeoPage
            key={activeDedicatedPage.slug}
            page={activeDedicatedPage}
            onNavigate={navigateTo}
          />
        ) : activeService ? (
          <ServicePage
            key={activeService.slug}
            service={activeService}
            onNavigate={navigateTo}
          />
        ) : isBlogPost && activePost ? (
          <BlogPostView
            key={activePost.slug}
            post={activePost}
            onNavigate={navigateTo}
          />
        ) : currentPath === "/blog" ? (
          <BlogList onNavigate={navigateTo} />
        ) : currentPath === "/apostille-tracking" ? (
          <ApostilleTrackingPage onNavigate={navigateTo} />
        ) : currentPath === "/tracking-admin" ? (
          <TrackingAdminPage onNavigate={navigateTo} />
        ) : currentPath === "/blog-manage" ? (
          <BlogCMS onNavigate={navigateTo} />
        ) : currentPath === "/knowledge-admin" ? (
          <KnowledgeAdmin onNavigate={navigateTo} />
        ) : currentPath === "/contact-us" ? (
          <ContactPage onNavigate={navigateTo} />
        ) : currentPath === "/about-us" ? (
          <AboutPage onNavigate={navigateTo} />
        ) : currentPath === "/faqs" ? (
          <div className="bg-white min-h-screen py-6">
            <FaqSection isStandalonePage={true} />
          </div>
        ) : currentPath === "/" ? (
          /* Homepage View */
          <main>
            {/* Hero Section (includes authentic MEA Apostille specimen) */}
            <Hero
              onExploreServices={() => {
                scrollToSectionById("services", "smooth");
              }}
              onRequestQuote={() => {
                scrollToSectionById("route-finder", "smooth");
              }}
            />

            {/* Mandatory Private Agency Disclaimer Box */}
            <div className="bg-white border-b border-slate-200 py-4">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <DisclaimerBox />
              </div>
            </div>

            {/* Document Safety Protocol Section (Lazy Loaded Below Fold) */}
            <Suspense fallback={<LoadingFallback type="section" title="Loading Safety Protocol..." />}>
              <DocumentSafetyTrustSection onNavigate={navigateTo} />
            </Suspense>

            {/* Dedicated Services & Country Cards Grid placed directly below Hero */}
            <ServicesGrid onSelectService={navigateTo} />

            {/* Real Authentication Proof & Specimens Gallery */}
            <Suspense fallback={<LoadingFallback type="section" />}>
              <SampleEvidenceGallery />
            </Suspense>

            {/* Interactive Document Route Finder */}
            <RouteFinder
              onSelectService={navigateTo}
              onRequestQuoteWithDetails={(details) => setQuotePrefill(details)}
            />

            {/* How It Works Section */}
            <Suspense fallback={<LoadingFallback type="section" />}>
              <HowItWorks
                onRequestQuote={() => {
                  scrollToSectionById("home-quote", "smooth");
                }}
              />
            </Suspense>

            {/* Why Choose Us Section */}
            <Suspense fallback={<LoadingFallback type="section" />}>
              <WhyChooseUs onNavigate={navigateTo} />
            </Suspense>

            {/* Home Quote Request Section */}
            <section id="home-quote" className="py-6 sm:py-10 bg-white border-b border-slate-200 overflow-x-hidden scroll-mt-20">
              <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 box-border">
                <Suspense fallback={<LoadingFallback type="section" />}>
                  <QuoteForm
                    title="Request a Detailed Quotation & Guidance"
                    subtitle="Provide your document details and destination country. We check the official rules and respond with transparent procedural estimates."
                    prefillDetails={quotePrefill}
                  />
                </Suspense>
              </div>
            </section>

            {/* FAQs Section */}
            <Suspense fallback={<LoadingFallback type="section" />}>
              <FaqSection />
            </Suspense>
          </main>
        ) : (
          /* Clean 404 Not Found View (prevents soft-404 duplicate homepage rendering) */
          <main className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              404 — Page Not Found
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] font-display tracking-tight">
              The Requested Page Could Not Be Found
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              The link you followed may be outdated or mistyped. Explore our document apostille, attestation, translation, and embassy legalization services below.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/");
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-slate-900 rounded-xl shadow-xs transition-colors"
              >
                Return to Homepage
              </a>
              <a
                href="/#route-finder"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/#route-finder");
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors"
              >
                Check Document Route Finder
              </a>
              <a
                href="/contact-us"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/contact-us");
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              >
                Contact Us
              </a>
            </div>
          </main>
        )}
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenLegal={(type) => setLegalModalType(type)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Floating WhatsApp & Back-to-Top Action Button */}
      <FloatingWhatsApp />

      {/* Legal Modals */}
      <Suspense fallback={null}>
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </Suspense>
    </div>
  );
}
