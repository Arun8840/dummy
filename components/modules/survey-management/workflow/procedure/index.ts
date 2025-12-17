import { adminTrpcApi } from "@/lib/apis/trpc-admin"
import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { WorkflowTemplateResponse } from "@/types/survey-management/workflow-types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const workflowRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<WorkflowTemplateResponse>(ctx, {
      endpoint: "loadWorkflowTemplates",
      tenant: "workflow/management",
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
        endpoint: `loadWorkflowTemplate/${templateId}`,
        tenant: "workflow",
        method: "GET",
      })
    }),
})
