import { notFound } from 'next/navigation'

import ArtworkCard from '@/components/ArtworkCard'
import CategoryChips from '@/components/CategoryChips'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized } from '@/lib/i18n'
import { getCategories, getCategory, getArtworksByCategory } from '@/lib/queries'
import { ogImageUrl } from '@/lib/image'
import {
  absUrl,
  languageAlternates,
  collectionPageJsonLd,
  breadcrumbJsonLd,
  metaDescription,
} from '@/lib/seo'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ category: category.slug.current }))
}

export async function generateMetadata({ params }) {
  const { lang, category: slug } = await params
  const [category, artworks] = await Promise.all([
    getCategory(slug),
    getArtworksByCategory(slug),
  ])
  if (!category) return {}

  const title = localized(category.title, lang)
  const og = ogImageUrl(category.cover)

  return {
    title,
    // Empty collections stay reachable but out of the index until they
    // have at least one work.
    robots: artworks.length === 0 ? { index: false, follow: true } : undefined,
    description: metaDescription(
      localized(category.description, lang),
      lang === 'en'
        ? `${title} — handmade works by Zerrin Cirit.`
        : `${title} — Zerrin Cirit imzalı el yapımı eserler.`
    ),
    alternates: {
      canonical: absUrl(`/${lang}/collection/${slug}`),
      languages: languageAlternates(`/collection/${slug}`),
    },
    openGraph: og ? { images: [{ url: og, width: 1200, height: 630 }] } : undefined,
  }
}

export default async function CategoryPage({ params }) {
  const { lang, category: slug } = await params
  const [category, allCategories, artworks] = await Promise.all([
    getCategory(slug),
    getCategories(),
    getArtworksByCategory(slug),
  ])
  if (!category) notFound()
  const categories = allCategories.filter((item) => item.count > 0)

  const title = localized(category.title, lang)

  return (
    <div className="mx-auto max-w-site px-6 pb-24 pt-36 lg:px-10">
      <Reveal>
        <p className="kicker">{localized(ui.collection.kicker, lang)}</p>
        <h1 className="section-title mt-4">{title}</h1>
        {localized(category.description, lang) && (
          <p className="mt-5 max-w-2xl leading-relaxed text-smoke">
            {localized(category.description, lang)}
          </p>
        )}
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <CategoryChips lang={lang} categories={categories} active={slug} />
      </Reveal>

      {artworks.length === 0 ? (
        <p className="mt-16 text-smoke">{localized(ui.collection.empty, lang)}</p>
      ) : (
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, index) => (
            <Reveal key={artwork._id} delay={(index % 3) * 80}>
              <ArtworkCard artwork={artwork} lang={lang} priority={index < 3} heading="h2" />
            </Reveal>
          ))}
        </div>
      )}

      <JsonLd
        data={[
          collectionPageJsonLd({
            name: title,
            description: localized(category.description, lang),
            url: absUrl(`/${lang}/collection/${slug}`),
            artworks,
            lang,
          }),
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            {
              name: localized(ui.nav.collection, lang),
              url: absUrl(`/${lang}/collection`),
            },
            { name: title, url: absUrl(`/${lang}/collection/${slug}`) },
          ]),
        ]}
      />
    </div>
  )
}
