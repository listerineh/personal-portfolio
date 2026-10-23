import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import { getBlogPost } from '@/lib/data/blog';
import { BlogCard, OG_HEIGHT, OG_WIDTH } from '@/lib/og/blog-card';
import { AUTHOR_NAME } from '@/lib/metadata';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';
import { isValidSlug } from '@/lib/server/security';
import { loadOgFonts } from '@/lib/og/fonts';
import type { Locale } from '@/i18n/config';

// Node runtime: the cover is WebP, which Satori can't decode, so sharp turns it into a JPEG first.
export const runtime = 'nodejs';

const ROOT = process.cwd();

/** The cover from public/blog, as a JPEG data URI sized for the card's panel (2x). Missing or unreadable: none. */
async function coverDataUri(imageUrl: string | undefined): Promise<string | undefined> {
  if (!imageUrl || !/^\/blog\/[\w.-]+\.(webp|png|jpe?g)$/.test(imageUrl)) return undefined;
  try {
    const source = await readFile(path.join(ROOT, 'public', imageUrl));
    const jpeg = await sharp(source).resize(912, 608, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
  } catch {
    return undefined;
  }
}

/** Dates are stored in English ("March 4, 2026"); shown like the article does (blog-post-client-page.tsx). */
function formatDate(value: string, locale: Locale): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** GET /og/blog/<slug>.png[?lang=es] — the post's 1200×630 share card. */
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const slug = file.endsWith('.png') ? file.slice(0, -4) : '';
  const locale: Locale = new URL(request.url).searchParams.get('lang') === 'es' ? 'es' : 'en';
  const post = isValidSlug(slug) ? getBlogPost(slug, locale) : undefined;
  if (!post) return new Response('Not found', { status: 404 });

  const minutes = post.readingTime ?? calculateReadingTime(post.content);
  const byline = [post.author || AUTHOR_NAME, formatDate(post.date, locale), formatReadingTime(minutes, locale)].join(' · ');
  const [loadedFonts, cover] = await Promise.all([loadOgFonts(), coverDataUri(post.imageUrl)]);

  return new ImageResponse(<BlogCard title={post.title} byline={byline} cover={cover} />, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: loadedFonts,
    headers: {
      // The URL carries a version (src/lib/og/blog-image.ts): the CDN can keep each card for good.
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Vercel-CDN-Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
