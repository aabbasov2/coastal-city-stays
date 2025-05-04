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

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set in environment variables')
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json() as EmailData
    
    // Handle both contact and reservation submissions
    const isReservation = data.checkIn && data.checkOut

    const msg = {
      to: 'coastalcitystay@gmail.com',
      from: 'coastalcitystay@gmail.com',
      subject: isReservation 
        ? `New Reservation Request: ${data.propertyName} (${data.checkIn} - ${data.checkOut})`
        : `New Contact Form Submission: ${data.subject}`,
      text: isReservation
        ? `
          🏡 New Reservation Request
          
          🏠 Property: ${data.propertyName}
          📅 Dates: ${data.checkIn} to ${data.checkOut}
          👥 Guests: ${data.guests}
          
          📞 Contact Information:
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone}
          
          ✨ Special Requests:
          ${data.specialRequests}
        `
        : `
          New Contact Form Submission
          
          Name: ${data.name}
          Email: ${data.email}
          Subject: ${data.subject}
          
          Message:
          ${data.message}
        `,
      html: isReservation
        ? `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <h1 style="color: #1e40af; margin: 0;">New Reservation Request</h1>
              <div style="background: #e0e7ff; padding: 1rem; border-radius: 8px; display: inline-block;">
                <span style="color: #1e40af; font-size: 1.2rem;">${data.propertyName}</span>
              </div>
            </div>

            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">Reservation Details</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Property</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.propertyName}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Dates</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.checkIn} to ${data.checkOut}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Guests</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.guests}</p>
                  </div>
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">Contact Information</h3>
                <div style="display: grid; gap: 1rem;">
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Name</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.name}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Email</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.email}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Phone</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.phone}</p>
                  </div>
                </div>
              </div>

              ${data.specialRequests ? `
              <div>
                <h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">Special Requests</h3>
                <p style="margin: 0;">${data.specialRequests}</p>
              </div>
              ` : ''}
            </div>
          </div>
        `
        : `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <h1 style="color: #1e40af; margin: 0;">New Contact Form Submission</h1>
            </div>

            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">Contact Information</h3>
                <div style="display: grid; gap: 1rem;">
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Name</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.name}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Email</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.email}</p>
                  </div>
                  <div>
                    <span style="color: #64748b; font-weight: 500;">Subject</span>
                    <p style="margin: 0.25rem 0 0 0;">${data.subject}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style="color: #1e40af; margin: 0 0 0.5rem 0;">Message</h3>
                <p style="margin: 0;">${data.message}</p>
              </div>
            </div>
          </div>
        `
    }

    await sgMail.send(msg)
    console.log('Email sent successfully')

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to send message. Please try again later.'
      },
      { status: 500 }
    )
  }
}
