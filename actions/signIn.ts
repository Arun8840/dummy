"use server"

import { signIn } from "@/lib/auth-options"
import { AuthError } from "next-auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
})

export async function signInHandler(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const res = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })

    if (res?.error) {
      return {
        status: "error",
        message: "Invalid credentials",
      }
    }

    return {
      status: "success",
      message: "Logged in successfully!",
    }
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage =
        error?.cause?.err?.message || error?.cause?.message || error?.message
      return {
        status: false,
        message: errorMessage,
      }
    }

    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    }
  }
}
