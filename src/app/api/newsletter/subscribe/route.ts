import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();
    const isEs = locale === 'es';

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    try {
      const contactResponse = await fetch('https://api.resend.com/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          unsubscribed: false,
        }),
      });

      const contactData = await contactResponse.json();
      
      if (contactResponse.ok) {
        console.log('Contact created successfully:', contactData);
      } else {
        console.error('Error creating contact:', contactData);
        
        if (!contactData.message?.includes('already exists')) {
          console.error('Failed to create contact in Resend. Email will still be sent.');
        } else {
          console.log('Contact already exists in Resend, continuing...');
        }
      }
    } catch (contactError: any) {
      console.error('Exception creating contact:', contactError);
    }

    const { data, error } = await resend.emails.send({
      from: 'Sebastian Alvarez <hello@listerineh.dev>',
      to: email,
      subject: isEs ? '¡Bienvenido a mi newsletter!' : 'Welcome to my newsletter!',
      html: `
        <!DOCTYPE html>
        <html lang="${isEs ? 'es' : 'en'}">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${isEs ? 'Bienvenido a mi newsletter' : 'Welcome to my newsletter'}</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07);">
                    <!-- Amber top bar -->
                    <tr><td style="height: 3px; background-color: #f59e0b; font-size: 0;">&nbsp;</td></tr>
                    <!-- Header -->
                    <tr>
                      <td style="padding: 36px 32px 28px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                        <p style="margin: 0 0 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(251,191,36,0.7);">Newsletter</p>
                        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">${isEs ? 'Bienvenido a bordo' : 'Welcome aboard'}</h1>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding: 28px 32px;">
                        <p style="margin: 0 0 20px; font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.7;">
                          ${isEs
                            ? '¡Gracias por suscribirte! Voy a compartir mis últimos posts, insights de ingeniería y novedades contigo directamente.'
                            : "Thanks for subscribing! I'll share my latest blog posts, engineering insights, and updates with you directly."}
                        </p>
                        <p style="margin: 0 0 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.3);">${isEs ? 'Recibirás' : "You'll receive"}</p>
                        <table cellpadding="0" cellspacing="0" style="margin: 0 0 28px; width: 100%;">
                          <tr><td style="padding: 8px 0; font-size: 14px; color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.05);">&#8594;&nbsp; ${isEs ? 'Desarrollo de Software e Ingeniería' : 'Software Development &amp; Engineering'}</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.05);">&#8594;&nbsp; ${isEs ? 'DevOps e Infraestructura' : 'DevOps &amp; Infrastructure'}</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: rgba(255,255,255,0.6); border-bottom: 1px solid rgba(255,255,255,0.05);">&#8594;&nbsp; ${isEs ? 'Crecimiento Profesional y Liderazgo' : 'Career Growth &amp; Leadership'}</td></tr>
                          <tr><td style="padding: 8px 0; font-size: 14px; color: rgba(255,255,255,0.6);">&#8594;&nbsp; ${isEs ? 'Tecnología y Mejores Prácticas' : 'Tech Insights &amp; Best Practices'}</td></tr>
                        </table>
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="border-radius: 8px; background-color: #f59e0b;">
                              <a href="https://listerineh.dev/blog" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: #000000; text-decoration: none; letter-spacing: 0.05em;">
                                ${isEs ? 'Explorar el Blog' : 'Explore the Blog'}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                        <p style="margin: 0 0 6px; font-size: 12px; color: rgba(255,255,255,0.25);">
                          ${isEs ? 'Recibes esto porque te suscribiste en' : "You're receiving this because you subscribed at"} <strong style="color: rgba(251,191,36,0.5);">listerineh.dev</strong>
                        </p>
                        <p style="margin: 0 0 6px; font-size: 12px; color: rgba(255,255,255,0.2);">
                          — Sebastian Alvarez
                        </p>
                        <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.15);">
                          <a href="https://listerineh.dev/unsubscribe" style="color: rgba(251,191,36,0.4); text-decoration: none;">${isEs ? 'Cancelar suscripción' : 'Unsubscribe'}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
