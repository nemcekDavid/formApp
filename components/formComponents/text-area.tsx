import React from 'react'
import { FieldProps } from '@/types/fieldProps'

type TextAreaFieldProps = FieldProps & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, required, value, onChange, error }) => {
  const lowerLabel = label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={lowerLabel} className="font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={lowerLabel}
        name={lowerLabel}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded min-h-[100px] resize-y"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default TextAreaField
