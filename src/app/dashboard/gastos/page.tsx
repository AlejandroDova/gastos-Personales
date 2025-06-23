'use client'

import ExpenseList from '@/components/Dashboard/ExpenseList'
import useStore from '../../../store/store'
import { useState } from 'react'

export default function ExpensesPage() {
  const { expenses, addExpense, removeExpense } = useStore()
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpense.description || !newExpense.amount) return
    
    addExpense({
      description: newExpense.description,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date
    })
    
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gastos</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Agregar nuevo gasto</h2>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
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
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <input
                type="text"
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
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
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Agregar Gasto
          </button>
        </form>
      </div>
      
      <ExpenseList expenses={expenses} onRemove={removeExpense} />
    </div>
  )
}