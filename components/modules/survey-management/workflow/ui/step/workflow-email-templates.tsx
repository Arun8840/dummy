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
import Droppable from "@/utils/ui/dnd-components/droppable"
import { FeatureCard } from "@/utils/ui/feature-card"
import { Minus } from "lucide-react"
import React from "react"
import { useWorkflowForm } from "../../design/workflow-provider"

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
  // * HOOKS
  const { setValue, edit } = useWorkflowForm()
  const isEditable = edit?.overAll?.stepId === stepId

  const tableHeaders = ["Email", isEditable ? "Action" : undefined]?.filter(
    Boolean
  )
  const removeEmail = (emailId: string) => {
    const filterEmails = emails?.filter(
      (existEmail) => existEmail?.key !== emailId
    )
    setValue(`steps.${stepIdx}.emailTemplates`, filterEmails)
  }

  const templateActions = (emailId: string) => {
    return isEditable ? (
      <Button
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        title="Remove"
        className="hover:text-primary"
        onClick={() => removeEmail(emailId)}
      >
        <Minus className="text-destructive" />
      </Button>
    ) : null
  }
  return (
    <FeatureCard title="Email Templates" value="showEmailTemplates">
      <Droppable
        id={`emailTemplate-${stepId}`}
        type="step"
        dropData={{
          stepId: stepId,
        }}
        className="p-1 min-h-fit"
      >
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
                    {templateActions(mail?.key)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center"
                >
                  No email templates Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Droppable>
    </FeatureCard>
  )
}
