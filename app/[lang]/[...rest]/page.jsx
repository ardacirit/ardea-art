import { notFound } from 'next/navigation'

/** Catch-all: any unknown path under /tr or /en renders the localized 404. */
export default function CatchAll() {
  notFound()
}
