'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [responseMessage, setResponseMessage] = useState('')

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.'
    }

    return newErrors
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name as keyof FormErrors]
        return updated
      })
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setErrors({})
    setResponseMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = (await res.json()) as { message?: string; error?: string }

      if (!res.ok) {
        setStatus('error')
        setResponseMessage(
          data.error ?? 'Something went wrong. Please try again.'
        )
        return
      }

      setStatus('success')
      setResponseMessage(data.message ?? 'Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
      setResponseMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`w-full px-4 py-3 rounded-lg bg-gray-900 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-700'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 rounded-lg bg-gray-900 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-700'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={6}
          className={`w-full px-4 py-3 rounded-lg bg-gray-900 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors resize-vertical ${
            errors.message ? 'border-red-500' : 'border-gray-700'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 px-6 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-950"
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-900/30 border border-green-700/50">
          <p className="text-green-400 text-sm text-center">{responseMessage}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-900/30 border border-red-700/50">
          <p className="text-red-400 text-sm text-center">{responseMessage}</p>
        </div>
      )}
    </form>
  )
}