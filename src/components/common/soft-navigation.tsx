"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks <html data-nav="soft"> after the first move to another page. The first screen keeps its full staggered intro;
 * from then on each page's intro is a short fade (globals.css), so moving around never waits on an animation.
 */
export function SoftNavigation() {
  const pathname = usePathname();
  const firstPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== firstPathname.current)
      document.documentElement.dataset.nav = "soft";
  }, [pathname]);

  return null;
}
