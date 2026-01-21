import { DragComponentTypes } from "@/types"
import {
  PublisherComponentType,
  QuestionTypes,
  RemoveQuestionRequestTypes,
  SaveQuestionRequestType,
  SurveyPublisherTemplateType,
  SurveyType,
} from "@/types/survey-management/survey-types"

export interface SurveyStateTypes {
  components: DragComponentTypes[]
  surveyTemplate: SurveyType | null
  surveyPublisherTemplate: SurveyPublisherTemplateType | null
  editableQuestion: QuestionTypes | null

  setTemplate?: (template: SurveyType) => void
  setPublisherTemplate?: (template: SurveyPublisherTemplateType) => void
  setDragItems?: (dragItems: DragComponentTypes[]) => void
  addQuestion?: (question: QuestionTypes) => void
  addPublisher?: (question: PublisherComponentType) => void
  removeQuestion?: (question: RemoveQuestionRequestTypes) => void
  removePublisher?: (publihserId: string) => void
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
  surveyPublisherTemplate: null,
  editableQuestion: null,
}
