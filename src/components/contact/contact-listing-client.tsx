'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Check, Clock, Copy, Loader2, Mail, Send } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/data/navigation';
import type { ContactFormData } from '@/types';
import { Input, Textarea, FormField, Button, PageHeader } from '@/components/ds';
import { PageShell } from '@/components/layout';

/** The time in Quito, refreshed every 30s; null until mounted so server and client markup match. */
function useQuitoTime(): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'America/Guayaquil' }).format(new Date());
    const tick = () => setTime(format());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return time;
}

export function ContactListingClient() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const localTime = useQuitoTime();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t('directEmailAction'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the mailto link beside it still works.
    }
  };

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
        setSent(true);
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

  const otherLinks = socialLinks.filter((link) => link.name !== 'Email');
  const collaborationItems = t.raw('collaborationItems') as string[];

  const card = 'panel flex min-h-[132px] flex-col justify-between gap-4 p-5 shadow-card md:p-6';

  return (
    <PageShell>
      <PageHeader ambient title={t('pageTitle')} intro={t('pageDescription')}>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Email: write or copy. */}
          <li className={card}>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
              <Mail aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-meta text-muted-foreground">{t('directEmailTitle')}</p>
              <div className="mt-1 flex items-center gap-2">
                <a
                  href={`mailto:${t('directEmailAction')}`}
                  className="min-w-0 truncate text-[0.9375rem] font-semibold transition-colors duration-snap ease-snap hover:text-primary"
                >
                  {t('directEmailAction')}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? t('emailCopied') : t('copyEmail')}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-snap ease-snap hover:bg-foreground/[0.06] hover:text-foreground active:scale-90"
                >
                  {copied ? <Check aria-hidden="true" className="h-4 w-4 text-primary" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                </button>
              </div>
              <span className="sr-only" aria-live="polite">
                {copied ? t('emailCopied') : ''}
              </span>
            </div>
          </li>
          {/* How fast I answer. */}
          <li className={card}>
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.14]">
              <span aria-hidden="true" className="absolute h-3 w-3 rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
              <span aria-hidden="true" className="relative h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <p className="text-[0.9375rem] font-semibold">{t('responseTime')}</p>
          </li>
          {/* When it is here, so people in other time zones know what to expect. */}
          <li className={card}>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
              <Clock aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-meta text-muted-foreground">{t('localTimeLabel')}</p>
              <p className="mt-1 text-[0.9375rem] font-semibold tabular-nums">{localTime ?? '—'} <span className="font-normal text-muted-foreground">· UTC−5</span></p>
            </div>
          </li>
        </ul>
      </PageHeader>

      <section className="px-gutter pb-24 pt-6 md:pb-32 md:pt-10">
        <div className="mx-auto grid max-w-[1200px] items-start gap-6 lg:grid-cols-12 lg:gap-10">
          {/* The form first: it is the main action on this page. */}
          <div className="panel p-6 md:p-10 lg:col-span-7">
            {sent ? (
              <div role="status" className="grid min-h-[420px] content-center justify-items-start gap-5">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check aria-hidden="true" className="h-7 w-7" strokeWidth={2.5} />
                </span>
                <h2 className="text-subhead">{t('successTitle')}</h2>
                <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{t('sentBody')}</p>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  {t('sendAnother')}
                </Button>
              </div>
            ) : (
              <>
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
                        <Send aria-hidden="true" className="h-4 w-4" />
                        {t('submitButton')}
                      </>
                    )}
                  </Button>
                  <p className="text-meta text-muted-foreground">{t('note')}</p>
                </form>
              </>
            )}
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-span-5">
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
              <ul className="mt-4 flex flex-wrap gap-2">
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tCommon('visitSocial')} ${link.name}`}
                      className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-background px-4 text-sm font-medium shadow-card transition-[transform,color] duration-snap ease-snap hover:text-primary active:scale-95"
                    >
                      <link.icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {link.name}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
