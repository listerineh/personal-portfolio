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

/** Skip link, header, the page's main landmark, and the footer. */
export function PageShell({ className, children }: PageShellProps) {
  const t = useTranslations('common');
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink>{t('skipToContent')}</SkipLink>
      <Header />
      <main id="main-content" tabIndex={-1} className={cn("flex-grow focus:outline-none", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
