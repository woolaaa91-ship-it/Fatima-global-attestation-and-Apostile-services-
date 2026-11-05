import React, { useState } from "react";
import { GENERAL_FAQS, FAQItem } from "../data/faqs";
import { getWhatsAppUrl } from "../config/business";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface FaqSectionProps {
  initialCategory?: string;
  isStandalonePage?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isStandalonePage = false }) => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Apostille & SDM", "General", "Commercial", "Embassy & Translation", "Process & Quotes"];

  const filteredFaqs = GENERAL_FAQS.filter((faq) => {
    return selectedCategory === "All" || faq.category === selectedCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className={`py-6 sm:py-12 overflow-x-hidden scroll-mt-20 ${isStandalonePage ? "bg-white" : "bg-white border-b border-slate-200"}`}>
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-8">
          <div className="text-xs font-semibold tracking-wider text-teal-800 uppercase">
            Clear Answers
          </div>
          {isStandalonePage ? (
            <h1 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display tracking-tight">
              Frequently Asked Questions
            </h1>
          ) : (
            <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-display tracking-tight">
              Frequently Asked Questions
            </h2>
          )}
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Essential information regarding document authentication, Hague Apostille rules, SDM procedures, and embassy legalization in India.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-4 sm:mb-6">
          {/* Category Tabs (Segmented control button tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer select-none ${
                  selectedCategory === cat
                    ? "bg-white text-slate-950 font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq: FAQItem) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-teal-500/60 bg-white shadow-sm ring-1 ring-teal-500/20"
                      : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 min-w-0 pr-2">
                      {selectedCategory === "All" && (
                        <span className="inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-teal-50 text-teal-800 border border-teal-200/70 shrink-0">
                          {faq.category}
                        </span>
                      )}
                      <span className={`text-xs sm:text-sm font-bold font-display leading-snug break-words ${
                        isOpen ? "text-teal-950" : "text-slate-900 group-hover:text-teal-900"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
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

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/40 pt-3 animate-in fade-in-50 duration-150">
                      <p className="whitespace-pre-line leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
              No questions found in this category. You can ask our team directly on WhatsApp.
            </div>
          )}
        </div>

        {/* Unanswered Query WhatsApp Prompt */}
        <div className="mt-5 sm:mt-8 p-4 sm:p-6 rounded-xl bg-teal-50/80 border border-teal-200/90 text-center space-y-2.5">
          <h3 className="text-sm font-bold text-teal-950 font-display">
            Have a Specific Question About Your Document?
          </h3>
          <p className="text-xs text-teal-800/90 max-w-md mx-auto leading-relaxed">
            Every document case has unique jurisdictional variables. Contact us on WhatsApp for tailored guidance.
          </p>
          <a
            href={getWhatsAppUrl("Hello Fatima Global Attestation, I have a specific question regarding my document attestation process. Please assist.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-xs transition-colors select-none"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
