import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSurveyContext } from "@/context/Survey-design-providers"
import { DesignQuestionComponentProps } from "@/types"
import { QuestionTypes } from "@/types/survey-management/survey-types"
import { Undo2 } from "lucide-react"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export const DefaultEdit: React.FC<DesignQuestionComponentProps> = ({
  value,
}) => {
  // * HOOKS
  const { save, isPending } = useSurveyContext()
  const form = useForm<QuestionTypes>({
    defaultValues: {
      ...value,
    },
  })

  const resetValue = () => {
    form.reset({
      ...value,
    })
  }
  const submitHandle: SubmitHandler<QuestionTypes> = (data) => {
    if (!data) return null
    save?.(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandle)}
        className="flex flex-col gap-2 size-full pt-1 font-sans"
      >
        <div className="grid  gap-2">
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
              </FormItem>
            )}
          />
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
