import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { forAudience } from '@/features/slides/audience';
import { getPublicDeck } from '@/features/slides/store';
import { highlightDeck } from '@/features/slides/highlight';
import { PrintDeck } from '@/features/slides/viewer/PrintDeck';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Print', robots: { index: false, follow: false } };


/** The deck laid out for print: headless Chrome turns this page into the downloadable PDF. Public decks only. */
export default async function PrintDeckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = await getPublicDeck(slug);
  if (!deck) notFound();
  return <PrintDeck deck={forAudience(deck)} highlights={await highlightDeck(deck)} />;
}
