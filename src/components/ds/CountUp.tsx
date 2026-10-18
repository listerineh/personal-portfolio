'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** The final value as shown, e.g. "6+", "4.6K+", "10+". The leading number counts; the rest is kept as is. */
  value: string;
  /** Milliseconds for the count. */
  duration?: number;
  className?: string;
}

/**
 * A figure that counts up from zero the first time it scrolls into view. The markup always holds the final value,
 * so screen readers, no-JS and reduced motion get it directly.
 */
export function CountUp({ value, duration = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || !document.documentElement.classList.contains('js-motion')) return;
    const [, prefix, number, suffix] = match;
    const target = parseFloat(number);
    const decimals = number.includes('.') ? number.split('.')[1].length : 0;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4); // fast start, soft landing
          setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
