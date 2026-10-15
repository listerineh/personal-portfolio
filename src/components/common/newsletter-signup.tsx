'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ds';
import { useToast } from '@/hooks/use-toast';

export function NewsletterSignup() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setEmail('');
      toast({
        title: t('subscribeToastTitle'),
        description: t('subscribeToastDescription'),
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      toast({
        title: t('errorToastTitle'),
        description: t('errorToastDescription'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="plaque my-16 p-6 md:p-10"
    >
      <div className="">
        <h2 className="text-subhead">
          {t('stayUpdated')}
        </h2>
        <p className="mt-2 mb-6 max-w-[56ch] text-muted-foreground">
          {t('stayUpdatedDescription')}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 flex-col md:flex-row w-full">
          <div className="flex-1">
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              aria-label={t('emailPlaceholder')}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            accent="amber"
            size="md"
            disabled={loading || !email}
            className="shrink-0"
          >
            {loading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <Mail aria-hidden="true" className="h-4 w-4" />}
            {loading ? t('subscribing') : t('subscribe')}
          </Button>
        </form>

        {status === 'success' && (
          <div role="status" className="flex items-center gap-2 mt-3 text-sm text-foreground">
            <CheckCircle className="h-4 w-4 shrink-0" />
            {t('successfullySubscribed')}
          </div>
        )}
        {status === 'error' && (
          <div role="alert" className="flex items-center gap-2 mt-3 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {t('failedToSubscribe')}
          </div>
        )}

        <p className="text-catalog mt-4 text-muted-foreground">{t('privacyNote')}</p>
      </div>
    </section>
  );
}
