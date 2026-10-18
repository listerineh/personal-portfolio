"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AmbientProps {
  /** Dot grid that fades toward the edges. */
  grid?: boolean;
  /** Amber dots light up under the mouse pointer (needs `grid`). */
  spotlight?: boolean;
  /** `hero` = full strength; `soft` = smaller, quieter halos for cards. */
  intensity?: "hero" | "soft";
  /** Drifting warm halos. Off leaves only the grid (and spotlight). */
  halos?: boolean;
  /** Flip the composition horizontally so neighbouring sections don't repeat it. Not with `spotlight`. */
  mirror?: boolean;
  className?: string;
}

/**
 * Ambient light behind a section: warm halos that drift slowly, an optional dot grid and an amber spotlight that
 * follows the pointer. Decorative and non-interactive. The parent must be `relative isolate overflow-hidden`, and its
 * content positioned (`relative`) so it paints above. Drift runs only under html.js-motion (no reduced motion).
 */
export function Ambient({
  grid = true,
  spotlight = true,
  intensity = "hero",
  halos = true,
  mirror = false,
  className,
}: AmbientProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || !spotlight || !grid) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = host.getBoundingClientRect();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
        el.dataset.lit = "";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      delete el.dataset.lit;
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [grid, spotlight]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "ambient pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        intensity === "soft" && "ambient-soft",
        mirror && "-scale-x-100",
        className,
      )}
    >
      {halos && (
        <>
          <span className="ambient-halo ambient-halo-a" />
          <span className="ambient-halo ambient-halo-b" />
          <span className="ambient-halo ambient-halo-c" />
        </>
      )}
      {grid && <span className="ambient-grid" />}
      {grid && spotlight && <span className="ambient-grid ambient-spot" />}
    </div>
  );
}
