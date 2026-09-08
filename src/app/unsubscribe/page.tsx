'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Title, Text, Button } from '@/components/ds';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

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
    } catch (error) {
      setStatus('error');
      setMessage(t('errorMessage'));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-background">
        <div className="max-w-2xl mx-auto">
          <p className="font-headline text-xs tracking-[0.2em] uppercase text-primary/70 mb-6">
            {t('badge')}
          </p>
          <Title as="h1" className="mb-6 text-display-sm">
            {t('title')}
          </Title>
          <Text size="lg" strength="secondary" className="mb-10">
            {t('description')}
          </Text>

          {(status === 'idle' || status === 'loading') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                  {t('emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-background/60 backdrop-blur-sm border border-foreground/15 rounded-lg text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-[border-color,background-color,box-shadow,color] duration-200 ease-out"
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                accent="amber"
                size="lg"
                disabled={status === 'loading'}
                className="w-full sm:w-auto"
              >
                {status === 'loading' ? t('unsubscribing') : t('unsubscribeButton')}
              </Button>
            </form>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <Text size="lg" strength="primary" className="text-center">
                {message}
              </Text>
              <Button variant="secondary" accent="neutral" size="md" href="/">
                {t('backToHome')}
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <XCircle className="w-16 h-16 text-red-500" />
              <Text size="lg" strength="primary" className="text-center text-red-400">
                {message}
              </Text>
              <Button
                variant="primary"
                accent="amber"
                size="md"
                onClick={() => setStatus('idle')}
              >
                {t('tryAgain')}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
