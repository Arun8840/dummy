import axios, { AxiosRequestConfig, Method } from "axios"
import { TRPCError } from "@trpc/server"
import type { Context } from "@/trpc/init"
import { ApiResponse } from "@/types/api"

/**
 * Helper function to make API calls from tRPC routers
 * Automatically handles:
 * - Dynamic tenant and endpoint URLs
 * - Authorization Bearer token from context
 * - Error handling
 */
type ApiCallOptions = {
  method?: Method
  tenant: string
  endpoint: string // Override the endpoint from context if needed
  data?: any
  params?: Record<string, string | number>
  headers?: Record<string, string>
}

export async function adminTrpcApi<T>(
  ctx: Context,
  options: ApiCallOptions
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    tenant,
    endpoint,
    data,
    params,
    headers: customHeaders = {},
  } = options

  // Use custom endpoint if provided, otherwise use context endpoint

  // Build the full URL
  const url = `${process.env
    .NEXT_ADMIN_SERVICE_BASE_URL!}/${tenant}/v1/${endpoint}`

  // Prepare headers with Authorization
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Rest_security_token: process.env.NEXT_SURVEY_SECURITY_TOKEN!,
    ...customHeaders,
  }

  // Prepare axios config
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    ...(data && { data }),
    ...(params && { params }),
  }

  try {
    const response = await axios<ApiResponse<T>>(config)
    return response.data
  } catch (error: any) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message =
        error.response?.data?.message || error.message || "API request failed"

      throw new TRPCError({
        code:
          status === 401
            ? "UNAUTHORIZED"
            : status === 403
            ? "FORBIDDEN"
            : status === 404
            ? "NOT_FOUND"
            : status === 400
            ? "BAD_REQUEST"
            : status && status >= 500
            ? "INTERNAL_SERVER_ERROR"
            : "INTERNAL_SERVER_ERROR",
        message,
        cause: error,
      })
    }

    // Handle other errors
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      cause: error,
    })
  }
}
