import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { blogPosts as staticBlogPosts } from '../data/blogPosts'
import { useSanityQuery } from '../hooks/useSanity'
import { BLOG_POSTS_QUERY } from '../lib/queries'
import { sanityImageUrl } from '../lib/sanity'

const SANITY_CONFIGURED =
  import.meta.env.VITE_SANITY_PROJECT_ID &&
  import.meta.env.VITE_SANITY_PROJECT_ID !== 'YOUR_PROJECT_ID'

/** Normalise a Sanity blog post into the shape the components expect */
function normalizeSanityPost(item) {
  return {
    id: item._id,
    slug: item.slug?.current ?? '',
    category: item.category ?? '',
    date: item.publishedAt ?? '',
    readingTime: item.readingTime ?? 5,
    placeholder: sanityImageUrl(item.coverImage, { width: 800, height: 600 }),
    title: item.title ?? {},
    excerpt: item.excerpt ?? {},
  }
}

export default function Blog() {
  const { lang } = useLang()

  const { data: sanityData, loading } = useSanityQuery(
    SANITY_CONFIGURED ? BLOG_POSTS_QUERY : null
  )

  const posts = (() => {
    if (SANITY_CONFIGURED && !loading && Array.isArray(sanityData) && sanityData.length > 0) {
      return sanityData.map(normalizeSanityPost)
    }
    return staticBlogPosts
  })()

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="section-label">{tr(t.blog.label, lang)}</p>
          <h1 className="section-title">{tr(t.blog.title, lang)}</h1>
          <div className="divider" />
          <p className="section-subtitle">{tr(t.blog.subtitle, lang)}</p>
        </div>

        {/* Loading state */}
        {SANITY_CONFIGURED && loading && (
          <div className="space-y-8">
            <div className="h-80 bg-ardea-gray animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-ardea-gray animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* Featured post (first) */}
            {posts[0] && <FeaturedPost post={posts[0]} lang={lang} />}

            {/* Post list */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map(post => (
                <PostCard key={post.id} post={post} lang={lang} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function FeaturedPost({ post, lang }) {
  const categoryLabel = typeof post.category === 'object'
    ? tr(post.category, lang)
    : post.category

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-ardea-bej hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
        <img
          src={post.placeholder}
          alt={tr(post.title, lang)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-8 lg:p-12 flex flex-col justify-center">
        <p className="text-ardea-brown text-xs tracking-widest uppercase mb-3">
          {categoryLabel}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-ardea-text leading-snug mb-4 group-hover:text-ardea-cobalt transition-colors duration-200">
          {tr(post.title, lang)}
        </h2>
        <p className="text-ardea-text-soft leading-relaxed mb-6 line-clamp-3">
          {tr(post.excerpt, lang)}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-ardea-text-muted text-xs">
            {post.date && new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="text-ardea-text-muted text-xs">
            {post.readingTime} {tr(t.blog.minRead, lang)}
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-ardea-cobalt text-sm font-medium">
          {tr(t.blog.readMore, lang)}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

function PostCard({ post, lang }) {
  const categoryLabel = typeof post.category === 'object'
    ? tr(post.category, lang)
    : post.category

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={post.placeholder}
          alt={tr(post.title, lang)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex flex-col p-6">
        <p className="text-ardea-brown text-xs tracking-widest uppercase mb-2">
          {categoryLabel}
        </p>
        <h3 className="font-serif text-xl text-ardea-text leading-snug mb-3 flex-1 group-hover:text-ardea-cobalt transition-colors duration-200">
          {tr(post.title, lang)}
        </h3>
        <p className="text-ardea-text-soft text-sm leading-relaxed line-clamp-2 mb-4">
          {tr(post.excerpt, lang)}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-ardea-gray">
          <span className="text-ardea-text-muted text-xs">
            {post.date && new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { month: 'short', year: 'numeric' })}
          </span>
          <span className="text-ardea-text-muted text-xs">
            {post.readingTime} {tr(t.blog.minRead, lang)}
          </span>
        </div>
      </div>
    </Link>
  )
}
