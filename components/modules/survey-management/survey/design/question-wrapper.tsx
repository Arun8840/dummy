"use client"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import { CustomCard } from "@/utils/ui/custom-card"
import React from "react"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { useSurveyContext } from "@/context/Survey-design-providers"
import { Button } from "@/components/ui/button"
import { Layers, Minus, Pen, X } from "lucide-react"

interface QuestionWrapperProps {
  children: React.ReactNode
  question: QuestionTypes
}
export const QuestionWrapper: React.FC<QuestionWrapperProps> = ({
  children,
  question,
}) => {
  // * HOOKS
  const { remove, isPending } = useSurveyContext()
  const setEditableQuestion = useSurveyStore((state) => state?.editQuestion)

  const displayName =
    question?.name !== "" ? question?.name : question?.subComponentType

  const triggerEdit = () => {
    setEditableQuestion?.(question)
  }

  // ! remove payload
  const removeQuestion = async () => {
    const removeRequest = {
      componentId: question?.id,
      componentType: question?.componentType,
      containerId: question?.containerId,
    }
    if (!removeRequest) return
    remove?.(removeRequest)
  }

  const QuestionActions = () => (
    <div className="space-x-2">
      <Button
        title={"Edit"}
        disabled={isPending}
        type="button"
        onClick={triggerEdit}
        size="icon-sm"
        className="text-primary"
        variant="outline"
      >
        <Pen />
      </Button>
      <Button
        title="Copy Question"
        disabled={isPending}
        type="button"
        size="icon-sm"
        className="text-primary"
        variant="outline"
      >
        <Layers />
      </Button>
      <Button
        title="Remove Question"
        disabled={isPending}
        type="button"
        onClick={removeQuestion}
        size="icon-sm"
        className="text-destructive"
        variant="outline"
      >
        <Minus />
      </Button>
    </div>
  )

  return (
    <CustomCard
      title={`${question?.order + 1}. ${displayName}`}
      description={question?.description}
      CardAction={<QuestionActions />}
      className="shadow"
    >
      {children}
    </CustomCard>
  )
}
