"use client";

import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/trpc/client";
import { ClientTableData } from "./client-table-data";

export default function ClientTemplates() {
  const { isLoading, data: clients } = trpc.clients.templates.useQuery();

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  const clientItems = clients?.data || [];

  return <ClientTableData data={clientItems} />;
}
