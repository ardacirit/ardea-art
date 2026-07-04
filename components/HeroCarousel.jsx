'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Full-bleed hero imagery. One slide → static with a slow cinematic zoom;
 * several slides → gentle crossfade every 6 seconds with dot navigation.
 * `slides`: [{ src, alt, position }]
 */
export default function HeroCarousel({ slides = [] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6000
    )
    return () => clearInterval(id)
  }, [slides.length])

  if (slides.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={index === 0 ? slide.alt || '' : ''}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority={index === 0}
            className={`object-cover ${index === active ? 'animate-slow-zoom' : ''}`}
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${index + 1} / ${slides.length}`}
              aria-current={index === active ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active ? 'w-6 bg-porcelain' : 'w-1.5 bg-porcelain/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
