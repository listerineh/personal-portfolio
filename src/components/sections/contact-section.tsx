'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Ambient, Button, Reveal } from '@/components/ds';
import { cn } from '@/lib/utils';

/** Closing invitation: one large rounded card, one statement, one action, the address as a fallback.
 * After a plain section it has no top padding: the tint card itself marks the change. After a tint section (talks)
 * it takes the section's top padding, so the card doesn't merge with the band above it. */
export function ContactSection({ followsTint = false }: { followsTint?: boolean }) {
  const t = useTranslations('contact');

  return (
    <section id="contact" aria-labelledby="contact-title" className={cn("bg-background px-gutter pb-24 md:pb-32 lg:pb-40", followsTint && "pt-24 md:pt-32 lg:pt-40")}>
      <Reveal className="tint relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-xl px-6 py-16 text-center md:px-12 md:py-28">
        <Ambient intensity="soft" spotlight={false} />
        <h2 id="contact-title" className="text-display-sm mx-auto max-w-[18ch]">
          {t('title')}
        </h2>
        <p className="text-lead mx-auto mt-5 max-w-[48ch] text-muted-foreground">{t('description')}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button href="/contact" accent="amber" size="lg" className="w-full sm:w-auto">
            {t('viewAll')}
          </Button>
          <a
            href={`mailto:${t('directEmailAction')}`}
            className="inline-flex min-h-11 items-center gap-1 break-all rounded-md text-[0.9375rem] font-medium text-primary hover:underline"
          >
            {t('directEmailAction')}
            <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
