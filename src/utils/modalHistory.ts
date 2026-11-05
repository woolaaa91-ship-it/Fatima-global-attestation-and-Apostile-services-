import { useEffect, useRef } from "react";

let activePopupCount = 0;
let ignoreAppPopStateUntil = 0;
let savedOriginalOverflow: string | null = null;
let savedOriginalPaddingRight: string | null = null;

export function isAnyImagePopupOpen(): boolean {
  return activePopupCount > 0;
}

export function shouldIgnoreAppPopState(): boolean {
  return activePopupCount > 0 || Date.now() < ignoreAppPopStateUntil;
}

function notifyPopupStateChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("fga-modal-change"));
  }
}

function lockBodyScroll(): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  if (activePopupCount === 0) {
    savedOriginalOverflow = document.body.style.overflow;
    savedOriginalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const computedPaddingRight =
        parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }

  activePopupCount += 1;
  notifyPopupStateChange();
}

function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;

  if (activePopupCount > 0) {
    activePopupCount -= 1;
  }

  if (activePopupCount === 0) {
    if (savedOriginalOverflow !== null) {
      document.body.style.overflow = savedOriginalOverflow;
      savedOriginalOverflow = null;
    }
    if (savedOriginalPaddingRight !== null) {
      document.body.style.paddingRight = savedOriginalPaddingRight;
      savedOriginalPaddingRight = null;
    }
  }

  notifyPopupStateChange();
}

/**
 * Returns the persistent sticky navbar bar height (excluding any open mobile drawer)
 * so section scrolling always lands cleanly below the sticky header.
 */
export function getStickyHeaderHeight(): number {
  if (typeof document === "undefined") return 64;
  const headerEl = document.querySelector("header");
  if (!headerEl) return 64;
  const topBar = headerEl.firstElementChild as HTMLElement | null;
  const rawHeight = topBar
    ? topBar.getBoundingClientRect().height
    : headerEl.getBoundingClientRect().height;
  if (!rawHeight || Number.isNaN(rawHeight)) return 64;
  return Math.min(Math.max(rawHeight, 48), 96);
}

/**
 * Safely scrolls the window and document root back to the top of the page.
 * Defaults to "instant" so SPA page navigation always opens at the very top (y = 0).
 */
export function scrollToPageTop(behavior: ScrollBehavior = "instant"): void {
  if (typeof window === "undefined") return;

  if (activePopupCount === 0 && savedOriginalOverflow !== null) {
    document.body.style.overflow = savedOriginalOverflow;
    savedOriginalOverflow = null;
    if (savedOriginalPaddingRight !== null) {
      document.body.style.paddingRight = savedOriginalPaddingRight;
      savedOriginalPaddingRight = null;
    }
  }

  if (behavior === "instant" || behavior === "auto") {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
    if (typeof document !== "undefined") {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    return;
  }

  try {
    window.scrollTo({ top: 0, left: 0, behavior });
  } catch {
    window.scrollTo(0, 0);
  }
}

/**
 * Global popstate listener to restore exact previous scroll position
 * when user presses browser Back button after clicking hash anchors (e.g. #document-safety-protocol).
 */
if (typeof window !== "undefined") {
  window.addEventListener("popstate", (event) => {
    if (shouldIgnoreAppPopState()) return;

    if (event.state && typeof event.state.__fgaScrollY === "number") {
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targetY = event.state.__fgaScrollY;

      try {
        window.scrollTo({
          top: targetY,
          left: 0,
          behavior: prefersReduced ? ("instant" as ScrollBehavior) : "smooth",
        });
      } catch {
        window.scrollTo(0, targetY);
      }
    }
  });
}

/**
 * Scrolls to a specific target section ID with automatic sticky-header offset compensation,
 * hash history preservation, browser Back button scroll position restoration,
 * and prefers-reduced-motion accessibility compliance.
 */
export function scrollToSectionById(
  rawSectionId: string,
  behavior: ScrollBehavior = "smooth",
  options?: { pushHash?: boolean; recordScrollHistory?: boolean }
): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const cleanId = rawSectionId.replace(/^\/?#/, "").trim();
  if (!cleanId) return false;

  const elem =
    document.getElementById(cleanId) ||
    (cleanId === "document-safety-trust" || cleanId === "document-safety-protocol"
      ? document.getElementById("document-safety-protocol") ||
        document.getElementById("document-safety-trust")
      : null);
  if (!elem) return false;

  const headerOffset = getStickyHeaderHeight() + 8;
  const rect = elem.getBoundingClientRect();
  const currentScrollY =
    window.scrollY ??
    window.pageYOffset ??
    document.documentElement.scrollTop ??
    0;
  const targetY = Math.max(0, rect.top + currentScrollY - headerOffset);

  // Push URL hash and preserve exact previous scroll position in History state if requested
  if (options?.pushHash) {
    try {
      const existingState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};

      // 1. Save current scroll position on existing history state
      window.history.replaceState(
        { ...existingState, __fgaScrollY: currentScrollY },
        ""
      );

      // 2. Push new hash state so browser Back button returns to exact previous position
      window.history.pushState(
        { ...existingState, __fgaScrollY: currentScrollY, __fgaTargetSection: cleanId },
        "",
        `#${cleanId}`
      );
    } catch {
      // Browser environment history pushState fallback
    }
  }

  // Accessibility: Check OS prefers-reduced-motion setting
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const effectiveBehavior: ScrollBehavior = prefersReduced ? "instant" : behavior;

  try {
    window.scrollTo({ top: targetY, left: 0, behavior: effectiveBehavior });
  } catch {
    window.scrollTo(0, targetY);
  }
  return true;
}

/**
 * Manages History API state, Android/browser Back button interception,
 * body overflow='hidden' lock while open, and exact overflow + scroll position
 * restoration when closed by the X button or Android/browser Back button.
 */
export function useImagePopupHistory(
  isOpen: boolean,
  onCloseAndReset: () => void,
  popupId: string
): void {
  const onCloseRef = useRef(onCloseAndReset);
  onCloseRef.current = onCloseAndReset;

  const savedScrollYRef = useRef<number>(0);
  const savedScrollXRef = useRef<number>(0);
  const historyPushedRef = useRef<boolean>(false);
  const closedByPopStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") {
      return;
    }

    // 1. Capture exact scroll position before locking body scroll
    const startY =
      window.scrollY ??
      window.pageYOffset ??
      document.documentElement.scrollTop ??
      0;
    const startX =
      window.scrollX ??
      window.pageXOffset ??
      document.documentElement.scrollLeft ??
      0;

    savedScrollYRef.current = startY;
    savedScrollXRef.current = startX;
    closedByPopStateRef.current = false;

    // 2. Prevent browser native scroll restoration from jumping the page on Back
    const prevScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      // Ignore if restricted by browser environment
    }

    // 3. Push a single history state entry for this popup session
    if (!historyPushedRef.current) {
      const currentState =
        window.history.state && typeof window.history.state === "object"
          ? window.history.state
          : {};
      try {
        window.history.pushState(
          { ...currentState, __fgaImagePopup: popupId, __fgaScrollY: startY },
          "",
          window.location.href
        );
        historyPushedRef.current = true;
      } catch {
        historyPushedRef.current = false;
      }
    }

    // 4. Set document.body.style.overflow = 'hidden' only while popup is open
    lockBodyScroll();

    // 5. Listen for Android/Browser Back button (popstate) and Escape key
    const handlePopState = () => {
      if (!historyPushedRef.current) return;
      historyPushedRef.current = false;
      closedByPopStateRef.current = true;
      ignoreAppPopStateUntil = Date.now() + 250;
      onCloseRef.current();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    // 6. Cleanup when popup closes (via X button, Back button, backdrop, or unmount)
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);

      // Restore body's original overflow value and paddingRight
      unlockBodyScroll();

      const restoreY = savedScrollYRef.current;
      const restoreX = savedScrollXRef.current;

      const enforceScrollPosition = () => {
        window.scrollTo(restoreX, restoreY);
        requestAnimationFrame(() => {
          window.scrollTo(restoreX, restoreY);
        });
      };

      enforceScrollPosition();

      // If closed via visible X button / backdrop / Escape (not via browser Back),
      // pop the modal's history entry so the user never has to press Back twice.
      if (historyPushedRef.current && !closedByPopStateRef.current) {
        historyPushedRef.current = false;
        ignoreAppPopStateUntil = Date.now() + 300;

        const onCleanupPopState = () => {
          window.removeEventListener("popstate", onCleanupPopState);
          ignoreAppPopStateUntil = Date.now() + 150;
          enforceScrollPosition();
          try {
            if (prevScrollRestoration && "scrollRestoration" in window.history) {
              window.history.scrollRestoration = prevScrollRestoration;
            }
          } catch {}
        };

        window.addEventListener("popstate", onCleanupPopState);
        try {
          window.history.back();
        } catch {
          window.removeEventListener("popstate", onCleanupPopState);
        }
      } else {
        closedByPopStateRef.current = false;
        setTimeout(() => {
          enforceScrollPosition();
          try {
            if (prevScrollRestoration && "scrollRestoration" in window.history) {
              window.history.scrollRestoration = prevScrollRestoration;
            }
          } catch {}
        }, 30);
      }
    };
  }, [isOpen, popupId]);
}

