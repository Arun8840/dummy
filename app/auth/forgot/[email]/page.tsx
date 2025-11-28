import { RestForm } from "@/components/auth-forms/rest-form"
import { decrypt } from "@/utils/functions/encrypt/encryption"
import React from "react"
interface ResetPageProps {
  params: {
    email: string
  }
}
export default async function ResetPage({ params }: ResetPageProps) {
  const { email } = await params

  const decrypted = await decrypt(email)

  const decodedEmail = decodeURIComponent(decrypted)

  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RestForm email={decodedEmail} />
      </div>
    </div>
  )
}
