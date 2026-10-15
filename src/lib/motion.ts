/**
 * Sala motion: physical springs, not easing curves.
 * The CSS tokens --spring-hang / --spring-snap in globals.css are sampled from these presets.
 */

export type SpringPreset = {
  stiffness: number;
  damping: number;
  mass?: number;
};

export const springs = {
  /** A work settling on the wall: ~6% overshoot. */
  hang: { stiffness: 180, damping: 18 },
  /** UI feedback: critically damped, no overshoot. */
  snap: { stiffness: 420, damping: 42 },
  /** The route line advancing between rooms. */
  route: { stiffness: 140, damping: 24 },
} as const satisfies Record<string, SpringPreset>;

/** Displacement of a unit spring released from 0 toward 1 at time t (seconds). */
function springAt(
  { stiffness, damping, mass = 1 }: SpringPreset,
  t: number,
): number {
  const omega = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    return (
      1 -
      Math.exp(-zeta * omega * t) *
        (Math.cos(omegaD * t) +
          ((zeta * omega) / omegaD) * Math.sin(omegaD * t))
    );
  }
  return 1 - Math.exp(-omega * t) * (1 + omega * t);
}

/** Time (seconds) until the spring stays within `tolerance` of rest. */
function settleTime(preset: SpringPreset, tolerance = 0.001): number {
  let last = 0;
  for (let t = 0; t < 5; t += 0.001) {
    if (Math.abs(1 - springAt(preset, t)) > tolerance) last = t;
  }
  return last;
}

const cache = new Map<
  SpringPreset,
  { duration: number; ease: (progress: number) => number }
>();

/**
 * GSAP-ready spring: `gsap.to(el, { y: 0, ...spring(springs.hang) })`.
 * Duration is the physical settle time, so the motion never ends early or drags.
 */
export function spring(preset: SpringPreset): {
  duration: number;
  ease: (progress: number) => number;
} {
  const hit = cache.get(preset);
  if (hit) return hit;
  const duration = settleTime(preset);
  const value = {
    duration,
    ease: (progress: number) =>
      progress >= 1 ? 1 : springAt(preset, progress * duration),
  };
  cache.set(preset, value);
  return value;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
