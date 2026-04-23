'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp, confirmSignUp, confirmNewPassword, getIdToken } from '../../lib/auth'

type Mode = 'login' | 'register' | 'confirm' | 'newPassword'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        const result = await signIn(email, password)
        if (!result.isSignedIn) {
          if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
            setMode('newPassword')
            return
          }
          setError(`Paso requerido: ${result.nextStep?.signInStep}`)
          return
        }
        router.push('/dashboard')
      } else if (mode === 'newPassword') {
        const result = await confirmNewPassword(newPassword, { nickname })
        if (!result.isSignedIn) {
          setError(`Paso: ${result.nextStep?.signInStep}`)
          return
        }
        router.push('/dashboard')
      } else if (mode === 'register') {
        await signUp(email, password)
        setMode('confirm')
      } else {
        await confirmSignUp(email, code)
        setMode('login')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {mode === 'login' ? 'Iniciar sesión' : mode === 'register' ? 'Crear cuenta' : mode === 'newPassword' ? 'Nueva contraseña' : 'Confirmar cuenta'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === 'login' || mode === 'register') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </>
          )}

          {mode === 'confirm' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Código de confirmación</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {mode === 'newPassword' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">Mínimo 8 caracteres, mayúscula, número y símbolo</p>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : mode === 'register' ? 'Registrarse' : mode === 'newPassword' ? 'Guardar contraseña' : 'Confirmar'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          {mode === 'login' ? (
            <button onClick={() => setMode('register')} className="text-indigo-600 hover:underline">
              ¿No tienes cuenta? Regístrate
            </button>
          ) : mode === 'register' ? (
            <button onClick={() => setMode('login')} className="text-indigo-600 hover:underline">
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          ) : (
            <button onClick={() => setMode('login')} className="text-indigo-600 hover:underline">
              Volver al login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
