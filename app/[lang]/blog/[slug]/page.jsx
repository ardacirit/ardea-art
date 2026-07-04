import Link from 'next/link'
import { notFound } from 'next/navigation'

import SanityImage from '@/components/SanityImage'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import JsonLd from '@/components/JsonLd'

import { ui, localized, formatDate } from '@/lib/i18n'
import { getBlogPost, getAllSlugs } from '@/lib/queries'
import { ogImageUrl } from '@/lib/image'
import {
  absUrl,
  languageAlternates,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  metaDescription,
} from '@/lib/seo'

export const revalidate = 60

export async function generateStaticParams() {
  const { posts } = await getAllSlugs()
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  const og = ogImageUrl(post.coverImage)
  return {
    title: localized(post.title, lang),
    description: metaDescription(localized(post.excerpt, lang)),
    alternates: {
      canonical: absUrl(`/${lang}/blog/${slug}`),
      languages: languageAlternates(`/blog/${slug}`),
    },
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { lang, slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const title = localized(post.title, lang)
  const content = post.content?.[lang] || post.content?.tr

  return (
    <article className="px-6 pb-24 pt-36">
      <header className="mx-auto max-w-prose text-center">
        <p className="text-xs uppercase tracking-kicker text-faint">
          {formatDate(post.publishedAt, lang)}
          {post.readingTime
            ? ` · ${post.readingTime} ${localized(ui.blog.minRead, lang)}`
            : ''}
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {localized(post.excerpt, lang) && (
          <p className="mt-6 font-display text-lg italic leading-relaxed text-smoke">
            {localized(post.excerpt, lang)}
          </p>
        )}
      </header>

      {post.coverImage && (
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-bone">
            <SanityImage
              image={post.coverImage}
              alt={title}
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-prose">
        <PortableTextRenderer value={content} />

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href={`/${lang}/blog`}
            className="nav-link text-xs uppercase tracking-kicker text-cobalt"
          >
            ← {localized(ui.blog.back, lang)}
          </Link>
        </div>
      </div>

      <JsonLd
        data={[
          blogPostingJsonLd(post, lang),
          breadcrumbJsonLd([
            { name: localized(ui.nav.home, lang), url: absUrl(`/${lang}`) },
            { name: localized(ui.blog.title, lang), url: absUrl(`/${lang}/blog`) },
            { name: title, url: absUrl(`/${lang}/blog/${slug}`) },
          ]),
        ]}
      />
    </article>
  )
}
