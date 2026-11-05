import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "full" | "compact" | "mark";
  inverted?: boolean;
}

/**
 * Official Brand Logo for FATIMA GLOBAL ATTESTATION
 * Uses the exact vector-crisp brand assets provided:
 * - Standalone serif "F" with gold (#C89D4B) and teal (#008DA8) dynamic waves
 * - Horizontal lockup with vertical gold line divider, bold navy "FATIMA" and teal "GLOBAL ATTESTATION"
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "h-9 sm:h-10 md:h-11",
  variant = "compact",
  inverted = false,
}) => {
  // Standalone Mark Emblem (Serif F + Gold & Teal Swooshes)
  if (variant === "mark") {
    return (
      <img
        src="/assets/aistudio/emblem_transparent.png"
        alt="Fatima Global Attestation Emblem"
        className={`object-contain select-none ${inverted ? "brightness-0 invert" : ""} ${className}`}
        loading="eager"
      />
    );
  }

  // Full Corporate Lockup with Subtitle Bar
  if (variant === "full") {
    return (
      <div className={`inline-flex flex-col select-none max-w-full ${className}`}>
        <img
          src={inverted ? "/assets/aistudio/logo_inverted.png" : "/assets/aistudio/logo_transparent.png"}
          alt="Fatima Global Attestation & Apostille Services"
          className="h-9 sm:h-10 md:h-11 w-auto max-w-[220px] sm:max-w-[310px] object-contain"
          loading="eager"
        />
        <div className={`mt-2 pt-1 border-t ${inverted ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-600"} flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase`}>
          <span>APOSTILLE</span>
          <span className="text-[#C89D4B]" aria-hidden="true">•</span>
          <span>ATTESTATION</span>
          <span className="text-[#C89D4B]" aria-hidden="true">•</span>
          <span>EMBASSY LEGALIZATION</span>
          <span className="text-[#C89D4B]" aria-hidden="true">•</span>
          <span>TRANSLATION</span>
        </div>
      </div>
    );
  }

  // Compact Header / Navbar Lockup (Default)
  return (
    <img
      src={inverted ? "/assets/aistudio/logo_inverted.png" : "/assets/aistudio/logo_transparent.png"}
      alt="Fatima Global Attestation"
      className={`h-7 sm:h-10 md:h-11 w-auto max-w-[168px] sm:max-w-[290px] md:max-w-[320px] object-contain select-none ${className}`}
      loading="eager"
    />
  );
};
