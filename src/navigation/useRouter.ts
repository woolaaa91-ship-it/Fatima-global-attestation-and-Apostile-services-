import { useMemo } from "react";
import { applyRouteSEO } from "../utils/seo";

export interface AppRouterInstance {
  push: (href: string) => void;
  replace: (href: string) => void;
}

/**
 * Navigation hook providing `router.push(href)` and `router.replace(href)`
 * that updates browser history, triggers route transitions, and synchronizes
 * route-level SEO metadata (`<title>`, `<meta name="description">`, canonical URL, and JSON-LD).
 */
export function useRouter(onNavigate?: (path: string) => void): AppRouterInstance {
  return useMemo(
    () => ({
      push: (href: string) => {
        applyRouteSEO(href);
        if (onNavigate) {
          onNavigate(href);
          return;
        }
        if (typeof window !== "undefined") {
          window.history.pushState({}, "", href);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      },
      replace: (href: string) => {
        applyRouteSEO(href);
        if (typeof window !== "undefined") {
          window.history.replaceState({}, "", href);
        }
        if (onNavigate) {
          onNavigate(href);
        } else if (typeof window !== "undefined") {
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      },
    }),
    [onNavigate]
  );
}
