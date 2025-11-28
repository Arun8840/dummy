"use client"

import { Spinner } from "@/components/ui/spinner"
import { trpc } from "@/trpc/client"
import { SurveyTableData } from "./survey-table-data"

export default function SurveyTemplates() {
  const { isLoading, data: tables } = trpc.survey.templates.useQuery()

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    )
  }

  const tableItems = tables?.data

  return <SurveyTableData data={tableItems || []} />
}
