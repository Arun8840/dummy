"use client"
import React from "react"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { ToolSidebar } from "../tool-sidebar"

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <ToolSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-2 p-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
