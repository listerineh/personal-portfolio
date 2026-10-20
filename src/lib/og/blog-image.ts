import type { Locale } from '@/i18n/config';
import type { BlogPost } from '@/types';

/**
 * Path of a post's share image, drawn on demand by src/app/og/blog/[file]/route.tsx.
 * `v` changes whenever what the card shows changes (title, date, cover), so social networks and the CDN never keep a
 * stale card; `lang` only when it isn't English (crawlers send no language cookie, so they normally get English).
 */
export function blogShareImage(post: Pick<BlogPost, 'slug' | 'title' | 'date' | 'imageUrl'>, locale: Locale): string {
  const key = `${post.title}|${post.date}|${post.imageUrl ?? ''}`;
  let hash = 5381;
  for (let i = 0; i < key.length; i++) hash = ((hash * 33) ^ key.charCodeAt(i)) >>> 0;
  const query = new URLSearchParams({ v: hash.toString(36) });
  if (locale !== 'en') query.set('lang', locale);
  return `/og/blog/${post.slug}.png?${query}`;
}
