import React from "react";
import { MessageSquareShare, FileSearch, ShieldCheck, Truck, ArrowRight } from "lucide-react";

interface HowItWorksProps {
  onRequestQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRequestQuote }) => {
  const steps = [
    {
      step: 1,
      title: "Share Your Requirements",
      description:
        "Tell us your document type, destination country and required service through our online form or WhatsApp.",
      icon: <MessageSquareShare className="w-5 h-5 text-teal-700" />,
      detail: "No original documents needed at this stage; a clear scan or photograph is sufficient for initial assessment.",
    },
    {
      step: 2,
      title: "Document Review",
      description:
        "We review the information provided and explain the applicable requirements, preliminary verification steps, and fees.",
      icon: <FileSearch className="w-5 h-5 text-teal-700" />,
      detail: "We check whether the Hague Apostille route or full Embassy Legalization is required for your target country.",
    },
    {
      step: 3,
      title: "Processing Assistance",
      description:
        "We assist with the relevant authentication, attestation, apostille, translation or legalization process through verified channels.",
      icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
      detail: "Physical document submissions are coordinated with designated magistrates, Chambers, MEA, or embassies.",
    },
    {
      step: 4,
      title: "Secure Dispatch or Collection",
      description:
        "Once authentication is completed, your verified documents are safely dispatched via tracked courier or arranged for office collection.",
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />,
      detail: "Tracked domestic & international courier options or scheduled in-office collection.",
    },
  ];

  return (
    <section id="how-it-works" className="py-6 sm:py-12 bg-white border-b border-slate-200 overflow-x-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5 mb-4 sm:mb-8">
          <div className="text-[11px] font-bold tracking-wider text-[#008DA8] uppercase">
            Simple 4-Step Process
          </div>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight">
            How Document Attestation Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-snug sm:leading-relaxed">
            A clear, transparent procedure from initial scan verification to final MEA Apostille or Embassy Legalization.
          </p>
        </div>

        {/* 4 Steps Grid: Compact 2x2 on mobile, 4 across on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-slate-50 rounded-xl border border-slate-200 p-3 sm:p-5 flex flex-col justify-between min-w-0"
            >
              <div className="space-y-2 sm:space-y-3 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 shrink-0">
                    Step {item.step}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B2545] font-display leading-snug break-words">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug sm:leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block mt-3.5 pt-2.5 border-t border-slate-200/80 text-[11px] text-slate-500 leading-normal">
                {item.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-5 sm:mt-7 text-center">
          <button
            type="button"
            onClick={onRequestQuote}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-slate-900 rounded-xl shadow-2xs transition-colors cursor-pointer select-none"
          >
            <span>Start Step 1: Request Your Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
};
