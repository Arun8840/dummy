"use client"
import React, { ReactNode } from "react"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { FlowComponentItem } from "@/types/survey-management/workflow-types"

interface DraggableProps {
  id: string
  type?: string
  children: ReactNode
  className?: string
  dragData?: FlowComponentItem
}

const Draggable = ({
  id,
  type,
  children,
  className,
  dragData,
}: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { type, ...dragData },
    })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.9 : undefined,
        cursor: "grab",
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(className)}
      style={style}
      tabIndex={0}
      role="button"
    >
      {children}
    </div>
  )
}

export default Draggable
