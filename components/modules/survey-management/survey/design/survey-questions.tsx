"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { CustomCard } from "@/utils/ui/custom-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Warning } from "@/utils/ui/warning"

const Category = dynamic(
  () => import("../questions").then((mod) => ({ default: mod.Category })),
  {
    ssr: false,
  }
)

const CategoryFallback = () => <Skeleton className="w-full h-40" />

export const SurveyQuestions = () => {
  const template = useSurveyStore((state) => state?.surveyTemplate)
  const questions = template?.children || []

  return (
    <Card className="p-3 spacey gap-0">
      <CardHeader className="p-0">
        <CardTitle>{template?.name}</CardTitle>
      </CardHeader>
      <CardContent className="size-full p-0">
        <Droppable
          id="survey-questions"
          type="Category"
          className="space-y-2 size-full"
        >
          {/* //* QUESTIONS */}
          {questions.length > 0 ? (
            questions.map((cat, catIdx) => (
              <Suspense key={cat?.id} fallback={<CategoryFallback />}>
                <Category value={cat} questionIdx={catIdx} />
              </Suspense>
            ))
          ) : (
            <Warning
              title="Add questions"
              description="Use the button above or drag and drop from the question selector to add questions to your survey."
              variant="default"
            />
          )}
        </Droppable>
      </CardContent>
    </Card>
  )
}
