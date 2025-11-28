import z from "zod"

export const createClientSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.email().min(1, "Email required"),
  clientId: z.number().min(1, "Client ID required"),
  phone: z
    .string()
    .min(1, "Phone number required")
    .max(10, "Phone number must be at most 10 digits"),
  planName: z.string().min(1, "Plan required"),
  planId: z.string().optional(),
})

export const createOrganizationalUnitSchema = z.object({
  name: z.string().min(1, "Name required"),
  clientId: z.string().min(1),
  thirdpartyId: z.string().min(1, "Third Party ID required"),
  ouId: z.string().min(1, "Organizational Unit ID required"),
  planId: z.string().min(1, "Plan required"),
  active: z.boolean().optional(),
})
