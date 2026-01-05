"use client"
import { cn } from "@/lib/utils"
import { useDroppable, useDndContext } from "@dnd-kit/core"
import React, { ReactNode } from "react"

interface DroppableProps {
  id: string
  type?: string
  children: ReactNode
  className?: string
  dropData?: Record<string, string>
}

const Droppable = ({
  id,
  type,
  children,
  className,
  dropData,
}: DroppableProps) => {
  const { active } = useDndContext()
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { type, ...dropData },
    disabled: type ? active?.data?.current?.type !== type : false,
  })

  const isValidDrop = type ? active?.data?.current?.type === type : true

  const baseClass = cn(
    "p-3 min-h-36 rounded-lg transition-colors",
    isValidDrop &&
      (isOver
        ? "bg-primary/20 ring-2 ring-primary pointer-events-auto"
        : " ring-2 ring-muted pointer-events-auto")
  )

  return (
    <div
      ref={isValidDrop ? setNodeRef : undefined}
      className={cn(baseClass, className)}
    >
      {children}
    </div>
  )
}

export default Droppable
