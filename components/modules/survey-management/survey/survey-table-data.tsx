"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpRight,
  BadgeCheckIcon,
  MoreHorizontal,
  Plus,
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
import Link from "next/link"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { CreateSurveyForm } from "./modal-form/create-survey-form"
import { useGetModalState } from "@/hooks/use-modal-state"
import {
  SurveyResponse,
  SurveyType,
} from "@/types/survey-management/survey-types"

interface SurveyTemplateDataProps {
  data: SurveyResponse
}

// Correct columns for survey templates (field names and accessorKeys)
export const columns: ColumnDef<SurveyType>[] = [
  {
    accessorKey: "name",
    header: "Survey Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
              <Link href={`/surveyDesign/${template?.id}`}>
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

export function SurveyTableData({ data }: SurveyTemplateDataProps) {
  // *HOOKS
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-survey",
  })

  const createAction = () => {
    return (
      <Button onClick={open}>
        <Plus /> Create Survey
      </Button>
    )
  }
  return (
    <div className="w-full">
      <ModalDrawer title="Create Survey" open={isOpen} setOpen={setIsOpen}>
        <CreateSurveyForm />
      </ModalDrawer>
      <DataTable
        createAction={createAction}
        columns={columns}
        data={data}
        title={"Survey"}
      />
    </div>
  )
}
