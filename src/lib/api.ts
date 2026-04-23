import { getIdToken, signOut } from './auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getIdToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (res.status === 401) {
    await signOut().catch(() => {})
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    throw new ApiError(401, 'Session expired')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }))
    throw new ApiError(res.status, body.message ?? res.statusText)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

// Expenses
export const api = {
  expenses: {
    list: (params?: Record<string, string>) =>
      request<{ items: ExpenseAPI[]; total: number }>(
        `/api/expenses${params ? '?' + new URLSearchParams(params) : ''}`
      ),
    create: (data: Omit<ExpenseAPI, 'id' | 'user_id' | 'created_at' | 'updated_at'>) =>
      request<ExpenseAPI>('/api/expenses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ExpenseAPI>) =>
      request<ExpenseAPI>(`/api/expenses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) =>
      request<void>(`/api/expenses/${id}`, { method: 'DELETE' }),
  },
  debts: {
    list: (params?: Record<string, string>) =>
      request<{ items: DebtAPI[]; total: number }>(
        `/api/debts${params ? '?' + new URLSearchParams(params) : ''}`
      ),
    create: (data: Omit<DebtAPI, 'id' | 'user_id' | 'paid' | 'created_at' | 'updated_at'>) =>
      request<DebtAPI>('/api/debts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<DebtAPI>) =>
      request<DebtAPI>(`/api/debts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    pay: (id: string) =>
      request<DebtAPI>(`/api/debts/${id}/pay`, { method: 'PATCH' }),
    remove: (id: string) =>
      request<void>(`/api/debts/${id}`, { method: 'DELETE' }),
  },
  incomes: {
    list: (params?: Record<string, string>) =>
      request<{ items: IncomeAPI[]; total: number }>(
        `/api/incomes${params ? '?' + new URLSearchParams(params) : ''}`
      ),
    create: (data: Omit<IncomeAPI, 'id' | 'user_id' | 'created_at' | 'updated_at'>) =>
      request<IncomeAPI>('/api/incomes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<IncomeAPI>) =>
      request<IncomeAPI>(`/api/incomes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) =>
      request<void>(`/api/incomes/${id}`, { method: 'DELETE' }),
  },
  summary: {
    get: (params?: Record<string, string>) =>
      request<SummaryAPI>(
        `/api/summary${params ? '?' + new URLSearchParams(params) : ''}`
      ),
  },
}

// API response shapes (snake_case from backend)
export interface ExpenseAPI {
  id: string
  user_id: string
  description: string
  amount: number
  category: string
  date: string
  recurring?: string | null
  created_at: string
  updated_at: string
}

export interface DebtAPI {
  id: string
  user_id: string
  description: string
  amount: number
  paid: boolean
  due_date: string
  created_at: string
  updated_at: string
}

export interface IncomeAPI {
  id: string
  user_id: string
  description: string
  amount: number
  source: string
  date: string
  recurring?: string | null
  created_at: string
  updated_at: string
}

export interface SummaryAPI {
  totals: {
    expenses: number
    incomes: number
    debts_pending: number
    debts_total: number
  }
  expenses_by_category: { category: string; total: number }[]
  incomes_by_source: { source: string; total: number }[]
}
