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
import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import { Pen, Trash2Icon, X } from "lucide-react"
import React from "react"
import { useWorkflowForm } from "../../../design/workflow-provider"
import { Input } from "@/components/ui/input"

interface WorkflowRulesProps {
  stepId: string
  rules: Rule[]
  stepIdx: number
}
export const WorkflowRules: React.FC<WorkflowRulesProps> = ({
  rules,
  stepId,
  stepIdx,
}) => {
  // * HOOKS
  const { edit, setEdit, register } = useWorkflowForm()
  const ruleActions = (ruleIdx: string | null, editted: boolean) => {
    return editted ? (
      <Button
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        className="hover:text-primary"
        onClick={() =>
          setEdit((prev) => ({
            ...prev,
            isRule: {
              ruleId: null,
            },
          }))
        }
      >
        <X className="text-muted-foreground" />
      </Button>
    ) : (
      <>
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          type="button"
          className="hover:text-primary"
          onClick={() =>
            setEdit((prev) => ({
              ...prev,
              isRule: {
                ruleId: ruleIdx,
              },
            }))
          }
        >
          <Pen className="text-muted-foreground" />
        </Button>
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          type="button"
          className="hover:text-primary"
        >
          <Trash2Icon className="text-muted-foreground" />
        </Button>
      </>
    )
  }

  const editAll = edit?.overAll?.stepId === stepId || false

  return (
    <FeatureCard title="Rules" value={`showRules_${stepId}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, headerIdx) => (
              <TableHead
                key={`header_${header}_${headerIdx}`}
                className={header === "Action" ? "text-center" : ""}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules && rules.length > 0 ? (
            rules.map((rule, ruleIdx) => {
              const isEditted =
                edit?.isRule?.ruleId === `${rule?.id}_${ruleIdx}` || editAll
              return (
                <TableRow key={rule.id}>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>
                    {isEditted ? (
                      <Input
                        placeholder="Your title"
                        {...register(
                          `steps.${stepIdx}.rules.${ruleIdx}.ruleTitle`
                        )}
                      />
                    ) : (
                      rule.ruleTitle
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditted ? (
                      <Input
                        placeholder="Your description"
                        {...register(
                          `steps.${stepIdx}.rules.${ruleIdx}.ruleDescription`
                        )}
                      />
                    ) : (
                      rule.ruleDescription
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {ruleActions(`${rule?.id}_${ruleIdx}`, isEditted)}
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeaders.length} className="text-center">
                No Rule Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FeatureCard>
  )
}

const tableHeaders = ["Name", "Title", "Description", "Action"]
