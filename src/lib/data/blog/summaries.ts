import type { BlogListingPost, BlogPost, BlogPostSummary } from '@/types';
import { calculateReadingTime } from '@/lib/reading-time';

/** Strip the body so lists and previews never ship full posts to the browser. */
export function toBlogSummary(post: BlogPost): BlogPostSummary {
  const { content, ...meta } = post;
  return { ...meta, readingTime: post.readingTime ?? calculateReadingTime(content) };
}

/** Distinct lowercase words of a markdown body (code blocks, links and markup removed), in reading order. */
function searchWords(markdown: string): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\]\([^)]*\)/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .toLowerCase();
  const words = text.match(/[\p{L}\p{N}][\p{L}\p{N}'+#.-]*/gu) ?? [];
  return [...new Set(words.map((word) => word.replace(/[.'-]+$/, '')))].join(' ');
}

/** What the blog listing needs per post: the summary and a compact search index instead of the full body. */
export function toBlogListing(post: BlogPost): BlogListingPost {
  return { ...toBlogSummary(post), searchText: searchWords(post.content) };
}
