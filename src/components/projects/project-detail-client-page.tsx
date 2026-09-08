'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data/skills';
import { Button } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2, Clock, AlertCircle, PauseCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailClientPageProps {
  project: Project;
}

const statusConfig = {
  completed: { icon: CheckCircle2, className: 'text-emerald-500', label: 'Completed' },
  'in-progress': { icon: Clock, className: 'text-primary', label: 'In Progress' },
  archived: { icon: AlertCircle, className: 'text-foreground/40', label: 'Archived' },
  'on-hold': { icon: PauseCircle, className: 'text-amber-500', label: 'On Hold' },
} as const;

function formatProjectDate(dateString: string, locale: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });
}

function getSkillIconUrl(tagName: string) {
  const skill = skills.find(s => s.name.toLowerCase() === tagName.toLowerCase());
  return skill?.iconUrl;
}

export function ProjectDetailClientPage({ project }: ProjectDetailClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('project');
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        contentRef.current!.children,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [project.slug]);

  const StatusIcon = project.status ? statusConfig[project.status as keyof typeof statusConfig]?.icon : null;
  const statusClass = project.status ? statusConfig[project.status as keyof typeof statusConfig]?.className : '';
  const statusLabel = project.status ? t(`status.${project.status}` as any) : '';

  const dateRange = project.startDate
    ? `${formatProjectDate(project.startDate, locale)}${project.endDate ? ` – ${formatProjectDate(project.endDate, locale)}` : ''}`
    : '';

  return (
    <>
      <Header />
      <main className="pt-20 bg-background min-h-screen">
        <article
          ref={contentRef}
          className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-20 space-y-12"
        >
          {/* Back link */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToProjects')}
            </Link>
          </div>

          {/* Header */}
          <header className="space-y-5">
            <span className="inline-block text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70">
              {t('featuredProject')}
            </span>
            <h1 className="font-headline font-black text-foreground leading-[0.95] text-display-sm">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Status + dates */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              {project.status && StatusIcon && (
                <span className={`inline-flex items-center gap-2 text-sm font-medium ${statusClass}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusLabel}
                </span>
              )}
              {project.startDate && (
                <span className="inline-flex items-center gap-2 text-sm text-foreground/50">
                  <Calendar className="w-4 h-4" />
                  {dateRange}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {project.liveDemoUrl && (
                <Button
                  variant="primary"
                  accent="amber"
                  size="lg"
                  href={project.liveDemoUrl}
                  external
                  className="gap-2 w-full sm:w-auto"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('liveDemo')}
                </Button>
              )}
              {project.sourceCodeUrl && (
                <Button
                  variant="secondary"
                  accent="neutral"
                  size="lg"
                  href={project.sourceCodeUrl}
                  external
                  className="gap-2 w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  {t('sourceCode')}
                </Button>
              )}
            </div>
          </header>

          {/* Cover image */}
          {project.imageUrl && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-foreground/[0.08]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Technologies */}
          {project.tags && project.tags.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70">
                {t('technologies')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => {
                  const iconUrl = getSkillIconUrl(tag);
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-foreground/10 bg-card/40 text-sm text-foreground/70"
                    >
                      {iconUrl && (
                        <Image
                          src={iconUrl}
                          alt={tag}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      {tag}
                    </span>
                  );
                })}
              </div>
            </section>
          )}

          {/* Long description */}
          {project.longDescription && (
            <section className="space-y-4">
              <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70">
                {t('aboutProject')}
              </h2>
              <div className="space-y-4">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/75 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Relevance */}
          {project.relevance && (
            <aside className="border border-primary/15 bg-primary/[0.02] rounded-xl px-6 py-5">
              <h2 className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70 mb-2">
                {t('relevance')}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {project.relevance}
              </p>
            </aside>
          )}

          {/* Back to projects */}
          <div className="pt-6 border-t border-foreground/10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToProjects')}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
