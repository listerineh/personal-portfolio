import type { Slide, SlideLayout } from "../schema";

/**
 * What the editor shows for each layout. One generic form renders these, so a new layout needs a schema entry, a
 * renderer and a line here, nothing else. Labels come from messages (slidesEditor.field.<key>).
 */

export type FieldKind =
  | { kind: "text" }
  /** Rich text: plain text with **bold**, *italic*, `code`, ==highlight== and [links](https://…). */
  | { kind: "rich"; multiline?: boolean }
  | { kind: "code" }
  | { kind: "number" }
  | { kind: "select"; options: readonly string[] }
  | { kind: "image" }
  | { kind: "icon" }
  /** A link to a supported site, turned into its embed form. */
  | { kind: "embed" }
  /** Mermaid source, rendered to SVG (both slide themes) as you type. */
  | { kind: "diagram" }
  | { kind: "list"; min: number; max: number }
  | {
      kind: "objects";
      min: number;
      max: number;
      fields: readonly Field[];
      template: Record<string, unknown>;
    };

export type Field = { key: string; optional?: boolean } & FieldKind;

const text = (key: string, optional = false): Field => ({
  key,
  kind: "text",
  optional,
});
const rich = (key: string, optional = false, multiline = false): Field => ({
  key,
  kind: "rich",
  optional,
  multiline,
});

export const LAYOUT_FIELDS: Record<SlideLayout, readonly Field[]> = {
  title: [text("eyebrow", true), text("title"), rich("subtitle", true)],
  section: [text("number", true), text("title"), rich("subtitle", true)],
  statement: [rich("statement", false, true), text("emphasis", true), rich("citation", true)],
  bullets: [text("title"), { key: "items", kind: "list", min: 1, max: 7 }],
  "two-column": [
    text("title"),
    {
      key: "columns",
      kind: "objects",
      min: 2,
      max: 2,
      fields: [
        text("heading"),
        rich("body", true, true),
        { key: "items", kind: "list", min: 0, max: 5, optional: true },
      ],
      template: { heading: "Column" },
    },
  ],
  "image-full": [{ key: "image", kind: "image" }, rich("caption", true)],
  "image-text": [
    text("title"),
    rich("body", false, true),
    { key: "image", kind: "image" },
    { key: "side", kind: "select", options: ["left", "right"] },
  ],
  stats: [
    text("title", true),
    {
      key: "stats",
      kind: "objects",
      min: 1,
      max: 4,
      fields: [
        { key: "value", kind: "number" },
        text("prefix", true),
        text("suffix", true),
        text("label"),
      ],
      template: { value: 10, label: "Label" },
    },
    rich("citation", true),
  ],
  quote: [rich("quote", false, true), text("author"), text("role", true)],
  code: [
    text("title", true),
    text("language"),
    { key: "code", kind: "code" },
    rich("caption", true),
  ],
  diagram: [
    text("title", true),
    { key: "source", kind: "diagram" },
    rich("caption", true),
  ],
  embed: [text("title", true), { key: "url", kind: "embed", optional: true }, rich("caption", true)],
  "icons-grid": [
    text("title"),
    {
      key: "items",
      kind: "objects",
      min: 2,
      max: 6,
      fields: [
        { key: "icon", kind: "icon" },
        text("title"),
        rich("body", true),
      ],
      template: { icon: "sparkles", title: "Item" },
    },
  ],
  intro: [
    { key: "photo", kind: "image" },
    text("greeting", true),
    text("name"),
    text("role", true),
    rich("bio", true, true),
    { key: "highlights", kind: "list", min: 0, max: 4, optional: true },
    text("handle", true),
  ],
  closing: [
    text("title"),
    rich("subtitle", true),
    {
      key: "links",
      kind: "objects",
      min: 0,
      max: 4,
      optional: true,
      fields: [text("label"), text("href")],
      template: { label: "listerineh.dev", href: "https://listerineh.dev" },
    },
  ],
};

export const LAYOUTS = Object.keys(LAYOUT_FIELDS) as SlideLayout[];

/** Layouts whose lists can build step by step. */
export const BUILDABLE = new Set<SlideLayout>([
  "bullets",
  "two-column",
  "stats",
  "icons-grid",
  "intro",
]);

/** A valid starting point for each layout; content to overwrite, not to ship. */
const TEMPLATES: {
  [L in SlideLayout]: Omit<Extract<Slide, { layout: L }>, "id" | "layout">;
} = {
  title: { title: "Title" },
  section: { number: "01", title: "Section" },
  statement: { statement: "One idea, ==said plainly==." },
  bullets: { title: "Title", items: ["First point", "Second point"] },
  "two-column": {
    title: "Title",
    columns: [
      { heading: "Before", items: ["Point"] },
      { heading: "After", items: ["Point"] },
    ],
  },
  "image-full": { image: { src: "/images/hero-photo.webp", alt: "" } },
  "image-text": {
    title: "Title",
    body: "Text beside the image.",
    image: { src: "/images/hero-photo.webp", alt: "" },
    side: "right",
  },
  stats: { title: "In numbers", stats: [{ value: 10, label: "Label" }] },
  quote: { quote: "A quote worth repeating.", author: "Author" },
  code: { language: "ts", code: "console.log('hello');" },
  diagram: { source: "flowchart LR\n  A --> B" },
  embed: { title: "Demo" },
  "icons-grid": {
    title: "Title",
    items: [
      { icon: "sparkles", title: "One" },
      { icon: "layers", title: "Two" },
    ],
  },
  intro: {
    photo: { src: "/images/sebas-playing.webp", alt: "Sebastian Alvarez" },
    greeting: "Hi, I'm",
    name: "Sebastian Alvarez",
    role: "Full-stack engineer · Applied AI",
    highlights: ["Quito, Ecuador", "GDG Quito"],
    handle: "@listerineh",
  },
  closing: { title: "Thank you!" },
};

export function newSlideId(): string {
  return `s-${Math.random().toString(36).slice(2, 10)}`;
}

export function slideTemplate(layout: SlideLayout, id = newSlideId()): Slide {
  return { id, layout, ...structuredClone(TEMPLATES[layout]) } as Slide;
}

/**
 * Switches a slide to another layout: starts from that layout's template and keeps what still fits (id, notes, build,
 * and any field the two layouts share with the same kind, like the title).
 */
export function changeLayout(slide: Slide, layout: SlideLayout): Slide {
  const next = slideTemplate(layout, slide.id) as Record<string, unknown>;
  const from = slide as Record<string, unknown>;
  const fromKinds = new Map(
    LAYOUT_FIELDS[slide.layout].map((field) => [field.key, field.kind]),
  );
  for (const field of LAYOUT_FIELDS[layout]) {
    if (
      fromKinds.get(field.key) === field.kind &&
      from[field.key] !== undefined
    )
      next[field.key] = structuredClone(from[field.key]);
  }
  if (slide.notes) next.notes = slide.notes;
  if (slide.build && BUILDABLE.has(layout)) next.build = true;
  return next as Slide;
}

/** Sets a field; an emptied optional field is removed, so the schema's optional() accepts it. */
export function setField<T extends Record<string, unknown>>(
  target: T,
  key: string,
  value: unknown,
  optional = false,
): T {
  const next = { ...target } as Record<string, unknown>;
  if (
    optional &&
    (value === "" ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0))
  )
    delete next[key];
  else next[key] = value;
  return next as T;
}
