'use client';

import type { DeckTheme } from '../theme';

/**
 * Mermaid in the editor only (the viewer shows the stored SVG). Lumen look: Geist, neutral nodes ringed in the deck
 * accent, muted lines; labels as SVG text (no HTML labels) so the output sanitizes to plain SVG.
 */

const PALETTES: Record<DeckTheme, Record<string, string>> = {
  light: {
    background: 'transparent',
    primaryColor: '#FFFFFF',
    primaryTextColor: '#1D1D1F',
    secondaryColor: '#F5F5F7',
    tertiaryColor: '#E8E8ED',
    lineColor: '#6E6E73',
    textColor: '#1D1D1F',
    edgeLabelBackground: '#F5F5F7',
    clusterBkg: '#FFFFFF',
    clusterBorder: '#D2D2D7',
    noteBkgColor: '#FFFFFF',
    noteTextColor: '#1D1D1F',
  },
  dark: {
    background: 'transparent',
    primaryColor: '#2C2C2E',
    primaryTextColor: '#F5F5F7',
    secondaryColor: '#1C1C1E',
    tertiaryColor: '#38383A',
    lineColor: '#A1A1A6',
    textColor: '#F5F5F7',
    edgeLabelBackground: '#1C1C1E',
    clusterBkg: '#242426',
    clusterBorder: '#38383A',
    noteBkgColor: '#2C2C2E',
    noteTextColor: '#F5F5F7',
  },
};

export type DiagramRender = { ok: true; svg: string; svgDark: string } | { ok: false; error: string };

let renderCount = 0;

/** Renders a Mermaid source for both slide themes and sanitizes the result. */
export async function renderDiagram(source: string, accent: string, idBase: string): Promise<DiagramRender> {
  const [{ default: mermaid }, { default: DOMPurify }] = await Promise.all([import('mermaid'), import('dompurify')]);
  const out: Partial<Record<DeckTheme, string>> = {};
  try {
    for (const theme of ['light', 'dark'] as const) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        htmlLabels: false,
        flowchart: { htmlLabels: false, curve: 'basis', padding: 16 },
        fontFamily: 'Geist, system-ui, sans-serif',
        themeVariables: { ...PALETTES[theme], primaryBorderColor: accent, fontFamily: 'Geist, system-ui, sans-serif', fontSize: '20px' },
      });
      renderCount += 1;
      const { svg } = await mermaid.render(`${idBase}-${theme}-${renderCount}`, source);
      out[theme] = DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true }, ADD_TAGS: ['style'] });
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message.split('\n')[0] : String(error) };
  }
  return { ok: true, svg: out.light!, svgDark: out.dark! };
}
