import { ClientPlan } from "@/types/client-management/client-plan-types";

export interface ClientManagementStateTypes {
  clientPlan: ClientPlan | null | undefined;
  setClientPlanData?: (plan: ClientPlan) => void;
}

export const clientManagementStateValue: ClientManagementStateTypes = {
  clientPlan: null,
};
