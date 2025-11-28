"use client"

import { Spinner } from "@/components/ui/spinner"
import { trpc } from "@/trpc/client"
import { TableTemplateData } from "./table-template-data"

export default function TableTemplates() {
  const { isLoading, data: tables } = trpc.table.templates.useQuery()

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    )
  }

  const tableItems = tables?.data

  return <TableTemplateData data={tableItems || []} />
}
