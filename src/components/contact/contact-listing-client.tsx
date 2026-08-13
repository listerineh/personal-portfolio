'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useGSAP } from '@/hooks/use-gsap';
import { socialLinks } from '@/lib/data';
import type { ContactFormData } from '@/types';
import { SectionLabel, Title, Text, Input, Textarea, FormField, Button, AccentCard } from '@/components/ds';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactListingClient() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFormSchema = z.object({
    name: z.string().min(2, { message: t('nameError') }),
    email: z.string().email({ message: t('emailError') }),
    message: z.string().min(10, { message: t('messageError') }),
  });

  const infoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    [infoRef.current, formCardRef.current].forEach((el, index) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });

    fieldsRef.current.forEach((field, index) => {
      if (field) {
        gsap.from(field, {
          opacity: 0,
          duration: 0.4,
          delay: 0.2 + index * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: field, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        toast({
          title: t('successTitle'),
          description: result.message,
        });
        reset();
      } else {
        toast({
          title: t('errorTitle'),
          description: result.message || t('errorMessage'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('errorTitle'),
        description: t('unexpectedError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailLink = socialLinks.find((link) => link.name === 'Email');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.03), transparent)' }} />
          <div
            className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
            style={{ top: '4%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
          >
            {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            <div className="mb-16 text-center">
              <SectionLabel accent="amber" className="mb-6 reveal-up">{t('badge')}</SectionLabel>
              <Title as="h1" animate className="mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
                {t('pageTitle')}
              </Title>
              <Text size="base" strength="secondary" animate className="max-w-2xl mx-auto">
                {t('pageDescription')}
              </Text>
            </div>

            <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-12 items-start">
              {/* Left: contact info */}
              <div ref={infoRef} className="space-y-6">
                {emailLink && (
                  <AccentCard accent="amber" className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="font-headline text-[10px] tracking-[0.25em] uppercase text-primary">
                        {t('directEmailTitle')}
                      </span>
                    </div>
                    <a
                      href={emailLink.url}
                      className="font-headline font-bold text-foreground hover:text-primary transition-colors break-all"
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
                    >
                      {emailLink.url.replace('mailto:', '')}
                    </a>
                  </AccentCard>
                )}

                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-foreground/40" />
                    <span className="text-sm text-foreground/50">{t('responseTime')}</span>
                  </div>

                  <p className="font-headline text-[10px] tracking-[0.25em] uppercase text-foreground/35 mb-4">
                    {t('connectTitle')}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.filter((link) => link.name !== 'Email').map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${tCommon('visitSocial')} ${link.name}`}
                        className="p-3 rounded-xl border border-foreground/10 text-foreground/50 hover:text-primary hover:border-primary/30 transition-colors duration-200"
                      >
                        <link.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div ref={formCardRef} className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div ref={(el) => { fieldsRef.current[0] = el; }}>
                    <FormField label={t('nameLabel')} error={errors.name?.message} required>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('namePlaceholder')}
                        accent="amber"
                        error={!!errors.name}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        {...register('name')}
                      />
                    </FormField>
                  </div>

                  <div ref={(el) => { fieldsRef.current[1] = el; }}>
                    <FormField label={t('emailLabel')} error={errors.email?.message} required>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        accent="amber"
                        error={!!errors.email}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        {...register('email')}
                      />
                    </FormField>
                  </div>

                  <div ref={(el) => { fieldsRef.current[2] = el; }}>
                    <FormField label={t('messageLabel')} error={errors.message?.message} required>
                      <Textarea
                        id="message"
                        placeholder={t('messagePlaceholder')}
                        rows={6}
                        accent="amber"
                        error={!!errors.message}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        {...register('message')}
                      />
                    </FormField>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    accent="amber"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />{t('submittingButton')}</>
                    ) : (
                      <><Mail className="w-4 h-4" />{t('submitButton')}</>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
