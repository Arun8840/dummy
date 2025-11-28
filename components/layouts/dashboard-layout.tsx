"use client"
import React from "react"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { DashboardSidebar } from "../dashboard-sidebar"
import DashboardNavHeader from "../modules/dashboard/dashboard-nav-header"
import { trpc } from "@/trpc/client"
import { Spinner } from "../ui/spinner"
import { User } from "@/types/auth-types"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, isLoading } = trpc.dashboard.loginExperience.useQuery()

  const { landingPageMenu, user } = data?.data || {}
  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Spinner />
      </div>
    )
  }
  return (
    <SidebarProvider>
      <DashboardSidebar
        menuTemplateId={landingPageMenu?.templateId as string}
        clientId={user?.clientId}
      />

      <SidebarInset>
        <DashboardNavHeader user={user as User} />

        <div className="flex flex-1 flex-col gap-4 p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
