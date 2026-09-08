'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Check, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useGSAP } from '@/hooks/use-gsap';
import { socialLinks } from '@/lib/data';
import type { ContactFormData } from '@/types';
import { Title, Input, Textarea, FormField, Button } from '@/components/ds';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    [headerRef.current, infoRef.current, formRef.current].forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }
    });

    fieldsRef.current.forEach((field, index) => {
      if (field) {
        gsap.fromTo(
          field,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.25 + index * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: field, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
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
  const otherLinks = socialLinks.filter((link) => link.name !== 'Email');
  const collaborationItems = t.raw('collaborationItems') as string[];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
            {/* Header */}
            <div ref={headerRef} style={{ opacity: 0 }} className="mb-16 md:mb-20 max-w-3xl">
              <Title as="h1" className="text-display-sm mb-5">
                {t('pageTitle')}
              </Title>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed">
                {t('pageDescription')}
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
              {/* Left: contact info */}
              <div ref={infoRef} style={{ opacity: 0 }} className="space-y-12">
                {/* Email */}
                {emailLink && (
                  <div>
                    <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70 mb-3 block">
                      {t('directEmailTitle')}
                    </span>
                    <a
                      href={emailLink.url}
                      className="group inline-flex items-center gap-2 font-headline font-bold text-2xl md:text-3xl text-foreground hover:text-primary transition-colors break-all"
                    >
                      {t('directEmailAction')}
                      <ArrowUpRight className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                    <p className="mt-3 text-sm text-foreground/50 leading-relaxed max-w-md">
                      {t('note')}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wide text-foreground/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t('responseTime')}
                    </p>
                  </div>
                )}

                {/* Collaboration */}
                <div className="border-l-2 border-primary/20 pl-5 py-1">
                  <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70 mb-3 block">
                    {t('collaborationTitle')}
                  </span>
                  <ul className="space-y-2.5">
                    {collaborationItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/70">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social links */}
                <div>
                  <span className="text-xs font-headline font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
                    {t('connectTitle')}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {otherLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${tCommon('visitSocial')} ${link.name}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-foreground/[0.08] bg-card/30 text-foreground/70 hover:text-primary hover:border-primary/25 hover:bg-primary/[0.02] transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.97]"
                      >
                        <link.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div ref={formRef} style={{ opacity: 0 }} className="rounded-2xl border border-foreground/[0.08] bg-card/40 p-6 md:p-8">
                <div ref={(el) => { fieldsRef.current[0] = el; }}>
                  <h2 className="font-headline font-bold text-foreground text-xl mb-2">
                    {t('formTitle')}
                  </h2>
                  <p className="text-sm text-foreground/55 mb-8">
                    {t('formIntro')}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div ref={(el) => { fieldsRef.current[1] = el; }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div ref={(el) => { fieldsRef.current[3] = el; }}>
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
                  </div>
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
