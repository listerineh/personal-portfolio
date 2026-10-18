'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import { PageShell } from '@/components/layout';
import { Button, FormField, Input, PageHeader } from '@/components/ds';
import { CheckCircle, XCircle } from 'lucide-react';

export default function UnsubscribePage() {
  const t = useTranslations('unsubscribe');
  const { locale } = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle' as 'idle' | 'loading' | 'success' | 'error');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || t('successMessage'));
      } else {
        setStatus('error');
        setMessage(data.error || t('errorMessage'));
      }
    } catch {
      setStatus('error');
      setMessage(t('errorMessage'));
    }
  };

  return (
    <PageShell>
      <PageHeader title={t('title')} titleSize="section" intro={t('description')} />
      <section className="px-gutter py-16 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="panel max-w-xl p-6 md:p-8" aria-live="polite">
            {(status === 'idle' || status === 'loading') && (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <FormField label={t('emailLabel')} required>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                  />
                </FormField>
                <Button type="submit" accent="amber" size="lg" disabled={status === 'loading'} className="w-full sm:w-auto">
                  {status === 'loading' ? t('unsubscribing') : t('unsubscribeButton')}
                </Button>
              </form>
            )}

            {status === 'success' && (
              <div role="status" className="grid gap-5">
                <CheckCircle aria-hidden="true" className="h-8 w-8" />
                <p className="text-lead">{message}</p>
                <div>
                  <Button variant="secondary" href="/">
                    {t('backToHome')}
                  </Button>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div role="alert" className="grid gap-5">
                <XCircle aria-hidden="true" className="h-8 w-8 text-destructive" />
                <p className="text-lead font-medium text-destructive">{message}</p>
                <div>
                  <Button accent="amber" onClick={() => setStatus('idle')}>
                    {t('tryAgain')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
