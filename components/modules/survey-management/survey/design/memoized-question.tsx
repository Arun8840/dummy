import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Warning } from '@/utils/ui/warning'
import { QuestionTypes } from '@/types/survey-management/survey-types'
import { questionFeatureComponents } from '../questions'


interface MemoizedQuestionProps {
    question: QuestionTypes
}

export const MemoizedQuestion: React.FC<MemoizedQuestionProps> = ({
    question,
}) => {
    const questionType = question?.subComponentType
    const Component = questionFeatureComponents[questionType as keyof typeof questionFeatureComponents]

    if (!Component) {
        return (
            <Warning
                title={`Question Not Found: ${questionType}`}
                description="No valid React component was found for this question type."
                variant="destructive"
                className="w-full"
            />
        )
    }

    return (
        <Suspense
            fallback={<QuestionSkeleton />}
        >
            <Component value={question} />
        </Suspense>
    )
}

const QuestionSkeleton = () => {
    return <Skeleton className="w-full h-28 rounded-xl" />
}
