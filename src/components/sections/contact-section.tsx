"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from '@/hooks/use-gsap';
import type { ContactFormData } from "@/types";
import { SectionLabel, Title, Input, Textarea, FormField, Button } from '@/components/ds';

export function ContactSection() {
  const t = useTranslations('contact');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contactFormSchema = z.object({
    name: z.string().min(2, { message: t('nameError') }),
    email: z.string().email({ message: t('emailError') }),
    message: z.string().min(10, { message: t('messageError') }),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
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

    fieldsRef.current.forEach((field, index) => {
      if (field) {
        gsap.from(field, {
          opacity: 0,
          duration: 0.4,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: field,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
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
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: t('unexpectedError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden">
      {/* Dark tinted background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.03), transparent)' }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <SectionLabel accent="amber" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
          <Title as="h2" animate className="mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
            {t('title')}
          </Title>
          <p
            ref={descriptionRef}
            className="text-foreground/50 leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
          >
            {t('description')}
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
    </section>
  );
}
