import { useState, useEffect } from 'react'
import { client } from '../lib/sanity.js'

export function useSanityQuery(query, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    client
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Sanity fetch failed, using static data:', err.message)
          setError(err)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
