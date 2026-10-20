import { getBlogPosts } from '@/lib/data/blog/get-blog-posts';
import type { Locale } from '@/i18n/config';
import { getRedis } from './security';

type Reactions = Record<string, number>;

export interface PostCounts {
  views: Record<string, number>;
  reactions: Record<string, number>;
}

/** Current view and reaction totals per post slug (zeros without Redis). Views are shared by every environment. */
export async function postCounts(): Promise<PostCounts> {
  const slugs = getBlogPosts('en').map((post) => post.slug);
  const empty = Object.fromEntries(slugs.map((slug) => [slug, 0]));
  const redis = getRedis();
  if (!redis || slugs.length === 0) return { views: { ...empty }, reactions: { ...empty } };

  const [views, reactions] = await Promise.all([
    redis.mget<(number | null)[]>(...slugs.map((slug) => `blog:${slug}:views`)),
    redis.mget<(Reactions | null)[]>(...slugs.map((slug) => `blog:${slug}:reactions`)),
  ]);
  return {
    views: Object.fromEntries(slugs.map((slug, i) => [slug, Number(views[i] ?? 0)])),
    reactions: Object.fromEntries(
      slugs.map((slug, i) => [slug, Object.values(reactions[i] ?? {}).reduce((sum, n) => sum + Number(n || 0), 0)]),
    ),
  };
}

/** The `count` most-read posts in a language (newest first when views tie or Redis is missing). */
export async function mostReadPosts(lang: Locale, count = 3) {
  const { views } = await postCounts().catch(() => ({ views: {} as Record<string, number> }));
  return getBlogPosts(lang)
    .map((post) => ({ post, views: views[post.slug] ?? 0, date: new Date(post.date).getTime() }))
    .sort((a, b) => b.views - a.views || b.date - a.date)
    .slice(0, count)
    .map(({ post }) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt }));
}
