import Image from 'next/image'
import Link from 'next/link'
import { properties } from '@/data/properties'
import PropertyCard from '@/components/PropertyCard'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh]">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Coastal City Stays Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/20">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-center mb-6">
            Welcome to Coastal City Stays
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 font-light max-w-2xl">
            Experience luxury beachfront living at its finest
          </p>
          <div className="flex justify-center mt-8">
            <Link
              href="/properties"
              className="bg-sky-600 text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base font-medium"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Featured Properties
            </h2>
            <p className="text-xl text-sky-800 font-medium max-w-2xl mx-auto">
              Discover our handpicked selection of premium coastal properties
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href="/properties"
              className="bg-sky-600 text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base font-medium"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80"
          alt="Ocean waves"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/80 to-cyan-600/80 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white drop-shadow-md">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
              Experience the perfect blend of luxury and comfort
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300">
              <div className="bg-sky-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-sky-800 mb-2">Premium Locations</h3>
              <p className="text-sky-700">Handpicked properties in the most desirable coastal destinations</p>
            </div>
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300">
              <div className="bg-sky-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-sky-800 mb-2">24/7 Support</h3>
              <p className="text-sky-700">Round-the-clock assistance for all your needs</p>
            </div>
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300">
              <div className="bg-sky-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-sky-800 mb-2">Verified Properties</h3>
              <p className="text-sky-700">Every property is thoroughly vetted for quality and comfort</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-sky-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-xl mb-8 font-light max-w-2xl mx-auto">
            Book your perfect coastal getaway today
          </p>
          <Link
            href="/contact"
            className="bg-white text-sky-800 px-8 py-3 rounded-full text-lg font-medium hover:bg-sky-50 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
