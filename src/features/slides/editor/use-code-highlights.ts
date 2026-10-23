'use client';

import { useEffect, useState } from 'react';
import type { Slide } from '../schema';
import type { CodeTokens, DeckHighlights } from '../code-tokens';
import { highlightCodeAction } from '../actions';

const DELAY = 350;

/**
 * Highlighted code for the editor's slides: starts from what the server computed for the page, then re-highlights the
 * selected code slide shortly after its code or language stops changing. Stale answers are dropped.
 */
export function useCodeHighlights(slide: Slide, initial: DeckHighlights): DeckHighlights {
  const [highlights, setHighlights] = useState<DeckHighlights>(initial);
  const key = slide.layout === 'code' ? `${slide.language}\u0000${slide.code}` : null;

  useEffect(() => {
    if (slide.layout !== 'code') return;
    const { id, code, language } = slide;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const tokens: CodeTokens | null = await highlightCodeAction(code, language);
      if (!cancelled && tokens) setHighlights((current) => ({ ...current, [id]: tokens }));
    }, DELAY);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // Re-run only when the selected slide's code or language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.id, key]);

  // While new tokens are on their way, a slide whose code changed shows plain text rather than stale colors.
  if (slide.layout === 'code') {
    const tokens = highlights[slide.id];
    const text = tokens?.map((line) => line.map((token) => token.t).join('')).join('\n');
    if (tokens && text !== slide.code) {
      const { [slide.id]: _stale, ...rest } = highlights;
      return rest;
    }
  }
  return highlights;
}
