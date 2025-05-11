"use client"

import dynamic from 'next/dynamic'
import { Property } from '@/types/property'

const PropertyDetails = dynamic<{ property: Property }>(
  () => import('./PropertyDetails'),
  { loading: () => <div>Loading property details...</div> }
)

export default function PropertyDetailsClient({ property }: { property: Property }) {
  return <PropertyDetails property={property} />
}
