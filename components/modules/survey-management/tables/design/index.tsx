import { TableTemplate } from "@/types/survey-management/table-types"
import { Warning } from "@/utils/ui/warning"
import React from "react"
import { DroppedTable } from "./dropped-table"

interface TableDesignProps {
  template: TableTemplate
}
export const TableDesign: React.FC<TableDesignProps> = ({ template }) => {
  const { name, tables } = template

  if (tables?.length === 0) {
    return (
      <Warning
        title="No tables found"
        description="Please upload your table from a file or drag and drop from the available items."
        variant="default"
      />
    )
  }
  return tables?.map((table, tableIdx) => {
    return (
      <DroppedTable
        key={`Table_${table?.id}`}
        table={table}
        tableIdx={tableIdx}
      />
    )
  })
}
