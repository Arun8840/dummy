import { SignUpForm } from "@/components/auth-forms/signUp-form"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  return (
    <div className="min-h-svh  grid lg:grid-cols-2 gap-6">
      <div className="bg-muted flex flex-col justify-center items-center gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 font-medium font-sans"
        >
          <div className="flex w-20 h-16 items-center justify-center rounded-md">
            <Image
              src={"/Logo.svg"}
              alt="survey logo"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
        </Link>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
