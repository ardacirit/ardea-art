import SanityImage from '@/components/SanityImage'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized } from '@/lib/i18n'
import { getSettings } from '@/lib/queries'
import {
  absUrl,
  languageAlternates,
  breadcrumbJsonLd,
  metaDescription,
  SITE_URL,
} from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { lang } = await params
  return {
    title: localized(ui.nav.about, lang),
    // A purpose-written summary reads better in search results than a
    // truncated first-person paragraph. Kept free of years and places so it
    // can never contradict what the artist writes in the Studio.
    description: metaDescription(
      lang === 'en'
        ? 'The story of çini and ceramic artist Zerrin Cirit: a journey into traditional tile art after a long career in banking, her studio and her techniques.'
        : "Çini ve seramik sanatçısı Zerrin Cirit'in hikayesi: bankacılık kariyerinin ardından başlayan çini yolculuğu, atölyesi ve kullandığı teknikler."
    ),
    alternates: {
      canonical: absUrl(`/${lang}/about`),
      languages: languageAlternates('/about'),
    },
  }
}

export default async function AboutPage({ params }) {
  const { lang } = await params
  const settings = await getSettings()

  const paragraphs = [settings?.aboutP1, settings?.aboutP2, settings?.aboutP3]
    .map((paragraph) => localized(paragraph, lang))
    .filter(Boolean)
  const techniques = (settings?.aboutTechniques || [])
    .map((technique) => localized(technique, lang))
    .filter(Boolean)

  return (
    <div className="pb-24 pt-36">
      {/* Without a portrait the story gets one comfortable reading column
          instead of a half-empty two-column grid. */}
      <div
        className={`mx-auto grid gap-14 px-6 lg:px-10 ${
          settings?.portraitImage
            ? 'max-w-site lg:grid-cols-[1.2fr_1fr] lg:gap-20'
            : 'max-w-3xl'
        }`}
      >
        <Reveal>
          <p className="kicker">{localized(ui.about.kicker, lang)}</p>
          <h1 className="section-title mt-4">{localized(ui.about.title, lang)}</h1>
          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'font-display text-xl italic leading-relaxed text-ink'
                    : 'leading-loose text-smoke'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {settings?.portraitImage && (
          <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-bone">
              <SanityImage
                image={settings.portraitImage}
                alt={
                  lang === 'en'
                    ? 'Portrait of artist Zerrin Cirit'
                    : 'Sanatçı Zerrin Cirit portresi'
                }
                sizes="(min-width: 1024px) 38vw, 100vw"
                priority
              />
            </div>
          </Reveal>
        )}
      </div>

      {/* Atelier */}
      {(settings?.atelierImage || localized(settings?.aboutAtelierText, lang)) && (
        <section className="mt-24 border-y border-line bg-bone">
          <div className="mx-auto grid max-w-site items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
            {settings?.atelierImage && (
              <Reveal className="relative aspect-[16/10] overflow-hidden">
                <SanityImage
                  image={settings.atelierImage}
                  alt={
                    lang === 'en'
                      ? 'Zerrin Cirit’s çini studio'
                      : 'Zerrin Cirit’in çini atölyesi'
                  }
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </Reveal>
            )}
            <Reveal delay={120}>
              <p className="kicker">{localized(ui.about.atelierKicker, lang)}</p>
              <h2 className="section-title mt-4">{localized(ui.about.atelier, lang)}</h2>
              {localized(settings?.aboutAtelierText, lang) && (
                <p className="mt-6 leading-loose text-smoke">
                  {localized(settings.aboutAtelierText, lang)}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Techniques */}
      {techniques.length > 0 && (
        <section className="mx-auto grid max-w-site items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="kicker">{localized(ui.about.techniquesKicker, lang)}</p>
            <h2 className="section-title mt-4">{localized(ui.about.techniques, lang)}</h2>
            <ol className="mt-8 space-y-4">
              {techniques.map((technique, index) => (
                <li
                  key={technique}
                  className="flex items-baseline gap-5 border-b border-line pb-4"
                >
                  <span className="font-display text-sm text-cobalt">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink">{technique}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          {settings?.processImage && (
            <Reveal delay={120} className="relative aspect-[16/10] overflow-hidden bg-bone">
              <SanityImage
                image={settings.processImage}
                alt={
                  lang === 'en'
                    ? 'Çini making process — underglaze painting'
                    : 'Çini üretim süreci — sıraltı boyama'
                }
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Reveal>
          )}
        </section>
      )}

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            url: absUrl(`/${lang}/about`),
            inLanguage: lang,
            // The full Person block is already emitted once by the layout.
            mainEntity: { '@id': `${SITE_URL}/#artist` },
          },
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            { name: localized(ui.nav.about, lang), url: absUrl(`/${lang}/about`) },
          ]),
        ]}
      />
    </div>
  )
}
