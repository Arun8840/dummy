"use server"

import { validateSchema } from "@/components/auth-forms/schema"
import { validateOTP } from "@/lib/apis/api"
import { updateValidUserSession } from "@/lib/update-valid-user-session"
import { AuthError } from "next-auth"

export async function validateAuthOtpHandler(formData: FormData) {
  const parsed = validateSchema.safeParse({
    email: formData.get("email"),
    token: formData.get("token"),
  })

  if (!parsed.success) {
    return {
      status: false,
      message: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const res = await validateOTP({
      token: parsed?.data?.token,
      email: parsed?.data?.email,
    })

    const data = res?.data?.data

    if (res?.data?.status) {
      await updateValidUserSession(data)
      return {
        status: res?.status,
        message: "Verification code submitted successfully!",
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "AccessDenied") {
        return {
          status: false,
          message: "Access denied.",
        }
      }
    }
  }
}
