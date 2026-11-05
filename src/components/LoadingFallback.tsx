import React from "react";

interface LoadingFallbackProps {
  type?: "section" | "page" | "card";
  title?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  type = "section",
  title,
}) => {
  if (type === "page") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-9 h-9 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500 animate-pulse">
          {title || "Loading Fatima Global Attestation..."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto" aria-hidden="true">
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-200/80 rounded w-1/4 mx-auto" />
        <div className="h-8 bg-slate-200/80 rounded w-1/2 mx-auto" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <div className="h-44 bg-slate-100 rounded-xl border border-slate-200/60" />
          <div className="h-44 bg-slate-100 rounded-xl border border-slate-200/60" />
          <div className="h-44 bg-slate-100 rounded-xl border border-slate-200/60" />
          <div className="h-44 bg-slate-100 rounded-xl border border-slate-200/60" />
        </div>
      </div>
    </div>
  );
};
