import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { blogTitle, blogSlug, blogExcerpt, blogImageUrl } = await request.json();

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
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                      ${blogImageUrl ? `
                        <tr>
                          <td style="overflow: hidden; border-radius: 12px 12px 0 0;">
                            <img src="${blogImageUrl}" alt="${blogTitle}" style="width: 100%; height: auto; display: block; max-height: 300px; object-fit: cover;">
                          </td>
                        </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 40px;">
                          <h1 style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #2d2d2d; line-height: 1.3;">
                            ${blogTitle}
                          </h1>
                          <p style="margin: 0 0 24px; font-size: 16px; color: #666666; line-height: 1.6;">
                            ${blogExcerpt || 'I just published a new blog post that you might find interesting.'}
                          </p>
                          <table cellpadding="0" cellspacing="0" style="margin: 0;">
                            <tr>
                              <td style="border-radius: 8px; background: linear-gradient(135deg, #c2185b 0%, #d81b60 100%);">
                                <a href="https://listerineh.dev/blog/${blogSlug}" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                                  Read the Article →
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                            You're receiving this email because you subscribed to my newsletter.
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #9ca3af;">
                            Best regards,<br/>
                            <strong>Sebastian Alvarez</strong>
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
