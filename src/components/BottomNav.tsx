import React from "react";
import { Phone, FileText } from "lucide-react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface BottomNavProps {
  onEnquireClick: () => void;
  whatsappMessage?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onEnquireClick,
  whatsappMessage,
}) => {
  return (
    <nav
      aria-label="Quick Contact Navigation"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-xs border-t border-slate-200 shadow-[0_-4px_12px_rgba(10,25,47,0.08)] px-2.5 py-1.5"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* 1. Call Button */}
        <a
          href={`tel:${BUSINESS_CONFIG.telPhone}`}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#0A192F] hover:bg-slate-900 active:scale-[0.99] text-white text-xs font-bold transition-colors whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-teal-300 shrink-0" />
          <span>Call</span>
        </a>

        {/* 2. Enquire Button */}
        <button
          type="button"
          onClick={onEnquireClick}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#0F766E] hover:bg-teal-800 active:scale-[0.99] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5 text-teal-100 shrink-0" />
          <span>Enquire</span>
        </button>

        {/* 3. WhatsApp Button */}
        <a
          href={getWhatsAppUrl(
            whatsappMessage ||
              "Hello Fatima Global Attestation, I need assistance with document attestation / apostille."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] text-white text-xs font-bold transition-colors whitespace-nowrap"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
