import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactFormData {
  name: string
  email: string
  message: string
}

function isValidContactData(data: unknown): data is ContactFormData {
  if (typeof data !== 'object' || data === null) return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.name === 'string' &&
    obj.name.trim().length > 0 &&
    typeof obj.email === 'string' &&
    obj.email.trim().length > 0 &&
    typeof obj.message === 'string' &&
    obj.message.trim().length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()

    if (!isValidContactData(body)) {
      return NextResponse.json(
        { error: 'Please fill in all fields: name, email, and message.' },
        { status: 400 }
      )
    }

    const { name, email, message } = body

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'my@email.com',
      to: 'my@email.com',
      subject: `Contact Form: Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e1b4b; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151; width: 100px;">Name:</td>
              <td style="padding: 10px; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 10px; color: #111827;">
                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
            <p style="font-weight: bold; color: #374151; margin: 0 0 8px 0;">Message:</p>
            <p style="color: #111827; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}