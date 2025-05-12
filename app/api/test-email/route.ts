import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function GET() {
  const apiKey = process.env.SENDGRID_API_KEY

  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY is not set')
    return NextResponse.json({ error: 'SENDGRID_API_KEY is not set' }, { status: 500 })
  }

  sgMail.setApiKey(apiKey)

  const msg = {
    to: 'coastalcitystay@gmail.com', // Replace with your email to test
    from: 'coastalcitystay@gmail.com',
    subject: '✅ Test Email from Vercel',
    text: 'This is a test email to confirm SendGrid works on Vercel.',
  }

  try {
    await sgMail.send(msg)
    return NextResponse.json({ success: true, message: 'Test email sent!' })
  } catch (error: any) {
    console.error('❌ Error sending test email:', error)
    return NextResponse.json(
      { error: 'SendGrid failed', details: error.message || error },
      { status: 500 }
    )
  }
}
