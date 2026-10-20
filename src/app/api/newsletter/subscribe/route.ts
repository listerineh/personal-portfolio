import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clientIp, isValidEmail, SUBSCRIBE_LINK_DAYS, subscribeLink, withinRateLimit } from '@/lib/server/security';
import { FROM } from '@/lib/email/layout';
import { confirmSubscriptionEmail } from '@/lib/email/templates';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Step one of the double opt-in: emails a signed "confirm your subscription" link (valid SUBSCRIBE_LINK_DAYS) and
 * adds nobody. The contact is created only when the link is confirmed (/api/newsletter/confirm), so nobody can sign
 * up someone else's address. The answer is the same whether or not the address is already on the list.
 */
export async function POST(request: NextRequest) {
  // Public and it sends email: capped per visitor, and per address so nobody can flood someone's inbox.
  if (!(await withinRateLimit(`subscribe:${clientIp(request)}`, 5, 60 * 60))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body: { email?: unknown; locale?: unknown } = await request.json().catch(() => ({}));
  const { email } = body;
  const lang = body.locale === 'es' ? 'es' : 'en';
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const sent = NextResponse.json({ message: 'confirm-sent' }, { status: 200 });
  // Over the per-address cap: answer as if sent, so the cap says nothing about the address.
  const address = await sha256(email.trim().toLowerCase());
  if (!(await withinRateLimit(`subscribe-address:${address}`, 3, 24 * 60 * 60))) return sent;

  const confirmUrl = await subscribeLink(email);
  if (!confirmUrl) {
    console.error('[subscribe] NEWSLETTER_SECRET is not set');
    return NextResponse.json({ error: 'The newsletter is not available right now.' }, { status: 503 });
  }

  try {
    const { subject, html, text } = confirmSubscriptionEmail({ lang, confirmUrl, days: SUBSCRIBE_LINK_DAYS });
    const { error } = await resend.emails.send({ from: FROM, to: email, subject, html, text });
    if (error) {
      console.error('[subscribe] Resend error:', error);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }
    return sent;
  } catch (error) {
    console.error('[subscribe]', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }
}
