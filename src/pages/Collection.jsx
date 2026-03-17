import { useState } from 'react'
import ArtworkCard from '../components/ArtworkCard'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { artworks, categories } from '../data/collections'

export default function Collection() {
  const { lang } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeFilter)

  return (
    <main className="pt-28 pb-24">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <p className="section-label">{tr(t.collection.label, lang)}</p>
        <h1 className="section-title">{tr(t.collection.title, lang)}</h1>
        <div className="divider" />
        <p className="section-subtitle">{tr(t.collection.subtitle, lang)}</p>
      </div>

      {/* Filter bar */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200
                ${activeFilter === cat
                  ? 'bg-ardea-cobalt text-white'
                  : 'bg-ardea-bej text-ardea-text-soft hover:bg-ardea-gray hover:text-ardea-text'
                }`}
            >
              {tr(t.collection.filter[cat], lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-ardea-text-muted font-serif text-lg">
            {lang === 'tr' ? 'Bu kategoride henüz eser yok.' : 'No works in this category yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>

      {/* Shopier note */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-10 border-t border-ardea-gray">
        <p className="text-ardea-text-muted text-sm text-center">
          {lang === 'tr'
            ? 'Tüm satışlar Shopier güvencesiyle gerçekleştirilmektedir. Özel sipariş için '
            : 'All sales are processed through Shopier. For custom orders, '}
          <a href="/contact" className="text-ardea-cobalt underline underline-offset-2">
            {lang === 'tr' ? 'iletişime geçin.' : 'contact us.'}
          </a>
        </p>
      </div>
    </main>
  )
}
