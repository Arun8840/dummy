"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { CreateSurveyInput, createSurveySchema } from "../schema"

export const CreateSurveyForm = () => {
  const create = trpc.survey.create.useMutation()
  const navigate = useRouter()
  const form = useForm<CreateSurveyInput>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createSurveySchema),
  })

  const onCreate: SubmitHandler<CreateSurveyInput> = async (data) => {
    const request = { ...data }
    create.mutate(request, {
      onSuccess(res) {
        const templateId = res?.data?.id
        toast.success(res?.message, {
          position: "top-center",
        })
        navigate.push(`/surveyDesign/${templateId}`)
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col gap-4 justify-between"
        onSubmit={form.handleSubmit(onCreate)}
      >
        <div className="flex flex-col gap-4 flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? <Spinner /> : "Create Table"}
        </Button>
      </form>
    </Form>
  )
}
