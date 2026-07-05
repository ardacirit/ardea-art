export const artwork = {
  name: 'artwork',
  title: 'Eser',
  type: 'document',
  groups: [
    { name: 'main', title: '📌 Temel Bilgiler', default: true },
    { name: 'photos', title: '📷 Fotoğraflar' },
    { name: 'details', title: '📐 Eser Detayları' },
    { name: 'sales', title: '💰 Satış' },
  ],
  fields: [
    // ── Temel ─────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Eser Adı',
      type: 'localizedString',
      group: 'main',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'main',
      description:
        'Eser hangi koleksiyona ait? Yeni bir kategori eklerseniz sitede sekmesi otomatik oluşur.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Web Adresi (otomatik)',
      type: 'slug',
      group: 'main',
      options: { source: 'title.tr', maxLength: 96 },
      description: 'Eser adını yazdıktan sonra "Generate" butonuna basmanız yeterli.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Açıklama / Hikâye',
      type: 'localizedText',
      group: 'main',
      description:
        'Eserin hikâyesi: ilham, desen, teknik… Bu metin Google aramalarında da görünür.',
    },
    {
      name: 'featured',
      title: '⭐ Ana Sayfada Göster?',
      type: 'boolean',
      group: 'main',
      initialValue: false,
      description:
        'Açarsanız eser ana sayfadaki "Seçme Eserler" bölümünde öne çıkar. 4-6 eser işaretlemeniz önerilir.',
    },
    {
      name: 'order',
      title: 'Sıralama (küçük sayı = önce görünür)',
      type: 'number',
      group: 'main',
      initialValue: 99,
    },

    // ── Fotoğraflar ───────────────────────────────────────────
    {
      name: 'image',
      title: 'Ana Fotoğraf',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description:
        'Sürükleyip bırakın. Önerilen: en az 1200 px genişlik, JPG. Fotoğrafa tıklayıp odak noktasını (hotspot) ayarlayabilirsiniz.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Fotoğraf Açıklaması (Google Görseller için)',
      type: 'localizedString',
      group: 'photos',
      description:
        'Fotoğrafta ne göründüğünü bir cümleyle yazın. Örnek: "Kobalt mavisi lale desenli el yapımı çini tabak". Boş bırakırsanız otomatik oluşturulur.',
    },
    {
      name: 'images',
      title: 'Ek Fotoğraflar (farklı açılar, detaylar)',
      type: 'array',
      group: 'photos',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Fotoğraf Açıklaması',
              type: 'string',
              description: 'Bu açıda ne göründüğünü kısaca yazın (isteğe bağlı).',
            },
          ],
        },
      ],
      description: 'Ana fotoğraf otomatik ilk sıradadır; buraya detay çekimleri ekleyin.',
    },

    // ── Detaylar ──────────────────────────────────────────────
    {
      name: 'year',
      title: 'Yapım Yılı',
      type: 'number',
      group: 'details',
      description: 'Örnek: 2025',
      validation: (Rule) => Rule.min(1990).max(2100).warning('Yıl doğru mu?'),
    },
    {
      name: 'dimensions',
      title: 'Ölçüler',
      type: 'string',
      group: 'details',
      description: 'Örnek: 20 × 20 cm  veya  Ø 25 cm (tabak için)',
    },
    {
      name: 'technique',
      title: 'Teknik / Malzeme',
      type: 'localizedString',
      group: 'details',
      description: 'Örnek TR: "Sıraltı tekniği, kobalt boya" — EN: "Underglaze, cobalt pigment"',
    },

    // ── Satış ─────────────────────────────────────────────────
    {
      name: 'price',
      title: 'Fiyat (₺)',
      type: 'number',
      group: 'sales',
      description:
        'Sadece sayı girin, örnek: 1200. Boş bırakırsanız sitede "Fiyat için iletişime geçin" yazar.',
    },
    {
      name: 'shopierUrl',
      title: 'Shopier Linki',
      type: 'url',
      group: 'sales',
      description: 'Shopier ürün sayfasının tam linki (isteğe bağlı).',
    },
    {
      name: 'sold',
      title: '✅ Satıldı mı?',
      type: 'boolean',
      group: 'sales',
      initialValue: false,
      description: 'İşaretlerseniz eserde "Satıldı" etiketi görünür, fiyat gizlenir.',
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'image',
      sold: 'sold',
      featured: 'featured',
      catTitle: 'category.title.tr',
    },
    prepare({ title, media, sold, featured, catTitle }) {
      const flags = [featured ? '⭐' : '', sold ? '✅ Satıldı' : ''].filter(Boolean).join(' ')
      return {
        title: title || 'İsimsiz Eser',
        subtitle: `${catTitle || 'Kategori yok'}${flags ? ` · ${flags}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Sıraya Göre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'En Yeni',
      name: 'newest',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
}
