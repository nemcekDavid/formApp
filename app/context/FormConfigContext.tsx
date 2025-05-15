'use client'

import { createContext, useContext, useState, ReactNode } from "react"

export type FormField = {
  label: string
  type: 'string' | 'number' | 'multi-line' | 'boolean' | 'date' | 'enum'
  required?: boolean,
  options?: string[] // for enum
}

export type FormConfig = {
  items: FormField[]
}

type FormContextType = {
  config: FormConfig | null
  setConfig: (cfg: FormConfig) => void
}

const FormConfigContext = createContext<FormContextType | undefined>(undefined)

export const useFormConfig = () => {
  const ctx = useContext(FormConfigContext)
  if(!ctx) throw new Error('useFormConfig must be used within FormConfigProvider')
  return ctx
}

export const FormConfigProvider = ({ children }: { children: ReactNode}) => {
  const [ config, setConfig ] = useState<FormConfig | null>(null)

  return (
    <FormConfigContext.Provider value={{ config, setConfig}}>
      {children}
    </FormConfigContext.Provider>
  )
}