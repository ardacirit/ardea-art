import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized } from '@/lib/i18n'
import { getSettings } from '@/lib/queries'
import {
  absUrl,
  languageAlternates,
  instagramUrl,
  breadcrumbJsonLd,
  metaDescription,
  SITE_URL,
} from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { lang } = await params
  const settings = await getSettings()
  return {
    title: localized(ui.nav.contact, lang),
    description: metaDescription(
      localized(settings?.contactSubtitle, lang),
      lang === 'en'
        ? 'Contact Zerrin Cirit for custom çini orders, collaborations and exhibitions.'
        : 'Özel çini siparişi, işbirliği ve sergiler için Zerrin Cirit ile iletişime geçin.'
    ),
    alternates: {
      canonical: absUrl(`/${lang}/contact`),
      languages: languageAlternates('/contact'),
    },
  }
}

export default async function ContactPage({ params }) {
  const { lang } = await params
  const settings = await getSettings()

  const whatsapp = (settings?.whatsappNumber || '905345983646').replace(/\D/g, '')
  const instagram = instagramUrl(settings)
  const handle = (settings?.instagramHandle || 'zerrin.cirit').replace(/^@/, '')

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-36">
      <Reveal className="text-center">
        <p className="kicker">{localized(ui.contact.kicker, lang)}</p>
        <h1 className="section-title mt-4">{localized(ui.contact.title, lang)}</h1>
        {localized(settings?.contactSubtitle, lang) && (
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-smoke">
            {localized(settings.contactSubtitle, lang)}
          </p>
        )}
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal delay={80}>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full border border-line bg-porcelain p-8 transition-colors duration-300 hover:border-cobalt"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C4B]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
              </svg>
            </span>
            <h2 className="mt-5 font-display text-xl text-ink transition-colors group-hover:text-cobalt">
              {localized(ui.contact.whatsapp, lang)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              {localized(ui.contact.whatsappDesc, lang)}
            </p>
            <p className="mt-4 text-xs tracking-widest text-faint">
              +{whatsapp.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}
            </p>
          </a>
        </Reveal>

        <Reveal delay={160}>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full border border-line bg-porcelain p-8 transition-colors duration-300 hover:border-cobalt"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/10 text-coral">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <h2 className="mt-5 font-display text-xl text-ink transition-colors group-hover:text-cobalt">
              {localized(ui.contact.instagram, lang)}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-smoke">
              {localized(ui.contact.instagramDesc, lang)}
            </p>
            <p className="mt-4 text-xs tracking-widest text-faint">@{handle}</p>
          </a>
        </Reveal>
      </div>

      {settings?.email && (
        <Reveal delay={200} className="mt-6">
          <a
            href={`mailto:${settings.email}`}
            className="group flex flex-wrap items-center justify-between gap-4 border border-line bg-porcelain p-6 transition-colors duration-300 hover:border-cobalt sm:px-8"
          >
            <span>
              <span className="block font-display text-lg text-ink transition-colors group-hover:text-cobalt">
                {localized(ui.contact.email, lang)}
              </span>
              <span className="mt-1 block text-sm text-smoke">
                {localized(ui.contact.emailDesc, lang)}
              </span>
            </span>
            <span className="text-sm tracking-widest text-faint">{settings.email}</span>
          </a>
        </Reveal>
      )}

      {localized(settings?.customOrderText, lang) && (
        <Reveal delay={220} className="mt-10">
          <div className="border border-cobalt/20 bg-cobalt-pale p-8 sm:p-10">
            <p className="kicker">{localized(ui.contact.customOrder, lang)}</p>
            <p className="mt-4 leading-loose text-ink">
              {localized(settings.customOrderText, lang)}
            </p>
          </div>
        </Reveal>
      )}

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: absUrl(`/${lang}/contact`),
            inLanguage: lang,
            about: { '@id': `${SITE_URL}/#artist` },
          },
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            { name: localized(ui.nav.contact, lang), url: absUrl(`/${lang}/contact`) },
          ]),
        ]}
      />
    </div>
  )
}
