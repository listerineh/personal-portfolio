'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title, ProjectCard } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const t = useTranslations('projects');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const projects = getLocalizedData(projectsData, locale);
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
    <section id="projects" className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel accent="amber" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
        <Title as="h2" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
          {t('title')}
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="h-full"
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                tags={[...project.tags]}
                liveDemoUrl={project.liveDemoUrl}
                sourceCodeUrl={project.sourceCodeUrl}
                liveLabel={tCommon('liveDemo')}
                sourceLabel={tCommon('source')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute right-[-2vw] font-headline font-black pointer-events-none select-none leading-none whitespace-nowrap"
        style={{
          top: '8%',
          fontSize: 'clamp(5rem, 11vw, 10rem)',
          color: 'var(--wm-amber)',
        }}
      >
        HOBBIES
      </div>
    </section>
  );
}
