import Link from 'next/link'
import { ui, localized } from '@/lib/i18n'

/** Filter tabs generated from Sanity categories — a new category appears here
 *  (and in nav + footer + sitemap) automatically. `active` is a slug or null. */
export default function CategoryChips({ lang, categories = [], active = null }) {
  const base = `/${lang}/collection`
  const chipClass = (isActive) =>
    `rounded-full border px-5 py-2 text-xs uppercase tracking-kicker transition-colors duration-300 ${
      isActive
        ? 'border-cobalt bg-cobalt text-porcelain'
        : 'border-line text-smoke hover:border-cobalt hover:text-cobalt'
    }`

  return (
    <nav aria-label={localized(ui.footer.collections, lang)} className="flex flex-wrap gap-3">
      <Link href={base} className={chipClass(active === null)}>
        {localized(ui.collection.all, lang)}
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`${base}/${category.slug.current}`}
          className={chipClass(active === category.slug.current)}
        >
          {localized(category.title, lang)}
        </Link>
      ))}
    </nav>
  )
}
