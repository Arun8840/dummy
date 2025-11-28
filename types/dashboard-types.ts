import { LucideIcon } from "lucide-react"

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

export interface Menu {
  id: string
  templateId: string
  containerId: string
  menuId: string
  name: string
  iname: string
  tname: string
  resourceGroup: string
  resource: string
  path: string
  iconName: string
  order?: number
  properties: MenuProperties
  permissions: Permission[]
  menus: Menu[]
  createdDate: string
  modifiedDate: string
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
  menus: Menu[]
}

export type ToolMenuType = {
  title: string
  url: string | null
  icon: React.FC<any>
}
