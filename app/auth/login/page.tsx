import { LoginForm } from "@/components/auth-forms/login-form"
import { auth, CustomSession } from "@/lib/auth-options"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
export default async function Page() {
  const session = (await auth()) as CustomSession

  // 1️⃣ If user not logged in at all — show login
  if (!session?.user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Link
          href="#"
          className="flex items-center gap-2 font-medium font-sans"
        >
          <div className="flex size-15 items-center justify-center rounded-md">
            <Image
              src={"/Logo.svg"}
              alt="survey logo"
              width={200}
              height={200}
              className="size-full"
            />
          </div>
        </Link>
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    )
  }

  // 2️⃣ If user not verified yet
  if (!session.user.verified) {
    redirect(`/auth/verify?email=${session.user.email}`)
  }

  // 3️⃣ If MFA is enabled but not verified
  if (session.user.mfa_enabled && !session.user.mfa_verified) {
    redirect(`/auth/mfa?email=${session.user.email}`)
  }

  // 4️⃣ If MFA is verified and enabled (optional validate step)
  if (session.user.mfa_enabled && session.user.mfa_verified) {
    redirect(`/auth/validate?email=${session.user.email}`)
  }

  // 5️⃣ Finally, if fully authenticated → go to home/dashboard
  if (session.user.access_token && session.user.email) {
    redirect("/")
  }

  // fallback (should never hit)
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="#" className="flex items-center gap-2 font-medium font-sans">
        <div className="flex w-10 h-8 items-center justify-center rounded-md">
          <Image
            src={"/surveyLogo.png"}
            alt="survey logo"
            width={100}
            height={100}
            className="size-full"
          />
        </div>
      </Link>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
