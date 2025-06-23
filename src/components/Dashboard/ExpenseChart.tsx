'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Expense } from 'src/store/store'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  // Agrupar gastos por categoría
  const categories: Record<string, number> = {}
  expenses.forEach(expense => {
    const category = expense.category || 'Otros'
    categories[category] = (categories[category] || 0) + expense.amount
  })

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          '#6366F1',
          '#EC4899',
          '#10B981',
          '#F59E0B',
          '#3B82F6',
          '#EF4444',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Gastos por categoría</h2>
      <div className="h-64">
        {expenses.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p className="text-gray-500 text-center py-8">No hay datos para mostrar</p>
        )}
      </div>
    </div>
  )
}