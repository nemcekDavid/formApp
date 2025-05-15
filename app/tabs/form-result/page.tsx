'use client'

import TabsLayout from "@/layouts/tabsLayout"
import Button from "@/components/Button"
import { useRouter } from 'next/navigation';
import { useFormConfig } from "@/app/context/FormConfigContext";
import { useState, useRef } from "react";
import DynamicFormField from "@/components/formComponents/dynamic-form-field";
import { exportFormDataToPdf } from "@/utils/pdfExport";
import { generateZodSchema } from "@/utils/generateZodSchema";


export default function FormResultPage() {
  const router = useRouter()
  const { config } = useFormConfig()
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const printableRef = useRef<HTMLDivElement>(null)

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrintPdf = () => {
    if (!config?.items) return

    const schema = generateZodSchema(config.items)
    const result = schema.safeParse(formValues)

    if (!result.success) {
      const formattedErrors: Record<string, string> = {}
  
      const errorDetails = result.error.format()
  
      for (const key in errorDetails) {
        if (key !== "_errors") {
          const fieldError = errorDetails[key]?._errors?.[0]
          if (fieldError) {
            formattedErrors[key] = fieldError
          }
        }
      }
  
      setFormErrors(formattedErrors)
      return
    }

    setFormErrors({})
    exportFormDataToPdf(formValues, 'form-result.pdf')
  }

  return (
    <TabsLayout
      footerButtons={
        <div className="flex gap-2">
          <Button onClick={() => router.push('/tabs/json-config')}>Cancel</Button>
          <Button onClick={handlePrintPdf}>Save</Button>
        </div>
      }
    >
      <div ref={printableRef}>
        {config?.items?.map((item, index) => {
          return (
            <DynamicFormField
              key={`${item.label}-${index}`}
              field={item}
              value={formValues[item.label] || ''}
              onChange={handleChange}
              error={formErrors[item.label]}
            />
          )}
        )}
      </div>
    </TabsLayout>
  )
}
