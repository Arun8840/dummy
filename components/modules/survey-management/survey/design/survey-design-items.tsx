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
import { ChevronsUpDown } from "lucide-react"
import Draggable from "@/utils/ui/dnd-components/draggable"

type DesignDragItemsPropTypes = {
  components: DragComponentTypes[]
}
export const DesignDragItems: React.FC<DesignDragItemsPropTypes> = ({
  components,
}) => {
  // * HOOKS
  const [openIdx, setOpenIdx] = useState<number | null>(null)

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
        <CollapsibleContent className="grid grid-cols-2 gap-2">
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
      return (
        <Draggable
          key={comp?.id}
          id={`${accept}-${comp?.id}`}
          type={accept}
          dragData={comp}
        >
          <Button
            size={"sm"}
            variant={"secondary"}
            className="w-full min-h-20 rounded-lg p-2 hover:bg-primary"
          >
            <small className="text-wrap">{comp?.name}</small>
          </Button>
        </Draggable>
      )
    })
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
