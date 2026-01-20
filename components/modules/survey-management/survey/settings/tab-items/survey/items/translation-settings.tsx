import CheckboxGroup from "@/utils/ui/checkBox-group"
import { useFormContext } from "react-hook-form"

const events = [
  { key: "multilingual", label: "Multilingual" },
  { key: "multilingualSelection", label: "Allow Multilingual Selection" },
]

export const TranslationSettings = () => {
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
