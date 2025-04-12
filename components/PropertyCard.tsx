'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Image Carousel */}
      <div className="relative h-64 md:h-72">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <svg
            className="h-5 w-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <svg
            className="h-5 w-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold text-black group-hover:text-primary-600 transition-colors line-clamp-2">
            {property.name}
          </h3>
          <div className="flex items-center bg-primary-50 px-2 py-1 rounded-full">
            <svg
              className="h-4 w-4 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-black font-medium text-sm">
              {property.rating} ({property.reviews})
            </span>
          </div>
        </div>

        <p className="text-black/70 mb-4 text-sm">{property.location}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="px-3 py-1 bg-primary-50 text-black rounded-full text-sm font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-black/70">
            <div className="flex items-center">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-1 text-sm">
                {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="ml-1 text-sm">Up to {property.maxGuests}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-black">
              ${property.price}
            </span>
            <span className="text-sm text-black/70 ml-1">
              /night
            </span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
