import { registerSchema } from "@/components/auth-forms/schema"
import axios from "axios"
import z from "zod"
export const loginUser = async (credentials: {
  email: string
  password: string
}) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/login",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    )

    return res.data
  } catch (err: unknown) {
    console.error("Login API fetch error:", err)

    if (axios.isAxiosError(err)) {
      const responseData = err.response?.data as
        | {
            message?: string
            error?: string
            data?: unknown
          }
        | undefined

      const message =
        responseData?.message ||
        responseData?.error ||
        err.message ||
        "Login API fetch error"

      return {
        error: message,
        message: responseData?.data,
      }
    }

    return { error: "Login API fetch error" }
  }
}

export const register = async (credentials: z.infer<typeof registerSchema>) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/register",
      credentials
    )
    return res.data
  } catch (err) {
    console.error("register API fetch error:", err)
    return null
  }
}

export const verifyUser = async (credentials: {
  email: string
  token: string
}) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/user/v1/verifyemail",
      credentials
    )
    return res.data
  } catch (err) {
    console.error("Verify API fetch error:", err)
    return null
  }
}

export const getOtp = async (credentials: { email: string }) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/generate-otp",
      credentials
    )
    return res.data?.data
  } catch (err) {
    console.error("get otp fetch error:", err)
    return null
  }
}

export const verifyMfaOtp = async (credentials: {
  email: string
  token: string
}) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/verify-otp",
      credentials
    )
    return res
  } catch (err) {
    console.error("verify otp API fetch error:", err)
    return null
  }
}

export const validateOTP = async (credentials: {
  email: string
  token: string
}) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/validate-otp",
      credentials
    )
    return res
  } catch (err) {
    console.error("verify otp API fetch error:", err)
    return null
  }
}

export const forgotPsw = async (credentials: { email: string }) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/auth/v1/forgot-password",
      credentials
    )
    return res?.data
  } catch (err) {
    console.error("forgot otp API fetch error:", err)
    return null
  }
}
