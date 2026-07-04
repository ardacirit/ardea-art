import { getAllSlugs } from '@/lib/queries'
import { absUrl } from '@/lib/seo'
import { LOCALES } from '@/lib/i18n'

export const revalidate = 3600

/** Bilingual sitemap with hreflang alternates for every URL. */
export default async function sitemap() {
  const { artworks, categories, posts } = await getAllSlugs()

  const entry = (path, { lastModified, priority = 0.7, changeFrequency = 'weekly' } = {}) =>
    LOCALES.map((lang) => ({
      url: absUrl(`/${lang}${path}`),
      lastModified: lastModified ? new Date(lastModified) : undefined,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((locale) => [locale, absUrl(`/${locale}${path}`)])
        ),
      },
    }))

  return [
    ...entry('', { priority: 1 }),
    ...entry('/collection', { priority: 0.9 }),
    ...entry('/blog', { priority: 0.6 }),
    ...entry('/about', { priority: 0.6, changeFrequency: 'monthly' }),
    ...entry('/contact', { priority: 0.5, changeFrequency: 'monthly' }),
    ...categories.flatMap(({ slug, _updatedAt }) =>
      entry(`/collection/${slug}`, { lastModified: _updatedAt, priority: 0.8 })
    ),
    ...artworks.flatMap(({ slug, _updatedAt }) =>
      entry(`/artwork/${slug}`, { lastModified: _updatedAt, priority: 0.8 })
    ),
    ...posts.flatMap(({ slug, _updatedAt }) =>
      entry(`/blog/${slug}`, { lastModified: _updatedAt, priority: 0.6 })
    ),
  ]
}
