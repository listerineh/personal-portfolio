"use client";

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from "next/image";
import { ArrowDown, FileText } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hero } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { useGSAP } from '@/hooks/use-gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const t = useTranslations('hero');
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        // Ensure all elements have final opacity set
        gsap.set([imageContainerRef.current, badgeRef.current, subtitleRef.current, descriptionRef.current], { clearProps: 'all' });
      }
    });

    tl.from(imageContainerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      clearProps: 'opacity,transform',
    })
    .from(badgeRef.current, {
      opacity: 0,
      duration: 0.3,
      clearProps: 'opacity',
    }, '-=0.2')
    .from(titleRef.current?.querySelectorAll('span') || [], {
      y: 20,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      clearProps: 'opacity,transform',
    }, '-=0.1')
    .from(subtitleRef.current, {
      y: 15,
      opacity: 0,
      duration: 0.4,
      clearProps: 'opacity,transform',
    }, '-=0.3')
    .from(descriptionRef.current, {
      opacity: 0,
      duration: 0.3,
      clearProps: 'opacity',
    }, '-=0.2')
    .from(buttonsRef.current?.children || [], {
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      clearProps: 'opacity',
    }, '-=0.1');
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-[100dvh] flex items-center justify-center bg-secondary/0 py-20 pt-28 md:pt-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <div 
          ref={imageRef}
          className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-8 group"
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
          
          <div ref={imageContainerRef} className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-primary hover:border-accent transition-all duration-300 hover:scale-105">
            <Image
              src={hero.href}
              alt={hero.title}
              width={200}
              height={200}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              priority
              fetchPriority="high"
              quality={85}
            />
          </div>
          <div ref={badgeRef} className="relative z-20">
            <Badge 
              disableHover
              className="w-max absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 bg-primary text-primary-foreground text-xs font-bold py-1.5 px-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t('badge')}
            </Badge>
          </div>
        </div>
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-2xl md:text-6xl lg:text-8xl font-headline font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text"
        >
          {splitText(hero.title)}
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-primary font-medium mb-8"
        >
          {t('subtitle')}
        </p>
        <p 
          ref={descriptionRef}
          className="max-w-2xl mx-auto text-muted-foreground mb-12 text-base md:text-lg hover:text-foreground/80 transition-colors duration-300"
        >
          {t('description')}
        </p>
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/docs/CV_SebastianAlvarez_FS_EN.pdf';
              link.download = 'CV_SebastianAlvarez_EN.pdf';
              link.click();
              toast({
                title: t('cvDownloadedTitle'),
                description: t('cvDownloadedDescription'),
              });
            }}
            size="lg" 
            variant="ghost" 
            className="text-accent hover:bg-accent/10 hover:text-accent w-fit sm:w-auto"
          >
            {t('downloadCV')} <FileText className="ml-2 h-5 w-5" />
          </Button>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 hover:shadow-lg group">
              {t('getInTouch')} <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
