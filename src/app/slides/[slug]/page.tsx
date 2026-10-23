import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE, requestLocale, shareMetadata } from '@/lib/metadata';
import { getPublicDeck } from '@/features/slides/store';
import type { Deck } from '@/features/slides/schema';
import { DeckViewer } from '@/features/slides/viewer/DeckViewer';

interface DeckPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await requestLocale();
  const deck = await getPublicDeck(slug);
  if (!deck) return { title: locale === 'es' ? 'Presentación no encontrada' : 'Presentation not found', robots: { index: false } };

  return {
    ...shareMetadata({
      title: deck.title,
      description: deck.description,
      path: `/slides/${deck.slug}`,
      // A per-deck cover image arrives with the OG route (phase 2).
      image: DEFAULT_OG_IMAGE,
      imageAlt: deck.title,
      locale: deck.lang,
      type: 'article',
      modifiedTime: deck.updatedAt,
    }),
    ...(deck.status === 'unlisted' ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Speaker notes never reach the audience's browser. */
function forAudience(deck: Deck): Deck {
  return { ...deck, slides: deck.slides.map(({ notes: _notes, ...slide }) => slide) };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params;
  const deck = await getPublicDeck(slug);
  if (!deck) notFound();

  return <DeckViewer deck={forAudience(deck)} />;
}
