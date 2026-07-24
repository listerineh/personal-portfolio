'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Title, Text, SectionLabel } from '@/components/ds';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');
  
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-primary/10 border border-primary/20 p-5">
            <AlertTriangle className="h-10 w-10 text-primary" />
          </div>
        </div>

        <SectionLabel accent="amber" className="mb-5">{t('errorCode')}</SectionLabel>
        <Title as="h1" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }} className="mb-4">
          {t('title')}
        </Title>
        <Text size="base" strength="secondary" className="max-w-sm mx-auto mb-10">
          {t('description')}
        </Text>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted/50 p-4 rounded-xl border border-foreground/[0.06] text-left mb-8">
            <p className="text-xs font-mono text-primary/80 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" accent="neutral" size="md" onClick={reset}>
            {t('tryAgain')}
          </Button>
          <Button variant="primary" accent="amber" size="md" onClick={() => { window.location.href = '/'; }}>
            {t('goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
