"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  /** Accessible name of the region, e.g. "Projects". */
  label: string;
  previousLabel: string;
  nextLabel: string;
  /** Width of each slide; defaults to a large card that leaves the next one peeking in. */
  slideClassName?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Horizontal shelf of large cards. Native scroll with snap, so a flick keeps its momentum and lands on a card;
 * the arrows move one card at a time. The track starts aligned with the page column and bleeds off the right edge.
 */
export function Carousel({
  label,
  previousLabel,
  nextLabel,
  slideClassName = "w-[84vw] sm:w-[62vw] md:w-[46vw] lg:w-[520px]",
  className,
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft >= max - 4,
    });
    const items = Array.from(track.children) as HTMLElement[];
    const left =
      track.getBoundingClientRect().left +
      parseFloat(getComputedStyle(track).paddingLeft);
    let nearest = 0;
    let best = Infinity;
    items.forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - left);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: direction * (first.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const arrow =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground/[0.07] text-foreground " +
    "transition-[background-color,opacity,transform] duration-snap ease-snap hover:bg-foreground/[0.12] active:scale-90 " +
    "disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <ul
        ref={trackRef}
        className={cn(
          "scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-8 pt-2 md:gap-8",
          // Align the first card with the 1200px column, let the rest run to the viewport edge.
          "pl-[max(var(--gutter),calc((100vw_-_1200px)/2_+_var(--gutter)))] pr-gutter",
          "scroll-pl-[max(var(--gutter),calc((100vw_-_1200px)/2_+_var(--gutter)))]",
        )}
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}`}
            className={cn("shrink-0 snap-start", slideClassName)}
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-2 flex max-w-[1200px] items-center justify-between gap-4 px-gutter">
        <div aria-hidden="true" className="flex items-center gap-1.5">
          {slides.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-glide ease-glide motion-reduce:transition-none",
                index === active
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/25",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrow}
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label={previousLabel}
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label={nextLabel}
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
