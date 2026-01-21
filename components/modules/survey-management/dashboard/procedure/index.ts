import { adminTrpcApi } from "@/lib/apis/trpc-admin"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { DashboardResponse } from "@/types/survey-management/dashboard-types"
import { TRPCError } from "@trpc/server"

export const dashboardProcedureRouter = createTRPCRouter({
  getAssignments: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx?.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view your survey assignments.",
      })
    }

    const response = await adminTrpcApi<DashboardResponse>(ctx, {
      method: "GET",
      tenant: "chart",
      endpoint: "getSurveyAssignmentByUser",
    })
    return {
      status: response?.status,
      message: response?.message,
      data: response?.data
    }
  }),
  getUserAllocations: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx?.access_token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view user allocations.",
      })
    }

    const allocationsResponse = await adminTrpcApi<DashboardResponse>(ctx, {
      method: "GET",
      tenant: "chart",
      endpoint: "getSurveyUserAllocation",
    })
    return allocationsResponse
  }),
})
