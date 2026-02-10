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
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-sm border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-40 pointer-events-none" />
              
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />
              
              {/* Image container */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden">
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
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60" />
              </div>
              
              {/* Content */}
              <div className="relative flex flex-col flex-grow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow pb-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
                
                <CardFooter className="flex justify-start gap-3 pt-4 border-t border-border/30">
                  {project.liveDemoUrl && (
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.sourceCodeUrl && (
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      <Link href={project.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Source
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </div>
              
              {/* Corner highlights */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/10 to-transparent rounded-bl-xl pointer-events-none" />
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
