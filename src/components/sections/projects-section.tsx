'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { SectionWrapper } from '@/components/common';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGSAP } from '@/hooks/use-gsap';

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
          duration: 0.5,
          delay: (index % 3) * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  }, [projects.length]);

  return (
    <SectionWrapper id="projects" title={t('title')} badge={t('badge')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-sm border border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full rounded-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-40 pointer-events-none" />
              
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />
              
              {/* Corner highlights */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-bl-2xl pointer-events-none" />
              
              <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  data-ai-hint={project.imageAiHint}
                  className="project-image transition-transform duration-500 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  style={{
                    objectFit: "cover"
                  }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60" />
              </div>
              
              <div className="relative flex flex-col flex-grow p-6">
                <h3 className="text-lg md:text-xl font-headline font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <div key={tag} className="relative group/badge">
                      <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                      <Badge 
                        variant="secondary" 
                        className="relative text-xs bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm font-medium"
                      >
                        {tag}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex justify-between gap-2 pt-4 border-t border-border/30">
                  {project.liveDemoUrl && (
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-accent text-xs font-semibold p-0 h-auto"
                    >
                      <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> {tCommon('liveDemo')}
                      </Link>
                    </Button>
                  )}
                  {project.sourceCodeUrl && (
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground text-xs font-semibold p-0 h-auto"
                    >
                      <Link href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5" /> {tCommon('source')}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
