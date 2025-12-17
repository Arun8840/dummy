import { TableDesign } from "@/components/modules/survey-management/tables/design"
import { TableDetails } from "@/components/modules/survey-management/tables/table-details"
import { trpc } from "@/trpc/server"
import { TableTemplate } from "@/types/survey-management/table-types"
import { Warning } from "@/utils/ui/warning"

export interface TableDetailsPageProps {
  params: {
    id: string
  }
}

export default async function page({ params }: TableDetailsPageProps) {
  const { id } = await params
  const table = await trpc.table.template({ templateId: id })
  if (!id) {
    return (
      <Warning
        title="Table Id missing"
        variant="destructive"
        description="A table ID is required to view table details. Please check the URL or try again."
      />
    )
  }
  return (
    <>
      <TableDetails template={table.data as TableTemplate} />
      <TableDesign template={table?.data as TableTemplate} />
    </>
  )
}
