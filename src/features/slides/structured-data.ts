import type { Locale } from "@/i18n/config";
import { AUTHOR_NAME, SITE_URL } from "@/lib/metadata";
import { hasLanguage, localizeDeck } from "./i18n";
import type { Deck } from "./schema";

/**
 * schema.org data for the talks, in the same shape the projects and blog listings use: a CollectionPage of talks, and
 * one PresentationDigitalDocument per deck (with its PDF), so search engines know these pages are slide decks.
 */

const inLanguage = (lang: string) => (lang === "es" ? "es-ES" : "en-US");

const author = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: SITE_URL,
  sameAs: [
    "https://github.com/listerineh",
    "https://twitter.com/listerineh",
    "https://linkedin.com/in/listerineh",
  ],
};

/** One deck as a presentation, in `lang` when it has that language, otherwise in its own. */
export function deckStructuredData(found: Deck, lang: string = found.lang) {
  const shown = hasLanguage(found, lang) ? lang : found.lang;
  const deck = localizeDeck(found, shown);
  const url = `${SITE_URL}/slides/${deck.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "PresentationDigitalDocument",
    "@id": url,
    url,
    name: deck.title,
    description: deck.description,
    image: `${SITE_URL}/og/slides/${deck.slug}.png?v=${deck.version}&lang=${shown}`,
    inLanguage: inLanguage(shown),
    dateModified: deck.updatedAt,
    isAccessibleForFree: true,
    author,
    publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      contentUrl: `${url}/pdf?v=${deck.version}&lang=${shown}`,
    },
  };
}

/** The /slides listing: every published talk, in the visitor's language where the deck has it. */
export function talksStructuredData(decks: Deck[], locale: Locale) {
  const url = `${SITE_URL}/slides`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name:
      locale === "es"
        ? "Charlas de Sebastian Alvarez"
        : "Sebastian Alvarez Talks",
    description:
      locale === "es"
        ? "Diapositivas de charlas sobre desarrollo de software, cloud e inteligencia artificial"
        : "Slides from talks on software development, cloud and artificial intelligence",
    author,
    publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    hasPart: decks.map((deck) => {
      const { "@context": _context, ...part } = deckStructuredData(
        deck,
        locale,
      );
      return part;
    }),
    inLanguage: inLanguage(locale),
  };
}
