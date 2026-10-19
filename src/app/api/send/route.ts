import { Resend } from 'resend';
import React from 'react';
import { z } from 'zod';
import EmailTemplate from '@/components/email/email-template';
import { clientIp, withinRateLimit } from '@/lib/server/security';

const resend = new Resend(process.env.RESEND_API_KEY);

// The browser validates too, but this endpoint is public: the server is the boundary.
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  // Each request sends an email to the owner: cap it per visitor so the form can't be used to flood the inbox.
  if (!(await withinRateLimit(`send:${clientIp(request)}`, 5, 60 * 60))) {
    return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: 'ACME <onboarding@resend.dev>',
      to: ['sebask8er.alvarez@gmail.com'],
      replyTo: email,
      subject: 'Message from personal web',
      react: EmailTemplate({ name, email, message }) as React.ReactElement,
    });

    if (error) {
      console.error('[send] Resend error:', error);
      return Response.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('[send]', error);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
