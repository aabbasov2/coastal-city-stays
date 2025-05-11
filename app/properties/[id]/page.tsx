import { Metadata } from 'next'
import { properties } from '@/data/properties'
import { notFound } from 'next/navigation'
import PropertyDetailsClient from './PropertyDetailsClient'

const getProperty = (id: string) => {
  return properties.find((p) => p.id === id)
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = getProperty(params.id)

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

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = getProperty(params.id)

  if (!property) {
    notFound()
  }

  return <PropertyDetailsClient property={property} />
}
