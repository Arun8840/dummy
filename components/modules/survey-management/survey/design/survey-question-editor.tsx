"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { questionEditor } from "../questions"
import { Warning } from "@/utils/ui/warning"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

export const SurveyQuestionEditor = () => {
  // *HOOKS
  const question = useSurveyStore((state) => state?.editableQuestion)
  const setEditableQuestion = useSurveyStore((state) => state?.editQuestion)

  const questionType = question?.subComponentType
  const open = !!questionType

  const handleClose = () => setEditableQuestion?.(null)

  if (!open) return null

  const title = question?.name ? question.name : question?.subComponentType
  const description = `Editing question of type: ${question?.subComponentType}`

  const EditableComponent =
    questionEditor[questionType as keyof typeof questionEditor]

  return (
    <ModalDrawer
      open={open}
      setOpen={handleClose}
      title={title}
      description={description}
      direction="bottom"
    >
      {/* Render warning if EditableComponent is missing */}
      {!EditableComponent ? (
        <div>
          <Warning
            title={`Editor Not Found: ${questionType}`}
            description="No valid editor component was found for this question type."
            variant="destructive"
          />
        </div>
      ) : (
        <Suspense fallback={<PropertieSkeleton />}>
          <EditableComponent value={question} />
        </Suspense>
      )}
    </ModalDrawer>
  )
}

const PropertieSkeleton = () => {
  return <Skeleton className="h-40" />
}
