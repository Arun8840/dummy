"use client"
import { useRef } from "react"
import {
  QuestionTypes,
  RemoveQuestionRequestTypes,
  SurveyType,
} from "@/types/survey-management/survey-types"
import { SurveyQuestions } from "./survey-questions"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { DragItem } from "@/types"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { DesignItems } from "./design-items"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { SurveyProvider } from "@/context/Survey-design-providers"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface DesignComponentProps {
  template: SurveyType
}

export function Design({ template }: DesignComponentProps) {
  // * HOOKS
  const lastTemplateId = useRef<string | null>(null)
  const setTemplate = useSurveyStore((state) => state?.setTemplate)
  const setQuestion = useSurveyStore((state) => state?.addQuestion)
  const removeQuestion = useSurveyStore((state) => state?.removeQuestion)
  const saveQuestion = useSurveyStore((state) => state?.saveQuestion)

  const addComponent = trpc.survey.addQuestion.useMutation()
  const removeComponent = trpc.survey.removeQuestion.useMutation()
  const moveComponent = trpc.survey.moveQuestion.useMutation()
  const saveComponent = trpc.survey.saveQuestion.useMutation()

  const isPending =
    addComponent?.isPending ||
    removeComponent?.isPending ||
    moveComponent?.isPending ||
    saveComponent?.isPending

  // Only setTemplate if it's a different id (and with every initial mount)
  if (template && template.id && lastTemplateId.current !== template.id) {
    setTemplate?.(template)
    lastTemplateId.current = template.id
  }

  //   *drop function
  const handleDrop = async (event: DragEndEvent) => {
    // Only handle drops when there is an actual droppable target
    if (!event?.over) return

    const dragData = event?.active?.data?.current
    const targetData = event?.over?.data?.current

    // Guard: If either dragData or targetData is missing, do nothing
    if (!dragData || !targetData) return

    // Define isMove as a reorder: both sortable, and not the same id (not a noop)
    const isMove = !!targetData?.sortable && event.active.id !== event.over.id

    if (isMove) {
      const question = dragData?.component as QuestionTypes
      const request = {
        data: {
          component: question,
          componentId: question?.id,
          componentType: question?.componentType,
          containerId: question?.containerId,
          newIndex: dragData?.index,
          subComponentType: question?.subComponentType,
          templateId: template?.id,
        },
        dragIndex: dragData.index,
        hoverIndex: targetData.index,
      }
      moveComponent.mutate(request, {
        onSuccess(data) {
          console.log(data)
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          })
        },
      })
      return
    }

    // Otherwise, if dropping from palette (not reorder), call add logic ONCE
    // Need to ensure "Add" is not triggered on moves
    const isNewAddition =
      (!dragData?.sortable && !targetData?.sortable) || dragData?.fromPalette

    if (isNewAddition) {
      const newOrder = Number(targetData?.order ?? 0)

      const request = {
        templateId: template?.id,
        containerId: targetData?.containerId,
        newIndex: newOrder,
        componentType: dragData?.componentType,
        subComponentType: dragData?.subComponentType,
      }

      addComponent.mutate(request, {
        onSuccess(data) {
          const question = data?.data
          setQuestion?.(question)
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          })
        },
      })
    }
  }

  // ! remove questions
  const remove = (arg: RemoveQuestionRequestTypes) => {
    const request = {
      templateId: template?.id as string,
      ...arg,
    }
    removeComponent.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
        removeQuestion?.(request)
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center",
        })
      },
    })
  }

  const save = (arg: QuestionTypes) => {
    const request = {
      componentId: arg?.id,
      containerId: arg?.containerId,
      templateId: template?.id,
      componentType: arg?.componentType,
      subComponentType: arg?.subComponentType,
      component: arg,
    }
    saveComponent.mutate(request, {
      onSuccess(data) {
        toast.success(data?.message, {
          position: "top-center",
        })
        saveQuestion?.(request)
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center",
        })
      },
    })
  }

  const contextValues = {
    templateId: template?.id as string,
    remove: remove,
    save: save,
    isPending: isPending,
  }

  return (
    <DndContext onDragEnd={handleDrop} modifiers={[restrictToWindowEdges]}>
      <SurveyProvider value={contextValues}>
        <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2 relative">
          <DesignItems />
          <SurveyQuestions />
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
