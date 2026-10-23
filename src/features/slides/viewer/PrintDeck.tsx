'use client';

import type { Deck } from '../schema';
import type { DeckHighlights } from '../code-tokens';
import { accentStyle } from '../theme';
import { SlideCanvas } from '../renderer/SlideView';

/** Every slide, fully built and still, one 1920×1080 page each: what the PDF is printed from. */
export function PrintDeck({ deck, highlights }: { deck: Deck; highlights: DeckHighlights }) {
  return (
    <main className="deck print-deck" data-theme={deck.theme} style={accentStyle(deck.accent, deck.theme)} lang={deck.lang}>
      {deck.slides.map((slide, index) => (
        <section key={slide.id} className="print-page" aria-label={`${index + 1} / ${deck.slides.length}`}>
          <SlideCanvas
            slide={slide}
            lang={deck.lang}
            state={{ active: false, still: true, step: 0, deckTitle: deck.title, index, total: deck.slides.length, code: highlights[slide.id] }}
          />
        </section>
      ))}
    </main>
  );
}
