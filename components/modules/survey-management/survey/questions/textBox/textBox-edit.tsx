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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useSurveyContext } from "@/context/Survey-design-providers"
import { useGetTexboxTypes } from "@/hooks/use-get-textBoxTypes"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import { Undo2 } from "lucide-react"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

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

  const loading = isLoading

  const setType = (typeId: string) => {
    const currentType = form.getValues("textBox")
    const findType = textboxTypes?.find((existType) => existType?.typeId === typeId)
    if (!findType) return
    const updated = {
      ...currentType,
      ...findType
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
      ...value
    })
  }
  const submitHandle: SubmitHandler<QuestionTypes> = (data) => {
    if (!data) return null
    save?.(data)

  }
  if (loading) {
    return (
      <div className="h-40 grid place-items-center font-sans">
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field?.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="textBox.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TextBox Type</FormLabel>
                  <FormControl>
                    {createTypeSelector()}
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textBox.label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input {...field} value={field?.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textBox.msg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textBox.answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Value</FormLabel>
                  <FormControl>
                    <Input {...field} value={field?.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textBox.variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable</FormLabel>
                  <FormControl>
                    <Input {...field} value={field?.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field?.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
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
          <Button disabled={isPending} onClick={resetValue} type="button" variant={"secondary"} size={"sm"}>
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
