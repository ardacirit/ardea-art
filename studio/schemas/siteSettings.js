export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'general', title: '🌐 Genel', default: true },
    { name: 'seo', title: '🔍 Google & Paylaşım' },
    { name: 'contact', title: '📞 İletişim' },
    { name: 'hero', title: '🏠 Ana Sayfa Hero' },
    { name: 'home', title: '🏡 Ana Sayfa Metinleri' },
    { name: 'photos', title: '📷 Fotoğraflar' },
    { name: 'about', title: '👩‍🎨 Hakkımda Metinleri' },
    { name: 'footer', title: '🔻 Footer' },
  ],
  fields: [
    // ── Genel ─────────────────────────────────────────────────
    {
      name: 'siteTitle',
      title: 'Site Başlığı',
      type: 'string',
      group: 'general',
      description:
        'Tarayıcı sekmesinde ve Google\'da görünen başlık. Google\'da bulunmak için mesleğinizi de içersin. Önerilen: "Zerrin Cirit — Çini ve Seramik Sanatçısı". Sadece isim yazarsanız site tamamlayıcıyı kendisi ekler.',
    },
    {
      name: 'favicon',
      title: 'Site İkonu (Favicon)',
      type: 'image',
      group: 'general',
      description:
        'Tarayıcı sekmesindeki küçük ikon. Kare ve PNG olmalı (arka planı şeffaf olabilir), önerilen: 512×512 px. Boş bırakırsanız sitenin hazır çini deseni ikonu kullanılır.',
    },

    // ── Google & Paylaşım (SEO) ───────────────────────────────
    {
      name: 'metaDescription',
      title: 'Google Arama Açıklaması',
      type: 'localizedText',
      group: 'seo',
      description:
        'Google sonuçlarında başlığın altında görünen 1-2 cümle (en fazla ~155 karakter). Örnek: "El yapımı çini ve seramik eserler. Geleneksel İznik desenlerinin çağdaş yorumu."',
    },
    {
      name: 'ogImage',
      title: 'Link Paylaşım Görseli',
      type: 'image',
      group: 'seo',
      description:
        'Site linki WhatsApp / Instagram / Facebook\'ta paylaşıldığında görünen kapak fotoğrafı. Yatay olmalı, önerilen: 1200×630 px. Boş bırakırsanız ilk hero slaytı kullanılır.',
    },
    {
      name: 'artistLocation',
      title: 'Atölye Şehri',
      type: 'string',
      group: 'seo',
      description: 'Örnek: İstanbul, Türkiye — arama motorlarına konum bilgisi verir.',
    },

    // ── İletişim ──────────────────────────────────────────────
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Numarası',
      type: 'string',
      group: 'contact',
      description: 'Başında 90 ile, boşluksuz. Örnek: 905321234567',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Kullanıcı Adı',
      type: 'string',
      group: 'contact',
      description: '@ işareti olmadan. Örnek: zerrin.cirit',
    },
    {
      name: 'email',
      title: 'E-posta (isteğe bağlı)',
      type: 'string',
      group: 'contact',
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

    // ── Hero ──────────────────────────────────────────────────
    {
      name: 'heroSlides',
      title: '🖼️ Ana Sayfa Slaytları',
      type: 'array',
      group: 'hero',
      description:
        'En fazla 5 slayt. Dikey/kareye yakın fotoğraflar en iyi sonucu verir (örnek: 1200×1400 px). Fotoğrafın odak noktasını hotspot ile ayarlayabilirsiniz.',
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
      validation: (Rule) => Rule.max(5),
    },
    {
      name: 'heroTagline',
      title: 'Hero Ana Başlık',
      type: 'localizedString',
      group: 'hero',
      description: 'Ana sayfadaki büyük başlık. Satır bölmek için Enter yerine "\\n" kullanmayın; kısa tutun.',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Alt Başlık',
      type: 'localizedString',
      group: 'hero',
      description: 'Büyük başlığın altındaki tanıtım cümlesi.',
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
    },
    {
      name: 'featuredSubtitle',
      title: 'Öne Çıkan Eserler — Açıklama',
      type: 'localizedText',
      group: 'home',
    },

    // ── Fotoğraflar ───────────────────────────────────────────
    {
      name: 'portraitImage',
      title: '🧑‍🎨 Sanatçı Fotoğrafı (Hakkımda)',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Dikey fotoğraf önerilir: 800×1000 px (4:5).',
    },
    {
      name: 'atelierImage',
      title: '🏠 Atölye Fotoğrafı',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Yatay fotoğraf önerilir: 1200×750 px (16:10).',
    },
    {
      name: 'processImage',
      title: '🎨 Üretim Süreci Fotoğrafı',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Yatay fotoğraf önerilir: 1200×750 px (16:10).',
    },
    {
      name: 'homeTeaserImage',
      title: '🏠 Ana Sayfa — Hakkımda Görseli',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      description: 'Dikey fotoğraf önerilir: 800×1000 px (4:5). Boşsa sanatçı fotoğrafı kullanılır.',
    },

    // ── Hakkımda Metinleri ────────────────────────────────────
    {
      name: 'aboutP1',
      title: '1. Paragraf',
      type: 'localizedText',
      group: 'about',
      description: 'Çini ile ilk tanışma hikayesi. Ana sayfadaki tanıtımda da görünür.',
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
      description: 'Sayfa altındaki italik alıntı.',
    },
  ],
  preview: {
    prepare() {
      return { title: '⚙️ Site Ayarları' }
    },
  },
}
