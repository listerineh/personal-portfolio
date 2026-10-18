'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ds';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <main id="main-content" className="tint flex min-h-screen items-center px-gutter py-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <AlertTriangle aria-hidden="true" className="h-8 w-8" />
        <p className="text-meta mt-6 text-muted-foreground">{t('errorCode')}</p>
        <h1 className="text-display-sm mt-3 max-w-[20ch]">{t('title')}</h1>
        <p className="text-lead mt-5 max-w-[48ch] text-muted-foreground">{t('description')}</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="panel mt-8 max-w-2xl overflow-x-auto p-4 font-mono text-xs">{error.message}</pre>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button accent="amber" size="lg" onClick={reset} className="w-full sm:w-auto">
            {t('tryAgain')}
          </Button>
          <Button variant="secondary" size="lg" href="/" className="w-full sm:w-auto">
            {t('goHome')}
          </Button>
        </div>
      </div>
    </main>
  );
}
