'use client';

import { Reveal } from '@/components/ds';
import { useLocale } from '@/context/locale-context';
import type { Locale } from '@/i18n/config';
import type { DeckSummary } from './summary';
import { TalkCard } from './TalkCard';

/** Every published talk as a card, in the site's current language. */
export function TalkGrid({ byLocale }: { byLocale: Record<Locale, DeckSummary[]> }) {
  const { locale } = useLocale();
  const decks = byLocale[locale] ?? byLocale.en;
  return (
    <Reveal as="ul" className="grid gap-6 md:grid-cols-2 md:gap-8">
      {decks.map((deck) => (
        <li key={deck.slug}>
          <TalkCard deck={deck} headingLevel="h2" />
        </li>
      ))}
    </Reveal>
  );
}
