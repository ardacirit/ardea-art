import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

const WHATSAPP_NUMBER = '905XXXXXXXXX'
const INSTAGRAM_HANDLE = 'ardea.art'

export default function Contact() {
  const { lang } = useLang()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // TODO: Wire up to EmailJS / Formspree / your backend
    setSent(true)
  }

  const waMsg = lang === 'tr'
    ? 'Merhaba! Ardea Art hakkında bilgi almak istiyorum.'
    : 'Hello! I would like to learn more about Ardea Art.'

  return (
    <main className="pt-28 pb-24">
      {/* Header */}
      <div className="bg-ardea-bej py-16 px-6 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">{tr(t.contact.label, lang)}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ardea-text leading-tight mt-2">
            {tr(t.contact.title, lang)}
          </h1>
          <p className="section-subtitle mx-auto text-center mt-4">
            {tr(t.contact.subtitle, lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Contact Form ───────────────────────────────── */}
          <div>
            {sent ? (
              <div className="p-10 bg-ardea-cobalt-pale border border-ardea-cobalt/20 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-ardea-cobalt mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-serif text-xl text-ardea-text">{tr(t.contact.successMsg, lang)}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-ardea-text-muted mb-2">
                    {tr(t.contact.namePlaceholder, lang)}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handle}
                    placeholder={tr(t.contact.namePlaceholder, lang)}
                    className="w-full border border-ardea-gray bg-white px-4 py-3 text-ardea-text placeholder:text-ardea-text-muted
                               focus:outline-none focus:border-ardea-cobalt transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-ardea-text-muted mb-2">
                    {tr(t.contact.emailPlaceholder, lang)}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handle}
                    placeholder={tr(t.contact.emailPlaceholder, lang)}
                    className="w-full border border-ardea-gray bg-white px-4 py-3 text-ardea-text placeholder:text-ardea-text-muted
                               focus:outline-none focus:border-ardea-cobalt transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-ardea-text-muted mb-2">
                    {tr(t.contact.messagePlaceholder, lang)}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handle}
                    placeholder={tr(t.contact.messagePlaceholder, lang)}
                    className="w-full border border-ardea-gray bg-white px-4 py-3 text-ardea-text placeholder:text-ardea-text-muted
                               focus:outline-none focus:border-ardea-cobalt transition-colors duration-200 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  {tr(t.contact.send, lang)}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* ── Info Panel ────────────────────────────────── */}
          <div className="space-y-8">
            {/* Quick contact cards */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-[#25D366]/5 border border-[#25D366]/30
                         hover:bg-[#25D366]/10 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-ardea-text group-hover:text-[#25D366] transition-colors duration-200">
                  WhatsApp
                </p>
                <p className="text-ardea-text-muted text-sm">
                  {tr(t.contact.whatsapp, lang)}
                </p>
              </div>
            </a>

            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-pink-50 border border-pink-100
                         hover:bg-pink-100/50 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" strokeWidth={2} />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-ardea-text group-hover:text-pink-600 transition-colors duration-200">
                  Instagram
                </p>
                <p className="text-ardea-text-muted text-sm">
                  @{INSTAGRAM_HANDLE}
                </p>
              </div>
            </a>

            {/* Note */}
            <div className="p-6 bg-ardea-bej border-l-2 border-ardea-cobalt">
              <p className="font-serif text-ardea-text mb-2">
                {lang === 'tr' ? 'Özel Sipariş' : 'Custom Orders'}
              </p>
              <p className="text-ardea-text-soft text-sm leading-relaxed">
                {lang === 'tr'
                  ? 'Boyut, renk veya desen konusunda özelleştirilmiş eserler için lütfen mesajlaşın. Her özel sipariş için kişisel danışma sunuyorum.'
                  : 'For personalised works in specific sizes, colours or patterns, please get in touch. I offer a personal consultation for every custom order.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
