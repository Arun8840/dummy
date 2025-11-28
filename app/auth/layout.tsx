import AuthLayout from "@/components/layouts/auth-layout"
import { TRPCAuthProvider } from "@/trpc/auth-client"
import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <TRPCAuthProvider>{children}</TRPCAuthProvider>
    </AuthLayout>
  )
}
