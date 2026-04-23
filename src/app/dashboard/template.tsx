'use client'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Dashboard/Navbar'
import Sidebar from '../../components/Dashboard/Sidebar'
import { getIdToken } from '../../lib/auth'
import useStore from '../../store/store'

export default function DashboardTemplate({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const fetchAll = useStore((s) => s.fetchAll)

  useEffect(() => {
    let done = false
    const timeout = setTimeout(() => {
      if (!done) {
        console.warn('template: getIdToken timeout → /login')
        router.replace('/login')
      }
    }, 3000)

    getIdToken()
      .then((token) => {
        done = true
        clearTimeout(timeout)
        console.log('template token:', token ? 'found' : 'none')
        if (!token) {
          router.replace('/login')
        } else {
          fetchAll().finally(() => setChecking(false))
        }
      })
      .catch((err) => {
        done = true
        clearTimeout(timeout)
        console.error('template getIdToken error:', err)
        router.replace('/login')
      })

    return () => clearTimeout(timeout)
  }, [fetchAll, router])

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
