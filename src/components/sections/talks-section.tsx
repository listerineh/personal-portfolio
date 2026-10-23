'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Button, Carousel, Reveal, Section } from '@/components/ds';
import { TalkCard } from '@/features/slides/TalkCard';
import type { DeckSummary } from '@/features/slides/summary';

/** Speaking: the latest talks on a shelf, each opening its slides. Hidden until there is a published one. */
export function TalksSection({ talks }: { talks: DeckSummary[] }) {
  const t = useTranslations('slidesPage');
  const tSala = useTranslations('sala');
  if (talks.length === 0) return null;

  return (
    <Section
      id="talks"
      tone="tint"
      title={t('sectionTitle')}
      intro={t('sectionIntro')}
      bleed
      aside={
        <Button variant="ghost" accent="amber" href="/slides">
          {t('viewAll')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <Reveal>
        <Carousel label={t('carouselLabel')} previousLabel={tSala('previous')} nextLabel={tSala('next')}>
          {talks.map((deck) => (
            <TalkCard key={deck.slug} deck={deck} />
          ))}
        </Carousel>
      </Reveal>
    </Section>
  );
}
