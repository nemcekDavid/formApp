import { FormConfigProvider } from "../context/FormConfigContext"
import { ReactNode } from 'react'

export default function TabsLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <FormConfigProvider>
      {children}
    </FormConfigProvider>
  )
}
