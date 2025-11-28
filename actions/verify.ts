"use server"

import { userVerifySchema } from "@/components/auth-forms/schema"
import { verifyUser } from "@/lib/apis/api"
import { updateUserVerifySession } from "@/lib/update-userVerify-session"
import { AuthError } from "next-auth"

type ActionResponse = {
  status: boolean
  message: string | Record<string, string[]>
}

export async function verifyHandler(
  formData: FormData
): Promise<ActionResponse> {
  try {
    // 1. Validate inputs with Zod
    const parsed = userVerifySchema.safeParse({
      email: formData.get("email"),
      token: formData.get("token"),
    })

    if (!parsed.success) {
      return {
        status: false,
        message: parsed.error.flatten().fieldErrors, // field-specific errors
      }
    }

    const { email, token } = parsed.data

    // 2. Call backend API
    const res = await verifyUser({ email, token })
    if (!res?.status) {
      return {
        status: false,
        message: res?.message ?? "Verification failed.",
      }
    }

    if (res?.status) {
      return {
        status: res?.status,
        message: res?.message,
      }
    }

    // 3. If user verified successfully → update NextAuth session
    await updateUserVerifySession({ verified: true })

    // If everything else fails, return a fallback error response
    return {
      status: false,
      message: "Unknown error during account verification.",
    }
  } catch (err: any) {
    return {
      status: false,
      message: err?.message || "Unexpected server error occurred.",
    }
  }
}
