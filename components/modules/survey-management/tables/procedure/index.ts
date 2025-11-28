import { adminTrpcApi } from "@/lib/apis/trpc-admin"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TableTemplateResponse } from "@/types/survey-management/table-types"
import { WorkflowTemplateResponse } from "@/types/survey-management/workflow-types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const tableRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await adminTrpcApi<TableTemplateResponse>(ctx, {
      endpoint: "loadAllTableTemplates",
      tenant: "table",
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
        endpoint: `loadTableTemplate/${templateId}`,
        tenant: "table",
        method: "GET",
      })
    }),
})
