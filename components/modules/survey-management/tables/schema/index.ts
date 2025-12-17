import { z } from "zod"

// Sample create schema for a table with name and description only

export const createTableSchema = z.object({
  name: z.string().min(1, "Table name is required"),
  description: z.string().optional(),
})

export type CreateTableInput = z.infer<typeof createTableSchema>
