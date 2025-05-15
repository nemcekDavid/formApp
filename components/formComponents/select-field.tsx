import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type EnumFieldProps = FieldProps & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}

const EnumField: React.FC<EnumFieldProps> = ({ label, required, value, onChange, error, options = [] }) => {
  const lowerLabel = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={lowerLabel} className="font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={lowerLabel}
        name={lowerLabel}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">-- Select an option --</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default EnumField
