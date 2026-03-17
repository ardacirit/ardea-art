import { useParams, Link, Navigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { blogPosts as staticBlogPosts } from '../data/blogPosts'
import { useSanityQuery } from '../hooks/useSanity'
import { BLOG_POST_BY_SLUG_QUERY } from '../lib/queries'
import { sanityImageUrl } from '../lib/sanity'

const SANITY_CONFIGURED =
  import.meta.env.VITE_SANITY_PROJECT_ID &&
  import.meta.env.VITE_SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID'

export default function BlogPost() {
  const { slug } = useParams()
  const { lang } = useLang()

  const { data: sanityPost, loading } = useSanityQuery(
    SANITY_CONFIGURED ? BLOG_POST_BY_SLUG_QUERY : null,
    { slug }
  )

  // While Sanity is loading, show a skeleton
  if (SANITY_CONFIGURED && loading) {
    return (
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-6 animate-pulse">
          <div className="h-4 w-24 bg-ardea-gray" />
          <div className="h-8 w-3/4 bg-ardea-gray" />
          <div className="h-4 w-1/3 bg-ardea-gray" />
          <div className="aspect-[16/9] bg-ardea-gray" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-ardea-gray" />
            ))}
          </div>
        </div>
      </main>
    )
  }

  // Resolve post: prefer Sanity result, fall back to static data
  const post = (() => {
    if (SANITY_CONFIGURED && sanityPost) {
      return {
        id: sanityPost._id,
        slug: sanityPost.slug?.current ?? slug,
        category: sanityPost.category ?? '',
        date: sanityPost.publishedAt ?? '',
        readingTime: sanityPost.readingTime ?? 5,
        placeholder: sanityImageUrl(sanityPost.coverImage, { width: 1200, height: 675 }),
        title: sanityPost.title ?? {},
        excerpt: sanityPost.excerpt ?? {},
        // content is a localizedBlock (array of PortableText blocks per lang)
        content: sanityPost.content ?? null,
        isSanity: true,
      }
    }
    return staticBlogPosts.find(p => p.slug === slug) ?? null
  })()

  if (!post) return <Navigate to="/blog" replace />

  const categoryLabel = typeof post.category === 'object'
    ? tr(post.category, lang)
    : post.category

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-ardea-text-muted text-sm hover:text-ardea-cobalt transition-colors duration-200 mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          {tr(t.blog.backBlog, lang)}
        </Link>

        {/* Post header */}
        <p className="text-ardea-brown text-xs tracking-widest uppercase mb-3">
          {categoryLabel}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ardea-text leading-tight mb-4">
          {tr(post.title, lang)}
        </h1>
        <div className="flex items-center gap-4 text-ardea-text-muted text-sm mb-8">
          {post.date && (
            <span>
              {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          )}
          <span>·</span>
          <span>{post.readingTime} {tr(t.blog.minRead, lang)}</span>
        </div>

        {/* Hero image */}
        {post.placeholder && (
          <div className="aspect-[16/9] overflow-hidden mb-12 bg-ardea-gray">
            <img
              src={post.placeholder}
              alt={tr(post.title, lang)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article content */}
        <article className="prose-ardea">
          {post.isSanity
            ? <PortableTextContent blocks={post.content?.[lang] ?? post.content?.tr ?? []} />
            : <MarkdownContent content={tr(post.content, lang)} />
          }
        </article>

        {/* Divider + back */}
        <div className="mt-16 pt-8 border-t border-ardea-gray flex items-center justify-between">
          <Link to="/blog" className="btn-ghost">
            {tr(t.blog.backBlog, lang)}
          </Link>
          <Link to="/contact" className="btn-primary text-sm">
            {lang === 'tr' ? 'İletişime Geç' : 'Get in Touch'}
          </Link>
        </div>
      </div>
    </main>
  )
}

/**
 * Minimal PortableText renderer for Sanity block content.
 * Handles paragraphs, headings (h1–h4), lists, and inline marks (strong, em).
 * For richer needs, replace with @portabletext/react.
 */
function PortableTextContent({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="space-y-4 text-ardea-text-soft leading-relaxed">
      {blocks.map((block, i) => {
        if (block._type === 'image') {
          const imgUrl = sanityImageUrl(block, { width: 900, height: 600 })
          return imgUrl ? (
            <figure key={block._key ?? i} className="my-8">
              <img src={imgUrl} alt="" className="w-full object-cover" loading="lazy" />
            </figure>
          ) : null
        }

        if (block._type !== 'block') return null

        const children = (block.children ?? []).map((span, j) => {
          const marks = span.marks ?? []
          let node = span.text
          if (marks.includes('strong')) node = <strong key={j} className="font-semibold text-ardea-text">{node}</strong>
          if (marks.includes('em')) node = <em key={j}>{node}</em>
          return node
        })

        switch (block.style) {
          case 'h1':
            return <h1 key={block._key ?? i} className="font-serif text-3xl text-ardea-text mt-12 mb-6 leading-snug">{children}</h1>
          case 'h2':
            return <h2 key={block._key ?? i} className="font-serif text-2xl text-ardea-text mt-10 mb-4 leading-snug">{children}</h2>
          case 'h3':
            return <h3 key={block._key ?? i} className="font-serif text-xl text-ardea-text mt-8 mb-3 leading-snug">{children}</h3>
          case 'h4':
            return <h4 key={block._key ?? i} className="font-serif text-lg text-ardea-text mt-6 mb-2 leading-snug">{children}</h4>
          case 'blockquote':
            return <blockquote key={block._key ?? i} className="pl-4 border-l-4 border-ardea-cobalt italic text-ardea-text-soft my-6">{children}</blockquote>
          default:
            if (block.listItem === 'bullet') {
              return <li key={block._key ?? i} className="ml-6 list-disc text-ardea-text-soft">{children}</li>
            }
            if (block.listItem === 'number') {
              return <li key={block._key ?? i} className="ml-6 list-decimal text-ardea-text-soft">{children}</li>
            }
            return <p key={block._key ?? i} className="text-ardea-text-soft leading-relaxed">{children}</p>
        }
      })}
    </div>
  )
}

/**
 * Very lightweight markdown renderer for headings, bold, and paragraphs.
 * Used as the fallback for static blog post data.
 */
function MarkdownContent({ content }) {
  if (!content) return null
  const lines = content.trim().split('\n')

  return (
    <div className="space-y-4 text-ardea-text-soft leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="font-serif text-2xl text-ardea-text mt-10 mb-4 leading-snug">
              {trimmed.slice(3)}
            </h2>
          )
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={i} className="font-serif text-3xl text-ardea-text mt-12 mb-6 leading-snug">
              {trimmed.slice(2)}
            </h1>
          )
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <li key={i} className="ml-6 list-disc text-ardea-text-soft">
              {renderInline(trimmed.slice(2))}
            </li>
          )
        }
        if (/^\d+\./.test(trimmed)) {
          return (
            <li key={i} className="ml-6 list-decimal text-ardea-text-soft">
              {renderInline(trimmed.replace(/^\d+\.\s*/, ''))}
            </li>
          )
        }
        return (
          <p key={i} className="text-ardea-text-soft leading-relaxed">
            {renderInline(trimmed)}
          </p>
        )
      })}
    </div>
  )
}

function renderInline(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-semibold text-ardea-text">{part}</strong>
      : part
  )
}
