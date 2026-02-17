'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Modern Mesh Gradient - Static */}
      <div 
        className="absolute inset-0 opacity-75"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, hsl(var(--primary) / 0.5) 0px, transparent 35%),
            radial-gradient(circle at 85% 15%, hsl(var(--accent) / 0.45) 0px, transparent 35%),
            radial-gradient(circle at 45% 75%, hsl(var(--primary) / 0.4) 0px, transparent 35%),
            radial-gradient(circle at 90% 85%, hsl(var(--accent) / 0.42) 0px, transparent 35%),
            radial-gradient(circle at 10% 90%, hsl(var(--primary) / 0.35) 0px, transparent 35%)
          `,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Noise Texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
      
      {/* Subtle animated gradient (CSS only) */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            linear-gradient(125deg, 
              hsl(var(--primary) / 0.18) 0%, 
              transparent 40%, 
              transparent 60%, 
              hsl(var(--accent) / 0.18) 100%
            )
          `,
          animation: 'gradient-shift 15s ease infinite',
        }}
      />

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
