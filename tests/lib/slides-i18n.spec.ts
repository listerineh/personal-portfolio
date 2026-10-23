import { test, expect } from "@playwright/test";
import { applySlideEdit, deckLanguages, localizeDeck, slideOverlay, translationProgress } from "../../src/features/slides/i18n";
import { deckSchema, type Deck } from "../../src/features/slides/schema";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";

// Code-only checks (no page): one deck in two languages — base text plus, per slide, only what the translation changes.

const base = deckSchema.parse(testPresentation); // Spanish
const withEnglish = (slides: Record<string, Record<string, unknown>>, extra = {}): Deck =>
  deckSchema.parse({ ...testPresentation, translations: { en: { title: "Slides on listerineh.dev", slides, ...extra } } });

test.describe("Deck translations", () => {
  test("a deck lists its own language first, then its translations", () => {
    expect(deckLanguages(base)).toEqual(["es"]);
    expect(deckLanguages(withEnglish({}))).toEqual(["es", "en"]);
  });

  test("the translated deck takes translated fields and keeps the rest of each slide", () => {
    const deck = withEnglish({ goals: { title: "Goals" } });
    const english = localizeDeck(deck, "en");
    expect(english.lang).toBe("en");
    expect(english.title).toBe("Slides on listerineh.dev");
    expect(english.description).toBe(base.description); // not translated: falls back
    const goals = english.slides.find((slide) => slide.id === "goals");
    expect(goals).toEqual({ ...base.slides.find((slide) => slide.id === "goals"), title: "Goals" });
    // An untranslated slide is the base slide.
    expect(english.slides[0]).toEqual(base.slides[0]);
    // Asking for a language the deck doesn't have gives the base deck.
    expect(localizeDeck(base, "en")).toBe(base);
  });

  test("editing in the second language stores only what differs, and nothing when it matches again", () => {
    const index = base.slides.findIndex((slide) => slide.id === "goals");
    const original = base.slides[index];
    const edited = { ...original, title: "Goals" } as typeof original;
    const translated = applySlideEdit(base, "en", index, edited);
    expect(translated.translations?.en?.slides.goals).toEqual({ title: "Goals" });
    expect(translated.slides[index]).toEqual(original); // the base is untouched
    expect(translationProgress(translated, "en")).toEqual({ translated: 1, total: base.slides.length });

    const reverted = applySlideEdit(translated, "en", index, original);
    expect(reverted.translations?.en?.slides.goals).toBeUndefined();
    expect(slideOverlay(original, original)).toBeUndefined();
  });

  test("editing in the base language changes the base", () => {
    const index = base.slides.findIndex((slide) => slide.id === "goals");
    const edited = { ...base.slides[index], title: "Metas" } as Deck["slides"][number];
    expect(applySlideEdit(base, "es", index, edited).slides[index]).toMatchObject({ title: "Metas" });
  });

  test("translated slides must still be valid slides", () => {
    const result = deckSchema.safeParse({ ...testPresentation, translations: { en: { slides: { goals: { title: "" } } } } });
    expect(result.success).toBe(false);
    expect(result.success ? [] : result.error.issues.map((issue) => issue.path.join("."))).toContain("translations.en.slides.goals.title");
  });

  test("a deck can't be translated into its own language", () => {
    expect(deckSchema.safeParse({ ...testPresentation, translations: { es: { slides: {} } } }).success).toBe(false);
  });

  test("translations of deleted slides and shared fields are dropped", () => {
    const deck = withEnglish({ gone: { title: "Old" }, goals: { title: "Goals", layout: "quote", id: "x" } });
    expect(deck.translations?.en?.slides).toEqual({ goals: { title: "Goals" } });
  });
});
