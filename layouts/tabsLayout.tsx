'use client'

import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"
import clsx from 'clsx'
import { FormConfigProvider, useFormConfig } from "@/app/context/FormConfigContext"

function LayoutContent({ 
  children,
  footerButtons,
  errorMessage
}: { 
  children: ReactNode
  footerButtons: ReactNode
  errorMessage?: string | null
}) {
  const pathname = usePathname()
  const router = useRouter()
  const activeTab = pathname.includes('/json-config') ? 'config' : 'result'

  return (
    <div className="max-h-svh justify-self-center min-w-1/2 pt-8">

      <div className="flex gap-2">
        <button
          className={clsx(
            'hover:cursor-pointer',
            activeTab === 'config' && 'font-bold border-b-2'
          )}
          onClick={() => router.push('/tabs/json-config')}
        >
          Config
        </button>
        <button
          className={clsx(
            'hover:cursor-pointer',
            activeTab === 'result' && 'font-bold border-b-2'
          )}
          onClick={() => router.push('/tabs/form-result')}
        >
          Result
        </button>
      </div>

      <div className="border rounded px-4 pt-4">
        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Bottom buttons and errorMessage */}
        <div className="py-4 flex items-center">
          {errorMessage && (
            <div className="flex text-sm text-red-500">
              {errorMessage}
            </div>
          )}
          <div className="ml-auto">
            {footerButtons}
          </div>
        </div>
      </div>

    </div>
  )
}

export default function TabsLayout({ 
  children,
  footerButtons,
  errorMessage
}: { 
  children: ReactNode
  footerButtons: ReactNode
  errorMessage?: string | null
}) {
  return (
    <FormConfigProvider>
      <LayoutContent footerButtons={footerButtons} errorMessage={errorMessage}>{children}</LayoutContent>
    </FormConfigProvider>
  )
}