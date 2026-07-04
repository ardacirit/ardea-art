'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { ui, localized } from '@/lib/i18n'

export default function Navbar({ lang, categories = [], instagram }) {
  const pathname = usePathname() || ''
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the overlay on route change and lock body scroll while open
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: `/${lang}/collection`, label: localized(ui.nav.collection, lang) },
    { href: `/${lang}/blog`, label: localized(ui.nav.blog, lang) },
    { href: `/${lang}/about`, label: localized(ui.nav.about, lang) },
    { href: `/${lang}/contact`, label: localized(ui.nav.contact, lang) },
  ]

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled || open
          ? 'border-line bg-porcelain/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-site items-center justify-between px-6 lg:px-10">
        <Link href={`/${lang}`} className="group leading-none" aria-label="Zerrin Cirit">
          <span className="block font-display text-[1.35rem] tracking-wide text-ink">
            Zerrin Cirit
          </span>
          <span className="mt-1 block text-[0.6rem] uppercase tracking-kicker text-cobalt">
            {localized(ui.hero.kicker, lang)}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${
                isActive(link.href) ? 'nav-link-active text-ink' : 'text-smoke hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher lang={lang} />
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={localized(open ? ui.nav.close : ui.nav.menu, lang)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? 'translate-y-[3px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              open ? '-translate-y-[3px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-porcelain transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2 px-8 py-10" aria-label="Mobile">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${index * 40}ms` }}
              className={`border-b border-line py-4 font-display text-3xl transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${isActive(link.href) ? 'text-cobalt' : 'text-ink'}`}
            >
              {link.label}
            </Link>
          ))}

          {categories.length > 0 && (
            <div className="mt-8">
              <p className="text-[0.65rem] uppercase tracking-kicker text-faint">
                {localized(ui.footer.collections, lang)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/${lang}/collection/${category.slug.current}`}
                    className="rounded-full border border-line px-4 py-2 text-sm text-smoke"
                  >
                    {localized(category.title, lang)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            <LanguageSwitcher lang={lang} />
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-smoke underline underline-offset-4"
              >
                Instagram
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
