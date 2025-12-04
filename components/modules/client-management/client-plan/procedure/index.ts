import { clientTrpcApi } from "@/lib/apis/trpc-client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {
  ClientPlan,
  ClientPlanResponseType,
} from "@/types/client-management/client-plan-types";
import { ClientData } from "@/types/client-management/client-types";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const clientPlanRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    return await clientTrpcApi<ClientPlanResponseType>(ctx, {
      endpoint: "load-client-plans",
      tenant: "management",
      method: "GET",
    });
  }),
  template: protectedProcedure
    .input(
      z.object({
        planId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const { planId } = input;

      return await clientTrpcApi<ClientPlan>(ctx, {
        endpoint: `load-client-plan/${planId}`,
        tenant: "management",
        method: "GET",
      });
    }),
});
