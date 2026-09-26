import { PortableText } from '@portabletext/react'
import SanityImage from './SanityImage'

const components = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl text-ink sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl text-ink sm:text-2xl">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 leading-loose text-smoke">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-cobalt pl-6 font-display text-xl italic leading-relaxed text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-smoke">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-smoke">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const external = /^https?:\/\//.test(value?.href || '')
      return (
        <a
          href={value?.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-cobalt underline underline-offset-4 transition-colors hover:text-cobalt-deep"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => (
      <figure className="mt-10">
        <SanityImage
          image={value}
          alt={value?.alt || ''}
          intrinsic
          sizes="(min-width: 768px) 42rem, 100vw"
          className="w-full"
        />
        {value?.caption && (
          <figcaption className="mt-3 text-center text-sm text-faint">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

const isEmptyBlock = (block) =>
  block?._type === 'block' && !block.children?.some((child) => child.text?.trim())

export default function PortableTextRenderer({ value }) {
  if (!Array.isArray(value)) return null
  // Stray Enter presses at the start/end of a post render as blank gaps;
  // empty lines *between* paragraphs are left as the author typed them.
  let start = 0
  let end = value.length
  while (start < end && isEmptyBlock(value[start])) start++
  while (end > start && isEmptyBlock(value[end - 1])) end--
  return <PortableText value={value.slice(start, end)} components={components} />
}
