"use client"
import { trpc } from "@/trpc/client"

export function useGetWorkflowComponents() {
  const { data, isLoading, error } = trpc.workflow.components.useQuery()
  return { data, isLoading, error }
}
