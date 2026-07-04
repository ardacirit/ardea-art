'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES } from '@/lib/i18n'

export default function LanguageSwitcher({ lang, className = '' }) {
  const pathname = usePathname() || `/${lang}`

  function pathFor(locale) {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/') || `/${locale}`
  }

  return (
    <div className={`flex items-center gap-1 text-xs tracking-kicker ${className}`}>
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-faint">/</span>}
          <Link
            href={pathFor(locale)}
            aria-current={locale === lang ? 'true' : undefined}
            className={
              locale === lang
                ? 'font-semibold text-cobalt'
                : 'text-smoke transition-colors hover:text-ink'
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}
