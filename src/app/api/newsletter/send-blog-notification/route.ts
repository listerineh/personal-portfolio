import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { blogTitle, blogSlug, blogExcerpt, blogExcerptEs, blogImageUrl } = await request.json();

    if (!blogTitle || !blogSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contactsResponse = await fetch('https://api.resend.com/contacts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!contactsResponse.ok) {
      const errorData = await contactsResponse.json();
      console.error('Error fetching contacts:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch contacts from Resend' },
        { status: 500 }
      );
    }

    const contactsData = await contactsResponse.json();
    
    if (!contactsData.data || contactsData.data.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers found' },
        { status: 200 }
      );
    }

    const emails = contactsData.data.map((contact: any) => contact.email);

    const { data, error } = await resend.batch.send(
      emails.map((email: string) => ({
        from: 'Sebastian Alvarez <hello@listerineh.dev>',
        to: email,
        subject: `New Blog Post: ${blogTitle}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Blog Post</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07);">
                      <!-- Amber top bar -->
                      <tr><td style="height: 3px; background-color: #f59e0b; font-size: 0;">&nbsp;</td></tr>
                      <!-- Cover image -->
                      ${blogImageUrl ? `
                        <tr>
                          <td style="overflow: hidden;">
                            <img src="${blogImageUrl}" alt="${blogTitle}" style="width: 100%; height: auto; display: block; max-height: 280px; object-fit: cover; opacity: 0.85;">
                          </td>
                        </tr>
                      ` : ''}
                      <!-- Header -->
                      <tr>
                        <td style="padding: 32px 32px 24px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                          <p style="margin: 0 0 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(251,191,36,0.7);">New Post</p>
                          <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">${blogTitle}</h1>
                        </td>
                      </tr>
                      <!-- Body EN -->
                      <tr>
                        <td style="padding: 24px 32px 20px;">
                          <p style="margin: 0 0 6px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.25);">English</p>
                          <p style="margin: 0 0 24px; font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.75;">
                            ${blogExcerpt || 'I just published a new article that you might find interesting. Check it out!'}
                          </p>
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="border-radius: 8px; background-color: #f59e0b;">
                                <a href="https://listerineh.dev/blog/${blogSlug}" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: #000000; text-decoration: none; letter-spacing: 0.05em;">
                                  Read Article
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${blogExcerptEs ? `
                      <!-- Divider -->
                      <tr><td style="padding: 0 32px;"><div style="height: 1px; background: rgba(255,255,255,0.06);"></div></td></tr>
                      <!-- Body ES -->
                      <tr>
                        <td style="padding: 20px 32px 28px;">
                          <p style="margin: 0 0 6px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(255,255,255,0.25);">Español</p>
                          <p style="margin: 0 0 24px; font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.75;">
                            ${blogExcerptEs}
                          </p>
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="border-radius: 8px; background-color: #f59e0b;">
                                <a href="https://listerineh.dev/blog/${blogSlug}" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: #000000; text-decoration: none; letter-spacing: 0.05em;">
                                  Leer Artículo
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                          <p style="margin: 0 0 6px; font-size: 12px; color: rgba(255,255,255,0.25);">
                            You're receiving this because you subscribed at / Recibes esto porque te suscribiste en <strong style="color: rgba(251,191,36,0.5);">listerineh.dev</strong>
                          </p>
                          <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.2);">
                            — Sebastian Alvarez
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
      }))
    );

    if (error) {
      console.error('Resend batch send error:', error);
      return NextResponse.json(
        { error: 'Failed to send notifications' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully sent notifications to ${emails.length} subscribers`,
      stats: { 
        successful: emails.length,
        failed: 0,
        total: emails.length 
      },
    });
  } catch (error) {
    console.error('Error sending blog notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}
