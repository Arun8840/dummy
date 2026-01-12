"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GripVertical } from "lucide-react"

interface SortableProps {
  id: string
  type?: string | string[]
  data?: Record<string, any>
  children: React.ReactNode
  className?: string
}

const SortableItem = ({
  id,
  type,
  data,
  children,
  className,
}: SortableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id, data })

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        transition: isDragging ? undefined : "opacity 200ms ease",
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(" flex items-center justify-between", className)}
    >
      {children}

      <Button
        {...attributes}
        {...listeners}
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical />
      </Button>
    </div>
  )
}

export default SortableItem
