import * as z from "zod"

export const createOuUserSchema = z.object({
  ouId: z.string().min(1, { message: "Organizational Unit ID is required" }),
  clientId: z.string().min(1, { message: "Client ID is required" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be under 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be under 50 characters" }),
  roleIds: z.array(z.string()),
  userGroupId: z.string().optional(),
  username: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  id: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  userType: z.string().optional(),
  provider: z.string().optional(),
  filterIds: z.array(z.string()).optional(),
  defaultLanguage: z.string().optional(),
  currentLanguage: z.string().optional(),
})
