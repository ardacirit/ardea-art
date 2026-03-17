import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ardea-lang') || 'tr'
  })

  const toggleLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    setLang(next)
    localStorage.setItem('ardea-lang', next)
  }

  const setLanguage = (l) => {
    setLang(l)
    localStorage.setItem('ardea-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
