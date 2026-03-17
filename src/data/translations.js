/**
 * translations.js
 * Central i18n file. Replace static strings with CMS calls when integrating
 * Contentful / Sanity / Directus. Each key maps to { tr, en }.
 */

export const t = {
  // ─── Navigation ─────────────────────────────────────────────────────────────
  nav: {
    home:       { tr: 'Ana Sayfa',  en: 'Home' },
    collection: { tr: 'Koleksiyon', en: 'Collection' },
    blog:       { tr: 'Blog',       en: 'Blog' },
    about:      { tr: 'Hakkımda',   en: 'About' },
    contact:    { tr: 'İletişim',   en: 'Contact' },
  },

  // ─── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    tagline: {
      tr: 'Toprağın rengini\nellerimle şekillendiriyorum.',
      en: 'I shape the colour\nof the earth with my hands.',
    },
    sub: {
      tr: 'El yapımı çini, ekolojik baskı ve doğal boyama sanatı.',
      en: 'Handcrafted tile art, botanical printing and natural dyeing.',
    },
    cta:      { tr: 'Koleksiyonu Keşfet', en: 'Explore the Collection' },
    ctaAbout: { tr: 'Hikâyemi Oku',       en: 'Read My Story' },
  },

  // ─── Featured / Home sections ───────────────────────────────────────────────
  featured: {
    label:    { tr: 'Seçkiler',        en: 'Featured Works' },
    title:    { tr: 'Öne Çıkan Eserler', en: 'Selected Pieces' },
    subtitle: {
      tr: 'Her eser, gelenekten ilham alarak çağdaş bir dille yeniden yorumlanmış benzersiz bir hikâye taşır.',
      en: 'Each piece carries a unique story — traditional inspiration reinterpreted in a contemporary voice.',
    },
    viewAll: { tr: 'Tüm Koleksiyonu Gör', en: 'View Full Collection' },
  },

  // ─── Collection page ────────────────────────────────────────────────────────
  collection: {
    label:    { tr: 'Koleksiyon',     en: 'Collection' },
    title:    { tr: 'Tüm Eserler',    en: 'All Works' },
    subtitle: {
      tr: 'Geleneksel çini sanatından ekolojik baskıya, seramik boyamadan doğal boyamaya uzanan geniş bir yelpazede özgün eserler.',
      en: 'Original works spanning traditional tile art, botanical printing, ceramic painting and natural dyeing.',
    },
    filter: {
      all:           { tr: 'Tümü',           en: 'All' },
      tile:          { tr: 'Çini',           en: 'Tile Art' },
      botanical:     { tr: 'Ekolojik Baskı', en: 'Botanical Print' },
      'natural-dye': { tr: 'Doğal Boyama',   en: 'Natural Dye' },
      ceramic:       { tr: 'Seramik Boyama', en: 'Ceramic Painting' },
    },
    shopierBtn: { tr: 'Shopier\'da İncele', en: 'View on Shopier' },
    inquireBtn: { tr: 'Bilgi Al',           en: 'Inquire' },
    sold:       { tr: 'Satıldı',            en: 'Sold' },
  },

  // ─── Blog ────────────────────────────────────────────────────────────────────
  blog: {
    label:    { tr: 'Blog',       en: 'Blog' },
    title:    { tr: 'Yazılar',    en: 'Articles' },
    subtitle: {
      tr: 'Sanatın arka planı, üretim süreci ve yavaş yaşam üzerine düşünceler.',
      en: 'Behind the art, the making process, and reflections on slow living.',
    },
    readMore: { tr: 'Devamını Oku', en: 'Read More' },
    minRead:  { tr: 'dk okuma',     en: 'min read' },
    backBlog: { tr: '← Tüm Yazılar', en: '← All Articles' },
    by:       { tr: 'Yazar:',       en: 'By' },
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  about: {
    label:    { tr: 'Hikâye',       en: 'Story' },
    title:    { tr: 'El, Toprak, Zaman', en: 'Hand, Clay, Time' },
    p1: {
      tr: 'Çini sanatıyla ilk tanışmam, büyükannemin evindeki o soluk mavili, sonsuzluk desenli tabakla oldu. Yıllarca baktım o tabağa — içinde bir deniz, bir gökyüzü, bir dua varmış gibi hissettim. Belki bu yüzden ellerin bu sanatla buluşması kaçınılmazdı.',
      en: 'My first encounter with tile art was a faded cobalt-blue plate in my grandmother\'s home — infinite in its pattern, like a sea, a sky, a prayer. Perhaps that is why the meeting of my hands with this craft was inevitable.',
    },
    p2: {
      tr: 'Atölyemde köklü geleneksel tekniklerle çağdaş tasarım anlayışını harmanlıyorum. Kobalt boyanın pişmeden önceki soluk gri halinden parlak maviye dönüşmesini her defasında aynı heyecanla izliyorum. Doğal boyama ve ekolojik baskı çalışmalarımda ise bitkiler benim en sessiz işbirlikçilerim.',
      en: 'In my studio I blend deep-rooted traditional techniques with a contemporary design sensibility. Each time I watch cobalt pigment transform from pale grey to brilliant blue in the kiln, the wonder is the same. In my natural dye and botanical print work, plants become my quietest collaborators.',
    },
    p3: {
      tr: '"Yavaş sanat" benim için bir felsefe. Her fırça darbesi, her boya banyosu, her baskı — an\'a dair bir bilinç. Ellerimden çıkan her eser bu yavaşlığı, bu dikkatli varlığı taşısın istiyorum.',
      en: '"Slow art" is a philosophy for me. Every brushstroke, every dye bath, every impression — a consciousness of the present moment. I want every piece that leaves my hands to carry that slowness, that careful presence.',
    },
    atelierTitle: { tr: 'Atölye',            en: 'Studio' },
    atelierText: {
      tr: 'İstanbul\'da küçük ama ışıklı atölyemde, geleneksel iznik desenleri ve çağdaş formlar bir arada yaşıyor.',
      en: 'In my small, light-filled Istanbul studio, traditional İznik patterns and contemporary forms coexist.',
    },
    techniqueTitle: { tr: 'Teknikler',         en: 'Techniques' },
    techniques: {
      tr: ['Geleneksel Çini (İznik usulü)', 'Ekolojik / Botanik Baskı', 'Doğal Boyama (Bitkisel)', 'Seramik Boyama', 'Serbest Desen Tasarımı'],
      en: ['Traditional Tile (İznik method)', 'Eco / Botanical Printing', 'Natural Dyeing (Plant-based)', 'Ceramic Painting', 'Freehand Pattern Design'],
    },
  },

  // ─── Contact ──────────────────────────────────────────────────────────────────
  contact: {
    label:    { tr: 'İletişim',       en: 'Contact' },
    title:    { tr: 'Birlikte Yaratalım', en: 'Let\'s Create Together' },
    subtitle: {
      tr: 'Özel sipariş, işbirliği ya da sadece sanat hakkında konuşmak için bana ulaşabilirsiniz.',
      en: 'For custom orders, collaborations, or simply to talk about art — reach out.',
    },
    namePlaceholder:    { tr: 'Adınız',           en: 'Your name' },
    emailPlaceholder:   { tr: 'E-posta adresiniz', en: 'Your email' },
    messagePlaceholder: {
      tr: 'Mesajınız… Özel sipariş, sergi isteği, işbirliği…',
      en: 'Your message… custom order, exhibition request, collaboration…',
    },
    send:        { tr: 'Gönder',          en: 'Send' },
    whatsapp:    { tr: 'WhatsApp ile Yaz', en: 'Message on WhatsApp' },
    instagram:   { tr: 'Instagram\'da Takip Et', en: 'Follow on Instagram' },
    successMsg:  { tr: 'Mesajınız iletildi. En kısa sürede dönüş yapacağım.',
                   en: 'Your message has been sent. I\'ll get back to you shortly.' },
  },

  // ─── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    tagline:  { tr: 'El yapımı, zamansız.',   en: 'Handcrafted, timeless.' },
    rights:   { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.' },
    links:    { tr: 'Bağlantılar',            en: 'Links' },
    follow:   { tr: 'Takip Et',              en: 'Follow' },
  },

  // ─── Common ───────────────────────────────────────────────────────────────────
  common: {
    loading:    { tr: 'Yükleniyor…',      en: 'Loading…' },
    notFound:   { tr: 'Sayfa bulunamadı.', en: 'Page not found.' },
    backHome:   { tr: 'Ana sayfaya dön',  en: 'Back to home' },
    categories: { tr: 'Kategoriler',      en: 'Categories' },
  },
}

/** Helper: pick the correct language string */
export function tr(key, lang) {
  return key?.[lang] ?? key?.tr ?? ''
}
