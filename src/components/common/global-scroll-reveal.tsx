'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { supportsAnimations } from '@/lib/performance';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function isPastRevealStart(el: HTMLElement, threshold: number) {
  if (typeof window === 'undefined') return false;
  const top = el.getBoundingClientRect().top;
  return top < window.innerHeight * threshold;
}

export function GlobalScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!supportsAnimations()) return;
    const revealEls = gsap.utils.toArray<HTMLElement>('.reveal-up');
    const staggerContainers = gsap.utils.toArray<HTMLElement>('.reveal-stagger');

    revealEls.forEach((el) => {
      if (isPastRevealStart(el, 0.88)) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });

    staggerContainers.forEach((container) => {
      if (isPastRevealStart(container, 0.85)) {
        gsap.set(Array.from(container.children), { opacity: 1, y: 0 });
      }
    });
  }, [pathname]);

  useGSAP(() => {
    const revealEls = gsap.utils.toArray<HTMLElement>('.reveal-up');
    revealEls.forEach((el) => {
      if (isPastRevealStart(el, 0.88)) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const staggerContainers = gsap.utils.toArray<HTMLElement>('.reveal-stagger');
    staggerContainers.forEach((container) => {
      if (isPastRevealStart(container, 0.85)) return;

      gsap.fromTo(
        Array.from(container.children),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, [pathname]);

  useEffect(() => {
    if (supportsAnimations()) return;
    const revealEls = gsap.utils.toArray<HTMLElement>('.reveal-up');
    const staggerContainers = gsap.utils.toArray<HTMLElement>('.reveal-stagger');
    const initialEls = gsap.utils.toArray<HTMLElement>('.reveal-initial');
    const allEls = [
      ...revealEls,
      ...staggerContainers.flatMap((c) => Array.from(c.children)),
      ...initialEls,
    ];
    gsap.set(allEls, { opacity: 1, y: 0 });
  }, [pathname]);

  return null;
}
