import { clientTrpcApi } from "@/lib/apis/trpc-client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { MenuResponse } from "@/types";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const globalRouters = createTRPCRouter({
    slots: protectedProcedure
        .input(
            z.object({
                menuTemplateId: z.string().min(1),
            })
        )
        .query(async ({ ctx, input }) => {
            const { menuTemplateId } = input;
            if (!ctx.access_token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User is not authenticated.",
                });
            }
            if (!menuTemplateId) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "menuTemplateId is required." });
            }

            const res = await clientTrpcApi<MenuResponse>(ctx, {
                endpoint: `load-slot-menus/${menuTemplateId}`,
                tenant: "menu-management",
                method: "GET",
            });

            return {
                status: res?.status,
                message: res?.message,
                data: res?.data,
            };
        })
});
