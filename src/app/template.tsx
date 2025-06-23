'use client'
import { ReactNode } from 'react'
import Navbar from '../components/Dashboard/Navbar'
import Sidebar from '../components/Dashboard/Sidebar'

export default function DashboardTemplate({ children }: { children: ReactNode }) {
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