'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/lib/data';
import { SectionWrapper } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShowAll = () => {
    setShowAll(true);
    
    setTimeout(() => {
      const newItems = itemsRef.current.slice(3);
      newItems.forEach((item, index) => {
        if (item) {
          const actualIndex = index + 3;
          
          gsap.set(item, { opacity: 1 });
          
          gsap.from(item, {
            x: actualIndex % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });

          const logo = item.querySelector('.experience-logo');
          if (logo) {
            gsap.from(logo, {
              scale: 0,
              rotation: 180,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          }
        }
      });
      
      ScrollTrigger.refresh();
    }, 100);
  };

  useGSAP(() => {
    const isLowEnd = (navigator as any).hardwareConcurrency <= 2;
    
    if (timelineRef.current) {
      gsap.from(timelineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: isLowEnd ? 0.6 : 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    itemsRef.current.slice(0, 3).forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          x: index % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: isLowEnd ? 0.4 : 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        const logo = item.querySelector('.experience-logo');
        if (logo) {
          gsap.from(logo, {
            scale: 0,
            rotation: -90,
            duration: isLowEnd ? 0.3 : 0.5,
            delay: index * 0.1 + 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }
    });
  }, []);

  return (
    <SectionWrapper id="experience" title="Work Experience">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              ref={(el) => { itemsRef.current[index] = el; }}
              className={`relative group ${
                index >= 3 && !showAll ? 'hidden' : ''
              }`}
              style={index >= 3 && showAll ? { opacity: 0 } : undefined}
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Content card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-40 pointer-events-none" />
                  
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }} />
                  
                  <div className="relative">
                    {/* Header with logo */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Logo */}
                      <div className="flex-shrink-0 experience-logo">
                        {exp.logoUrl ? (
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                            <Image
                              src={exp.logoUrl}
                              alt={`${exp.company} logo`}
                              width={64}
                              height={64}
                              className="relative rounded-full border-2 border-background ring-4 ring-primary/20 shadow-lg"
                              style={{
                                maxWidth: "100%",
                                height: "auto"
                              }} />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary shadow-lg">
                            <Briefcase className="h-8 w-8" />
                          </div>
                        )}
                      </div>

                      {/* Title and company */}
                      <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {exp.jobTitle}
                        </h3>
                        <p className="text-base md:text-lg font-semibold text-primary/80">
                          {exp.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-primary/10 rounded-md border border-primary/20">
                            {exp.employmentDates}
                          </span>
                          {exp.location && (
                            <span className="px-2 py-1 bg-accent/10 rounded-md border border-accent/20">
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.responsibilities
                        .slice(0, expandedItems[index] ? exp.responsibilities.length : 3)
                        .map((responsibility, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{responsibility}</span>
                          </li>
                      ))}
                    </ul>

                    {/* Expand button */}
                    {exp.responsibilities.length > 3 && (
                      <Button 
                        variant="link"
                        onClick={() => toggleExpand(index)}
                        className="text-primary hover:text-accent text-sm font-semibold p-0 h-auto mt-3"
                      >
                        {expandedItems[index] ? '← Show less' : 'See more →'}
                      </Button>
                    )}
                  </div>

                  {/* Corner highlight */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl pointer-events-none" />
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show all button */}
      {experiences.length > 3 && !showAll && (
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            onClick={handleShowAll}
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-lg transition-all"
          >
            Show All Experience
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
