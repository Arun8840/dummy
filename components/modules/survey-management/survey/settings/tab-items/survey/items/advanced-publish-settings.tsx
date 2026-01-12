import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  { label: "Allow Publish Schedule Later", key: "allowPublishScheduleLater" },
  { label: "Allow Publish Recurring", key: "allowPublishRecurring" },
  {
    label: "Allow Publish Override Workflow",
    key: "allowPublishOverrideWorkflow",
  },
  { label: "Allow Publish Override Theme", key: "allowPublishOverrideTheme" },
  { label: "Allow Publish Mass Deploy", key: "allowPublishMassDeploy" },
]

export const AdvancedPublishSettings = () => {
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
