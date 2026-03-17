import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ArtworkCard from '../components/ArtworkCard'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { useSanityQuery } from '../hooks/useSanity'
import { FEATURED_ARTWORKS_QUERY, BLOG_POSTS_QUERY, SITE_SETTINGS_QUERY } from '../lib/queries'
import { sanityImageUrl } from '../lib/sanity'

function normalizeSanityArtwork(item) {
  return {
    id: item._id,
    category: item.category,
    placeholder: sanityImageUrl(item.image, { width: 600, height: 600 }),
    title: item.title ?? {},
    desc: item.description ?? {},
    price: item.price ? `₺${item.price.toLocaleString('tr-TR')}` : '',
    shopierUrl: item.shopierUrl || '#',
    featured: item.featured ?? false,
    sold: item.sold ?? false,
  }
}

function normalizeSanityPost(item) {
  return {
    id: item._id,
    slug: item.slug?.current ?? '',
    title: item.title ?? {},
    excerpt: item.excerpt ?? {},
    category: item.category ?? '',
    readingTime: item.readingTime ?? 5,
    placeholder: sanityImageUrl(item.coverImage, { width: 400, height: 400 }),
  }
}

export default function Home() {
  const { lang } = useLang()

  const { data: featuredData } = useSanityQuery(FEATURED_ARTWORKS_QUERY)
  const { data: postsData } = useSanityQuery(BLOG_POSTS_QUERY)
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY)

  const featured = Array.isArray(featuredData) ? featuredData.map(normalizeSanityArtwork) : []
  const latestPosts = Array.isArray(postsData) ? postsData.slice(0, 2).map(normalizeSanityPost) : []
  const teaserImgUrl = settings?.homeTeaserImage
    ? sanityImageUrl(settings.homeTeaserImage, { width: 800, height: 1000 })
    : null
  const instagramHandle = settings?.instagramHandle || 'ardea.art'

  return (
    <>
      <Hero />

      {/* ── Featured Works ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <p className="section-label">{tr(t.featured.label, lang)}</p>
              <h2 className="section-title">{tr(t.featured.title, lang)}</h2>
              <div className="divider" />
              <p className="section-subtitle">{tr(t.featured.subtitle, lang)}</p>
            </div>
            <Link to="/collection" className="btn-outline shrink-0">
              {tr(t.featured.viewAll, lang)}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(artwork => <ArtworkCard key={artwork.id} artwork={artwork} />)}
          </div>
        </section>
      )}

      {/* ── Philosophy Strip ───────────────────────────────── */}
      <section className="bg-ardea-bej py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-1 h-16 bg-ardea-cobalt mx-auto mb-8" />
          <blockquote className="font-serif text-2xl md:text-3xl text-ardea-text leading-relaxed italic mb-6">
            {lang === 'tr'
              ? '"Her eser bir sabahın ürünüdür — aceleyle değil, dinginlikle doğar."'
              : '"Every piece is the fruit of a morning — born not in haste, but in stillness."'}
          </blockquote>
          <p className="text-ardea-brown text-sm tracking-widest uppercase">Ardea Art</p>
        </div>
      </section>

      {/* ── About Teaser ───────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-ardea-gray">
              {teaserImgUrl
                ? <img src={teaserImgUrl} alt="Atölye" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                : <div className="w-full h-full flex items-center justify-center text-ardea-text-muted text-sm">{lang === 'tr' ? 'Fotoğraf ekleyin →' : 'Add a photo →'}</div>
              }
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-ardea-cobalt/20 -z-10" />
          </div>
          <div>
            <p className="section-label">{tr(t.about.label, lang)}</p>
            <h2 className="section-title">{tr(t.about.title, lang)}</h2>
            <div className="divider" />
            <p className="text-ardea-text-soft leading-relaxed mb-4">{tr(t.about.p1, lang)}</p>
            <p className="text-ardea-text-soft leading-relaxed mb-8">{tr(t.about.p2, lang)}</p>
            <Link to="/about" className="btn-outline">
              {lang === 'tr' ? 'Hikâyemi Oku' : 'Read My Story'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Blog Posts ──────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="bg-ardea-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
              <div>
                <p className="section-label">{tr(t.blog.label, lang)}</p>
                <h2 className="section-title">{tr(t.blog.title, lang)}</h2>
              </div>
              <Link to="/blog" className="btn-ghost">{lang === 'tr' ? 'Tüm Yazılar →' : 'All Articles →'}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestPosts.map(post => <BlogTeaser key={post.id} post={post} lang={lang} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Instagram CTA ──────────────────────────────────── */}
      <section className="bg-ardea-cobalt py-16 px-6 text-center">
        <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
          {lang === 'tr' ? 'Bizi takip edin' : 'Follow us'}
        </p>
        <h2 className="font-serif text-3xl text-white mb-6">@{instagramHandle}</h2>
        <a
          href={`https://instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/60 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white hover:text-ardea-cobalt"
        >
          Instagram
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </section>
    </>
  )
}

function BlogTeaser({ post, lang }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex gap-6 items-start">
      <div className="w-28 h-28 shrink-0 overflow-hidden bg-ardea-gray">
        {post.placeholder
          ? <img src={post.placeholder} alt={tr(post.title, lang)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          : <div className="w-full h-full bg-ardea-gray" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-ardea-brown text-xs tracking-widest uppercase mb-1">{post.category}</p>
        <h3 className="font-serif text-lg text-ardea-text leading-snug mb-2 group-hover:text-ardea-cobalt transition-colors duration-200">
          {tr(post.title, lang)}
        </h3>
        <p className="text-ardea-text-muted text-xs">{post.readingTime} {tr(t.blog.minRead, lang)}</p>
      </div>
    </Link>
  )
}
