import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import {
  TableTemplate,
  TableTemplateResponse,
} from "@/types/survey-management/table-types"
import { TRPCError } from "@trpc/server"
import z from "zod"
import { createTableSchema, menuSchema, permissionSchema } from "../schema"

export const tableRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<TableTemplateResponse>(ctx, {
      endpoint: "loadAllTableTemplates",
      tenant: "table/management",
      method: "get",
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
          message: "Table template ID is required.",
        })
      }

      return await clientTrpcApi<TableTemplate>(ctx, {
        endpoint: `loadTableTemplate/${templateId}`,
        tenant: "table/management",
        method: "GET",
      })
    }),
  create: protectedProcedure
    .input(createTableSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { name, description } = input

      if (!name) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Table name is required.",
        })
      }

      const res = await clientTrpcApi<TableTemplate>(ctx, {
        endpoint: `createTableTemplate`,
        tenant: "table/management",
        method: "POST",
        data: input,
      })

      return {
        status: res.status,
        data: res.data,
        message: res.message,
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

      const res = await clientTrpcApi<TableTemplate>(ctx, {
        endpoint: `deleteTableTemplate/${templateId}`,
        tenant: "table/management",
        method: "POST",
      })

      return {
        status: res.status,
        data: res.data,
        message: res.message,
      }
    }),

  // * TABLE SECURITY RELATED SERVICES
  createMenu: protectedProcedure
    .input(
      z.object({
        templateId: z.string().min(1, "Template ID is required"),
        containerId: z.string().min(1, "Container ID is required"),
        componentType: z.string().min(1, "Component Type is required"),
        menu: menuSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const { templateId, containerId } = input

      if (!templateId || !containerId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Template ID and Container ID are required.",
        })
      }

      const res = await clientTrpcApi<TableTemplate>(ctx, {
        endpoint: `addTableComponent`,
        tenant: "table/management",
        method: "POST",
        data: input,
      })

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      }
    }),

  createMenuPermission: protectedProcedure
    .input(permissionSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
    }),
})
