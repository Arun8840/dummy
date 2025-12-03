import { workflowRouter } from "@/components/modules/survey-management/workflow/procedure";
import { createTRPCRouter } from "../init";
import { dashboardRouter } from "@/components/modules/dashboard/procedure";
import { tableRouter } from "@/components/modules/survey-management/tables/procedure";
import { surveyRouter } from "@/components/modules/survey-management/survey/procedure";
import { authRouter } from "@/components/auth-forms/procedure";
import { clientRouter } from "@/components/modules/client-management/clients/procedure";
import { ouRouter } from "@/components/modules/client-management/clients/ou-templates/procedure";
import { clientAdminRouters } from "./clientAdmin-router";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  dashboard: dashboardRouter,
  workflow: workflowRouter,
  table: tableRouter,
  survey: surveyRouter,
  clients: clientRouter,
  organizationalUnits: ouRouter,
  clientAdmin: clientAdminRouters,
});

// export type definition of API
export type AppRouter = typeof appRouter;
