import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import {
  WorkflowTemplate,
  WorkflowTemplateResponse,
} from "@/types/survey-management/workflow-types"
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
      if (!templateId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Template ID is required.",
        })
      }

      const res = await clientTrpcApi<WorkflowTemplate>(ctx, {
        endpoint: `loadWorkflowTemplate/${templateId}`,
        tenant: "workflow/management",
        method: "GET",
      })

      return {
        status: res?.success,
        message: res?.message,
        data: res?.data,
      }
    }),

  // * DRAG ITEMS
  components: protectedProcedure.query(async ({ ctx, input }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi<WorkflowTemplate>(ctx, {
      endpoint: `loadWorkflowComponents`,
      tenant: "workflow/management",
      method: "GET",
    })

    return {
      status: res?.success,
      message: res?.message,
      data: res?.data,
    }
  }),

  // *CRUD SERVICES
  addComponent: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi<WorkflowTemplate>(ctx, {
        endpoint: `addWorkflowComponent`,
        tenant: "workflow/management",
        method: "POST",
        data: input,
      })

      return {
        status: res?.success,
        message: res?.message,
        data: res?.data,
      }
    }),

  removeComponent: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi<WorkflowTemplate>(ctx, {
        endpoint: `removeWorkflowComponent`,
        tenant: "workflow/management",
        method: "POST",
        data: input,
      })

      return {
        status: res?.success,
        message: res?.message,
        data: res?.data,
      }
    }),

  removeStep: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi<WorkflowTemplate>(ctx, {
        endpoint: `removeStep`,
        tenant: "workflow/management",
        method: "POST",
        data: input,
      })

      return {
        status: res?.success,
        message: res?.message,
        data: res?.data,
      }
    }),
})
