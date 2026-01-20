"use client"
import { trpc } from "@/trpc/client"

export function useGetVariables() {
  const {
    isLoading,
    isError,
    data: variables,
  } = trpc.variable.templates.useQuery()

  const data = variables?.data || []
  return { isLoading, isError, data }
}
