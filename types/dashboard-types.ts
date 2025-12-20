import { LucideIcon } from "lucide-react"
import { MenuType } from "."

export interface Permission {
  id: string
  containerId: string
  name: string
  type: string
  service: string
  resourceGroup: string
  resource: string
  action: string
  editable: boolean
}

export interface MenuProperties {
  activeColor: string
}

export interface MenuResponse {
  id: string
  name: string
  clientId: string
  ouId: string
  active: boolean
  type: string
  status: string
  createdUserId: string
  createdDate: string
  modifiedUserId: string
  modifiedDate: string
  menus: MenuType[]
}

export type ToolMenuType = {
  title: string
  url: string | null
  icon: React.FC<any>
}
