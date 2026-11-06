import React from "react";
import {
  generateStaticParams as getStaticVisaChecklistParams,
  getVisaChecklistBySlug,
  VISA_CHECKLIST_PAGES,
  type VisaChecklistData,
} from "../../../data/visaChecklists";
import { VisaChecklistPage } from "../../../components/VisaChecklistPage";
import { resolveRouteSEO } from "../../../utils/seo";

/**
 * Statically generates all 128 country + visa type slugs from the structured
 * VISA_CHECKLIST_PAGES array (e.g., [{ slug: "italy-student-visa" }, { slug: "germany-work-visa" }, ...]).
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return getStaticVisaChecklistParams();
}

/**
 * Generates static SEO metadata (Title, Meta Description, Canonical URL, OpenGraph, and JSON-LD)
 * for each dedicated `/visa-checklist/[slug]` route.
 */
export function generateMetadata({ params }: { params: { slug: string } }) {
  const checklist = getVisaChecklistBySlug(params.slug);
  const targetPath = checklist
    ? checklist.slug
    : `/visa-checklist/${params.slug}`;
  const seo = resolveRouteSEO(targetPath);

  return {
    title: checklist ? checklist.seoTitle : seo.title,
    description: checklist ? checklist.metaDescription : seo.description,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: checklist ? checklist.seoTitle : seo.title,
      description: checklist ? checklist.metaDescription : seo.description,
      url: seo.canonicalUrl,
      type: "website",
      images: [{ url: seo.ogImage }],
    },
    robots: seo.robots,
  };
}

export interface VisaChecklistDynamicRouteProps {
  params: {
    slug: string;
  };
  onNavigate?: (path: string) => void;
}

/**
 * Dedicated static SEO page component for `/visa-checklist/[slug]`.
 * Each country + visa type has its own permanent URL (no auto-rotation).
 */
export default function VisaChecklistSlugPage({
  params,
  onNavigate,
}: VisaChecklistDynamicRouteProps) {
  const checklist: VisaChecklistData =
    getVisaChecklistBySlug(params.slug) || VISA_CHECKLIST_PAGES[0];

  const handleNavigate = (nextPath: string) => {
    if (onNavigate) {
      onNavigate(nextPath);
      return;
    }
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", nextPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <VisaChecklistPage checklist={checklist} onNavigate={handleNavigate} />
  );
}
