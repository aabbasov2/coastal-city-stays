import { properties } from '@/data/properties'
import PropertyCard from '@/components/PropertyCard'

export default function PropertiesPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Properties
          </h1>
          <p className="text-lg text-gray-600">
            Discover our handpicked selection of luxury beachfront properties
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                <option>Long Beach</option>
                <option>All Locations</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                <option>Any Price</option>
                <option>$100 - $200</option>
                <option>$200 - $300</option>
                <option>$300+</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guests
              </label>
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                <option>Any</option>
                <option>1-2 Guests</option>
                <option>3-4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Studio</option>
                <option>House</option>
              </select>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-blue-900 border-2 border-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
            Load More Properties
          </button>
        </div>
      </div>
    </main>
  )
}
