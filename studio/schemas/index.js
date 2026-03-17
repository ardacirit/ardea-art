import { artwork } from './artwork.js'
import { blogPost } from './blogPost.js'
import { siteSettings } from './siteSettings.js'
import { localizedString, localizedText, localizedBlock } from './localized.js'
import { category } from './category.js'

export const schemaTypes = [
  // Helpers
  localizedString,
  localizedText,
  localizedBlock,
  // Documents
  siteSettings,
  category,
  artwork,
  blogPost,
]
