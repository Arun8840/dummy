import { z } from "zod"

// Sample create schema for a table with name and description only

export const createTableSchema = z.object({
  name: z.string().min(1, "Table name is required"),
  description: z.string().optional(),
})

export type CreateTableInput = z.infer<typeof createTableSchema>

export const menuSchema = z.object({
  name: z.string().min(1, "Name required"),
  url: z.string().min(1, "path required"),
  iName: z.string().min(1, "Iname required"),
  iconName: z.string().min(1, "Icon name required"),
  resourceGroup: z.string().min(1, "Resource group required"),
  resource: z.string().min(1, "Resource required"),
})
export type MenuSchemaInput = z.infer<typeof menuSchema>

export const permissionSchema = z.object({
  type: z.string().min(1, "Type Required"),
  service: z.string().min(1, "Service Required"),
  resourceGroup: z.string().min(1, "Resource Group Required"),
  resource: z.string().min(1, "Resource Required"),
  action: z.string().min(1, "Action Required"),
})

export type PermissionSchemaInput = z.infer<typeof permissionSchema>

// Menu Permission creation input = for one or more permission items at a time, for specific Menu ("containerId") under specific Table ("templateId")
export const createMenuInput = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  containerId: z.string().min(1, "Container ID is required"),
  componentType: z.string().min(1, "Component Type is required"),
  menu: menuSchema,
})
export const createRoleInput = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  containerId: z.string().min(1, "Container ID is required"),
  componentType: z.string(),
  resourceRole: z.object({
    roleId: z.string().min(1, "Role ID is required"),
    roleName: z.string().min(1, "Role name is required"),
    permissions: z.array(z.any()),
  }),
})
export const assignRolePermissionInput = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  tableId: z.string().min(1, "Table ID is required"),
  tableRoles: z.array(
    z.object({
      roleId: z.string().min(1, "Role ID is required"),
      roleName: z.string().min(1, "Role name is required"),
      permissions: z.array(z.any()),
    })
  ),
})

// Schema for menu permission creation (as in handleCreateMenuPermission in menu.tsx)
export const createMenuPermissionInput = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  containerId: z.string().min(1, "Menu/Container ID is required"),
  componentType: z.literal("Permission"),
  permissions: z
    .array(permissionSchema)
    .min(1, "At least one permission is required"),
})

// Define a union schema to allow both types of component addition via the same router/mutation

export const addComponentInputSchema = z.union([
  createMenuInput,
  createMenuPermissionInput,
  createRoleInput,
])

export const removeMenuInput = z.object({
  componentId: z.string().min(1, "Component ID is required"),
  componentType: z.string(),
  containerId: z.string().min(1, "Container ID is required"),
  newIndex: z.number().int(),
  path: z.string(),
  publish: z.nullable(z.any()),
  subComponentType: z.string(),
  templateId: z.string().min(1, "Template ID is required"),
  column: z.nullable(z.any()),
})

export const saveComponentInputSchame = z.object({
  componentId: z.string().min(1, "Component ID is required"),
  componentType: z.string().min(1, "Component type is required"),
  containerId: z.string().min(1, "Container ID is required"),
  newIndex: z.number().int(),
  path: z.string(),
  publish: z.nullable(z.any()),
  subComponentType: z.string(),
  templateId: z.string().min(1, "Template ID is required"),
  column: z.nullable(z.any()),
  component: z.any(),
})
