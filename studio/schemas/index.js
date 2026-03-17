import { artwork } from './artwork.js'
import { blogPost } from './blogPost.js'
import { siteSettings } from './siteSettings.js'
import { localizedString, localizedText, localizedBlock } from './localized.js'

export const schemaTypes = [
  // Helpers
  localizedString,
  localizedText,
  localizedBlock,
  // Documents
  siteSettings,
  artwork,
  blogPost,
]
