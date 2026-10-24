import { test, expect } from "@playwright/test";
import { deckStructuredData, talksStructuredData } from "../../src/features/slides/structured-data";
import { deckSchema } from "../../src/features/slides/schema";
import { pythonTyping } from "../../src/features/slides/decks/python-typing";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";

// Search-engine data for talks: each deck is a presentation with its PDF, in the visitor's language when it has it.

const python = deckSchema.parse(pythonTyping);
const spanishOnly = deckSchema.parse(testPresentation);

test.describe("Talks structured data", () => {
  test("a deck is a presentation in the visitor's language, with its PDF and card", () => {
    const en = deckStructuredData(python, "en");
    expect(en["@type"]).toBe("PresentationDigitalDocument");
    expect(en.name).toBe("Typed Python");
    expect(en.inLanguage).toBe("en-US");
    expect(en.url).toBe("https://listerineh.dev/slides/python-typing");
    expect(en.encoding.contentUrl).toBe(`https://listerineh.dev/slides/python-typing/pdf?v=${python.version}&lang=en`);
    expect(en.image).toBe(`https://listerineh.dev/og/slides/python-typing.png?v=${python.version}&lang=en`);
    expect(deckStructuredData(python, "es").name).toBe("Python tipado");
  });

  test("a deck without the visitor's language falls back to its own", () => {
    const data = deckStructuredData(spanishOnly, "en");
    expect(data.inLanguage).toBe("es-ES");
    expect(data.encoding.contentUrl).toMatch(/&lang=es$/);
  });

  test("the listing is a collection of every talk", () => {
    const data = talksStructuredData([python, spanishOnly], "es");
    expect(data["@type"]).toBe("CollectionPage");
    expect(data.url).toBe("https://listerineh.dev/slides");
    expect(data.hasPart.map((part) => part.name)).toEqual(["Python tipado", spanishOnly.title]);
    expect(data.hasPart.every((part) => !("@context" in part))).toBe(true);
  });
});
