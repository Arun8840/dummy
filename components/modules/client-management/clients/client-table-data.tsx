"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpRight,
  BadgeCheckIcon,
  BadgeXIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react"

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
import { ClientData } from "@/types/client-management/client-types"
import { useGetModalState } from "@/hooks/use-modal-state"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { CreateClientForm } from "./create-client-form"
import Link from "next/link"
import { encryptClient } from "@/utils/functions/encrypt/client-encryption"

interface ClientTemplateDataProps {
  data: ClientData[]
}

// Correct columns for workflow templates (field names and accessorKeys)
const columns: ColumnDef<ClientData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "clientId",
    header: "Client ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientId")}</div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("active") as boolean
      return isActive ? (
        <BadgeCheckIcon
          className="text-green-600 dark:text-green-400"
          size={16}
        />
      ) : (
        <BadgeXIcon className=" text-red-600 dark:text-red-400" size={16} />
      )
    },
  },

  {
    accessorKey: "createdUserId",
    header: () => <div className="text-left">Created By</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("createdUserId")}</div>
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
    accessorKey: "modifiedUserId",
    header: () => <div className="text-left">Modified By</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("modifiedUserId")}</div>
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status") as "Draft" | "Published"
      const isPublished = value === "Published"
      return (
        <Badge
          data-published={isPublished}
          variant="secondary"
          className=" data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
        >
          <BadgeCheckIcon />
          {value}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const template = row.original
      const encryptedId = encryptClient(template?.id)

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
              <Link href={`/clients/${encryptedId}`}>
                <ArrowUpRight /> {template?.name}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ClientTableData({ data }: ClientTemplateDataProps) {
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-client",
  })

  const createAction = () => {
    return (
      <Button
        title="Create Client"
        type="button"
        onClick={open}
        size={"sm"}
        className="w-full sm:w-auto"
      >
        <Plus /> Create Client
      </Button>
    )
  }
  return (
    <div className="w-full">
      <ModalDrawer title="Create Client" open={isOpen} setOpen={setIsOpen}>
        <CreateClientForm />
      </ModalDrawer>
      <DataTable
        createAction={createAction}
        columns={columns}
        data={data || []}
        title={"Clients"}
      />
    </div>
  )
}
