import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import '../globals.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import JsonLd from '@/components/JsonLd'

import { LOCALES, isLocale, localized } from '@/lib/i18n'
import { getSettings, getCategories, getFeaturedArtworks } from '@/lib/queries'
import { urlFor, ogImageUrl } from '@/lib/image'
import {
  SITE_URL,
  ARTIST_NAME,
  personJsonLd,
  websiteJsonLd,
  instagramUrl,
  metaDescription,
} from '@/lib/seo'

export const revalidate = 60

const display = localFont({
  src: [
    {
      path: '../../public/fonts/PlayfairDisplay-VariableFont_wght.ttf',
      weight: '400 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf',
      weight: '400 900',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
})

const sans = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-VariableFont_opsz_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Italic-VariableFont_opsz_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const settings = await getSettings()

  const defaultTitle =
    settings?.siteTitle ||
    (lang === 'en'
      ? 'Zerrin Cirit — Çini & Ceramic Art'
      : 'Zerrin Cirit — Çini & Seramik Sanatı')

  const description = metaDescription(
    localized(settings?.metaDescription, lang),
    lang === 'en'
      ? 'Handmade Turkish çini tiles and ceramic art by Zerrin Cirit. Traditional İznik patterns reinterpreted in a contemporary voice.'
      : 'Zerrin Cirit imzalı el yapımı çini ve seramik eserler. Geleneksel İznik desenlerinin çağdaş yorumu.'
  )

  let ogSource =
    [settings?.ogImage, settings?.heroSlides?.[0]?.image, settings?.portraitImage].find(
      (source) => source?.asset
    ) || null
  if (!ogSource) {
    const featured = await getFeaturedArtworks()
    ogSource = featured[0]?.image
  }
  const ogUrl = ogImageUrl(ogSource)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: `%s — ${ARTIST_NAME}`,
    },
    description,
    keywords: [
      'çini',
      'seramik',
      'İznik çini',
      'el yapımı çini',
      'Turkish tiles',
      'ceramic art',
      'Zerrin Cirit',
    ],
    authors: [{ name: ARTIST_NAME, url: SITE_URL }],
    creator: ARTIST_NAME,
    icons: settings?.favicon
      ? { icon: urlFor(settings.favicon).width(192).height(192).url() }
      : { icon: '/favicon.svg' },
    openGraph: {
      type: 'website',
      siteName: defaultTitle,
      locale: lang === 'en' ? 'en_US' : 'tr_TR',
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const viewport = {
  themeColor: '#FBFAF7',
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [settings, categories] = await Promise.all([getSettings(), getCategories()])

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-cobalt focus:px-4 focus:py-2 focus:text-porcelain"
        >
          {lang === 'en' ? 'Skip to content' : 'İçeriğe geç'}
        </a>
        <Navbar lang={lang} categories={categories} instagram={instagramUrl(settings)} />
        <main id="content" className="min-h-screen">
          {children}
        </main>
        <Footer lang={lang} categories={categories} settings={settings} />
        <WhatsAppButton number={settings?.whatsappNumber} />
        <JsonLd data={[websiteJsonLd(settings, lang), personJsonLd(settings, lang)]} />
      </body>
    </html>
  )
}
