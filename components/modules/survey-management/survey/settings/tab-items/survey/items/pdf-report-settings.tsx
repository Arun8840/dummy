import CheckboxGroup from "@/utils/ui/checkBox-group"
import { useFormContext } from "react-hook-form"

const events = [
  { label: "Survey Report", key: "surveyReport" },
  { label: "Survey Analysis Report", key: "surveyAnalysisReport" },
  { label: "Score Card Report", key: "surveyScoreReport" },
  {
    label: "Allow Download Report Before Complete",
    key: "allowDownloadReportBeforeComplete",
  },
]

export const PdfReportSettings = () => {
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
