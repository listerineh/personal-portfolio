'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HangProps {
  className?: string;
  children: ReactNode;
}

/**
 * Hangs a work on the wall: when it first enters view it settles onto its hook on the hang spring.
 * Visible by default; motion only applies when html.js-motion is set (JS on, no reduced motion).
 */
export function Hang({ className, children }: HangProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains('js-motion') || !('IntersectionObserver' in window)) {
      el.dataset.hung = '';
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.hung = '';
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-hang="" className={cn(className)}>
      {children}
    </div>
  );
}
