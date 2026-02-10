'use client';

import { useState, useRef } from 'react';
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
    <SectionWrapper id="experience" title="Work Experience" badge='Career'>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-md border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-7">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2 opacity-30 pointer-events-none" />
                  
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 experience-logo">
                        {exp.logoUrl ? (
                          <div className="relative">
                            <Image
                              src={exp.logoUrl}
                              alt={`${exp.company} logo`}
                              width={56}
                              height={56}
                              className="rounded-full border border-border/50 shadow-sm group-hover:shadow-md transition-shadow"
                              style={{
                                maxWidth: "100%",
                                height: "auto"
                              }} />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary shadow-sm">
                            <Briefcase className="h-7 w-7" />
                          </div>
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg md:text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                          {exp.jobTitle}
                        </h3>
                        <p className="text-sm md:text-base font-medium text-primary/70 truncate">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                      <span className="px-2.5 py-1 bg-primary/8 text-primary/80 rounded-md border border-primary/15 font-medium">
                        {exp.employmentDates}
                      </span>
                      {exp.location && (
                        <span className="px-2.5 py-1 bg-accent/8 text-accent/80 rounded-md border border-accent/15 font-medium">
                          {exp.location}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 space-y-2">
                      {exp.responsibilities
                        .slice(0, expandedItems[index] ? exp.responsibilities.length : 3)
                        .map((responsibility, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground group/item">
                            <span className="inline-block w-1 h-1 rounded-full bg-primary/60 mt-2.5 flex-shrink-0 group-hover/item:bg-primary transition-colors" />
                            <span className="leading-relaxed text-foreground/70">{responsibility}</span>
                          </div>
                      ))}
                    </div>

                    {exp.responsibilities.length > 3 && (
                      <div className="pt-1">
                        <Button 
                          variant="ghost"
                          onClick={() => toggleExpand(index)}
                          className="text-primary hover:text-accent hover:bg-primary/5 text-xs font-semibold p-0 h-auto"
                        >
                          {expandedItems[index] ? '← Show less' : 'See more →'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

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
