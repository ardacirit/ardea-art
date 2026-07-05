import ArtworkCard from '@/components/ArtworkCard'
import CategoryChips from '@/components/CategoryChips'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized } from '@/lib/i18n'
import { getAllArtworks, getCategories } from '@/lib/queries'
import {
  absUrl,
  languageAlternates,
  collectionPageJsonLd,
  breadcrumbJsonLd,
  metaDescription,
} from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { lang } = await params
  return {
    title: localized(ui.collection.title, lang),
    description: metaDescription(
      lang === 'en'
        ? 'The full collection of handmade çini tiles and ceramic works by Zerrin Cirit.'
        : 'Zerrin Cirit imzalı el yapımı çini ve seramik eserlerin tüm koleksiyonu.'
    ),
    alternates: {
      canonical: absUrl(`/${lang}/collection`),
      languages: languageAlternates('/collection'),
    },
  }
}

export default async function CollectionPage({ params }) {
  const { lang } = await params
  const [artworks, allCategories] = await Promise.all([getAllArtworks(), getCategories()])
  const categories = allCategories.filter((category) => category.count > 0)

  return (
    <div className="mx-auto max-w-site px-6 pb-24 pt-36 lg:px-10">
      <Reveal>
        <p className="kicker">{localized(ui.collection.kicker, lang)}</p>
        <h1 className="section-title mt-4">{localized(ui.collection.title, lang)}</h1>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <CategoryChips lang={lang} categories={categories} active={null} />
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
            name: localized(ui.collection.title, lang),
            url: absUrl(`/${lang}/collection`),
            artworks,
            lang,
          }),
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            {
              name: localized(ui.nav.collection, lang),
              url: absUrl(`/${lang}/collection`),
            },
          ]),
        ]}
      />
    </div>
  )
}
