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

  return (
    <div className="homepage-page flex flex-col min-h-screen overflow-x-hidden">
      <style>{`
        .homepage-page {
          background-color: #f5f4f0;
          color: #111111;
        }
        .dark .homepage-page {
          background-color: #080808;
          color: #f0f0f0;
        }
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay fixed inset-0 pointer-events-none z-[9998] opacity-[0.025] mix-blend-overlay" />

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
