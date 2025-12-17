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
import { CreateTableInput, createTableSchema } from "../schema"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

export const CreateTableForm = () => {
  const create = trpc.table.create.useMutation()
  const navigate = useRouter()
  const form = useForm<CreateTableInput>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createTableSchema),
  })

  const onCreate: SubmitHandler<CreateTableInput> = async (data) => {
    const request = { ...data }
    create.mutate(request, {
      onSuccess(data) {
        const templateId = data?.data?.id
        toast.success(data?.message, {
          position: "top-center",
        })
        navigate.push(`/table/${templateId}`)
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
