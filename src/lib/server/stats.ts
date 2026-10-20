import { getRedis } from './security';

/**
 * Weekly counters for the owner's digest (src/app/api/cron/weekly-digest). Keys are per environment, so staging and
 * PR previews (which share the Redis store) never inflate production's numbers, and per ISO week, kept 10 weeks.
 * Every call is best effort: a counter that fails to write never breaks the request that triggered it.
 */

export type StatEvent = 'subscribed' | 'resubscribed' | 'unsubscribed' | 'contact';

const KEEP_SECONDS = 70 * 24 * 60 * 60;

const environment = () => process.env.VERCEL_ENV || 'development';

/** ISO 8601 week of a date, e.g. "2026-W43". */
export function isoWeek(date: Date): string {
  const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = day.getUTCDay() || 7;
  day.setUTCDate(day.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((day.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${day.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export const statKey = (name: string, week: string, env = environment()) => `stats:${env}:${week}:${name}`;

export async function recordEvent(event: StatEvent, now = new Date()): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const key = statKey(event, isoWeek(now));
    await redis.incr(key);
    await redis.expire(key, KEEP_SECONDS);
  } catch (error) {
    console.error('[stats]', event, error);
  }
}

/** One CSP violation, grouped by directive and blocked origin ("img-src evil.example"). */
export async function recordCspViolation(directive: string, blocked: string, now = new Date()): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  let origin = blocked || 'inline';
  try {
    origin = new URL(blocked).host || origin;
  } catch {
    // "inline", "eval", "data"… are kept as they are.
  }
  try {
    const key = statKey('csp', isoWeek(now));
    await redis.hincrby(key, `${directive.slice(0, 40)} ${origin.slice(0, 80)}`, 1);
    await redis.expire(key, KEEP_SECONDS);
  } catch (error) {
    console.error('[stats] csp', error);
  }
}
