'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header, Footer } from '@/components/layout';
import { 
  HeroSection, 
  ExperienceSection, 
  SkillsSection, 
  ProjectsSection, 
  BlogPreviewSection, 
  ContactSection 
} from '@/components/sections';
import { useHashScroll } from '@/hooks/use-hash-scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations('common');
  
  useHashScroll();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        gsap.from(Array.from(container.children), {
          opacity: 0,
          y: 16,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homepage-page flex flex-col min-h-screen overflow-x-hidden">
      <style>{`
        .homepage-page {
          background-color: var(--surface-deep);
        }

      `}</style>

      <Header />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground">
        {t('skipToContent')}
      </a>
      <main id="main-content" className="flex-grow">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
