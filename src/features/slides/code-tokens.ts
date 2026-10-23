/** One highlighted token: its text and its color in the light and dark slide themes. Plain data, safe on the client. */
export interface CodeToken {
  t: string;
  l?: string;
  d?: string;
}

/** A highlighted snippet: lines of tokens. */
export type CodeTokens = CodeToken[][];

/** Highlighted code per slide id, computed on the server (highlight.ts). */
export type DeckHighlights = Record<string, CodeTokens>;
