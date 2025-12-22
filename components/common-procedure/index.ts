import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { MenuResponse } from "@/types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const globalRouters = createTRPCRouter({
  slots: protectedProcedure
    .input(
      z.object({
        menuTemplateId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { menuTemplateId } = input
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      if (!menuTemplateId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "menuTemplateId is required.",
        })
      }

      const res = await clientTrpcApi<MenuResponse>(ctx, {
        endpoint: `load-slot-menus/${menuTemplateId}`,
        tenant: "menu-management",
        method: "GET",
      })

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      }
    }),

  resourceRoles: protectedProcedure.query(async ({ ctx, input }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi(ctx, {
      endpoint: `getResourceRoles`,
      tenant: "table/management",
      method: "GET",
    })

    return {
      status: res?.status,
      message: res?.message,
      data: res?.data,
    }
  }),
  securityPermissions: protectedProcedure
    .input(z.object({ templateId: z.string(), tenant: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }
      const { templateId, tenant } = input
      if (!templateId || !tenant) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "templateId is required.",
        })
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: `getAllTemplatePermissions/${templateId}`,
        tenant: tenant,
        method: "GET",
      })

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      }
    }),
})
