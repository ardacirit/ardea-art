# Zerrin Cirit — Çini & Seramik Dijital Galerisi

El yapımı çini ve seramik sanatçısı **Zerrin Cirit** için premium dijital galeri.
Next.js 15 (App Router) + Sanity.io + Tailwind CSS.

- **Canlı site:** https://zerrincirit.com
- **İçerik yönetimi:** Sanity Studio (`studio/` klasörü) — kod bilgisi gerektirmez
- **Diller:** Türkçe (`/tr`, varsayılan) ve İngilizce (`/en`)

---

## 1. Eski Taslağın Arşivi (Git Stratejisi)

Eski Vite tabanlı site **silinmedi** — `archive/old-draft` dalında kalıcı olarak saklanıyor
ve GitHub'a push edildi. Gerektiğinde:

```bash
# Eski taslağa göz atmak
git checkout archive/old-draft

# Eski taslaktan tek bir dosya geri almak (örnek)
git checkout archive/old-draft -- src/pages/Home.jsx

# Yeni tasarıma geri dönmek
git checkout main
```

Dal GitHub'da durduğu sürece eski tasarım her zaman geri getirilebilir.
**Bu dalı silmeyin.**

---

## 2. Kurulum & Geliştirme

```bash
# Bağımlılıklar
npm install

# Ortam değişkenleri
cp .env.example .env.local   # değerler zaten dolu, gerekirse düzenleyin

# Geliştirme sunucusu → http://localhost:3000
npm run dev

# Prodüksiyon derlemesi
npm run build && npm start
```

Sanity Studio'yu yerelde çalıştırmak için:

```bash
cd studio
npm install
npx sanity dev        # → http://localhost:3333
npx sanity deploy     # Studio'yu xxx.sanity.studio adresine yayınlar
```

### Vercel'e Deploy

Repo Vercel'e bağlıysa `main` dalına atılan her commit otomatik yayınlanır.
Vercel proje ayarlarında şu ortam değişkenlerini tanımlayın:

| Değişken | Değer |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `uanm61w5` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://zerrincirit.com` |

Sayfalar **ISR (revalidate: 60)** ile yayınlanır: Sanity'de "Publish"e basıldıktan
en geç 1 dakika sonra site kendini günceller — **yeniden deploy gerekmez**.

---

## 3. Annem İçin: Siteyi Yönetme Rehberi 👩‍🎨

Her şey Sanity Studio'dan yönetilir. Kod yok, korkulacak bir şey yok.
Yanlışlıkla bir şey bozulursa "Publish"e basmadığınız sürece canlı site etkilenmez.

### Yeni eser eklemek
1. Studio'da **🖼️ Eserler → +** butonuna basın.
2. Eser adını Türkçe ve İngilizce yazın, **kategori** seçin.
3. **Web Adresi** alanında "Generate" butonuna basın.
4. **📷 Fotoğraflar** sekmesine ana fotoğrafı sürükleyip bırakın.
   Fotoğrafa tıklayıp odak noktasını (hotspot) ayarlayabilirsiniz.
5. İsterseniz **📐 Eser Detayları** (yıl, ölçü, teknik) ve **💰 Satış**
   (fiyat, Shopier linki) bilgilerini doldurun.
6. Sağ alttaki **Publish** butonuna basın. 1 dakika içinde sitede.

### Yeni kategori (koleksiyon) eklemek
**📂 Kategoriler → +** ile yeni kategori oluşturup Publish'leyin.
Sitede menü, filtre butonu, ana sayfa kartı ve koleksiyon sayfası
**otomatik** oluşur — başka hiçbir şey yapmanız gerekmez.

### Blog yazısı yazmak
**✍️ Blog Yazıları → +** → başlık, kapak fotoğrafı, kısa özet ve içerik.
İçeriğin arasına fotoğraf da ekleyebilirsiniz.

### Site metinleri, fotoğraflar, iletişim
**⚙️ Site Ayarları** altında sekmeler halinde: hero slaytları, ana sayfa
metinleri, hakkımda paragrafları, WhatsApp numarası, Instagram, Google
açıklaması ve link paylaşım görseli.

### İyi fotoğraf açıklaması (alt metni) nasıl yazılır?
"Fotoğraf Açıklaması" alanına fotoğrafta *ne göründüğünü* yazın — Google
Görseller ve Pinterest bu metni okur:

> ✅ "Kobalt mavisi lale desenli el yapımı çini tabak, 25 cm"
> ❌ "IMG_2041" / "güzel tabak"

Boş bırakırsanız sistem eser adı + kategoriden otomatik bir açıklama üretir.

---

## 4. Mimari

```
app/
  [lang]/                    # tr | en — tüm sayfalar iki dilli
    layout.jsx               # Kök layout: fontlar, nav, footer, site geneli SEO + JSON-LD
    page.jsx                 # Ana sayfa (hero, seçkiler, koleksiyonlar, blog, CTA)
    collection/page.jsx      # Tüm eserler + dinamik kategori filtreleri
    collection/[category]/   # Kategori sayfası (Sanity'den otomatik)
    artwork/[slug]/          # Eser detay: galeri + lightbox, VisualArtwork JSON-LD
    blog/ , blog/[slug]/     # Blog listesi ve yazı sayfası (BlogPosting JSON-LD)
    about/ , contact/        # Hakkımda, iletişim
    [...rest]/ + not-found   # 404
  sitemap.js                 # İki dilli, hreflang'li sitemap.xml
  robots.js                  # robots.txt
components/                  # Navbar, Footer, ArtworkCard, Galeri/Lightbox, Hero…
lib/
  sanity.js                  # Sanity istemcisi
  queries.js                 # Tüm GROQ sorguları (React cache ile)
  image.js                   # Görsel yardımcıları + algoritmik alt metin
  i18n.js                    # TR/EN arayüz metinleri
  seo.js                     # JSON-LD üreticileri, hreflang, meta yardımcıları
  sanity-image-loader.js     # next/image → Sanity CDN yeniden boyutlandırma
middleware.js                # / → /tr yönlendirmesi
studio/                      # Sanity Studio (şemalar Türkçe, kod bilmeyene uygun)
```

## 5. SEO & Keşfedilebilirlik Özeti

- **SSR/ISR:** Tüm sayfalar sunucuda render edilir — Google, Bing ve AI
  crawler'ları (Perplexity, ChatGPT, Gemini) tam içeriği görür.
- **JSON-LD:** `Person` (sanatçı), `WebSite`, `VisualArtwork` (her eser),
  `CollectionPage` + `ItemList`, `BlogPosting`, `BreadcrumbList`,
  `ProfilePage`, `ContactPage`.
- **Open Graph + Twitter Cards:** Her sayfada 1200×630 görselli premium
  link önizlemesi (WhatsApp, Instagram, Facebook).
- **hreflang:** `tr`, `en` ve `x-default` alternates — iki dilli sitemap dahil.
- **Görsel arama:** Sanity CDN üzerinden AVIF/WebP, betimleyici alt metinler
  (boşsa algoritmik üretim), `max-image-preview: large`.
- **Canonical URL'ler** ve deterministik `/` → `/tr` (308) yönlendirmesi.

### Yayın sonrası kontrol listesi
1. [Google Search Console](https://search.google.com/search-console)'a
   `zerrincirit.com`u ekleyin, `https://zerrincirit.com/sitemap.xml` gönderin.
2. [Bing Webmaster Tools](https://www.bing.com/webmasters)'a da aynısını yapın.
3. Zengin sonuçları test edin: https://search.google.com/test/rich-results
4. Link önizlemesini test edin: https://developers.facebook.com/tools/debug/
5. Pinterest için siteyi doğrulayın: https://help.pinterest.com/en/business/article/claim-your-website
