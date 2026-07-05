export const LOCALES = ['tr', 'en']
export const DEFAULT_LOCALE = 'tr'

export function isLocale(value) {
  return LOCALES.includes(value)
}

/** Pick the right language out of a { tr, en } object; tolerate plain strings. */
export function localized(field, lang) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.tr || field.en || ''
}

export function formatPrice(value, lang) {
  if (typeof value !== 'number') return null
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value, lang) {
  if (!value) return ''
  return new Date(value).toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Static UI strings. Content itself lives in Sanity — these are chrome only. */
export const ui = {
  nav: {
    home: { tr: 'Ana Sayfa', en: 'Home' },
    collection: { tr: 'Koleksiyon', en: 'Collection' },
    blog: { tr: 'Blog', en: 'Journal' },
    about: { tr: 'Hakkımda', en: 'About' },
    contact: { tr: 'İletişim', en: 'Contact' },
    menu: { tr: 'Menü', en: 'Menu' },
    close: { tr: 'Kapat', en: 'Close' },
  },
  hero: {
    kicker: { tr: 'Çini · Seramik · El Yapımı', en: 'Çini · Ceramics · Handmade' },
    tagline: {
      tr: 'Toprağın Ruhu,\nElin İzleri',
      en: 'The Soul of Clay,\nTraces of Hands',
    },
    sub: {
      tr: 'El yapımı çini ve seramik sanatı — geleneksel İznik motiflerinin çağdaş yorumu.',
      en: 'Handmade Turkish tile & ceramic art — İznik tradition in a contemporary voice.',
    },
    cta: { tr: 'Koleksiyonu Keşfet', en: 'Explore the Collection' },
    ctaAbout: { tr: 'Hikâyemi Oku', en: 'Read My Story' },
  },
  home: {
    featuredKicker: { tr: 'Seçkiler', en: 'Selected Works' },
    featuredTitle: { tr: 'Öne Çıkan Eserler', en: 'Featured Pieces' },
    viewAll: { tr: 'Tüm Koleksiyonu Gör', en: 'View Full Collection' },
    collectionsKicker: { tr: 'Koleksiyonlar', en: 'Collections' },
    collectionsTitle: { tr: 'Eserleri Keşfedin', en: 'Explore the Works' },
    aboutKicker: { tr: 'Sanatçı', en: 'The Artist' },
    aboutTitle: { tr: 'El, Toprak, Zaman', en: 'Hand, Clay, Time' },
    aboutCta: { tr: 'Devamını Oku', en: 'Read More' },
    journalKicker: { tr: 'Blog', en: 'Journal' },
    journalTitle: { tr: 'Atölyeden Notlar', en: 'Notes from the Studio' },
    journalCta: { tr: 'Tüm Yazılar', en: 'All Articles' },
    ctaTitle: {
      tr: 'Size özel bir eser tasarlayalım',
      en: 'Let us design a piece just for you',
    },
    ctaText: {
      tr: 'Özel sipariş, işbirliği veya sergi için iletişime geçin.',
      en: 'Get in touch for custom orders, collaborations or exhibitions.',
    },
    pieces: { tr: 'eser', en: 'works' },
  },
  collection: {
    kicker: { tr: 'Koleksiyon', en: 'Collection' },
    title: { tr: 'Tüm Eserler', en: 'All Works' },
    all: { tr: 'Tümü', en: 'All' },
    empty: {
      tr: 'Bu koleksiyonda henüz eser yok.',
      en: 'No works in this collection yet.',
    },
  },
  artwork: {
    year: { tr: 'Yıl', en: 'Year' },
    dimensions: { tr: 'Ölçüler', en: 'Dimensions' },
    technique: { tr: 'Teknik', en: 'Technique' },
    sold: { tr: 'Satıldı', en: 'Sold' },
    inquire: { tr: 'WhatsApp ile Bilgi Al', en: 'Inquire on WhatsApp' },
    shopier: { tr: "Shopier'da Satın Al", en: 'Buy on Shopier' },
    related: { tr: 'Aynı Koleksiyondan', en: 'From the Same Collection' },
    back: { tr: 'Koleksiyona Dön', en: 'Back to Collection' },
    whatsappMessage: {
      tr: 'Merhaba! "{title}" adlı eser hakkında bilgi almak istiyorum.',
      en: 'Hello! I would like to ask about the piece "{title}".',
    },
    priceNote: {
      tr: 'Kargo ve ödeme detayları için iletişime geçebilirsiniz.',
      en: 'Contact me for shipping and payment details.',
    },
    priceOnRequest: {
      tr: 'Fiyat için iletişime geçin',
      en: 'Price on request',
    },
  },
  blog: {
    kicker: { tr: 'Blog', en: 'Journal' },
    title: { tr: 'Atölyeden Notlar', en: 'Notes from the Studio' },
    subtitle: {
      tr: 'Üretim süreci, sergiler ve yavaş sanat üzerine düşünceler.',
      en: 'The making process, exhibitions, and reflections on slow art.',
    },
    readMore: { tr: 'Devamını Oku', en: 'Read More' },
    minRead: { tr: 'dk okuma', en: 'min read' },
    back: { tr: 'Tüm Yazılar', en: 'All Articles' },
    empty: { tr: 'Henüz yazı yok.', en: 'No articles yet.' },
  },
  about: {
    kicker: { tr: 'Hikâye', en: 'Story' },
    title: { tr: 'El, Toprak, Zaman', en: 'Hand, Clay, Time' },
    atelier: { tr: 'Atölye', en: 'Studio' },
    techniques: { tr: 'Teknikler', en: 'Techniques' },
  },
  contact: {
    kicker: { tr: 'İletişim', en: 'Contact' },
    title: { tr: 'Birlikte Yaratalım', en: "Let's Create Together" },
    whatsapp: { tr: 'WhatsApp ile Yaz', en: 'Message on WhatsApp' },
    whatsappDesc: {
      tr: 'En hızlı yanıt için doğrudan mesaj gönderin.',
      en: 'Message me directly for the fastest reply.',
    },
    instagram: { tr: "Instagram'da Takip Et", en: 'Follow on Instagram' },
    instagramDesc: {
      tr: 'Yeni eserler ve atölyeden kareler.',
      en: 'New works and scenes from the studio.',
    },
    customOrder: { tr: 'Özel Sipariş', en: 'Custom Orders' },
    email: { tr: 'E-posta ile Yaz', en: 'Write an Email' },
    emailDesc: {
      tr: 'Galeriler, basın ve kurumsal talepler için.',
      en: 'For galleries, press and corporate inquiries.',
    },
  },
  footer: {
    tagline: { tr: 'El yapımı, zamansız.', en: 'Handcrafted, timeless.' },
    explore: { tr: 'Keşfet', en: 'Explore' },
    collections: { tr: 'Koleksiyonlar', en: 'Collections' },
    follow: { tr: 'Takip Et', en: 'Follow' },
    rights: { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.' },
  },
  notFound: {
    title: { tr: 'Sayfa Bulunamadı', en: 'Page Not Found' },
    text: {
      tr: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
      en: 'The page you are looking for may have moved or never existed.',
    },
    back: { tr: 'Ana sayfaya dön', en: 'Back to home' },
  },
}
