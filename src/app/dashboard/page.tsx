'use client'

import ExpenseChart from '@/components/Dashboard/ExpenseChart'
import IncomeChart from '@/components/Dashboard/IncomeChart'
import SummaryCards from '@/components/Dashboard/SummaryCards'
import useStore from '../../store/store'

export default function DashboardPage() {
  const { expenses, debts, incomes } = useStore()

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const totalDebts = debts.reduce((sum, d) => sum + d.amount, 0)
  const pendingDebts = debts.filter((d) => !d.paid).reduce((sum, d) => sum + d.amount, 0)
  const totalIncomes = incomes.reduce((sum, i) => sum + i.amount, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h1>

      <SummaryCards
        totalExpenses={totalExpenses}
        totalDebts={totalDebts}
        pendingDebts={pendingDebts}
        totalIncomes={totalIncomes}
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ExpenseChart expenses={expenses} />
        <IncomeChart incomes={incomes} />
      </div>
    </div>
  )
}
