"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingWordsProps {
  words: string[];
  /** Seconds each word stays. */
  interval?: number;
  /** Hold the current word (e.g. a pause control, WCAG 2.2.2). */
  paused?: boolean;
  className?: string;
}

/**
 * Words that take turns in one slot, rising in on a spring. All words share the same grid cell, so the slot is as wide
 * as the longest one and the line never jumps. Decorative: pair it with a static sr-only sentence.
 */
export function RotatingWords({
  words,
  interval = 2.4,
  paused = false,
  className,
}: RotatingWordsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (
      paused ||
      !document.documentElement.classList.contains("js-motion") ||
      words.length < 2
    )
      return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible")
        setActive((value) => (value + 1) % words.length);
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [words.length, interval, paused]);

  return (
    <span
      aria-hidden="true"
      className={cn("inline-grid overflow-hidden align-bottom", className)}
    >
      {words.map((word, index) => {
        const offset =
          index === active
            ? 0
            : index === (active - 1 + words.length) % words.length
              ? -1
              : 1;
        return (
          <span
            key={word}
            className="col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-glide ease-glide motion-reduce:transition-none"
            style={{
              transform: `translateY(${offset * 100}%)`,
              opacity: offset === 0 ? 1 : 0,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
