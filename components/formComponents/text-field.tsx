import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type TextFieldProps = FieldProps & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const TextField: React.FC<TextFieldProps> = ({ label, required, value, onChange, error }) => {
  const lowerLabel = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="md:max-w-1/2 mb-4">
      <label htmlFor={lowerLabel} className="flex mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
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

export default TextField
