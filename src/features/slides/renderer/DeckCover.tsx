'use client';

import { accentStyle } from '../theme';
import type { DeckSummary } from '../summary';
import { SlideCanvas, SlideFrame } from './SlideView';

/** A deck's first slide, still, filling its box: the cover in listings. */
export function DeckCover({ deck }: { deck: DeckSummary }) {
  return (
    // The deck scope sets theme and accent tokens; its stage ground is dropped so only the slide shows.
    <div className="deck !bg-transparent" data-theme={deck.theme} style={accentStyle(deck.accent, deck.theme)}>
      <SlideFrame bare>
        <SlideCanvas slide={deck.cover} lang={deck.lang} state={{ active: false, still: true, step: 0, deckTitle: deck.title, index: 0, total: 1 }} />
      </SlideFrame>
    </div>
  );
}
