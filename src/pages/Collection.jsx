import { useState } from 'react'
import ArtworkCard from '../components/ArtworkCard'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { artworks as staticArtworks, categories } from '../data/collections'
import { useSanityQuery } from '../hooks/useSanity'
import { ARTWORKS_QUERY } from '../lib/queries'
import { sanityImageUrl } from '../lib/sanity'

const SANITY_CONFIGURED =
  import.meta.env.VITE_SANITY_PROJECT_ID &&
  import.meta.env.VITE_SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID'

/** Normalise a Sanity artwork record into the shape ArtworkCard expects */
function normalizeSanityArtwork(item) {
  return {
    id: item._id,
    category: item.category,
    placeholder: sanityImageUrl(item.image, { width: 600, height: 600 }),
    title: item.title ?? {},
    desc: item.description ?? {},
    price: item.price ? `₺${item.price.toLocaleString('tr-TR')}` : '',
    shopierUrl: item.shopierUrl || '#',
    featured: item.featured ?? false,
    sold: item.sold ?? false,
  }
}

export default function Collection() {
  const { lang } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const { data: sanityData, loading, error } = useSanityQuery(
    SANITY_CONFIGURED ? ARTWORKS_QUERY : null
  )

  const artworkList = (() => {
    if (SANITY_CONFIGURED && !loading && Array.isArray(sanityData)) {
      return sanityData.map(normalizeSanityArtwork)
    }
    return []
  })()

  const filtered = activeFilter === 'all'
    ? artworkList
    : artworkList.filter(a => a.category === activeFilter)

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

      {/* Loading state */}
      {SANITY_CONFIGURED && loading && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-ardea-gray animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-serif text-2xl text-ardea-text-soft mb-3">
                {lang === 'tr' ? 'Henüz eser eklenmedi.' : 'No works added yet.'}
              </p>
              <p className="text-ardea-text-muted text-sm">
                {lang === 'tr'
                  ? 'Eserler yakında burada olacak.'
                  : 'Works will appear here soon.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(artwork => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          )}
        </div>
      )}

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
