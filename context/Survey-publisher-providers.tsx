import { QuestionTypes, RemoveQuestionRequestTypes } from "@/types/survey-management/survey-types"
import { WorkflowTemplateResponse } from "@/types/survey-management/workflow-types"
import React, { createContext, useContext } from "react"


type SurveyPublisherContextType = {
    templateId: string
    remove?: (arg: RemoveQuestionRequestTypes) => void
    save: (arg: QuestionTypes) => void
    isPending?: boolean
    workflowTemplates: WorkflowTemplateResponse
    isEdit?: string | null
    setEdit?: React.Dispatch<React.SetStateAction<string | null>>
}

const SurveyPublisherContext = createContext<SurveyPublisherContextType | undefined>(
    undefined
)

export const useSurveyPublisherContext = () => {
    const context = useContext(SurveyPublisherContext)
    if (!context) {
        throw new Error("useSurveyPublisherContext must be used within a SurveyPublihserProvider")
    }
    return context
}

interface SurveyPublihserProviderProps {
    value: SurveyPublisherContextType
    children: React.ReactNode
}

export const SurveyPublihserProvider: React.FC<SurveyPublihserProviderProps> = ({
    value,
    children,
}) => (
    <SurveyPublisherContext.Provider value={value}>
        {children}
    </SurveyPublisherContext.Provider>
)
