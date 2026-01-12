import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { useFormContext } from "react-hook-form"

const events = [
  {
    label: "Upload Media to Categories",
    key: "showUploadPhoto",
  },
  {
    label: "Include Skipped Category In Calculations",
    key: "includeSkippedCategoryInCalculations",
  },
  {
    label: "Workflow Controlled Category",
    key: "workflowControlledCategory",
  },
  {
    label: "Upload To Categories",
    key: "uploadToCategories",
  },
  {
    label: "Allow Drag Images From Categories",
    key: "allowDragImagesFromCategories",
  },
]

export const CategorySettings = () => {
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
