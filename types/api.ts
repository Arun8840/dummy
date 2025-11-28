export type ApiResponse<T> = {
  success: boolean
  message?: string
  data: T
  status?: boolean
}
