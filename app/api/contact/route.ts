// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

interface EmailData {
  name: string
  email: string
  phone: string
  checkIn?: string
  checkOut?: string
  guests?: string
  specialRequests?: string
  message?: string
  propertyName?: string
}

function validateEmailData(data: EmailData) {
  if (!data.name || !data.email || !data.phone) {
    return { error: 'Name, email, and phone are required.', status: 400 }
  }
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { error: 'Invalid email address.', status: 400 }
  }
  return null
}

function buildEmailContent(data: EmailData) {
  const isReservation = Boolean(data.checkIn && data.checkOut)
  const subject = isReservation
    ? `New Reservation: ${data.propertyName || 'Unknown Property'}`
    : 'New Contact Form Submission'

  const lines = []
  if (isReservation) {
    lines.push('New Reservation Request', '')
    lines.push(`Property: ${data.propertyName || 'N/A'}`)
    lines.push(`Dates: ${data.checkIn} → ${data.checkOut}`)
    lines.push(`Guests: ${data.guests || 'N/A'}`, '')
  } else {
    lines.push('New Contact Form Submission', '')
  }

  lines.push('Contact Information:')
  lines.push(`Name: ${data.name}`)
  lines.push(`Email: ${data.email}`)
  lines.push(`Phone: ${data.phone}`, '')

  if (isReservation) {
    lines.push(`Special Requests: ${data.specialRequests || 'None'}`)
  } else {
    lines.push(`Message: ${data.message || 'No message'}`)
  }

  const text = lines.join('\n')
  const html = lines.map(line => line === '' ? '<br>' : `<p>${line}</p>`).join('')
  return { subject, text, html }
}

export async function POST(request: NextRequest) {
  // 1️⃣ Ensure API key is set
  // Near the top of your POST function
console.log('Environment check:', {
  hasSendGridKey: Boolean(process.env.SENDGRID_API_KEY),
  nodeEnv: process.env.NODE_ENV
})
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY missing')
    return NextResponse.json(
      { error: 'Email service not configured. Please try again later.' },
      { status: 500 }
    )
  }
  sgMail.setApiKey(apiKey)

  // 2️⃣ Parse and validate payload
  let data: EmailData
  try {
    data = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 }
    )
  }

  const validation = validateEmailData(data)
  if (validation) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status }
    )
  }

  // 3️⃣ Build email
  const { subject, text, html } = buildEmailContent(data)
  const msg = {
    to: 'coastalcitystay@gmail.com',
    from: 'coastalcitystay@gmail.com',  // must be verified in SendGrid
    subject,
    text,
    html
  }

  // 4️⃣ Send and handle errors
  try {
    await sgMail.send(msg)
    return NextResponse.json(
      { success: true, message: 'Email sent successfully.' }
    )
  } catch (err: any) {
    console.error('❌ SendGrid error:', err.response?.body || err.message)
    const errorMsg =
      err.response?.body?.errors?.[0]?.message ||
      'Failed to send email. Please try again later.'
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    )
  }
}
