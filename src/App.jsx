import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useSanityQuery } from './hooks/useSanity'
import { SITE_SETTINGS_QUERY } from './lib/queries'
import { urlFor } from './lib/sanity'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function SiteMeta() {
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY)

  useEffect(() => {
    // Sayfa başlığı
    if (settings?.siteTitle) {
      document.title = settings.siteTitle
    }
    // Favicon
    if (settings?.favicon) {
      const faviconUrl = urlFor(settings.favicon).width(64).height(64).format('png').url()
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.type = 'image/png'
      link.href = faviconUrl
    }
  }, [settings])

  return null
}

function AppInner() {
  const { lang } = useLang()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <SiteMeta />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/collection"   element={<Collection />} />
        <Route path="/blog"         element={<Blog />} />
        <Route path="/blog/:slug"   element={<BlogPost />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton lang={lang} />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
