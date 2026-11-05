import React from "react";
import { CheckCircle2, Info } from "lucide-react";
import type { DedicatedSeoPageData } from "../data/dedicatedPages";
import {
  PageLayout,
  ContentCard,
  OfficialLinksCard,
} from "./PageLayout";
import { FAQAccordion } from "./FAQAccordion";

interface DedicatedSeoPageProps {
  page: DedicatedSeoPageData;
  onNavigate: (path: string) => void;
}

export const DedicatedSeoPage: React.FC<DedicatedSeoPageProps> = ({
  page,
  onNavigate,
}) => {
  return (
    <PageLayout
      breadcrumbs={page.breadcrumbs}
      kicker={page.kicker}
      title={page.h1}
      intro={page.intro}
      whatsappMessage={page.whatsappMessage}
      targetKeywords={page.targetKeywords}
      quoteServiceSlug={page.slug}
      quoteTitle={`Enquire About ${page.h1}`}
      relatedLinks={page.relatedLinks}
      onNavigate={onNavigate}
    >
      {/* Render Official Government / Authority Portals if present */}
      {page.officialLinks && page.officialLinks.length > 0 && (
        <OfficialLinksCard links={page.officialLinks} />
      )}

      {/* Render Structured Content Sections */}
      {page.sections.map((sec, idx) => (
        <ContentCard key={idx} title={sec.title} subtitle={sec.subtitle}>
          {sec.paragraphs &&
            sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}

          {sec.steps && sec.steps.length > 0 && (
            <div className="space-y-3 pt-1">
              {sec.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F3F4F6]/80 border border-slate-200/90"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0A192F] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                    {st.stepNumber}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#0A192F] font-display">
                      {st.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sec.comparisonTable && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0A192F] text-white">
                    {sec.comparisonTable.headers.map((th, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-3 px-3.5 font-bold border-b border-slate-800"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {sec.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3.5 font-bold text-[#0A192F] align-top">
                        {row[0]}
                      </td>
                      <td className="py-3 px-3.5 text-slate-700 align-top">
                        {row[1]}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600 align-top">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {sec.bullets && sec.bullets.length > 0 && (
            <ul className="space-y-2.5 pt-1">
              {sec.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {sec.highlightNote && (
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-[#0A192F] space-y-1 mt-2">
              <div className="flex items-center gap-2 font-bold text-[#0F766E]">
                <Info className="w-4 h-4 shrink-0" />
                <span>{sec.highlightNote.title}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {sec.highlightNote.body}
              </p>
            </div>
          )}
        </ContentCard>
      ))}

      {/* Render Page FAQs */}
      <FAQAccordion
        title={`Frequently Asked Questions — ${page.h1}`}
        items={page.faqs}
      />
    </PageLayout>
  );
};
