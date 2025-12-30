"use client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmailTemplate } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import { Pen, Trash2Icon } from "lucide-react"
import React from "react"

interface WorkflowEmailTemplatesProps {
  stepId: string
  emails: EmailTemplate[]
  stepIdx: number
}
export const WorkflowEmailTemplates: React.FC<WorkflowEmailTemplatesProps> = ({
  emails,
  stepId,
  stepIdx,
}) => {
  const templateActions = () => {
    return (
      <Button
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        className="hover:text-primary"
      >
        <Trash2Icon className="text-muted-foreground" />
      </Button>
    )
  }
  return (
    <FeatureCard title="Email Templates" value="showEmailTemplates">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, headerIdx) => {
              const isAction = header === "Action"
              return (
                <TableHead
                  key={`header_${header}_${headerIdx}`}
                  className={isAction ? "text-center" : ""}
                >
                  {header}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails && emails.length > 0 ? (
            emails.map((mail) => (
              <TableRow key={mail.key}>
                <TableCell>{mail.value}</TableCell>
                <TableCell className="text-center">
                  {templateActions()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeaders.length} className="text-center">
                No email templates Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FeatureCard>
  )
}

const tableHeaders = ["Email", "Action"]
