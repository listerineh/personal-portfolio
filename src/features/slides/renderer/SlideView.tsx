'use client';

import { useLayoutEffect, useRef, useState, type ReactElement } from 'react';
import { cn } from '@/lib/utils';
import type { Slide, SlideLayout } from '../schema';
import { SlideProvider, type SlideState } from './context';
import * as L from './layouts';

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- each entry receives its own narrowed slide
const LAYOUTS: Record<SlideLayout, (props: { slide: any; lang: string }) => ReactElement> = {
  title: L.TitleLayout,
  section: L.SectionLayout,
  statement: L.StatementLayout,
  bullets: L.BulletsLayout,
  'two-column': L.TwoColumnLayout,
  'image-full': L.ImageFullLayout,
  'image-text': L.ImageTextLayout,
  stats: L.StatsLayout,
  quote: L.QuoteLayout,
  code: L.CodeLayout,
  diagram: L.DiagramLayout,
  embed: L.EmbedLayout,
  'icons-grid': L.IconsGridLayout,
  intro: L.IntroLayout,
  closing: L.ClosingLayout,
};

// Layouts that sit on the tint ground, so consecutive slides alternate like site sections.
const TINTED = new Set<SlideLayout>(['section', 'statement']);

/** One slide on its 1920×1080 canvas, unscaled. */
export function SlideCanvas({ slide, lang, state }: { slide: Slide; lang: string; state: SlideState }) {
  const Layout = LAYOUTS[slide.layout];
  return (
    <SlideProvider value={state}>
      <div
        className={cn('slide-canvas', TINTED.has(slide.layout) && 'tint')}
        data-layout={slide.layout}
        data-active={state.active && !state.still ? '' : undefined}
      >
        <Layout slide={slide} lang={lang} />
      </div>
    </SlideProvider>
  );
}

/**
 * A 16:9 box at whatever size its parent allows; the canvas inside is scaled to fit, so the design never reflows.
 * `fit="contain"` fills a stage (viewer); `fit="width"` follows the parent's width (thumbnails, listings).
 */
export function SlideFrame({
  children,
  fit = 'width',
  bare = false,
  className,
}: {
  children: React.ReactNode;
  fit?: 'width' | 'contain';
  bare?: boolean;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const element = outer.current;
    if (!element) return;
    const measure = () => {
      const { width, height } = element.getBoundingClientRect();
      const scale = fit === 'contain' ? Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT) : width / CANVAS_WIDTH;
      setSize({ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fit]);

  const scale = size ? size.width / CANVAS_WIDTH : 0;

  return (
    <div ref={outer} className={cn(fit === 'contain' ? 'flex h-full w-full items-center justify-center' : 'w-full', className)}>
      <div
        className="slide-frame"
        data-bare={bare ? '' : undefined}
        style={size ? { width: size.width, height: size.height } : { width: '100%', aspectRatio: '16 / 9', maxHeight: '100%' }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0', visibility: size ? 'visible' : 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}
