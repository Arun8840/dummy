import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  {
    label: "Show Question Number",
    key: "showQuestionNumber",
  },
  {
    label: "Show Answer Status",
    key: "showQuestionAnswerStatus",
  },
  {
    label: "Option Advanced Settings",
    key: "optionSettings",
  },
  {
    label: "Matrix Question Customization",
    key: "allowMatrixCustomization",
  },
  {
    label: "Upload Image",
    key: "showUploadPhoto",
  },
]

export const QuestionSettings = () => {
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
