import TableTemplates from "@/components/modules/survey-management/tables"
import { VariableTemplates } from "@/components/modules/survey-management/variables"
import { trpc } from "@/trpc/server"

export default async function page() {
  const templates = await trpc.variable.templates()

  return <VariableTemplates data={templates?.data || []} />
}
