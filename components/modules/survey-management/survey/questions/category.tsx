"use client"
import { cn } from "@/lib/utils"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import { CustomCard } from "@/utils/ui/custom-card"
import Droppable from "@/utils/ui/dnd-components/droppable"
import React, { HTMLAttributes } from "react"

interface CategoryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: QuestionTypes
  questionIdx: number
}

export const Category: React.FC<CategoryProps> = ({
  value,
  questionIdx,
  className,
}) => {
  return (
    <CustomCard
      className={cn(className)}
      title={`${questionIdx + 1}. ${value?.name}`}
    >
      {/* //* CATEGORY - QUESTIONS */}
      <Droppable
        id={`category-${value?.id}`}
        type={["Category", "Question"]}
        className="flex-1 h-full min-h-28"
      >
        hello
      </Droppable>
    </CustomCard>
  )
}
