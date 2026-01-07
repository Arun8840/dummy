"use client"
import { SurveyType } from "@/types/survey-management/survey-types"
import { DesignDragItems } from "./survey-design-items"
import { SurveyQuestions } from "./survey-questions"
import { trpc } from "@/trpc/client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { Skeleton } from "@/components/ui/skeleton"
import { Warning } from "@/utils/ui/warning"
import { DragComponentTypes, DragItem } from "@/types"
import { DndContext, DragEndEvent } from "@dnd-kit/core"

interface DesignComponentProps {
  template: SurveyType
}

export function Design({ template }: DesignComponentProps) {
  const { isPending, data, error } = trpc.survey.questions.useQuery()
  const dragItems = data?.data ?? []
  const setComponent = useSurveyStore((state) => state?.setItemsAndTemplate)

  if (isPending) {
    return <DesignSkeleton />
  }

  if (error) {
    return (
      <section className="size-full">
        <Warning
          title="Failed to Load Survey Questions"
          description="An error occurred while fetching the survey design components. Please try again later or contact support if the issue persists."
          variant="destructive"
        />
      </section>
    )
  }

  if (!isPending && template?.id && Array.isArray(dragItems)) {
    setComponent?.(template, dragItems)
  }

  //   ! drop function
  const handleDrop = async (event: DragEndEvent) => {
    // Check if the item was actually dropped in a valid droppable area
    if (!event?.over) return

    const dragData = event?.active?.data?.current as DragItem
    const targetData = event?.over?.data?.current

    const droppedType = event?.active?.data?.current?.type
  }
  return (
    <DndContext onDragEnd={handleDrop}>
      <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2">
        <DesignDragItems components={dragItems as DragComponentTypes[]} />
        <SurveyQuestions />
      </section>
    </DndContext>
  )
}

const DesignSkeleton = () => {
  return (
    <section className="size-full grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-2">
      <aside className="hidden sm:block">
        <Skeleton className="h-full w-full" />
      </aside>
      <main className="w-full">
        <Skeleton className="h-full w-full" />
      </main>
    </section>
  )
}
