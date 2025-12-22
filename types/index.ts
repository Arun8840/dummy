export interface MenuType {
  id: string
  templateId: string | null
  containerId: string
  menuId: string
  name: string
  iName: string
  tName: string | null
  resourceGroup: string
  resource: string
  type: string
  groupName: string
  url: string
  path: string | null
  iconName: string | null
  icon: string | null
  order: number
  slotId: string | null
  slotName: string | null
  slotType: string | null
  properties: any | null
  permissions: PermissionType[]
  menus: any[] | null
  createdUserId: string
  createdDate: string
  modifiedUserId: string | null
  modifiedDate: string | null
  translation: any | null
  slot: boolean
  isSlot?: boolean
}

export type MenuResponse = MenuType[]

export interface PermissionType {
  id: string
  containerId: string
  clientId: string
  ouId: string
  name: string
  type: string
  service: string
  resourceGroup: string
  resource: string
  action: string
  editable: boolean
}

export interface RoleWithPermissions {
  roleId: string
  roleName: string
  permissions: PermissionType[]
}
