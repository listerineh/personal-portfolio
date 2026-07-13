'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">

      {/* Blob 1 — primary/indigo, top-left */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '62%',
          height: '72%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.52) 0%, transparent 68%)',
          animation: 'blob1 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 2 — accent/rose, top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '56%',
          height: '66%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.46) 0%, transparent 68%)',
          animation: 'blob2 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 3 — primary, bottom-center */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '18%',
          width: '56%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.38) 0%, transparent 68%)',
          animation: 'blob3 30s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Blob 4 — accent, bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12%',
          right: '-8%',
          width: '46%',
          height: '56%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.40) 0%, transparent 68%)',
          animation: 'blob4 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Noise Texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

      <style jsx>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25%       { transform: translate(4%, 5%) scale(1.05); }
          50%       { transform: translate(2%, 2%) scale(0.97); }
          75%       { transform: translate(-3%, 4%) scale(1.03); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          30%       { transform: translate(-5%, 5%) scale(1.06); }
          60%       { transform: translate(-2%, -3%) scale(0.96); }
          80%       { transform: translate(3%, 2%) scale(1.02); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          35%       { transform: translate(4%, -5%) scale(1.07); }
          65%       { transform: translate(-4%, -2%) scale(0.95); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          40%       { transform: translate(-4%, -5%) scale(1.05); }
          70%       { transform: translate(3%, -2%) scale(0.97); }
        }
      `}</style>
    </div>
  );
}
