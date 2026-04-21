'use client'

import IncomeList from '@/components/Dashboard/IncomeList'
import useStore from '../../../store/store'
import { useState } from 'react'

export default function IngresosPage() {
  const { incomes, addIncome, removeIncome } = useStore()
  const [newIncome, setNewIncome] = useState({
    description: '',
    amount: '',
    source: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [submitting, setSubmitting] = useState(false)

  const handleAddIncome = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIncome.description || !newIncome.amount) return
    setSubmitting(true)
    try {
      await addIncome({
        description: newIncome.description,
        amount: Number(newIncome.amount),
        source: newIncome.source,
        date: newIncome.date
      })
      setNewIncome({
        description: '',
        amount: '',
        source: '',
        date: new Date().toISOString().split('T')[0]
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ingresos</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Agregar nuevo ingreso</h2>
        <form onSubmit={handleAddIncome} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newIncome.description}
                onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                id="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                Fuente
              </label>
              <input
                type="text"
                id="source"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newIncome.source}
                onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newIncome.date}
                onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {submitting ? 'Guardando...' : 'Agregar Ingreso'}
          </button>
        </form>
      </div>

      <IncomeList incomes={incomes} onRemove={removeIncome} />
    </div>
  )
}
