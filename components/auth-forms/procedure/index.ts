import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { forgotSchema, registerSchema, resetPswSchema } from "../schema"
import { publicClientApi } from "@/lib/apis/public-client"

export const authRouter = createTRPCRouter({
  forgot: baseProcedure.input(forgotSchema).mutation(async ({ ctx, input }) => {
    const { email } = input
    if (!email) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email is required.",
      })
    }

    const response = await publicClientApi({
      endpoint: "forgot-password",
      tenant: "auth",
      data: {
        email: email,
      },
      method: "POST",
    })
    return {
      status: response?.success,
      message: response?.data,
      data: response?.data,
    }
  }),
  reset: baseProcedure
    .input(resetPswSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, confirmPassword, token } = input

      // Check if any field is missing a value, and throw TRPCError if so
      if (!email || !password || !confirmPassword || !token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "All fields are required.",
        })
      }

      const response = await publicClientApi({
        endpoint: "reset-password",
        tenant: "auth", // Or whatever tenant identifier you use in your ctx
        data: {
          email,
          password,
          confirmPassword,
          token,
        },
        method: "POST",
      })

      if (!response?.status) {
        throw new Error(response?.data as string)
      }
      return {
        status: response?.status,
        message: response?.message,
        data: response.data,
      }
    }),

  register: baseProcedure.input(registerSchema).mutation(async ({ input }) => {
    // Check if any field is missing a value, and throw TRPCError if so
    const { email, firstname, lastname, password, confirmPassword } = input

    if (!email || !firstname || !lastname || !password || !confirmPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "All fields are required.",
      })
    }

    const response = await publicClientApi({
      method: "POST",
      endpoint: "register",
      tenant: "auth",
      data: { ...input },
    })
  }),
})
