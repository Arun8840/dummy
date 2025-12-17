"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { TableColumn, TableType } from "@/types/survey-management/table-types"
import { CustomCard } from "@/utils/ui/custom-card"
import { DataTable } from "@/utils/ui/data-table/table-component"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, X } from "lucide-react"
import React, { useState } from "react"

interface DroppedTableProps {
  table: TableType
  tableIdx: number
}
type StateType = {
  overAll: boolean
  selectedColumn: string | null
}
export const DroppedTable: React.FC<DroppedTableProps> = ({
  table,
  tableIdx,
}) => {
  const [columnEdit, setColumnEdit] = useState<StateType>({
    overAll: false,
    selectedColumn: null,
  })

  const handleEditColumn = (columnId: string | null) => {
    setColumnEdit((prev) => ({ ...prev, selectedColumn: columnId }))
  }

  const columns: ColumnDef<TableColumn>[] = [
    {
      accessorKey: "name",
      header: "Table Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "displayName",
      header: "Display Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("displayName")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "hidden",
      header: "Hidden",
      cell: ({ row }) => {
        const value = row.getValue("hidden")
        return <Checkbox defaultChecked={!!value} />
      },
    },
    {
      accessorKey: "index",
      header: "DB Index",
      cell: ({ row }) => {
        const value = row.getValue("index")
        return <Checkbox defaultChecked={!!value} />
      },
    },
    {
      accessorKey: "showInReports",
      header: "In Reports",
      cell: ({ row }) => {
        const value = row.getValue("showInReports")
        return <Checkbox defaultChecked={!!value} />
      },
    },
    {
      accessorKey: "mapColumn",
      header: "Map Column",
      cell: ({ row }) => {
        const value = row.getValue("mapColumn")
        return <Checkbox defaultChecked={!!value} />
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const column = row.original
        const isEdit = column?.id === columnEdit?.selectedColumn
        return (
          <div className="flex items-center gap-x-2">
            {isEdit ? (
              <Button
                onClick={() => handleEditColumn(null)}
                variant={"ghost"}
                size={"icon-sm"}
                type="button"
              >
                <X fill="gray" stroke="gray" />
              </Button>
            ) : (
              <Button
                onClick={() => handleEditColumn(column?.id)}
                variant={"ghost"}
                size={"icon-sm"}
                type="button"
              >
                <Pen fill="gray" stroke="gray" />
              </Button>
            )}
          </div>
        )
      },
    },
  ]
  return (
    <CustomCard
      title={`Table ${tableIdx + 1}: ${
        table?.displayName || table?.name || "Untitled Table"
      }`}
    >
      <DataTable
        searchBy="name"
        title={`Columns`}
        columns={columns}
        data={table?.columns || []}
      />
    </CustomCard>
  )
}
