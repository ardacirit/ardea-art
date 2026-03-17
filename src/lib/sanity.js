import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export function sanityImageUrl(source, { width = 800, height = 600 } = {}) {
  if (!source) return null
  return urlFor(source).width(width).height(height).auto('format').url()
}
