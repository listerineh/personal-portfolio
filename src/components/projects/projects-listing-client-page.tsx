'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X } from 'lucide-react';
import type { Project } from '@/types';
import { Title, ProjectCard, Input, EndOfList } from '@/components/ds';
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

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [projects, search, selectedTags]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );
    }
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.35'
      );
    }
    if (searchRef.current) {
      tl.fromTo(
        searchRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    cards.forEach((card) => {
      gsap.killTweensOf(card);
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === card)
        .forEach((st) => st.kill());
    });
    gsap.set(cards, { opacity: 0, y: 28 });
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        delay: Math.min(index * 0.07, 0.35),
        ease: 'power2.out',
      });
    });
  }, [filteredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const hasFilters = search.trim() !== '' || selectedTags.length > 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-12 text-center">
              <div ref={titleRef} style={{ opacity: 0 }}>
                <Title as="h1" className="mb-4 text-display-sm">
                  {t('pageTitle')}
                </Title>
              </div>
              <div ref={descRef} style={{ opacity: 0 }}>
                <p className="text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                  {t('pageDescription')}
                </p>
              </div>
            </div>

            <div ref={searchRef} style={{ opacity: 0 }} className="max-w-3xl mx-auto mb-12 space-y-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
                <Input
                  accent="amber"
                  placeholder={t('searchPlaceholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 pr-10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground/40 hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {allTags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {allTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97] shrink-0 ${
                          active
                            ? 'bg-primary/10 border-primary/40 text-primary'
                            : 'bg-transparent border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-foreground/50 text-headline">{t('noResults')}</p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setSelectedTags([]);
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-headline font-semibold uppercase tracking-wide text-primary hover:text-primary/80 transition-colors"
                  >
                    {t('clearFilters')}
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
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
                <EndOfList>{tCommon('endOfList')}</EndOfList>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
