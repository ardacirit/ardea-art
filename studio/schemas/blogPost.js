export const blogPost = {
  name: 'blogPost',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Başlık',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Web Adresi (otomatik)',
      type: 'slug',
      options: { source: 'title.tr', maxLength: 96 },
      description: 'Başlığı yazdıktan sonra "Generate" butonuna basın.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Konu',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Çini', value: 'cini' },
          { title: '🏺 Seramik', value: 'seramik' },
          { title: '🌿 Ekolojik Baskı', value: 'ekolojik-baski' },
          { title: '🎨 Doğal Boyama', value: 'dogal-boyama' },
          { title: '🖼️ Sergi & Haberler', value: 'sergi' },
          { title: '💭 Sanat & Felsefe', value: 'felsefe' },
        ],
      },
    },
    {
      name: 'coverImage',
      title: 'Kapak Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description: 'Yatay fotoğraf önerilir (örnek: 1600×900 px). Link paylaşımlarında da bu görünür.',
    },
    {
      name: 'excerpt',
      title: 'Kısa Özet',
      type: 'localizedText',
      description:
        'Blog listesinde ve Google aramasında görünen 1-2 cümlelik özet. Doldurmanızı öneririm.',
    },
    {
      name: 'content',
      title: 'İçerik',
      type: 'localizedBlock',
      description: 'Yazının tamamı. Araya fotoğraf da ekleyebilirsiniz.',
    },
    {
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Okuma Süresi (dakika)',
      type: 'number',
      initialValue: 5,
    },
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title: title || 'İsimsiz Yazı',
        subtitle: date || 'Tarih girilmemiş',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'En Yeni',
      name: 'newest',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}
