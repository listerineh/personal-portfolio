'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Check, ArrowUpRight } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/data/navigation';
import type { ContactFormData } from '@/types';
import { Input, Textarea, FormField, Button, PageHeader } from '@/components/ds';
import { PageShell } from '@/components/layout';

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
    <PageShell>
      <PageHeader ambient title={t('pageTitle')} intro={t('pageDescription')}>
        {emailLink && (
          <div className="grid gap-3">
            <a
              href={emailLink.url}
              className="group inline-flex max-w-full items-center gap-2 break-all text-[clamp(1.25rem,4vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground transition-colors duration-snap ease-snap hover:text-primary"
            >
              {t('directEmailAction')}
              <ArrowUpRight aria-hidden="true" className="h-6 w-6 shrink-0 transition-transform duration-snap ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="inline-flex h-9 w-fit items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
              {t('responseTime')}
            </p>
          </div>
        )}
      </PageHeader>

      <section className="px-gutter pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="grid gap-5 lg:col-span-5">
            <p className="text-lead max-w-[48ch] pb-3 text-muted-foreground">{t('note')}</p>

            <div className="panel p-6 md:p-7">
              <h2 className="text-headline">{t('collaborationTitle')}</h2>
              <ul className="mt-4 grid gap-3">
                {collaborationItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel p-6 md:p-7">
              <h2 className="text-headline">{t('connectTitle')}</h2>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tCommon('visitSocial')} ${link.name}`}
                      className="flex min-h-11 items-center gap-2.5 rounded-full bg-background px-4 text-sm font-medium shadow-card transition-[transform,color] duration-snap ease-snap hover:text-primary active:scale-95"
                    >
                      <link.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel p-6 md:p-10 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-7">
            <h2 className="text-subhead">{t('formTitle')}</h2>
            <p className="mt-2 text-muted-foreground">{t('formIntro')}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label={t('nameLabel')} error={errors.name?.message} required>
                  <Input id="name" type="text" autoComplete="name" placeholder={t('namePlaceholder')} error={!!errors.name} {...register('name')} />
                </FormField>
                <FormField label={t('emailLabel')} error={errors.email?.message} required>
                  <Input id="email" type="email" autoComplete="email" placeholder={t('emailPlaceholder')} error={!!errors.email} {...register('email')} />
                </FormField>
              </div>
              <FormField label={t('messageLabel')} error={errors.message?.message} required>
                <Textarea id="message" placeholder={t('messagePlaceholder')} rows={6} error={!!errors.message} {...register('message')} />
              </FormField>
              <Button type="submit" accent="amber" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                    {t('submittingButton')}
                  </>
                ) : (
                  <>
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    {t('submitButton')}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
