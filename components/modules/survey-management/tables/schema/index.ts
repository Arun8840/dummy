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
