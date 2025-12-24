"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  WorkflowTemplate,
  WorkflowTemplateResponse,
} from "@/types/survey-management/workflow-types"
import { DataTable } from "@/utils/ui/data-table/table-component"
import { getDate } from "@/utils/functions/helpers"
import Link from "next/link"

interface WorkflowTableProps {
  data: WorkflowTemplateResponse
}

// Correct columns for workflow templates (field names and accessorKeys)
export const columns: ColumnDef<WorkflowTemplate>[] = [
  {
    accessorKey: "name",
    header: "Workflow Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: () => <div className="text-left">Created By</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("createdBy")}</div>
    ),
  },
  {
    accessorKey: "createdDate",
    header: () => <div className="text-left">Created On</div>,
    cell: ({ row }) => {
      const value = row.getValue("createdDate")
      const dateString = getDate(value as any)
      return <div className="text-left">{dateString}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const template = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/workflow/${template?.id}`}>
                <ArrowUpRight />
                Open {template?.name}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function WorkflowTable({ data }: WorkflowTableProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} title={"Workflow"} />
    </div>
  )
}
