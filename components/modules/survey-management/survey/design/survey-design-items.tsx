"use client"
import { FeatureCard } from "@/utils/ui/feature-card"
import {
  FlowComponentItem,
  FlowComponents,
  FlowComponentsResponse,
} from "@/types/survey-management/workflow-types"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import Draggable from "@/utils/ui/dnd-components/draggable"
import { CustomCard } from "@/utils/ui/custom-card"
import { DragOverlay } from "@dnd-kit/core"



export const DesignDragItems = ({
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  // ! create group
  // const CreateGroup: React.FC<{ group: FlowComponents; idx: number }> = ({
  //   group,
  //   idx,
  // }) => {
  //   const isOpen = openIdx === idx
  //   const accept = group?.dragOptions?.name || ""
  //   return (
  //     <Collapsible
  //       open={isOpen}
  //       onOpenChange={() => setOpenIdx(isOpen ? null : idx)}
  //     >
  //       <div className="flex items-center justify-between">
  //         <h4 className="text-sm pb-2">{group?.name}</h4>
  //         <CollapsibleTrigger asChild>
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="size-8"
  //             aria-expanded={isOpen}
  //             tabIndex={0}
  //           >
  //             <ChevronsUpDown />
  //             <span className="sr-only">Toggle</span>
  //           </Button>
  //         </CollapsibleTrigger>
  //       </div>
  //       <CollapsibleContent className="grid grid-cols-2 gap-2">
  //         <CreateDragItem item={group?.items || []} accept={accept} />
  //       </CollapsibleContent>
  //     </Collapsible>
  //   )
  // }

  // ! create drag item
  // const CreateDragItem: React.FC<{
  //   item: FlowComponentItem[]
  //   accept: string
  // }> = ({ item, accept }) => {
  //   return item?.map((comp) => (
  //     <Draggable
  //       key={comp?.id}
  //       id={`${accept}-${comp?.id}`}
  //       type={accept}
  //       dragData={comp}
  //     >
  //       <Button
  //         size={"sm"}
  //         variant={"secondary"}
  //         className="w-full min-h-30 rounded-lg p-2 hover:bg-primary"
  //       >
  //         <small className="text-wrap">{comp?.name}</small>
  //       </Button>
  //     </Draggable>
  //   ))
  // }

  return (
    <CustomCard>
      {/* {components?.length > 0 &&
        components?.map((component, compIdx) => (
          <CreateGroup
            key={component.id ?? compIdx}
            group={component}
            idx={compIdx}
          />
        ))} */}
      drag items
    </CustomCard>
  )
}
