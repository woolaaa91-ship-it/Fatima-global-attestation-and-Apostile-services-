import React from "react";
import { ShieldAlert } from "lucide-react";

interface DisclaimerBoxProps {
  text?: string;
  className?: string;
  compact?: boolean;
}

export const DisclaimerBox: React.FC<DisclaimerBoxProps> = ({
  text = "Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. Government fees and timelines apply. Our charges are separate for the coordination and logistics support provided.",
  className = "",
  compact = false,
}) => {
  return (
    <div
      role="note"
      aria-label="Private Agency Disclaimer"
      className={`rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#7F1D1D] ${
        compact ? "px-3.5 py-2.5 text-xs" : "p-4 sm:p-5 text-xs sm:text-sm"
      } ${className}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626] shrink-0 mt-0.5" />
        <p className="font-semibold text-[#991B1B] leading-relaxed min-w-0">
          {text}
        </p>
      </div>
    </div>
  );
};
