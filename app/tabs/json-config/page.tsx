'use client'

import TabsLayout from "@/layouts/tabsLayout"
import Button from "@/components/Button"
import Textarea from "@/components/JsonConfigTextArea"
import { useState } from "react"
import { useFormConfig } from "@/app/context/FormConfigContext"
import { useRouter } from "next/navigation"
import { allowedTypes } from "@/constants/formFieldsTypes"

export default function JsonConfigPage() {
  const { setConfig } = useFormConfig()
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text)

      if (!parsed.items || !Array.isArray(parsed.items)) {
        setErrorMessage("JSON have to contain key 'items', which is an array.")
        return
      }

      for (const item of parsed.items) {
        if (typeof item !== 'object' || Array.isArray(item)) {
          setErrorMessage("Each item in 'items' must be an object.")
          return
        }
        if (!item.type || !allowedTypes.includes(item.type)) {
          setErrorMessage(`Invalid or missing field type: '${item.type || 'undefined'}'`)
          return
        }
      }

      setConfig(parsed)
      setErrorMessage(null)
      router.push('/tabs/form-result')
    } catch (err) {
      console.error(err)
      setErrorMessage('Invalid JSON')
    }    
  }

  return (
    <TabsLayout
      footerButtons={
        <Button 
          onClick={handleApply}
        >
          Apply
        </Button>
      }
      errorMessage={errorMessage}
    >
      <Textarea 
        value={text}
        onChange={setText}
        placeholder="Insert JSON configuration for form"
        rows={24}
      />
    </TabsLayout>
  )
}