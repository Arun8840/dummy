import { DesignQuestionComponentProps } from '@/types'
import React from 'react'
import { QuestionWrapper } from '../design/question-wrapper'
import { Input } from '@/components/ui/input'
export const TextboxOverride: React.FC<DesignQuestionComponentProps> = ({ value }) => {
    return (
        <QuestionWrapper question={value}>
            <Input className='w-1/2' />
        </QuestionWrapper>
    )
}
