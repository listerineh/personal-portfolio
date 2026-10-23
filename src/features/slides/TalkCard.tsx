'use client';

import { useTranslations } from 'next-intl';
import { DeckCard } from '@/components/ds';
import { useLocale } from '@/context/locale-context';
import type { DeckSummary } from './summary';
import { DeckCover } from './renderer/DeckCover';

/** A published deck as a card: its cover slide, where and when it was given, and its language when it differs. */
export function TalkCard({ deck, headingLevel }: { deck: DeckSummary; headingLevel?: 'h2' | 'h3' }) {
  const t = useTranslations('slidesPage');
  const { locale } = useLocale();
  const date = deck.event?.date ?? deck.updatedAt.slice(0, 10);
  const meta = [
    deck.event?.name,
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`)),
    deck.lang !== locale ? t(`lang.${deck.lang}`) : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <DeckCard
      href={`/slides/${deck.slug}`}
      title={deck.title}
      description={deck.description}
      meta={meta}
      viewLabel={t('view')}
      headingLevel={headingLevel}
      preview={<DeckCover deck={deck} />}
    />
  );
}
