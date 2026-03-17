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
      type: 'reference',
      to: [{ type: 'category' }],
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
      media: 'image',
      sold: 'sold',
      catTitle: 'category.title.tr',
    },
    prepare({ title, media, sold, catTitle }) {
      return {
        title: title || 'İsimsiz Eser',
        subtitle: `${catTitle || 'Kategori yok'} ${sold ? '· ✅ Satıldı' : ''}`,
        media,
      }
    },
  },
}
