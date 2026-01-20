import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetVariables } from "@/hooks/use-get-variableTemplates"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import { useFormContext } from "react-hook-form"

export const GeneralSettings = () => {
  const { setValue, watch, register } = useFormContext()
  const { data, isError, isLoading } = useGetVariables()

  const { allowSurveyAttributes, variableTemplateId } = watch("settings")
  const events = [
    { key: "cardlayout", label: "Card Layout", type: "checkbox" },
    {
      key: "allowOfflineSurvey",
      label: "Allow Offline Survey",
      type: "checkbox",
    },
    {
      key: "showSurveyDetails",
      label: "Show Survey Details",
      type: "checkbox",
    },
    { key: "allowDefaultValues", label: "Default Values", type: "checkbox" },
    {
      key: "exportInprogressSurveys",
      label: "Export Inprogress Surveys",
      type: "checkbox",
    },
    { key: "referenceImages", label: "Reference Images", type: "checkbox" },

    { key: "whiteLabel", label: "Allow White Label Survey", type: "checkbox" },
    { key: "recordGeoLocation", label: "Geo Tracking", type: "checkbox" },
    {
      key: "allowSurveyAttributes",
      label: "Allow Survey Attributes",
      type: "checkbox",
    },
    {
      key: "allowUploadImageGallery",
      label: "Allow Upload From Image Gallery",
      type: "checkbox",
    },
    {
      key: "displaySurveyTitleOnTheFirstPage",
      label: "Show Title on the First Page",
      type: "checkbox",
    },
    {
      key: "editableDataColumn",
      label: "Editable Data Column",
      type: "checkbox",
    },
    {
      key: "maxImagesPerComponent",
      label: "Maximum Number of Media Per Survey Component",
      type: "input",
    },
    {
      key: "maxFileSize",
      label: "Maximum Media Size",
      type: "input",
    },
    {
      key: "requiredMessage",
      label: "Required Message",
      type: "input",
    },
    {
      key: "variableTemplateId",
      label: "Variable Templates",
      type: "select",
      show: !!allowSurveyAttributes,
    },
  ]
  const currentSettings = watch("settings")
  return (
    <div className="flex flex-wrap gap-2">
      {events?.map((eve, eveIdx) => {
        const checkedValue = currentSettings?.[eve?.key]
        if (eve?.type === "checkbox") {
          return (
            <CheckboxGroup
              checked={checkedValue}
              label={eve?.label}
              key={`${eveIdx}_${eve?.label}`}
              className="text-xs self-end"
              onCheckedChange={(e) => setValue(`settings.${eve?.key}`, e)}
            />
          )
        }

        if (eve?.show && eve?.type === "select") {
          return (
            <div key={`${eveIdx}_${eve?.label}`} className="self-end space-y-2">
              <Label htmlFor={eve?.key} className="text-xs">
                {eve?.label}
              </Label>
              <Select
                disabled={isLoading}
                value={variableTemplateId ?? ""}
                onValueChange={(value) =>
                  setValue(`settings.variableTemplateId`, value)
                }
              >
                <SelectTrigger type="button" className="min-w-xs">
                  <SelectValue placeholder="Select Variable" />
                </SelectTrigger>
                <SelectContent>
                  {data?.length > 0 &&
                    data?.map((variable) => (
                      <SelectItem key={variable?.id} value={variable?.id}>
                        {variable?.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )
        }
        // For "input" type
        return (
          <div key={`${eveIdx}_${eve?.label}`} className="space-y-2">
            <Label htmlFor={eve?.key} className="text-xs">
              {eve?.label}
            </Label>
            <Input id={eve?.key} {...register(`settings.${eve?.key}`)} />
          </div>
        )
      })}
    </div>
  )
}
