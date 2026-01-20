import { PermissionType, RoleWithPermissions } from ".."

interface Variable {
  id: string
  name: string
  containerId: string
  containerName: string | null
  iName: string
  type: string | null
  msg: string
  defaultValue: any
  answers: any
  format: "Number" | "Text" | "Date" | "Boolean" // Adjust based on possible formats
  properties: any
  scope: any
  order: number
}

export interface VariableTemplate {
  id: string
  clientId: string
  ouId: string
  version: number
  name: string
  description: string
  status: "Published" | "Draft" | "Archived"
  variables: Variable[]
  createdUserId: string
  createdDate: string
  modifiedUserId: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
  createdDateString: string
  modifiedDateString: string
  permissions: PermissionType[]
  roles: RoleWithPermissions[]
}

export type VariableTemplateResponse = VariableTemplate[]
