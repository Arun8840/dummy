import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import {
  ClientData,
  ClientTemplateResponse,
  OrganizationalUnitResponse,
  PlanResponse,
} from "@/types/client-management/client-types"
import { TRPCError } from "@trpc/server"
import z from "zod"
import { createClientSchema, createOrganizationalUnitSchema } from "../schema"

export const clientRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<ClientTemplateResponse>(ctx, {
      endpoint: "load-clients",
      tenant: "client",
      method: "GET",
    })
  }),
  template: protectedProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const { clientId } = input

      return await clientTrpcApi<ClientData>(ctx, {
        endpoint: `load-client/${clientId}`,
        tenant: "client",
        method: "GET",
      })
    }),
  getPlan: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi<PlanResponse>(ctx, {
      endpoint: "load-plans",
      tenant: "management",
      method: "GET",
    })

    return {
      message: res?.message,
      data: res?.data,
      status: res?.status,
    }
  }),
  getPublishedPlan: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    const res = await clientTrpcApi<PlanResponse>(ctx, {
      endpoint: "load-published-plans",
      tenant: "management",
      method: "GET",
    })

    return {
      message: res?.message,
      data: res?.data,
      status: res?.status,
    }
  }),
  create: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: "create-client",
        tenant: "client",
        method: "POST",
        data: { ...input },
      })
      if (!res?.status) {
        throw new Error(res?.message)
      }
      return {
        data: res?.data,
        message: res?.message,
        status: res?.status,
      }
    }),
  getOu: protectedProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { clientId } = input
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      return await clientTrpcApi<OrganizationalUnitResponse>(ctx, {
        endpoint: `load-client-organizational-units/${clientId}`,
        tenant: "client",
        method: "GET",
      })
    }),
  createOu: protectedProcedure
    .input(createOrganizationalUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, ouId, planId, thirdpartyId, active, clientId } = input

      if (!name || !ouId || !planId || !thirdpartyId || !clientId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Missing required fields: name, ouId, planId, or thirdpartyId.",
        })
      }

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi<OrganizationalUnitResponse>(ctx, {
        endpoint: `create-organizational-unit`,
        tenant: "client",
        method: "POST",
        data: {
          name,
          ouId,
          planId,
          thirdpartyId,
          active,
          clientId,
        },
      })

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      }
    }),
  removeOu: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { ouId } = input
      if (!ouId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Missing required fields: name, ouId, planId, or thirdpartyId.",
        })
      }

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        })
      }

      const res = await clientTrpcApi<OrganizationalUnitResponse>(ctx, {
        endpoint: `delete-organizational-unit/${ouId}`,
        tenant: "client",
        method: "POST",
      })

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      }
    }),
})
