import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TableTemplateResponse } from "@/types/survey-management/table-types"
import { TRPCError } from "@trpc/server"
import z from "zod"
import { SurveyType } from "@/types/survey-management/survey-types"
import { createSurveySchema } from "../../survey/schema"
import {
  VariableTemplate,
  VariableTemplateResponse,
} from "@/types/survey-management/variable-types"

export const variableRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi<VariableTemplateResponse>(ctx, {
      tenant: "variable/management",
      endpoint: `load-templates`,
      method: "GET",
    })

    return {
      status: res?.status,
      message: res?.message,
      data: res?.data,
    }
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

      return await clientTrpcApi<VariableTemplate>(ctx, {
        endpoint: `load-template/${templateId}`,
        tenant: "variable/management",
        method: "GET",
      })
    }),

  // * CRUD SERVICES
  create: protectedProcedure
    .input(createSurveySchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      if (!input?.name || input.name.trim().length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Survey name is required.",
        })
      }

      const res = await clientTrpcApi<SurveyType>(ctx, {
        endpoint: "create-template",
        tenant: "variable/management",
        method: "POST",
        data: { ...input },
      })

      return {
        status: res.success,
        message: res.message,
        data: res.data,
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        templateId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { templateId } = input
      if (!templateId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Survey templateId is required.",
        })
      }

      return await clientTrpcApi<TableTemplateResponse>(ctx, {
        endpoint: `delete-template/${templateId}`,
        tenant: "variable/management",
        method: "POST",
      })
    }),
})
