import { DragComponentTypes } from "@/types"
import {
  QuestionTypes,
  RemoveQuestionRequestTypes,
  SaveQuestionRequestType,
  SurveyType,
} from "@/types/survey-management/survey-types"

export interface SurveyStateTypes {
  components: DragComponentTypes[]
  surveyTemplate: SurveyType | null
  editableQuestion: QuestionTypes | null

  setTemplate?: (template: SurveyType) => void
  setDragItems?: (dragItems: DragComponentTypes[]) => void
  addQuestion?: (question: QuestionTypes) => void
  removeQuestion?: (question: RemoveQuestionRequestTypes) => void
  saveQuestion?: (saveArg: SaveQuestionRequestType) => void
  moveQuestion?: (params: {
    dragQuestionId: string
    targetQuestionId: string
    containerId: string
    oldIndex: number
    newIndex: number
  }) => void
  editQuestion?: (question: QuestionTypes | null) => void
}

export const initailSurveyState: SurveyStateTypes = {
  components: [],
  surveyTemplate: null,
  editableQuestion: null,
}
