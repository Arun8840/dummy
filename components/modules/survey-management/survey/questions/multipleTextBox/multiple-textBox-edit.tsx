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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useSurveyContext } from "@/context/Survey-design-providers"
import { useGetTexboxTypes } from "@/hooks/use-get-textBoxTypes"
import { trpc } from "@/trpc/client"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import { CustomCard } from "@/utils/ui/custom-card"
import { Minus, Plus, Undo2 } from "lucide-react"
import React from "react"
import {
  SubmitHandler,
  useForm,
  UseFormReturn,
  FieldPath,
  FieldValues,
} from "react-hook-form"
import { toast } from "sonner"

type FieldGroupType<TFieldValues extends FieldValues = FieldValues> = {
  label: string
  name: FieldPath<TFieldValues>
  type?: React.HTMLInputTypeAttribute
  form: UseFormReturn<TFieldValues>
}

const tabHeaders = ["General", "Multiple Text Boxes"]

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

export const MultipleTextboxEdit: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  // * HOOKS
  const { save, isPending } = useSurveyContext()
  const { data: textboxTypes, isLoading } = useGetTexboxTypes()
  const getNewTextBox = trpc.survey.getNewTextBox.useMutation()
  const form = useForm<QuestionTypes>({
    defaultValues: {
      ...value,
    },
  })

  const textBoxes = form.watch("multipleTextBox") || []
  const loading = isLoading

  const setType = (typeId: string, boxIdx: number) => {
    const currentTextBoxes = form.getValues("multipleTextBox")
    const selectedTextBox = currentTextBoxes?.[boxIdx]
    const findType = textboxTypes?.find(
      (existType) => existType?.typeId === typeId
    )
    if (!findType) return
    const updated = {
      ...selectedTextBox,
      ...findType,
    }
    form.setValue(`multipleTextBox.${boxIdx}`, updated)
  }

  const addTextBox = () => {
    const currentTextBoxes = textBoxes?.length || 1
    getNewTextBox.mutate(
      { length: currentTextBoxes },
      {
        onSuccess(data) {
          const newValue = data?.data
          const updated = [...textBoxes, newValue]
          form.setValue("multipleTextBox", updated)
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          })
        },
      }
    )
  }

  const removeTextBox = (textBoxId: string) => {
    if (!textBoxId) return
    const filterTextbox = textBoxes?.filter(
      (existTextBox) => existTextBox?.id !== textBoxId
    )
    form.setValue("multipleTextBox", filterTextbox)
  }

  const createTypeSelector = (selectedType: string, boxIdx: number) => {
    return (
      <Select value={selectedType} onValueChange={(e) => setType(e, boxIdx)}>
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
              id={`comment_${value?.id}`}
              label="Allow Comment"
              defaultChecked={!!value?.allowComment}
              onCheckedChange={(e) => form.setValue("allowComment", e)}
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

          <Tabs defaultValue="General">
            <TabsList>
              {tabHeaders?.map((tab, tabIdx) => {
                return (
                  <TabsTrigger key={`${tab}_${tabIdx}`} value={tab}>
                    {tab}
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <TabsContent value="General" className="w-full lg:w-1/2">
              <CustomCard>
                <FormFieldGroup label="Name" name="name" form={form} />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CustomCard>
            </TabsContent>
            <TabsContent
              value="Multiple Text Boxes"
              className="flex flex-col gap-2"
            >
              {!textBoxes || textBoxes.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-8">
                  <span className="text-muted-foreground text-sm">
                    No text boxes found. Please add at least one text box to
                    continue.
                  </span>
                </div>
              ) : (
                textBoxes.map((box, boxIdx) => {
                  return (
                    <CustomCard key={box?.id}>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-full flex justify-between items-center">
                          <span className="font-medium">
                            {boxIdx + 1}. TextBox
                          </span>
                          <div className="flex items-center gap-2">
                            <CheckboxGroup
                              id={`textBoxrequired_${box?.id}`}
                              label="Required ?"
                              defaultChecked={!!value?.textBox?.required}
                              onCheckedChange={(e) =>
                                form.setValue(
                                  `multipleTextBox.${boxIdx}.required`,
                                  e
                                )
                              }
                              className="self-end w-fit"
                            />
                            <Button
                              onClick={() => removeTextBox(box?.id)}
                              type="button"
                              variant={"outline"}
                              title="Remove TextBox"
                              size={"icon-sm"}
                            >
                              <Minus className="text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <FormFieldGroup
                          label="Label"
                          name={`multipleTextBox.${boxIdx}.label`}
                          form={form}
                        />
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            {createTypeSelector(box?.typeId, boxIdx)}
                          </FormControl>
                        </FormItem>
                        <FormFieldGroup
                          label="Message"
                          name={`multipleTextBox.${boxIdx}.msg`}
                          form={form}
                        />
                        <FormFieldGroup
                          label="Default Value"
                          name={`multipleTextBox.${boxIdx}.answer`}
                          form={form}
                        />
                        <FormFieldGroup
                          label="Variable"
                          name={`multipleTextBox.${boxIdx}.variableName`}
                          form={form}
                        />
                      </div>
                    </CustomCard>
                  )
                })
              )}
              <Button
                disabled={getNewTextBox?.isPending}
                onClick={addTextBox}
                type="button"
                size={"sm"}
                title="Add Textbox"
                className="w-fit ml-auto"
              >
                {getNewTextBox?.isPending ? (
                  <Spinner color="white" />
                ) : (
                  <>
                    <Plus />
                    Add TextBox
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
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
