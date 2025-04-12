import Image from 'next/image'
import Link from 'next/link'

const reviews = [
  {
    text: "Absolutely incredible stay! The host went above and beyond to make us feel welcome. The attention to detail in the property was exceptional, and the local recommendations were spot on.",
    author: "Sarah M.",
    location: "New York, USA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    text: "One of the best vacation rentals we've ever experienced. The location was perfect, and the host's communication was outstanding. They truly care about their guests' experience.",
    author: "James L.",
    location: "London, UK",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    text: "Exceptional service and a beautiful property. Every detail was thoughtfully considered, from the welcome basket to the local guide. We'll definitely be coming back!",
    author: "Maria R.",
    location: "Toronto, Canada",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
  }
]

const stats = [
  { number: "500+", label: "Happy Guests" },
  { number: "50+", label: "Premium Properties" },
  { number: "15+", label: "Coastal Locations" },
  { number: "4.9", label: "Average Rating" }
]

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80"
          alt="Coastal view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Creating Unforgettable Coastal Experiences
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Your premier destination for luxury beachfront accommodations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-sky-800 text-lg mb-6">
                Founded in 2018, Coastal City Stays began with a simple vision: to provide exceptional vacation experiences in the most beautiful coastal locations. What started as a single beachfront property has grown into a curated collection of premium accommodations.
              </p>
              <p className="text-sky-800 text-lg mb-6">
                Our commitment to excellence has earned us recognition as a top-rated host, with countless five-star reviews and returning guests who consider our properties their home away from home.
              </p>
              <p className="text-sky-800 text-lg">
                We believe in creating more than just a place to stay – we're crafting memorable experiences that last a lifetime.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                  alt="Coastal living"
                  width={400}
                  height={600}
                  className="rounded-2xl"
                />
                <Image
                  src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80"
                  alt="Beach sunset"
                  width={400}
                  height={300}
                  className="rounded-2xl"
                />
              </div>
              <div className="space-y-4 pt-8">
                <Image
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
                  alt="Ocean waves"
                  width={400}
                  height={300}
                  className="rounded-2xl"
                />
                <Image
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80"
                  alt="Beachfront property"
                  width={400}
                  height={600}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-sky-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sky-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-12 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <Image
                    src={review.image}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-medium text-sky-800">{review.author}</div>
                    <div className="text-sky-600 text-sm">{review.location}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sky-800">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-sky-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Experience Coastal Living?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your dream vacation today and discover why our guests keep coming back
          </p>
          <Link
            href="/properties"
            className="bg-white text-sky-800 px-8 py-3 rounded-full text-lg font-medium hover:bg-sky-50 transition-colors inline-block"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    </main>
  )
}
