"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight, MoreHorizontal, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTable } from "@/utils/ui/data-table/table-component"

import { getDate } from "@/utils/functions/helpers"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { useGetModalState } from "@/hooks/use-modal-state"

import {
  VariableTemplate,
  VariableTemplateResponse,
} from "@/types/survey-management/variable-types"

interface VariableTemplateDataProps {
  data: VariableTemplateResponse
}

// Correct columns for variable templates (field names and accessorKeys)
export const columns: ColumnDef<VariableTemplate>[] = [
  {
    accessorKey: "name",
    header: "Variable Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original.status
      const isPublished = status === "Published"
      return (
        <div className="capitalize">
          <Badge
            data-published={isPublished}
            variant={isPublished ? "secondary" : "outline"}
            className="data-[published=true]:text-primary  data-[published=true]:fill-primary"
          >
            {isPublished && <Star fill="currentColor" />}
            {status}
          </Badge>
        </div>
      )
    },
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
      // Format date if it's an ISO string/date
      const dateString = getDate(value as any)

      return <div className="text-left">{dateString}</div>
    },
  },
  {
    accessorKey: "modifiedBy",
    header: () => <div className="text-left">Modified By</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("modifiedBy")}</div>
    ),
  },
  {
    accessorKey: "modifiedDate",
    header: () => <div className="text-left">Modified On</div>,
    cell: ({ row }) => {
      const value = row.getValue("modifiedDate")
      // Format date if it's an ISO string/date
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
              <Link href={`/variableDesign/${template?.id}`}>
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

export function VariableTemplates({ data }: VariableTemplateDataProps) {
  // *HOOKS
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-variable",
  })

  const createAction = () => {
    return (
      <Button onClick={open}>
        <Plus /> Create Variable
      </Button>
    )
  }
  return (
    <div className="w-full">
      <ModalDrawer title="Create Variable" open={isOpen} setOpen={setIsOpen}>
        Inprogress...
      </ModalDrawer>
      <DataTable
        createAction={createAction}
        columns={columns}
        data={data}
        title={"Variable"}
      />
    </div>
  )
}
