"use client"

import React, { useState } from "react"

import { CustomCard } from "@/utils/ui/custom-card"
import { DragComponentTypes, DragItem } from "@/types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, ListTodo, Sparkle, StarHalf, VectorSquare } from "lucide-react"
import Draggable from "@/utils/ui/dnd-components/draggable"
import { trpc } from "@/trpc/client"
import { Warning } from "@/utils/ui/warning"
import { Skeleton } from "@/components/ui/skeleton"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"


export const DesignDragItems = () => {
  // * HOOKS
  const { isPending, data, error } = trpc.survey.questions.useQuery()
  const setComponent = useSurveyStore((state) => state?.setDragItems)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const components = data?.data || []
  // ! create group
  const CreateGroup: React.FC<{ group: DragComponentTypes; idx: number }> = ({
    group,
    idx,
  }) => {
    const isOpen = openIdx === idx
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={() => setOpenIdx(isOpen ? null : idx)}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm pb-2">{group?.name}</h4>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-expanded={isOpen}
              tabIndex={0}
            >
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="grid grid-cols-2 gap-2 pt-1">
          <CreateDragItem item={group?.items || []} />
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // ! create drag item
  const CreateDragItem: React.FC<{
    item: DragItem[]
  }> = ({ item }) => {
    return item?.map((comp) => {
      const accept = comp?.componentType
      const isCategory = comp?.componentType === "Category"
      return (
        <Draggable
          key={comp?.id}
          id={`${accept}-${comp?.id}`}
          type={accept}
          dragData={comp}
        >
          <Button
            variant={"secondary"}
            className="w-full hover:bg-primary flex justify-between"
          >
            {isCategory ? <VectorSquare /> : <ListTodo />}
            <small className="text-wrap flex-1">{comp?.name}</small>
          </Button>
        </Draggable>
      )
    })
  }

  if (isPending) {
    return <Skeleton className="size-full" />
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

  if (!isPending && Array.isArray(components)) {
    setComponent?.(components)
  }

  return (
    <CustomCard className="hidden sm:block h-full">
      {components?.length > 0 &&
        components?.map((component, compIdx) => (
          <CreateGroup
            key={component.id ?? compIdx}
            group={component}
            idx={compIdx}
          />
        ))}
    </CustomCard>
  )
}
