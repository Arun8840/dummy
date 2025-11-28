import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { LoginExperienceResponse } from "@/types/auth-types"
import { MenuResponse } from "@/types/dashboard-types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const dashboardRouter = createTRPCRouter({
  loginExperience: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx?.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<LoginExperienceResponse>(ctx, {
      method: "GET",
      endpoint: "login-experience",
      tenant: "user",
    })
  }),
  getMenu: protectedProcedure
    .input(
      z.object({
        menuTemplateId: z.string(),
        admin: z.boolean(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx?.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { admin, menuTemplateId } = input

      // Decide endpoint based on admin, reducing duplicate code
      const endpoint = `load-menu/${menuTemplateId}`

      return await clientTrpcApi<MenuResponse>(ctx, {
        method: "GET",
        endpoint,
        tenant: "menu",
      })
    }),
})
