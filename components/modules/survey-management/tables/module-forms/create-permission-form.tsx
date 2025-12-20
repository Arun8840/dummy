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
import { permissionSchema, PermissionSchemaInput } from "../schema"
import React from "react"

interface CreateMenuPermissionFormProps {
  onClose: () => void
}
export const CreateMenuPermissionForm: React.FC<
  CreateMenuPermissionFormProps
> = ({ onClose }) => {
  const create = trpc.table.create.useMutation()
  const form = useForm<PermissionSchemaInput>({
    defaultValues: {
      type: "",
      resource: "",
      resourceGroup: "",
      service: "",
      action: "",
    },
    resolver: zodResolver(permissionSchema),
  })

  const onCreate: SubmitHandler<PermissionSchemaInput> = async (data) => {
    const request = { ...data }
    console.log(request)
  }

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col gap-4 justify-between"
        onSubmit={form.handleSubmit(onCreate)}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? <Spinner /> : "Create Permission"}
          </Button>
          <Button variant={"secondary"} type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
