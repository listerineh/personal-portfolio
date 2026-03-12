'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiencesData } from '@/lib/data';
import { getLocalizedData } from '@/lib/i18n-data';
import { useLocale } from '@/context/locale-context';
import { SectionWrapper } from '@/components/common';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const experiences = getLocalizedData(experiencesData, locale);
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
      newItems.forEach((item) => {
        if (item) {
          gsap.set(item, { opacity: 1 });
          
          gsap.from(item, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });
      
      ScrollTrigger.refresh();
    }, 100);
  };

  useGSAP(() => {
    if (timelineRef.current) {
      gsap.from(timelineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    itemsRef.current.slice(0, 3).forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.5,
          delay: index * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  }, []);

  return (
    <SectionWrapper id="experience" title={t('title')} badge={t('badge')}>
      <div className="max-w-5xl mx-auto">
        <div ref={timelineRef} className="relative">          
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`relative group ${
                  index >= 3 && !showAll ? 'hidden' : ''
                }`}
                style={index >= 3 && showAll ? { opacity: 0 } : undefined}
              >
                {/* Content card - alternating sides on desktop */}
                <div className={`md:w-[calc(50%-3rem)] ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                }`}>
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/70 via-card/50 to-card/70 backdrop-blur-sm border border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300">
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
                    
                    {/* Company logo header */}
                    <div className="relative p-6 pb-4 border-b border-border/30">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {exp.logoUrl ? (
                            <div className="relative group/logo">
                              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
                              <div className="relative p-1 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full">
                                <Image
                                  src={exp.logoUrl}
                                  alt={`${exp.company} logo`}
                                  width={64}
                                  height={64}
                                  className="relative rounded-full border border-border/50 shadow-md group-hover:shadow-lg transition-all duration-300"
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto"
                                  }} />
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl" />
                              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border border-primary/30 text-primary shadow-md">
                                <Briefcase className="h-8 w-8" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-grow min-w-0">
                          <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-1 leading-tight">
                            {exp.jobTitle}
                          </h3>
                          <p className="text-base md:text-lg font-semibold text-primary/80">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details section */}
                    <div className="relative p-6 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group/badge">
                          <div className="absolute inset-0 bg-primary/20 blur-md rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                          <div className="relative flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20 backdrop-blur-sm">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="text-sm font-medium">{exp.employmentDates}</span>
                          </div>
                        </div>
                        {exp.location && (
                          <div className="relative group/badge">
                            <div className="absolute inset-0 bg-accent/20 blur-md rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                            <div className="relative flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-lg border border-accent/20 backdrop-blur-sm">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="text-sm font-medium">{exp.location}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3 pt-2">
                        {exp.responsibilities
                          .slice(0, expandedItems[index] ? exp.responsibilities.length : 3)
                          .map((responsibility, i) => (
                            <div key={i} className="flex items-start gap-3 group/item">
                              <div className="flex-shrink-0 mt-2">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-primary/40 blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                  <div className="relative w-1.5 h-1.5 rounded-full bg-primary/60 group-hover/item:bg-primary group-hover/item:scale-150 transition-all duration-200" />
                                </div>
                              </div>
                              <p className="text-sm md:text-base text-foreground/80 leading-relaxed group-hover/item:text-foreground transition-colors">
                                {responsibility}
                              </p>
                            </div>
                        ))}
                      </div>

                      {/* Expand button */}
                      {exp.responsibilities.length > 3 && (
                        <div className="pt-2">
                          <Button 
                            variant="ghost"
                            onClick={() => toggleExpand(index)}
                            className="text-primary hover:text-accent hover:bg-primary/10 text-sm font-semibold gap-1 h-auto py-2 px-3 rounded-lg"
                          >
                            {expandedItems[index] ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                {tCommon('showLess')}
                              </>
                            ) : (
                              <>
                                {tCommon('seeMore')}
                                <ChevronDown className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {experiences.length > 3 && !showAll && (
        <div className="flex justify-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            onClick={handleShowAll}
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all font-semibold gap-2"
          >
            {t('showAll')}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
