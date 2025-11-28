"use server"

import { mfaVerifySchema } from "@/components/auth-forms/schema"
import { verifyMfaOtp } from "@/lib/apis/api"
import { updateMFASession } from "@/lib/update-mfa-session"
import { AuthError } from "next-auth"

export async function validateOtpHandler(formData: FormData) {
  const parsed = mfaVerifySchema.safeParse({
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
    const res = await verifyMfaOtp({
      token: parsed?.data?.token,
      email: parsed?.data?.email,
    })

    const data = res?.data?.data

    if (res?.data?.status) {
      await updateMFASession({
        mfa_enabled: data?.mfa_enabled,
        mfa_verified: true,
      })

      return {
        status: res?.data?.status,
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
