"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { userVerifySchema } from "./schema"
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
import { verifyHandler } from "@/actions/verify"

type UserVerifyForm = z.infer<typeof userVerifySchema>

interface VerificationProps extends React.ComponentProps<"div"> {
  email: string
}
export function VerifyForm({ className, email, ...props }: VerificationProps) {
  const navigation = useRouter()

  const form = useForm<UserVerifyForm>({
    defaultValues: {
      email: email,
      token: "",
    },
    resolver: zodResolver(userVerifySchema),
  })

  const onSubmit: SubmitHandler<UserVerifyForm> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("token", data.token)

      const res = await verifyHandler(formData)

      if (res?.status) {
        toast(res?.message as string, {
          position: "top-center",
        })
        navigation?.push("/auth/login")
        return
      }
      toast.error(res?.message as string, {
        position: "top-center",
      })
    } catch (error: any) {
      toast.error(
        typeof error?.message === "string"
          ? error.message
          : "An error occurred during verification."
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
              <h1 className="text-2xl font-bold">Enter verification code</h1>
              <p className="text-muted-foreground text-sm text-balance">
                We sent a 6-digit code to your email
              </p>
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
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
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
