"use client"
import { cn } from "@/lib/utils"
import { useDroppable, useDndContext } from "@dnd-kit/core"
import React, { ReactNode } from "react"

interface DroppableProps {
  id: string
  type?: string | string[]
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

  const isTypeMatch = () => {
    if (!type || !active?.data?.current?.type) return true
    const activeType = active.data.current.type
    if (Array.isArray(type)) {
      return type.includes(activeType)
    }
    return activeType === type
  }
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { type, ...dropData },
    disabled: type ? !isTypeMatch() : false,
  })

  const isValidDrop = isTypeMatch()

  const baseClass = cn(
    "p-3 min-h-36 rounded-xl transition-colors",
    isValidDrop &&
    (isOver
      ? "bg-primary/20 border border-dashed border-primary pointer-events-auto"
      : "border border-primary/40 border-dashed pointer-events-auto")
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
