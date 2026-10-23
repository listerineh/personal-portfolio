import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { isOwner } from '@/features/slides/auth';
import { getDeckForOwner } from '@/features/slides/store';
import { DeckEditor } from '@/features/slides/editor/DeckEditor';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit slides',
  robots: { index: false, follow: false },
};

/** The editor, for the owner only; anyone else is sent to the sign-in. */
export default async function EditDeckPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isOwner())) redirect('/slides/manage');
  const { slug } = await params;
  const deck = await getDeckForOwner(slug);
  if (!deck) notFound();
  // Saves refresh this route (revalidateTag); the editor keeps its own state, so the new props are ignored on purpose.
  return <DeckEditor initialDeck={deck} />;
}
