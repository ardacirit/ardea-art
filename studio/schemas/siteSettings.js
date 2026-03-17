export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'contact',  title: '📞 İletişim' },
    { name: 'hero',     title: '🏠 Ana Sayfa Hero' },
    { name: 'home',     title: '🏡 Ana Sayfa Metinleri' },
    { name: 'photos',   title: '📷 Fotoğraflar' },
    { name: 'about',    title: '👩‍🎨 Hakkımda Metinleri' },
    { name: 'footer',   title: '🔻 Footer' },
  ],
  fields: [
    // ── İletişim ──────────────────────────────────────────────
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Numarası',
      type: 'string',
      group: 'contact',
      description: 'Başında 90 ile tam numara. Örnek: 905321234567',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Kullanıcı Adı',
      type: 'string',
      group: 'contact',
      description: '@ işareti olmadan. Örnek: ardea.art',
    },

    // ── Hero ──────────────────────────────────────────────────
    {
      name: 'heroSlides',
      title: '🖼️ Ana Sayfa Slaytları',
      type: 'array',
      group: 'hero',
      description: 'En az 1, en fazla 5 slayt ekleyin. Her slayt için fotoğraf önerilen boyut: 1600×900 px (16:9 yatay). JPG tercih edilir.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image',    title: 'Fotoğraf',    type: 'image', options: { hotspot: true } },
            { name: 'tagline',  title: 'Büyük Başlık', type: 'localizedString' },
            { name: 'subtitle', title: 'Alt Başlık',   type: 'localizedString' },
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
      name: 'heroTagline',
      title: 'Hero Ana Başlık (slayt yoksa)',
      type: 'localizedString',
      group: 'hero',
      description: 'Slaytlarda başlık belirtilmezse bu metin gösterilir.',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Alt Başlık (slayt yoksa)',
      type: 'localizedString',
      group: 'hero',
      description: 'Slaytlarda alt başlık belirtilmezse bu metin gösterilir.',
    },

    // ── Ana Sayfa Metinleri ───────────────────────────────────
    {
      name: 'philosophyQuote',
      title: 'Ana Sayfa Alıntısı',
      type: 'localizedString',
      group: 'home',
      description: 'Hero\'nun altındaki büyük italik alıntı.',
    },
    {
      name: 'featuredTitle',
      title: 'Öne Çıkan Eserler — Başlık',
      type: 'localizedString',
      group: 'home',
      description: 'Anasayfadaki eserler bölümünün başlığı.',
    },
    {
      name: 'featuredSubtitle',
      title: 'Öne Çıkan Eserler — Açıklama',
      type: 'localizedText',
      group: 'home',
      description: 'Anasayfadaki eserler bölümünün altındaki açıklama metni.',
    },
    {
      name: 'contactSubtitle',
      title: 'İletişim Sayfası — Alt Başlık',
      type: 'localizedText',
      group: 'contact',
      description: 'İletişim sayfasındaki açıklama metni.',
    },
    {
      name: 'customOrderText',
      title: 'Özel Sipariş Açıklama Metni',
      type: 'localizedText',
      group: 'contact',
      description: 'İletişim sayfasındaki "Özel Sipariş" kutusunun metni.',
    },

    // ── Fotoğraflar ───────────────────────────────────────────
    {
      name: 'portraitImage',
      title: '🧑‍🎨 Sanatçı Fotoğrafı (Hakkımda)',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Hakkımda sayfası sağ kolon — dikey fotoğraf önerilir. Önerilen boyut: 800×1000 px (4:5 oran). JPG veya PNG.',
    },
    {
      name: 'atelierImage',
      title: '🏠 Atölye Fotoğrafı',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Hakkımda sayfası atölye bölümü — yatay fotoğraf önerilir. Önerilen boyut: 1200×675 px (16:9 oran). JPG veya PNG.',
    },
    {
      name: 'processImage',
      title: '🎨 Üretim Süreci Fotoğrafı',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Hakkımda sayfası teknikler bölümü — yatay fotoğraf önerilir. Önerilen boyut: 1200×675 px (16:9 oran). JPG veya PNG.',
    },
    {
      name: 'homeTeaserImage',
      title: '🏠 Ana Sayfa — Hakkımda Görseli',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Ana sayfadaki "Hakkımda" önizleme bölümü — dikey fotoğraf önerilir. Önerilen boyut: 800×1000 px (4:5 oran). JPG veya PNG.',
    },

    // ── Hakkımda Metinleri ────────────────────────────────────
    {
      name: 'aboutP1',
      title: '1. Paragraf',
      type: 'localizedText',
      group: 'about',
      description: 'Çini ile ilk tanışma hikayesi.',
    },
    {
      name: 'aboutP2',
      title: '2. Paragraf',
      type: 'localizedText',
      group: 'about',
      description: 'Atölye ve teknikler hakkında.',
    },
    {
      name: 'aboutP3',
      title: '3. Paragraf',
      type: 'localizedText',
      group: 'about',
      description: '"Yavaş sanat" felsefesi.',
    },
    {
      name: 'aboutAtelierText',
      title: 'Atölye Açıklama Metni',
      type: 'localizedText',
      group: 'about',
      description: 'Atölye bölümünün altındaki kısa açıklama.',
    },
    {
      name: 'aboutTechniques',
      title: 'Teknikler Listesi',
      type: 'array',
      group: 'about',
      description: 'Her satır bir teknik. TR ve EN olarak girin.',
      of: [{ type: 'localizedString' }],
    },

    // ── Footer ────────────────────────────────────────────────
    {
      name: 'footerTagline',
      title: 'Footer Sloganı',
      type: 'localizedString',
      group: 'footer',
      description: 'Örnek: "El yapımı, zamansız."',
    },
    {
      name: 'footerQuote',
      title: 'Footer Alıntı',
      type: 'localizedString',
      group: 'footer',
      description: 'Sayfa altındaki italik alıntı. Örnek: "Yavaş sanat, derin iz bırakır."',
    },
  ],
  preview: {
    prepare() {
      return { title: '⚙️ Site Ayarları' }
    },
  },
}
