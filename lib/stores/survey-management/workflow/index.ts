import { create } from "zustand"
import { initailWorkflowState, WorkflowStateTypes } from "./initial-state"

export const useWorkflowStore = create<WorkflowStateTypes>((set) => ({
  ...initailWorkflowState,
  setComponents(value) {},
}))
