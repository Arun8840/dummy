"use client"
import Droppable from "@/utils/ui/dnd-components/droppable"
import React from "react"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionWrapper } from "../../design/question-wrapper"
import { MemoizedQuestion } from "../../design/memoized-question"

export const Category: React.FC<DesignQuestionComponentProps> = ({ value }) => {
  // * HOOKS
  const currentChildrenLength = value?.children?.length ?? 0
  const additionalDropData = {
    containerId: value?.id,
    order: String(currentChildrenLength),
  }

  return (
    <QuestionWrapper question={value}>
      <Droppable
        id={`category-${value?.id}`}
        type={["Category", "Question"]}
        className="flex-1 h-full min-h-28 flex flex-col gap-2 p-2"
        dropData={additionalDropData}
      >
        {value?.children?.length > 0
          ? value?.children?.map((comp) => (
              <MemoizedQuestion key={comp?.id} question={comp} />
            ))
          : null}
      </Droppable>
    </QuestionWrapper>
  )
}
