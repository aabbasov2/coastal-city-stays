import Image from 'next/image'

export default function About() {
  return (
    <main className="pt-16">
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/about-hero.jpg"
          alt="Long Beach, California"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                About Coastal City Stays
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Your home away from home in vibrant coastal cities
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-4xl font-display font-bold text-sky-800 mb-12 text-center">
              Who We Are
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-sky-800 text-lg">
                  Our properties are carefully selected to offer the perfect blend of modern comfort and coastal charm. Each stay is thoughtfully designed to make you feel right at home, with all the amenities you need for a comfortable stay. Whether you&apos;re looking for a cozy retreat or a spacious family home, we have the perfect place for you.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/oasis/DSC_8119_20_21_22_23.jpg"
                  alt="Coastal City Stays property with ocean view"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-4xl font-display font-bold text-sky-800 mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/oasis/DSC_8174_5_6_7_8.jpg"
                  alt="Modern living room with ocean view"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-sky-800 text-lg">
                  From ocean-view apartments to cozy city lofts, we offer thoughtfully furnished spaces equipped with everything you need—fast Wi-Fi, full kitchens, self-check-in, and more. Each rental is professionally maintained and designed to feel like home away from home.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-4xl font-display font-bold text-sky-800 mb-12 text-center">
              Our Location
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <Image
                  src="/about-location.jpg"
                  alt="Long Beach, California cityscape"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <p className="text-sky-800 text-lg">
                  We&apos;re proudly based in Long Beach, California—a vibrant coastal city where laid-back beach vibes meet energetic urban living. Guests love our proximity to the ocean, popular restaurants, the downtown arts district, and scenic waterfront spots like Shoreline Village and the Queen Mary. Whether you&apos;re catching a sunset or exploring the local scene, Long Beach offers the perfect blend of relaxation and adventure.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-4xl font-display font-bold text-sky-800 mb-12 text-center">
              Our Promise
            </h2>
            <div className="text-center">
              <p className="text-sky-800 text-lg mb-6">
                We&apos;re committed to providing spotless spaces, responsive support, and a seamless experience from booking to checkout. Guest satisfaction and comfort are at the core of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
