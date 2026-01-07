import { DesignQuestionComponentProps } from '@/types'
import React from 'react'
import { QuestionWrapper } from '../design/question-wrapper'
import { Textarea } from '@/components/ui/textarea'
export const TextArea: React.FC<DesignQuestionComponentProps> = ({ value }) => {
    return (
        <QuestionWrapper question={value}>
            <Textarea className='w-1/2' />
        </QuestionWrapper>
    )
}
