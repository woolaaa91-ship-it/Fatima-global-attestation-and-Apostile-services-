/**
 * FATIMA GLOBAL ATTESTATION - Centralized Technical SEO & Structured Data Manager
 * Resolves unique titles, meta descriptions, canonical URLs, robots directives,
 * OpenGraph/Twitter tags, and Schema.org JSON-LD for every route.
 * Safe to import in both browser (React SPA) and Node.js (Express server.ts).
 */

import { BUSINESS_CONFIG } from "../config/business.ts";
import { SERVICES } from "../data/services.ts";
import { DEDICATED_SEO_PAGES, getDedicatedPageByPath } from "../data/dedicatedPages.ts";
import { getCountryBySlug, INDEXABLE_COUNTRIES } from "../data/countryDirectory.ts";
import { INITIAL_BLOG_POSTS, getAllBlogPosts, type BlogPost } from "../data/blog.ts";
import { GENERAL_FAQS } from "../data/faqs.ts";
import {
  ALL_LANGUAGE_TRANSLATION_PAGES,
  getLanguageTranslationByPath,
} from "../data/languageTranslations.ts";
import {
  VISA_CHECKLIST_PAGES,
  getVisaChecklistByPath,
} from "../data/visaChecklists.ts";

export const CONFIGURABLE_SITE_URL_PLACEHOLDER =
  "https://fatimaglobalattestation.com";

export interface RouteSEOMetadata {
  path: string;
  isFound: boolean;
  isIndexable: boolean;
  title: string;
  description: string;
  canonicalUrl: string;
  robots: "index, follow" | "noindex, nofollow";
  ogType: "website" | "article";
  ogImage: string;
  jsonLd: Record<string, unknown>[];
}

function isValidHttpUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^https?:\/\/[a-zA-Z0-9.-]+(?::\d+)?/i.test(value.trim()) &&
    !value.includes("YOUR-CUSTOM-DOMAIN-HERE")
  );
}

export function getCanonicalBaseUrl(customBaseUrl?: string): string {
  const candidates = [
    customBaseUrl,
    typeof process !== "undefined" ? process.env?.APP_URL : undefined,
    typeof process !== "undefined" ? process.env?.VITE_SITE_URL : undefined,
    typeof process !== "undefined" ? process.env?.SITE_URL : undefined,
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : undefined,
    BUSINESS_CONFIG.siteUrl,
  ];

  for (const candidate of candidates) {
    if (isValidHttpUrl(candidate)) {
      return candidate.trim().replace(/\/+$/, "");
    }
  }

  return CONFIGURABLE_SITE_URL_PLACEHOLDER;
}

export const PUBLIC_INDEXABLE_ROUTES: Array<{
  path: string;
  changefreq: "weekly" | "monthly";
  priority: string;
}> = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...DEDICATED_SEO_PAGES.map((p) => ({
    path: p.slug,
    changefreq: "weekly" as const,
    priority: "0.95",
  })),
  ...ALL_LANGUAGE_TRANSLATION_PAGES.map((t) => ({
    path: t.slug,
    changefreq: "weekly" as const,
    priority: "0.9",
  })),
  ...VISA_CHECKLIST_PAGES.map((v) => ({
    path: v.slug,
    changefreq: "weekly" as const,
    priority: "0.95",
  })),
  ...SERVICES.map((s) => ({
    path: s.slug,
    changefreq: "monthly" as const,
    priority: "0.9",
  })),
  { path: "/countries", changefreq: "weekly", priority: "0.95" },
  ...INDEXABLE_COUNTRIES.map((c) => ({
    path: `/countries/${c.canonicalSlug}`,
    changefreq: "weekly" as const,
    priority: c.isPriority12 ? "0.95" : "0.85",
  })),
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  ...INITIAL_BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  })),
  { path: "/apostille-tracking", changefreq: "weekly", priority: "0.9" },
  { path: "/about-us", changefreq: "monthly", priority: "0.8" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.8" },
  { path: "/faqs", changefreq: "monthly", priority: "0.7" },
];

export function generateRobotsTxt(customBaseUrl?: string): string {
  const baseUrl = getCanonicalBaseUrl(customBaseUrl);
  return [
    "# robots.txt for FATIMA GLOBAL ATTESTATION",
    "# CONFIGURABLE SITE URL: Update VITE_SITE_URL or BUSINESS_CONFIG.siteUrl once your custom domain is purchased.",
    "User-agent: *",
    "Allow: /",
    "Disallow: /blog-manage",
    "Disallow: /knowledge-admin",
    "Disallow: /tracking-admin",
    "Disallow: /apostille-tracking?*",
    "Disallow: /api/",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

export function generateSitemapXml(customBaseUrl?: string): string {
  const baseUrl = getCanonicalBaseUrl(customBaseUrl);
  const lastmod = "2026-10-21";
  const urlEntries = PUBLIC_INDEXABLE_ROUTES.map((item) => {
    const loc = item.path === "/" ? `${baseUrl}/` : `${baseUrl}${item.path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${item.changefreq}</changefreq>`,
      `    <priority>${item.priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<!-- CONFIGURABLE SITE URL: Update VITE_SITE_URL or BUSINESS_CONFIG.siteUrl once your custom domain is purchased -->",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

function buildOrganizationSchema(baseUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: "Fatima Global Attestation",
    alternateName: BUSINESS_CONFIG.name,
    description:
      "Independent consultancy providing assistance with document apostille, MEA attestation, SDM authentication, e-Sanad verification, Chamber of Commerce endorsement, translation, embassy legalization, and Saudi Arabia death claim documentation guidance in India.",
    url: `${baseUrl}/`,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/assets/aistudio/apostille_specimen_clean.jpg`,
    telephone: BUSINESS_CONFIG.telPhone,
    email: BUSINESS_CONFIG.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Barakhamba Road, Connaught Place",
      addressLocality: "New Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "New Delhi",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    serviceType: [
      "SDM + Apostille Services",
      "Apostille Services in India",
      "e-Sanad (Paper Documents) Assistance",
      "SDM + MEA Attestation",
      "Chamber of Commerce + Apostille",
      "Chamber of Commerce + MEA Attestation",
      "Document Translation Services",
      "Embassy Legalization Services",
      "Saudi Arabia Death Claim Assistance",
      "Educational Document Attestation",
      "Personal Document Attestation",
      "UAE Embassy Attestation Services",
      "Saudi Arabia Document Attestation & Apostille",
    ],
    slogan: BUSINESS_CONFIG.tagline,
  };
}

function buildBreadcrumbSchema(
  baseUrl: string,
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.path === "/" ? `${baseUrl}/` : `${baseUrl}${item.path}`,
    })),
  };
}

function buildFaqSchema(
  faqs: { question: string; answer: string }[],
  pageUrl?: string,
  faqTitle?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faqpage`, url: pageUrl } : {}),
    ...(faqTitle ? { name: faqTitle } : {}),
    mainEntity: faqs.map((f, idx) => ({
      "@type": "Question",
      ...(pageUrl ? { "@id": `${pageUrl}#faq-question-${idx + 1}` } : {}),
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function resolveRouteSEO(
  rawPathname: string,
  customBaseUrl?: string
): RouteSEOMetadata {
  const baseUrl = getCanonicalBaseUrl(customBaseUrl);
  const [pathOnly, queryPart] = (rawPathname || "/").split("?");
  const hasCustomerQueryParams = Boolean(queryPart && queryPart.trim().length > 0);
  const cleanPath =
    !pathOnly || pathOnly === "/"
      ? "/"
      : pathOnly.replace(/\/+$/, "") || "/";

  const defaultImage = `${baseUrl}/assets/aistudio/apostille_specimen_clean.jpg`;

  // 1. Homepage ("/")
  if (cleanPath === "/") {
    return {
      path: "/",
      isFound: true,
      isIndexable: true,
      title:
        "Attestation & Apostille Services in India | Fatima Global Attestation",
      description:
        "Get guidance for apostille, document attestation, embassy legalization and document translation in India. Explore your document process or request an enquiry.",
      canonicalUrl: `${baseUrl}/`,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        buildOrganizationSchema(baseUrl),
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: `${baseUrl}/`,
          name: "Fatima Global Attestation",
          publisher: { "@id": `${baseUrl}/#organization` },
        },
        buildFaqSchema(
          GENERAL_FAQS,
          `${baseUrl}/`,
          "Frequently Asked Questions — Fatima Global Attestation"
        ),
      ],
    };
  }

  // 1B. Core Service Pages (Direct Service Slugs from SERVICES)
  const service = SERVICES.find((s) => s.slug === cleanPath);
  if (service) {
    const serviceImg = service.image
      ? `${baseUrl}${service.image}`
      : defaultImage;
    return {
      path: service.slug,
      isFound: true,
      isIndexable: true,
      title: service.seoTitle,
      description: service.metaDescription,
      canonicalUrl: `${baseUrl}${service.slug}`,
      robots: "index, follow",
      ogType: "website",
      ogImage: serviceImg,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.shortTitle,
          description: service.metaDescription,
          url: `${baseUrl}${service.slug}`,
          provider: {
            "@type": "ProfessionalService",
            name: "FATIMA GLOBAL ATTESTATION",
            url: `${baseUrl}/`,
            telephone: BUSINESS_CONFIG.telPhone,
          },
          areaServed: {
            "@type": "Country",
            name: "India",
          },
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: service.shortTitle, path: service.slug },
        ]),
        ...(service.faqs && service.faqs.length > 0
          ? [buildFaqSchema(service.faqs)]
          : []),
      ],
    };
  }

  // 1C. Dedicated Master Architecture SEO Pages (/services/*, /countries/*, /guides/*, /locations/*)
  const dedicatedPage = getDedicatedPageByPath(cleanPath);
  if (dedicatedPage) {
    const canonicalDedicatedUrl = `${baseUrl}${dedicatedPage.slug}`;
    return {
      path: dedicatedPage.slug,
      isFound: true,
      isIndexable: true,
      title: dedicatedPage.seoTitle,
      description: dedicatedPage.metaDescription,
      canonicalUrl: canonicalDedicatedUrl,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${canonicalDedicatedUrl}#service`,
          name: dedicatedPage.h1,
          serviceType: dedicatedPage.h1,
          description: dedicatedPage.metaDescription,
          url: canonicalDedicatedUrl,
          provider: buildOrganizationSchema(baseUrl),
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "City", name: "New Delhi" },
            { "@type": "City", name: "Mumbai" },
            { "@type": "City", name: "Bengaluru" },
            { "@type": "City", name: "Hyderabad" },
            { "@type": "City", name: "Chennai" },
            { "@type": "City", name: "Kochi" },
            { "@type": "City", name: "Pune" },
            { "@type": "City", name: "Ahmedabad" },
            { "@type": "City", name: "Kolkata" },
            { "@type": "City", name: "Chandigarh" },
            { "@type": "City", name: "Lucknow" },
          ],
          ...(dedicatedPage.slug === "/services/document-translation"
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Professional Language Translation Services in India — Fatima Global Attestation",
                  itemListElement: [
                    {
                      "@type": "OfferCatalog",
                      name: "International Language Translation Services",
                      itemListElement: ALL_LANGUAGE_TRANSLATION_PAGES.filter(
                        (p) => p.category === "international"
                      ).map((lang) => ({
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: lang.cardTitle,
                          url: `${baseUrl}${lang.slug}`,
                        },
                      })),
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Indian Regional Language to English Translation Services",
                      itemListElement: ALL_LANGUAGE_TRANSLATION_PAGES.filter(
                        (p) => p.category === "regional-to-english"
                      ).map((lang) => ({
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: lang.cardTitle,
                          url: `${baseUrl}${lang.slug}`,
                        },
                      })),
                    },
                  ],
                },
              }
            : {}),
          ...(dedicatedPage.slug === "/services/apostille"
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Document-Wise MEA Apostille Services in India — Fatima Global Attestation",
                  itemListElement: [
                    {
                      "@type": "OfferCatalog",
                      name: "Educational Documents Apostille (Academic)",
                      itemListElement: [
                        "Degrees, Certificates and Diplomas",
                        "Academic Transcripts and Mark Sheets",
                        "School Leaving Certificates (SSC / HSC)",
                        "Professional Qualification Certificates",
                        "Migration and Provisional Certificates",
                      ].map((docName) => ({
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: `${docName} MEA Apostille`,
                        },
                      })),
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Personal Documents Apostille",
                      itemListElement: [
                        "Birth and Marriage Certificates",
                        "Death Certificates",
                        "Affidavits and Statutory Declarations",
                        "Experience Letters and Salary Certificates",
                        "Police Clearance Certificates (PCC)",
                        "No Objection Certificates (NOC)",
                      ].map((docName) => ({
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: `${docName} MEA Apostille`,
                        },
                      })),
                    },
                    {
                      "@type": "OfferCatalog",
                      name: "Commercial Documents Apostille",
                      itemListElement: [
                        "Power of Attorney (PoA)",
                        "Certificate of Origin and Commercial Invoices",
                        "Company Incorporation Documents",
                        "Export and Trade Certificates",
                        "Memorandum and Articles of Association",
                      ].map((docName) => ({
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: `${docName} MEA Apostille`,
                        },
                      })),
                    },
                  ],
                },
              }
            : {}),
        },
        ...(dedicatedPage.slug === "/services/apostille"
          ? [
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: "How to Get MEA Apostille on Documents in India",
                description:
                  "Step-by-step MEA Hague Apostille process in India for educational, personal, and commercial documents coordinated by Fatima Global Attestation.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Document Verification",
                    text: "Pre-submission scan review to verify seal clarity and determine whether State HRD, SDM, Home Department, or Chamber of Commerce authentication is required.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "State Authentication",
                    text: "Submission to Notary, Sub-Divisional Magistrate (SDM), State HRD, or Chamber of Commerce based on the document category and destination country.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "MEA Apostille Sticker Application",
                    text: "Submission via authorized channels or e-Sanad to the Ministry of External Affairs (MEA) in New Delhi for the official Hague Convention Apostille sticker with QR and unique serial number.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Secure Tracked Delivery",
                    text: "Tamper-proof insured courier dispatch across all Indian states or international DHL delivery for NRIs abroad.",
                  },
                ],
              },
            ]
          : []),
        buildBreadcrumbSchema(
          baseUrl,
          dedicatedPage.breadcrumbs.map((b) => ({
            name: b.label,
            path: b.path || dedicatedPage.slug,
          }))
        ),
        ...(dedicatedPage.faqs && dedicatedPage.faqs.length > 0
          ? [
              buildFaqSchema(
                dedicatedPage.faqs,
                canonicalDedicatedUrl,
                `Frequently Asked Questions — ${dedicatedPage.h1}`
              ),
            ]
          : []),
      ],
    };
  }

  // 1C. Individual Language Translation Landing Pages (26 approved languages under /translation/*)
  if (cleanPath.startsWith("/translation/")) {
    const langPage = getLanguageTranslationByPath(cleanPath);
    if (langPage) {
      const canonicalLangUrl = `${baseUrl}${langPage.slug}`;
      return {
        path: langPage.slug,
        isFound: true,
        isIndexable: true,
        title: langPage.seoTitle,
        description: langPage.metaDescription,
        canonicalUrl: canonicalLangUrl,
        robots: "index, follow",
        ogType: "website",
        ogImage: defaultImage,
        jsonLd: [
          buildOrganizationSchema(baseUrl),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${canonicalLangUrl}#service`,
            name: langPage.h1,
            serviceType: langPage.cardTitle,
            description: langPage.metaDescription,
            url: canonicalLangUrl,
            provider: buildOrganizationSchema(baseUrl),
            areaServed: [
              { "@type": "Country", name: "India" },
              { "@type": "City", name: "New Delhi" },
            ],
          },
          buildBreadcrumbSchema(baseUrl, [
            { name: "Home", path: "/" },
            {
              name: "Language Translation Services",
              path: "/services/document-translation",
            },
            { name: langPage.cardTitle, path: langPage.slug },
          ]),
          ...(langPage.faqs && langPage.faqs.length > 0
            ? [
                buildFaqSchema(
                  langPage.faqs,
                  canonicalLangUrl,
                  `Frequently Asked Questions — ${langPage.cardTitle}`
                ),
              ]
            : []),
        ],
      };
    }
  }



  // 2A. Explore All Countries Directory Page ("/countries")
  if (cleanPath === "/countries") {
    return {
      path: "/countries",
      isFound: true,
      isIndexable: true,
      title:
        "Attestation & Apostille by Country | Fatima Global Attestation",
      description:
        "Explore country-wise document attestation, MEA Hague Apostille & embassy legalization requirements from India for UAE, Saudi, Qatar, UK, USA, Germany & 100+ nations.",
      canonicalUrl: `${baseUrl}/countries`,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Document Attestation & Apostille by Destination Country",
          description:
            "Searchable directory of country-specific document attestation, MEA Hague Apostille, and Embassy legalization routes from India.",
          url: `${baseUrl}/countries`,
          publisher: buildOrganizationSchema(baseUrl),
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "Explore All Countries", path: "/countries" },
        ]),
      ],
    };
  }

  // 2B. Country Detail Pages ("/countries/:slug" and "/country/:slug")
  // Indexable ONLY when `country.isIndexable === true` (substantial verified guidance)
  if (
    (cleanPath.startsWith("/countries/") && cleanPath !== "/countries") ||
    (cleanPath.startsWith("/country/") && cleanPath !== "/country")
  ) {
    const country = getCountryBySlug(cleanPath);
    if (country) {
      const canonicalCountryPath = `/countries/${country.canonicalSlug}`;
      return {
        path: canonicalCountryPath,
        isFound: true,
        isIndexable: country.isIndexable,
        title: country.seoTitle,
        description: country.metaDescription,
        canonicalUrl: `${baseUrl}${canonicalCountryPath}`,
        robots: country.isIndexable ? "index, follow" : "noindex, nofollow",
        ogType: "website",
        ogImage: defaultImage,
        jsonLd: [
          ...(country.isIndexable
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "Service",
                  name: country.h1,
                  serviceType: country.heroBadge,
                  description: country.metaDescription,
                  url: `${baseUrl}${canonicalCountryPath}`,
                  provider: {
                    "@type": "ProfessionalService",
                    name: "FATIMA GLOBAL ATTESTATION",
                    url: `${baseUrl}/`,
                    telephone: BUSINESS_CONFIG.telPhone,
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "India",
                  },
                },
                ...(country.faqs && country.faqs.length > 0
                  ? [buildFaqSchema(country.faqs)]
                  : []),
              ]
            : []),
          buildBreadcrumbSchema(baseUrl, [
            { name: "Home", path: "/" },
            {
              name: "Countries",
              path: "/countries",
            },
            { name: country.name, path: canonicalCountryPath },
          ]),
        ],
      };
    }
  }

  // 3. About Us Page ("/about-us")
  if (cleanPath === "/about-us") {
    return {
      path: "/about-us",
      isFound: true,
      isIndexable: true,
      title:
        "About Us | Fatima Global Attestation | Document Legalization",
      description:
        "About Fatima Global Attestation: independent consultancy providing document apostille, MEA attestation, SDM authentication & embassy legalization assistance in India.",
      canonicalUrl: `${baseUrl}/about-us`,
      robots: "index, follow",
      ogType: "website",
      ogImage: `${baseUrl}/assets/images/embassy_legalization_desk_1792412027907.jpg`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Fatima Global Attestation",
          description:
            "Learn about Fatima Global Attestation, an independent consultancy providing document apostille, MEA attestation, SDM authentication, and embassy legalization assistance in India.",
          url: `${baseUrl}/about-us`,
          mainEntity: buildOrganizationSchema(baseUrl),
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ]),
      ],
    };
  }

  // 4. Contact Us Page ("/contact-us")
  if (cleanPath === "/contact-us") {
    return {
      path: "/contact-us",
      isFound: true,
      isIndexable: true,
      title: "Contact Us | FATIMA GLOBAL ATTESTATION | Delhi & Pan-India",
      description:
        "Contact Fatima Global Attestation for apostille, MEA attestation, SDM authentication, translation, and embassy legalization assistance in India.",
      canonicalUrl: `${baseUrl}/contact-us`,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Fatima Global Attestation",
          description:
            "Contact Fatima Global Attestation in Connaught Place, New Delhi for document apostille, MEA attestation, SDM authentication, translation, and embassy legalization.",
          url: `${baseUrl}/contact-us`,
          mainEntity: buildOrganizationSchema(baseUrl),
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ]),
      ],
    };
  }

  // 5. Standalone FAQs Page ("/faqs")
  if (cleanPath === "/faqs") {
    return {
      path: "/faqs",
      isFound: true,
      isIndexable: true,
      title:
        "Apostille & Attestation FAQs | Fatima Global Attestation",
      description:
        "Clear answers to common questions about MEA Apostille, SDM attestation, e-Sanad verification, Chamber of Commerce endorsement, and embassy legalization in India.",
      canonicalUrl: `${baseUrl}/faqs`,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        buildFaqSchema(GENERAL_FAQS),
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ]),
      ],
    };
  }

  // 6. Knowledge Centre / Blog Index ("/blog")
  if (cleanPath === "/blog") {
    return {
      path: "/blog",
      isFound: true,
      isIndexable: true,
      title:
        "Knowledge Centre & Legalization Guides | FATIMA GLOBAL ATTESTATION",
      description:
        "Authoritative guides on MEA Apostille, SDM Attestation, e-Sanad, UAE MOFA Legalization, and Chamber of Commerce export procedures in India.",
      canonicalUrl: `${baseUrl}/blog`,
      robots: "index, follow",
      ogType: "website",
      ogImage: `${baseUrl}/assets/images/hero_attestation_docs_1792412027548.jpg`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Documentation Knowledge Centre & Guides",
          description:
            "Step-by-step statutory guides, destination protocols, and procedural breakdowns for Indian personal, educational, and commercial document authentication.",
          url: `${baseUrl}/blog`,
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          { name: "Knowledge Centre & Blog", path: "/blog" },
        ]),
      ],
    };
  }

  // 7. Individual Blog Posts ("/blog/:slug")
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    const posts: BlogPost[] =
      typeof window !== "undefined" ? getAllBlogPosts() : INITIAL_BLOG_POSTS;
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      const postImg = post.featuredImage.startsWith("http")
        ? post.featuredImage
        : `${baseUrl}${post.featuredImage}`;
      let rawBlogTitle = post.seoTitle.includes(":")
        ? post.seoTitle.split(":")[0].trim()
        : post.seoTitle;
      if (rawBlogTitle.includes("& MOFA")) {
        rawBlogTitle = "UAE Embassy Attestation & MOFA Guide";
      }
      if (rawBlogTitle.includes("Certificate Apostille from India")) {
        rawBlogTitle = "Portugal PCC & Marriage Apostille";
      }
      const blogTitle = `${rawBlogTitle} | Fatima Global Attestation`;
      return {
        path: `/blog/${post.slug}`,
        isFound: true,
        isIndexable: true,
        title: blogTitle,
        description: post.metaDescription,
        canonicalUrl: `${baseUrl}/blog/${post.slug}`,
        robots: "index, follow",
        ogType: "article",
        ogImage: postImg,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            image: postImg,
            author: {
              "@type": "Organization",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "FATIMA GLOBAL ATTESTATION",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.svg`,
              },
            },
            datePublished: post.publishedDate,
            dateModified: post.updatedDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${post.slug}`,
            },
          },
          buildBreadcrumbSchema(baseUrl, [
            { name: "Home", path: "/" },
            { name: "Knowledge Centre", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          ...(post.faqs && post.faqs.length > 0
            ? [buildFaqSchema(post.faqs)]
            : []),
        ],
      };
    }
  }

  // 7B. Document Tracking & Verification Page ("/apostille-tracking")
  // Customer-specific tracking URLs (e.g., ?token=... or ?id=...) are strictly noindex, nofollow
  if (cleanPath === "/apostille-tracking") {
    const isCustomerSpecificTracking = hasCustomerQueryParams;
    return {
      path: "/apostille-tracking",
      isFound: true,
      isIndexable: !isCustomerSpecificTracking,
      title:
        "Document Tracking & Verification | FATIMA GLOBAL ATTESTATION",
      description:
        "Track your Fatima Global Attestation document order status and access official Government of India e-Sanad Apostille verification resources.",
      canonicalUrl: `${baseUrl}/apostille-tracking`,
      robots: isCustomerSpecificTracking
        ? "noindex, nofollow"
        : "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: isCustomerSpecificTracking
        ? []
        : [
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Document Tracking & Verification",
              description:
                "Track your document order and access official Apostille verification resources.",
              url: `${baseUrl}/apostille-tracking`,
              publisher: buildOrganizationSchema(baseUrl),
            },
            buildBreadcrumbSchema(baseUrl, [
              { name: "Home", path: "/" },
              {
                name: "Document Tracking & Verification",
                path: "/apostille-tracking",
              },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is an FGA Tracking ID?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "FGA stands for Fatima Global Attestation. Once we receive your physical documents at our Connaught Place desk via courier, our team generates a unique FGA ID (e.g., FGA-2026-000184). You can use this ID on our 'Track My Documents' portal to see the live status of your file.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How soon will I get my FGA Tracking ID after sending documents?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As soon as our team receives your courier and verifies the contents, we update our system and share your FGA Tracking ID via WhatsApp or Email, usually within 24 working hours of receipt.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between the FGA Tracking ID and the MEA/e-Sanad Document ID?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The FGA Tracking ID is our internal reference number to track your file's progress through Notary, SDM, MEA, and Embassy. The e-Sanad Document ID (or Sticker Number) is generated by the Government of India after the Apostille is completed. We provide both.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I check if my MEA Apostille is genuine?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Once we return your documents, you can check the authenticity of the MEA sticker using the official e-Sanad portal (if generated digitally) or by following the steps shown in our 'Verify Government Apostille' guide on this page.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it safe to send my original documents via courier? What if they get lost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We understand original certificates are irreplaceable. We strongly recommend using a reputable, insured courier service (like Blue Dart or DTDC) with tracking. Once received at our Connaught Place desk, your documents are stored securely. We provide a unique FGA Tracking ID so you know exactly where your document is at every stage.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I submit my documents directly to the MEA myself?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. As per official MEA guidelines, individuals cannot submit documents directly at the MEA counter. The collection and delivery of documents for attestation/apostille have been outsourced to authorized agencies. We act as your authorized coordinator to handle this submission for you.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if my document is rejected by MEA or the Embassy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We do a 'Pre-Submission Scan Check' before you send originals. We check for common rejection reasons like laminated certificates, name mismatches, or unclear seals. If we spot an issue, we inform you immediately, saving you time and courier costs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are there any hidden charges after I send my documents?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. We provide a transparent quote before starting. The MEA government fee is fixed at ₹50 per document. Our service charge covers the coordination, SDM/HRD routing, and logistics. There are no surprise fees.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why is my document stuck at HRD or Embassy for so many days?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Government processing times at State HRD and Embassies vary and are outside our direct control. However, your FGA Tracking ID will show you exactly which stage your document is at. You can also WhatsApp us for a specific update.",
                  },
                },
              ],
            },
          ],
    };
  }

  // 7C. Visa Checklist Pages ("/visa-checklist/*")
  const matchedVisaChecklist =
    cleanPath === "/visa-checklist" || cleanPath === "/visa-checklists"
      ? VISA_CHECKLIST_PAGES[0]
      : cleanPath.startsWith("/visa-checklist/") ||
        cleanPath.startsWith("/visa-checklists/")
      ? getVisaChecklistByPath(cleanPath)
      : undefined;
  if (matchedVisaChecklist) {
    const pageUrl = `${baseUrl}${matchedVisaChecklist.slug}`;
    const legalizationLabel = matchedVisaChecklist.isHagueMember
      ? "MEA Hague Apostille"
      : `${matchedVisaChecklist.countryName} Embassy Attestation & MOFA`;
    return {
      path: matchedVisaChecklist.slug,
      isFound: true,
      isIndexable: true,
      title: matchedVisaChecklist.seoTitle,
      description: matchedVisaChecklist.metaDescription,
      canonicalUrl: pageUrl,
      robots: "index, follow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          name: matchedVisaChecklist.h1,
          description: matchedVisaChecklist.metaDescription,
          url: pageUrl,
          inLanguage: "en-IN",
          publisher: buildOrganizationSchema(baseUrl),
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: `${matchedVisaChecklist.countryName} ${matchedVisaChecklist.visaTypeDisplay} Document ${
            matchedVisaChecklist.isHagueMember ? "Apostille" : "Attestation"
          } & Translation Assistance`,
          serviceType: `${legalizationLabel} and Certified Translation for ${matchedVisaChecklist.countryName} ${matchedVisaChecklist.visaTypeDisplay}`,
          description: matchedVisaChecklist.importantInfoText,
          provider: buildOrganizationSchema(baseUrl),
          areaServed: {
            "@type": "Country",
            name: "India",
          },
          url: pageUrl,
        },
        buildBreadcrumbSchema(baseUrl, [
          { name: "Home", path: "/" },
          {
            name: "Visa Checklist",
            path: "/visa-checklist/italy-student-visa",
          },
          {
            name: `${matchedVisaChecklist.countryName} ${matchedVisaChecklist.visaTypeDisplay} Checklist`,
            path: matchedVisaChecklist.slug,
          },
        ]),
        buildFaqSchema(
          matchedVisaChecklist.faqs,
          pageUrl,
          `${matchedVisaChecklist.countryName} ${matchedVisaChecklist.visaTypeDisplay} Document Checklist FAQs`
        ),
      ],
    };
  }

  // 8. Internal Administration Routes (Non-Indexable)
  if (
    cleanPath === "/blog-manage" ||
    cleanPath === "/knowledge-admin" ||
    cleanPath === "/tracking-admin"
  ) {
    const adminTitle =
      cleanPath === "/knowledge-admin"
        ? "Knowledge Base Administration | FATIMA GLOBAL ATTESTATION"
        : cleanPath === "/tracking-admin"
        ? "Order Tracking & QR Receipt Administration | FATIMA GLOBAL ATTESTATION"
        : "Blog & Knowledge Management | FATIMA GLOBAL ATTESTATION";
    return {
      path: cleanPath,
      isFound: true,
      isIndexable: false,
      title: adminTitle,
      description:
        "Internal administration console for Fatima Global Attestation.",
      canonicalUrl: `${baseUrl}${cleanPath}`,
      robots: "noindex, nofollow",
      ogType: "website",
      ogImage: defaultImage,
      jsonLd: [],
    };
  }

  // 9. Unknown / 404 Not Found Route
  return {
    path: cleanPath,
    isFound: false,
    isIndexable: false,
    title: "Page Not Found (404) | FATIMA GLOBAL ATTESTATION",
    description:
      "The requested page could not be found. Explore document apostille, SDM and MEA attestation, translation, and embassy legalization services in India.",
    canonicalUrl: `${baseUrl}/`,
    robots: "noindex, nofollow",
    ogType: "website",
    ogImage: defaultImage,
    jsonLd: [],
  };
}

/**
 * Updates document head tags (title, meta description, OpenGraph, Twitter,
 * canonical URL, and JSON-LD structured data including FAQPage schema) in the
 * browser on SPA route changes or when a user selects a new country or visa type.
 */
export function applyRouteSEO(pathname: string): RouteSEOMetadata {
  const fullPathWithSearch =
    typeof window !== "undefined" && window.location.search
      ? `${pathname.split("?")[0]}${window.location.search}`
      : pathname;
  const seo = resolveRouteSEO(fullPathWithSearch);
  if (typeof document === "undefined") return seo;

  document.title = seo.title;

  const setMeta = (
    selector: string,
    attr: "name" | "property",
    key: string,
    content: string
  ) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta('meta[name="description"]', "name", "description", seo.description);
  setMeta('meta[name="robots"]', "name", "robots", seo.robots);

  setMeta('meta[property="og:type"]', "property", "og:type", seo.ogType);
  setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
  setMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    seo.description
  );
  setMeta('meta[property="og:url"]', "property", "og:url", seo.canonicalUrl);
  setMeta('meta[property="og:image"]', "property", "og:image", seo.ogImage);

  setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
  setMeta(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    seo.description
  );
  setMeta('meta[name="twitter:image"]', "name", "twitter:image", seo.ogImage);

  let canonicalEl = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", seo.canonicalUrl);

  // Sync route-level JSON-LD script (WebPage, BreadcrumbList, Service & FAQPage)
  const existingRouteSchema = document.getElementById(
    "fga-route-structured-data"
  );
  if (existingRouteSchema) {
    existingRouteSchema.remove();
  }
  if (seo.jsonLd.length > 0) {
    const script = document.createElement("script");
    script.id = "fga-route-structured-data";
    script.type = "application/ld+json";
    script.text = JSON.stringify(seo.jsonLd);
    document.head.appendChild(script);
  }

  return seo;
}
