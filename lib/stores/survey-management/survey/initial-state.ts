import { DragComponentTypes } from "@/types"
import { SurveyType } from "@/types/survey-management/survey-types"

export interface SurveyStateTypes {
  components: DragComponentTypes[]
  surveyTemplate: SurveyType | null
  setItemsAndTemplate?: (
    template: SurveyType,
    dragItems: DragComponentTypes[]
  ) => void
}

export const initailSurveyState: SurveyStateTypes = {
  components: [],
  surveyTemplate: null,
}
