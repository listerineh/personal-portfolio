"use client";

import { useCallback, type ReactNode } from "react";

/**
 * A page's loading state drawn from the page itself: wrap the route's own components (with placeholder data) and the
 * `.skeleton` styles in globals.css turn their text into bars, hide images and icons and mute accent fills, so the
 * skeleton has the page's exact shapes, sizes and line wraps. Only the page's main area is affected: when the children
 * include the page shell, the site header and footer stay live. Fades in after a beat, so fast navigations don't flash.
 */
export function PageSkeleton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  // The placeholder content is never interactive or read out: the main area (or the skeleton itself) goes inert.
  const ref = useCallback((el: HTMLDivElement | null) => {
    if (el) (el.querySelector("main") ?? el).inert = true;
  }, []);

  return (
    <div data-loading-skeleton="" role="status" className="contents">
      <span className="sr-only">{label}</span>
      <div ref={ref} className="skeleton">
        {children}
      </div>
    </div>
  );
}
