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
              <div className="rounded-full bg-primary/10 border border-primary/20 p-5 inline-flex">
                <AlertTriangle className="w-10 h-10 text-primary" />
              </div>
            </div>

            <p className="text-[0.625rem] tracking-[0.3em] uppercase text-primary/60 mb-5">
              Critical Error
            </p>
            <h1 className="text-display-sm font-bold text-white mb-4">
              Something went critically wrong
            </h1>
            <p className="text-white/45 leading-relaxed mb-10 text-sm">
              A critical error occurred and the application could not recover. Please try refreshing the page.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={reset}
                className="py-2.5 px-6 border border-white/12 rounded-lg bg-transparent text-white/60 text-sm w-full max-w-[240px] cursor-pointer"
              >
                Try again
              </button>
              <button
                onClick={() => { window.location.href = '/'; }}
                className="py-2.5 px-6 border-none rounded-lg bg-primary text-black text-sm font-semibold w-full max-w-[240px] cursor-pointer"
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
