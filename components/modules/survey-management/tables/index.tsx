"use client"

import { Spinner } from "@/components/ui/spinner"
import { trpc } from "@/trpc/client"
import { TableTemplateData } from "./table-template-data"
import { Warning } from "@/utils/ui/warning"

export default function TableTemplates() {
  const { isLoading, data: tables, isError } = trpc.table.templates.useQuery()

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    )
  }
  if (isError) {
    return (
      <Warning
        title="Failed to load table templates"
        description="There was an error loading the table templates. Please try again."
        variant="destructive"
      />
    )
  }

  const tableItems = tables?.data

  return <TableTemplateData data={tableItems || []} />
}
