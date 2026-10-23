import { z } from "zod";

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
// Images live in /public for now (Vercel Blob URLs once the editor uploads them).
const imageSrc = z.union([z.string().regex(/^\/[\w\-./]+$/), httpsUrl]);
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

// Embeds are limited to hosts the CSP already frames (src/lib/csp.ts).
export const EMBED_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
] as const;
const embedUrl = httpsUrl.refine(
  (value) =>
    (EMBED_HOSTS as readonly string[]).includes(new URL(value).hostname),
  `Embeds are limited to ${EMBED_HOSTS.join(", ")}`,
);

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
    /** Mermaid source; the editor stores the rendered, sanitized SVG next to it (phase 3). */
    source: z.string().min(1).max(4000),
    svg: z.string().max(200_000).optional(),
    caption: richText.optional(),
  }),
  z.object({
    ...base,
    layout: z.literal("embed"),
    title: text.optional(),
    url: embedUrl,
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
    layout: z.literal("closing"),
    title: text,
    subtitle: richText.optional(),
    links: z
      .array(z.object({ label: text, href: httpsUrl }))
      .max(4)
      .optional(),
  }),
]);

export const deckSchema = z
  .object({
    slug: z.string().regex(SLUG_PATTERN).max(80),
    title: text,
    description: z.string().trim().min(1).max(300),
    lang: z.enum(["en", "es"]),
    status: z.enum(["draft", "unlisted", "published"]),
    /** Replaces the brand amber inside this deck; ink and foreground are derived for AA (theme.ts). */
    accent: z.string().regex(HEX_PATTERN),
    theme: z.enum(["light", "dark"]).default("light"),
    event: z
      .object({ name: text, date: z.string().date(), url: httpsUrl.optional() })
      .optional(),
    slides: z.array(slideSchema).min(1).max(120),
    updatedAt: z.string().datetime(),
    version: z.number().int().nonnegative(),
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
  });

export type Deck = z.infer<typeof deckSchema>;
export type DeckInput = z.input<typeof deckSchema>;
export type Slide = z.infer<typeof slideSchema>;
export type SlideLayout = Slide["layout"];
export type SlideOf<L extends SlideLayout> = Extract<Slide, { layout: L }>;

export function parseDeck(input: unknown): Deck {
  return deckSchema.parse(input);
}
