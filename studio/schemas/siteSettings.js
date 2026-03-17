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
    {
      name: 'heroSlides',
      title: 'Ana Sayfa Slaytları',
      type: 'array',
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
