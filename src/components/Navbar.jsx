import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { lang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/',           label: tr(t.nav.home, lang) },
    { to: '/collection', label: tr(t.nav.collection, lang) },
    { to: '/blog',       label: tr(t.nav.blog, lang) },
    { to: '/about',      label: tr(t.nav.about, lang) },
    { to: '/contact',    label: tr(t.nav.contact, lang) },
  ]

  return (
    <>
      {/* ── Desktop Navbar ─────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500
          ${scrolled
            ? 'bg-ardea-white/95 backdrop-blur-sm shadow-sm py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-serif text-xl text-ardea-text tracking-wide group-hover:text-ardea-cobalt transition-colors duration-200">
              Ardea Art
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-ardea-text-muted mt-0.5">
              El Yapımı Sanat
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-px bg-ardea-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-ardea-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-ardea-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ──────────────────────────── */}
      <div
        className={`fixed inset-0 z-30 bg-ardea-white flex flex-col justify-center items-center
          transition-all duration-500 md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-serif text-2xl text-ardea-text transition-all duration-300 hover:text-ardea-cobalt
                 ${isActive ? 'text-ardea-cobalt' : ''}
                 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`
              }
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  )
}
