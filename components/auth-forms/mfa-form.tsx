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
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { getOtp } from "@/lib/apis/api"
import { Spinner } from "../ui/spinner"
import { validateOtpHandler } from "@/actions/validate"
import { Input } from "../ui/input"
import { SubmitHandler, useForm } from "react-hook-form"
import z from "zod"
import { mfaVerifySchema } from "./schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Ban } from "lucide-react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

type MFAFormType = z.infer<typeof mfaVerifySchema>
export function MfaForm({ className, ...props }: React.ComponentProps<"div">) {
  const params = useSearchParams()
  const navigation = useRouter()
  const email: string = params?.get("email") || ""

  const form = useForm<MFAFormType>({
    defaultValues: {
      email: email,
      token: "",
    },
    resolver: zodResolver(mfaVerifySchema),
  })

  const fetchOtp = async () => {
    const res = await getOtp({ email })

    if (res) {
      return res
    }
  }
  const { isLoading, data, error } = useSWR(
    `/generate/otp?email=${email}`,
    fetchOtp,
    { revalidateOnFocus: false }
  )

  const onSubmit: SubmitHandler<MFAFormType> = async (data) => {
    try {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("token", data.token)

      const res = await validateOtpHandler(formData)
      if (res?.status) {
        const message =
          typeof res?.message === "string"
            ? res.message
            : "Verification code submitted successfully!"
        toast(message)
        navigation?.push("/auth/login")
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
              <h1 className="text-2xl font-bold">Enter your 2FA code</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Open your authenticator app and enter the 6-digit code.
              </p>
            </Field>

            <div className="size-50 rounded mx-auto shadow-[0px_0px_40px] shadow-sky-500/60 animate-[shadowPulse_2s_infinite] my-4">
              {isLoading ? (
                <div className="size-full grid place-items-center">
                  <Spinner />
                </div>
              ) : data?.qr_code ? (
                <img
                  src={data?.qr_code || ""}
                  alt="qr-code"
                  className="size-full rounded"
                />
              ) : (
                <div className="size-full flex flex-col gap-3 justify-center items-center bg-secondary rounded-lg">
                  <Ban color="gray" />
                  <small className="font-sans text-muted-foreground font-medium">
                    QR NOT FOUND !
                  </small>
                </div>
              )}
            </div>
            {/* Email hidden form field, needs to use FormField for error handling */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel htmlFor="email" className="sr-only">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="test@example.com"
                      {...field}
                      value={field.value || email}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 2FA token input field with proper error message */}
            <Field>
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="otp" className="sr-only">
                      2FA Verification code
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        id="otp"
                        containerClassName="gap-4 justify-center"
                        {...field}
                        // Make sure value/handlers are properly bound
                        value={field.value}
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
                      Enter the 6-digit code from your authenticator app.
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
    </div>
  )
}
