"use client"
import { trpc } from "@/trpc/client"

export function useGetResourceRoles() {
  const {
    isLoading,
    isError,
    data: roles,
  } = trpc.global.resourceRoles.useQuery()

  const data = roles?.data || []
  return { isLoading, isError, data }
}
