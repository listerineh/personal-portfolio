import type { CSSProperties } from "react";

/**
 * Per-deck accent. A deck swaps the brand amber for its own color; everything else in Lumen stays put. From one hex we
 * derive the three tokens the design system reads (globals.css):
 * - --primary: the fill (actions, live states, rules, glows), the hex as given.
 * - --primary-foreground: text on that fill, ink or white, whichever reads better.
 * - --primary-ink: small accent text, moved along OKLCH lightness until it passes AA on the theme's weakest ground.
 */

export type DeckTheme = "light" | "dark";
type Rgb = [number, number, number];

export const BRAND_AMBER = "#d97706";

export const ACCENT_PRESETS = {
  amber: BRAND_AMBER,
  blue: "#2563eb",
  teal: "#0d9488",
  green: "#16a34a",
  violet: "#7c3aed",
  rose: "#e11d48",
} as const;

const INK: Rgb = [29, 29, 31]; // #1D1D1F
const WHITE: Rgb = [255, 255, 255];
// The weakest grounds accent text sits on: tint/panel in light, the raised panel on tint in dark.
const WEAKEST_GROUND: Record<DeckTheme, Rgb> = {
  light: [245, 245, 247],
  dark: [36, 36, 38],
};
const AA_TEXT = 4.5;
const AA_UI = 3;

// The brand amber keeps its hand-tuned tokens (globals.css :root / .dark).
const BRAND_TOKENS: Record<DeckTheme, { ink: Rgb; foreground: Rgb }> = {
  light: { ink: [168, 75, 10], foreground: INK },
  dark: { ink: [232, 137, 12], foreground: INK },
};

export function hexToRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

const toLinear = (channel: number) => {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

function luminance([r, g, b]: Rgb): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG 2 contrast ratio. */
export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// sRGB ↔ OKLCH (Björn Ottosson's OKLab), enough to walk lightness while keeping hue.
function rgbToOklch(rgb: Rgb): [number, number, number] {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}

function oklchToLinear([L, C, h]: [number, number, number]): [
  number,
  number,
  number,
] {
  const A = C * Math.cos(h);
  const B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

/** Back to sRGB, lowering chroma until the color fits the gamut. */
function oklchToRgb([L, C, h]: [number, number, number]): Rgb {
  let chroma = C;
  for (let i = 0; i < 40; i++) {
    const linear = oklchToLinear([L, chroma, h]);
    if (linear.every((c) => c >= -1e-4 && c <= 1 + 1e-4)) {
      return linear.map((c) =>
        Math.round(Math.min(1, Math.max(0, fromLinear(Math.max(0, c)))) * 255),
      ) as Rgb;
    }
    chroma *= 0.9;
  }
  const grey = Math.round(Math.min(1, Math.max(0, fromLinear(L ** 3))) * 255);
  return [grey, grey, grey];
}

/** The closest color to `rgb` (same hue) with at least `target` contrast on `ground`. */
function inkFor(rgb: Rgb, ground: Rgb, target: number, direction: 1 | -1): Rgb {
  if (contrast(rgb, ground) >= target) return rgb;
  const [L, C, h] = rgbToOklch(rgb);
  for (let next = L; next >= 0 && next <= 1; next += 0.005 * direction) {
    const candidate = oklchToRgb([next, C, h]);
    if (contrast(candidate, ground) >= target) return candidate;
  }
  return direction === -1 ? INK : WHITE;
}

export interface AccentTokens {
  primary: Rgb;
  foreground: Rgb;
  ink: Rgb;
  /** Set when the fill itself is too faint against the ground to read as a shape (WCAG 1.4.11). */
  warning?: "low-fill-contrast";
}

export function accentTokens(hex: string, theme: DeckTheme): AccentTokens {
  const primary = hexToRgb(hex);
  const ground = WEAKEST_GROUND[theme];
  if (hex.toLowerCase() === BRAND_AMBER)
    return { primary, ...BRAND_TOKENS[theme] };

  const foreground =
    contrast(primary, INK) >= contrast(primary, WHITE) ? INK : WHITE;
  const ink = inkFor(
    primary,
    ground,
    AA_TEXT + 0.1,
    theme === "light" ? -1 : 1,
  );
  return {
    primary,
    foreground,
    ink,
    ...(contrast(primary, ground) < AA_UI
      ? { warning: "low-fill-contrast" as const }
      : {}),
  };
}

const triplet = ([r, g, b]: Rgb) => `${r} ${g} ${b}`;

/** Inline custom properties for the deck root; they re-scope every Lumen token that reads the accent. */
export function accentStyle(hex: string, theme: DeckTheme): CSSProperties {
  const { primary, foreground, ink } = accentTokens(hex, theme);
  return {
    "--primary": triplet(primary),
    "--primary-foreground": triplet(foreground),
    "--primary-ink": triplet(ink),
    "--ring": triplet(theme === "dark" ? ink : primary),
  } as CSSProperties;
}
