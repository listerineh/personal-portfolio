'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import type { Experience } from '@/types';
import { Title, Text, EndOfList } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceListingClientProps {
  experiences: Experience[];
}

export function ExperienceListingClient({ experiences }: ExperienceListingClientProps) {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          opacity: 0,
          y: 28,
          duration: 0.5,
          delay: Math.min(index * 0.08, 0.4),
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [experiences.length]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-16 text-center">
              <Title as="h1" animate className="mb-4 text-display-sm">
                {t('pageTitle')}
              </Title>
              <Text size="base" strength="secondary" animate className="max-w-2xl mx-auto">
                {t('pageDescription')}
              </Text>
            </div>

            {experiences.length > 0 ? (
              <>
                <div className="divide-y divide-foreground/10">
                  {experiences.map((exp, index) => (
                  <div
                    key={index}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-16 first:pt-0 last:pb-0"
                  >
                    {/* Dates & location */}
                    <div className="flex flex-row md:flex-col flex-wrap items-center md:items-start gap-x-4 gap-y-1.5">
                      <span className="inline-flex items-center gap-1.5 font-headline text-[11px] font-bold tracking-[0.15em] uppercase text-amber-400">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {exp.employmentDates}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-foreground/40">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Role details */}
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="shrink-0">
                          {exp.logoUrl ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden relative border border-primary/20">
                              <Image src={exp.logoUrl} alt={`${exp.company} logo`} fill sizes="48px" className="object-cover" />
                            </div>
                          ) : (
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/[0.08] border border-primary/20"
                            >
                              <Briefcase className="w-5 h-5 text-foreground/40" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-headline font-bold text-foreground leading-tight text-headline">
                            {exp.jobTitle}
                          </h3>
                          <p className="text-sm font-semibold text-foreground/50 mt-0.5">{exp.company}</p>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="mt-2 shrink-0 w-1 h-1 rounded-full bg-primary/50"
                            />
                            <p className="text-sm text-foreground/65 leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                </div>
                <EndOfList>{tCommon('endOfList')}</EndOfList>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/50 text-lg">{t('noResults')}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
