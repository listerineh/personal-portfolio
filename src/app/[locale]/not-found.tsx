'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Home } from 'lucide-react';
import { Button, Ambient } from '@/components/ds';
import { PageShell } from '@/components/layout';

/** Nothing here: the way back, and a few pages worth visiting. */
export default function NotFound() {
  const t = useTranslations('notFound');
  const rooms = [
    { href: '/projects', key: 'projects' },
    { href: '/blog', key: 'blog' },
    { href: '/#career', key: 'experience' },
    { href: '/contact', key: 'contact' },
  ] as const;

  return (
    <PageShell>
      <section className="relative isolate overflow-clip bg-background px-gutter pb-24 pt-[calc(var(--header-h)+4rem)] md:pb-32 md:pt-[calc(var(--header-h)+7rem)]">
        <Ambient />
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-[clamp(5rem,24vw,12rem)] font-bold leading-[0.85] tracking-[-0.06em] tabular-nums text-muted-foreground/50">
              404
            </p>
            <h1 className="text-display-sm mt-8">{t('title')}</h1>
            <p className="text-lead mt-5 max-w-[48ch] text-muted-foreground">{t('description')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button accent="amber" size="lg" href="/" className="w-full sm:w-auto">
                <Home aria-hidden="true" className="h-4 w-4" />
                {t('goHome')}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => history.back()} className="w-full sm:w-auto">
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                {t('goBack')}
              </Button>
            </div>
          </div>
          <nav aria-labelledby="nf-rooms" className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <h2 id="nf-rooms" className="text-headline">
              {t('interestedIn')}
            </h2>
            <ul className="panel mt-4 grid gap-0.5 p-2">
              {rooms.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="flex min-h-12 items-center justify-between rounded-[14px] px-4 text-base font-medium transition-colors duration-snap ease-snap hover:bg-foreground/[0.05] hover:text-primary">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
