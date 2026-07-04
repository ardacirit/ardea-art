import { localized } from './i18n'
import { ogImageUrl, artworkAlt, urlFor } from './image'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://zerrincirit.com'
).replace(/\/$/, '')

export const ARTIST_NAME = 'Zerrin Cirit'

export function absUrl(path = '') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function instagramUrl(settings) {
  const handle = settings?.instagramHandle || 'zerrin.cirit'
  return `https://www.instagram.com/${handle.replace(/^@/, '')}`
}

/** hreflang alternates for a path shared by both languages */
export function languageAlternates(path = '') {
  return {
    tr: absUrl(`/tr${path}`),
    en: absUrl(`/en${path}`),
    'x-default': absUrl(`/tr${path}`),
  }
}

/* ---------------------------------------------------------------------------
 * JSON-LD builders. Every builder returns a plain object rendered through
 * <JsonLd/> so Google, Bing, Perplexity & friends can parse, cite and credit
 * the work without scraping the DOM.
 * ------------------------------------------------------------------------ */

export function personJsonLd(settings, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#artist`,
    name: ARTIST_NAME,
    url: absUrl(`/${lang}`),
    image: settings?.portraitImage ? ogImageUrl(settings.portraitImage) : undefined,
    jobTitle:
      lang === 'en'
        ? 'Çini (Turkish Tile) & Ceramic Artist'
        : 'Çini ve Seramik Sanatçısı',
    description:
      localized(settings?.aboutP1, lang) ||
      (lang === 'en'
        ? 'Artist specialising in handmade Turkish çini tiles and ceramics.'
        : 'El yapımı çini ve seramik eserler üreten sanatçı.'),
    knowsAbout: [
      'Çini',
      'İznik tiles',
      'Ceramic art',
      'Turkish tile art',
      'Underglaze painting',
    ],
    workLocation: {
      '@type': 'Place',
      name: settings?.artistLocation || 'İstanbul, Türkiye',
    },
    sameAs: [instagramUrl(settings)],
  }
}

export function websiteJsonLd(settings, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: settings?.siteTitle || ARTIST_NAME,
    url: SITE_URL,
    inLanguage: lang,
    publisher: { '@id': `${SITE_URL}/#artist` },
  }
}

export function artworkJsonLd(artwork, lang) {
  const title = localized(artwork.title, lang)
  const category = localized(artwork.category?.title, lang)
  const url = absUrl(`/${lang}/artwork/${artwork.slug.current}`)
  const images = [artwork.image, ...(artwork.images || [])]
    .filter((img) => img?.asset)
    .map((img) => urlFor(img).width(1600).fit('max').auto('format').url())

  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${url}#artwork`,
    name: title,
    url,
    image: images,
    description:
      localized(artwork.description, lang) || artworkAlt(artwork, lang),
    creator: { '@id': `${SITE_URL}/#artist` },
    artform: category || (lang === 'en' ? 'Ceramic art' : 'Seramik sanatı'),
    artMedium: localized(artwork.technique, lang) || undefined,
    dateCreated: artwork.year ? String(artwork.year) : undefined,
    size: artwork.dimensions || undefined,
    inLanguage: lang,
  }
}

export function blogPostingJsonLd(post, lang) {
  const url = absUrl(`/${lang}/blog/${post.slug.current}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: localized(post.title, lang),
    url,
    image: post.coverImage ? ogImageUrl(post.coverImage) : undefined,
    description: localized(post.excerpt, lang) || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || post.publishedAt || undefined,
    author: { '@id': `${SITE_URL}/#artist` },
    publisher: { '@id': `${SITE_URL}/#artist` },
    inLanguage: lang,
  }
}

export function collectionPageJsonLd({ name, description, url, artworks, lang }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description: description || undefined,
    url,
    inLanguage: lang,
    about: { '@id': `${SITE_URL}/#artist` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (artworks || []).map((artwork, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: localized(artwork.title, lang),
        url: absUrl(`/${lang}/artwork/${artwork.slug.current}`),
      })),
    },
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** Strip + trim any text to a meta-description-safe length */
export function metaDescription(text, fallback = '') {
  const value = (text || fallback || '').replace(/\s+/g, ' ').trim()
  if (value.length <= 158) return value
  return `${value.slice(0, 155).trimEnd()}…`
}
