export const category = {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Kategori Adı',
      type: 'object',
      fields: [
        { name: 'tr', title: '🇹🇷 Türkçe', type: 'string' },
        { name: 'en', title: '🇬🇧 İngilizce', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Teknik ID (otomatik)',
      type: 'slug',
      options: { source: 'title.tr', maxLength: 50 },
      description: 'Otomatik oluşturulur, değiştirmeyin.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Sıralama (küçük = önce)',
      type: 'number',
      initialValue: 99,
    },
    {
      name: 'emoji',
      title: 'Emoji (isteğe bağlı)',
      type: 'string',
      description: 'Örnek: 🔵 🌿 🎨 🏺',
    },
  ],
  preview: {
    select: { title: 'title.tr', emoji: 'emoji', order: 'order' },
    prepare({ title, emoji, order }) {
      return {
        title: `${emoji || '📂'} ${title || 'İsimsiz Kategori'}`,
        subtitle: `Sıra: ${order ?? 99}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sıraya Göre',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
