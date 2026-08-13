'use client';

import { useRef, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import type { Skill, SkillCategory } from '@/types';
import { SectionLabel, Title, Text, AccentCard } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillsListingClientProps {
  skillGroups: { category: SkillCategory; skills: Skill[] }[];
}

export function SkillsListingClient({ skillGroups }: SkillsListingClientProps) {
  const t = useTranslations('skills');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([]);

  const toggleCategory = (category: SkillCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const visibleGroups = useMemo(
    () => (selectedCategories.length === 0
      ? skillGroups
      : skillGroups.filter((group) => selectedCategories.includes(group.category))),
    [skillGroups, selectedCategories]
  );

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: (index % 3) * 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [visibleGroups]);

  let cardIndex = 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/0 via-green-950/[0.04] to-green-950/0 pointer-events-none" />
          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{ top: '4%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-green)' }}
          >
            {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-16 text-center">
              <SectionLabel accent="green" className="mb-6 reveal-up">{t('badge')}</SectionLabel>
              <Title as="h1" animate className="mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
                {t('pageTitle')}
              </Title>
              <Text size="base" strength="secondary" animate className="max-w-2xl mx-auto">
                {t('pageDescription')}
              </Text>
            </div>

            <div className="flex items-center justify-center gap-3 w-full mb-14 reveal-up">
              <span className="text-xs text-foreground/35 font-medium tracking-wide uppercase shrink-0 hidden sm:block">
                {t('filterByCategory')}
              </span>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-wrap justify-center">
                <button
                  onClick={() => setSelectedCategories([])}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border shrink-0 ${
                    selectedCategories.length === 0
                      ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-500 dark:text-emerald-400'
                      : 'bg-transparent border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80'
                  }`}
                >
                  {t('filterAll')}
                </button>
                {skillGroups.map((group) => {
                  const active = selectedCategories.includes(group.category);
                  return (
                    <button
                      key={group.category}
                      onClick={() => toggleCategory(group.category)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border shrink-0 ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-500 dark:text-emerald-400'
                          : 'bg-transparent border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80'
                      }`}
                    >
                      {t(`categories.${group.category}`)}
                      <span className="opacity-50">({group.skills.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-16">
              {visibleGroups.map((group) => (
                <div key={group.category}>
                  <SectionLabel accent="green" className="mb-6 reveal-up">
                    {t(`categories.${group.category}`)}
                  </SectionLabel>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.skills.map((skill) => {
                      const idx = cardIndex++;
                      return (
                        <div key={skill.name} ref={(el) => { cardsRef.current[idx] = el; }}>
                          <AccentCard accent="green" className="p-5 flex items-start gap-4 h-full">
                            {skill.iconUrl && (
                              <img
                                src={skill.iconUrl}
                                alt={skill.name}
                                className="w-9 h-9 shrink-0 object-contain mt-0.5"
                              />
                            )}
                            <div className="min-w-0">
                              <h3 className="font-headline font-bold text-foreground text-sm mb-1">
                                {skill.name}
                              </h3>
                              <p className="text-xs text-foreground/55 leading-relaxed">
                                {skill.description}
                              </p>
                            </div>
                          </AccentCard>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
