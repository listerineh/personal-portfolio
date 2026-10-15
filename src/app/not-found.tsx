'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ds';
import { PageShell } from '@/components/layout';

/** An empty wall: nothing hangs here. The way back, and rooms worth visiting. */
export default function NotFound() {
  const t = useTranslations('notFound');
  const rooms = [
    { href: '/projects', key: 'projects' },
    { href: '/blog', key: 'blog' },
    { href: '/experience', key: 'experience' },
    { href: '/contact', key: 'contact' },
  ] as const;

  return (
    <PageShell>
      <section className="wall px-gutter pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="mx-auto grid max-w-[1296px] gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p aria-hidden="true" className="text-[clamp(5rem,24vw,12rem)] font-light leading-[0.8] tabular-nums text-muted-foreground [font-stretch:125%]">
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
            <ul className="mt-4 divide-y divide-foreground/25 border-y border-foreground/25">
              {rooms.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="flex min-h-12 items-center py-2 text-base font-semibold underline-offset-[0.3em] hover:underline">
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
