import { ForgotForm } from "@/components/auth-forms/forgot-form"

export default async function Forgot() {
  return (
    <div className="flex w-full min-h-svh items-center justify-center p-6 md:p-10">
      <ForgotForm />
    </div>
  )
}
