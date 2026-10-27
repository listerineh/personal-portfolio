import type {
  BlogListingPost,
  BlogPostSummary,
  Project,
  SkillCategory,
} from "@/types";

// Placeholder content for loading skeletons: the shapes and typical lengths of real posts and projects. Never shown as
// text (the skeleton draws it as bars), so it only has to wrap like the real thing.

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip".split(
    " ",
  );

/** Roughly `length` characters of word-shaped filler, deterministic per seed. */
export function filler(length: number, seed = 0): string {
  const out: string[] = [];
  let size = 0;
  for (let i = seed; size < length; i++) {
    const word = WORDS[(i * 7) % WORDS.length];
    out.push(word);
    size += word.length + 1;
  }
  const text = out.join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** A 1×1 transparent image: keeps image boxes in place without loading anything (the skeleton hides it). */
export const PLACEHOLDER_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const DATE = "2026-01-01";

export function placeholderPost(index: number): BlogPostSummary {
  return {
    slug: `loading-${index}`,
    title: filler(index === 0 ? 46 : 52, index),
    date: DATE,
    excerpt: filler(index === 0 ? 290 : 210, index + 3),
    imageUrl: PLACEHOLDER_IMAGE,
    author: "Sebastian Alvarez",
    tags: [
      "xxxxxx",
      "xxxxxxxxxxxxxx",
      "xxxxxxxxxx",
      "xxxxxxxxxxxxxxxxx",
      "xxxxx",
      "xxxxxx",
    ],
    readingTime: 8,
  };
}

export const placeholderPosts: BlogListingPost[] = Array.from(
  { length: 7 },
  (_, index) => ({
    ...placeholderPost(index),
    searchText: "",
  }),
);

const STATUSES: Project["status"][] = [
  "in-progress",
  "completed",
  "completed",
  "on-hold",
];
const TAGS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Python",
  "FastAPI",
  "Flutter",
  "Firebase",
  "Docker",
  "Gemini AI",
  "Tailwind CSS",
  "Cloud Run",
  "Redis",
  "GraphQL",
  "Dart",
];

/** `index` 0 is the detail page's project: a short name, like most real ones. */
export function placeholderProject(index: number): Project {
  return {
    id: `loading-${index}`,
    slug: `loading-${index}`,
    title: filler(index === 0 ? 5 : 18, index),
    description: filler(index === 0 ? 150 : 120, index + 2),
    longDescription: [filler(420, 1), filler(380, 5), filler(300, 9)].join(
      "\n\n",
    ),
    imageUrl: PLACEHOLDER_IMAGE,
    imageAiHint: "",
    tags: Array.from(
      { length: 5 },
      (_, i) => TAGS[(index * 3 + i) % TAGS.length],
    ),
    status: STATUSES[index % STATUSES.length],
    startDate: DATE,
    liveDemoUrl: "#",
    sourceCodeUrl: "#",
  };
}

export const placeholderProjects: Project[] = Array.from(
  { length: 7 },
  (_, index) => placeholderProject(index),
);

const CATEGORIES: SkillCategory[] = [
  "languages",
  "frontend",
  "backend",
  "database",
  "ai",
  "devops",
  "testing",
  "tools",
];

export const placeholderSkillGroups = CATEGORIES.map((category, index) => ({
  category,
  skills: Array.from({ length: 8 }, (_, i) => ({
    name: filler(9 + ((i + index) % 4) * 2, i + index),
    iconUrl: PLACEHOLDER_IMAGE,
    category: [category],
    description: filler(70, i),
  })),
}));
