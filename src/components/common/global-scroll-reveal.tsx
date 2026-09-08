'use client';

import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalScrollReveal() {
  const pathname = usePathname();

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealEls = gsap.utils.toArray<HTMLElement>('.reveal-up');
    revealEls.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    const staggerContainers = gsap.utils.toArray<HTMLElement>('.reveal-stagger');
    staggerContainers.forEach((container) => {
      gsap.from(Array.from(container.children), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, [pathname]);

  return null;
}
