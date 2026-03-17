import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { useSanityQuery } from '../hooks/useSanity'
import { SITE_SETTINGS_QUERY } from '../lib/queries'
import { sanityImageUrl } from '../lib/sanity'

function ImgOrPlaceholder({ sanityImg, alt, className, label }) {
  const url = sanityImg ? sanityImageUrl(sanityImg, { width: 800, height: 900 }) : null
  return (
    <div className={`overflow-hidden bg-ardea-gray ${className}`}>
      {url
        ? <img src={url} alt={alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
        : <div className="w-full h-full flex items-center justify-center text-ardea-text-muted text-sm p-4 text-center">{label}</div>
      }
    </div>
  )
}

export default function About() {
  const { lang } = useLang()
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY)

  const addPhoto = lang === 'tr' ? '📷 Site Ayarları\'ndan fotoğraf ekleyin' : '📷 Add photo from Site Settings'

  // Metin alanları: Sanity'de varsa onu kullan, yoksa translations.js fallback
  const p1 = tr(settings?.aboutP1, lang) || tr(t.about.p1, lang)
  const p2 = tr(settings?.aboutP2, lang) || tr(t.about.p2, lang)
  const p3 = tr(settings?.aboutP3, lang) || tr(t.about.p3, lang)
  const atelierText = tr(settings?.aboutAtelierText, lang) || tr(t.about.atelierText, lang)

  // Teknikler: Sanity'de liste varsa onu kullan, yoksa translations.js
  const techniques = (Array.isArray(settings?.aboutTechniques) && settings.aboutTechniques.length > 0)
    ? settings.aboutTechniques.map(item => tr(item, lang)).filter(Boolean)
    : tr(t.about.techniques, lang)

  return (
    <main className="pt-28 pb-24">
      {/* Hero block */}
      <div className="bg-ardea-bej py-20 px-6 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">{tr(t.about.label, lang)}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ardea-text leading-tight mt-2">
            {tr(t.about.title, lang)}
          </h1>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-24">
          <div className="lg:col-span-3 space-y-6 text-ardea-text-soft leading-relaxed text-lg">
            <p>{p1}</p>
            <div className="w-12 h-px bg-ardea-cobalt" />
            <p>{p2}</p>
            <p>{p3}</p>
          </div>

          <div className="lg:col-span-2 relative">
            <ImgOrPlaceholder
              sanityImg={settings?.portraitImage}
              alt="Sanatçı"
              className="aspect-[3/4]"
              label={addPhoto}
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-ardea-cobalt/20 -z-10" />
          </div>
        </div>

        {/* Studio + Techniques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="font-serif text-2xl text-ardea-text mb-4">{tr(t.about.atelierTitle, lang)}</h2>
            <div className="w-8 h-px bg-ardea-brown mb-6" />
            <ImgOrPlaceholder
              sanityImg={settings?.atelierImage}
              alt="Atölye"
              className="aspect-video mb-6"
              label={addPhoto}
            />
            <p className="text-ardea-text-soft leading-relaxed">{atelierText}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-ardea-text mb-4">{tr(t.about.techniqueTitle, lang)}</h2>
            <div className="w-8 h-px bg-ardea-brown mb-6" />
            <ul className="space-y-4">
              {techniques.map((tech, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 w-6 h-6 rounded-full bg-ardea-cobalt-pale border border-ardea-cobalt/20 flex items-center justify-center shrink-0">
                    <span className="text-ardea-cobalt text-xs font-medium">{i + 1}</span>
                  </span>
                  <span className="text-ardea-text-soft">{tech}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ImgOrPlaceholder
                sanityImg={settings?.processImage}
                alt="Üretim süreci"
                className="aspect-video"
                label={addPhoto}
              />
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="bg-ardea-bej p-12 text-center">
          <h3 className="font-serif text-2xl text-ardea-text mb-4">
            {lang === 'tr' ? 'Birlikte Bir Şey Yaratalım' : "Let's Create Something Together"}
          </h3>
          <p className="text-ardea-text-soft mb-8 max-w-md mx-auto">
            {lang === 'tr'
              ? 'Özel sipariş, workshop talebi veya işbirliği için kapım her zaman açık.'
              : 'My door is always open for custom orders, workshop requests, or collaborations.'}
          </p>
          <Link to="/contact" className="btn-primary">
            {lang === 'tr' ? 'İletişime Geç' : 'Get in Touch'}
          </Link>
        </div>
      </div>
    </main>
  )
}
