import { FlowComponentsResponse } from "@/types/survey-management/workflow-types"

export interface WorkflowStateTypes {
  components: FlowComponentsResponse
  setComponents?: (value: FlowComponentsResponse) => void
}

export const initailWorkflowState: WorkflowStateTypes = {
  components: [],
}
