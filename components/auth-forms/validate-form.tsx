"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { validateAuthOtpHandler } from "@/actions/validate-otp"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { validateSchema } from "./schema"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

type ValidateForm = z.infer<typeof validateSchema>
export function ValidateForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const params = useSearchParams()
  const navigation = useRouter()
  const email = params?.get("email") as string
  const form = useForm<ValidateForm>({
    defaultValues: {
      email: email,
      token: "",
    },
    resolver: zodResolver(validateSchema),
  })

  const onSubmit: SubmitHandler<ValidateForm> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("token", data.token)

      const res = await validateAuthOtpHandler(formData)
      if (res?.status) {
        const message =
          typeof res?.message === "string"
            ? res.message
            : "Verification code submitted successfully!"
        toast(message)
        navigation?.push("/")
      }
    } catch (error: any) {
      toast.error(
        typeof error?.message === "string"
          ? error.message
          : "An error occurred during login."
      )
    }
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
              <h1 className="text-2xl font-bold">Enter Authenticator code</h1>
              <p className="text-muted-foreground text-sm text-balance">
                We sent a 6-digit code to your email
              </p>
            </Field>
            <Field>
              <Field>
                <FieldLabel hidden htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  hidden
                  id="email"
                  {...form.register("email")}
                  type="email"
                  defaultValue={email as string}
                  placeholder="test@example.com"
                  required
                />
              </Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        id="otp"
                        required
                        containerClassName="gap-4 justify-center"
                        {...field}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit">Verify</Button>
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
