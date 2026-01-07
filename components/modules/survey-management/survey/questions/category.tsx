"use client"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import Droppable from "@/utils/ui/dnd-components/droppable"
import React, { HTMLAttributes } from "react"
import { MemoizedQuestion } from "../design/memoized-question"
import { QuestionWrapper } from "../design/question-wrapper"
import { DesignQuestionComponentProps } from "@/types"


export const Category: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  // * HOOKS
  const currentChildrenLength = value?.children?.length ?? 0
  const additionalDropData = {
    containerId: value?.id,
    order: String(currentChildrenLength)
  }

  // ! remove payload
  const removeRequest = {
    componentId: value?.id,
    componentType: value?.componentType,
    containerId: value?.containerId,
  }

  return (
    <QuestionWrapper question={value}>
      <Droppable
        id={`category-${value?.id}`}
        type={["Category", "Question"]}
        className="flex-1 h-full min-h-28 flex flex-col gap-2 p-2"
        dropData={additionalDropData}
      >
        {
          value?.children?.length > 0 &&
          value?.children?.map((comp, compIdx) => {
            return <MemoizedQuestion key={comp?.id} question={comp} />
          })
        }
      </Droppable>
    </QuestionWrapper>
  )
}
