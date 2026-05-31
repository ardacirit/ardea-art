import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { useSanityQuery } from '../hooks/useSanity'
import { ARTWORK_BY_SLUG_QUERY } from '../lib/queries'
import { sanityImageUrl, urlFor } from '../lib/sanity'

export default function ArtworkDetail() {
  const { slug } = useParams()
  const { lang } = useLang()
  const [activeImg, setActiveImg] = useState(0)

  const { data: artwork, loading } = useSanityQuery(
    ARTWORK_BY_SLUG_QUERY,
    { slug }
  )

  if (loading) {
    return (
      <main className="pt-28 pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-ardea-gray animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-ardea-gray animate-pulse w-3/4" />
              <div className="h-4 bg-ardea-gray animate-pulse w-1/2" />
              <div className="h-24 bg-ardea-gray animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!artwork) {
    return (
      <main className="pt-28 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-ardea-text-soft mb-4">
            {lang === 'tr' ? 'Eser bulunamadı.' : 'Artwork not found.'}
          </p>
          <Link to="/collection" className="text-ardea-cobalt underline underline-offset-2">
            {lang === 'tr' ? '← Koleksiyona Dön' : '← Back to Collection'}
          </Link>
        </div>
      </main>
    )
  }

  // Tüm fotoğraflar: ana fotoğraf + ek fotoğraflar
  const allImages = [
    artwork.image,
    ...(artwork.images || []),
  ].filter(Boolean)

  const activeImageUrl = allImages[activeImg]
    ? urlFor(allImages[activeImg]).width(1200).height(1200).auto('format').url()
    : null

  const waNumber = '905XXXXXXXXX'
  const waMsg = lang === 'tr'
    ? `Merhaba! "${tr(artwork.title, lang)}" eseri hakkında bilgi almak istiyorum.`
    : `Hello! I'd like to inquire about "${tr(artwork.title, lang)}".`

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-ardea-text-soft">
          <Link to="/collection" className="hover:text-ardea-cobalt transition-colors">
            {lang === 'tr' ? '← Koleksiyon' : '← Collection'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ardea-text">{tr(artwork.title, lang)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Sol — Fotoğraf Galerisi */}
          <div>
            {/* Ana fotoğraf */}
            <div className="aspect-square overflow-hidden bg-ardea-gray mb-3">
              {activeImageUrl && (
                <img
                  src={activeImageUrl}
                  alt={tr(artwork.title, lang)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Thumbnail'lar — sadece birden fazla fotoğraf varsa */}
            {allImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((img, i) => {
                  const thumbUrl = urlFor(img).width(200).height(200).auto('format').url()
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 overflow-hidden border-2 transition-all duration-200 flex-shrink-0
                        ${activeImg === i ? 'border-ardea-cobalt' : 'border-transparent hover:border-ardea-gray'}`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`${tr(artwork.title, lang)} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sağ — Detaylar */}
          <div className="flex flex-col">
            {/* Kategori etiketi */}
            <p className="text-xs tracking-[0.2em] uppercase text-ardea-text-soft mb-3">
              {artwork.category?.emoji ? `${artwork.category.emoji} ` : ''}
              {tr(artwork.category?.title, lang)}
            </p>

            {/* Başlık */}
            <h1 className="font-serif text-3xl md:text-4xl text-ardea-text leading-tight mb-4">
              {tr(artwork.title, lang)}
            </h1>

            {/* Açıklama */}
            {artwork.description && (
              <p className="text-ardea-text-soft text-base leading-relaxed mb-6 border-l-2 border-ardea-cobalt pl-4">
                {tr(artwork.description, lang)}
              </p>
            )}

            {/* Fiyat */}
            {artwork.price && (
              <p className="text-2xl font-medium text-ardea-text mb-8">
                ₺{artwork.price.toLocaleString('tr-TR')}
              </p>
            )}

            {/* Satıldı */}
            {artwork.sold && (
              <div className="inline-flex items-center gap-2 bg-ardea-gray px-4 py-2 mb-6 self-start">
                <span className="w-2 h-2 rounded-full bg-ardea-text-soft" />
                <span className="text-sm text-ardea-text-soft tracking-wide uppercase">
                  {tr(t.collection.sold, lang)}
                </span>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              {!artwork.sold && artwork.shopierUrl && artwork.shopierUrl !== '#' && (
                <a
                  href={artwork.shopierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-ardea-cobalt text-white
                             px-6 py-3 text-sm font-medium tracking-wide
                             hover:bg-ardea-cobalt/90 transition-colors duration-200"
                >
                  {tr(t.collection.shopierBtn, lang)}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2
                           border border-ardea-text text-ardea-text
                           px-6 py-3 text-sm font-medium tracking-wide
                           hover:bg-ardea-text hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.847L.057 23.5l5.816-1.525A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.453.905.921-3.36-.24-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                {tr(t.collection.inquireBtn, lang)}
              </a>
            </div>

            {/* Shopier notu */}
            {!artwork.sold && (
              <p className="text-xs text-ardea-text-muted mt-4">
                {lang === 'tr'
                  ? 'Satın alma işlemi Shopier güvencesiyle gerçekleştirilmektedir.'
                  : 'Purchase is processed securely through Shopier.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
