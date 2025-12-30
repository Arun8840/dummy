"use client"
import { WorkflowTemplate } from "@/types/survey-management/workflow-types"
import { WorkflowFormProvider } from "./workflow-provider"
import { useForm } from "react-hook-form"
import { Step } from "../ui/step"
import { WorkflowInfo } from "./workflow-info"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

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
  // * HOOKS
  const [edit, setEdit] = useState<EditStateTypes>({
    overAll: {
      stepId: null,
    },
    isRule: {
      ruleId: null,
    },
  })
  const addComponent = trpc.workflow.addComponent.useMutation()
  const form = useForm<WorkflowTemplate>({
    defaultValues: {
      ...template,
    },
  })

  const isStepAdding = addComponent?.isPending

  const currentSteps = form.watch("steps") || []
  const templateId = form.getValues("id")

  // * handle add step
  const addNewStep = async () => {
    const request = {
      templateId: templateId,
      componentType: "Step",
      subComponentType: "Step",
      containerId: templateId,
    }
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

  const contextValue = { edit, setEdit, ...form }
  return (
    <section className="size-full flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-1/3 lg:w-1/3">
        <WorkflowInfo template={template} />
      </div>
      <div className="w-full md:w-2/3 lg:w-2/3 flex flex-col gap-3 relative after:absolute after:content-[''] after:h-full after:border-l after:border-primary dark:after:border-secondary after:border-dashed after:left-5">
        <WorkflowFormProvider value={contextValue}>
          {currentSteps?.length > 0
            ? currentSteps?.map((step, stepIdx) => {
                return <Step key={step?.id} value={step} stepIdx={stepIdx} />
              })
            : ""}

          {/* //* CREATE NEW STEP BUTTON */}
          <Button
            type="button"
            onClick={addNewStep}
            variant={"secondary"}
            className="size-10 rounded-lg z-1"
            disabled={isStepAdding}
          >
            {isStepAdding ? <Spinner /> : <Plus />}
          </Button>
        </WorkflowFormProvider>
      </div>
    </section>
  )
}
