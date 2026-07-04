import { fileURLToPath } from 'node:url'
import path from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  images: {
    // All artwork photography is served by Sanity's image CDN, which does the
    // resizing itself — see lib/sanity-image-loader.js.
    loader: 'custom',
    loaderFile: './lib/sanity-image-loader.js',
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
