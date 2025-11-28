"use client"
import * as React from "react"
import * as Icons from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { trpc } from "@/trpc/client"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import Link from "next/link"
import { toCamelCase } from "@/utils/functions/helpers"

interface IconProps {
  name: string // icon name from API, e.g. "UserCircle"
  className?: string
}

interface ExtraProps {
  menuTemplateId: string
  clientId?: string | number
}

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & ExtraProps

export function DashboardSidebar({
  menuTemplateId,
  clientId,
  ...props
}: DashboardSidebarProps) {
  const isAdmin = clientId === "0"
  const { data: menus, isLoading } = trpc.dashboard.getMenu.useQuery({
    admin: isAdmin,
    menuTemplateId,
  })

  const menuItems = menus?.data?.menus || []
  return (
    <Sidebar {...props}>
      {isLoading ? (
        <div className="size-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#">
                    <div className=" flex aspect-square size-8 items-center justify-center">
                      <Image
                        src={"/Logo.svg"}
                        width={200}
                        height={200}
                        className="size-full object-contain"
                        alt="Logo"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium font-sans">
                        Zetta Survey
                      </span>
                      <small className="">v2.0.0</small>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((group) => (
                  <SidebarMenuItem key={`group_${group.id}`}>
                    <SidebarMenuButton className="font-medium">
                      {group.name}
                    </SidebarMenuButton>
                    {group.menus?.length ? (
                      <SidebarMenuSub>
                        {group.menus.map((item, itemIndex) => {
                          const linkStr = `/${toCamelCase(item?.iname)}`

                          return (
                            <SidebarMenuSubItem
                              key={`menu_${itemIndex}-${item?.id}`}
                            >
                              <SidebarMenuSubButton asChild isActive={false}>
                                <Link href={linkStr}>
                                  <Icon
                                    name={item?.iconName ?? "Settings"}
                                    className="p-[.1px]"
                                  />
                                  {item?.name}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarRail />
        </>
      )}
    </Sidebar>
  )
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = React.useMemo(() => {
    const IconMap = Icons as unknown as Record<string, React.FC<any>>
    return IconMap[name] || null
  }, [name])

  if (!IconComponent) {
    // Fallback to a default icon if not found
    return <Icons.Server className={className} />
  }

  return <IconComponent className={className} />
}
