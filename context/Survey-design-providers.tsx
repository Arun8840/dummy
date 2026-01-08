import { QuestionTypes, RemoveQuestionRequestTypes } from "@/types/survey-management/survey-types"
import React, { createContext, useContext } from "react"


type SurveyContextType = {
    templateId: string
    remove?: (arg: RemoveQuestionRequestTypes) => void
    save: (arg: QuestionTypes) => void
    isPending?: boolean
}

const SurveyContext = createContext<SurveyContextType | undefined>(
    undefined
)

export const useSurveyContext = () => {
    const context = useContext(SurveyContext)
    if (!context) {
        throw new Error("useSurveyContext must be used within a SurveyProvider")
    }
    return context
}

interface SurveyProviderProps {
    value: SurveyContextType
    children: React.ReactNode
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({
    value,
    children,
}) => (
    <SurveyContext.Provider value={value}>
        {children}
    </SurveyContext.Provider>
)
