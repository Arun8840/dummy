"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTable } from "@/utils/ui/data-table/table-component"
import {
  TableTemplate,
  TableTemplateResponse,
} from "@/types/survey-management/table-types"
import { getDate } from "@/utils/functions/helpers"
import Link from "next/link"
import { useConfirm } from "@/hooks/use-confirm"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { useGetModalState } from "@/hooks/use-modal-state"
import { CreateTableForm } from "./module-forms/create-table-form"

interface TableTemplateDataProps {
  data: TableTemplateResponse
}

// Correct columns for workflow templates (field names and accessorKeys)

export function TableTemplateData({ data }: TableTemplateDataProps) {
  const deleteTemplate = trpc.table.delete.useMutation()
  // ! DELETE TABLE TEMPLATE
  const [Modal, confirmation] = useConfirm(
    "Delete Table Template",
    "Are you sure you want to delete this table template? This action cannot be undone.",
    "destructive"
  )
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-table",
  })
  const utils = trpc.useUtils()

  // ! REMOVE TABLE TEMPLATE
  const handleRemoveTableTemplate = async (templateId: string) => {
    const confirm = await confirmation()

    if (confirm) {
      deleteTemplate.mutate(
        { templateId },
        {
          onSuccess: async (data) => {
            toast.success(data?.message, {
              position: "top-center",
            })
            await utils.table.templates.invalidate()
          },
          onError(error) {
            toast.error(error?.message, {
              position: "top-center",
            })
          },
        }
      )
    }
  }

  const columns: ColumnDef<TableTemplate>[] = [
    {
      accessorKey: "name",
      header: "Table Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
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
        // const encryptedId = encryptClient(template?.id)
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
                <Link href={`/table/${template?.id}`}>
                  <ArrowUpRight />
                  Open {template?.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => handleRemoveTableTemplate(template?.id)}
              >
                <Trash /> Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // * create template
  const handleCreateTemplate = () => {
    return (
      <Button type="button" onClick={open} className="w-full sm:w-auto">
        <Plus /> Create Table
      </Button>
    )
  }
  return (
    <div className="w-full">
      <Modal isPending={deleteTemplate?.isPending} />
      <ModalDrawer title="Create Table" open={isOpen} setOpen={setIsOpen}>
        <CreateTableForm />
      </ModalDrawer>
      <DataTable
        initialPageSize={8}
        columns={columns}
        data={data}
        title={"Table"}
        createAction={handleCreateTemplate}
      />
    </div>
  )
}
