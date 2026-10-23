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

// Branch colors for gitGraph (main first, then branches in the order they are created): distinct hues that read
// on both slide grounds, with white labels on them.
const GIT_BRANCHES = ['#3B82F6', '#8B5CF6', '#22C55E', '#EF4444', '#F59E0B', '#06B6D4', '#EC4899', '#84CC16'];
const gitVariables = (theme: DeckTheme) => ({
  ...Object.fromEntries(GIT_BRANCHES.map((color, i) => [`git${i}`, color])),
  ...Object.fromEntries(GIT_BRANCHES.map((_, i) => [`gitBranchLabel${i}`, '#FFFFFF'])),
  commitLabelColor: PALETTES[theme].textColor,
  commitLabelBackground: PALETTES[theme].secondaryColor,
  tagLabelColor: PALETTES[theme].textColor,
  tagLabelBackground: PALETTES[theme].primaryColor,
  tagLabelBorder: PALETTES[theme].lineColor,
});

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
        gitGraph: { mainBranchName: 'main', showCommitLabel: true, rotateCommitLabel: false },
        themeVariables: {
          ...PALETTES[theme],
          ...gitVariables(theme),
          primaryBorderColor: accent,
          fontFamily: 'Geist, system-ui, sans-serif',
          fontSize: '20px',
        },
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
