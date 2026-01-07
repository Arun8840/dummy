"use client"
import { Button } from '@/components/ui/button'
import { useSurveyContext } from '@/context/Survey-design-providers'
import { useSurveyStore } from '@/lib/stores/survey-management/survey'
import { RemoveQuestionRequestTypes } from '@/types/survey-management/survey-types'
import { CopyPlus, Layers, Minus, Pen } from 'lucide-react'
import React from 'react'

interface SurveyQuestionHeaderProps {
    removeRequest?: RemoveQuestionRequestTypes
    edit: () => void
    cancel: () => void
    save?: () => void
    copy?: () => void
}
export const SurveyQuestionHeader: React.FC<SurveyQuestionHeaderProps> = ({ removeRequest, edit }) => {
    const { remove, isPending } = useSurveyContext()

    const removeCategory = async () => {
        if (!removeRequest) return
        remove?.(removeRequest)
    }
    return (
        <div className='space-x-2'>
            <Button
                title='Edit' disabled={isPending} type="button" onClick={edit} size={"icon-sm"} className='text-primary' variant={"outline"}>
                <Pen />
            </Button>
            <Button title='Copy Question' disabled={isPending} type="button" onClick={removeCategory} size={"icon-sm"} className='text-primary' variant={"outline"}>
                <Layers />
            </Button>
            <Button title='Remove Question' disabled={isPending} type="button" onClick={removeCategory} size={"icon-sm"} className='text-destructive' variant={"outline"}>
                <Minus />
            </Button>
        </div>
    )
}
