"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Warning } from "@/utils/ui/warning"
import { MemoizedQuestion } from "./memoized-question"
import { SurveyQuestionEditor } from "./survey-question-editor"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CustomCard } from "@/utils/ui/custom-card"

export const SurveyQuestions = () => {
  const template = useSurveyStore((state) => state?.surveyTemplate)
  const questions = template?.children || []

  const currentChildrenLength = template?.children?.length ?? 0
  const additionalDropData = {
    containerId: template?.id as string,
    order: String(currentChildrenLength),
  }

  const categoryIds = questions.map((cat) => cat?.id).filter(Boolean)

  return (
    <>
      <CustomCard title={template?.name}>
        <Droppable
          id="survey-questions"
          type="Category"
          className="space-y-2 size-full p-2"
          dropData={additionalDropData}
        >
          <SortableContext
            items={categoryIds}
            strategy={verticalListSortingStrategy}
          >
            {/* //* QUESTIONS */}
            {questions.length > 0 ? (
              questions.map((cat, catIdx) => (
                <MemoizedQuestion key={cat?.id} question={cat} />
              ))
            ) : (
              <Warning
                title="Add questions"
                description="Use the button above or drag and drop from the question selector to add questions to your survey."
                variant="default"
              />
            )}
          </SortableContext>
        </Droppable>
      </CustomCard>
      <SurveyQuestionEditor />
    </>
  )
}
