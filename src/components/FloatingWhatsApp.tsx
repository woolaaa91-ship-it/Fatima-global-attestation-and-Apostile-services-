import React, { useState, useEffect } from "react";
import { getWhatsAppUrl } from "../config/business";
import { isAnyImagePopupOpen, scrollToPageTop } from "../utils/modalHistory";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FloatingWhatsApp: React.FC = () => {
  const [showFloating, setShowFloating] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScrollAndState = () => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        setShowFloating(true);
        setShowBackToTop(scrollY > 300);
        setIsPopupOpen(isAnyImagePopupOpen());
      }
    };

    handleScrollAndState();
    window.addEventListener("scroll", handleScrollAndState, { passive: true });
    window.addEventListener("resize", handleScrollAndState);
    window.addEventListener("fga-modal-change", handleScrollAndState);
    return () => {
      window.removeEventListener("scroll", handleScrollAndState);
      window.removeEventListener("resize", handleScrollAndState);
      window.removeEventListener("fga-modal-change", handleScrollAndState);
    };
  }, []);

  if (isPopupOpen || (!showFloating && !showBackToTop)) return null;

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center sm:items-end gap-2.5">
      {showBackToTop && (
        <button
          type="button"
          onClick={() => scrollToPageTop("smooth")}
          className="flex items-center justify-center w-10 h-10 bg-[#0A192F]/95 hover:bg-[#0A192F] active:scale-95 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-white/20 cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-teal-300" />
        </button>
      )}

      {showFloating && (
        <a
          href={getWhatsAppUrl(
            "Hello Fatima Global Attestation, I would like to get quick guidance on document attestation."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="fga-whatsapp-float flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group border-2 border-white/80"
          aria-label="Chat on WhatsApp with Fatima Global Attestation"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
          <span className="hidden sm:inline ml-2 text-xs font-bold tracking-wide whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>
      )}
    </div>
  );
};
