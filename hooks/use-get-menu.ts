"use client";
import { trpc } from "@/trpc/client";

export function useGetMenuTemplates() {
    const {
        isLoading,
        isError,
        data: result,
        error,
    } = trpc.menu.templates.useQuery();

    const data = result?.data ?? [];
    return { isLoading, isError, data, error };
}
