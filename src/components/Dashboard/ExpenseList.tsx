import { TrashIcon } from '@heroicons/react/24/outline'
import {Expense} from '../../store/store'

export default function ExpenseList({ 
  expenses, 
  onRemove 
}: {
  expenses: Expense[]
  onRemove: (id: number) => void
}) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No hay gastos registrados</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Lista de Gastos</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <div key={expense.id} className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{expense.description}</p>
              <p className="text-sm text-gray-500">
                {expense.category} • {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-4">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onRemove(expense.id)}
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