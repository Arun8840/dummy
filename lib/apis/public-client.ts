import axios, { AxiosRequestConfig, Method } from "axios"
import { TRPCError } from "@trpc/server"
import { ApiResponse } from "@/types/api"

type ApiCallOptions = {
  method?: Method
  tenant: string
  endpoint: string
  data?: any
  params?: Record<string, string | number>
  headers?: Record<string, string>
}

export async function publicClientApi<T>(options: ApiCallOptions) {
  const {
    method = "GET",
    tenant,
    endpoint,
    data,
    params,
    headers: customHeaders = {},
  } = options

  const BASE_URL = process.env.NEXT_CLIENT_SERVICE_BASE_URL

  if (!BASE_URL) {
    throw new Error("CLIENT_BASE_URL is missing in env")
  }

  const url = `${BASE_URL}/api/${tenant}/v1/${endpoint}`

  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  }

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
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const message =
        error.response?.data?.message || error.message || "API request failed"

      throw new TRPCError({
        code:
          status === 400
            ? "BAD_REQUEST"
            : status === 401
            ? "UNAUTHORIZED"
            : status === 403
            ? "FORBIDDEN"
            : status === 404
            ? "NOT_FOUND"
            : "INTERNAL_SERVER_ERROR",
        message,
        cause: error,
      })
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error instanceof Error ? error.message : "Unknown error",
      cause: error,
    })
  }
}
