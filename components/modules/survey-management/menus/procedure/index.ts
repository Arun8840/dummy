import { adminTrpcApi } from "@/lib/apis/trpc-admin"
import { clientTrpcApi } from "@/lib/apis/trpc-client"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { MenuResponse } from "@/types"
import { TRPCError } from "@trpc/server"
import z from "zod"

export const menuRouter = createTRPCRouter({
  templates: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authenticated.",
      })
    }

    return await clientTrpcApi<MenuResponse>(ctx, {
      endpoint: "load-menus",
      tenant: "menu-management",
      method: "GET",
    })
  }),
})
