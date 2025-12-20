"use client"
import { trpc } from "@/trpc/client"

type GetSlotArgs = {
  menuTemplateId: string
}

export function useGetSlots({ menuTemplateId }: GetSlotArgs) {
  const enabled = !!menuTemplateId
  const {
    isLoading,
    isError,
    data: result,
    error,
  } = trpc.global.slots.useQuery(
    { menuTemplateId },
    {
      enabled,
    }
  )

  const data = result?.data ?? []
  return { isLoading, isError, data, error }
}
