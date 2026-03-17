export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Numarası',
      type: 'string',
      description: 'Başında 90 ile tam numara. Örnek: 905321234567',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Kullanıcı Adı',
      type: 'string',
      description: '@ işareti olmadan. Örnek: ardea.art',
    },
    // ── Hero Slider ──────────────────────────────────────────
    {
      name: 'heroSlides',
      title: '🖼️ Ana Sayfa Slaytları',
      type: 'array',
      description: 'En az 1, en fazla 5 slayt ekleyin.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Fotoğraf', type: 'image', options: { hotspot: true } },
            { name: 'tagline', title: 'Büyük Başlık', type: 'localizedString' },
            { name: 'subtitle', title: 'Alt Başlık', type: 'localizedString' },
          ],
          preview: {
            select: { title: 'tagline.tr', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Slayt', media }
            },
          },
        },
      ],
    },
    // ── Hakkımda Sayfası Fotoğrafları ───────────────────────
    {
      name: 'portraitImage',
      title: '🧑‍🎨 Sanatçı Fotoğrafı (Hakkımda)',
      type: 'image',
      options: { hotspot: true },
      description: 'Hakkımda sayfasında görünen portre fotoğrafı.',
    },
    {
      name: 'atelierImage',
      title: '🏠 Atölye Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description: 'Çalışma alanınızın fotoğrafı.',
    },
    {
      name: 'processImage',
      title: '🎨 Üretim Süreci Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description: 'Eser yapım sürecini gösteren fotoğraf.',
    },
    {
      name: 'homeTeaserImage',
      title: '🏠 Ana Sayfa — Hakkımda Görseli',
      type: 'image',
      options: { hotspot: true },
      description: 'Ana sayfadaki "Hakkımda" önizleme bölümünde görünen fotoğraf.',
    },
    // ── Hakkımda Metinleri ───────────────────────────────────
    {
      name: 'aboutText',
      title: 'Hakkımda — Ana Paragraf',
      type: 'localizedText',
    },
  ],
  preview: {
    prepare() {
      return { title: '⚙️ Site Ayarları' }
    },
  },
}
