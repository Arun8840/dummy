import Workflow from "@/components/modules/survey-management/workflow/design"
import { trpc } from "@/trpc/server"
import { WorkflowTemplate } from "@/types/survey-management/workflow-types"
import { Warning } from "@/utils/ui/warning"
import React from "react"

interface WorklfowByIdProps {
  params: {
    id: string
  }
}
export default async function workflowById({ params }: WorklfowByIdProps) {
  const { id: templateId } = await params
  const template = await trpc.workflow.template({ templateId })

  if (!templateId || !template?.status) {
    return (
      <Warning
        title="Workflow Not Found"
        description="The workflow you are looking for does not exist or the Template ID was not provided."
        variant="destructive"
      />
    )
  }

  return <Workflow template={template?.data as WorkflowTemplate} />
}
