"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { restoreDocumentState } from "@/lib/inline-scripts";
import { useSitePathname } from "@/hooks/use-site-pathname";

// Survives the root layout remounting (a language switch), unlike this component's state.
let navigated = false;

/**
 * Marks <html data-nav="soft"> after the first move to another page. The first screen keeps its full staggered intro;
 * from then on each page's intro is a short fade (globals.css), so moving around never waits on an animation.
 *
 * Also repairs <html> when the root layout remounts (switching language): React clears its attributes, which drops the
 * theme and js-motion (every animation) set by the pre-paint script. Restored before the browser paints.
 */
export function SoftNavigation() {
  const pathname = useSitePathname();
  const firstPathname = useRef(pathname);

  useLayoutEffect(() => {
    restoreDocumentState();
    if (navigated) document.documentElement.dataset.nav = "soft";
  }, []);

  useEffect(() => {
    if (pathname !== firstPathname.current) {
      navigated = true;
      document.documentElement.dataset.nav = "soft";
    }
  }, [pathname]);

  return null;
}
