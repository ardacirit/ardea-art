export const category = {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  description:
    'Yeni bir kategori eklediğinizde sitede menü sekmesi, filtre butonu ve koleksiyon sayfası otomatik oluşur.',
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
      title: 'Web Adresi (otomatik)',
      type: 'slug',
      options: { source: 'title.tr', maxLength: 50 },
      description: '"Generate" butonuna basın; sonrasında değiştirmeyin.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Kategori Tanıtım Yazısı',
      type: 'localizedText',
      description:
        'Koleksiyon sayfasının başında görünen 1-2 cümlelik tanıtım. Google için de önemlidir.',
    },
    {
      name: 'coverImage',
      title: 'Kapak Fotoğrafı',
      type: 'image',
      options: { hotspot: true },
      description:
        'Ana sayfadaki koleksiyon kartında görünür. Boş bırakırsanız kategorinin ilk eseri kullanılır.',
    },
    {
      name: 'order',
      title: 'Sıralama (küçük sayı = önce)',
      type: 'number',
      initialValue: 99,
    },
    {
      name: 'emoji',
      title: 'Emoji (isteğe bağlı)',
      type: 'string',
      description: 'Örnek: 🔵 🌿 🎨 🏺 — yönetim panelinde ayırt etmeyi kolaylaştırır.',
    },
  ],
  preview: {
    select: { title: 'title.tr', emoji: 'emoji', order: 'order', media: 'coverImage' },
    prepare({ title, emoji, order, media }) {
      return {
        title: `${emoji || '📂'} ${title || 'İsimsiz Kategori'}`,
        subtitle: `Sıra: ${order ?? 99}`,
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
  ],
}
