import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  { label: "Allow Survey Layout Selection", key: "allowSurveyLayoutSelection" },
  {
    label: "Allow Textbox Max Character Limit",
    key: "allowTexboxMaxCharacterLimit",
  },
  { label: "Allow Column Formula", key: "allowColumnFormula" },
  { label: "Allow Dynamic Text Field", key: "allowDynamicTextField" },
  { label: "Allow Photo Upload", key: "allowPhotoUpload" },
  { label: "Allow Attachment Type", key: "allowAttachmentType" },
  { label: "Allow Dynamic Row", key: "allowDynamicRow" },
  { label: "Allow Conditional Row", key: "allowConditionalRow" },
  { label: "Allow Comment", key: "allowComment" },
  { label: "Allow Conditional Column", key: "allowConditionalColumn" },
  { label: "Allow Not-Option", key: "allowNAOption" },
]

export const AdvancedQuestionSettings = () => {
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
