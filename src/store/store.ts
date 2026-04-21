import { create } from 'zustand'
import { api, type DebtAPI, type ExpenseAPI, type IncomeAPI } from '../lib/api'

export type RecurringFrequency = 'weekly' | 'biweekly' | 'monthly' | 'yearly'

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  recurring?: RecurringFrequency | null
}

export interface Debt {
  id: string
  description: string
  amount: number
  paid: boolean
  dueDate: string
}

export interface Income {
  id: string
  description: string
  amount: number
  source: string
  date: string
  recurring?: RecurringFrequency | null
}

interface StoreState {
  expenses: Expense[]
  debts: Debt[]
  incomes: Income[]
  loading: boolean
  error: string | null

  fetchAll: () => Promise<void>

  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>
  updateExpense: (id: string, data: Partial<Omit<Expense, 'id'>>) => Promise<void>
  removeExpense: (id: string) => Promise<void>

  addDebt: (debt: Omit<Debt, 'id' | 'paid'>) => Promise<void>
  updateDebt: (id: string, data: Partial<Omit<Debt, 'id'>>) => Promise<void>
  payDebt: (id: string) => Promise<void>
  removeDebt: (id: string) => Promise<void>

  addIncome: (income: Omit<Income, 'id'>) => Promise<void>
  updateIncome: (id: string, data: Partial<Omit<Income, 'id'>>) => Promise<void>
  removeIncome: (id: string) => Promise<void>
}

function toExpense(e: ExpenseAPI): Expense {
  return {
    id: e.id,
    description: e.description,
    amount: e.amount,
    category: e.category,
    date: e.date,
    recurring: e.recurring as RecurringFrequency | null | undefined,
  }
}

function toDebt(d: DebtAPI): Debt {
  return {
    id: d.id,
    description: d.description,
    amount: d.amount,
    paid: d.paid,
    dueDate: d.due_date,
  }
}

function toIncome(i: IncomeAPI): Income {
  return {
    id: i.id,
    description: i.description,
    amount: i.amount,
    source: i.source,
    date: i.date,
    recurring: i.recurring as RecurringFrequency | null | undefined,
  }
}

const useStore = create<StoreState>((set) => ({
  expenses: [],
  debts: [],
  incomes: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null })
    try {
      const [expRes, debtRes, incRes] = await Promise.all([
        api.expenses.list(),
        api.debts.list(),
        api.incomes.list(),
      ])
      set({
        expenses: expRes.items.map(toExpense),
        debts: debtRes.items.map(toDebt),
        incomes: incRes.items.map(toIncome),
        loading: false,
      })
    } catch (e) {
      set({ loading: false, error: (e as Error).message })
    }
  },

  addExpense: async (expense) => {
    const created = await api.expenses.create(expense)
    set((s) => ({ expenses: [toExpense(created), ...s.expenses] }))
  },

  updateExpense: async (id, data) => {
    const updated = await api.expenses.update(id, data)
    set((s) => ({ expenses: s.expenses.map((e) => (e.id === id ? toExpense(updated) : e)) }))
  },

  removeExpense: async (id) => {
    await api.expenses.remove(id)
    set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) }))
  },

  addDebt: async (debt) => {
    const created = await api.debts.create({
      description: debt.description,
      amount: debt.amount,
      due_date: debt.dueDate,
    })
    set((s) => ({ debts: [toDebt(created), ...s.debts] }))
  },

  updateDebt: async (id, data) => {
    const payload: Partial<DebtAPI> = {
      ...(data.description !== undefined && { description: data.description }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.paid !== undefined && { paid: data.paid }),
      ...(data.dueDate !== undefined && { due_date: data.dueDate }),
    }
    const updated = await api.debts.update(id, payload)
    set((s) => ({ debts: s.debts.map((d) => (d.id === id ? toDebt(updated) : d)) }))
  },

  payDebt: async (id) => {
    const updated = await api.debts.pay(id)
    set((s) => ({ debts: s.debts.map((d) => (d.id === id ? toDebt(updated) : d)) }))
  },

  removeDebt: async (id) => {
    await api.debts.remove(id)
    set((s) => ({ debts: s.debts.filter((d) => d.id !== id) }))
  },

  addIncome: async (income) => {
    const created = await api.incomes.create(income)
    set((s) => ({ incomes: [toIncome(created), ...s.incomes] }))
  },

  updateIncome: async (id, data) => {
    const updated = await api.incomes.update(id, data)
    set((s) => ({ incomes: s.incomes.map((i) => (i.id === id ? toIncome(updated) : i)) }))
  },

  removeIncome: async (id) => {
    await api.incomes.remove(id)
    set((s) => ({ incomes: s.incomes.filter((i) => i.id !== id) }))
  },
}))

export default useStore
