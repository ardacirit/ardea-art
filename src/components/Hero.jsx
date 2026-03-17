import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

// Each slide: a background image (or placeholder gradient) + an overlay color
const slides = [
  {
    bg: '/images/hero/hero-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=85',
    accent: 'from-ardea-cobalt/30',
  },
  {
    bg: '/images/hero/hero-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=85',
    accent: 'from-ardea-brown/30',
  },
  {
    bg: '/images/hero/hero-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&q=85',
    accent: 'from-black/30',
  },
]

export default function Hero() {
  const { lang } = useLang()
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((idx) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 600)
  }, [])

  // Auto-advance every 6 s
  useEffect(() => {
    const id = setInterval(() => {
      go((current + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [current, go])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <img
          src={slide.fallback}
          alt=""
          className="w-full h-full object-cover scale-105 animate-[slow-zoom_8s_ease-in-out_forwards]"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} to-black/50`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <div
          className={`max-w-xl transition-all duration-700 ${
            transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-white/70 text-xs tracking-[0.25em] uppercase mb-6">
            Ardea Art
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight whitespace-pre-line mb-6 drop-shadow-sm">
            {tr(t.hero.tagline, lang)}
          </h1>
          <div className="w-12 h-px bg-white/60 mb-6" />
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-10">
            {tr(t.hero.sub, lang)}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/collection" className="btn-primary">
              {tr(t.hero.cta, lang)}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/60 text-white text-sm font-medium tracking-wide
                         transition-all duration-300 hover:bg-white/10"
            >
              {tr(t.hero.ctaAbout, lang)}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10 hidden md:flex">
        <div className="w-px h-12 bg-white/30 animate-pulse" />
        <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase rotate-90 origin-center mt-2">
          Scroll
        </span>
      </div>
    </section>
  )
}
