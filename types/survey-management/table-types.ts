import { MenuType, PermissionType } from ".."

export interface TableTemplate {
  id: string
  clientId: number
  buId: string
  version: number
  name: string
  status: string
  path: string
  createdUserId: string
  createdDate: number
  modifiedUserId: string | null
  modifiedDate: number | null
  type: string
  tables: TableType[]
  parentTemplateId: string | null
  childTemplateIds: string[] | null
  childTemplates: any[] | null
  copyFromTemplateId: string | null
  createdBy: string
  modifiedBy: string
  createdDateString: string
  modifiedDateString: string
}


export interface TableType {
  id: string
  clientId: number
  buId: string
  containerId: string
  name: string
  iName: string
  primaryKey: string
  primaryName: string
  clientPrimaryKey: string
  clientPrimaryName: string
  displayName: string
  showInMenu: boolean
  showInMap: boolean
  menu: Menu
  type: string
  path: string
  aaRow: AaRow
  classification: string | null
  componentType: string
  subComponentType: string
  roles: any[] | null
  columns: TableColumn[] | null
  tables: TableType[]
  publishers: Publisher[]
  menuTemplateId: string
  menus: MenuType[]
  permissions: PermissionType[]
}
export interface TableColumn {
  id: string
  containerId: string
  name: string
  displayName: string
  iName: string
  index: number
  componentType: string
  subComponentType: string
  type: string
  path: string | null
  valuePath: string | null
  valueString: string | null
  valueDouble: number
  valueBoolean: boolean
  valueDate: string | null
  valueInteger: number
  vaults: any | null
  hidden: boolean
  createIndex: boolean
  searchable: boolean
  showInReports: boolean
  showInInstance: boolean
  mapColumn: boolean
}

export interface Menu {
  id: string
  containerId: string | null
  menuId: string
  name: string
  iName: string | null
  tName: string | null
  type: string
  groupName: string
  url: string
  path: string | null
  iconName: string | null
  icon: string | null
  order: number
  permissions: Permission[]
  createdUserId: string
  createdDate: number
  modifiedUserId: string | null
  modifiedDate: number | null
  translation: any | null
}

export interface Permission {
  id: string
  containerId: string
  clientId: number
  buId: string
  name: string
  description: string | null
  groupName: string
  subGroupName: string | null
  type: string
  access: string
  editable: boolean
}

export interface AaRow {
  id: string
  containerId: string
  label: string
  createdDate: number | null
  status: string | null
  searchString: string | null
  columns: Record<string, Column>
}

export interface Column {
  id: string
  containerId: string
  name: string
  displayName: string
  iName: string
  index: number
  componentType: string
  subComponentType: string
  type: string
  path: string
  valuePath: string
  valueString: string | null
  valueDouble: number
  valueBoolean: boolean
  valueDate: number | null
  valueInteger: number
  vaults: any | null
  hidden: boolean
  createIndex: boolean
  searchable: boolean
  showInReports: boolean
  mapColumn: boolean
  lookup: any | null
}

export interface Publisher {
  id: string
  containerId: string
  componentType: string
  subComponentType: string
  name: string
  status: boolean
  overwrite: boolean
  sshKey: boolean
  databaseType: string | null
  host: string | null
  port: number | null
  filePath: string | null
  userName: string | null
  password: string | null
  ftpHost: string | null
  ftpPort: number
  ftpUser: string | null
  ftpPassword: string | null
  ftpDirectory: string | null
  ftpFileName: string | null
  ftpSshKey: string | null
  cronString: string | null
  cronHelp: string | null
  delimiter: string
  delimiters: Delimiter[]
  url: string | null
}

export interface Delimiter {
  key: string
  value: string
  trigger: any | null
}

export type TableTemplateResponse = TableTemplate[]
