import { useParams, Link, Navigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { blogPosts } from '../data/blogPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const { lang } = useLang()

  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const content = tr(post.content, lang)

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
          {tr(post.category, lang)}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ardea-text leading-tight mb-4">
          {tr(post.title, lang)}
        </h1>
        <div className="flex items-center gap-4 text-ardea-text-muted text-sm mb-8">
          <span>
            {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </span>
          <span>·</span>
          <span>{post.readingTime} {tr(t.blog.minRead, lang)}</span>
        </div>

        {/* Hero image */}
        <div className="aspect-[16/9] overflow-hidden mb-12 bg-ardea-gray">
          <img
            src={post.placeholder}
            alt={tr(post.title, lang)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article content — rendered as Markdown-like prose */}
        <article className="prose-ardea">
          <MarkdownContent content={content} />
        </article>

        {/* Divider + back */}
        <div className="mt-16 pt-8 border-t border-ardea-gray flex items-center justify-between">
          <Link
            to="/blog"
            className="btn-ghost"
          >
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
 * Very lightweight markdown renderer for headings, bold, and paragraphs.
 * Replace with react-markdown if you add more complex content.
 */
function MarkdownContent({ content }) {
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
  // Bold **text**
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-semibold text-ardea-text">{part}</strong>
      : part
  )
}
