import Link from 'next/link'
import { ui, localized } from '@/lib/i18n'
import { instagramUrl } from '@/lib/seo'

export default function Footer({ lang, categories = [], settings }) {
  const year = new Date().getFullYear()
  const whatsapp = (settings?.whatsappNumber || '905345983646').replace(/\D/g, '')

  const links = [
    { href: `/${lang}`, label: localized(ui.nav.home, lang) },
    { href: `/${lang}/collection`, label: localized(ui.nav.collection, lang) },
    { href: `/${lang}/blog`, label: localized(ui.nav.blog, lang) },
    { href: `/${lang}/about`, label: localized(ui.nav.about, lang) },
    { href: `/${lang}/contact`, label: localized(ui.nav.contact, lang) },
  ]

  return (
    <footer className="border-t border-line bg-bone">
      <div className="mx-auto max-w-site px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-ink">Zerrin Cirit</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-smoke">
              {localized(settings?.footerTagline, lang) ||
                localized(ui.footer.tagline, lang)}
            </p>
          </div>

          <nav aria-label={localized(ui.footer.explore, lang)}>
            <p className="text-[0.65rem] uppercase tracking-kicker text-faint">
              {localized(ui.footer.explore, lang)}
            </p>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-smoke transition-colors hover:text-cobalt"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={localized(ui.footer.collections, lang)}>
            <p className="text-[0.65rem] uppercase tracking-kicker text-faint">
              {localized(ui.footer.collections, lang)}
            </p>
            <ul className="mt-4 space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/${lang}/collection/${category.slug.current}`}
                    className="text-sm text-smoke transition-colors hover:text-cobalt"
                  >
                    {localized(category.title, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.65rem] uppercase tracking-kicker text-faint">
              {localized(ui.footer.follow, lang)}
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={instagramUrl(settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-smoke transition-colors hover:text-cobalt"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-smoke transition-colors hover:text-cobalt"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          {localized(settings?.footerQuote, lang) && (
            <p className="font-display italic text-smoke">
              “{localized(settings.footerQuote, lang)}”
            </p>
          )}
          <p className="text-xs text-faint">
            © {year} Zerrin Cirit — {localized(ui.footer.rights, lang)}
          </p>
        </div>
      </div>
    </footer>
  )
}
