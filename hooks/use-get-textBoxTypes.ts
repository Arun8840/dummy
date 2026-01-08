"use client";
import { trpc } from "@/trpc/client";

export function useGetTexboxTypes() {
  const {
    isLoading,
    isError,
    data: types,
  } = trpc.survey.getTextboxTypes.useQuery();

  const data = types?.data || [];
  return { isLoading, isError, data };
}
