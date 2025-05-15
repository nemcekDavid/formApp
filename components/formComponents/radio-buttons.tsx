import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type RadioFieldProps = FieldProps & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  required,
  value,
  onChange,
  error,
  options = [],
}) => {
  const fieldName = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="mb-4">
      <p className="font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex gap-2">
        {options.map((option) => {
          const optionId = `${fieldName}-${option.toLowerCase().replace(/\s+/g, '-')}`
          return (
            <label key={option} htmlFor={optionId} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                id={optionId}
                name={fieldName}
                value={option}
                checked={value === option}
                onChange={onChange}
                required={required}
              />
              <span>{option}</span>
            </label>
          )
        })}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default RadioField
