"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { forgotSchema, userVerifySchema } from "./schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import Link from "next/link"
import { encrypt } from "@/utils/functions/encrypt/encryption"
import { useState } from "react"
import { Spinner } from "../ui/spinner"
import { authTrpc } from "@/trpc/auth-client"

type ForgotFormType = z.infer<typeof forgotSchema>

interface VerificationProps extends React.ComponentProps<"div"> {}
export function ForgotForm({ className, ...props }: VerificationProps) {
  const navigation = useRouter()
  // * service
  const forgot = authTrpc.auth.forgot.useMutation()

  const form = useForm<ForgotFormType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit: SubmitHandler<ForgotFormType> = async (data) => {
    const encoded = encodeURIComponent(data.email)
    const encryptedMail = await encrypt(encoded)
    forgot.mutate(
      {
        email: data.email,
      },
      {
        onSuccess(response) {
          toast.success(
            (response?.message as string) || "OTP sent successfully.",
            {
              position: "top-center",
            }
          )
          navigation.push(`/auth/forgot/${encryptedMail}`)
        },
        onError(error) {
          toast.error(error?.message || "Failed to send OTP.", {
            position: "top-center",
          })
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center p-6 md:p-8"
        >
          <FieldGroup>
            <Field className="items-center text-center">
              <h1 className="text-2xl font-bold">Forgot password?</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email address to receive a password reset link.
              </p>
            </Field>

            <Field>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-center text-sm p-3" />
                  </FormItem>
                )}
              />
            </Field>

            <Field className="flex flex-col gap-3">
              <Button disabled={forgot.isPending} type="submit">
                {forgot.isPending ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  "Send Reset OTP"
                )}
              </Button>
              <Button variant="outline" type="button" asChild>
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </Form>
      <FieldDescription className="text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
