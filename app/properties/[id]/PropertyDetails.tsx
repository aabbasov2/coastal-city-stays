'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Property } from '@/types/property'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % property.images.length)
  }

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Log form data without sensitive information
    const { phone, email, ...safeFormData } = formData
    console.log('Form submission started with data:', {
      ...safeFormData,
      phone: phone ? '***' + phone.slice(-4) : '',
      email: email ? email[0] + '***' + email.split('@')[1] : ''
    })
    
    // Ensure we have the API key
    if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
      console.error('SendGrid API key is not set')
      alert('Error: Email service is not configured. Please try again later.')
      return
    }
    
    setIsSubmitting(true)
    setShowSuccessMessage(false)

    try {
      const requestData = {
        ...formData,
        propertyName: property.name,
        propertyId: property.id,
        subject: `Reservation for ${property.name} (${formData.checkIn} - ${formData.checkOut})`
      }

      let response
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_SENDGRID_API_KEY || ''
          },
          body: JSON.stringify(requestData),
          credentials: 'same-origin'
        })
      } catch (fetchError) {
        console.error('Network error during form submission:', fetchError)
        throw new Error('Unable to connect to the server. Please check your internet connection.')
      }

      let responseData
      try {
        responseData = await response.json()
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError)
        throw new Error('Received an invalid response from the server. Please try again.')
      }

      if (!response.ok) {
        const errorMessage = responseData?.error || 
                             responseData?.message || 
                             `Server responded with status ${response.status}`
        console.error('API Error:', { status: response.status, error: errorMessage })
        throw new Error(errorMessage)
      }

      console.log('Form submitted successfully')
      setShowSuccessMessage(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        specialRequests: ''
      })
    } catch (error) {
      // Don't log the full error to console.error to avoid duplicate logs
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      console.log('Form submission error:', errorMessage)
      alert(`Failed to submit form: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <h1 className="text-3xl font-semibold mb-4 text-black">{property.name}</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-black">
                {property.rating} · {property.reviews} reviews
              </span>
            </div>
            <span className="text-black">·</span>
            <span className="text-sm text-black">{property.location}</span>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="relative mb-8">
          {/* Main Photo */}
          <div className="relative h-[600px] rounded-t-2xl overflow-hidden">
            <Image
              src={property.images[currentPhotoIndex]}
              alt={`${property.name} - Photo ${currentPhotoIndex + 1}`}
              fill
              className="object-cover"
            />
            {/* Navigation Buttons */}
            <button
              onClick={previousPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail Navigation - MacBook style */}
          <div className="relative bg-gray-100 rounded-b-2xl">
            <div className="overflow-x-auto scrollbar-hide">
              <div 
                className="flex gap-1 p-2 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(${Math.min(
                    0,
                    -(currentPhotoIndex * 100) + 400
                  )}px)`
                }}
              >
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded overflow-hidden ${
                      currentPhotoIndex === index
                        ? 'ring-2 ring-black'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${property.name} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="md:col-span-2">
            <div className="flex justify-between pb-6 border-b">
              <div className="flex gap-4 text-black">
                <span>{property.maxGuests} guests</span>
                <span>·</span>
                <span>
                  {property.bedrooms} bedroom{property.bedrooms !== 1 && 's'}
                </span>
                <span>·</span>
                <span>
                  {property.bathrooms} bathroom{property.bathrooms !== 1 && 's'}
                </span>
              </div>
            </div>

            <div className="py-6 border-b">
              <h3 className="text-xl font-semibold mb-4 text-black">About this space</h3>
              <p className="text-black leading-relaxed">{property.description}</p>
            </div>

            <div className="py-6 border-b">
              <h3 className="text-xl font-semibold mb-4 text-black">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="black"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-black">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="relative">
            <div className="sticky top-8 bg-white rounded-2xl border p-6 shadow-lg">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-2xl font-semibold text-black">${property.price}</span>
                  <span className="text-black"> / night</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-black">
                    {property.rating} · {property.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Reservation Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-black mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Check-in date"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-black mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Check-out date"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-black mb-2">
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                  >
                    <option value="" className="text-gray-500">Select number of guests</option>
                    {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-black mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Any special requests or requirements?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
                </button>
              </form>

              {showSuccessMessage && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-green-800">Reservation Submitted Successfully!</h3>
                      <p className="text-green-700">We will be in touch shortly to confirm your booking.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
