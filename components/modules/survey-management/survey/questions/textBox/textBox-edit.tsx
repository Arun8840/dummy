import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useSurveyContext } from "@/context/Survey-design-providers"
import { useGetTexboxTypes } from "@/hooks/use-get-textBoxTypes"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import { Undo2 } from "lucide-react"
import React from "react"
import {
  SubmitHandler,
  useForm,
  UseFormReturn,
  FieldPath,
  FieldValues,
} from "react-hook-form"

type FieldGroupType<TFieldValues extends FieldValues = FieldValues> = {
  label: string
  name: FieldPath<TFieldValues>
  type?: React.HTMLInputTypeAttribute
  form: UseFormReturn<TFieldValues>
}

const FormFieldGroup = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  form,
  type = "text",
}: FieldGroupType<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} value={field?.value ?? ""} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export const TextboxEdit: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  // * HOOKS
  const { save, isPending } = useSurveyContext()
  const { data: textboxTypes, isLoading } = useGetTexboxTypes()
  const form = useForm<QuestionTypes>({
    defaultValues: {
      ...value,
    },
  })

  const isValidOverride = value?.subComponentType === "textBoxOverride"
  const isOverrided = isValidOverride && form.watch("textBox.override")
  const loading = isLoading

  const setType = (typeId: string) => {
    const currentType = form.getValues("textBox")
    const findType = textboxTypes?.find(
      (existType) => existType?.typeId === typeId
    )
    if (!findType) return
    const updated = {
      ...currentType,
      ...findType,
    }
    form.setValue(`textBox`, updated)
  }
  const createTypeSelector = () => {
    const selectedType = form.watch("textBox")?.typeId || ""
    return (
      <Select value={selectedType} onValueChange={setType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {textboxTypes?.map((type) => (
            <SelectItem key={type?.typeId} value={type?.typeId}>
              {type?.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  const resetValue = () => {
    form.reset({
      ...value,
    })
  }
  const submitHandle: SubmitHandler<QuestionTypes> = (data) => {
    if (!data) return null
    save?.(data)
  }
  if (loading) {
    return (
      <div className="h-52 grid place-items-center font-sans">
        <Badge variant={"outline"}>
          <Spinner /> Preparing ...
        </Badge>
      </div>
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandle)}
        className="flex flex-col gap-2 size-full pt-1 font-sans"
      >
        <div className="flex-1 grid gap-4 auto-rows-max">
          <div className="flex  items-center gap-2">
            <CheckboxGroup
              id={`required_${value?.id}`}
              label="Question Required"
              defaultChecked={!!value?.required}
              onCheckedChange={(e) => form.setValue("required", e)}
            />
            <CheckboxGroup
              id={`textBoxrequired_${value?.id}`}
              label="TextBox Required"
              defaultChecked={!!value?.textBox?.required}
              onCheckedChange={(e) => form.setValue("textBox.required", e)}
            />
            <CheckboxGroup
              id={`comment_${value?.id}`}
              label="Allow Comment"
              defaultChecked={!!value?.allowComment}
              onCheckedChange={(e) => form.setValue("allowComment", e)}
            />
            <CheckboxGroup
              id={`instanceVariable_${value?.id}`}
              label="Instance Variable"
              defaultChecked={!!value?.required}
              onCheckedChange={(e) => form.setValue("required", e)}
            />
            {isValidOverride && (
              <CheckboxGroup
                id={`override_${value?.id}`}
                label="Override"
                defaultChecked={!!value?.textBox?.override}
                onCheckedChange={(e) => form.setValue("textBox.override", e)}
              />
            )}
            <RadioGroup
              defaultValue="photoOptional"
              className="flex items-center gap-2"
            >
              <Label
                htmlFor={`photo-${value?.id}`}
                className="has-checked:bg-accent rounded-lg p-2"
              >
                <RadioGroupItem value="photo" id={`photo-${value?.id}`} />
                Photo Required
              </Label>
              <Label
                htmlFor={`photoOptional-${value?.id}`}
                className="has-checked:bg-accent rounded-lg p-2"
              >
                <RadioGroupItem
                  value="photoOptional"
                  id={`photoOptional-${value?.id}`}
                />
                Photo Optional
              </Label>
            </RadioGroup>
          </div>

          <div className="grid lg:grid-cols-4  gap-2">
            {/* Example of usage with full typesafety */}
            <FormFieldGroup label="Name" name="name" form={form} />
            <FormItem>
              <FormLabel>TextBox Type</FormLabel>
              <FormControl>{createTypeSelector()}</FormControl>
            </FormItem>
            <FormFieldGroup label="Label" name="textBox.label" form={form} />
            <FormFieldGroup label="Message" name="textBox.msg" form={form} />
            <FormFieldGroup
              label="Default Value"
              name="textBox.answer"
              form={form}
            />
            <FormFieldGroup
              label="Variable"
              name="textBox.variableName"
              form={form}
            />
            <FormFieldGroup
              label="Weight"
              name="weight"
              form={form}
              type="number"
            />
            {isOverrided && (
              <>
                <FormFieldGroup
                  label="Override Value"
                  name="textBox.overrideAnswer"
                  form={form}
                />
                <FormFieldGroup
                  label="Override Reason"
                  name="textBox.overrideReason"
                  form={form}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full w-full lg:w-1/2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={isPending}
            onClick={resetValue}
            type="button"
            variant={"secondary"}
            size={"sm"}
          >
            <Undo2 /> Reset Changes
          </Button>
          <Button disabled={isPending} type="submit" size={"sm"}>
            {isPending ? "Processing, please wait..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
