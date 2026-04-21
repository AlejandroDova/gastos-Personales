import { TrashIcon } from '@heroicons/react/24/outline'
import { Income } from '../../store/store'

export default function IncomeList({
  incomes,
  onRemove
}: {
  incomes: Income[]
  onRemove: (id: string) => void
}) {
  if (incomes.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No hay ingresos registrados</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Lista de Ingresos</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {incomes.map((income) => (
          <div key={income.id} className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{income.description}</p>
              <p className="text-sm text-gray-500">
                {income.source} • {new Date(income.date).toLocaleDateString()}
                {income.recurring && <span className="ml-2 text-indigo-500">↻ {income.recurring}</span>}
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-green-600 mr-4">+${income.amount.toFixed(2)}</span>
              <button
                onClick={() => onRemove(income.id)}
                className="text-red-600 hover:text-red-900"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
