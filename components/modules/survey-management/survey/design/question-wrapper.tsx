"use client"
import { QuestionTypes } from '@/types/survey-management/survey-types'
import { CustomCard } from '@/utils/ui/custom-card'
import React from 'react'
import { SurveyQuestionHeader } from './survey-question-header'
import { useSurveyStore } from '@/lib/stores/survey-management/survey'

interface QuestionWrapperProps {
    children: React.ReactNode
    question: QuestionTypes
}
export const QuestionWrapper: React.FC<QuestionWrapperProps> = ({ children, question }) => {
    // * HOOKS
    const setEditableQuestion = useSurveyStore((state) => state?.editQuestion)

    const displayName = question?.name !== "" ? question?.name : question?.subComponentType
    // ! remove payload
    const removeRequest = {
        componentId: question?.id,
        componentType: question?.componentType,
        containerId: question?.containerId,
    }

    return (
        <CustomCard
            title={`${question?.order + 1}. ${displayName}`}
            CardAction={
                <SurveyQuestionHeader
                    edit={() => setEditableQuestion?.(question)}
                    cancel={() => setEditableQuestion?.(null)}
                    removeRequest={removeRequest}
                />
            }
            className='shadow'
        >
            {children}
        </CustomCard>
    )
}
