'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// Renders without the root layout (no fonts, no providers), so it carries the palette inline.
const wall = '#1F4A3A';
const paper = '#F3F3EF';
const muted = '#CFE0D6';
const amber = '#D97706';
const ink = '#141614';

const button = {
  minHeight: 48,
  padding: '0 24px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const;

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: wall, color: paper, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px clamp(16px, 5vw, 72px)' }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: muted, margin: 0 }}>500</p>
            <h1 style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.02em', margin: '12px 0 0' }}>
              Something went critically wrong
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: muted, maxWidth: '48ch', margin: '20px 0 0' }}>
              A critical error occurred and the application could not recover. Please try refreshing the page.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <button type="button" onClick={reset} style={{ ...button, background: amber, color: ink, border: 'none' }}>
                Try again
              </button>
              <Link
                href="/"
                style={{ ...button, display: 'inline-flex', alignItems: 'center', textDecoration: 'none', background: 'transparent', color: paper, border: `1.5px solid ${paper}` }}
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
