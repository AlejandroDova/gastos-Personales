import Link from 'next/link'

const navigation = [
  { name: 'Inicio', href: '/dashboard', icon: '🏠' },
  { name: 'Gastos', href: '/dashboard/gastos', icon: '💸' },
  { name: 'Deudas', href: '/dashboard/deudas', icon: '📝' },
]

export default function Sidebar() {
  return (
    <>
      {/* Sidebar móvil (implementar lógica de toggle) */}
      
      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pb-4 lg:pt-5">
        <div className="flex items-center flex-shrink-0 px-6">
          <h1 className="text-xl font-semibold text-gray-900">Mis Gastos</h1>
        </div>
        <div className="mt-5 flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}