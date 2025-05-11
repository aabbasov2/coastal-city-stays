import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

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
    const data = await request.json() as EmailData
    
    // Simple validation
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // Create email message
    const isReservation = data.checkIn && data.checkOut
    const subject = isReservation 
      ? `New Reservation: ${data.propertyName}`
      : 'New Contact Form Submission'
    
    const text = isReservation
      ? `New Reservation Request

Property: ${data.propertyName}
Dates: ${data.checkIn} to ${data.checkOut}
Guests: ${data.guests}

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
      from: 'coastalcitystay@gmail.com',
      subject,
      text,
      html: text.replace(/\n/g, '<br>') // Simple HTML version
    }

    // Send email
    await sgMail.send(msg)
    
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    })
    
  } catch (error: any) {
    console.error('Error sending email:', error)
    
    let errorMessage = 'Failed to send email'
    if (error.response) {
      console.error('SendGrid error response:', error.response.body)
      errorMessage = error.response.body.errors?.[0]?.message || errorMessage
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
