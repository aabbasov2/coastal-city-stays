'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Image Grid */}
        <div className="relative h-[300px] grid grid-cols-4 grid-rows-2 gap-1 group">
          {/* Main large image */}
          <div className="relative col-span-2 row-span-2">
            <Image
              src={property.images[0]}
              alt={`${property.name} - Main`}
              fill
              className="object-cover"
            />
          </div>
          {/* Top right image */}
          <div className="relative col-span-2">
            <Image
              src={property.images[1]}
              alt={`${property.name} - Second`}
              fill
              className="object-cover"
            />
          </div>
          {/* Bottom right image */}
          <div className="relative col-span-2">
            <Image
              src={property.images[2]}
              alt={`${property.name} - Third`}
              fill
              className="object-cover"
            />
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* Property Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {property.name}
            </h3>
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-gray-600">{property.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-2">{property.location}</p>
          <div className="flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">${property.price}</span>
            <span className="text-gray-800 ml-1">/ night</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
