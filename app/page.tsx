import SignOutButton from "@/components/sign-out-button"
import { Button } from "@/components/ui/button"
import { auth, CustomSession } from "@/lib/auth-options"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = (await auth()) as CustomSession | null
  const { user } = session || {}
  if (!user || !user?.access_token || !user?.email) {
    redirect("/auth/login")
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="w-1/2">
        <h1>{user?.email}</h1>
        <p className="text-xs line-clamp-1">{user?.access_token}</p>
      </div>

      <SignOutButton />
      <Button asChild>
        <Link href={"/workflow"}>Go to Dashboard</Link>
      </Button>
    </section>
  )
}
