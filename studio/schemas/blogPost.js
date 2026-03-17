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
      title: 'URL (otomatik)',
      type: 'slug',
      options: { source: 'title.tr', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: '🔵 Çini', value: 'cini' },
          { title: '🌿 Ekolojik Baskı', value: 'ekolojik-baski' },
          { title: '🎨 Doğal Boyama', value: 'dogal-boyama' },
          { title: '🏺 Seramik', value: 'seramik' },
          { title: '💭 Sanat & Felsefe', value: 'felsefe' },
        ],
      },
    },
    {
      name: 'coverImage',
      title: 'Kapak Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'excerpt',
      title: 'Kısa Özet',
      type: 'localizedText',
      description: 'Blog listesinde görünen kısa açıklama',
    },
    {
      name: 'content',
      title: 'İçerik',
      type: 'localizedBlock',
    },
    {
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
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
        subtitle: date || '',
        media,
      }
    },
  },
}
