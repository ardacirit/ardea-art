import { createClient } from '@sanity/client'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uanm61w5'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})
