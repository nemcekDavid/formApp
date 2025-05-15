import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type BooleanFieldProps = FieldProps & {
  value: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const CheckBoxField: React.FC<BooleanFieldProps> = ({
  label,
  required,
  value,
  onChange,
  error,
}) => {
  const lowerLabel = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="mb-4">
      <label htmlFor={lowerLabel} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          id={lowerLabel}
          name={lowerLabel}
          checked={value}
          onChange={onChange}
          required={required}
          className="accent-blue-500"
        />
        <span className="font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default CheckBoxField
