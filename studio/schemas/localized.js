export const localizedString = {
  name: 'localizedString',
  title: 'İki Dilli Metin (Kısa)',
  type: 'object',
  fields: [
    { name: 'tr', title: '🇹🇷 Türkçe', type: 'string' },
    { name: 'en', title: '🇬🇧 English', type: 'string' },
  ],
}

export const localizedText = {
  name: 'localizedText',
  title: 'İki Dilli Metin (Uzun)',
  type: 'object',
  fields: [
    { name: 'tr', title: '🇹🇷 Türkçe', type: 'text', rows: 4 },
    { name: 'en', title: '🇬🇧 English', type: 'text', rows: 4 },
  ],
}

export const localizedBlock = {
  name: 'localizedBlock',
  title: 'İki Dilli İçerik (Blog)',
  type: 'object',
  fields: [
    {
      name: 'tr',
      title: '🇹🇷 Türkçe İçerik',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Fotoğraf Açıklaması (Google için)',
              type: 'string',
              description: 'Fotoğrafta ne göründüğünü kısaca yazın.',
            },
            { name: 'caption', title: 'Fotoğraf Altı Yazısı', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'en',
      title: '🇬🇧 English Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Image description (for Google)', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
  ],
}
