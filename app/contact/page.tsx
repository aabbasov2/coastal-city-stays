'use client'

import { useState } from 'react'
import Image from 'next/image'

const faqs = [
  {
    question: "What is your check-in and check-out time?",
    answer: "Check-in is available from 4:00 PM to 2:00 AM. Check-out is at 11:00 AM. Extended check-in hours may be available upon request."
  },
  {
    question: "Do you offer long-term stays?",
    answer: "Yes, we offer special rates for stays longer than 28 days. Please contact us directly for long-term stay pricing and availability."
  },
  {
    question: "Are pets allowed?",
    answer: "Pet policies vary by property. Please check the individual property listing or contact us for specific pet policies."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and digital payments through our secure booking system."
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitted(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <Image
          src="/contact-hero.jpg"
          alt="Long Beach, California"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-600/30 to-sky-100/30">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl backdrop-blur-sm bg-sky-900/10 p-8 rounded-2xl">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 drop-shadow-md">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-white drop-shadow-md">
                We&apos;re here to help make your coastal getaway perfect
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-sky-100">
              <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-sky-800 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 placeholder:text-sm text-gray-900"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sky-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 placeholder:text-sm text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-sky-800 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all text-gray-900"
                    >
                      <option value="" className="text-gray-900">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sky-800 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600 placeholder:text-sm text-gray-900"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-sky-800">Email</h3>
                      <p className="text-sky-600">coastalcitystay@gmail.com</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-sky-100 p-6 rounded-xl">
                      <h3 className="font-medium text-sky-800 mb-2">{faq.question}</h3>
                      <p className="text-sky-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
