import { trpc } from "@/trpc/server"
import { Warning } from "@/utils/ui/warning"
import React from "react"

interface DesignProps {
  params: {
    id: string
  }
}
export default async function design({ params }: DesignProps) {
  const { id } = await params
  const table = await trpc.survey.template({ templateId: id })
  if (!id) {
    return (
      <Warning
        title="Survey Design ID Missing"
        variant="destructive"
        description="A survey design ID is required to display this page. Please verify the URL and try again."
      />
    )
  }

  console.log(table)
  return <div>design</div>
}
