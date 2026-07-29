import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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
          unsubscribed: true,
        }),
      });

      const contactData = await contactResponse.json();
      
      if (contactResponse.ok) {
        console.log('Contact unsubscribed successfully:', contactData);
      } else {
        console.error('Error unsubscribing contact:', contactData);
        
        if (!contactData.message?.includes('already exists')) {
          return NextResponse.json(
            { error: 'Failed to unsubscribe. Please try again.' },
            { status: 500 }
          );
        }
      }
    } catch (contactError: any) {
      console.error('Exception unsubscribing contact:', contactError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
