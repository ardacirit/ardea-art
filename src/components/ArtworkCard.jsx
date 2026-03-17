import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

export default function ArtworkCard({ artwork, showShopier = true }) {
  const { lang } = useLang()

  return (
    <article className="artwork-card group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-ardea-gray aspect-square">
        <img
          src={artwork.placeholder}
          alt={tr(artwork.title, lang)}
          className="artwork-card-img"
          loading="lazy"
        />
        {/* Sold badge */}
        {artwork.sold && (
          <div className="absolute top-3 left-3 bg-ardea-text text-white text-[10px] tracking-widest uppercase px-2 py-1">
            {tr(t.collection.sold, lang)}
          </div>
        )}
        {/* Category pill */}
        <div className="absolute top-3 right-3 bg-white/90 text-ardea-text-soft text-[10px] tracking-widest uppercase px-2 py-1">
          {artwork.categoryEmoji ? `${artwork.categoryEmoji} ` : ''}{tr(artwork.categoryTitle, lang)}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ardea-cobalt/0 group-hover:bg-ardea-cobalt/10 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 bg-white border-b border-ardea-gray">
        <h3 className="font-serif text-lg text-ardea-text leading-snug mb-1">
          {tr(artwork.title, lang)}
        </h3>
        <p className="text-ardea-text-soft text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
          {tr(artwork.desc, lang)}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-medium text-ardea-text">
            {artwork.price}
          </span>
          {showShopier && !artwork.sold && (
            <a
              href={artwork.shopierUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ardea-cobalt
                         border border-ardea-cobalt px-3 py-1.5
                         transition-all duration-200 hover:bg-ardea-cobalt hover:text-white"
            >
              {tr(t.collection.shopierBtn, lang)}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
