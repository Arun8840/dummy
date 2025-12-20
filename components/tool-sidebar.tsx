"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { toolMenu } from "@/utils/functions/tool-menu-data"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { DarkModeSwitcher } from "@/utils/ui/dark-mode-switcher"
import SignOutButton from "./sign-out-button"
import { LogOut } from "lucide-react"
import { ThemeSelector } from "@/utils/ui/theme-selector"

interface ExtraProps {}

type ToolSidebarProps = React.ComponentProps<typeof Sidebar> & ExtraProps

export function ToolSidebar({ ...props }: ToolSidebarProps) {
  const navigation = useRouter()
  const currentPath = usePathname()
  const menuItems = toolMenu(currentPath)

  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems?.map((item) => {
                const fullLink = `${currentPath}${item.url}`
                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {item.url ? (
                          <SidebarMenuButton asChild>
                            <Link href={fullLink}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            onClick={() => {
                              navigation.back()
                            }}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeSelector className="size-8 mx-auto rounded" />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <DarkModeSwitcher className="size-8 mx-auto rounded" />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOutButton className="size-8 mx-auto rounded">
              <LogOut />
            </SignOutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
