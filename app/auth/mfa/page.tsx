import { MfaForm } from "@/components/auth-forms/mfa-form"
import { auth, CustomSession } from "@/lib/auth-options"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = (await auth()) as CustomSession

  // 1️⃣ If no session (user not logged in) → go to login
  if (!session?.user) {
    redirect("/auth/login")
  }

  // 2️⃣ If user doesn’t have MFA enabled → skip this page
  if (!session.user.mfa_enabled) {
    redirect("/")
  }

  // 3️⃣ If user already completed MFA → redirect to validate/dashboard
  if (session.user.mfa_enabled && session.user.mfa_verified) {
    redirect(`/auth/validate?email=${session.user.email}`)
  }

  // ✅ Otherwise, render the MFA verification form
  return (
    <div className="min-h-svh flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <MfaForm />
      </div>
    </div>
  )
}
