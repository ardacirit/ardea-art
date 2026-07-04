import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name: 'zerrin-cirit',
  title: 'Zerrin Cirit — Yönetim Paneli',
  projectId: process.env.SANITY_PROJECT_ID || 'uanm61w5',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Yönetim Paneli')
          .items([
            S.listItem()
              .title('⚙️ Site Ayarları')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('🖼️ Eserler')
              .child(
                S.documentTypeList('artwork')
                  .title('Eserler')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.listItem()
              .title('📂 Kategoriler')
              .child(
                S.documentTypeList('category')
                  .title('Kategoriler')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('✍️ Blog Yazıları')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Yazıları')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
