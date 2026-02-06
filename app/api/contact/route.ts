import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  message: string
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData

    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a valid name.' },
        { status: 400 }
      )
    }

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a message.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'my@email.com',
      to: 'my@email.com',
      subject: `Portfolio Contact: ${name.trim()}`,
      replyTo: email.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e1b4b; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name.trim()}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email.trim()}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="background: #f3f4f6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message.trim()}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}