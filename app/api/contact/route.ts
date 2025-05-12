// app/api/contact/route.ts

import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  specialRequests?: string;
  subject?: string;
  message?: string;
  propertyName?: string;
}

const validateEmailData = (data: EmailData) => {
  if (!data.name || !data.email || !data.phone) {
    return { error: 'Name, email, and phone are required.', status: 400 };
  }
  return null;
};

const buildEmailText = (data: EmailData) => {
  const isReservation = data.checkIn && data.checkOut;
  if (isReservation) {
    return `New Reservation Request

Property: ${data.propertyName || 'N/A'}
Dates: ${data.checkIn} to ${data.checkOut}
Guests: ${data.guests || 'N/A'}

Contact Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Special Requests: ${data.specialRequests || 'None'}`;
  }

  return `New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message: ${data.message || 'No message'}`;
};

const buildEmailSubject = (data: EmailData) => {
  const isReservation = data.checkIn && data.checkOut;
  return isReservation
    ? `New Reservation: ${data.propertyName || 'Unknown Property'}`
    : 'New Contact Form Submission';
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Internal server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    const data = (await request.json()) as EmailData;

    // Validate the required fields
    const validationError = validateEmailData(data);
    if (validationError) {
      return NextResponse.json(validationError, { status: validationError.status });
    }

    const text = buildEmailText(data);
    const subject = buildEmailSubject(data);

    const msg = {
      to: 'coastalcitystay@gmail.com',
      from: 'coastalcitystay@gmail.com', // Must be a verified sender in SendGrid
      subject,
      text,
      html: text.replace(/\n/g, '<br>'),
    };

    await sgMail.send(msg);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully.',
    });
  } catch (error: any) {
    console.error('Error sending email:', error);

    const errorMessage =
      error?.response?.body?.errors?.[0]?.message || 'Failed to send email.';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
