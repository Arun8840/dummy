import { DragComponentTypes } from "@/types"

export interface WorkflowStateTypes {
  components: DragComponentTypes[]
  setComponents?: (value: DragComponentTypes[]) => void
}

export const initailWorkflowState: WorkflowStateTypes = {
  components: [],
}
