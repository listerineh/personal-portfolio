import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { forAudience } from '@/features/slides/audience';
import { hasLanguage } from '@/features/slides/i18n';
import { getPublicDeck } from '@/features/slides/store';
import { highlightDeck } from '@/features/slides/highlight';
import { PrintDeck } from '@/features/slides/viewer/PrintDeck';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Print', robots: { index: false, follow: false } };


/** The deck laid out for print, in one language (?lang=): headless Chrome turns this page into the PDF. Public decks only. */
export default async function PrintDeckPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const deck = await getPublicDeck(slug);
  if (!deck) notFound();
  const version = forAudience(deck, lang && hasLanguage(deck, lang) ? lang : deck.lang);
  return <PrintDeck deck={version} highlights={await highlightDeck(version)} />;
}
