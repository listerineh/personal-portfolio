import { test, expect } from "@playwright/test";
import { deckSchema } from "../../src/features/slides/schema";
import { stepCount } from "../../src/features/slides/steps";
import { ACCENT_PRESETS, accentTokens, contrast, hexToRgb } from "../../src/features/slides/theme";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";
import { toDeckSummary } from "../../src/features/slides/summary";

// Code-only checks (no page): the deck contract and the accent math behind every deck's colors.

test.describe("Deck schema", () => {
  test("the seed deck is valid", () => {
    const deck = deckSchema.parse(testPresentation);
    expect(deck.slides.length).toBeGreaterThan(0);
  });

  test("rejects unknown layouts, duplicate ids, bad icons and foreign embeds", () => {
    const base = { ...testPresentation, slides: [...testPresentation.slides] };
    expect(deckSchema.safeParse({ ...base, slides: [{ id: "x", layout: "canvas" }] }).success).toBe(false);
    expect(deckSchema.safeParse({ ...base, slides: [base.slides[0], base.slides[0]] }).success).toBe(false);
    expect(
      deckSchema.safeParse({ ...base, slides: [{ id: "i", layout: "icons-grid", title: "T", items: [{ icon: "Not An Icon", title: "a" }, { icon: "keyboard", title: "b" }] }] }).success,
    ).toBe(false);
    expect(deckSchema.safeParse({ ...base, slides: [{ id: "e", layout: "embed", url: "https://evil.example/x" }] }).success).toBe(false);
    expect(deckSchema.safeParse({ ...base, slides: [{ id: "e", layout: "embed", url: "https://www.youtube-nocookie.com/embed/abcdefghijk" }] }).success).toBe(true);
    expect(deckSchema.safeParse({ ...base, slug: "Not A Slug" }).success).toBe(false);
    expect(deckSchema.safeParse({ ...base, accent: "blue" }).success).toBe(false);
  });

  test("build steps count list items only when build is on", () => {
    const deck = deckSchema.parse(testPresentation);
    const goals = deck.slides.find((slide) => slide.id === "goals")!;
    expect(stepCount(goals)).toBe(4);
    expect(stepCount({ ...goals, build: false })).toBe(0);
    expect(stepCount(deck.slides[0])).toBe(0);
  });
});

test.describe("Accent tokens", () => {
  const grounds = { light: hexToRgb("#f5f5f7"), dark: hexToRgb("#242426") } as const;
  const accents = [...Object.values(ACCENT_PRESETS), "#facc15", "#22d3ee", "#1e1b4b", "#ff00ff"];

  for (const accent of accents) {
    for (const theme of ["light", "dark"] as const) {
      test(`${accent} on ${theme}: ink passes AA and text on the fill reads`, () => {
        const { primary, ink, foreground } = accentTokens(accent, theme);
        expect(contrast(ink, grounds[theme])).toBeGreaterThanOrEqual(4.5);
        expect(contrast(foreground, primary)).toBeGreaterThanOrEqual(3);
      });
    }
  }

  test("the brand amber keeps its hand-tuned tokens", () => {
    expect(accentTokens("#D97706", "light").ink).toEqual([168, 75, 10]);
    expect(accentTokens("#d97706", "dark").ink).toEqual([232, 137, 12]);
  });

  test("a fill too faint for its ground is flagged", () => {
    expect(accentTokens("#fef9c3", "light").warning).toBe("low-fill-contrast");
    expect(accentTokens("#2563eb", "light").warning).toBeUndefined();
  });
});

test.describe("Deck summaries", () => {
  test("carry the cover slide without speaker notes, and nothing else of the deck", () => {
    const deck = deckSchema.parse(testPresentation);
    const summary = toDeckSummary(deck);
    expect(summary.cover.id).toBe(deck.slides[0].id);
    expect(deck.slides[0].notes).toBeTruthy();
    expect(summary.cover).not.toHaveProperty("notes");
    expect(JSON.stringify(summary)).not.toContain(deck.slides[1].id);
  });
});
