import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Developer Portfolio',
  description:
    'Get in touch! Send me a message using the contact form and I will get back to you as soon as possible.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            Contact Me
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hello? Fill out the form
            below and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="rounded-2xl border border-gray-800/50 bg-gray-900/50 p-6 sm:p-8">
          <ContactForm />
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-800/50 bg-gray-900/30 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 mb-4">
              <svg
                className="w-6 h-6 text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-gray-400 text-sm">my@email.com</p>
          </div>

          <div className="rounded-xl border border-gray-800/50 bg-gray-900/30 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 mb-4">
              <svg
                className="w-6 h-6 text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Response Time</h3>
            <p className="text-gray-400 text-sm">Usually within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}