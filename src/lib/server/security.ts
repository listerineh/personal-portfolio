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
