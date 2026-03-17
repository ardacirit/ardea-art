import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

// ── Replace with real handles ──────────────────────────────────────────────────
const WHATSAPP_NUMBER = '905XXXXXXXXX'   // international format, no +
const INSTAGRAM_HANDLE = 'ardea.art'
// ──────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()

  const navLinks = [
    { to: '/',           label: tr(t.nav.home, lang) },
    { to: '/collection', label: tr(t.nav.collection, lang) },
    { to: '/blog',       label: tr(t.nav.blog, lang) },
    { to: '/about',      label: tr(t.nav.about, lang) },
    { to: '/contact',    label: tr(t.nav.contact, lang) },
  ]

  return (
    <footer className="bg-ardea-text text-white/80">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-2">Ardea Art</p>
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              El Yapımı · Handcrafted
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              {tr(t.footer.tagline, lang)}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/40 mb-5">
              {tr(t.footer.links, lang)}
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-white/60 hover:text-ardea-cobalt-light transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/40 mb-5">
              {tr(t.footer.follow, lang)}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-ardea-cobalt-light transition-colors duration-200"
              >
                <InstagramIcon />
                @{INSTAGRAM_HANDLE}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-ardea-cobalt-light transition-colors duration-200"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {year} Ardea Art. {tr(t.footer.rights, lang)}
          </p>
          <p className="text-xs text-white/20 italic font-serif">
            "Yavaş sanat, derin iz bırakır."
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M2 22l1.5-5.5A9 9 0 1 1 7.5 20.5L2 22z" />
    </svg>
  )
}
