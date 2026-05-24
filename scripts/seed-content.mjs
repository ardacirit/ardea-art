/**
 * seed-content.mjs
 * Sanity'ye placeholder içerik ekler:
 * - siteSettings (hero slaytlar, fotoğraflar, metinler)
 * - Kategoriler (zaten var olabilir, upsert yapılır)
 * - 6 örnek eser
 * Annem daha sonra Sanity panelinden bunları silebilir/değiştirebilir.
 */

import { createClient } from '@sanity/client'
import https from 'https'
import http from 'http'

const PROJECT_ID = 'uanm61w5'
const DATASET = 'production'
const TOKEN = 'skcMRO6YVex4gUHFeb8PK6kaY81nknhlZKNZj2zdL1zSBrSoagxRBY8fLaNelLSV6lufS6z1aE2EjYKlf'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Unsplash - çini/seramik/sanat stüdyosu temalı görseller
// Her birinin boyutu ~1200px, tamamen ücretsiz ve ticari kullanıma uygun
// &fm=jpg zorla JPEG formatı → Sanity'nin kabul ettiği format
const IMAGES = {
  hero1:    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80&fm=jpg', // çini desen
  hero2:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&fm=jpg', // seramik çalışması
  hero3:    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80&fm=jpg', // sanat stüdyo
  portrait: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&fm=jpg',  // sanatçı portre
  atelier:  'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80&fm=jpg',  // atölye
  process:  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80&fm=jpg',  // üretim
  teaser:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=jpg',     // ana sayfa teaser
  art1:     'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fm=jpg',  // eser 1
  art2:     'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80&fm=jpg',  // eser 2
  art3:     'https://images.unsplash.com/photo-1516900557549-41557d405adf?w=600&q=80&fm=jpg',  // eser 3
  art4:     'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&fm=jpg',  // eser 4
  art5:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fm=jpg',     // eser 5
  art6:     'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&q=80&fm=jpg',  // eser 6
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadImage(url, label) {
  console.log(`  ↑ Yükleniyor: ${label}`)
  const buf = await fetchBuffer(url)
  const asset = await client.assets.upload('image', buf, {
    filename: `${label}.jpg`,
    contentType: 'image/jpeg',
  })
  console.log(`  ✓ ${label} → ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, hotspot: { _type: 'sanity.imageHotspot', x: 0.5, y: 0.5, height: 0.5, width: 0.5 } }
}

async function main() {
  console.log('\n🎨 Ardea Art — Sanity İçerik Seed Başlıyor\n')

  // ── 1. Görselleri yükle ───────────────────────────────────────
  console.log('📸 Görseller yükleniyor...')
  const imgs = {}
  for (const [key, url] of Object.entries(IMAGES)) {
    imgs[key] = await uploadImage(url, key)
  }

  // ── 2. Kategorileri oluştur / güncelle ───────────────────────
  console.log('\n📂 Kategoriler kontrol ediliyor...')
  const catDefs = [
    { id: 'cat-cini',      slug: 'cini',      emoji: '🔵', tr: 'Çini',      en: 'Tile Art' },
    { id: 'cat-botanik',   slug: 'botanik',   emoji: '🌿', tr: 'Botanik',   en: 'Botanical' },
    { id: 'cat-ebru',      slug: 'ebru',      emoji: '🌊', tr: 'Ebru',      en: 'Marbling' },
    { id: 'cat-seramik',   slug: 'seramik',   emoji: '🏺', tr: 'Seramik',   en: 'Ceramic' },
  ]
  const catRefs = {}
  for (const c of catDefs) {
    const existing = await client.fetch(`*[_type == "category" && slug.current == $s][0]._id`, { s: c.slug })
    if (existing) {
      catRefs[c.id] = existing
      console.log(`  ✓ Var: ${c.tr} (${existing})`)
    } else {
      const doc = await client.create({
        _id: c.id,
        _type: 'category',
        title: { tr: c.tr, en: c.en },
        slug: { _type: 'slug', current: c.slug },
        emoji: c.emoji,
      })
      catRefs[c.id] = doc._id
      console.log(`  + Oluşturuldu: ${c.tr} (${doc._id})`)
    }
  }

  // ── 3. siteSettings güncelle ─────────────────────────────────
  console.log('\n⚙️  Site Ayarları güncelleniyor...')
  const settingsId = await client.fetch(`*[_type == "siteSettings"][0]._id`)
  if (!settingsId) {
    console.error('❌ siteSettings dökümanı bulunamadı! Önce Sanity panelinden bir kez kaydedin.')
    process.exit(1)
  }

  await client
    .patch(settingsId)
    .set({
      portraitImage:   imgs.portrait,
      atelierImage:    imgs.atelier,
      processImage:    imgs.process,
      homeTeaserImage: imgs.teaser,
      heroSlides: [
        {
          _key: 'slide-1',
          image: imgs.hero1,
          tagline:  { tr: 'Toprağın Ruhu,\nElin İzleri', en: 'The Soul of Clay,\nTraces of Hands' },
          subtitle: { tr: 'El yapımı çini ve seramik eserler — her biri sabahın sessizliğinde doğar.', en: 'Handcrafted tile and ceramic works — each born in the quiet of morning.' },
        },
        {
          _key: 'slide-2',
          image: imgs.hero2,
          tagline:  { tr: 'Gelenekten\nGelen Güzellik', en: 'Beauty From\nTradition' },
          subtitle: { tr: 'Yüzyıllık Türk çini sanatını çağdaş bir dille yeniden yorumluyorum.', en: 'Reinterpreting centuries of Turkish tile art through a contemporary voice.' },
        },
        {
          _key: 'slide-3',
          image: imgs.hero3,
          tagline:  { tr: 'Her Eser\nBir Hikâye', en: 'Every Piece\nTells a Story' },
          subtitle: { tr: 'Sipariş, koleksiyon veya hediye — hayalinizi birlikte şekillendirelim.', en: 'Commission, collect, or gift — let\'s shape your vision together.' },
        },
      ],
    })
    .commit()
  console.log('  ✓ siteSettings güncellendi')

  // ── 4. Örnek eserler oluştur ──────────────────────────────────
  console.log('\n🖼️  Örnek eserler oluşturuluyor...')
  const artworks = [
    {
      _id: 'artwork-1',
      title: { tr: 'Lale Çini Tablosu', en: 'Tulip Tile Panel' },
      description: { tr: 'Geleneksel Osmanlı lale motifi ile işlenmiş, el boyaması çini. 30×30 cm.', en: 'Hand-painted tile featuring a traditional Ottoman tulip motif. 30×30 cm.' },
      image: imgs.art1, category: catRefs['cat-cini'], price: 2800, featured: true, sold: false, order: 1,
    },
    {
      _id: 'artwork-2',
      title: { tr: 'Botanik Serisi No.3', en: 'Botanical Series No.3' },
      description: { tr: 'Kurutulmuş otlardan esinlenilen organik formlar. 20×30 cm çini üzerine.', en: 'Organic forms inspired by dried herbs. On tile, 20×30 cm.' },
      image: imgs.art2, category: catRefs['cat-botanik'], price: 1950, featured: true, sold: false, order: 2,
    },
    {
      _id: 'artwork-3',
      title: { tr: 'Ebru Desen Kase', en: 'Marbled Bowl' },
      description: { tr: 'Ebru tekniğiyle renklendirilen el yapımı seramik kase. Çap 18 cm.', en: 'Handmade ceramic bowl coloured with marbling technique. Diameter 18 cm.' },
      image: imgs.art3, category: catRefs['cat-ebru'], price: 1200, featured: true, sold: false, order: 3,
    },
    {
      _id: 'artwork-4',
      title: { tr: 'Çini Vazo', en: 'Tile-Glazed Vase' },
      description: { tr: 'Kobalt mavi sır ile kaplı, boyun kısmında hatai motifi. Yükseklik 25 cm.', en: 'Glazed in cobalt blue with a hatai motif around the neck. Height 25 cm.' },
      image: imgs.art4, category: catRefs['cat-seramik'], price: 3400, featured: true, sold: false, order: 4,
    },
    {
      _id: 'artwork-5',
      title: { tr: 'Güneş Çarkı Tablosu', en: 'Sun Wheel Panel' },
      description: { tr: 'Selçuklu güneş motifinden ilham alan, altın vurgu detaylı çini tablo.', en: 'Tile panel inspired by Seljuk sun motifs with gold accent details.' },
      image: imgs.art5, category: catRefs['cat-cini'], price: 4200, featured: true, sold: false, order: 5,
    },
    {
      _id: 'artwork-6',
      title: { tr: 'Botanik Kupa Seti', en: 'Botanical Mug Set' },
      description: { tr: 'İkili seramik kupa seti. Her kupa farklı otsu bitki deseniyle el boyaması.', en: 'Set of two ceramic mugs. Each hand-painted with a different botanical motif.' },
      image: imgs.art6, category: catRefs['cat-botanik'], price: 980, featured: false, sold: false, order: 6,
    },
  ]

  for (const a of artworks) {
    const { _id, ...fields } = a
    try {
      await client.createOrReplace({ _id, _type: 'artwork', ...fields })
      console.log(`  ✓ ${fields.title.tr}`)
    } catch (e) {
      console.error(`  ✗ ${fields.title.tr}: ${e.message}`)
    }
  }

  console.log('\n✅ Tamamlandı! Sanity panelini yenile.\n')
}

main().catch(e => { console.error('HATA:', e); process.exit(1) })
