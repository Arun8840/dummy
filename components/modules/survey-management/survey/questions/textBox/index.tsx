import { DesignQuestionComponentProps } from '@/types'
import React from 'react'
import { Input } from '@/components/ui/input'
import { QuestionWrapper } from '../../design/question-wrapper'
export const Textbox: React.FC<DesignQuestionComponentProps> = ({ value }) => {
    return (
        <QuestionWrapper question={value}>
            <Input className='w-1/2' />
        </QuestionWrapper>
    )
}
