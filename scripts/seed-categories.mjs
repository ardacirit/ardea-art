import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'uanm61w5',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

const categories = [
  {
    _type: 'category',
    title: { tr: 'Çini', en: 'Tile Art' },
    slug: { _type: 'slug', current: 'tile' },
    emoji: '🔵',
    order: 1,
  },
  {
    _type: 'category',
    title: { tr: 'Ekolojik Baskı', en: 'Botanical Print' },
    slug: { _type: 'slug', current: 'botanical' },
    emoji: '🌿',
    order: 2,
  },
  {
    _type: 'category',
    title: { tr: 'Doğal Boyama', en: 'Natural Dye' },
    slug: { _type: 'slug', current: 'natural-dye' },
    emoji: '🎨',
    order: 3,
  },
  {
    _type: 'category',
    title: { tr: 'Seramik Boyama', en: 'Ceramic Painting' },
    slug: { _type: 'slug', current: 'ceramic' },
    emoji: '🏺',
    order: 4,
  },
]

async function seed() {
  // Check if categories already exist
  const existing = await client.fetch(`*[_type == "category"]{ slug }`)
  const existingSlugs = new Set(existing.map(c => c.slug?.current))

  for (const cat of categories) {
    if (existingSlugs.has(cat.slug.current)) {
      console.log(`⏭️  Zaten var: ${cat.slug.current}`)
      continue
    }
    const result = await client.create(cat)
    console.log(`✅ Eklendi: ${cat.title.tr} (${result._id})`)
  }
  console.log('\n🎉 Tüm kategoriler hazır!')
}

seed().catch(err => {
  console.error('Hata:', err.message)
  process.exit(1)
})
