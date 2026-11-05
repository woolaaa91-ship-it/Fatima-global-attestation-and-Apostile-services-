import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  defaultOpenIndex?: number | null;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] font-display">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-2.5">
        {items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const answerId = `faq-answer-${idx}`;
          const questionId = `faq-question-${idx}`;
          return (
            <div
              key={idx}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-teal-500/60 bg-white shadow-xs ring-1 ring-teal-500/20"
                  : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <button
                id={questionId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#0A192F] cursor-pointer transition-colors group"
              >
                <span itemProp="name" className={`leading-snug break-words min-w-0 pr-2 ${isOpen ? "text-teal-950" : "group-hover:text-teal-900"}`}>
                  {faq.question}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={
                  isOpen
                    ? "px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 bg-slate-50/40 border-t border-slate-100 leading-relaxed"
                    : "hidden"
                }
              >
                <div itemProp="text" className="whitespace-pre-line leading-relaxed pt-2.5">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
