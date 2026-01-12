import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  {
    label: "Survey Logic",
    key: "allowLogic",
  },
  {
    label: "Piping",
    key: "allowPiping",
  },
  {
    label: "Role Based Logic",
    key: "roleBasedLogic",
  },
  {
    label: "Scoring",
    key: "scoring",
  },
  {
    label: "Weight",
    key: "weight",
  },
  {
    label: "Calculate Scores",
    key: "calculateScores",
  },
  {
    label: "Show Scores",
    key: "showScores",
  },
  {
    label: "Variables",
    key: "variables",
  },
  {
    label: "Answer Key",
    key: "answerKey",
  },
]

export const SurveyLogicSettings = () => {
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
