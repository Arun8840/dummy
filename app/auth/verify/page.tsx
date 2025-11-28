import { VerifyForm } from "@/components/auth-forms/verify-form"
import { decrypt } from "@/utils/functions/encrypt/encryption"
import { redirect } from "next/navigation"

interface VerifyProps {
  searchParams: {
    email: string
    emailVerified: boolean
  }
}
export default async function Verify({ searchParams }: VerifyProps) {
  const { email, emailVerified } = await searchParams

  const hasedEmail = await decrypt(email)

  const decodedEmail = decodeURIComponent(hasedEmail)
  if (!decodedEmail && emailVerified) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-svh flex w-full items-center justify-center p-6 md:p-10">
      <VerifyForm email={decodedEmail} />
    </div>
  )
}
