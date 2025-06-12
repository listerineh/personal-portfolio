import { Resend } from 'resend';
import React from 'react';
import EmailTemplate from '@/components/email/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'ACME <onboarding@resend.dev>',
      to: ['sebask8er.alvarez@gmail.com'],
      subject: 'Message from personal web',
      react: EmailTemplate({ name, email, message }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}