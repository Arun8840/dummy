"use client"

import z from "zod"
import { createClientSchema } from "./schema"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { trpc } from "@/trpc/client"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

type CreateFormType = z.infer<typeof createClientSchema>

export const CreateClientForm = () => {
  const create = trpc.clients.create.useMutation()
  const { isLoading: isPlanLoading, data: plans } =
    trpc.clients.getPlan.useQuery()

  const form = useForm<CreateFormType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      clientId: 0,
      planId: "",
      planName: "",
    },
    resolver: zodResolver(createClientSchema),
  })

  if (isPlanLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner />
      </div>
    )
  }

  const planitems = plans?.data || []

  const onCreate: SubmitHandler<CreateFormType> = async (data) => {
    create.mutate(
      {
        ...data,
      },
      {
        onSuccess(data) {
          toast.success(data?.message, {
            position: "top-center",
          })
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          })
        },
      }
    )
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      field.onChange(value === "" ? "" : Number(value))
                    }}
                    value={field.value === 0 ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="planName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ FIXED Select integrated with React Hook Form */}
          <FormField
            control={form.control}
            name="planId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {planitems.length > 0 &&
                      planitems.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? <Spinner /> : "Create Client"}
        </Button>
      </form>
    </Form>
  )
}
