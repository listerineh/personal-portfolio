import { Redis } from "@upstash/redis";

/** Shared guards for the public API routes (edge and node safe: Web APIs and Upstash's REST client only). */

let redis: Redis | null | undefined;
function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

/** The caller's IP as set by the platform (Vercel overwrites x-forwarded-for; the first hop is the client). */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

/**
 * Fixed-window limit per key: true while the caller is within `limit` requests per `windowSeconds`.
 * Without Redis (local dev) it allows everything rather than failing the feature.
 */
export async function withinRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const client = getRedis();
  if (!client) return true;
  const bucket = `ratelimit:${key}`;
  const count = await client.incr(bucket);
  if (count === 1) await client.expire(bucket, windowSeconds);
  return count <= limit;
}

/** Constant-time comparison of a `Bearer <secret>` header. Fails closed when the secret is not configured. */
export function hasBearerSecret(
  request: Request,
  secret: string | undefined,
): boolean {
  if (!secret) return false;
  const given = new TextEncoder().encode(
    request.headers.get("authorization") ?? "",
  );
  const expected = new TextEncoder().encode(`Bearer ${secret}`);
  let diff = given.length ^ expected.length;
  for (let i = 0; i < expected.length; i++)
    diff |= expected[i] ^ (given[i] ?? 0);
  return diff === 0;
}

/** Escapes text for interpolation into an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Blog slugs are lowercase words joined by hyphens; anything else never names a post. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function isValidSlug(slug: string): boolean {
  return slug.length <= 120 && SLUG_PATTERN.test(slug);
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isValidEmail(email: unknown): email is string {
  return (
    typeof email === "string" &&
    email.length <= 254 &&
    EMAIL_PATTERN.test(email)
  );
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

function base64url(bytes: ArrayBuffer): string {
  let binary = '';
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Signed proof that an unsubscribe request comes from the mailbox itself: HMAC-SHA256 of the address, keyed with
 * NEWSLETTER_SECRET (domain-separated so it can never double as the blast credential). Null when the secret is unset.
 */
export async function unsubscribeToken(email: string): Promise<string | null> {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) return null;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`unsubscribe:${email.trim().toLowerCase()}`));
  return base64url(signature);
}

export async function verifyUnsubscribeToken(email: string, token: string): Promise<boolean> {
  const expected = await unsubscribeToken(email);
  if (!expected || token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}

/** The page link (people confirm with a button) and the RFC 8058 one-click endpoint for mail clients. */
export async function unsubscribeLinks(email: string): Promise<{ page: string; oneClick: string } | null> {
  const token = await unsubscribeToken(email);
  if (!token) return null;
  const query = `email=${encodeURIComponent(email)}&token=${token}`;
  return { page: `${SITE}/unsubscribe?${query}`, oneClick: `${SITE}/api/newsletter/unsubscribe?${query}` };
}

/** Headers that give mail clients a native "Unsubscribe" button (required by Gmail and Yahoo for bulk senders). */
export function listUnsubscribeHeaders(oneClick: string): Record<string, string> {
  return { 'List-Unsubscribe': `<${oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' };
}
