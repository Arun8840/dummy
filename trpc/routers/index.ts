import { workflowRouter } from "@/components/modules/survey-management/workflow/procedure"
import { createTRPCRouter } from "../init"
import { dashboardRouter } from "@/components/modules/dashboard/procedure"
import { tableRouter } from "@/components/modules/survey-management/tables/procedure"
import { surveyRouter } from "@/components/modules/survey-management/survey/procedure"
import { authRouter } from "@/components/auth-forms/procedure"
import { clientRouter } from "@/components/modules/client-management/clients/procedure"
import { ouRouter } from "@/components/modules/client-management/clients/ou-templates/procedure"
import { clientAdminRouters } from "./clientAdmin-router"
import { clientPlanRouter } from "@/components/modules/client-management/client-plan/procedure"
import { globalRouters } from "@/components/common-procedure"
import { menuRouter } from "@/components/modules/survey-management/menus/procedure"
import { variableRouter } from "@/components/modules/survey-management/variables/procedure"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  global: globalRouters,
  dashboard: dashboardRouter,
  workflow: workflowRouter,
  table: tableRouter,
  survey: surveyRouter,
  variable: variableRouter,
  menu: menuRouter,
  clients: clientRouter,
  clientPlans: clientPlanRouter,
  organizationalUnits: ouRouter,
  clientAdmin: clientAdminRouters,
})

// export type definition of API
export type AppRouter = typeof appRouter
