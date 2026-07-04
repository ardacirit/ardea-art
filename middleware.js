import { NextResponse } from 'next/server'

const LOCALES = ['tr', 'en']
const DEFAULT_LOCALE = 'tr'

/**
 * Every page lives under /tr or /en. Anything else (including the bare root)
 * is permanently redirected into the default Turkish tree, keeping URLs
 * deterministic for crawlers; hreflang tags point language variants at each
 * other.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension
  // (fonts, favicon, sitemap.xml, robots.txt …)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
