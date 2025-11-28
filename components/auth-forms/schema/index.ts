import z from "zod"

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  // .max(4, { message: "Password must be at most 4 characters" }),
})

export const registerSchema = z
  .object({
    email: z.email().min(1, { message: "Email is required" }),
    firstname: z.string().min(1, { message: "Firstname is required" }),
    lastname: z.string().min(1, { message: "Lastname is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(6, { message: "Password must be at most 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
  })

export const validateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  token: z
    .string({ message: "Token is required" })
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Code must be only digits" }),
})

export const mfaVerifySchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  token: z
    .string({ message: "Token is required" })
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Code must be only digits" }),
})

export const userVerifySchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  token: z
    .string({ message: "Token is required" })
    .length(6, { message: "Code must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Code must be only digits" }),
})

export const forgotSchema = z.object({
  email: z.email().min(1, "Email is required"),
})

export const resetPswSchema = z
  .object({
    email: z.email().min(1, "Email is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 4 characters"),
    token: z
      .string()
      .min(1, "Token is required")
      .max(6, "Token must be at most 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be the same",
    path: ["confirmPassword"],
  })
