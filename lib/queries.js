import { cache } from 'react'
import { client } from './sanity'

/*
 * All data access for the site. Every function is wrapped in React's cache()
 * so a page and its layout can request the same document within one render
 * without duplicate network calls. Pages export `revalidate = 60`, so content
 * published in Sanity appears on the live site within a minute — no redeploy.
 */

const ARTWORK_FIELDS = `
  _id,
  _updatedAt,
  title,
  slug,
  "category": category->{ _id, title, slug, emoji },
  image,
  images,
  alt,
  description,
  year,
  dimensions,
  technique,
  price,
  shopierUrl,
  featured,
  sold
`

export const getSettings = cache(() =>
  client.fetch(`*[_type == "siteSettings"][0] {
    favicon,
    siteTitle,
    metaDescription,
    ogImage,
    artistLocation,
    email,
    whatsappNumber,
    instagramHandle,
    heroSlides,
    heroTagline,
    heroSubtitle,
    philosophyQuote,
    featuredTitle,
    featuredSubtitle,
    contactSubtitle,
    customOrderText,
    portraitImage,
    atelierImage,
    processImage,
    homeTeaserImage,
    aboutP1,
    aboutP2,
    aboutP3,
    aboutAtelierText,
    aboutTechniques,
    footerTagline,
    footerQuote
  }`)
)

export const getCategories = cache(() =>
  client.fetch(`*[_type == "category"] | order(order asc, title.tr asc) {
    _id,
    title,
    slug,
    emoji,
    description,
    "cover": coalesce(
      coverImage,
      *[_type == "artwork" && references(^._id)] | order(order asc)[0].image
    ),
    "count": count(*[_type == "artwork" && references(^._id)])
  }`)
)

export const getCategory = cache((slug) =>
  client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      emoji,
      description,
      "cover": coalesce(
        coverImage,
        *[_type == "artwork" && references(^._id)] | order(order asc)[0].image
      )
    }`,
    { slug }
  )
)

export const getAllArtworks = cache(() =>
  client.fetch(
    `*[_type == "artwork"] | order(order asc, _createdAt desc) { ${ARTWORK_FIELDS} }`
  )
)

export const getArtworksByCategory = cache((slug) =>
  client.fetch(
    `*[_type == "artwork" && category->slug.current == $slug]
      | order(order asc, _createdAt desc) { ${ARTWORK_FIELDS} }`,
    { slug }
  )
)

/** Up to 6 works for the home page: featured first, topped up with the
 *  newest others so the section never looks like an empty shelf. */
export const getFeaturedArtworks = cache(async () => {
  const [featured, latest] = await Promise.all([
    client.fetch(
      `*[_type == "artwork" && featured == true] | order(order asc)[0...6] { ${ARTWORK_FIELDS} }`
    ),
    client.fetch(
      `*[_type == "artwork"] | order(order asc, _createdAt desc)[0...6] { ${ARTWORK_FIELDS} }`
    ),
  ])
  const seen = new Set(featured.map((artwork) => artwork._id))
  return [...featured, ...latest.filter((artwork) => !seen.has(artwork._id))].slice(0, 6)
})

export const getArtwork = cache((slug) =>
  client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] { ${ARTWORK_FIELDS} }`,
    { slug }
  )
)

export const getRelatedArtworks = cache((slug, categoryId) =>
  client.fetch(
    `*[_type == "artwork" && slug.current != $slug && category._ref == $categoryId]
      | order(order asc, _createdAt desc)[0...3] { ${ARTWORK_FIELDS} }`,
    { slug, categoryId: categoryId || '' }
  )
)

export const getBlogPosts = cache(() =>
  client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    category,
    coverImage,
    excerpt,
    publishedAt,
    readingTime
  }`)
)

export const getBlogPost = cache((slug) =>
  client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      slug,
      category,
      coverImage,
      excerpt,
      content,
      publishedAt,
      readingTime
    }`,
    { slug }
  )
)

/** Slug lists for generateStaticParams + sitemap */
export const getAllSlugs = cache(() =>
  client.fetch(`{
    "artworks": *[_type == "artwork" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
    "categories": *[_type == "category" && defined(slug.current)
      && count(*[_type == "artwork" && references(^._id)]) > 0]{ "slug": slug.current, _updatedAt },
    "posts": *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
  }`)
)
