'use client';

import { useEffect } from 'react';
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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
