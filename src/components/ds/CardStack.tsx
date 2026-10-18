"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface CardStackProps {
  /** Up to three cards; the first starts in front. */
  children: ReactNode;
  /** Seconds between deals; the deck pauses while hovered. */
  interval?: number;
  className?: string;
}

// Resting pose per depth: the front card faces you, the others fan back and up.
const poses = [
  { x: 0, y: 0, r: -2, s: 1 },
  { x: 6, y: -9, r: 4, s: 0.94 },
  { x: 12, y: -18, r: 9, s: 0.88 },
];

/**
 * A fanned deck of cards. It leans toward the pointer with depth, and every few seconds deals the front card to the
 * back. Decorative: the deck is hidden from assistive tech, so cards must not carry information found nowhere else.
 * All motion runs on springs and stops under reduced motion.
 */
export function CardStack({
  children,
  interval = 5,
  className,
}: CardStackProps) {
  const cards = Children.toArray(children).slice(0, poses.length);
  const [order, setOrder] = useState(() => cards.map((_, index) => index));
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef(order);
  const frame = useRef(0);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  // Deal: the front card slips out to the left, then rejoins at the back of the deck.
  const deal = useCallback(() => {
    setLeaving(orderRef.current[0]);
    window.setTimeout(() => {
      setOrder((current) => [...current.slice(1), current[0]]);
      setLeaving(null);
    }, 320);
  }, []);

  useEffect(() => {
    const motionOk = document.documentElement.classList.contains("js-motion");
    if (!motionOk || paused || cards.length < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") deal();
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [paused, interval, deal, cards.length]);

  // Pointer parallax: the deck leans toward the cursor, nearer cards move more.
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = rootRef.current;
    if (!el || !document.documentElement.classList.contains("js-motion"))
      return;
    const rect = el.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    });
  };

  const onPointerLeave = () => {
    setPaused(false);
    rootRef.current?.style.setProperty("--px", "0");
    rootRef.current?.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={onPointerLeave}
      className={cn(
        "relative aspect-[6/5] w-full select-none [--px:0] [--py:0]",
        className,
      )}
    >
      {cards.map((card, index) => {
        const depth = order.indexOf(index);
        const pose = poses[depth] ?? poses[poses.length - 1];
        const isLeaving = leaving === index;
        const lean = (poses.length - depth) * 7; // px of parallax per unit of pointer offset
        const transform = isLeaving
          ? "translate3d(-16%, 8%, 0) rotate(-12deg) scale(0.95)"
          : `translate3d(calc(${pose.x}% + var(--px) * ${lean}px), calc(${pose.y}% + var(--py) * ${lean}px), 0) rotate(calc(${pose.r}deg + var(--px) * 1.5deg)) scale(${pose.s})`;
        return (
          <div
            key={index}
            style={{ transform, zIndex: isLeaving ? 0 : poses.length - depth }}
            className={cn(
              "absolute inset-x-[4%] top-[16%] will-change-transform",
              "transition-[transform,opacity,filter] duration-glide ease-glide motion-reduce:transition-none",
              isLeaving && "opacity-0",
              depth > 0 && "brightness-[0.97] dark:brightness-75",
            )}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
