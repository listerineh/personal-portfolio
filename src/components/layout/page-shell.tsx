'use client';

import { useTranslations } from 'next-intl';
import { SkipLink } from '@/components/ds';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '@/lib/utils';

interface PageShellProps {
  className?: string;
  children: React.ReactNode;
}

/** Skip link, header, the page's main landmark, and the exit wall. */
export function PageShell({ className, children }: PageShellProps) {
  const t = useTranslations('common');
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink>{t('skipToContent')}</SkipLink>
      <Header />
      <main id="main-content" className={cn('flex-grow', className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
