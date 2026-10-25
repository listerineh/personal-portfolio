'use client';

import { useTheme } from '@/context/theme-context';
import { accentStyle } from '../theme';
import type { DeckSummary } from '../summary';
import { SlideCanvas, SlideFrame } from './SlideView';

/** The slide a deck shows in listings (its hook, see toDeckSummary), still, filling its box. */
export function DeckCover({ deck }: { deck: DeckSummary }) {
  // Slides follow the site's light/dark theme.
  const { theme } = useTheme();
  return (
    // The deck scope sets theme and accent tokens; its stage ground is dropped so only the slide shows.
    <div className="deck !bg-transparent" data-theme={theme} style={accentStyle(deck.accent, theme)}>
      <SlideFrame bare>
        <SlideCanvas slide={deck.cover} lang={deck.lang} state={{ active: false, still: true, step: 0, deckTitle: deck.title, index: 0, total: 1 }} />
      </SlideFrame>
    </div>
  );
}
