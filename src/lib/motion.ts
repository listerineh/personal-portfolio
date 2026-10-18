/**
 * Lumen motion: physical springs, not easing curves (damping ratio + response, as Apple ships them).
 * The CSS tokens --spring-snap / --spring-glide / --spring-bounce in globals.css are sampled from these presets.
 */

export type SpringPreset = {
  stiffness: number;
  damping: number;
  mass?: number;
};

/** Converts Apple's damping ratio + response (seconds) into stiffness/damping for a unit mass. */
function fromResponse(dampingRatio: number, response: number): SpringPreset {
  const omega = (2 * Math.PI) / response;
  return { stiffness: omega * omega, damping: 2 * dampingRatio * omega };
}

export const springs = {
  /** UI feedback: critically damped, response 0.35s. */
  snap: fromResponse(1, 0.35),
  /** Content settling into place: critically damped, response 0.55s. */
  glide: fromResponse(1, 0.55),
  /** Only after a gesture carried momentum: damping 0.8, response 0.45s. */
  bounce: fromResponse(0.8, 0.45),
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
 * JS spring for imperative animation: `{ duration, ease } = spring(springs.glide)`.
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
