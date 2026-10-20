import type { BlogPost } from '@/types';
import { getBlogPosts } from './get-blog-posts';

/**
 * Which posts to suggest after a post, worked out once per server instance from the English versions (both
 * languages share slugs, so they suggest the same posts).
 *
 * Related posts score 40% on shared tag words and 60% on how similar the texts are (TF-IDF cosine over title and
 * body, code blocks removed). Tags alone are too sparse here: most posts share no tag with most others, so the
 * suggestions would be filler.
 */

const STOP_WORDS = new Set(
  `the a an and or of to in on for with is are be it this that as at by from you your i my we our not but can will was
  were have has had do does how what when why which more most into than then so if its just like about out up one all
  also there their they them these those use using used new get make way only even very much many some any each over
  own other no yes`.split(/\s+/),
);

const TAG_WEIGHT = 0.4;
const TEXT_WEIGHT = 0.6;

function words(text: string): string[] {
  return (
    text
      .replace(/```[\s\S]*?```/g, ' ')
      .toLowerCase()
      .match(/[a-z][a-z0-9+#]{2,}/g) ?? []
  ).filter((word) => !STOP_WORDS.has(word));
}

/** Tag words: "Infrastructure as Code" and "Cloud Infrastructure" share "infrastructure". */
function tagWords(tags: string[]): Set<string> {
  return new Set(tags.flatMap((tag) => tag.toLowerCase().match(/[a-z0-9/+#]+/g) ?? []).filter((word) => !STOP_WORDS.has(word)));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  for (const word of a) if (b.has(word)) shared++;
  const union = a.size + b.size - shared;
  return union ? shared / union : 0;
}

type Vector = Map<string, number>;

function cosine(a: Vector, b: Vector, normA: number, normB: number): number {
  if (!normA || !normB) return 0;
  let dot = 0;
  for (const [word, weight] of a) dot += weight * (b.get(word) ?? 0);
  return dot / (normA * normB);
}

interface Index {
  /** slug → related slugs, best first */
  related: Map<string, string[]>;
  /** slugs from oldest to newest */
  chronological: string[];
}

let index: Index | undefined;

function build(posts: BlogPost[]): Index {
  const counts = posts.map((post) => {
    const count = new Map<string, number>();
    for (const word of words(`${post.title} ${post.excerpt} ${post.content}`)) count.set(word, (count.get(word) ?? 0) + 1);
    return count;
  });
  const documentFrequency = new Map<string, number>();
  for (const count of counts) for (const word of count.keys()) documentFrequency.set(word, (documentFrequency.get(word) ?? 0) + 1);

  // Words in every post say nothing about any of them.
  const vectors = counts.map((count) => {
    const vector: Vector = new Map();
    for (const [word, n] of count) {
      const df = documentFrequency.get(word)!;
      if (df < posts.length) vector.set(word, (1 + Math.log(n)) * Math.log(posts.length / df));
    }
    return vector;
  });
  const norms = vectors.map((vector) => Math.sqrt([...vector.values()].reduce((sum, w) => sum + w * w, 0)));
  const tags = posts.map((post) => tagWords(post.tags));

  const related = new Map<string, string[]>();
  posts.forEach((post, i) => {
    const scored = posts
      .map((other, j) => ({
        slug: other.slug,
        score: i === j ? -1 : TAG_WEIGHT * jaccard(tags[i], tags[j]) + TEXT_WEIGHT * cosine(vectors[i], vectors[j], norms[i], norms[j]),
        date: new Date(other.date).getTime(),
      }))
      .filter((candidate) => candidate.slug !== post.slug)
      // Ties (rare) go to the newer post.
      .sort((a, b) => b.score - a.score || b.date - a.date);
    related.set(post.slug, scored.map((candidate) => candidate.slug));
  });

  const chronological = [...posts]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.slug.localeCompare(b.slug))
    .map((post) => post.slug);

  return { related, chronological };
}

function getIndex(): Index {
  index ??= build(getBlogPosts('en'));
  return index;
}

/** The `count` posts most related to `slug`, best first. */
export function relatedSlugs(slug: string, count = 3): string[] {
  return (getIndex().related.get(slug) ?? []).slice(0, count);
}

/** The post published just before (`previous`) and just after (`next`) this one, if any. */
export function adjacentSlugs(slug: string): { previous?: string; next?: string } {
  const { chronological } = getIndex();
  const i = chronological.indexOf(slug);
  if (i === -1) return {};
  return { previous: chronological[i - 1], next: chronological[i + 1] };
}
