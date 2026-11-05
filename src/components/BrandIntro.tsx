import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BrandLogo } from "./BrandLogo";

interface BrandIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = "fg_intro_seen_v1";

export const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // If forceShow is true, always display
    if (forceShow) return true;
    try {
      // Check if user already saw the intro in this browser session
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (alreadySeen) return false;

      // Check reduced motion preference
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        sessionStorage.setItem(STORAGE_KEY, "true");
        return false;
      }
    } catch {
      // If sessionStorage is unavailable (e.g. private mode restriction), fallback safely
      return false;
    }
    return true;
  });

  // Animation step progression:
  // 0: Initial mount / background fade
  // 1: Stylized 'F' mark appears
  // 2: Brand name 'FATIMA GLOBAL' letter reveal
  // 3: Service line 'ATTESTATION & APOSTILLE SERVICES' reveals
  // 4: Tagline 'YOUR DOCUMENTS, READY FOR THE WORLD' reveals
  // 5: Complete state / hold
  // 6: Exit transition (fade out)
  const [step, setStep] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const brandLetters = useMemo(() => "FATIMA GLOBAL".split(""), []);

  const handleFinish = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage error
    }

    // Allow the smooth fade-out transition to complete before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 550);
  }, [isExiting, onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    // Listen for Escape key to quickly skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Timed choreographed sequence targeting ~2.8s total
    const timer1 = setTimeout(() => setStep(1), 200);   // Mark scale-in (0.2s)
    const timer2 = setTimeout(() => setStep(2), 700);   // "FATIMA GLOBAL" letter reveal (0.7s)
    const timer3 = setTimeout(() => setStep(3), 1350);  // "ATTESTATION & APOSTILLE SERVICES" (1.35s)
    const timer4 = setTimeout(() => setStep(4), 1850);  // Tagline reveals (1.85s)
    const timer5 = setTimeout(() => setStep(5), 2350);  // Hold full brandlock (2.35s)
    const timerExit = setTimeout(() => handleFinish(), 2900); // Begin smooth fade out (2.9s)

    // Hard fallback safety timeout (in case any timer or browser throttling stalls)
    const fallbackSafety = setTimeout(() => {
      handleFinish();
    }, 4200);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timerExit);
      clearTimeout(fallbackSafety);
    };
  }, [isVisible, handleFinish]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Fatima Global Attestation & Apostille Services"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white select-none transition-all duration-600 ease-out ${
        isExiting ? "opacity-0 scale-[1.015] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft centered radial aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-tr from-sky-50 via-teal-50/40 to-amber-50/30 rounded-full blur-3xl opacity-80" />
        
        {/* Subtle decorative fine hairline borders */}
        <div className="absolute inset-4 sm:inset-8 border border-slate-200/50 rounded-2xl sm:rounded-3xl pointer-events-none" />
      </div>

      {/* Skip Intro Button - Accessible, visible, tap-friendly */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          type="button"
          onClick={handleFinish}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium tracking-wide text-slate-500 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-full shadow-xs backdrop-blur-xs transition-all duration-200 cursor-pointer active:scale-95"
          aria-label="Skip brand intro"
        >
          <span>Skip intro</span>
          <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform duration-200">
            →
          </span>
        </button>
      </div>

      {/* Main Brand Core Container */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Step 2: The Stylized 'F' Brand Mark */}
        <div
          className={`relative mb-6 sm:mb-8 transition-all duration-700 ease-out transform ${
            step >= 1 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-3"
          }`}
        >
          {/* Subtle gold/teal halo ring behind emblem */}
          <div
            className={`absolute -inset-2.5 rounded-full bg-gradient-to-tr from-teal-500/15 via-transparent to-amber-400/20 blur-md transition-opacity duration-1000 ${
              step >= 1 ? "opacity-100" : "opacity-0"
            }`}
          />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-1.5 rounded-2xl bg-white shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center justify-center">
            <BrandLogo variant="mark" className="w-full h-full" />
          </div>
        </div>

        {/* Step 3: Brand Name: "FATIMA GLOBAL" letter-by-letter reveal */}
        <div className="overflow-hidden py-1 mb-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-[0.18em] sm:tracking-[0.24em] font-serif uppercase flex items-center justify-center">
            {brandLetters.map((char, idx) => {
              const isSpace = char === " ";
              if (isSpace) {
                return <span key={idx} className="inline-block w-2 sm:w-4">&nbsp;</span>;
              }
              const delayMs = step >= 2 ? idx * 30 : 0;
              return (
                <span
                  key={idx}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                  }}
                  className={`inline-block transition-all duration-500 ease-out transform ${
                    step >= 2
                      ? "opacity-100 translate-y-0 filter blur-0"
                      : "opacity-0 translate-y-4 filter blur-[2px]"
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Step 4: Service Line: "ATTESTATION & APOSTILLE SERVICES" */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
            <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#C89D4B]" />
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-[#008DA8] uppercase font-sans">
              ATTESTATION &amp; APOSTILLE SERVICES
            </p>
            <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#C89D4B]" />
          </div>
        </div>

        {/* Step 5: Tagline: "YOUR DOCUMENTS, READY FOR THE WORLD" */}
        <div
          className={`mt-4 sm:mt-5 transition-all duration-700 ease-out transform ${
            step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200/70 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89D4B] animate-pulse" />
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-slate-700 uppercase font-sans">
              YOUR DOCUMENTS, READY FOR THE WORLD
            </p>
          </div>
        </div>

        {/* Subtle sleek progress line at bottom of the card */}
        <div className="w-36 sm:w-48 h-0.5 bg-slate-100 rounded-full mt-7 sm:mt-8 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-[#008DA8] via-[#C89D4B] to-[#0B2545] rounded-full transition-all duration-[2600ms] ease-linear ${
              step >= 1 ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>

      {/* Accessible subtle note at bottom for screen reader & keyboard accessibility */}
      <div className="absolute bottom-4 text-center text-[11px] text-slate-400 tracking-wider">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200">Esc</kbd> to skip</span>
      </div>
    </div>
  );
};
