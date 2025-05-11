import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = {
  id: string
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  return {
    title: `Test Page - ${params.id}`,
  }
}

export default function TestPage({ params }: { params: Params }) {
  return (
    <div>
      <h1>Test Page</h1>
      <p>ID: {params.id}</p>
    </div>
  )
}
