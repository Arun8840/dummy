import { create } from "zustand";
import {
  ClientManagementStateTypes,
  clientManagementStateValue,
} from "./initial-state";

export const useClientManagement = create<ClientManagementStateTypes>(
  (set) => ({
    ...clientManagementStateValue,
    setClientPlanData: (planData) => set({ clientPlan: planData }),
  })
);
