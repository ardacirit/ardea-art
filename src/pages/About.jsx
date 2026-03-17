import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

export default function About() {
  const { lang } = useLang()
  const techniques = tr(t.about.techniques, lang)

  return (
    <main className="pt-28 pb-24">
      {/* ── Hero block ────────────────────────────────────── */}
      <div className="bg-ardea-bej py-20 px-6 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">{tr(t.about.label, lang)}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ardea-text leading-tight mt-2">
            {tr(t.about.title, lang)}
          </h1>
        </div>
      </div>

      {/* ── Story ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-24">
          {/* Text */}
          <div className="lg:col-span-3 space-y-6 text-ardea-text-soft leading-relaxed text-lg">
            <p>{tr(t.about.p1, lang)}</p>
            <div className="w-12 h-px bg-ardea-cobalt" />
            <p>{tr(t.about.p2, lang)}</p>
            <p>{tr(t.about.p3, lang)}</p>
          </div>

          {/* Portrait + decoration */}
          <div className="lg:col-span-2 relative">
            <div className="aspect-[3/4] overflow-hidden bg-ardea-gray">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80"
                alt="Sanatçı"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-ardea-cobalt/20 -z-10" />
          </div>
        </div>

        {/* ── Studio + Techniques ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* Atelier */}
          <div>
            <h2 className="font-serif text-2xl text-ardea-text mb-4">
              {tr(t.about.atelierTitle, lang)}
            </h2>
            <div className="w-8 h-px bg-ardea-brown mb-6" />
            <div className="aspect-video overflow-hidden bg-ardea-gray mb-6">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Atölye"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-ardea-text-soft leading-relaxed">
              {tr(t.about.atelierText, lang)}
            </p>
          </div>

          {/* Techniques */}
          <div>
            <h2 className="font-serif text-2xl text-ardea-text mb-4">
              {tr(t.about.techniqueTitle, lang)}
            </h2>
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

            {/* Process image */}
            <div className="mt-8 aspect-video overflow-hidden bg-ardea-gray">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                alt="Üretim süreci"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── CTA strip ─────────────────────────────────── */}
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
