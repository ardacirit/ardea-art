export const ARTWORKS_QUERY = `*[_type == "artwork"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "category": category->{ _id, title, slug, emoji },
  image,
  description,
  price,
  shopierUrl,
  featured,
  sold
}`

export const FEATURED_ARTWORKS_QUERY = `*[_type == "artwork" && featured == true] | order(order asc) [0...6] {
  _id,
  title,
  "category": category->{ _id, title, slug, emoji },
  image,
  description,
  price,
  shopierUrl,
  featured,
  sold
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  slug,
  emoji
}`

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  coverImage,
  excerpt,
  publishedAt,
  readingTime
}`

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  coverImage,
  excerpt,
  content,
  publishedAt,
  readingTime
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  whatsappNumber,
  instagramHandle,
  heroSlides,
  heroTagline,
  heroSubtitle,
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
}`
