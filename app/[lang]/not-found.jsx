import Link from 'next/link'

/** Rendered inside the [lang] layout for missing slugs and unknown paths.
 *  Bilingual by design — the not-found boundary has no access to params. */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="font-display text-8xl text-line">404</p>
      <h1 className="mt-6 font-display text-3xl text-ink">Sayfa Bulunamadı</h1>
      <p className="mt-3 max-w-md leading-relaxed text-smoke">
        Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.
        <br />
        <span className="text-faint">
          The page you are looking for may have moved or never existed.
        </span>
      </p>
      <Link href="/tr" className="btn-primary mt-10">
        Ana sayfaya dön / Back to home
      </Link>
    </div>
  )
}
