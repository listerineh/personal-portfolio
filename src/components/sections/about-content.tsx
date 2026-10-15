'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, Server, Monitor, Cloud, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button, Hang, PageHeader, Plaque } from '@/components/ds';
import { communityLinks } from '@/lib/data/navigation';

export function AboutContent() {
  const t = useTranslations('about');

  const phases = [
    { id: 'phase1', label: t('phase1Label'), title: t('phase1Title'), body: t('phase1Body') },
    { id: 'phase2', label: t('phase2Label'), title: t('phase2Title'), body: t('phase2Body') },
    { id: 'phase3', label: t('phase3Label'), title: t('phase3Title'), body: t('phase3Body') },
  ];

  const expertise = [
    { id: 'backend',   Icon: Server,   title: t('expertise1Title'), body: t('expertise1Body') },
    { id: 'frontend',  Icon: Monitor,  title: t('expertise2Title'), body: t('expertise2Body') },
    { id: 'cloud',     Icon: Cloud,    title: t('expertise3Title'), body: t('expertise3Body') },
    { id: 'ai',        Icon: Bot, title: t('expertise4Title'), body: t('expertise4Body') },
  ];

  const stats = [
    { stat: t('communityStat1'), label: t('communityStat1Label') },
    { stat: t('communityStat2'), label: t('communityStat2Label') },
    { stat: t('communityStat3'), label: t('communityStat3Label') },
  ];

  return (
    <>
      <PageHeader
        name={t('heroGreeting')}
        title={
          <>
            <span className="block">{t('heroGreeting')}</span>
            <span className="block">Sebastian.</span>
          </>
        }
        intro={t('heroRole')}
      >
        <p className="text-catalog text-muted-foreground">Quito, Ecuador</p>
      </PageHeader>

      {/* Statement beside the portrait */}
      <section className="px-gutter py-20 md:py-28">
        <div className="mx-auto grid max-w-[1296px] items-end gap-12 lg:grid-cols-12 lg:gap-6">
          <p className="text-subhead max-w-[30ch] !leading-[1.3] lg:col-span-7">{t('heroDescription')}</p>
          <Hang className="max-w-sm lg:col-span-4 lg:col-start-9">
            <div className="plaque p-2 shadow-hang sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image src="/images/sebastian_alvarez_photo.webp" alt="Sebastian Alvarez" fill sizes="(max-width: 1024px) 384px, 30vw" className="object-cover" />
              </div>
            </div>
          </Hang>
        </div>
      </section>

      {/* Journey */}
      <section aria-labelledby="journey-title" className="px-gutter pb-20 md:pb-28">
        <div className="mx-auto max-w-[1296px]">
          <h2 id="journey-title" className="text-display-sm">
            {t('journeyTitle')}
          </h2>
          <ol className="mt-12">
            {phases.map(({ id, label, title, body }) => (
              <li key={id} className="grid gap-3 border-t border-foreground/20 py-10 md:grid-cols-12 md:gap-6 md:py-14">
                <p className="text-catalog text-muted-foreground md:col-span-3">{label}</p>
                <div className="md:col-span-8">
                  <h3 className="text-subhead">{title}</h3>
                  <p className="text-lead mt-4 max-w-[62ch] text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Expertise on a painted wall */}
      <section aria-labelledby="expertise-title" className="wall px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-[1296px]">
          <h2 id="expertise-title" className="text-display-sm">
            {t('expertiseTitle')}
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {expertise.map(({ id, Icon, title, body }) => (
              <li key={id} className="border-t border-foreground/25 pt-6">
                <Icon aria-hidden="true" className="h-6 w-6" />
                <h3 className="text-headline mt-4">{title}</h3>
                <p className="mt-3 max-w-[56ch] text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community */}
      <section aria-labelledby="community-title" className="px-gutter py-20 md:py-28">
        <div className="mx-auto grid max-w-[1296px] items-start gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h2 id="community-title" className="text-display-sm">
              {t('communityTitle')}
            </h2>
            <p className="text-lead mt-6 max-w-[60ch] text-muted-foreground">{t('communityBody')}</p>
            <dl className="mt-10 border-t border-foreground/20">
              {stats.map(({ stat, label }) => (
                <div key={`${stat}-${label}`} className="flex items-baseline gap-4 border-b border-foreground/20 py-4">
                  <dt className="order-2 text-base text-muted-foreground">{label}</dt>
                  <dd className="w-20 shrink-0 text-headline tabular-nums">{stat}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Plaque className="lg:col-span-4 lg:col-start-9">
            <div className="flex items-center gap-4">
              <Image src="/images/gdg_quito_logo.webp" alt="" width={48} height={48} className="h-12 w-12 shrink-0" />
              <h3 className="text-headline">Google Developer Groups · Quito</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t('communityCardBody')}</p>
            <a
              href={communityLinks.gdgQuito}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
            >
              {t('communityJoin')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Plaque>
        </div>
      </section>

      {/* Beyond the terminal: music has its own room (/why) */}
      <section aria-labelledby="music-title" className="border-t border-foreground/20 px-gutter py-20 md:py-28">
        <div className="mx-auto grid max-w-[1296px] gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 id="music-title" className="text-display-sm lg:col-span-6">
            {t('musicTitle')}
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-muted-foreground">{t('musicBody')}</p>
            <Button variant="secondary" href="/why" className="mt-6">
              {t('musicLink')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Close */}
      <section aria-labelledby="cta-title" className="wall px-gutter py-20 md:py-28">
        <div className="mx-auto max-w-[1296px]">
          <h2 id="cta-title" className="text-display-sm max-w-[18ch]">
            {t('ctaTitle')}
          </h2>
          <p className="text-lead mt-6 max-w-[52ch] text-muted-foreground">{t('ctaBody')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button accent="amber" size="lg" href="/contact" className="w-full sm:w-auto">
              <Mail aria-hidden="true" className="h-4 w-4" />
              {t('ctaPrimary')}
            </Button>
            <Button variant="secondary" size="lg" href="/" className="w-full sm:w-auto">
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
