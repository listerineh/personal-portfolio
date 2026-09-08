'use client';

import { useRef, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import type { Skill, SkillCategory } from '@/types';
import { Title, EndOfList } from '@/components/ds';
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
  const tCommon = useTranslations('common');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([]);

  const visibleGroups = useMemo(
    () =>
      selectedCategories.length === 0
        ? skillGroups
        : skillGroups.filter((group) => selectedCategories.includes(group.category)),
    [skillGroups, selectedCategories]
  );

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          delay: Math.min(index * 0.03, 0.6),
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [visibleGroups]);

  const toggleCategory = (category: SkillCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const isAll = selectedCategories.length === 0;
  let cardIndex = 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-16 text-center">
              <Title as="h1" animate className="mb-4 text-display-sm">
                {t('pageTitle')}
              </Title>
              <p className="text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                {t('pageDescription')}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-14">
              <span className="text-xs text-foreground/40 font-headline tracking-wide uppercase shrink-0">
                {t('filterByCategory')}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97] border shrink-0 ${
                    isAll
                      ? 'bg-accent/10 border-accent/40 text-accent'
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
                      type="button"
                      onClick={() => toggleCategory(group.category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97] border shrink-0 ${
                        active
                          ? 'bg-accent/10 border-accent/40 text-accent'
                          : 'bg-transparent border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80'
                      }`}
                    >
                      {t(`categories.${group.category}`)}
                      <span className="opacity-50 ml-1.5">({group.skills.length})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Groups */}
            <div className="space-y-16">
              {visibleGroups.map((group) => (
                <section key={group.category}>
                  <div className="flex items-baseline gap-3 mb-5">
                    <h2 className="font-headline font-bold text-foreground text-lg">
                      {t(`categories.${group.category}`)}
                    </h2>
                    <span className="text-xs text-foreground/40 font-headline tracking-widest uppercase">
                      {group.skills.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {group.skills.map((skill) => {
                      const idx = cardIndex++;
                      return (
                        <div
                          key={skill.name}
                          ref={(el) => { cardsRef.current[idx] = el; }}
                          className="rounded-xl border border-foreground/[0.06] bg-card/40 p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-accent/25 hover:bg-accent/[0.02] active:scale-[0.98] flex items-start gap-3"
                        >
                          {skill.iconUrl ? (
                            <Image
                              src={skill.iconUrl}
                              alt={skill.name}
                              width={36}
                              height={36}
                              className="w-9 h-9 object-contain shrink-0"
                              unoptimized
                            />
                          ) : (
                            <span className="w-9 h-9 rounded-lg bg-foreground/5 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <h3 className="font-headline font-bold text-foreground text-sm leading-tight">
                              {skill.name}
                            </h3>
                            <p className="text-xs text-foreground/50 leading-relaxed mt-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
