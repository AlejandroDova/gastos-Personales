import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex">
            <button
              type="button"
              className="text-gray-500 lg:hidden"
              onClick={() => console.log('Abrir sidebar')} // Implementar lógica de sidebar móvil
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Mis Gastos</h1>
          </div>
        </div>
      </div>
    </div>
  )
}