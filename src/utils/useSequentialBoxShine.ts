import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Scroll-triggered sequential one-by-one inner box shine hook.
 * When the user scrolls to `containerRef`, `activeStep` progresses 1 -> 2 -> ... -> totalSteps
 * one by one ("ek ek kar ke shine kare") and repeats gently until the user interacts.
 * When the user changes a dropdown, calling `guideToStep(nextStep)` immediately highlights the next box.
 */
export function useSequentialBoxShine(totalSteps: number = 4) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || userInteracted) {
      return;
    }

    const stepDurationMs = 1300;
    const pauseDurationMs = 1600;
    const totalCycleMs = totalSteps * stepDurationMs + pauseDurationMs;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const runSequence = () => {
      for (let step = 1; step <= totalSteps; step++) {
        timers.push(
          setTimeout(() => {
            setActiveStep(step);
          }, (step - 1) * stepDurationMs)
        );
      }

      timers.push(
        setTimeout(() => {
          setActiveStep(0);
        }, totalSteps * stepDurationMs)
      );
    };

    timers.push(setTimeout(runSequence, 180));
    intervalId = setInterval(runSequence, totalCycleMs);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, userInteracted, totalSteps]);

  const guideToStep = useCallback((nextStep: number, durationMs: number = 1550) => {
    setUserInteracted(true);
    setActiveStep(nextStep);
    if (nextStep > 0 && durationMs > 0) {
      setTimeout(() => {
        setActiveStep((prev) => (prev === nextStep ? 0 : prev));
      }, durationMs);
    }
  }, []);

  const markInteracted = useCallback(() => {
    setUserInteracted(true);
  }, []);

  return {
    containerRef,
    activeStep,
    guideToStep,
    markInteracted,
  };
}
