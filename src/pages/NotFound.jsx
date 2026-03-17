import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t, tr } from '../data/translations'

export default function NotFound() {
  const { lang } = useLang()
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-8xl text-ardea-gray font-medium mb-6">404</p>
      <h1 className="font-serif text-2xl text-ardea-text mb-4">{tr(t.common.notFound, lang)}</h1>
      <Link to="/" className="btn-outline">{tr(t.common.backHome, lang)}</Link>
    </main>
  )
}
