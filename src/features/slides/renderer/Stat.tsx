'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, spring, springs } from '@/lib/motion';

const format = (value: number, decimals: number, locale: string) =>
  value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** A number that counts up on the glide spring when its slide (or build step) arrives. At rest it shows the value. */
export function CountUp({ value, run, locale }: { value: number; run: boolean; locale: string }) {
  const decimals = Number.isInteger(value) ? 0 : (String(value).split('.')[1]?.length ?? 0);
  const [counting, setCounting] = useState<number | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    if (!run || prefersReducedMotion()) return;
    const { duration, ease } = spring(springs.glide);
    const total = duration * 1000 * 1.8;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / total);
      setCounting(progress < 1 ? value * ease(progress) : null);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [run, value]);

  return <>{format(run && counting !== null ? counting : value, decimals, locale)}</>;
}
