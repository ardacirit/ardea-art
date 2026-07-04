import Image from 'next/image'
import { urlFor, imageDimensions, hotspotPosition } from '@/lib/image'

/**
 * Renders a Sanity image through next/image. Two modes:
 *  - fill (default): parent controls the aspect ratio; the image covers it and
 *    keeps the editor's hotspot as the focal point.
 *  - intrinsic: pass `intrinsic` to render at the asset's natural ratio.
 */
export default function SanityImage({
  image,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
  quality,
  intrinsic = false,
}) {
  if (!image?.asset) return null
  const src = urlFor(image).url()

  if (intrinsic) {
    const { width, height } = imageDimensions(image)
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt || ''}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      style={{ objectPosition: hotspotPosition(image) }}
      priority={priority}
      quality={quality}
    />
  )
}
