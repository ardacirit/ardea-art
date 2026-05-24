/**
 * seed-blog.mjs
 * Sanity'ye 3 blog yazısı + kalan boş siteSettings alanlarını ekler
 */

import { createClient } from '@sanity/client'
import https from 'https'
import http from 'http'

const client = createClient({
  projectId: 'uanm61w5',
  dataset: 'production',
  token: 'skcMRO6YVex4gUHFeb8PK6kaY81nknhlZKNZj2zdL1zSBrSoagxRBY8fLaNelLSV6lufS6z1aE2EjYKlf',
  apiVersion: '2024-01-01',
  useCdn: false,
})

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
  console.log(`  ↑ ${label}`)
  const buf = await fetchBuffer(url)
  const asset = await client.assets.upload('image', buf, {
    filename: `${label}.jpg`,
    contentType: 'image/jpeg',
  })
  console.log(`  ✓ ${label} → ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  console.log('\n📝 Blog yazıları & eksik içerik ekleniyor...\n')

  // ── Blog kapak görselleri ─────────────────────────────────────
  console.log('📸 Blog görselleri yükleniyor...')
  const blog1img = await uploadImage('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80&fm=jpg', 'blog-cini')
  const blog2img = await uploadImage('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=jpg', 'blog-seramik')
  const blog3img = await uploadImage('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&fm=jpg', 'blog-atolye')

  // ── Blog yazıları ─────────────────────────────────────────────
  console.log('\n📄 Blog yazıları oluşturuluyor...')

  const posts = [
    {
      _id: 'blog-cini-tarihi',
      _type: 'blogPost',
      title: { tr: 'Çini Sanatının 700 Yıllık Hikâyesi', en: 'The 700-Year Story of Turkish Tile Art' },
      slug: { _type: 'slug', current: 'cini-sanatinin-700-yillik-hikayesi' },
      category: { tr: 'Sanat Tarihi', en: 'Art History' },
      publishedAt: '2026-03-10T09:00:00Z',
      readingTime: 6,
      excerpt: {
        tr: 'Selçuklulardan Osmanlılara, çini sanatının nasıl evirildiğini ve bu kadim geleneğin bugün benim atölyemde nasıl yaşadığını keşfedin.',
        en: 'From the Seljuks to the Ottomans — discover how tile art evolved over centuries and how this ancient tradition lives on in my studio today.',
      },
      coverImage: blog1img,
      content: [
        {
          _type: 'block', _key: 'b1', style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: 'Çini sanatı, Anadolu\'nun kalbinde yüzyıllardır atıyor. 13. yüzyılda Selçuklu medreselerinin duvarlarını süsleyen geometrik desenlerden, Osmanlı döneminin lale ve karanfil motifleriyle bezenmiş İznik çinilerine uzanan bu yolculuk, sadece bir sanat tarihi değil; bir medeniyetin kendini ifade biçimidir.', marks: [] }],
          markDefs: [],
        },
        {
          _type: 'block', _key: 'b2', style: 'normal',
          children: [{ _type: 'span', _key: 's2', text: 'Benim atölyemde her sabah bir sır fırına girerken, bu uzun zincirin bir halkası olduğumu düşünüyorum. Pişirme sıcaklıkları değişmiş olabilir, pigmentler farklılaşmış olabilir — ama ellerin çamurla kurduğu o derin ilişki hiç değişmedi.', marks: [] }],
          markDefs: [],
        },
      ],
    },
    {
      _id: 'blog-dogal-boyama',
      _type: 'blogPost',
      title: { tr: 'Doğal Boyalarla Seramik: Toprağın Renkleri', en: 'Natural Dye Ceramics: Colours of the Earth' },
      slug: { _type: 'slug', current: 'dogal-boyalarla-seramik' },
      category: { tr: 'Teknik', en: 'Technique' },
      publishedAt: '2026-02-24T09:00:00Z',
      readingTime: 5,
      excerpt: {
        tr: 'Kimyasal boyaların yerini doğal pigmentlere bırakma kararı nasıl geldi? Atölyemde kullandığım bitkisel ve mineral bazlı boyaların sırlarını paylaşıyorum.',
        en: 'How did I decide to replace chemical dyes with natural pigments? I share the secrets of the plant-based and mineral dyes I use in my studio.',
      },
      coverImage: blog2img,
      content: [
        {
          _type: 'block', _key: 'b1', style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: 'Beş yıl önce, piyasadaki hazır seramik boyalarının içerik listesine bakarken bir şey fark ettim: ürettiğim "doğal" eserlerin altında yatan kimyasallar, doğayla hiç de barışık değildi. O gün atölyemde küçük bir devrim başladı.', marks: [] }],
          markDefs: [],
        },
        {
          _type: 'block', _key: 'b2', style: 'normal',
          children: [{ _type: 'span', _key: 's2', text: 'Demir oksit toprak tonları, bakır oksit yeşilleri, manganez esmer ve siyahları — bu mineraller binlerce yıldır çomlek ustalarının elinin altında. Şimdi ben de bu kadim paleti kullanıyorum; biraz daha yavaş, biraz daha az öngörülebilir, ama çok daha canlı.', marks: [] }],
          markDefs: [],
        },
      ],
    },
    {
      _id: 'blog-yavaş-sanat',
      _type: 'blogPost',
      title: { tr: 'Yavaş Sanat: Acele Etmeyen El', en: 'Slow Art: The Unhurried Hand' },
      slug: { _type: 'slug', current: 'yavas-sanat-acele-etmeyen-el' },
      category: { tr: 'Felsefe', en: 'Philosophy' },
      publishedAt: '2026-02-10T09:00:00Z',
      readingTime: 4,
      excerpt: {
        tr: '"Yavaş sanat" benim için sadece bir estetik tercih değil, bir yaşam biçimi. Sabah serinliğinde atölyeye oturmak, pişirmeyi beklemek, hatayı kabullenmek — hepsinin ayrı bir güzelliği var.',
        en: '"Slow art" for me is not just an aesthetic preference but a way of life. Sitting in the studio in the cool of morning, waiting for the kiln, accepting the mistake — each has its own beauty.',
      },
      coverImage: blog3img,
      content: [
        {
          _type: 'block', _key: 'b1', style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: 'Bir çini tablosunun tamamlanması ortalama iki hafta sürer benim atölyemde. Tasarım, transfer, boya, pişirme, soğuma — her adımı aceleye getirmek mümkün değil. Fırın kendi zamanında soğur; siz ne kadar isterse isteyin.', marks: [] }],
          markDefs: [],
        },
        {
          _type: 'block', _key: 'b2', style: 'normal',
          children: [{ _type: 'span', _key: 's2', text: 'Bu yavaşlık başta can sıkıcıydı. Sonra bir şeyi fark ettim: en güzel eserler, acelesiyle değil, dinginliğiyle yapılanlardı. Fırından çıkan her parçada, o sabahların sessizliği işlenmiş gibi.', marks: [] }],
          markDefs: [],
        },
      ],
    },
  ]

  for (const post of posts) {
    try {
      await client.createOrReplace(post)
      console.log(`  ✓ ${post.title.tr}`)
    } catch (e) {
      console.error(`  ✗ ${post.title.tr}: ${e.message}`)
    }
  }

  // ── siteSettings — eksik alanları doldur ─────────────────────
  console.log('\n⚙️  siteSettings eksik alanlar dolduruluyor...')
  const settingsId = await client.fetch(`*[_type == "siteSettings"][0]._id`)

  await client.patch(settingsId).set({
    // About metinleri
    aboutP2: {
      tr: 'Atölyemi kurduğumda tek bir tezgâh ve birkaç fırça vardı. Bugün, küçük ama derli toplu bu odada geleneksel Türk çini tekniklerini modern formlarla buluşturuyorum. Kobalt mavi hâlâ en sevdiğim renk — ama toprak tonları da giderek daha çok yerini buluyor paletimde.',
      en: 'When I set up my studio, I had one worktable and a few brushes. Today, in this small but tidy room, I bring traditional Turkish tile techniques together with modern forms. Cobalt blue is still my favourite colour — but earth tones are finding their place in my palette too.',
    },
    aboutP3: {
      tr: '"Yavaş sanat" benim için sadece bir estetik tercih değil, bir yaşam biçimi. Her eser iki haftadan az sürmez: tasarım, transfer, boya, pişirme. Fırın kendi zamanında soğur. Bu yavaşlığı sevmeyi öğrenince, acelesiyle yapılan hiçbir şeyin gerçek güzelliğe ulaşamayacağını anladım.',
      en: '"Slow art" is not merely an aesthetic preference for me — it is a way of life. No piece takes less than two weeks: design, transfer, paint, kiln. The kiln cools in its own time. Once I learned to love this slowness, I understood that nothing made in haste can reach true beauty.',
    },
    aboutAtelierText: {
      tr: 'Atölyem İstanbul\'un köklü semtlerinden birinde, sessiz bir sokak üzerinde. Sabah güneşi içeri vurduğunda, her fırça darbesi biraz daha net görünür. Ziyaret için lütfen önceden iletişime geçin.',
      en: 'My studio sits on a quiet street in one of Istanbul\'s historic neighbourhoods. When the morning sun pours in, every brushstroke looks a little clearer. Please get in touch in advance for a visit.',
    },
    // Hakkımda CTA
    contactSubtitle: {
      tr: 'Özel sipariş, işbirliği ya da sadece sanat hakkında konuşmak için bana ulaşabilirsiniz. Her mesaj kişisel olarak yanıtlanır.',
      en: 'Reach out for custom orders, collaborations, or simply to talk about art. Every message is answered personally.',
    },
    // Özel sipariş kutusu
    customOrderText: {
      tr: 'Boyut, renk veya motif konusunda özelleştirilmiş eserler için WhatsApp\'tan yazabilirsiniz. Her sipariş öncesinde ücretsiz bir ön görüşme yapıyorum.',
      en: 'For works customised in size, colour or pattern, reach out via WhatsApp. I offer a complimentary consultation before every commission.',
    },
    // Footer
    footerQuote: {
      tr: '"Yavaş sanat, derin iz bırakır."',
      en: '"Slow art leaves a lasting mark."',
    },
    // Featured section
    featuredTitle: {
      tr: 'Seçme Eserler',
      en: 'Selected Works',
    },
    featuredSubtitle: {
      tr: 'Her biri el yapımı, her biri sabırla işlenmiş. Koleksiyondan öne çıkan eserler.',
      en: 'Each one handmade, each one worked with patience. Featured pieces from the collection.',
    },
    // Hero fallback (slaytlar için)
    heroTagline: {
      tr: 'Toprağın Ruhu,\nElin İzleri',
      en: 'The Soul of Clay,\nTraces of Hands',
    },
    heroSubtitle: {
      tr: 'El yapımı çini ve seramik eserler — her biri sabahın sessizliğinde doğar.',
      en: 'Handcrafted tile and ceramic works — each born in the quiet of morning.',
    },
  }).commit()

  console.log('  ✓ siteSettings güncellendi')
  console.log('\n✅ Tamamlandı!\n')
  console.log('Artık sitede şunlar var:')
  console.log('  🖼️  3 hero slayt (görsel + başlık)')
  console.log('  📷  Portre, atölye, süreç, teaser fotoğrafları')
  console.log('  🎨  6 eser (5\'i öne çıkan)')
  console.log('  📝  3 blog yazısı')
  console.log('  ✍️  Tüm metin alanları dolu\n')
}

main().catch(e => { console.error('HATA:', e.message); process.exit(1) })
