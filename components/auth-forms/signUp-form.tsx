"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import z from "zod"
import { registerSchema } from "./schema"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormMessage } from "../ui/form"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { Eye, EyeOff } from "lucide-react"

type RegisterFormType = z.infer<typeof registerSchema>
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const create = trpc.auth.register.useMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormType>({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    create.mutate(
      { ...data },
      {
        onSuccess(data) {
          // toast.success(data)
        },
        onError(error) {
          toast.error(error?.message)
        },
      }
    )
  }
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6 font-sans", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FieldGroup>
          <Field>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                  <Input
                    id="firstname"
                    type="text"
                    autoComplete="given-name"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                  <Input
                    id="lastname"
                    type="text"
                    autoComplete="family-name"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...field}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...field}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <Button disabled={create.isPending} type="submit">
              {create.isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Register"
              )}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Log in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  )
}
