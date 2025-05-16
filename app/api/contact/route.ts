import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log form data without sensitive information
    const { phone, email, ...safeFormData } = data
    console.log('Form submission started with data:', {
      ...safeFormData,
      phone: phone ? '***' + phone.slice(-4) : '',
      email: email ? email[0] + '***' + email.split('@')[1] : ''
    })

    // Build email content
    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="background-color: #87CEEB; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">Contact Form Submission</h1>
          <p style="color: white; margin-top: 10px; font-size: 14px;">New message from Coastal City Stays website</p>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 25px; border-bottom: 1px solid #e1f5fe; padding-bottom: 15px;">
            <span style="color: #1E90FF; font-weight: 600; display: block; margin-bottom: 8px; font-size: 14px; letter-spacing: 0.5px;">Name:</span>
            <span style="color: #333; font-size: 16px; line-height: 1.5;">${data.name}</span>
          </div>
          <div style="margin-bottom: 25px; border-bottom: 1px solid #e1f5fe; padding-bottom: 15px;">
            <span style="color: #1E90FF; font-weight: 600; display: block; margin-bottom: 8px; font-size: 14px; letter-spacing: 0.5px;">Email:</span>
            <span style="color: #333; font-size: 16px; line-height: 1.5;">${data.email}</span>
          </div>
          ${data.phone ? `
            <div style="margin-bottom: 25px; border-bottom: 1px solid #e1f5fe; padding-bottom: 15px;">
              <span style="color: #1E90FF; font-weight: 600; display: block; margin-bottom: 8px; font-size: 14px; letter-spacing: 0.5px;">Phone:</span>
              <span style="color: #333; font-size: 16px; line-height: 1.5;">${data.phone}</span>
            </div>
          ` : ''}
          <div style="margin-bottom: 25px; border-bottom: 1px solid #e1f5fe; padding-bottom: 15px;">
            <span style="color: #1E90FF; font-weight: 600; display: block; margin-bottom: 8px; font-size: 14px; letter-spacing: 0.5px;">Subject:</span>
            <span style="color: #333; font-size: 16px; line-height: 1.5;">${data.subject}</span>
          </div>
          <div style="margin-bottom: 25px; border-bottom: 1px solid #e1f5fe; padding-bottom: 15px;">
            <span style="color: #1E90FF; font-weight: 600; display: block; margin-bottom: 8px; font-size: 14px; letter-spacing: 0.5px;">Message:</span>
            <div style="white-space: pre-wrap; margin-top: 15px; padding: 20px; background-color: #f0f8ff; border-radius: 8px; border-left: 4px solid #1E90FF; font-size: 15px;">${data.message}</div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1f5fe; text-align: center; color: #666; font-size: 12px;">
            <p>Coastal City Stays</p>
            <p style="margin-top: 5px;">For more information, visit our website</p>
          </div>
        </div>
      </div>
    `;

    // Send the email
    const msg = {
      to: process.env.EMAIL_RECIPIENT || 'coastalcitystay@gmail.com',
      from: process.env.EMAIL_SENDER || 'coastalcitystay@gmail.com',
      subject: 'New Contact Form Submission',
      text: `New Contact Form Submission\n\nName: ${data.name}\nEmail: ${data.email}\n${data.phone ? `Phone: ${data.phone}\n` : ''}Subject: ${data.subject}\nMessage:\n${data.message}`,
      html: htmlContent
    }

    try {
      await sgMail.send(msg)
      console.log('Email sent successfully to:', process.env.EMAIL_RECIPIENT)
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully'
      })
    } catch (sendError) {
      console.error('SendGrid error:', sendError)
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error during form submission:', error)
    let errorMessage = 'An error occurred while submitting the form. Please try again.'
    
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
