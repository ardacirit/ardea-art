'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Artwork photo gallery with a full-screen lightbox.
 * `photos`: [{ src, alt, position }] — src is a full Sanity CDN URL, resizing
 * is handled by the global next/image loader.
 */
export default function ArtworkGallery({ photos = [] }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const next = useCallback(
    () => setActive((current) => (current + 1) % photos.length),
    [photos.length]
  )
  const prev = useCallback(
    () => setActive((current) => (current - 1 + photos.length) % photos.length),
    [photos.length]
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, next, prev])

  if (photos.length === 0) return null
  const current = photos[active]

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-bone"
        aria-label={current.alt}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt || ''}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="animate-fade-in object-cover"
          style={{ objectPosition: current.position }}
        />
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-porcelain/85 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${index + 1} / ${photos.length}`}
              aria-current={index === active ? 'true' : undefined}
              className={`relative aspect-square overflow-hidden bg-bone transition-opacity ${
                index === active
                  ? 'ring-1 ring-cobalt ring-offset-2 ring-offset-porcelain'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="10vw"
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
        >
          <img
            src={current.src}
            alt={current.alt || ''}
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  prev()
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:left-6"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  next()
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:right-6"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-kicker text-white/70">
                {active + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
