'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold text-primary">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted p-4 rounded-lg text-left">
            <p className="text-xs font-mono text-destructive break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="outline"
          >
            {t('tryAgain')}
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t('goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
