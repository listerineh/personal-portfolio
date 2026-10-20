import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getBlogPost } from '@/lib/data/blog/get-blog-posts';
import { FROM, OWNER_EMAIL } from '@/lib/email/layout';
import { weeklyDigestEmail, type WeeklyDigest } from '@/lib/email/templates';
import { getRedis, hasBearerSecret } from '@/lib/server/security';
import { postCounts, type PostCounts } from '@/lib/server/post-stats';
import { isoWeek, statKey } from '@/lib/server/stats';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);
const DAY = 24 * 60 * 60 * 1000;

/** "Oct 12 – Oct 18, 2026" for the Monday–Sunday week that contains `date`. */
function weekRange(date: Date): string {
  const monday = new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * DAY);
  const sunday = new Date(monday.getTime() + 6 * DAY);
  const day = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  return `${day(monday)} – ${day(sunday)}, ${sunday.getUTCFullYear()}`;
}

/** Active subscribers in Resend, following pages. Null if Resend can't be read. */
async function subscriberCount(): Promise<number | null> {
  let total = 0;
  let after: string | undefined;
  for (let page = 0; page < 50; page++) {
    const url = `https://api.resend.com/contacts?limit=100${after ? `&after=${encodeURIComponent(after)}` : ''}`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } });
    if (!response.ok) return null;
    const body: { data?: { id: string; unsubscribed?: boolean }[]; has_more?: boolean } = await response.json();
    const contacts = body.data ?? [];
    total += contacts.filter((contact) => !contact.unsubscribed).length;
    if (!body.has_more || contacts.length === 0) return total;
    after = contacts[contacts.length - 1].id;
  }
  return total;
}

/**
 * The owner's Monday digest, run by Vercel Cron (vercel.json) with `Authorization: Bearer CRON_SECRET`. It covers the
 * ISO week that just ended: newsletter joins/leaves and contact messages (weekly counters, src/lib/server/stats.ts),
 * views and reactions (difference with the totals saved by the previous run), CSP violations, and the current number
 * of subscribers. `?dry=1` returns the digest as JSON without emailing it or saving totals.
 */
export async function GET(request: Request) {
  if (!hasBearerSecret(request, process.env.CRON_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const redis = getRedis();
  if (!redis) return NextResponse.json({ error: 'Redis is not configured' }, { status: 503 });

  const dry = new URL(request.url).searchParams.has('dry');
  const lastWeek = new Date(Date.now() - DAY);
  const week = isoWeek(lastWeek);
  const snapshotKey = `stats:${process.env.VERCEL_ENV || 'development'}:snapshot`;

  const [joined, rejoined, left, contact, csp, counts, previous, total] = await Promise.all([
    redis.get<number>(statKey('subscribed', week)),
    redis.get<number>(statKey('resubscribed', week)),
    redis.get<number>(statKey('unsubscribed', week)),
    redis.get<number>(statKey('contact', week)),
    redis.hgetall<Record<string, number>>(statKey('csp', week)),
    postCounts(),
    redis.get<PostCounts>(snapshotKey),
    subscriberCount(),
  ]);

  const delta = (now: Record<string, number>, before: Record<string, number>) =>
    Object.entries(now).map(([slug, value]) => ({ slug, value: Math.max(0, value - (before[slug] ?? 0)) }));

  const viewDeltas = previous ? delta(counts.views, previous.views ?? {}) : null;
  const cspEntries = Object.entries(csp ?? {}).map(([label, count]) => ({ label, count: Number(count) }));

  const digest: WeeklyDigest = {
    range: weekRange(lastWeek),
    subscribers: { total, joined: Number(joined ?? 0) + Number(rejoined ?? 0), left: Number(left ?? 0) },
    contactMessages: Number(contact ?? 0),
    views: viewDeltas && {
      total: viewDeltas.reduce((sum, entry) => sum + entry.value, 0),
      top: viewDeltas
        .filter((entry) => entry.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map((entry) => ({ slug: entry.slug, title: getBlogPost(entry.slug, 'en')?.title ?? entry.slug, views: entry.value })),
    },
    reactions: previous ? delta(counts.reactions, previous.reactions ?? {}).reduce((sum, entry) => sum + entry.value, 0) : null,
    csp: {
      total: cspEntries.reduce((sum, entry) => sum + entry.count, 0),
      top: cspEntries.sort((a, b) => b.count - a.count).slice(0, 5),
    },
  };

  if (dry) return NextResponse.json({ week, digest });

  const { subject, html, text } = weeklyDigestEmail(digest);
  const { error } = await resend.emails.send({ from: FROM, to: OWNER_EMAIL, subject, html, text });
  if (error) {
    console.error('[weekly-digest]', error);
    return NextResponse.json({ error: 'Failed to send the digest' }, { status: 500 });
  }
  // Next week's view and reaction numbers are counted from here.
  await redis.set(snapshotKey, counts);
  return NextResponse.json({ sent: true, week });
}
