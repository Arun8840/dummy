"use client"

import { Spinner } from "@/components/ui/spinner"
import { trpc } from "@/trpc/client"
import { WorkflowTable } from "./workflow-table"

export const WorkflowTemplate = () => {
  const { isLoading, data } = trpc.workflow.templates.useQuery()

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    )
  }

  const workflowItems = data?.data

  return <WorkflowTable data={workflowItems ?? []} />
}
