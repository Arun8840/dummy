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
import { Textarea } from "@/components/ui/textarea"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import CheckboxGroup from "@/utils/ui/checkBox-group"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export const TextboxEdit: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  const form = useForm<QuestionTypes>({
    defaultValues: {
      ...value,
    },
  })

  const submitHandle: SubmitHandler<QuestionTypes> = (data) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandle)}
        className="flex flex-col gap-2 size-full pt-1"
      >
        <div className="flex-1 grid gap-4 auto-rows-max">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <Textarea {...form.register("description")} placeholder="Description" /> */}
          <div className="flex  items-center gap-2">
            <CheckboxGroup
              id={`required_${value?.id}`}
              label="Required"
              defaultChecked={!!value?.required}
              onCheckedChange={(e) => form.setValue("required", e)}
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
                photo
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

          <div className="grid lg:grid-cols-4 gap-2">
            <FormField
              control={form.control}
              name="textBox.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size={"sm"}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
