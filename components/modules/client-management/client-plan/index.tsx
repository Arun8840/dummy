"use client";

import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/trpc/client";
import { ClientPlanTableData } from "./client-plan-table-data";

export default function ClientPlanTemplate() {
  const { isLoading, data: clientPlans } =
    trpc.clientPlans.templates.useQuery();

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  const clientPlanItems = clientPlans?.data || [];

  return <ClientPlanTableData data={clientPlanItems} />;
}
