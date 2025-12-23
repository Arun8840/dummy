"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BadgeCheckIcon, Pen, Send } from "lucide-react"
import { FeatureCard } from "@/utils/ui/feature-card"
import { TableTemplate } from "@/types/survey-management/table-types"
import { useConfirm } from "@/hooks/use-confirm"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"

interface TableDetailsProps {
  template: TableTemplate
}

export const TableDetails = ({ template }: TableDetailsProps) => {
  const { name, status, createdBy, modifiedBy, id: templateId } = template || {}
  const publish = trpc.table.publish.useMutation()
  const utils = trpc.useUtils()
  const [PublishModal, publishAction] = useConfirm(
    `Publish Table Template - ${name}`,
    "Are you sure you want to publish this table template? Once published, the template and its structure will be available for use across your organization.",
    "default"
  )

  const handlePublish = async () => {
    const confirm = await publishAction()
    if (!confirm) return
    publish.mutate(
      { templateId },
      {
        onSuccess: async (data) => {
          toast.success(data?.message, {
            position: "top-center",
          })
          await utils.table.template.invalidate({ templateId })
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          })
        },
      }
    )
  }

  const isPublished = status === "Published"
  return (
    <>
      <PublishModal isPending={publish?.isPending} />
      <FeatureCard title="Table Information">
        <Table>
          <TableHeader>
            <TableRow>
              {tableTableHeaders.map((header) =>
                ["Edit", "Publish"].includes(header) && isPublished ? null : (
                  <TableHead
                    key={header}
                    className={header === "Edit" ? "text-right" : undefined}
                  >
                    {header}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{name}</TableCell>

              <TableCell>
                <Badge
                  data-published={status === "Published"}
                  variant="secondary"
                  className=" data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
                >
                  <BadgeCheckIcon />
                  {status}
                </Badge>
              </TableCell>
              <TableCell>{createdBy}</TableCell>
              <TableCell>{modifiedBy}</TableCell>
              {isPublished ? null : (
                <>
                  <TableCell>
                    <Button
                      aria-label="Publish template"
                      type="button"
                      onClick={handlePublish}
                      size={"icon-sm"}
                    >
                      <Send />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant={"ghost"} size={"icon-sm"}>
                      <Pen fill="currentColor" />
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </FeatureCard>
    </>
  )
}
const tableTableHeaders = [
  "Name",
  "Status",
  "Created By",
  "Last Updated By",
  "Publish",
  "Edit",
]
