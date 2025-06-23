'use client'

import ExpenseChart from '@/components/Dashboard/ExpenseChart'
import SummaryCards from '@/components/Dashboard/SummaryCards'
import useStore from '../../store/store'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { expenses, debts, loadSampleData } = useStore()

  useEffect(() => {
    if (expenses.length === 0 && debts.length === 0) {
      loadSampleData()
    }
  }, [expenses, debts, loadSampleData])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalDebts = debts.reduce((sum, debt) => sum + debt.amount, 0)
  const pendingDebts = debts.filter(d => !d.paid).reduce((sum, debt) => sum + debt.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h1>
      
      <SummaryCards 
        totalExpenses={totalExpenses} 
        totalDebts={totalDebts} 
        pendingDebts={pendingDebts} 
      />
      
      <div className="mt-8">
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  )
}