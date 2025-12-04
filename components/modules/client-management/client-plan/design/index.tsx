"use client";

import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/trpc/client";
import { ClientPlanDetails } from "./client-plan-details";
import { ClientPlan } from "@/types/client-management/client-plan-types";
import { decryptClient } from "@/utils/functions/encrypt/client-encryption";
import { ClientPlanComponentData } from "./client-plan-component-data";

type ClientPlanDesignProps = {
  planId: string;
};
export default function Design({ planId }: ClientPlanDesignProps) {
  const decryptedPlanId = decryptClient(planId);
  const { isLoading, data: clientPlan } = trpc.clientPlans.template.useQuery({
    planId: decryptedPlanId,
  });

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  const plan = clientPlan?.data || undefined;

  return (
    <div className="flex flex-col gap-2">
      <ClientPlanDetails plan={plan as ClientPlan} />
      <ClientPlanComponentData plan={plan as ClientPlan} />
    </div>
  );
}
