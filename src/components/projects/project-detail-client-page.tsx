'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import type { Project } from '@/types';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, Title, Text, Button, AccentCard, Pill } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle2, AlertCircle, PauseCircle } from 'lucide-react';
import { skills } from '@/lib/data/skills';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailClientPageProps {
  project: Project;
}

const statusConfig = {
  'completed': { icon: CheckCircle2, color: 'text-green-500', label: 'Completed' },
  'in-progress': { icon: Clock, color: 'text-amber-500', label: 'In Progress' },
  'archived': { icon: AlertCircle, color: 'text-gray-500', label: 'Archived' },
  'on-hold': { icon: PauseCircle, color: 'text-orange-500', label: 'On Hold' },
} as const;

export function ProjectDetailClientPage({ project: initialProject }: ProjectDetailClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('project');
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const project = initialProject;

  const getSkillIcon = (tagName: string) => {
    const skill = skills.find(s => s.name.toLowerCase() === tagName.toLowerCase());
    return skill?.iconUrl;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      if (heroRef.current && heroRef.current.children.length > 0) {
        gsap.fromTo(heroRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project.slug]);

  const StatusIcon = project.status ? statusConfig[project.status].icon : null;
  const statusColor = project.status ? statusConfig[project.status].color : '';
  const statusLabel = project.status ? t(`status.${project.status}` as any) : '';

  return (
    <>
      <Header />
      <main className="pt-20 bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16">
          <div className="relative" ref={contentRef}>
            <article key={project.slug}>
              {/* Back Button */}
              <div className="mb-8 reveal-up" ref={heroRef}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToProjects')}
                </Link>
              </div>

              {/* Hero Section */}
              <div className="mb-12 reveal-up" ref={heroRef}>
                <SectionLabel accent="amber" className="mb-4">
                  {t('featuredProject')}
                </SectionLabel>
                <Title
                  as="h1"
                  gradient="amber"
                  className="mb-6"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  {project.title}
                </Title>
                <Text size="lg" strength="secondary" className="mb-8 max-w-3xl">
                  {project.description}
                </Text>

                {/* Status and Role */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {project.status && StatusIcon && (
                    <div className={cn('flex items-center gap-2 text-sm', statusColor)}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="font-medium">{statusLabel}</span>
                    </div>
                  )}
                  {project.startDate && (
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(project.startDate)}
                        {project.endDate && ` – ${formatDate(project.endDate)}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
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
              </div>

              {/* Project Image */}
              {project.imageUrl && (
                <div className="mb-12 reveal-up" ref={heroRef}>
                  <div className="relative rounded-2xl overflow-hidden border border-foreground/10">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {/* Technologies */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-12 reveal-up" ref={heroRef}>
                  <SectionLabel accent="amber" className="mb-4">
                    {t('technologies')}
                  </SectionLabel>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => {
                      const iconUrl = getSkillIcon(tag);
                      return (
                        <div
                          key={tag}
                          className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm border border-foreground/15 rounded-lg hover:border-foreground/30 transition-colors"
                        >
                          {iconUrl && (
                            <img
                              src={iconUrl}
                              alt={tag}
                              className="w-5 h-5"
                            />
                          )}
                          <span className="text-sm font-medium text-foreground/80">{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Long Description */}
              {project.longDescription && (
                <div className="mb-12 reveal-up" ref={heroRef}>
                  <SectionLabel accent="amber" className="mb-4">
                    {t('aboutProject')}
                  </SectionLabel>
                  <div className="prose prose-invert max-w-none">
                    {project.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-foreground/80 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Relevance */}
              {project.relevance && (
                <div className="mb-12 reveal-up" ref={heroRef}>
                  <AccentCard accent="amber" className="p-6 md:p-8">
                    <SectionLabel accent="amber" className="mb-3">
                      {t('relevance')}
                    </SectionLabel>
                    <Text size="base" strength="secondary">
                      {project.relevance}
                    </Text>
                  </AccentCard>
                </div>
              )}

              {/* Back to Projects */}
              <div className="pt-8 border-t border-foreground/10 reveal-up" ref={heroRef}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToProjects')}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
