'use client'

import DebtList from '@/components/Dashboard/DebtList'
import  useStore  from 'src/store/store'
import { useState } from 'react'

export default function DebtsPage() {
  const { debts, addDebt, payDebt, removeDebt } = useStore();
  const [newDebt, setNewDebt] = useState({
    description: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0]
  })

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDebt.description || !newDebt.amount) return
    
    addDebt({
      description: newDebt.description,
      amount: Number(newDebt.amount),
      dueDate: newDebt.dueDate
    })
    
    setNewDebt({
      description: '',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Deudas</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Agregar nueva deuda</h2>
        <form onSubmit={handleAddDebt} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                id="description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newDebt.description}
                onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
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
                value={newDebt.amount}
                onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newDebt.dueDate}
              onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Agregar Deuda
          </button>
        </form>
      </div>
      
      <DebtList debts={debts} onPay={payDebt} onRemove={removeDebt} />
    </div>
  )
}