'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const t = useTranslations('contact');
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (descriptionRef.current) {
      gsap.from(descriptionRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section id="contact" className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <Title as="h2" animate className="mb-6 text-display-sm">
          {t('title')}
        </Title>
        <p
          ref={descriptionRef}
          className="text-foreground/50 leading-relaxed mb-10 text-lead"
        >
          {t('description')}
        </p>

        <div className="flex justify-center reveal-up">
          <Button
            href="/contact"
            variant="primary"
            accent="amber"
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            <Mail className="w-4 h-4" />
            {t('viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
}
