import { ValidateForm } from "@/components/auth-forms/validate-form"
import { auth, CustomSession } from "@/lib/auth-options"
import { redirect } from "next/navigation"

export default async function Validate() {
  const session = (await auth()) as CustomSession

  if (!session?.user || session?.user?.access_token) {
    redirect("/auth/login")
  }
  return (
    <div className="min-h-svh flex w-full items-center justify-center p-6 md:p-10">
      <ValidateForm />
    </div>
  )
}
