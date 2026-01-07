"use client"
import { useRef } from "react"
import { QuestionTypes, RemoveQuestionRequestTypes, SurveyType } from "@/types/survey-management/survey-types"
import { SurveyQuestions } from "./survey-questions"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { DragItem } from "@/types"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DesignItems } from "./design-items"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { SurveyProvider } from "@/context/Survey-design-providers"
import { SurveyQuestionEditor } from "./survey-question-editor"

interface DesignComponentProps {
  template: SurveyType
}


export function Design({ template }: DesignComponentProps) {

  // * HOOKS
  const lastTemplateId = useRef<string | null>(null)
  const setTemplate = useSurveyStore((state) => state?.setTemplate)
  const setQuestion = useSurveyStore((state) => state?.addQuestion)
  const removeQuestion = useSurveyStore((state) => state?.removeQuestion)

  const addComponent = trpc.survey.addQuestion.useMutation()
  const removeComponent = trpc.survey.removeQuestion.useMutation()

  const isPending = addComponent?.isPending || removeComponent?.isPending

  // Only setTemplate if it's a different id (and with every initial mount)
  if (template && template.id && lastTemplateId.current !== template.id) {
    setTemplate?.(template)
    lastTemplateId.current = template.id
  }

  //   *drop function
  const handleDrop = async (event: DragEndEvent) => {
    // Check if the item was actually dropped in a valid droppable area
    if (!event?.over) return

    const dragData = event?.active?.data?.current as DragItem
    const targetData = event?.over?.data?.current

    const newOrder = Number(targetData?.order ?? 0);
    const request = {
      templateId: template?.id,
      containerId: targetData?.containerId,
      newIndex: newOrder,
      componentType: dragData?.componentType,
      subComponentType: dragData?.subComponentType,
    };

    addComponent.mutate(request, {
      onSuccess(data) {
        const question = data?.data
        setQuestion?.(question)
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center"
        })
      },
    })
  }

  // ! remove questions
  const remove = (arg: RemoveQuestionRequestTypes) => {
    const request = {
      templateId: template?.id as string,
      ...arg
    }
    removeComponent.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center"
        })
        removeQuestion?.(request)
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center"
        })
      },
    })
  }
  const contextValues = {
    templateId: template?.id as string,
    remove: remove,
    isPending: isPending,
  }
  return (
    <DndContext onDragEnd={handleDrop} modifiers={[restrictToWindowEdges]}>

      <SurveyProvider value={contextValues}>
        <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2 relative">
          <DesignItems />
          <SurveyQuestions />
          <SurveyQuestionEditor />
        </section>
      </SurveyProvider>
    </DndContext>
  )
}

// const Proccessing = () => {
//   return <section className="w-full h-screen grid place-items-center bg-secondary/10 rounded-lg fixed z-10 inset-0">
//     <Badge className="flex items-center px-4 py-2">
//       <Spinner className="mr-2 text-muted" />
//       <span>Creating . . .</span>
//     </Badge>
//   </section>
// }