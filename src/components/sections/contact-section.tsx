'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button, Room } from '@/components/ds';

/** Room 05 · Contact. The last room before the exit wall: one statement, one action. */
export function ContactSection() {
  const t = useTranslations('contact');
  const tSala = useTranslations('sala');

  return (
    <Room id="contact" number="05" name={tSala('contact')} title={t('title')} intro={t('description')}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button href="/contact" accent="amber" size="lg" className="w-full sm:w-auto">
          {t('viewAll')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
        <a
          href={`mailto:${t('directEmailAction')}`}
          className="text-catalog inline-flex min-h-11 items-center break-all text-foreground underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
        >
          {t('directEmailAction')}
        </a>
      </div>
    </Room>
  );
}
