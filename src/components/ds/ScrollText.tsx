'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollTextProps {
  text: string;
  className?: string;
}

/**
 * A paragraph whose words light up one after another as it scrolls through the viewport. Progress is a single CSS
 * variable updated on scroll; each word derives its own opacity from it. Without motion every word is fully lit.
 */
export function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains('js-motion')) {
      el.style.setProperty('--p', '1');
      return;
    }
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% of the viewport, 1 when its bottom passes 45%.
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.4);
      el.style.setProperty('--p', Math.min(1, Math.max(0, progress)).toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={cn('[--p:1]', className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="transition-opacity duration-200 motion-reduce:transition-none"
          style={{ opacity: `clamp(0.16, calc(var(--p) * ${words.length + 4} - ${index}), 1)` }}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
