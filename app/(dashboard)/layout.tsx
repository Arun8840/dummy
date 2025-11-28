import DashboardLayout from "@/components/layouts/dashboard-layout"
import ProtectedLayout from "@/components/layouts/protected-layout"
import { TRPCProvider } from "@/trpc/client"
import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <TRPCProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </TRPCProvider>
    </ProtectedLayout>
  )
}
