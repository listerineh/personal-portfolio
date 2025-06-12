'use client';

export default function AnimatedBackground() {
  const circles = Array(15).fill(0).map((_, i) => ({
    id: i,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: 6 + (i % 7),
    duration: 10 + (i % 10)
  }));

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {circles.map(circle => (
          <circle
            key={circle.id}
            className="animate-float opacity-10 fill-accent"
            cx={`${circle.cx}%`}
            cy={`${circle.cy}%`}
            r={`${circle.r}%`}
            style={{
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}