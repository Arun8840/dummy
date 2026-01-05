import { z } from "zod"

// Sample create schema for a table with name and description only

export const createSurveySchema = z.object({
  name: z.string().min(1, "Survey name is required"),
  description: z.string().optional(),
})

export type CreateSurveyInput = z.infer<typeof createSurveySchema>
