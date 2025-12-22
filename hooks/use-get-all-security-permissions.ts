"use client"
import { trpc } from "@/trpc/client"

type SecurityPermissionsArg = {
  templateId: string
  tenant: string
}
export function useGetSecurityPermissions({
  templateId,
  tenant,
}: SecurityPermissionsArg) {
  const {
    isLoading,
    isError,
    data: roles,
  } = trpc.global.securityPermissions.useQuery({ templateId, tenant })

  const data = roles?.data || []
  return { isLoading, isError, data }
}
