import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Debt }  from '../../store/store'

interface DebtListProps {
  debts: Debt[];
  onPay: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function DebtList({ debts, onPay, onRemove }: DebtListProps) {
  if (debts.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">No hay deudas registradas</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Lista de Deudas</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {debts.map((debt) => (
          <div key={debt.id} className="px-6 py-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{debt.description}</p>
              <p className="text-sm text-gray-500">
                Vence el {new Date(debt.dueDate).toLocaleDateString()} • 
                <span className={`ml-2 ${debt.paid ? 'text-green-600' : 'text-red-600'}`}>
                  {debt.paid ? 'Pagada' : 'Pendiente'}
                </span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-4">${debt.amount.toFixed(2)}</span>
              {!debt.paid && (
                <button
                  onClick={() => onPay(debt.id)}
                  className="text-green-600 hover:text-green-900 mr-2"
                  aria-label="Marcar como pagada"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => onRemove(debt.id)}
                className="text-red-600 hover:text-red-900"
                aria-label="Eliminar deuda"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}