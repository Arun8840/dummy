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
import { menuSchema, MenuSchemaInput } from "../schema"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

interface CreateMenuFormProps {
  onClose: () => void
}
export const CreateMenuForm: React.FC<CreateMenuFormProps> = ({ onClose }) => {
  const create = trpc.table.create.useMutation()
  const form = useForm<MenuSchemaInput>({
    defaultValues: {
      name: "",
      url: "",
      resource: "",
      iconName: "",
      iName: "",
      resourceGroup: "",
    },
    resolver: zodResolver(menuSchema),
  })

  const onCreate: SubmitHandler<MenuSchemaInput> = async (data) => {
    const request = { ...data }
    console.log(request)
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resource"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resourceGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource Group</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iconName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IconName</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IName</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? <Spinner /> : "Create Table"}
          </Button>
          <Button variant={"secondary"} type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
