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
      className="my-12 rounded-2xl p-8"
      style={{
        border: '1px solid var(--primary-border)',
        background: 'var(--primary-bg)',
      }}
    >
      <div className="">
        <h3 className="text-2xl font-headline font-bold mb-2 text-foreground">
          {t('stayUpdated')}
        </h3>
        <p className="text-foreground/50 text-sm leading-relaxed mb-6">
          {t('stayUpdatedDescription')}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 flex-col md:flex-row w-full">
          <div className="flex-1">
            <Input
              type="email"
              placeholder={t('emailPlaceholder')}
              accent="amber"
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
            className="text-black shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            {loading ? t('subscribing') : t('subscribe')}
          </Button>
        </form>

        {status === 'success' && (
          <div className="flex items-center gap-2 mt-3 text-sm text-emerald-500">
            <CheckCircle className="h-4 w-4 shrink-0" />
            {t('successfullySubscribed')}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 mt-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {t('failedToSubscribe')}
          </div>
        )}

        <p className="text-xs text-foreground/30 mt-4">{t('privacyNote')}</p>
      </div>
    </section>
  );
}
