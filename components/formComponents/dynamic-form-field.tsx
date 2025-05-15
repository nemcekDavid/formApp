
import { FieldProps } from '@/types/fieldProps'
import TextField from './text-field'
import TextAreaField from './text-area'
import NumberField from './number-field'
import DateField from './date-field'
import CheckBoxField from './check-box-field'
import RadioField from './radio-buttons'

type DynamicFormFieldProps = {
  field: FieldProps
  value: string
  onChange: (name: string, value: string) => void
  error?: string
}

function convertToISO(date: string): string {
  const [day, month, year] = date.split('.')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ field, value, onChange, error }) => {
  const { label, type } = field;

  switch (type) {
    case 'string':
      return (
        <TextField
          {...field}
          name={label}
          value={value}
          onChange={(e) => onChange(field.label, e.target.value)}
          error={error}
        />
      )
    
    case 'multi-line':
      return (
        <TextAreaField 
          {...field}
          name={label}
          value={value}
          onChange={(e) => onChange(field.label, e.target.value)}
          error={error}
        />
      )

    case 'number':
      return (
        <NumberField 
          {...field}
          name={label}
          value={value}
          onChange={(e) => onChange(field.label, e.target.value)}
          error={error}
        />
      )

      case 'date':
        return (
          <DateField
            {...field}
            name={label}
            value={value ? convertToISO(value) : ''}
            onChange={(e) => {
              const iso = e.target.value
              const [y, m, d] = iso.split('-')
              const czech = `${d}.${m}.${y}`
              onChange(field.label, czech)
            }}
            error={error}
          />
        )

      case 'boolean':
        return (
          <CheckBoxField 
            {...field}
            name={label}
            value={value === 'true'}
            onChange={(e) => {onChange(field.label, String(e.target.checked))
              console.log('clicked', value)
            }}
            error={error}
          />
        )

      case  'enum':
        return (
          <RadioField 
            {...field}
            name={label}
            value={value}
            onChange={(e) => onChange(field.label, e.target.value)}
            error={error}
          />
        )

    default:
      return null
  }
}

export default DynamicFormField
