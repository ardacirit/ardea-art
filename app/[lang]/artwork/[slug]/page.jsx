import Link from 'next/link'
import { notFound } from 'next/navigation'

import ArtworkGallery from '@/components/ArtworkGallery'
import ArtworkCard from '@/components/ArtworkCard'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized, formatPrice } from '@/lib/i18n'
import { getArtwork, getRelatedArtworks, getSettings, getAllSlugs } from '@/lib/queries'
import { urlFor, hotspotPosition, artworkAlt, ogImageUrl } from '@/lib/image'
import {
  absUrl,
  languageAlternates,
  artworkJsonLd,
  breadcrumbJsonLd,
  metaDescription,
} from '@/lib/seo'

export const revalidate = 60

export async function generateStaticParams() {
  const { artworks } = await getAllSlugs()
  return artworks.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params
  const artwork = await getArtwork(slug)
  if (!artwork) return {}

  const title = localized(artwork.title, lang)
  const category = localized(artwork.category?.title, lang)
  const og = ogImageUrl(artwork.image)

  return {
    title: category ? `${title} · ${category}` : title,
    description: metaDescription(
      localized(artwork.description, lang),
      artworkAlt(artwork, lang)
    ),
    alternates: {
      canonical: absUrl(`/${lang}/artwork/${slug}`),
      languages: languageAlternates(`/artwork/${slug}`),
    },
    openGraph: {
      type: 'article',
      images: og ? [{ url: og, width: 1200, height: 630, alt: artworkAlt(artwork, lang) }] : undefined,
    },
  }
}

export default async function ArtworkPage({ params }) {
  const { lang, slug } = await params
  const [artwork, settings] = await Promise.all([getArtwork(slug), getSettings()])
  if (!artwork) notFound()

  const related = await getRelatedArtworks(slug, artwork.category?._id)

  const title = localized(artwork.title, lang)
  const category = localized(artwork.category?.title, lang)
  const description = localized(artwork.description, lang)
  const price = formatPrice(artwork.price, lang)

  const photos = [artwork.image, ...(artwork.images || [])]
    .filter((image) => image?.asset)
    .map((image, index) => ({
      src: urlFor(image).url(),
      alt:
        image.alt ||
        (index === 0
          ? artworkAlt(artwork, lang)
          : `${title} — ${index + 1}. ${lang === 'en' ? 'view' : 'görünüm'}`),
      position: hotspotPosition(image),
    }))

  const pageUrl = absUrl(`/${lang}/artwork/${slug}`)
  const whatsappNumber = (settings?.whatsappNumber || '905345983646').replace(/\D/g, '')
  const whatsappText = encodeURIComponent(
    `${localized(ui.artwork.whatsappMessage, lang).replace('{title}', title)}\n${pageUrl}`
  )

  const specs = [
    { label: localized(ui.artwork.year, lang), value: artwork.year },
    { label: localized(ui.artwork.dimensions, lang), value: artwork.dimensions },
    { label: localized(ui.artwork.technique, lang), value: localized(artwork.technique, lang) },
  ].filter((spec) => spec.value)

  return (
    <div className="mx-auto max-w-site px-6 pb-24 pt-32 lg:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-kicker text-faint">
        <Link href={`/${lang}/collection`} className="transition-colors hover:text-cobalt">
          {localized(ui.nav.collection, lang)}
        </Link>
        {artwork.category?.slug?.current && (
          <>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link
              href={`/${lang}/collection/${artwork.category.slug.current}`}
              className="transition-colors hover:text-cobalt"
            >
              {category}
            </Link>
          </>
        )}
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-smoke">{title}</span>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ArtworkGallery photos={photos} />
        </div>

        <div>
          {category && (
            <p className="kicker">
              {artwork.category?.emoji ? `${artwork.category.emoji} ` : ''}
              {category}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {title}
          </h1>

          {artwork.sold && (
            <p className="mt-6 inline-block bg-coral px-4 py-1.5 text-[0.65rem] uppercase tracking-kicker text-white">
              {localized(ui.artwork.sold, lang)}
            </p>
          )}

          {description && <p className="mt-7 leading-loose text-smoke">{description}</p>}

          {specs.length > 0 && (
            <dl className="mt-9 divide-y divide-line border-y border-line">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-6 py-4">
                  <dt className="text-xs uppercase tracking-kicker text-faint">
                    {spec.label}
                  </dt>
                  <dd className="text-right text-sm text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {price && !artwork.sold && (
            <div className="mt-9">
              <p className="font-display text-3xl text-ink">{price}</p>
              <p className="mt-2 text-sm text-faint">
                {localized(ui.artwork.priceNote, lang)}
              </p>
            </div>
          )}

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {localized(ui.artwork.inquire, lang)}
            </a>
            {artwork.shopierUrl && !artwork.sold && (
              <a
                href={artwork.shopierUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {localized(ui.artwork.shopier, lang)}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related works */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-title">{localized(ui.artwork.related, lang)}</h2>
            {artwork.category?.slug?.current && (
              <Link
                href={`/${lang}/collection/${artwork.category.slug.current}`}
                className="nav-link text-xs uppercase tracking-kicker text-cobalt"
              >
                {localized(ui.artwork.back, lang)} →
              </Link>
            )}
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item._id} delay={index * 80}>
                <ArtworkCard artwork={item} lang={lang} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={[
          artworkJsonLd(artwork, lang),
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            {
              name: localized(ui.nav.collection, lang),
              url: absUrl(`/${lang}/collection`),
            },
            ...(artwork.category?.slug?.current
              ? [
                  {
                    name: category,
                    url: absUrl(`/${lang}/collection/${artwork.category.slug.current}`),
                  },
                ]
              : []),
            { name: title, url: pageUrl },
          ]),
        ]}
      />
    </div>
  )
}
