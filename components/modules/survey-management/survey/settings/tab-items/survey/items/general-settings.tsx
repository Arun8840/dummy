import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  {
    label: "Card Layout",
    key: "cardlayout",
    type: "checkbox",
  },
  {
    label: "Allow Offline Survey",
    key: "allowOfflineSurvey",
    type: "checkbox",
  },
  {
    label: "Show Survey Details",
    key: "showSurveyDetails",
    type: "checkbox",
  },
  {
    label: "Default Values",
    key: "allowDefaultValues",
    type: "checkbox",
  },
  {
    label: "Export Inprogress Surveys",
    key: "exportInprogressSurveys",
    type: "checkbox",
  },
  {
    label: "Reference Images",
    key: "referenceImages",
    type: "checkbox",
  },
  {
    label: "Allow White Label Survey",
    key: "whiteLabel",
    type: "checkbox",
  },
  {
    label: "Geo Tracking",
    key: "recordGeoLocation",
    type: "checkbox",
  },
  {
    label: "Required Message",
    key: "requiredMessage",
    type: "input",
  },
  {
    label: "Allow Survey Attributes",
    key: "allowSurveyAttributes",
    type: "checkbox",
  },
  {
    label: "Survey Attributes Selector",
    key: "surveyAttributesSelector", // Assuming you have this setting; otherwise, assign the related setting
    type: "input", // could be dropdown/select in real scenario
  },
  {
    label: "Allow Upload From Image Gallery",
    key: "allowUploadImageGallery",
    type: "checkbox",
  },
  {
    label: "Show Title on the First Page",
    key: "displaySurveyTitleOnTheFirstPage",
    type: "checkbox",
  },
  {
    label: "Editable Data Column",
    key: "editableDataColumn",
    type: "checkbox",
  },
]

export const GeneralSettings = () => {
  const { setValue, watch } = useFormContext()

  const currentSettings = watch("settings")

  return (
    <div className="flex flex-wrap gap-2">
      {events?.map((eve, eveIdx) => {
        const checkedValue = currentSettings[eve?.key]
        return (
          <CheckboxGroup
            checked={checkedValue}
            label={eve?.label}
            key={`${eveIdx}_${eve?.label}`}
            className="text-xs"
            onCheckedChange={(e) => setValue(`settings.${eve?.key}`, e)}
          />
        )
      })}
    </div>
  )
}
