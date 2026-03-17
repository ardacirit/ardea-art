import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'
import { useSanityQuery } from '../hooks/useSanity'
import { SITE_SETTINGS_QUERY } from '../lib/queries'

export default function Contact() {
  const { lang } = useLang()
  const { data: settings } = useSanityQuery(SITE_SETTINGS_QUERY)

  const whatsappNumber = settings?.whatsappNumber || '905XXXXXXXXX'
  const instagramHandle = settings?.instagramHandle || 'ardea.art'

  const waMsg = lang === 'tr'
    ? 'Merhaba! Ardea Art hakkında bilgi almak istiyorum.'
    : 'Hello! I would like to learn more about Ardea Art.'

  return (
    <main className="pt-28 pb-24">
      {/* Header */}
      <div className="bg-ardea-bej py-16 px-6 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">{tr(t.contact.label, lang)}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ardea-text leading-tight mt-2">
            {tr(t.contact.title, lang)}
          </h1>
          <p className="section-subtitle mx-auto text-center mt-4 max-w-xl">
            {tr(t.contact.subtitle, lang)}
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-2xl mx-auto px-6 space-y-6">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-6 p-8 bg-[#25D366]/5 border border-[#25D366]/30
                     hover:bg-[#25D366]/10 transition-all duration-300 group"
        >
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-serif text-xl text-ardea-text group-hover:text-[#25D366] transition-colors duration-200 mb-1">
              WhatsApp
            </p>
            <p className="text-ardea-text-soft text-sm">
              {lang === 'tr' ? 'Hızlı cevap için WhatsApp\'tan yazın' : 'Message us on WhatsApp for a quick reply'}
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ardea-text-muted group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href={`https://instagram.com/${instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-6 p-8 bg-pink-50/60 border border-pink-100
                     hover:bg-pink-50 transition-all duration-300 group"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-serif text-xl text-ardea-text group-hover:text-pink-600 transition-colors duration-200 mb-1">
              @{instagramHandle}
            </p>
            <p className="text-ardea-text-soft text-sm">
              {lang === 'tr' ? 'Güncel eserler ve atölye anları' : 'Latest works and studio moments'}
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ardea-text-muted group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Özel Sipariş Notu */}
        <div className="p-8 bg-ardea-bej border-l-4 border-ardea-cobalt mt-8">
          <p className="font-serif text-lg text-ardea-text mb-2">
            {lang === 'tr' ? 'Özel Sipariş' : 'Custom Orders'}
          </p>
          <p className="text-ardea-text-soft text-sm leading-relaxed">
            {lang === 'tr'
              ? 'Boyut, renk veya desen konusunda özelleştirilmiş eserler için WhatsApp\'tan yazabilirsiniz. Her özel sipariş için kişisel danışma sunuyorum.'
              : 'For personalised works in specific sizes, colours or patterns, reach out via WhatsApp. I offer a personal consultation for every custom order.'}
          </p>
        </div>
      </div>
    </main>
  )
}
