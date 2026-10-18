'use client';

import Image from 'next/image';
import { ArrowUpRight, Mail, Server, Monitor, Cloud, Bot } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Ambient, Button, PageHeader, Reveal, Section } from '@/components/ds';
import { cn } from '@/lib/utils';
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
        ambient
        title={
          <>
            <span className="block">{t('heroGreeting')}</span>
            <span className="block text-muted-foreground">Sebastian.</span>
          </>
        }
        intro={t('heroRole')}
      >
        <p className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          Quito, Ecuador
        </p>
      </PageHeader>

      {/* The statement, large: who I am in one breath. */}
      <section className="px-gutter py-16 md:py-24">
        <Reveal className="mx-auto max-w-[1200px]">
          <p className="max-w-[28ch] text-[clamp(1.625rem,3.6vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.03em]">
            {t('heroDescription')}
          </p>
        </Reveal>
      </section>

      {/* Journey: three stops on a timeline. */}
      <Section id="journey" title={t('journeyTitle')} tone="tint" ambient={{ intensity: 'soft', grid: false, spotlight: false }}>
        <ol className="relative grid gap-5 md:gap-6">
          <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-6 w-px bg-foreground/15 md:left-[19px]" />
          {phases.map(({ id, label, title, body }, index) => (
            <Reveal as="li" key={id} className="relative grid grid-cols-[32px_1fr] gap-4 md:grid-cols-[40px_1fr] md:gap-6">
              <span aria-hidden="true" className="relative mt-7 flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
                <span
                  className={cn(
                    'h-3 w-3 rounded-full ring-4 ring-[rgb(var(--tint))]',
                    index === phases.length - 1 ? 'bg-primary' : 'bg-foreground/40',
                  )}
                />
              </span>
              <div className="panel p-6 md:p-8">
                <p className="text-meta text-muted-foreground">{label}</p>
                <h3 className="text-subhead mt-2">{title}</h3>
                <p className="mt-4 max-w-[64ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* What I do: four areas as cards. */}
      <Section id="expertise" title={t('expertiseTitle')}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {expertise.map(({ id, Icon, title, body }) => (
            <Reveal as="li" key={id} className="panel p-6 md:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.14] text-primary">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-headline mt-5">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Community: the numbers large, the group beside them. */}
      <Section id="community" title={t('communityTitle')} intro={t('communityBody')} tone="tint" ambient={{ halos: false }}>
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <dl className="grid gap-5 sm:grid-cols-3 lg:col-span-7">
            {stats.map(({ stat, label }) => (
              <Reveal key={`${stat}-${label}`} className="panel flex flex-col p-6">
                <dt className="order-2 mt-3 text-[0.9375rem] text-muted-foreground">{label}</dt>
                <dd className="order-1 text-[clamp(2.25rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">{stat}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="panel flex flex-col p-6 md:p-8 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.06]">
                <Image src="/images/gdg_quito_logo.webp" alt="" fill sizes="48px" className="object-contain p-2" />
              </span>
              <h3 className="text-headline">Google Developer Groups · Quito</h3>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{t('communityCardBody')}</p>
            <Button variant="ghost" accent="amber" href={communityLinks.gdgQuito} external className="mt-auto self-start pt-5">
              {t('communityJoin')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Beyond the terminal: music has its own page (/why). */}
      <Section id="music" title={t('musicTitle')}>
        <Reveal className="panel grid gap-6 p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-10">
          <p className="text-lead text-muted-foreground md:col-span-8">{t('musicBody')}</p>
          <div className="md:col-span-4 md:justify-self-end">
            <Button variant="secondary" size="lg" href="/why" className="w-full sm:w-auto">
              {t('musicLink')}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Close: the same lit card as the home page. */}
      <section aria-labelledby="cta-title" className="bg-background px-gutter pb-24 md:pb-32 lg:pb-40">
        <Reveal className="tint relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-xl px-6 py-16 text-center md:px-12 md:py-24">
          <Ambient intensity="soft" spotlight={false} />
          <h2 id="cta-title" className="text-display-sm mx-auto max-w-[18ch]">
            {t('ctaTitle')}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-[52ch] text-muted-foreground">{t('ctaBody')}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button accent="amber" size="lg" href="/contact" className="w-full sm:w-auto">
              <Mail aria-hidden="true" className="h-4 w-4" />
              {t('ctaPrimary')}
            </Button>
            <Button variant="secondary" size="lg" href="/" className="w-full sm:w-auto">
              {t('ctaSecondary')}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
