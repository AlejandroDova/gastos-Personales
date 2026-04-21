'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Income } from 'src/store/store'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function IncomeChart({ incomes }: { incomes: Income[] }) {
  const sources: Record<string, number> = {}
  incomes.forEach(income => {
    const source = income.source || 'Otros'
    sources[source] = (sources[source] || 0) + income.amount
  })

  const data = {
    labels: Object.keys(sources),
    datasets: [
      {
        data: Object.values(sources),
        backgroundColor: [
          '#10B981',
          '#34D399',
          '#6EE7B7',
          '#059669',
          '#047857',
          '#065F46',
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
      <h2 className="text-lg font-medium text-gray-900 mb-4">Ingresos por fuente</h2>
      <div className="h-64">
        {incomes.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p className="text-gray-500 text-center py-8">No hay datos para mostrar</p>
        )}
      </div>
    </div>
  )
}
