// app/api/contact/route.ts

import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

interface EmailData {
  name: string
  email: string
  phone: string
  checkIn?: string
  checkOut?: string
  guests?: string
  specialRequests?: string
  subject?: string
  message?: string
  propertyName?: string
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not defined in environment variables.')
      return NextResponse.json(
        { error: 'Internal server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    sgMail.setApiKey(apiKey)

    const data = (await request.json()) as EmailData

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      )
    }

    const isReservation = data.checkIn && data.checkOut
    const subject = isReservation
      ? `New Reservation: ${data.propertyName || 'Unknown Property'}`
      : 'New Contact Form Submission'

    const text = isReservation
      ? `New Reservation Request

Property: ${data.propertyName || 'N/A'}
Dates: ${data.checkIn} to ${data.checkOut}
Guests: ${data.guests || 'N/A'}

Contact Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Special Requests: ${data.specialRequests || 'None'}`
      : `New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message: ${data.message || 'No message'}`

    const msg = {
      to: 'coastalcitystay@gmail.com',
      from: 'coastalcitystay@gmail.com', // Must be a verified sender in SendGrid
      subject,
      text,
      html: text.replace(/\n/g, '<br>')
    }

    await sgMail.send(msg)

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully.'
    })
  } catch (error: any) {
    console.error('Error sending email:', error)

    let errorMessage = 'Failed to send email.'
    if (error?.response?.body?.errors?.[0]?.message) {
      errorMessage = error.response.body.errors[0].message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
