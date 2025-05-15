import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type DateFieldProps = FieldProps & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const DateField: React.FC<DateFieldProps> = ({ label, required, value, onChange, error }) => {
  const lowerLabel = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col max-w-1/2 md:max-w-1/3 lg:max-w-1/4 gap-1 mb-4">
      <label htmlFor={lowerLabel} className="font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        id={lowerLabel}
        name={lowerLabel}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default DateField
