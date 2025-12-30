import { WorkflowTemplate } from "@/types/survey-management/workflow-types"
import React, { createContext, useContext } from "react"
import { UseFormReturn } from "react-hook-form"

type EditStateTypes = {
  overAll: {
    stepId: string | null
  }
  isRule: {
    ruleId: string | null
  }
}
type WorkflowFormContextType = UseFormReturn<WorkflowTemplate> & {
  edit: EditStateTypes
  setEdit: React.Dispatch<React.SetStateAction<EditStateTypes>>
}

const WorkflowFormContext = createContext<WorkflowFormContextType | undefined>(
  undefined
)

export const useWorkflowForm = () => {
  const context = useContext(WorkflowFormContext)
  if (!context) {
    throw new Error(
      "useWorkflowForm must be used within a WorkflowFormProvider"
    )
  }
  return context
}

interface WorkflowFormProviderProps {
  value: WorkflowFormContextType
  children: React.ReactNode
}

export const WorkflowFormProvider: React.FC<WorkflowFormProviderProps> = ({
  value,
  children,
}) => (
  <WorkflowFormContext.Provider value={value}>
    {children}
  </WorkflowFormContext.Provider>
)
