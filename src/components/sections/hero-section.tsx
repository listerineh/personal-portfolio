"use client";

import { useEffect, useRef } from 'react';
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
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(imageRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
    })
    .from(badgeRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, '-=0.4')
    .from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
    }, '-=0.3')
    .from(titleRef.current?.querySelectorAll('span') || [], {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
    }, '-=0.6')
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
    }, '-=0.4')
    .from(descriptionRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, '-=0.3')
    .from(buttonsRef.current?.children || [], {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
    }, '-=0.2');

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        y: 150,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (imageRef.current) {
      imageRef.current.addEventListener('mouseenter', () => {
        gsap.to(imageRef.current, {
          scale: 1.1,
          rotation: 5,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      imageRef.current.addEventListener('mouseleave', () => {
        gsap.to(imageRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    }
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
      <div className="container mx-auto px-4 text-center z-10">
        <div 
          ref={imageRef}
          className="relative w-36 h-36 md:w-48 md:h-48 mx-auto mb-8"
        >
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-primary">
            <Image
              src={hero.href}
              alt={hero.title}
              width={200}
              height={200}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div ref={badgeRef}>
            <Badge 
              className="w-max absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 bg-primary text-primary-foreground text-xs font-bold py-1.5 px-4 shadow-lg"
            >
              +5 Years Experience
            </Badge>
          </div>
        </div>
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground mb-4"
        >
          {splitText(hero.title)}
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-primary font-medium mb-8"
        >
          {hero.subtitle}
        </p>
        <p 
          ref={descriptionRef}
          className="max-w-2xl mx-auto text-muted-foreground mb-12 text-base md:text-lg"
        >
          {hero.description}
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
                title: "CV Downloaded!",
                description: "Thank you for downloading my CV. I hope you find it useful.",
              });
            }}
            size="lg" 
            variant="ghost" 
            className="text-accent hover:bg-accent/10 hover:text-accent w-fit sm:w-auto"
          >
            Download CV <FileText className="ml-2 h-5 w-5" />
          </Button>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
              Get in Touch <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
