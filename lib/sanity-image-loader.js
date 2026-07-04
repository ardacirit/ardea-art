/**
 * Custom next/image loader that delegates resizing to the Sanity image CDN.
 * `fit=max` never upscales and never distorts; cropping to an aspect ratio is
 * done in CSS (object-cover + hotspot-driven object-position).
 */
export default function sanityImageLoader({ src, width, quality }) {
  if (!src.startsWith('https://cdn.sanity.io')) return src
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality || 80))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}
