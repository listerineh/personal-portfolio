import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SLIDES_OG_IMAGE, requestLocale, shareMetadata } from '@/lib/metadata';
import { audienceVersions } from '@/features/slides/audience';
import { hasLanguage, localizeDeck } from '@/features/slides/i18n';
import { getDeckForOwner, getPublicDeck } from '@/features/slides/store';
import { isOwner } from '@/features/slides/auth';
import type { Deck } from '@/features/slides/schema';
import { DeckViewer } from '@/features/slides/viewer/DeckViewer';
import { deckStructuredData } from '@/features/slides/structured-data';

interface DeckPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

/** Public decks for everyone; drafts too when the owner is signed in (the session is only read on a miss). */
async function findDeck(slug: string): Promise<Deck | undefined> {
  return (await getPublicDeck(slug)) ?? ((await isOwner()) ? await getDeckForOwner(slug) : undefined);
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await requestLocale();
  const found = await findDeck(slug);
  if (!found) return { title: locale === 'es' ? 'Presentación no encontrada' : 'Presentation not found', robots: { index: false } };
  // Shared links show the deck in the visitor's language when it has one.
  const lang = hasLanguage(found, locale) ? locale : found.lang;
  const deck = localizeDeck(found, lang);

  return {
    ...shareMetadata({
      title: deck.title,
      description: deck.description,
      path: `/slides/${deck.slug}`,
      // Drafts have no public card (the route serves public decks only); everyone else gets the deck's own.
      image: deck.status === 'draft' ? SLIDES_OG_IMAGE : `/og/slides/${deck.slug}.png?v=${deck.version}&lang=${lang}`,
      imageAlt: deck.title,
      locale: lang,
      type: 'article',
      modifiedTime: deck.updatedAt,
    }),
    ...(deck.status !== 'published' ? { robots: { index: false, follow: false } } : {}),
  };
}


export default async function DeckPage({ params }: DeckPageProps) {
  const { slug } = await params;
  const deck = await findDeck(slug);
  if (!deck) notFound();
  const structuredData = deckStructuredData(deck, await requestLocale());

  return (
    <>
      {deck.status === 'published' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}
      <DeckViewer versions={await audienceVersions(deck)} primaryLang={deck.lang} />
    </>
  );
}
