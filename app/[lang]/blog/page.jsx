import Link from 'next/link'

import SanityImage from '@/components/SanityImage'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'

import { ui, localized, formatDate } from '@/lib/i18n'
import { getBlogPosts } from '@/lib/queries'
import { absUrl, languageAlternates, breadcrumbJsonLd, metaDescription } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { lang } = await params
  return {
    title: localized(ui.blog.title, lang),
    description: metaDescription(localized(ui.blog.subtitle, lang)),
    alternates: {
      canonical: absUrl(`/${lang}/blog`),
      languages: languageAlternates('/blog'),
    },
  }
}

export default async function BlogPage({ params }) {
  const { lang } = await params
  const posts = await getBlogPosts()
  const [first, ...rest] = posts

  return (
    <div className="mx-auto max-w-site px-6 pb-24 pt-36 lg:px-10">
      <Reveal>
        <p className="kicker">{localized(ui.blog.kicker, lang)}</p>
        <h1 className="section-title mt-4">{localized(ui.blog.title, lang)}</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-smoke">
          {localized(ui.blog.subtitle, lang)}
        </p>
      </Reveal>

      {!first && <p className="mt-16 text-smoke">{localized(ui.blog.empty, lang)}</p>}

      {first && (
        <Reveal delay={100} className="mt-14">
          <Link
            href={`/${lang}/blog/${first.slug.current}`}
            className="group grid gap-8 border-b border-line pb-14 md:grid-cols-2 md:items-center"
          >
            {first.coverImage && (
              <div className="relative aspect-[3/2] overflow-hidden bg-bone">
                <SanityImage
                  image={first.coverImage}
                  alt={localized(first.title, lang)}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-kicker text-faint">
                {formatDate(first.publishedAt, lang)}
                {first.readingTime
                  ? ` · ${first.readingTime} ${localized(ui.blog.minRead, lang)}`
                  : ''}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-snug text-ink transition-colors group-hover:text-cobalt">
                {localized(first.title, lang)}
              </h2>
              {localized(first.excerpt, lang) && (
                <p className="mt-4 leading-relaxed text-smoke">
                  {localized(first.excerpt, lang)}
                </p>
              )}
              <p className="nav-link mt-6 inline-block text-xs uppercase tracking-kicker text-cobalt">
                {localized(ui.blog.readMore, lang)} →
              </p>
            </div>
          </Link>
        </Reveal>
      )}

      {rest.length > 0 && (
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post._id} delay={(index % 3) * 80}>
              <Link href={`/${lang}/blog/${post.slug.current}`} className="group block">
                {post.coverImage && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-bone">
                    <SanityImage
                      image={post.coverImage}
                      alt={localized(post.title, lang)}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <p className="mt-5 text-xs uppercase tracking-kicker text-faint">
                  {formatDate(post.publishedAt, lang)}
                  {post.readingTime
                    ? ` · ${post.readingTime} ${localized(ui.blog.minRead, lang)}`
                    : ''}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug text-ink transition-colors group-hover:text-cobalt">
                  {localized(post.title, lang)}
                </h3>
                {localized(post.excerpt, lang) && (
                  <p className="mt-3 text-sm leading-relaxed text-smoke [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                    {localized(post.excerpt, lang)}
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
          { name: localized(ui.blog.title, lang), url: absUrl(`/${lang}/blog`) },
        ])}
      />
    </div>
  )
}
