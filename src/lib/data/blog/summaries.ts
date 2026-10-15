import type { BlogPost, BlogPostSummary } from '@/types';
import { calculateReadingTime } from '@/lib/reading-time';

/** Strip the body so lists and previews never ship full posts to the browser. */
export function toBlogSummary(post: BlogPost): BlogPostSummary {
  const { content, ...meta } = post;
  return { ...meta, readingTime: post.readingTime ?? calculateReadingTime(content) };
}
