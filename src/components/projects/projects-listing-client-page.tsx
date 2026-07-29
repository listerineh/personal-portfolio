'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import type { Project } from '@/types';
import { SectionLabel, Title, ProjectCard } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsListingClientPageProps {
  projects: Project[];
}

export function ProjectsListingClientPage({ projects }: ProjectsListingClientPageProps) {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: (index % 3) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [projects.length]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-32">
          <SectionLabel accent="amber" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
          <Title as="h1" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('title')}
          </Title>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="h-full"
                  ref={(el) => { cardsRef.current[index] = el; }}
                >
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    tags={[...project.tags]}
                    viewMoreLabel={tCommon('viewProject')}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground/50 text-lg">No projects found.</p>
            </div>
          )}
        </div>

        {/* Watermark */}
        <div
          className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
          style={{ top: '8%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
        >
          {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
        </div>
      </main>
      <Footer />
    </>
  );
}
