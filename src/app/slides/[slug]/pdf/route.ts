import { getPublicDeck } from '@/features/slides/store';
import { printDeckPdf, readStoredPdf, storePdf } from '@/features/slides/pdf';
import { SLUG_PATTERN } from '@/features/slides/schema';

export const runtime = 'nodejs';
// Printing a long deck in a cold function: launch Chromium, load every slide, write the PDF.
export const maxDuration = 60;

/**
 * GET /slides/<slug>/pdf?v=<version> — the public deck as a PDF download. Each version is printed once, then served
 * from Cloud Storage; a URL naming the current version can be cached by the CDN for good.
 */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = SLUG_PATTERN.test(slug) ? await getPublicDeck(slug) : undefined;
  if (!deck) return new Response('Not found', { status: 404 });

  try {
    let pdf = await readStoredPdf(slug, deck.version).catch(() => null);
    if (!pdf) {
      pdf = await printDeckPdf(new URL(request.url).origin, slug);
      await storePdf(slug, deck.version, pdf).catch((error) => console.error('[slides] storing PDF failed', error));
    }
    const current = new URL(request.url).searchParams.get('v') === String(deck.version);
    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
        'Cache-Control': current ? 'public, max-age=86400' : 'no-store',
        ...(current ? { 'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable' } : {}),
      },
    });
  } catch (error) {
    console.error('[slides] PDF failed', error);
    return new Response('The PDF could not be made right now. Try again in a moment.', { status: 503 });
  }
}
