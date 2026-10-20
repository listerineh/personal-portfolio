import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  clientIp,
  isValidEmail,
  listUnsubscribeHeaders,
  unsubscribeLinks,
  verifySubscribeToken,
  withinRateLimit,
} from '@/lib/server/security';
import { FROM } from '@/lib/email/layout';
import { welcomeEmail } from '@/lib/email/templates';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);
const resendHeaders = () => ({
  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  'Content-Type': 'application/json',
});

/**
 * Step two of the double opt-in, posted by /newsletter/confirm after a click (mail scanners open links, they don't
 * press buttons). With a valid, unexpired signed link it adds the contact, or brings back one who had unsubscribed,
 * and sends the welcome email. Someone already subscribed just hears so, without a second welcome.
 */
export async function POST(request: NextRequest) {
  if (!(await withinRateLimit(`confirm:${clientIp(request)}`, 10, 60 * 60))) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body: { email?: unknown; expires?: unknown; token?: unknown; locale?: unknown } = await request.json().catch(() => ({}));
  const { email, token } = body;
  const expires = Number(body.expires);
  const lang = body.locale === 'es' ? 'es' : 'en';

  if (!isValidEmail(email) || typeof token !== 'string' || !(await verifySubscribeToken(email, expires, token))) {
    return NextResponse.json({ error: 'invalid-link' }, { status: 400 });
  }

  try {
    const contactUrl = `https://api.resend.com/contacts/${encodeURIComponent(email)}`;
    const existing = await fetch(contactUrl, { headers: resendHeaders() });

    if (existing.ok) {
      const contact: { unsubscribed?: boolean } = await existing.json();
      if (!contact.unsubscribed) return NextResponse.json({ message: 'already-subscribed' }, { status: 200 });
      // Came back after unsubscribing: switch them on again.
      const update = await fetch(contactUrl, { method: 'PATCH', headers: resendHeaders(), body: JSON.stringify({ unsubscribed: false }) });
      if (!update.ok) throw new Error(`Resend PATCH ${update.status}`);
    } else if (existing.status === 404) {
      const create = await fetch('https://api.resend.com/contacts', {
        method: 'POST',
        headers: resendHeaders(),
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!create.ok) throw new Error(`Resend POST ${create.status}`);
    } else {
      throw new Error(`Resend GET ${existing.status}`);
    }

    const links = await unsubscribeLinks(email);
    const { subject, html, text } = welcomeEmail({ lang, unsubscribeUrl: links?.page });
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      html,
      text,
      headers: links ? listUnsubscribeHeaders(links.oneClick) : undefined,
    });
    // They are subscribed either way; a lost welcome email is not worth failing the confirmation.
    if (error) console.error('[confirm] welcome email:', error);

    return NextResponse.json({ message: 'subscribed' }, { status: 200 });
  } catch (error) {
    console.error('[confirm]', error);
    return NextResponse.json({ error: 'Failed to confirm. Please try again.' }, { status: 500 });
  }
}
