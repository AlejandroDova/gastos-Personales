import { RecurringFrequency } from 'src/store/store'

const FREQUENCY_LABELS: Record<RecurringFrequency, string> = {
  weekly: 'Semanal',
  biweekly: 'Quincenal',
  monthly: 'Mensual',
  yearly: 'Anual',
}

export const FREQUENCY_BADGE_COLORS: Record<RecurringFrequency, string> = {
  weekly: 'bg-blue-100 text-blue-700',
  biweekly: 'bg-purple-100 text-purple-700',
  monthly: 'bg-orange-100 text-orange-700',
  yearly: 'bg-rose-100 text-rose-700',
}

export function frequencyLabel(f: RecurringFrequency) {
  return FREQUENCY_LABELS[f]
}

export default function RecurringSelect({
  enabled,
  frequency,
  onToggle,
  onFrequencyChange,
}: {
  enabled: boolean
  frequency: RecurringFrequency
  onToggle: (v: boolean) => void
  onFrequencyChange: (v: RecurringFrequency) => void
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        Recurrente
      </label>
      {enabled && (
        <select
          value={frequency}
          onChange={(e) => onFrequencyChange(e.target.value as RecurringFrequency)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {(Object.entries(FREQUENCY_LABELS) as [RecurringFrequency, string][]).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      )}
    </div>
  )
}
