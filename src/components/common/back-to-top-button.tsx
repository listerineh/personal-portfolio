'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const SHOW_AFTER = 800;

/** Back to the entrance. Appears after the first rooms; moves on the snap spring. */
export function BackToTopButton() {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setIsVisible(window.scrollY > SHOW_AFTER);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        'material fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-gutter z-40 flex h-12 w-12 items-center justify-center rounded-full text-foreground shadow-float ring-1 ring-foreground/[0.08] print:hidden',
        'transition-[opacity,transform] duration-bounce ease-bounce motion-reduce:transition-none hover:-translate-y-0.5 active:scale-90',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="h-[18px] w-[18px]" />
    </button>
  );
}
