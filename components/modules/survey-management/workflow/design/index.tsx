"use client"
//* React and third-party imports
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

//* App-level UI components imports
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Warning } from "@/utils/ui/warning"
import { Plus } from "lucide-react"

//* Feature/module imports
import { WorkflowFormProvider } from "./workflow-provider"
import { WorkflowDragItems } from "./workflow-drag-items"

//* Types and API imports
import {
  Step as StepType,
  WorkflowTemplate,
} from "@/types/survey-management/workflow-types"
import { trpc } from "@/trpc/client"
import { Badge } from "@/components/ui/badge"
import { useWorkflowStore } from "@/lib/stores/survey-management/workflow"

import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { Step } from "../ui/step"
import { DragItem } from "@/types"

export interface WorkflowProps {
  template: WorkflowTemplate
}

type EditStateTypes = {
  overAll: {
    stepId: string | null
  }
  isRule: {
    ruleId: string | null
  }
}

export default function Workflow({ template }: WorkflowProps) {
  // * State hooks
  const [edit, setEdit] = useState<EditStateTypes>({
    overAll: {
      stepId: null,
    },
    isRule: {
      ruleId: null,
    },
  }) //*

  // * trpc hooks
  const addComponent = trpc.workflow.addComponent.useMutation()
  const updateComponent = trpc.workflow.updateStep.useMutation()
  const { data: dragItems, isLoading } = trpc.workflow.components.useQuery()
  const setComponents = useWorkflowStore((state) => state.setComponents)

  // * Form hook
  const form = useForm<WorkflowTemplate>({
    defaultValues: {
      ...template,
    },
  })

  // * Derived state
  const isStepAdding = addComponent?.isPending
  const isUpdating = updateComponent?.isPending
  const templateId = form.getValues("id")

  // * handle add step
  const addWorkflowComponent = async (request: Record<string, string>) => {
    addComponent.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
        const steps = data?.data?.steps || []
        form.setValue("steps", steps)
      },
    })
  }

  // * update component
  const updateWorkflowComponent = async (arg: StepType) => {
    const updatedTemplate = form.getValues()
    const request = {
      ...updatedTemplate,
    }
    updateComponent.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
        setEdit((prev) => ({
          ...prev,
          overAll: { ...prev.overAll, stepId: null },
          isRule: { ...prev.isRule, ruleId: null },
        }))
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center",
        })
        form.reset({ ...template })
      },
    })
  }

  // * Context value for provider
  const contextValue = {
    edit,
    setEdit,
    updateWorkflowComponent,
    isPending: isUpdating,
    ...form,
  }

  // * Set workflow components in store as soon as possible for correct step ordering
  if (dragItems?.status) {
    setComponents?.(dragItems?.data || [])
  }

  // * Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center size-full gap-2">
        <Badge>
          <Spinner /> <span>Loading workflow components...</span>
        </Badge>
      </div>
    )
  }

  const currentSteps = form.watch("steps") || []
  const stepRequest = {
    templateId: templateId,
    componentType: "Step",
    subComponentType: "Step",
    containerId: templateId,
  }
  const handleDrop = async (event: DragEndEvent) => {
    // Check if the item was actually dropped in a valid droppable area
    if (!event?.over) return

    const dragData = event?.active?.data?.current as DragItem
    const targetData = event?.over?.data?.current

    const droppedType = event?.active?.data?.current?.type
    if (droppedType === "workflow") {
      await addWorkflowComponent(stepRequest)
      return
    }
    if (droppedType === "roles") {
      const roleRequest = {
        templateId: templateId as string,
        containerId: targetData?.stepId,
        componentId: dragData?.id,
        componentType: "Role",
        subComponentType: dragData?.subComponentType,
      }
      await addWorkflowComponent(roleRequest)
      return
    }
    if (dragData?.subComponentType === "Email") {
      const roleRequest = {
        templateId: templateId as string,
        containerId: targetData?.stepId,
        componentId: dragData?.id,
        componentType: "Step",
        subComponentType: dragData?.subComponentType,
      }
      await addWorkflowComponent(roleRequest)
      return
    }
    if (dragData?.subComponentType === "Rule") {
      const ruleRequest = {
        templateId: templateId as string,
        containerId: targetData?.stepId,
        componentId: dragData?.id,
        componentContainerId: dragData?.containerId as string,
        componentType: dragData?.componentType,
        subComponentType: dragData?.subComponentType,
      }
      await addWorkflowComponent(ruleRequest)
      return
    }

    const request = {
      templateId: templateId as string,
      containerId: targetData?.stepId as string,
      componentType: dragData?.componentType as string,
      subComponentType: dragData?.subComponentType as string,
      componentContainerId: dragData?.templateId as string,
      tableId: (dragData?.containerId ?? "") as string,
      tableColumnId: dragData?.id as string,
    }
    await addWorkflowComponent(request)
    return
  }
  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="flex flex-1 gap-2 p-1">
        {/* Sidebar */}
        <div className="w-xs hidden lg:flex flex-col gap-2 max-h-max  sticky top-0 z-2">
          {/* <WorkflowInfo template={template} /> */}
          <WorkflowDragItems components={dragItems?.data || []} />
        </div>
        {/* Main content goes here */}
        <Droppable
          id={`workflow-${template?.id}`}
          type="workflow"
          className="flex-1 p-1"
        >
          <div className="flex flex-col gap-3 relative before:content-[''] before:absolute before:left-5 before:top-0 before:bottom-0 before:w-0 before:border-l before:border-dashed before:border-primary">
            <WorkflowFormProvider value={contextValue}>
              {currentSteps?.length > 0
                ? currentSteps?.map((step, stepIdx) => {
                    return (
                      <Step key={step?.id} value={step} stepIdx={stepIdx} />
                    )
                  })
                : ""}
              <Button
                type="button"
                onClick={() => addWorkflowComponent(stepRequest)}
                className="size-10 rounded-lg z-1"
                disabled={isStepAdding}
              >
                {isStepAdding ? <Spinner /> : <Plus />}
              </Button>
              {currentSteps?.length === 0 && (
                <Warning
                  title="No Steps Added"
                  description="Drag and drop a step here, or click the + button to add a new workflow step."
                  variant="default"
                />
              )}
            </WorkflowFormProvider>
          </div>
        </Droppable>
      </div>
    </DndContext>
  )
}
