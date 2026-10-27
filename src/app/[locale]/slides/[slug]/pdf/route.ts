import { getPublicDeck } from '@/features/slides/store';
import { printDeckPdf, readStoredPdf, storePdf } from '@/features/slides/pdf';
import { SLUG_PATTERN } from '@/features/slides/schema';
import { deckLanguages, hasLanguage } from '@/features/slides/i18n';

export const runtime = 'nodejs';
// Printing a long deck in a cold function: launch Chromium, load every slide, write the PDF.
export const maxDuration = 60;

/**
 * GET /slides/<slug>/pdf?v=<version>&lang=<lang> — the public deck as a PDF download. Each version and language is
 * printed once, then served from Cloud Storage; a URL naming the current version can be cached by the CDN for good.
 */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = SLUG_PATTERN.test(slug) ? await getPublicDeck(slug) : undefined;
  if (!deck) return new Response('Not found', { status: 404 });

  const url = new URL(request.url);
  const requested = url.searchParams.get('lang') ?? '';
  const lang = hasLanguage(deck, requested) ? requested : deck.lang;
  const filename = deckLanguages(deck).length > 1 ? `${slug}-${lang}.pdf` : `${slug}.pdf`;

  try {
    let pdf = await readStoredPdf(slug, deck.version, lang).catch(() => null);
    if (!pdf) {
      pdf = await printDeckPdf(url.origin, slug, deck.slides.length, lang);
      await storePdf(slug, deck.version, lang, pdf).catch((error) => console.error('[slides] storing PDF failed', error));
    }
    const current = url.searchParams.get('v') === String(deck.version);
    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': current ? 'public, max-age=86400' : 'no-store',
        ...(current ? { 'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable' } : {}),
      },
    });
  } catch (error) {
    console.error('[slides] PDF failed', error);
    return new Response('The PDF could not be made right now. Try again in a moment.', { status: 503 });
  }
}
