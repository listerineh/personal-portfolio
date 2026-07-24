'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ borderRadius: '9999px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', padding: '1.25rem', display: 'inline-flex' }}>
                <AlertTriangle style={{ width: '2.5rem', height: '2.5rem', color: '#fbbf24' }} />
              </div>
            </div>

            <p style={{ fontSize: '0.625rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.6)', marginBottom: '1.25rem' }}>
              Critical Error
            </p>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Something went critically wrong
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              A critical error occurred and the application could not recover. Please try refreshing the page.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={reset}
                style={{ padding: '0.625rem 1.5rem', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.875rem', width: '100%', maxWidth: '240px' }}
              >
                Try again
              </button>
              <button
                onClick={() => { window.location.href = '/'; }}
                style={{ padding: '0.625rem 1.5rem', border: 'none', borderRadius: '0.5rem', background: '#f59e0b', color: '#000', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, width: '100%', maxWidth: '240px' }}
              >
                Go to homepage
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
