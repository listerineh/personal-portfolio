import { MARK, OG_HEIGHT, OG_WIDTH } from './blog-card';

/**
 * Share card for a presentation, drawn by next/og (Satori). Same Lumen card as the blog's, in the deck's own accent:
 * the talk's title and where it was given on the left, a small stack of slides with its cover on the right.
 */

const INK = '#1D1D1F';
const MUTED = '#6E6E73';

const backdrop = (accent: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <radialGradient id="a" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${accent}" stop-opacity="0.22"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
        <radialGradient id="fade" cx="0.7" cy="0.45" r="0.55"><stop offset="0.2" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.1" fill="#1D1D1F" fill-opacity="0.09"/></pattern>
        <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
      </defs>
      <rect width="1200" height="630" fill="#FFFFFF"/>
      <rect width="1200" height="630" fill="url(#dots)" mask="url(#m)"/>
      <circle cx="1130" cy="-40" r="560" fill="url(#a)"/>
    </svg>`,
  ).toString('base64')}`;

// The cover slide's own light: the accent halo in its top right corner.
const coverHalo = (accent: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="456" height="256"><defs><radialGradient id="h" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${accent}" stop-opacity="0.28"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs><circle cx="400" cy="10" r="230" fill="url(#h)"/></svg>`,
  ).toString('base64')}`;

function titleSize(title: string): number {
  if (title.length <= 40) return 62;
  if (title.length <= 60) return 52;
  if (title.length <= 80) return 44;
  return 40;
}

export interface SlidesCardProps {
  title: string;
  /** "Talk" / "Charla". */
  label: string;
  /** "Sebastian Alvarez · Build with AI · May 2026" */
  byline: string;
  /** The deck's accent fill and its AA ink for small text. */
  accent: string;
  ink: string;
}

export function SlidesCard({ title, label, byline, accent, ink }: SlidesCardProps) {
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
      <img src={backdrop(accent)} width={OG_WIDTH} height={OG_HEIGHT} style={{ position: 'absolute', left: 0, top: 0 }} />

      <div style={{ position: 'absolute', left: 72, top: 64, bottom: 64, width: 540, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 600, letterSpacing: -0.44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={MARK} width={40} height={40} />
          <span>listerineh.dev/slides</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 15, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: ink }}>{label}</div>
          <div style={{ display: 'block', marginTop: 16, fontSize: size, lineHeight: 1.06, fontWeight: 700, letterSpacing: -size * 0.035, lineClamp: 4 }}>
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32, fontSize: 19, fontWeight: 500, color: MUTED }}>
            <div style={{ display: 'flex', width: 9, height: 9, borderRadius: 9999, backgroundColor: accent }} />
            <span>{byline}</span>
          </div>
        </div>
      </div>

      {/* A short stack of slides: two sheets behind, the cover in front. */}
      <div style={{ position: 'absolute', right: 64, top: 0, bottom: 0, width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            width: 420,
            height: 236,
            display: 'flex',
            borderRadius: 22,
            backgroundColor: '#E8E8ED',
            transform: 'translate(40px, -58px) rotate(7deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 440,
            height: 248,
            display: 'flex',
            borderRadius: 22,
            backgroundColor: '#F5F5F7',
            transform: 'translate(20px, -30px) rotate(3deg)',
            boxShadow: '0 18px 40px -16px rgba(0,0,0,0.16)',
          }}
        />
        <div
          style={{
            position: 'relative',
            width: 456,
            height: 256,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 28,
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05), 0 28px 56px -18px rgba(0,0,0,0.24)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={coverHalo(accent)} width={456} height={256} style={{ position: 'absolute', left: 0, top: 0 }} />
          <div style={{ display: 'flex', fontSize: 11, fontWeight: 600, color: ink }}>{label}</div>
          <div style={{ display: 'block', marginTop: 6, fontSize: 30, lineHeight: 1.04, fontWeight: 700, letterSpacing: -1.1, lineClamp: 3 }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
