import Link from 'next/link'

import HeroCarousel from '@/components/HeroCarousel'
import ArtworkCard from '@/components/ArtworkCard'
import SanityImage from '@/components/SanityImage'
import Reveal from '@/components/Reveal'

import { ui, localized, formatDate } from '@/lib/i18n'
import {
  getSettings,
  getCategories,
  getFeaturedArtworks,
  getBlogPosts,
} from '@/lib/queries'
import { urlFor, hotspotPosition, artworkAlt, ogImageUrl } from '@/lib/image'
import { absUrl, languageAlternates, metaDescription, siteTitleFor } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { lang } = await params
  const settings = await getSettings()

  return {
    title: { absolute: siteTitleFor(settings, lang) },
    description: metaDescription(
      localized(settings?.metaDescription, lang),
      localized(ui.hero.sub, lang)
    ),
    alternates: {
      canonical: absUrl(`/${lang}`),
      languages: languageAlternates(''),
    },
  }
}

const CARD_ASPECTS = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]']

export default async function HomePage({ params }) {
  const { lang } = await params
  const [settings, allCategories, featured, posts] = await Promise.all([
    getSettings(),
    getCategories(),
    getFeaturedArtworks(),
    getBlogPosts(),
  ])
  const categories = allCategories.filter((category) => category.count > 0)

  // Hero slides: editor-managed slides first, otherwise featured artworks.
  const slideSources =
    settings?.heroSlides?.filter((slide) => slide.image?.asset) ??
    []
  const slides = (slideSources.length > 0
    ? slideSources.map((slide) => ({
        image: slide.image,
        alt:
          localized(slide.tagline, lang) ||
          `Zerrin Cirit — ${localized(ui.hero.kicker, lang)}`,
      }))
    : featured.slice(0, 3).map((artwork) => ({
        image: artwork.image,
        alt: artworkAlt(artwork, lang),
      }))
  ).map(({ image, alt }) => ({
    src: urlFor(image).url(),
    alt,
    position: hotspotPosition(image),
  }))

  const heroTagline =
    localized(settings?.heroTagline, lang) || localized(ui.hero.tagline, lang)
  const heroSubtitle =
    localized(settings?.heroSubtitle, lang) || localized(ui.hero.sub, lang)
  const quote = localized(settings?.philosophyQuote, lang)
  const aboutImage = settings?.homeTeaserImage || settings?.portraitImage
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grid lg:min-h-screen lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <Reveal>
            <p className="kicker">{localized(ui.hero.kicker, lang)}</p>
            <h1 className="mt-6 whitespace-pre-line font-display text-5xl leading-[1.05] text-ink sm:text-6xl xl:text-7xl">
              {heroTagline}
            </h1>
            <p className="mt-7 max-w-md leading-relaxed text-smoke">{heroSubtitle}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={`/${lang}/collection`} className="btn-primary">
                {localized(ui.hero.cta, lang)}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={`/${lang}/about`} className="btn-outline">
                {localized(ui.hero.ctaAbout, lang)}
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-[55vh] lg:min-h-full">
          <HeroCarousel slides={slides} />
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-1 bg-cobalt lg:block"
          />
        </div>
      </section>

      {/* ── Philosophy quote ─────────────────────────────────────────── */}
      {quote && (
        <section className="border-y border-line bg-bone">
          <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
            <span aria-hidden="true" className="font-display text-6xl leading-none text-cobalt">
              “
            </span>
            <p className="mt-2 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
              {quote}
            </p>
          </Reveal>
        </section>
      )}

      {/* ── Featured works ───────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-site px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">{localized(ui.home.featuredKicker, lang)}</p>
              <h2 className="section-title mt-4">
                {localized(settings?.featuredTitle, lang) ||
                  localized(ui.home.featuredTitle, lang)}
              </h2>
              {localized(settings?.featuredSubtitle, lang) && (
                <p className="mt-4 max-w-xl leading-relaxed text-smoke">
                  {localized(settings.featuredSubtitle, lang)}
                </p>
              )}
            </div>
            <Link
              href={`/${lang}/collection`}
              className="nav-link text-xs uppercase tracking-kicker text-cobalt"
            >
              {localized(ui.home.viewAll, lang)} →
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artwork, index) => (
              <Reveal
                key={artwork._id}
                delay={(index % 3) * 90}
                className={index % 3 === 1 ? 'lg:translate-y-10' : ''}
              >
                <ArtworkCard
                  artwork={artwork}
                  lang={lang}
                  priority={index < 3}
                  aspect={CARD_ASPECTS[index % CARD_ASPECTS.length]}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Collections (dynamic categories → auto navigation) ──────── */}
      {categories.length > 0 && (
        <section className="border-t border-line bg-bone">
          <div className="mx-auto max-w-site px-6 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <p className="kicker">{localized(ui.home.collectionsKicker, lang)}</p>
              <h2 className="section-title mt-4">
                {localized(ui.home.collectionsTitle, lang)}
              </h2>
            </Reveal>
            <div
              className={`mt-12 grid gap-8 ${
                categories.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
              }`}
            >
              {categories.map((category, index) => (
                <Reveal key={category._id} delay={index * 100}>
                  <Link
                    href={`/${lang}/collection/${category.slug.current}`}
                    className="group relative block aspect-[16/11] overflow-hidden bg-line"
                  >
                    {category.cover && (
                      <SanityImage
                        image={category.cover}
                        alt={`${localized(category.title, lang)} — Zerrin Cirit`}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    )}
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                      <span>
                        <span className="block font-display text-2xl text-porcelain">
                          {localized(category.title, lang)}
                        </span>
                        <span className="mt-1 block text-xs tracking-kicker text-porcelain/70">
                          {category.count} {localized(ui.home.pieces, lang)}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-porcelain transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-site items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        {aboutImage && (
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-bone">
            <SanityImage
              image={aboutImage}
              alt={
                lang === 'en'
                  ? 'Zerrin Cirit in her studio'
                  : 'Zerrin Cirit atölyesinde'
              }
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        )}
        <Reveal delay={120}>
          <p className="kicker">{localized(ui.home.aboutKicker, lang)}</p>
          <h2 className="section-title mt-4">{localized(ui.home.aboutTitle, lang)}</h2>
          {localized(settings?.aboutP1, lang) && (
            <p className="mt-6 leading-loose text-smoke">
              {localized(settings.aboutP1, lang)}
            </p>
          )}
          <Link
            href={`/${lang}/about`}
            className="nav-link mt-8 inline-block text-xs uppercase tracking-kicker text-cobalt"
          >
            {localized(ui.home.aboutCta, lang)} →
          </Link>
        </Reveal>
      </section>

      {/* ── Journal teaser ───────────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-site px-6 py-20 lg:px-10 lg:py-28">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker">{localized(ui.home.journalKicker, lang)}</p>
                <h2 className="section-title mt-4">
                  {localized(ui.home.journalTitle, lang)}
                </h2>
              </div>
              <Link
                href={`/${lang}/blog`}
                className="nav-link text-xs uppercase tracking-kicker text-cobalt"
              >
                {localized(ui.home.journalCta, lang)} →
              </Link>
            </Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {latestPosts.map((post, index) => (
                <Reveal key={post._id} delay={index * 90}>
                  <Link href={`/${lang}/blog/${post.slug.current}`} className="group block">
                    {post.coverImage && (
                      <div className="relative aspect-[3/2] overflow-hidden bg-bone">
                        <SanityImage
                          image={post.coverImage}
                          alt={localized(post.title, lang)}
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <p className="mt-5 text-xs uppercase tracking-kicker text-faint">
                      {formatDate(post.publishedAt, lang)}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-cobalt">
                      {localized(post.title, lang)}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Custom order CTA ─────────────────────────────────────────── */}
      <section className="bg-cobalt-deep">
        <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
          <h2 className="font-display text-3xl leading-tight text-porcelain sm:text-4xl">
            {localized(ui.home.ctaTitle, lang)}
          </h2>
          <p className="mt-4 text-porcelain/70">{localized(ui.home.ctaText, lang)}</p>
          <Link href={`/${lang}/contact`} className="btn-outline-light mt-9">
            {localized(ui.nav.contact, lang)}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
