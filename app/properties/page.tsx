import { Metadata } from 'next'
import { properties } from '@/data/properties'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.id)
  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.',
    }
  }
  return {
    title: `${property.name} - Coastal City Stays`,
    description: property.description,
  }
}

// Simplified page component without dynamic imports
export default function Page({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  // Render the property details directly in this component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
      <p className="mb-6">{property.description}</p>
      
      {/* Add more property details as needed */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p>Price: ${property.price}/night</p>
        <p>Location: {property.location}</p>
      </div>
    </div>
  );
}
