import { clientTrpcApi } from "@/lib/apis/trpc-client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {
  ClientData,
  ClientTemplateResponse,
  PlanResponse,
  RoleResponseType,
} from "@/types/client-management/client-types";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { createClientSchema } from "../schema";

export const clientRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    return await clientTrpcApi<ClientTemplateResponse>(ctx, {
      endpoint: "load-clients",
      tenant: "client",
      method: "GET",
    });
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
        });
      }

      const { clientId } = input;

      return await clientTrpcApi<ClientData>(ctx, {
        endpoint: `load-client/${clientId}`,
        tenant: "client",
        method: "GET",
      });
    }),
  getPlan: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    const res = await clientTrpcApi<PlanResponse>(ctx, {
      endpoint: "load-plans",
      tenant: "management",
      method: "GET",
    });

    return {
      message: res?.message,
      data: res?.data,
      status: res?.status,
    };
  }),
  getPublishedPlan: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    const res = await clientTrpcApi<PlanResponse>(ctx, {
      endpoint: "load-published-plans",
      tenant: "management",
      method: "GET",
    });

    return {
      message: res?.message,
      data: res?.data,
      status: res?.status,
    };
  }),
  create: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: "create-client",
        tenant: "client",
        method: "POST",
        data: { ...input },
      });
      if (!res?.status) {
        throw new Error(res?.message);
      }
      return {
        data: res?.data,
        message: res?.message,
        status: res?.status,
      };
    }),

  // ! publihsed roles
  getPublishedRole: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    const res = await clientTrpcApi<RoleResponseType>(ctx, {
      endpoint: "load-published-roles",
      tenant: "management",
      method: "GET",
    });

    return {
      message: res?.message,
      data: res?.data,
      status: res?.status,
    };
  }),
});
