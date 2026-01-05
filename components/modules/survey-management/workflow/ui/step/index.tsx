"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Step as StepType } from "@/types/survey-management/workflow-types"
import { CustomCard } from "@/utils/ui/custom-card"
import { Minus, Pen, X } from "lucide-react"
import React, { CSSProperties, HTMLAttributes } from "react"
import { WorkflowRoles } from "./workflow-roles"
import { WorkflowRules } from "./workflow-rules"
import { WorkflowEmailTemplates } from "./workflow-email-templates"
import { useWorkflowForm } from "../../design/workflow-provider"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

interface StepProps extends HTMLAttributes<HTMLDivElement> {
  value: StepType
  stepIdx: number
}

const baseClass = "w-full flex-1 hover:shadow-md transition-shadow"
export const Step: React.FC<StepProps> = ({ value, className, stepIdx }) => {
  const { name, color, id: currentStepId, containerId } = value
  const stepName = name && name.trim() !== "" ? name : "Step"
  //   *HOOKS
  const {
    edit,
    setEdit,
    setValue,
    isPending = false,
    updateWorkflowComponent,
  } = useWorkflowForm()
  const deleteStep = trpc.workflow.removeStep.useMutation()

  // * variables and flags
  const colorVariables = {
    "--step-color": color,
  } as CSSProperties
  const isEdited = edit.overAll.stepId === currentStepId
  const isOthersEditted = edit?.isRule?.ruleId ?? false
  const isRemoving = deleteStep?.isPending

  // ! remove step
  const removeStep = async () => {
    const request = {
      templateId: containerId, //step container id
      subComponentType: "Step",
      componentId: currentStepId,
    }
    deleteStep.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
        setValue(`steps`, data?.data?.steps)
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center",
        })
      },
    })
  }

  // * save step
  const saveStep = () => {
    const request = {
      ...value,
    }
    updateWorkflowComponent(request)
  }

  // ! step header actions
  const stepActions = () => {
    return isEdited ? (
      <Button
        size={"icon-sm"}
        variant={"secondary"}
        type="button"
        className="hover:text-primary"
        onClick={() =>
          setEdit((prev) => ({
            ...prev,
            overAll: { ...prev.overAll, stepId: null },
          }))
        }
      >
        <X className="text-muted-foreground" />
      </Button>
    ) : (
      <div className="flex items-center gap-2 ">
        <Button
          disabled={isRemoving}
          size={"icon-sm"}
          variant={"secondary"}
          type="button"
          className="hover:text-primary"
          onClick={() =>
            setEdit((prev) => ({
              ...prev,
              overAll: { ...prev.overAll, stepId: value?.id },
            }))
          }
        >
          <Pen className="text-muted-foreground" />
        </Button>
        <Button
          disabled={isRemoving}
          onClick={removeStep}
          size={"icon-sm"}
          variant={"secondary"}
          type="button"
          className="hover:text-primary"
        >
          {isRemoving ? (
            <Spinner />
          ) : (
            <Minus className="text-muted-foreground" />
          )}
        </Button>
      </div>
    )
  }
  return (
    <div style={colorVariables} className="flex gap-2">
      <Badge className="size-10 z-1 rounded-lg">{stepIdx + 1}</Badge>
      <CustomCard
        CardAction={stepActions()}
        title={stepName}
        className={cn(baseClass, className)}
      >
        {isEdited && (
          <>
            <Input
              className="mb-2"
              placeholder="name"
              defaultValue={stepName}
              onBlur={(e) =>
                setValue(`steps.${stepIdx}.name`, e?.target?.value)
              }
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
              <CheckboxGroup
                id={`stepStatus_${stepIdx}`}
                label="Step Status"
                defaultChecked={!!value?.status}
                onCheckedChange={(e) => setValue(`steps.${stepIdx}.status`, e)}
              />
              <CheckboxGroup
                id={`answerKey_${stepIdx}`}
                label="Answer Key"
                defaultChecked={!!value?.answerKey}
                onCheckedChange={(e) =>
                  setValue(`steps.${stepIdx}.answerKey`, e)
                }
              />
              <CheckboxGroup
                id={`readOnly_${stepIdx}`}
                label="Read Only"
                defaultChecked={!!value?.readOnly}
                onCheckedChange={(e) =>
                  setValue(`steps.${stepIdx}.readOnly`, e)
                }
              />
              <CheckboxGroup
                id={`color_${stepIdx}`}
                label="Color"
                // defaultChecked={!!value?.answerKey}
                // onCheckedChange={(e) => setValue(`steps.${stepIdx}.status`,e)}
              />
            </div>
          </>
        )}
        {/* //* ROLES----EMAIL TEMPLATES----RULES */}
        <div className="flex flex-col gap-2">
          <WorkflowRoles
            roles={value?.roles || []}
            stepIdx={stepIdx}
            stepId={value?.id}
          />
          <WorkflowEmailTemplates
            stepIdx={stepIdx}
            stepId={value?.id}
            emails={value?.emailTemplates || []}
          />
          <WorkflowRules
            rules={value?.rules || []}
            stepIdx={stepIdx}
            stepId={value?.id}
          />
        </div>

        {/* //* save actions */}
        {(isEdited || isOthersEditted) && (
          <div className="flex items-center justify-end gap-2 mt-1">
            <Button
              onClick={saveStep}
              type="button"
              size={"sm"}
              className="cursor-pointer"
            >
              {isPending ? (
                <>
                  <Spinner />
                  Updating ...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        )}
      </CustomCard>
    </div>
  )
}
