import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Developer Portfolio',
  description:
    'Get in touch with me. Send a message through the contact form and I will get back to you as soon as possible.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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

        <ContactForm />
      </div>
    </div>
  )
}