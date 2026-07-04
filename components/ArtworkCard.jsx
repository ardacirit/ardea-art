import Link from 'next/link'
import SanityImage from './SanityImage'
import { ui, localized, formatPrice } from '@/lib/i18n'
import { artworkAlt } from '@/lib/image'

export default function ArtworkCard({
  artwork,
  lang,
  priority = false,
  aspect = 'aspect-[4/5]',
  sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
}) {
  const title = localized(artwork.title, lang)
  const category = localized(artwork.category?.title, lang)
  const price = formatPrice(artwork.price, lang)

  return (
    <Link
      href={`/${lang}/artwork/${artwork.slug.current}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
    >
      <div className={`relative overflow-hidden bg-bone ${aspect}`}>
        <SanityImage
          image={artwork.image}
          alt={artworkAlt(artwork, lang)}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {artwork.sold && (
          <span className="absolute left-4 top-4 bg-coral px-3 py-1 text-[0.65rem] uppercase tracking-kicker text-white">
            {localized(ui.artwork.sold, lang)}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-cobalt">
            {title}
          </h3>
          <p className="mt-1 text-[0.7rem] uppercase tracking-kicker text-faint">
            {category}
            {artwork.year ? ` · ${artwork.year}` : ''}
          </p>
        </div>
        {price && !artwork.sold && (
          <p className="shrink-0 text-sm text-smoke">{price}</p>
        )}
      </div>
    </Link>
  )
}
