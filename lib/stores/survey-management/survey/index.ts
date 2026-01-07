import { create } from "zustand"
import { initailSurveyState, SurveyStateTypes } from "./initial-state"
import { DragComponentTypes } from "@/types"
import { SurveyType } from "@/types/survey-management/survey-types"

export const useSurveyStore = create<SurveyStateTypes>((set) => ({
  ...initailSurveyState,
  setItemsAndTemplate: (
    template: SurveyType,
    dragItems: DragComponentTypes[]
  ) => {
    set({
      components: dragItems,
      surveyTemplate: template,
    })
  },
}))
