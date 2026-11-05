import React, { useState } from "react";
import { BlogPost } from "../data/blog";
import { ArticleCategoryThumbnail } from "./BlogList";
import { QuoteForm } from "./QuoteForm";
import { getWhatsAppUrl } from "../config/business";
import { scrollToSectionById } from "../utils/modalHistory";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  Calendar,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  ChevronDown,
  Share2,
  BookOpen,
} from "lucide-react";

interface BlogPostViewProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.metaDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="bg-slate-50 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap min-w-0" aria-label="Breadcrumb">
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
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/blog");
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Knowledge Centre
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header Banner */}
      <header className="bg-white border-b border-slate-200 py-8 sm:py-14">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5">
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 rounded-full border border-teal-200">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & Timestamp Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                F
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">{post.author.name}</span>
                <span className="text-[11px] text-slate-500">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Updated: {post.updatedDate}</span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs"
                title="Share article"
              >
                <Share2 className="w-3 h-3" />
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Main 8-Column Article Column */}
          <main className="lg:col-span-8 min-w-0 space-y-8 sm:space-y-10">
            
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                <ArticleCategoryThumbnail
                  post={post}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-3 bg-slate-50 text-[11px] text-slate-500 text-center border-t border-slate-100">
                Illustrated Guide: Official document verification procedures compliant with MEA and consular mandates.
              </div>
            </div>

            {/* Table of Contents & Prose Content */}
            {(() => {
              const rawHeadings = Array.from(post.content.matchAll(/\n## (.*?)\n/g)).map((m) =>
                m[1].trim()
              );
              const resolvedToc = rawHeadings.map((headingText, idx) => {
                const stripNum = (s: string) => s.replace(/^\d+\.\s*/, "").trim().toLowerCase();
                const matched =
                  post.tableOfContents?.find(
                    (t) =>
                      t.title.trim().toLowerCase() === headingText.toLowerCase() ||
                      stripNum(t.title) === stripNum(headingText)
                  ) || post.tableOfContents?.[idx];
                return {
                  id: matched ? matched.id : `section-${idx + 1}`,
                  title: headingText,
                };
              });

              let h2Index = 0;
              const renderedHtml = post.content
                .replace(/\n## (.*?)\n/g, (_match, rawHeading: string) => {
                  const section = resolvedToc[h2Index];
                  h2Index += 1;
                  const headingId = section ? section.id : rawHeading.trim();
                  return `<h2 id="${headingId}" class="scroll-mt-24 text-xl sm:text-2xl font-bold text-slate-950 font-display mt-8 mb-3 pt-4 border-t border-slate-100">${rawHeading}</h2>`;
                })
                .replace(
                  /\n### (.*?)\n/g,
                  '<h3 class="text-base sm:text-lg font-bold text-slate-900 font-display mt-5 mb-2">$1</h3>'
                )
                .replace(
                  /\n- (.*?)\n/g,
                  '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>'
                )
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-slate-900 font-semibold">$1</strong>'
                )
                .replace(/\n\n/g, '<p class="my-3 text-slate-600 leading-relaxed"></p>');

              return (
                <>
                  {resolvedToc.length > 0 && (
                    <div className="p-5 sm:p-6 bg-slate-100/90 border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-teal-700" />
                        <span>Table of Contents</span>
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {resolvedToc.map((toc) => (
                          <li key={toc.id}>
                            <a
                              href={`#${toc.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSectionById(toc.id, "smooth");
                              }}
                              className="hover:text-teal-700 hover:underline transition-colors block py-0.5"
                            >
                              {toc.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-10 text-slate-800 leading-relaxed space-y-6 text-sm sm:text-base prose max-w-none overflow-x-auto break-words">
                    <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                  </div>
                </>
              );
            })()}

            {/* Authoritative Government Citations */}
            {post.officialSources && post.officialSources.length > 0 && (
              <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2.5">
                <span className="text-xs font-bold text-teal-950 uppercase tracking-wider block">
                  Authoritative Government & Legal Sources:
                </span>
                <ul className="space-y-1 text-xs text-teal-900">
                  {post.officialSources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:underline font-medium text-teal-800"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{source.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Specific FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-950 font-display">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="rounded-lg border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left px-4 py-3 bg-slate-50 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="p-4 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Internal Service Navigation Link */}
            {post.relatedServiceSlug && (
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
                    Direct Service Assistance
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    Need professional handling for this exact document route?
                  </h4>
                </div>
                <a
                  href={post.relatedServiceSlug}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(post.relatedServiceSlug);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </main>

          {/* Sticky 4-Column Sidebar: Fast WhatsApp Consultation & Quote Form */}
          <aside className="lg:col-span-4 min-w-0 space-y-6">
            
            {/* Quick WhatsApp Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Direct Specialist Help
              </span>
              <h3 className="text-base font-bold text-white font-display">
                Have questions about your specific certificate?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our verification desk to check your document category, destination mandates, and fee breakdown.
              </p>
              <a
                href={getWhatsAppUrl(`Hello Fatima Global Attestation, I read your guide "${post.title}" and would like assistance with my documents.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Contextual Quote Request Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Request a Formal Quotation
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Provide your document type and receiving country for a transparent, itemized quote.
              </p>
              <QuoteForm
                className="!p-0 !border-0 !shadow-none"
                title="Get Estimated Quotation"
                subtitle="Submit details for quick assessment."
              />
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-[11px] leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Guides are provided for informational transparency based on current MEA and consular protocols. Final processing is subject to sovereign issuing departments.
              </span>
            </div>

          </aside>

        </div>
      </div>
    </article>
  );
};
