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

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🎉 Welcome to my newsletter!',
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #3b82f6; font-size: 28px; margin-bottom: 20px;">Welcome aboard! 🚀</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            Thanks for subscribing to my newsletter! I'm excited to share my latest blog posts, 
            insights, and updates with you.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            You'll receive notifications whenever I publish new content about:
          </p>
          
          <ul style="font-size: 16px; line-height: 1.8; color: #374151; margin-bottom: 20px;">
            <li>Software Development & Engineering</li>
            <li>DevOps & Infrastructure</li>
            <li>Tech Insights & Best Practices</li>
            <li>Personal Projects & Experiments</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
            Stay tuned for great content!
          </p>
          
          <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">
              Best regards,<br/>
              <strong>Sebastian Alvarez</strong>
            </p>
            <p style="font-size: 12px; color: #9ca3af;">
              You can unsubscribe at any time by clicking the link in any email.
            </p>
          </div>
        </div>
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
