'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button, Input, Ambient } from '@/components/ds';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'compact' | 'bare';
}

export function NewsletterSubscribe({ variant = 'default' }: NewsletterSubscribeProps) {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('invalidEmailMessage'));
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t('successMessage'));
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || t('errorMessage'));
      }
    } catch {
      setStatus('error');
      setMessage(t('failedMessage'));
    }
  };

  const busy = status === 'loading' || status === 'success';
  const messageId = 'newsletter-message';

  const buttonContent =
    status === 'loading' ? (
      <>
        <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
        {t('subscribingButton')}
      </>
    ) : status === 'success' ? (
      <>
        <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
        {t('subscribedButton')}
      </>
    ) : (
      <>
        <Mail aria-hidden="true" className="h-4 w-4" />
        {t('subscribeButton')}
      </>
    );

  const feedback = message ? (
    <p
      id={messageId}
      role={status === 'error' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2 text-sm', status === 'success' ? 'text-foreground' : 'font-medium text-destructive')}
    >
      {status === 'success' ? (
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
    </p>
  ) : null;

  const field = (placeholder: string) => (
    <Input
      type="email"
      autoComplete="email"
      required
      aria-label={placeholder}
      aria-describedby={message ? messageId : undefined}
      error={status === 'error'}
      placeholder={placeholder}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );

  if (variant === 'compact') {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">{field(t('compactPlaceholder'))}</div>
          <Button type="submit" accent="amber" disabled={busy} aria-label={t('subscribeButton')}>
            {status === 'loading' ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
            ) : status === 'success' ? (
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
            ) : (
              t('compactSubscribeButton')
            )}
          </Button>
        </form>
        {feedback && <div className="mt-3">{feedback}</div>}
      </div>
    );
  }

  const form = (
    <form onSubmit={handleSubmit} className="grid w-full gap-3">
      {field(t('emailPlaceholder'))}
      <Button type="submit" accent="amber" size="lg" disabled={busy} className="w-full">
        {buttonContent}
      </Button>
      {feedback}
      <p className="text-meta text-muted-foreground">
        {t('secureLabel')} · {t('privateLabel')} ·{' '}
        <Link
          href="/unsubscribe"
          className="underline decoration-foreground/30 underline-offset-[0.2em] transition-colors duration-snap ease-snap hover:text-foreground hover:decoration-foreground motion-reduce:transition-none"
        >
          {t('unsubscribeLink')}
        </Link>
      </p>
    </form>
  );

  if (variant === 'bare') {
    return form;
  }

  // Default: a soft-lit card between posts.
  return (
    <aside className="panel relative isolate my-2 grid gap-6 overflow-hidden p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-12">
      <Ambient intensity="soft" grid={false} spotlight={false} />
      <h2 className="text-display-sm md:col-span-6">{t('dontMissNextPost')}</h2>
      <div className="md:col-span-6">{form}</div>
    </aside>
  );
}
