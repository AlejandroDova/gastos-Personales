'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getIdToken } from '../lib/auth'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    let done = false
    const timeout = setTimeout(() => {
      if (!done) {
        console.warn('getIdToken timeout, redirecting to /login')
        router.replace('/login')
      }
    }, 3000)

    getIdToken()
      .then((token) => {
        done = true
        clearTimeout(timeout)
        console.log('token check:', token ? 'found' : 'none')
        router.replace(token ? '/dashboard' : '/login')
      })
      .catch((err) => {
        done = true
        clearTimeout(timeout)
        console.error('getIdToken error:', err)
        router.replace('/login')
      })

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Cargando...</p>
    </div>
  )
}
