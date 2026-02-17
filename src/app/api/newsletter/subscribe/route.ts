import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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
      subject: 'Welcome to my newsletter!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to my newsletter</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                    <tr>
                      <td style="padding: 40px; background: linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%);">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                          Welcome aboard! 🚀
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 24px; font-size: 16px; color: #2d2d2d; line-height: 1.6;">
                          Thanks for subscribing! I'm excited to share my latest blog posts, insights, and updates with you.
                        </p>
                        
                        <p style="margin: 0 0 16px; font-size: 16px; color: #2d2d2d; line-height: 1.6; font-weight: 600;">
                          You'll receive notifications about:
                        </p>
                        
                        <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 16px; color: #2d2d2d; line-height: 1.8;">
                          <li style="margin-bottom: 8px;">Software Development & Engineering</li>
                          <li style="margin-bottom: 8px;">DevOps & Infrastructure</li>
                          <li style="margin-bottom: 8px;">Career Growth & Leadership</li>
                          <li>Tech Insights & Best Practices</li>
                        </ul>
                        
                        <p style="margin: 0 0 32px; font-size: 16px; color: #2d2d2d; line-height: 1.6;">
                          Stay tuned for great content!
                        </p>
                        
                        <table cellpadding="0" cellspacing="0" style="margin: 0;">
                          <tr>
                            <td style="border-radius: 8px; background: linear-gradient(135deg, #c2185b 0%, #d81b60 100%);">
                              <a href="https://listerineh.dev/blog" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                                Explore the Blog →
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
