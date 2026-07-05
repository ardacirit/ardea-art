import React from 'react'

/* Yönetim panelinin en üstünde duran, kod bilmeyenler için yazılmış kullanım
   kılavuzu. Sanity'nin structure tool'unda S.component ile gösterilir. */

const styles = {
  wrap: {
    padding: '32px 40px 64px',
    maxWidth: 760,
    lineHeight: 1.75,
    fontSize: 14,
  },
  h1: { fontSize: 24, fontWeight: 700, marginBottom: 8 },
  lead: { fontSize: 15, opacity: 0.85, marginBottom: 28 },
  h2: {
    fontSize: 17,
    fontWeight: 700,
    marginTop: 32,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '1px solid rgba(128,128,128,0.25)',
  },
  ol: { paddingLeft: 22, margin: '8px 0' },
  li: { marginBottom: 6 },
  tip: {
    background: 'rgba(22, 65, 140, 0.08)',
    border: '1px solid rgba(22, 65, 140, 0.2)',
    borderRadius: 6,
    padding: '12px 16px',
    margin: '16px 0',
  },
  ok: { fontWeight: 600 },
}

export default function GuidePanel() {
  return (
    <div style={styles.wrap}>
      <h1 style={styles.h1}>📖 Hoş geldiniz! Bu panel nasıl kullanılır?</h1>
      <p style={styles.lead}>
        Buradan sitenizdeki her şeyi kendiniz yönetebilirsiniz — kod yok,
        korkulacak bir şey yok. Tek altın kural:{' '}
        <span style={styles.ok}>
          sağ alttaki yeşil <b>Publish</b> düğmesine basmadığınız sürece hiçbir
          değişiklik canlı sitede görünmez.
        </span>{' '}
        Yani gönül rahatlığıyla deneyebilirsiniz.
      </p>

      <div style={styles.tip}>
        💡 <b>Publish'e bastıktan sonra</b> sitenin güncellenmesi en fazla{' '}
        <b>1 dakika</b> sürer. Sayfayı yenileyip kontrol edebilirsiniz. Kimseyi
        aramanıza gerek yok.
      </div>

      <h2 style={styles.h2}>🖼️ Yeni eser eklemek</h2>
      <ol style={styles.ol}>
        <li style={styles.li}>Soldaki menüden <b>🖼️ Eserler</b>'e tıklayın.</li>
        <li style={styles.li}>Sağ üstteki <b>kalem/artı (+)</b> işaretine basın.</li>
        <li style={styles.li}>Eser adını <b>Türkçe ve İngilizce</b> yazın, <b>Kategori</b> seçin.</li>
        <li style={styles.li}><b>Web Adresi</b> alanında <b>Generate</b> düğmesine bir kez basın.</li>
        <li style={styles.li}>
          <b>📷 Fotoğraflar</b> sekmesine geçip fotoğrafı sürükleyip bırakın.
          Fotoğrafa tıklayıp ortadaki yuvarlağı kaydırarak <b>odak noktasını</b> seçebilirsiniz.
        </li>
        <li style={styles.li}>
          <b>📐 Eser Detayları</b> sekmesine yıl, ölçü ve tekniği;{' '}
          <b>💰 Satış</b> sekmesine fiyatı yazın. (Fiyatı boş bırakırsanız sitede
          "Fiyat için iletişime geçin" yazar — bu da gayet şıktır.)
        </li>
        <li style={styles.li}>Sağ alttaki <b>Publish</b>'e basın. Bu kadar! 🎉</li>
      </ol>

      <h2 style={styles.h2}>⭐ Ana sayfada hangi eserler görünür?</h2>
      <p>
        Eserin <b>"⭐ Ana Sayfada Göster?"</b> düğmesini açarsanız o eser ana
        sayfadaki "Seçme Eserler" bölümünde öne çıkar. <b>4–6 eser</b>{' '}
        işaretlemeniz en güzel görüntüyü verir. Hiç işaretlemezseniz site en
        yeni eserleri kendisi seçer.
      </p>

      <h2 style={styles.h2}>📂 Yeni kategori (koleksiyon) açmak</h2>
      <p>
        <b>📂 Kategoriler → +</b> ile yeni kategori oluşturup Publish'leyin.
        Sitede menüsü, filtre düğmesi ve sayfası <b>kendiliğinden</b> oluşur.
        Önemli: kategori, içine <b>en az bir eser</b> ekleyene kadar sitede
        gizli kalır — böylece ziyaretçiler boş raf görmez.
      </p>

      <h2 style={styles.h2}>✍️ Blog yazısı yazmak</h2>
      <ol style={styles.ol}>
        <li style={styles.li}><b>✍️ Blog Yazıları → +</b></li>
        <li style={styles.li}>Başlık yazın, <b>Generate</b>'e basın, kapak fotoğrafı ekleyin.</li>
        <li style={styles.li}>
          <b>Kısa Özet</b>'i mutlaka doldurun — Google'da başlığın altında bu
          görünür.
        </li>
        <li style={styles.li}>İçeriği yazın (araya fotoğraf da ekleyebilirsiniz) ve Publish'leyin.</li>
      </ol>

      <h2 style={styles.h2}>⚙️ Site yazıları, fotoğraflar, iletişim</h2>
      <p>
        <b>⚙️ Site Ayarları</b>'nda her şey sekmeler halinde durur: ana sayfa
        yazıları ve slaytları, Hakkımda paragrafları, WhatsApp numarası,
        Instagram, Google açıklaması… Bir yazıyı değiştirin, Publish'leyin,
        1 dakika içinde sitede.
      </p>

      <h2 style={styles.h2}>📸 Güzel fotoğraf için 3 küçük kural</h2>
      <ol style={styles.ol}>
        <li style={styles.li}>Gün ışığında, gölgesiz çekin (pencere kenarı idealdir).</li>
        <li style={styles.li}>Telefonla çekebilirsiniz — fotoğraf <b>net ve büyük</b> olsun yeter.</li>
        <li style={styles.li}>
          "Fotoğraf Açıklaması" kutusuna fotoğrafta <b>ne göründüğünü</b> yazın.
          Örnek: <i>"Kobalt mavisi lale desenli el yapımı çini tabak"</i>.
          Google Görseller eserlerinizi bu sayede bulur.
        </li>
      </ol>

      <h2 style={styles.h2}>😌 Bir şey ters giderse</h2>
      <p>
        Panikelemeyin: Publish'e basmadıysanız hiçbir şey olmamıştır — sayfadan
        çıkın, yeter. Yanlışlıkla Publish'lediyseniz belgeyi açıp sağ alttaki{' '}
        <b>⋮ menüsünden "Revert to last published / önceki sürüme dön"</b>{' '}
        seçebilir ya da değeri elle düzeltip tekrar Publish'leyebilirsiniz.
        İçinden çıkamazsanız oğlunuzu arayın. ☕
      </p>
    </div>
  )
}
