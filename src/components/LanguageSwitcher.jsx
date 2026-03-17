import { useLang } from '../context/LanguageContext'

export default function LanguageSwitcher({ dark = false }) {
  const { lang, setLanguage } = useLang()

  const base = 'text-xs font-medium tracking-widest transition-colors duration-200 px-1'
  const active = dark ? 'text-ardea-cobalt' : 'text-ardea-cobalt'
  const inactive = dark ? 'text-white/50 hover:text-white' : 'text-ardea-text-muted hover:text-ardea-text'
  const divider = dark ? 'text-white/20' : 'text-ardea-gray'

  return (
    <div className="flex items-center gap-1 select-none">
      <button
        onClick={() => setLanguage('tr')}
        className={`${base} ${lang === 'tr' ? active : inactive}`}
        aria-label="Türkçe"
      >
        TR
      </button>
      <span className={divider}>|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`${base} ${lang === 'en' ? active : inactive}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
