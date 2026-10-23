'use client';

import { createContext, useContext } from 'react';

export interface SlideState {
  /** The slide is the one on screen (enter animations and loops run only then). */
  active: boolean;
  /** Build steps revealed so far on this slide. */
  step: number;
  /** Thumbnails and print: everything shown, nothing animated. */
  still: boolean;
  deckTitle: string;
  index: number;
  total: number;
}

const SlideContext = createContext<SlideState>({ active: false, step: 0, still: true, deckTitle: '', index: 0, total: 1 });

export const SlideProvider = SlideContext.Provider;

export function useSlide(): SlideState {
  return useContext(SlideContext);
}

/** Props for the n-th item of a list that builds step by step (n is 1-based). */
export function useBuild(enabled: boolean | undefined) {
  const { step, still } = useSlide();
  return (n: number) =>
    enabled && !still ? { 'data-build': '', 'data-pending': step < n ? '' : undefined, 'aria-hidden': step < n ? true : undefined } : {};
}
