"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Content rises into place as it enters the viewport. Where the browser supports scroll-driven
 * animations the motion is tied to scroll position (it follows the finger, both ways); elsewhere it
 * plays once on the glide spring. Visible by default: motion only applies under html.js-motion.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scrollDriven =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    if (scrollDriven) return;
    if (
      !document.documentElement.classList.contains("js-motion") ||
      !("IntersectionObserver" in window)
    ) {
      el.dataset.revealed = "";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.revealed = "";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
