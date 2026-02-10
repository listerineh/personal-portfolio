'use client';

import { useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';
import { SectionWrapper } from '@/components/common';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGSAP } from '@/hooks/use-gsap';
import { getImageUrl } from '@/lib/get-build-version';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          delay: (index % 3) * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        const image = card.querySelector('.project-image');
        if (image) {
          gsap.to(image, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (!isTouchDevice) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        }
      }
    });
  }, [projects.length]);

  return (
    <SectionWrapper id="projects" title="Featured Projects" badge='Hobbies'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/8 to-primary/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-md border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2 opacity-30 pointer-events-none" />
              
              <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-xl">
                <Image
                  src={getImageUrl(project.imageUrl)}
                  alt={project.title}
                  data-ai-hint={project.imageAiHint}
                  className="project-image transition-transform duration-500 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  style={{
                    objectFit: "cover"
                  }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-40" />
              </div>
              
              <div className="relative flex flex-col flex-grow p-6">
                <h3 className="text-lg md:text-xl font-headline font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs bg-primary/8 text-primary/80 border border-primary/15 font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex justify-between gap-2 pt-4 border-t border-border/20">
                  {project.liveDemoUrl && (
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-accent text-xs font-semibold p-0 h-auto"
                    >
                      <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
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
                        <Github className="mr-1.5 h-3.5 w-3.5" /> Source
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
