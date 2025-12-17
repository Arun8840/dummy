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
import { BadgeCheckIcon, Pen } from "lucide-react"
import { FeatureCard } from "@/utils/ui/feature-card"
import { TableTemplate } from "@/types/survey-management/table-types"

interface TableDetailsProps {
  template: TableTemplate
}

export const TableDetails = ({ template }: TableDetailsProps) => {
  const { name, status, createdBy, modifiedBy } = template || {}
  return (
    <FeatureCard title="Table Information">
      <Table>
        <TableHeader>
          <TableRow>
            {tableTableHeaders.map((header, idx) => (
              <TableHead
                key={header}
                className={header === "Action" ? "text-right" : undefined}
              >
                {header}
              </TableHead>
            ))}
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
            <TableCell className="text-right">
              <Button variant={"ghost"} size={"icon-sm"}>
                <Pen fill="currentColor" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FeatureCard>
  )
}
const tableTableHeaders = [
  "Name",
  "Status",
  "Created By",
  "Last Updated By",
  "Action",
]
