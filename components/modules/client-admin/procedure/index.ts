import { clientTrpcApi } from "@/lib/apis/trpc-client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { OuUserResponse } from "@/types/client-management/ou-module-types";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const clientUserRouters = createTRPCRouter({
  getAllUsers: protectedProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { clientId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      if (!clientId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "clientId is required.",
        });
      }

      const res = await clientTrpcApi<OuUserResponse>(ctx, {
        endpoint: `load-client-users/${clientId}`,
        tenant: "user",
        method: "GET",
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
  getAllInactiveUsers: protectedProcedure
    .input(
      z.object({
        clientId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { clientId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      return await clientTrpcApi<OuUserResponse>(ctx, {
        endpoint: `load-inactive-client-users/${clientId}`,
        tenant: "user",
        method: "GET",
      });
    }),
});
