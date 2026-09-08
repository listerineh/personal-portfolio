'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { supportsAnimations } from '@/lib/performance';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalScrollReveal() {
  const pathname = usePathname();

  useGSAP(() => {
    const revealEls = gsap.utils.toArray<HTMLElement>('.reveal-up');
    revealEls.forEach((el) => {
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
    const allEls = [
      ...revealEls,
      ...staggerContainers.flatMap((c) => Array.from(c.children)),
    ];
    gsap.set(allEls, { opacity: 1, y: 0 });
  }, [pathname]);

  return null;
}
