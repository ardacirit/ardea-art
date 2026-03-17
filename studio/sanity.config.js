import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name: 'ardea-art',
  title: 'Ardea Art — Yönetim Paneli',
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
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('🖼️ Eserler')
              .child(S.documentTypeList('artwork').title('Eserler')),
            S.listItem()
              .title('📂 Kategoriler')
              .child(S.documentTypeList('category').title('Kategoriler')),
            S.divider(),
            S.listItem()
              .title('✍️ Blog Yazıları')
              .child(S.documentTypeList('blogPost').title('Blog Yazıları')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
