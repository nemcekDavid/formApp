export type FieldProps = {
  label: string
  type: 'string' | 'number' | 'multi-line' | 'boolean' | 'date' | 'enum' | 'select'
  required?: boolean
  options?: string[]
  [key: string]: any
}
