import DetailsLayout from "@/components/layouts/details-layout"
import ProtectedLayout from "@/components/layouts/protected-layout"
import { TRPCProvider } from "@/trpc/client"
import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <TRPCProvider>
        <DetailsLayout>{children}</DetailsLayout>
      </TRPCProvider>
    </ProtectedLayout>
  )
}
