"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpRight,
  BadgeCheckIcon,
  MoreHorizontal,
  Plus,
  Star,
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
import Link from "next/link"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { CreateSurveyForm } from "./modal-form/create-survey-form"
import { useGetModalState } from "@/hooks/use-modal-state"
import {
  SurveyResponse,
  SurveyType,
} from "@/types/survey-management/survey-types"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"

interface SurveyTemplateDataProps {
  data: SurveyResponse
}


export function SurveyTableData({ data }: SurveyTemplateDataProps) {
  // *HOOKS
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-survey",
  })
  const remove = trpc.survey.delete.useMutation()
  const utils = trpc.useUtils()
  const [ConfirmationModal, confirm] = useConfirm(
    "Delete Survey Template",
    "Are you sure you want to delete this survey template? This action cannot be undone.",
    "destructive"
  )

  const isPending = remove?.isPending
  // Correct columns for survey templates (field names and accessorKeys)


  const removeTemplate = async (templateId: string) => {
    const confirmRemove = await confirm()
    if (!confirmRemove) return
    remove.mutate({ templateId }, {
      onSuccess: async (data) => {
        toast.success(data?.message, {
          position: "top-center"
        })
        await utils.survey.templates.invalidate()
      },
      onError(error) {
        toast.error(error?.message, {
          position: "top-center"
        })
      },
    })
  }
  const columns: ColumnDef<SurveyType>[] = [
    {
      accessorKey: "name",
      header: "Survey Name",
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
            <Badge data-published={isPublished}
              variant={isPublished ? "secondary" : "outline"}
              className="data-[published=true]:text-primary  data-[published=true]:fill-primary">
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
                <Link href={`/surveyDesign/${template?.id}`}>
                  <ArrowUpRight />
                  Open {template?.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isPending}
                variant="destructive"
                onClick={() => removeTemplate(template?.id)}
              >
                <Trash />
                Move to Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const createAction = () => {
    return (
      <Button disabled={isPending} onClick={open}>
        <Plus /> Create Survey
      </Button>
    )
  }
  return (
    <div className="w-full">
      <ConfirmationModal isPending={remove?.isPending} />
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
