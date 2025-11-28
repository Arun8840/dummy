"use client";
import { trpc } from "@/trpc/client";

export function useGetRoles() {
  const {
    isLoading,
    isError,
    data: roles,
  } = trpc.clients.getPublishedRole.useQuery();

  const data = roles?.data || [];
  return { isLoading, isError, data };
}
