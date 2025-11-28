import { adminTrpcApi } from "@/lib/apis/trpc-admin"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TableTemplateResponse } from "@/types/survey-management/table-types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const surveyRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await adminTrpcApi<TableTemplateResponse>(ctx, {
      endpoint: "loadAllSurveyTemplates",
      tenant: "survey",
      method: "GET",
    })
  }),
  template: protectedProcedure
    .input(
      z.object({
        templateId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const { templateId } = input

      return await adminTrpcApi(ctx, {
        endpoint: `loadSurveyTemplate/${templateId}`,
        tenant: "survey",
        method: "GET",
      })
    }),
})
