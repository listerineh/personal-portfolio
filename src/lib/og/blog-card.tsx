/**
 * Share card for a blog post, drawn by next/og (Satori): the Lumen card used for pages and projects
 * (scripts/generate-og-images.js), with the post's title and byline on the left and its cover on the right.
 * Satori supports a subset of CSS: every element with children is flex, no masks, no filters.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const AMBER = '#D97706';
const INK = '#1D1D1F';
const MUTED = '#6E6E73';

// The site mark (public/favicon.svg): white code brackets on an amber disc.
export const MARK = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${AMBER}"/><path fill="#fff" d="M42.5,42c-0.7,0-1.3-0.3-1.7-1c-0.6-0.9-0.3-2.2,0.7-2.8l10.1-6.2l-10.1-6.2c-0.9-0.6-1.2-1.8-0.7-2.8c0.6-0.9,1.8-1.2,2.8-0.7l10.6,6.6l0.2,0.2c1.6,1.6,1.6,4.3,0,6l-0.2,0.2l-10.6,6.6C43.2,41.9,42.8,42,42.5,42z M21.5,42c-0.4,0-0.7-0.1-1-0.3L9.9,35.1L9.7,35c-1.6-1.6-1.6-4.3,0-6l0.2-0.2l10.6-6.6c0.9-0.6,2.2-0.3,2.8,0.7c0.6,0.9,0.3,2.2-0.7,2.8l-10.1,6.2l10.1,6.2c0.9,0.6,1.2,1.8,0.7,2.8C22.9,41.7,22.2,42,21.5,42z M25.5,51c-0.2,0-0.5,0-0.7-0.1c-1-0.4-1.5-1.6-1.2-2.6l13-34c0.4-1,1.6-1.5,2.6-1.2c1,0.4,1.5,1.6,1.2,2.6l-13,34C27.1,50.5,26.3,51,25.5,51z"/></svg>`,
).toString('base64')}`;

// Warm halos and the faint dot grid, as an SVG backdrop: Satori draws CSS radial gradients with hard edges.
const BACKDROP = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="a" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#D97706" stop-opacity="0.20"/><stop offset="1" stop-color="#D97706" stop-opacity="0"/></radialGradient>
      <radialGradient id="b" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#F59E0B" stop-opacity="0.12"/><stop offset="1" stop-color="#F59E0B" stop-opacity="0"/></radialGradient>
      <radialGradient id="fade" cx="0.7" cy="0.45" r="0.55"><stop offset="0.2" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.1" fill="#1D1D1F" fill-opacity="0.09"/></pattern>
      <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
    </defs>
    <rect width="1200" height="630" fill="#FFFFFF"/>
    <rect width="1200" height="630" fill="url(#dots)" mask="url(#m)"/>
    <circle cx="1130" cy="-40" r="560" fill="url(#a)"/>
    <circle cx="90" cy="700" r="430" fill="url(#b)"/>
  </svg>`,
).toString('base64')}`;

/** Title size by length: short titles stay display-size, the longest still fit in four lines. */
function titleSize(title: string): number {
  if (title.length <= 40) return 64;
  if (title.length <= 60) return 54;
  if (title.length <= 80) return 46;
  return 42;
}

export interface BlogCardProps {
  title: string;
  /** "Sebastian Alvarez · January 14, 2026 · 9 min read" */
  byline: string;
  /** Cover as a data URI (JPEG/PNG; Satori can't decode WebP). Omitted: the panel shows the mark. */
  cover?: string;
}

export function BlogCard({ title, byline, cover }: BlogCardProps) {
  const size = titleSize(title);
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Geist',
        color: INK,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={BACKDROP} width={OG_WIDTH} height={OG_HEIGHT} style={{ position: 'absolute', left: 0, top: 0 }} />

      <div style={{ position: 'absolute', left: 72, top: 64, bottom: 64, width: 560, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 600, letterSpacing: -0.44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={MARK} width={40} height={40} />
          <span>listerineh.dev</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 15, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: '#A84B0A' }}>
            Blog
          </div>
          <div
            style={{
              display: 'block',
              marginTop: 16,
              fontSize: size,
              lineHeight: 1.06,
              fontWeight: 700,
              letterSpacing: -size * 0.035,
              lineClamp: 4,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32, fontSize: 19, fontWeight: 500, color: MUTED }}>
            <div style={{ display: 'flex', width: 9, height: 9, borderRadius: 9999, backgroundColor: AMBER }} />
            <span>{byline}</span>
          </div>
        </div>
      </div>

      {/* The cover on a lifted panel, a second sheet behind it for depth. */}
      <div style={{ position: 'absolute', right: 64, top: 0, bottom: 0, width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            width: 420,
            height: 280,
            display: 'flex',
            borderRadius: 26,
            backgroundColor: '#F5F5F7',
            transform: 'translate(34px, -46px) rotate(6deg)',
            boxShadow: '0 24px 56px -18px rgba(0,0,0,0.18)',
          }}
        />
        <div
          style={{
            width: 456,
            height: 304,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 26,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            transform: 'rotate(-3deg)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 24px 56px -18px rgba(0,0,0,0.22)',
          }}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img src={cover} width={456} height={304} style={{ objectFit: 'cover' }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img src={MARK} width={120} height={120} />
          )}
        </div>
      </div>
    </div>
  );
}
