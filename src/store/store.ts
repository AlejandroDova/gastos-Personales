import { create } from 'zustand'

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface Debt {
  id: number;
  description: string;
  amount: number;
  paid: boolean;
  dueDate: string;
}

interface StoreState {
  expenses: Expense[];
  debts: Debt[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: number) => void;
  addDebt: (debt: Omit<Debt, 'id' | 'paid'>) => void;
  payDebt: (id: number) => void;
  loadSampleData: () => void;
  removeDebt: (id: number) => void;
}

const useStore = create<StoreState>((set) => ({
  expenses: [],
  debts: [],
  
  addExpense: (expense) => 
    set((state) => ({ 
      expenses: [...state.expenses, { ...expense, id: Date.now() }] 
    })),
  
  removeExpense: (id) => 
    set((state) => ({ expenses: state.expenses.filter(e => e.id !== id) })),
  
  addDebt: (debt) => 
    set((state) => ({ 
      debts: [...state.debts, { ...debt, id: Date.now(), paid: false }] 
    })),
  
  payDebt: (id) => 
    set((state) => ({ 
      debts: state.debts.map(d => 
        d.id === id ? { ...d, paid: true } : d
      ) 
    })),
  
  loadSampleData: () => set({
    expenses: [
      { id: 1, description: 'Comida', amount: 150, category: 'Alimentos', date: '2023-05-15' },
      { id: 2, description: 'Transporte', amount: 50, category: 'Transporte', date: '2023-05-16' },
      { id: 3, description: 'Entretenimiento', amount: 200, category: 'Ocio', date: '2023-05-17' },
    ],
    debts: [
      { id: 1, description: 'Préstamo Juan', amount: 1000, paid: false, dueDate: '2023-06-30' },
      { id: 2, description: 'Tarjeta crédito', amount: 500, paid: true, dueDate: '2023-05-20' },
    ]
  }),
   removeDebt: (id) => 
    set((state) => ({ 
      debts: state.debts.filter(d => d.id !== id) 
    }))
}))

export default useStore