import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

/** Intrinsic pixel size parsed from the asset reference (image-…-2000x1500-jpg). */
export function imageDimensions(image) {
  const ref = image?.asset?._ref || image?.asset?._id || ''
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) return { width: 1200, height: 900 }
  return { width: Number(match[1]), height: Number(match[2]) }
}

/** hotspot → CSS object-position, so crops keep the artist's chosen focal point */
export function hotspotPosition(image) {
  const h = image?.hotspot
  if (!h) return undefined
  return `${(h.x * 100).toFixed(1)}% ${(h.y * 100).toFixed(1)}%`
}

/** 1200×630 crop for Open Graph / Twitter cards, focal-point aware */
export function ogImageUrl(source) {
  if (!source?.asset) return null
  return urlFor(source).width(1200).height(630).fit('crop').auto('format').url()
}

/**
 * Algorithmic alt text for artworks. The editor-supplied `alt` field always
 * wins; otherwise we compose a descriptive, keyword-bearing sentence so
 * Google Images / Pinterest always index a meaningful description.
 */
export function artworkAlt(artwork, lang) {
  const explicit = artwork?.alt?.[lang] || artwork?.alt?.tr
  if (explicit) return explicit
  const title = artwork?.title?.[lang] || artwork?.title?.tr || ''
  const category = artwork?.category?.title?.[lang] || artwork?.category?.title?.tr || ''
  const year = artwork?.year ? ` (${artwork.year})` : ''
  return lang === 'en'
    ? `${title}${year} — handmade ${category ? category.toLowerCase() : 'ceramic'} by Zerrin Cirit`
    : `${title}${year} — Zerrin Cirit el yapımı ${category ? category.toLocaleLowerCase('tr') : 'çini'} eseri`
}
