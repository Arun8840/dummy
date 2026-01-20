import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TableTemplateResponse } from "@/types/survey-management/table-types"
import { TRPCError } from "@trpc/server"
import z from "zod"
import { createSurveySchema } from "../schema"
import {
  QuestionTypes,
  SurveyResponse,
  SurveySettingsResponse,
  SurveyType,
  Textbox,
} from "@/types/survey-management/survey-types"
import { DragComponentTypes, TextboxTypes } from "@/types"

export const surveyRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<SurveyResponse>(ctx, {
      endpoint: "load-templates",
      tenant: "survey/management",
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

      return await clientTrpcApi<SurveyType>(ctx, {
        endpoint: `load-template/${templateId}`,
        tenant: "survey/management",
        method: "GET",
      })
    }),
  getTemplateSettings: protectedProcedure
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

      return await clientTrpcApi<SurveySettingsResponse>(ctx, {
        endpoint: `load-template/${templateId}`,
        tenant: "survey/management/settings",
        method: "GET",
      })
    }),

  components: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<TableTemplateResponse>(ctx, {
      endpoint: "load-survey-component-groups",
      tenant: "survey/management",
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
        tenant: "survey/management",
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
        tenant: "survey/management",
        method: "POST",
      })
    }),

  saveTemplateSettings: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { id } = input
      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Survey templateId is required.",
        })
      }

      return await clientTrpcApi<SurveySettingsResponse>(ctx, {
        endpoint: `save-template`,
        tenant: "survey/management/settings",
        method: "POST",
        data: { ...input },
      })
    }),

  // * DESIGN RELATED PROCEDURES
  questions: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi<DragComponentTypes[]>(ctx, {
      endpoint: "load-survey-component-groups",
      tenant: "survey/management",
      method: "GET",
    })

    return {
      status: res?.status,
      data: res?.data,
      message: res?.message,
    }
  }),

  addQuestion: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const request = input
      const res = await clientTrpcApi<QuestionTypes>(ctx, {
        endpoint: "create-component",
        tenant: "survey/management",
        method: "POST",
        data: { ...request },
      })

      return {
        status: res?.status,
        data: res?.data,
        message: res?.message,
      }
    }),
  removeQuestion: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const request = input
      const res = await clientTrpcApi<SurveyType>(ctx, {
        endpoint: "remove-component",
        tenant: "survey/management",
        method: "POST",
        data: { ...request },
      })

      return {
        status: res?.status,
        data: res?.data,
        message: res?.message,
      }
    }),

  copyQuestion: protectedProcedure.input(z.any()).mutation(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi(ctx, {
      endpoint: "copy-component",
      tenant: "survey/management",
      method: "POST",
    })

    return {
      status: res?.status,
      data: res?.data,
      message: res?.message,
    }
  }),
  moveQuestion: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const request = input
      const res = await clientTrpcApi<SurveyType>(ctx, {
        endpoint: "move-component",
        tenant: "survey/management",
        method: "POST",
        data: { ...request },
      })

      return {
        status: res?.status,
        data: res?.data,
        message: res?.message,
      }
    }),
  saveQuestion: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: "save-component",
        tenant: "survey/management",
        method: "POST",
        data: { ...input },
      })

      return {
        status: res?.status,
        data: res?.data,
        message: res?.message,
      }
    }),

  // * common service calls for question properties
  getTextboxTypes: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<TextboxTypes[]>(ctx, {
      endpoint: "getTextBoxTypes",
      tenant: "survey/management",
      method: "GET",
    })
  }),

  getNewTextBox: protectedProcedure
    .input(
      z.object({
        length: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { length } = input
      if (!length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing or invalid length property.",
        })
      }

      const res = await clientTrpcApi<Textbox>(ctx, {
        endpoint: `get-textbox/${length}`,
        tenant: "survey/management",
        method: "GET",
      })

      return {
        status: res?.status,
        data: res?.data,
        message: res?.message,
      }
    }),
})
