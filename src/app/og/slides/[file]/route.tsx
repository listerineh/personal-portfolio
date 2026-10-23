import { ImageResponse } from 'next/og';
import { AUTHOR_NAME } from '@/lib/metadata';
import { loadOgFonts } from '@/lib/og/fonts';
import { OG_HEIGHT, OG_WIDTH } from '@/lib/og/blog-card';
import { SlidesCard } from '@/lib/og/slides-card';
import { getPublicDeck } from '@/features/slides/store';
import { hasLanguage, localizeDeck } from '@/features/slides/i18n';
import { SLUG_PATTERN } from '@/features/slides/schema';
import { accentTokens, rgbToHex } from '@/features/slides/theme';

export const runtime = 'nodejs';

const LABEL = { en: 'Talk', es: 'Charla' } as const;

/** GET /og/slides/<slug>.png?v=<version>&lang=<lang> — a public deck's 1200×630 share card, in that language and its accent. */
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const slug = file.endsWith('.png') ? file.slice(0, -4) : '';
  const found = SLUG_PATTERN.test(slug) ? await getPublicDeck(slug) : undefined;
  if (!found) return new Response('Not found', { status: 404 });
  const lang = new URL(request.url).searchParams.get('lang') ?? '';
  const deck = localizeDeck(found, hasLanguage(found, lang) ? lang : found.lang);

  const when = deck.event?.date
    ? new Intl.DateTimeFormat(deck.lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(`${deck.event.date}T00:00:00Z`),
      )
    : undefined;
  const byline = [AUTHOR_NAME, deck.event?.name, when].filter(Boolean).join(' · ');

  return new ImageResponse(
    <SlidesCard
      title={deck.title}
      label={LABEL[deck.lang]}
      byline={byline}
      accent={deck.accent}
      ink={rgbToHex(accentTokens(deck.accent, 'light').ink)}
    />,
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: await loadOgFonts(),
      headers: {
        // The page links the card with ?v=<deck version>, so each version can be cached for good.
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  );
}
