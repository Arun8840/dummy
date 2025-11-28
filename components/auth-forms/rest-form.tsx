"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import z from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { resetPswSchema } from "./schema"

type ResetFormType = z.infer<typeof resetPswSchema>
interface RestFormProps extends React.ComponentProps<"form"> {
  email: string
}

export function RestForm({ className, email, ...props }: RestFormProps) {
  const navigation = useRouter()
  const resetPSW = trpc.auth.reset.useMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetFormType>({
    defaultValues: {
      email: email,
      confirmPassword: "",
      password: "",
      token: "",
    },
    resolver: zodResolver(resetPswSchema),
  })

  const onSubmit: SubmitHandler<ResetFormType> = async (data) => {
    resetPSW.mutate(
      {
        ...data,
      },
      {
        onSuccess(data) {
          toast.success(data.data as string, {
            position: "top-center",
          })
          navigation.push("/auth/login")
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
        className={cn("flex flex-col gap-6 font-sans", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FieldGroup>
          <Field>
            <h2 className="text-xl font-bold text-center mb-2">
              Reset Your Password
            </h2>
            <FieldDescription className="text-center mb-4">
              Please enter your new password below to reset your account
              password. Make sure your new password is strong and secure.
            </FieldDescription>
          </Field>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
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
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 px-2 flex items-center text-muted-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
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
                    Confirm New Password
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
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 px-2 flex items-center text-muted-foreground"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
          {/* OTP Input */}
          <Field>
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="otp" className="sr-only">
                    Verification code
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      id="otp"
                      containerClassName="gap-4 justify-center"
                      // Ensure value is always a string (not undefined/null)
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-center text-sm p-3" />
                  <FieldDescription className="text-center">
                    Enter the 6-digit code sent to your email.
                  </FieldDescription>
                </FormItem>
              )}
            />
          </Field>
          <Field>
            <Button disabled={resetPSW.isPending} type="submit">
              {resetPSW.isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                "Reset Password"
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
