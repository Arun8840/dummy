import { clientTrpcApi } from "@/lib/apis/trpc-client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { OrganizationalUnitResponse } from "@/types/client-management/client-types";
import { TRPCError } from "@trpc/server";
import z, { email } from "zod";
import { OuResponseType } from "@/types/client-management/ou-types";
import { createOrganizationalUnitSchema } from "../../schema";
import { OuUserResponse } from "@/types/client-management/ou-module-types";
import { createOuUserSchema } from "../schemas";

export const ouRouter = createTRPCRouter({
  getOus: protectedProcedure
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

      return await clientTrpcApi<OrganizationalUnitResponse>(ctx, {
        endpoint: `load-client-organizational-units/${clientId}`,
        tenant: "client",
        method: "GET",
      });
    }),
  getOuById: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { ouId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      return await clientTrpcApi<OuResponseType>(ctx, {
        endpoint: `load-organizational-unit/${ouId}`,
        tenant: "client",
        method: "GET",
      });
    }),
  createOu: protectedProcedure
    .input(createOrganizationalUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, ouId, planId, thirdpartyId, active, clientId } = input;

      if (!name || !ouId || !planId || !thirdpartyId || !clientId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Missing required fields: name, ouId, planId, or thirdpartyId.",
        });
      }

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
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
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
  removeOu: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { ouId } = input;
      if (!ouId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Missing required fields: name, ouId, planId, or thirdpartyId.",
        });
      }

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi<OrganizationalUnitResponse>(ctx, {
        endpoint: `delete-organizational-unit/${ouId}`,
        tenant: "client",
        method: "POST",
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),

  // ! ou users related services
  getOuUsers: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { ouId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      return await clientTrpcApi<OuUserResponse>(ctx, {
        endpoint: `load-ou-users/${ouId}`,
        tenant: "user",
        method: "GET",
      });
    }),
  createOuUsers: protectedProcedure
    .input(createOuUserSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi<OuUserResponse>(ctx, {
        endpoint: `add-user`,
        tenant: "user",
        method: "POST",
        data: { ...input },
      });
      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
  getOuInactiveUsers: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { ouId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      return await clientTrpcApi<OuUserResponse>(ctx, {
        endpoint: `load-inactive-ou-users/${ouId}`,
        tenant: "user",
        method: "GET",
      });
    }),

  getOuUserGroups: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      });
    }

    return await clientTrpcApi(ctx, {
      endpoint: `load-client-groups`,
      tenant: "user/group",
      method: "GET",
    });
  }),
  getOuRoles: protectedProcedure
    .input(
      z.object({
        ouId: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const { ouId } = input;
      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      return await clientTrpcApi(ctx, {
        endpoint: `load-ou-role-template/${ouId}`,
        tenant: "client",
        method: "GET",
      });
    }),
  enableUser: protectedProcedure
    .input(
      z.object({
        email: z.email("Invalid format!").min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: `enable-user`,
        tenant: "user",
        method: "POST",
        data: { email },
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
  disableUser: protectedProcedure
    .input(
      z.object({
        email: z.email("Invalid format!").min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: `disable-user`,
        tenant: "user",
        method: "POST",
        data: { email },
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
  removeUser: protectedProcedure
    .input(
      z.object({
        email: z.email("Invalid format!").min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      if (!ctx.access_token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }

      const res = await clientTrpcApi(ctx, {
        endpoint: `delete-user`,
        tenant: "user",
        method: "POST",
        data: { email },
      });

      return {
        status: res?.status,
        message: res?.message,
        data: res?.data,
      };
    }),
});
