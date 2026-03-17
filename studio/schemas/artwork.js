export const artwork = {
  name: 'artwork',
  title: 'Eser',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Çini', value: 'tile' },
          { title: '🌿 Ekolojik Baskı', value: 'botanical' },
          { title: '🎨 Doğal Boyama', value: 'natural-dye' },
          { title: '🏺 Seramik Boyama', value: 'ceramic' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Fotoğraf',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Açıklama',
      type: 'localizedText',
    },
    {
      name: 'price',
      title: 'Fiyat (₺)',
      type: 'number',
      description: 'Sadece sayı girin. Örnek: 1200',
    },
    {
      name: 'shopierUrl',
      title: 'Shopier Linki',
      type: 'url',
      description: 'Shopier ürün sayfasının tam linki',
    },
    {
      name: 'featured',
      title: 'Ana Sayfada Göster?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sold',
      title: 'Satıldı mı?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Sıralama (küçük = önce)',
      type: 'number',
      initialValue: 99,
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      category: 'category',
      media: 'image',
      sold: 'sold',
    },
    prepare({ title, category, media, sold }) {
      const cats = { tile: '🔵', botanical: '🌿', 'natural-dye': '🎨', ceramic: '🏺' }
      return {
        title: `${cats[category] || ''} ${title || 'İsimsiz Eser'}`,
        subtitle: sold ? '✅ Satıldı' : 'Satışta',
        media,
      }
    },
  },
}
