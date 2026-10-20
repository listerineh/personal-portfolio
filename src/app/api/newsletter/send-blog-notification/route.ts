import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { hasBearerSecret, isValidSlug, listUnsubscribeHeaders, unsubscribeLinks } from '@/lib/server/security';
import { FROM, SITE } from '@/lib/email/layout';
import { newPostEmail } from '@/lib/email/templates';
import { getBlogPost } from '@/lib/data/blog';
import { blogShareImage } from '@/lib/og/blog-image';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Emails every subscriber from the site's domain: only the owner (scripts/send-blog-notification.js) may call it.
  if (!hasBearerSecret(request, process.env.NEWSLETTER_SECRET)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const rawTitle = typeof body.blogTitle === 'string' ? body.blogTitle.trim() : '';
    const rawSlug = typeof body.blogSlug === 'string' ? body.blogSlug.trim() : '';
    const rawImage = typeof body.blogImageUrl === 'string' ? body.blogImageUrl.trim() : '';

    if (!rawTitle || !isValidSlug(rawSlug)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (rawImage && !/^https:\/\/[^\s"'<>]+$/.test(rawImage)) {
      return NextResponse.json({ error: 'blogImageUrl must be an https URL' }, { status: 400 });
    }

    // The email layout escapes every text it inserts.
    const blogSlug = rawSlug;
    const rawExcerpt = typeof body.blogExcerpt === 'string' ? body.blogExcerpt.trim().slice(0, 600) : '';
    const rawExcerptEs = typeof body.blogExcerptEs === 'string' ? body.blogExcerptEs.trim().slice(0, 600) : '';

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

    // People who unsubscribed stay in Resend as contacts; never email them.
    const emails: string[] = contactsData.data
      .filter((contact: { unsubscribed?: boolean }) => !contact.unsubscribed)
      .map((contact: { email: string }) => contact.email);

    if (emails.length === 0) {
      return NextResponse.json({ message: 'No subscribers found' }, { status: 200 });
    }

    // Each subscriber gets their own signed unsubscribe link.
    const recipients = await Promise.all(emails.map(async (email) => ({ email, links: await unsubscribeLinks(email) })));

    // The post's share card (title, byline, cover) reads better in an inbox than the bare cover.
    const post = getBlogPost(blogSlug, 'en');
    const imageUrl = post ? `${SITE}${blogShareImage(post, 'en')}` : rawImage || undefined;

    const { error } = await resend.batch.send(
      recipients.map(({ email, links }) => {
        const { subject, html, text } = newPostEmail({
          title: rawTitle,
          slug: blogSlug,
          excerpt: rawExcerpt,
          excerptEs: rawExcerptEs,
          imageUrl,
          unsubscribeUrl: links?.page,
        });
        return {
          from: FROM,
          headers: links ? listUnsubscribeHeaders(links.oneClick) : undefined,
          to: email,
          subject,
          html,
          text,
        };
      }),
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
