import { z } from "zod";
import { isEmbedUrl } from "./embeds";

/**
 * A deck is one JSON document. Slides pick from a closed set of layouts, so every talk shares the same look; only the
 * accent changes per deck. Text fields are "rich text": plain text with a small inline syntax that RichText renders
 * (**bold**, *italic*, `code`, ==highlight==, [link](https://…)).
 */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

const text = z.string().trim().min(1).max(280);
const longText = z.string().trim().min(1).max(1200);
const richText = z.string().trim().min(1).max(600);
const httpsUrl = z
  .string()
  .url()
  .refine((value) => value.startsWith("https://"), "Must be an https URL");
// Images are files in /public or uploads from the editor (Firebase Storage). Other hosts aren't allowed: next/image
// only serves hosts listed in next.config.ts, and an unlisted one would break the slide.
const IMAGE_HOSTS = ["firebasestorage.googleapis.com"];
const imageSrc = z.union([
  z.string().regex(/^\/[\w\-./]+$/, "Use a path in /public or upload the image"),
  httpsUrl.refine((value) => IMAGE_HOSTS.includes(new URL(value).hostname), "Upload the image instead of linking it"),
]);
// A lucide icon name ("file-down"). Checked by shape only: lucide's name list ships as ESM or a client module, neither
// loadable everywhere this schema runs. The renderer falls back to a neutral mark and the editor's picker offers real names.
const iconName = z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).max(40);

const image = z.object({
  src: imageSrc,
  alt: z.string().trim().max(280),
});

const iconItem = z.object({
  icon: iconName,
  title: text,
  body: richText.optional(),
});

// Embeds: supported sites only, in their embed form (embeds.ts; the CSP frames the same hosts).
const embedUrl = httpsUrl.refine(isEmbedUrl, "Use a YouTube, Vimeo, Loom, CodeSandbox, StackBlitz or Figma link");

// Rendered diagrams are sanitized in the editor (DOMPurify) and shown inline; this is the server's second check, and
// the site's CSP (no inline scripts or handlers) is the third.
const UNSAFE_SVG = /<\s*(script|iframe|object|embed)\b|\son[a-z]+\s*=|javascript:/i;
const diagramSvg = z
  .string()
  .max(200_000)
  .refine((value) => value.trimStart().startsWith("<svg") && !UNSAFE_SVG.test(value), "Not a safe rendered diagram");

const base = {
  id: z.string().regex(/^[a-z0-9-]{1,40}$/),
  /** Speaker notes: shown on the remote, never to the audience. */
  notes: longText.optional(),
  /** Reveal list items one step at a time instead of all at once. */
  build: z.boolean().optional(),
};

export const slideSchema = z.discriminatedUnion("layout", [
  z.object({
    ...base,
    layout: z.literal("title"),
    eyebrow: text.optional(),
    title: text,
    subtitle: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("section"),
    number: z.string().max(4).optional(),
    title: text,
    subtitle: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("statement"),
    statement: richText,
    emphasis: text.optional(),
    /** Where a figure in the statement comes from, shown small underneath. */
    citation: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("bullets"),
    title: text,
    items: z.array(richText).min(1).max(7),
  }),
  z.object({
    ...base,
    layout: z.literal("two-column"),
    title: text,
    columns: z
      .array(
        z.object({
          heading: text,
          body: richText.optional(),
          items: z.array(richText).max(5).optional(),
        }),
      )
      .length(2),
  }),
  z.object({
    ...base,
    layout: z.literal("image-full"),
    image,
    caption: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("image-text"),
    title: text,
    body: richText,
    image,
    side: z.enum(["left", "right"]).default("right"),
  }),
  z.object({
    ...base,
    layout: z.literal("stats"),
    title: text.optional(),
    stats: z
      .array(
        z.object({
          value: z.number().finite(),
          prefix: z.string().max(4).optional(),
          suffix: z.string().max(6).optional(),
          label: text,
        }),
      )
      .min(1)
      .max(4),
    /** Where the numbers come from, shown small under them. */
    citation: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("quote"),
    quote: richText,
    author: text,
    role: text.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("code"),
    title: text.optional(),
    language: z.string().regex(/^[a-z0-9+#-]{1,20}$/),
    code: z.string().min(1).max(4000),
    caption: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("diagram"),
    title: text.optional(),
    /** Mermaid source; the editor renders it and stores the sanitized SVG for each slide theme next to it. */
    source: z.string().min(1).max(4000),
    svg: diagramSvg.optional(),
    svgDark: diagramSvg.optional(),
    caption: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("embed"),
    title: text.optional(),
    /** Optional while drafting: the slide shows a placeholder until a link is pasted. */
    url: embedUrl.optional(),
    caption: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("icons-grid"),
    title: text,
    items: z.array(iconItem).min(2).max(6),
  }),
  z.object({
    ...base,
    /** Who's speaking: a photo, a name and a few lines on them, usually right after the cover. */
    layout: z.literal("intro"),
    photo: image,
    greeting: text.optional(),
    name: text,
    role: text.optional(),
    bio: richText.optional(),
    highlights: z.array(richText).max(4).optional(),
    handle: text.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("closing"),
    title: text,
    subtitle: richText.optional(),
    links: z
      .array(z.object({ label: text, href: httpsUrl }))
      .max(4)
      .optional(),
  }),
]);

export const DECK_LANGS = ["en", "es"] as const;
export type DeckLang = (typeof DECK_LANGS)[number];

/** Fields a translation can never change: a translated slide keeps the base slide's identity and kind. */
export const SHARED_SLIDE_FIELDS = ["id", "layout", "build"] as const;

/**
 * A deck's second language: its own title and description, and per slide only the fields that differ from the base
 * (texts, alt texts, code comments, a translated diagram). Everything else is shared with the base deck.
 */
const translationSchema = z.object({
  title: text.optional(),
  description: z.string().trim().min(1).max(300).optional(),
  slides: z.record(z.string(), z.record(z.string(), z.unknown())).default({}),
});

export const deckSchema = z
  .object({
    slug: z.string().regex(SLUG_PATTERN).max(80),
    title: text,
    description: z.string().trim().min(1).max(300),
    lang: z.enum(DECK_LANGS),
    status: z.enum(["draft", "unlisted", "published"]),
    /** Replaces the brand amber inside this deck; ink and foreground are derived for AA (theme.ts). */
    accent: z.string().regex(HEX_PATTERN),
    event: z
      .object({ name: text, date: z.string().date(), url: httpsUrl.optional() })
      .optional(),
    slides: z.array(slideSchema).min(1).max(120),
    updatedAt: z.string().datetime(),
    version: z.number().int().nonnegative(),
    translations: z.object({ en: translationSchema.optional(), es: translationSchema.optional() }).optional(),
  })
  .superRefine((deck, ctx) => {
    const seen = new Set<string>();
    deck.slides.forEach((slide, index) => {
      if (seen.has(slide.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["slides", index, "id"],
          message: `Duplicate slide id "${slide.id}"`,
        });
      }
      seen.add(slide.id);
    });

    // Each translated slide must still be a valid slide once merged with its base.
    for (const lang of DECK_LANGS) {
      const translation = deck.translations?.[lang];
      if (!translation) continue;
      if (lang === deck.lang) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["translations", lang], message: "A deck can't be translated into its own language" });
        continue;
      }
      for (const slide of deck.slides) {
        const overlay = translation.slides[slide.id];
        if (!overlay) continue;
        const merged = slideSchema.safeParse({ ...slide, ...overlay, id: slide.id, layout: slide.layout, build: slide.build });
        if (merged.success) continue;
        for (const issue of merged.error.issues) {
          ctx.addIssue({ ...issue, path: ["translations", lang, "slides", slide.id, ...issue.path] });
        }
      }
    }
  })
  // Translations of slides that no longer exist, and shared fields that slipped into one, are dropped.
  .transform((deck) => {
    if (!deck.translations) return deck;
    const ids = new Set(deck.slides.map((slide) => slide.id));
    const translations: typeof deck.translations = {};
    for (const lang of DECK_LANGS) {
      const translation = deck.translations[lang];
      if (!translation || lang === deck.lang) continue;
      const slides = Object.fromEntries(
        Object.entries(translation.slides)
          .filter(([id]) => ids.has(id))
          .map(([id, overlay]) => [
            id,
            Object.fromEntries(Object.entries(overlay).filter(([key]) => !(SHARED_SLIDE_FIELDS as readonly string[]).includes(key))),
          ]),
      );
      translations[lang] = { ...translation, slides };
    }
    return { ...deck, translations };
  });

export type Deck = z.infer<typeof deckSchema>;
export type DeckInput = z.input<typeof deckSchema>;
export type Slide = z.infer<typeof slideSchema>;
export type SlideLayout = Slide["layout"];
export type SlideOf<L extends SlideLayout> = Extract<Slide, { layout: L }>;

export function parseDeck(input: unknown): Deck {
  return deckSchema.parse(input);
}
