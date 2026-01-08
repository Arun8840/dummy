import { DesignQuestionComponentProps } from '@/types'
import React from 'react'
import { Input } from '@/components/ui/input'
import { QuestionWrapper } from '../../design/question-wrapper'
import { Label } from '@/components/ui/label'
import { Asterisk } from 'lucide-react'
export const Textbox: React.FC<DesignQuestionComponentProps> = ({ value }) => {
    const questionLabel = value?.textBox?.label ?? null
    const isRequired = value.required
    const answer = value?.textBox?.answer ?? ""
    return (
        <QuestionWrapper question={value}>
            {questionLabel && <Label className='pb-3'>
                {isRequired &&
                    <Asterisk size={"16"} className='text-destructive' />}
                {questionLabel}
            </Label>}
            <Input className='w-1/2' defaultValue={answer} />
        </QuestionWrapper>
    )
}
