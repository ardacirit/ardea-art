import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { urlFor } from '../lib/sanity'

const CATEGORIES = [
  { key: 'tile',      color: '#0047AB', tr: 'Çini',          en: 'Tile Art' },
  { key: 'botanical', color: '#1B9AAA', tr: 'Ekolojik Baskı', en: 'Botanical' },
  { key: 'natural',   color: '#8B6F47', tr: 'Doğal Boyama',  en: 'Natural Dye' },
  { key: 'ceramic',   color: '#C5462F', tr: 'Seramik',        en: 'Ceramic' },
]

export default function Hero({ settings }) {
  const { lang } = useLang()

  // Featured image from Sanity settings (portrait/square preferred)
  const heroImage = settings?.heroSlides?.[0]?.image || settings?.portraitImage || null
  const imgUrl = heroImage ? urlFor(heroImage).width(900).height(1100).auto('format').url() : null

  const subtitle = lang === 'tr'
    ? 'El yapımı çini, ekolojik baskı ve doğal boyama — Bergama\'nın toprağından gelen yavaş sanat.'
    : 'Handcrafted tile art, botanical printing and natural dyeing — slow art from the earth of Bergama.'

  return (
    <section className="hero-split overflow-hidden">

      {/* ── Left — Typography ─────────────────────────────── */}
      <div className="hero-split-left flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 bg-ardea-white relative">

        {/* Kicker */}
        <p className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-ardea-brown mb-8 font-medium">
          <span className="w-10 h-px bg-ardea-brown opacity-50" />
          Zerrin Cirit · {lang === 'tr' ? 'El Yapımı Sanat' : 'Handcrafted Art'}
        </p>

        {/* Headline */}
        {lang === 'tr' ? (
          <h1 className="font-serif font-normal text-ardea-text leading-[1.08] tracking-[-0.015em] mb-0"
              style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)' }}>
            Toprağın{' '}
            <span className="text-ardea-cobalt">rengini</span>
            <br />
            <em>ellerimle</em>
            <br />
            şekillendiriyorum.
          </h1>
        ) : (
          <h1 className="font-serif font-normal text-ardea-text leading-[1.08] tracking-[-0.015em] mb-0"
              style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)' }}>
            I shape the{' '}
            <span className="text-ardea-cobalt">colour</span>
            <br />
            of the earth{' '}
            <em>with my hands.</em>
          </h1>
        )}

        {/* Rule */}
        <div className="w-12 h-px bg-ardea-brown mt-8 mb-6" />

        {/* Subtitle */}
        <p className="text-ardea-text-soft font-light leading-relaxed max-w-[38ch]"
           style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-10">
          <Link to="/collection" className="btn-primary">
            {tr(t.hero.cta, lang)}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link to="/about" className="btn-dark">
            {tr(t.hero.ctaAbout, lang)}
          </Link>
        </div>

        {/* Category dots */}
        <div className="flex flex-wrap gap-5 mt-10 md:mt-auto md:pt-12">
          {CATEGORIES.map(cat => (
            <span key={cat.key} className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-ardea-text-muted">
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: cat.color }} />
              {lang === 'tr' ? cat.tr : cat.en}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right — Image ──────────────────────────────────── */}
      <div className="hero-split-right relative bg-ardea-bej overflow-hidden">
        {/* Vertical rule */}
        <div className="absolute left-0 top-[22%] bottom-[22%] w-px bg-ardea-gray z-10 hidden md:block" />

        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Zerrin Cirit"
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          /* Placeholder — shown until real photos are added to Sanity */
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-ardea-bej">
            <span className="font-serif font-light text-ardea-brown-light opacity-40"
                  style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              ZC
            </span>
            <span className="text-[10px] tracking-[0.18em] uppercase text-ardea-text-muted">
              {lang === 'tr' ? 'Fotoğraf yakında' : 'Photo coming soon'}
            </span>
            {/* Inner frame */}
            <div className="absolute inset-4 border border-ardea-cobalt/15 pointer-events-none" />
          </div>
        )}

        {/* Caption card */}
        <div className="absolute right-5 bottom-5 bg-ardea-white/88 backdrop-blur-sm px-4 py-3 text-right hidden md:block"
             style={{ backdropFilter: 'blur(4px)' }}>
          <p className="font-serif text-ardea-text" style={{ fontSize: '1.1rem' }}>Zerrin Cirit</p>
          <p className="text-[10px] tracking-[0.1em] uppercase text-ardea-text-muted mt-1">
            {lang === 'tr' ? 'Bergama · İzmir' : 'Bergama · İzmir'}
          </p>
        </div>
      </div>
    </section>
  )
}
