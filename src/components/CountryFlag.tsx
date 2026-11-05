import React, { useState } from "react";
import { getCountryFlagUrl } from "../data/countryDirectory";

interface CountryFlagProps {
  isoCode: string;
  countryName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  isoCode,
  countryName,
  size = "md",
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);
  const code = (isoCode || "IN").toUpperCase();

  const sizeClasses = {
    sm: "w-7 h-5 rounded-xs text-[10px]",
    md: "w-9 h-6 sm:w-10 sm:h-7 rounded-sm text-xs",
    lg: "w-12 h-8 sm:w-14 sm:h-9.5 rounded-md text-sm",
  }[size];

  if (hasError || !isoCode) {
    return (
      <span
        className={`inline-flex items-center justify-center bg-[#0A192F] text-white font-bold border border-slate-300 shrink-0 select-none ${sizeClasses} ${className}`}
        title={`${countryName} (${code})`}
      >
        {code}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden bg-slate-100 border border-slate-200/90 shadow-2xs shrink-0 ${sizeClasses} ${className}`}
      title={`${countryName} flag`}
    >
      <img
        src={getCountryFlagUrl(code, 80)}
        srcSet={`${getCountryFlagUrl(code, 80)} 1x, ${getCountryFlagUrl(code, 160)} 2x`}
        alt={`${countryName} flag`}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </span>
  );
};
