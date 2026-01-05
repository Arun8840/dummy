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
import { Minus, Pen, X } from "lucide-react"
import React, { Suspense } from "react"
import { useWorkflowForm } from "../../../design/workflow-provider"
import { Input } from "@/components/ui/input"
import Droppable from "@/utils/ui/dnd-components/droppable"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

interface WorkflowRulesProps {
  stepId: string
  rules: Rule[]
  stepIdx: number
}

const ruleFeatureComponents = {
  Auto_Assign_Entity_Email: dynamic(
    () =>
      import("./Auto_Assign_Entity_Email").then(
        (mod) => mod.Auto_Assign_Entity_Email
      ),
    { ssr: false }
  ),
  Email_Notification_Status_Rule: dynamic(
    () =>
      import("./Email_Notification_Status_Rule").then(
        (mod) => mod.Email_Notification_Status_Rule
      ),
    { ssr: false }
  ),
  Email_Reminder_Rule: dynamic(
    () =>
      import("./Email_Reminder_Rule").then((mod) => mod.Email_Reminder_Rule),
    { ssr: false }
  ),
  Flex_Flow_Rule: dynamic(
    () => import("./Flex_Flow_Rule").then((mod) => mod.Flex_Flow_Rule),
    { ssr: false }
  ),
  GotoStep: dynamic(() => import("./GotoStep").then((mod) => mod.GotoStep), {
    ssr: false,
  }),
  Survey_Pdf_Transfer_Rule: dynamic(
    () =>
      import("./Survey_Pdf_Transfer_Rule").then(
        (mod) => mod.Survey_Pdf_Transfer_Rule
      ),
    { ssr: false }
  ),
}

export const WorkflowRules: React.FC<WorkflowRulesProps> = ({
  rules,
  stepId,
  stepIdx,
}) => {
  // * HOOKS
  const { edit, setEdit, register, setValue } = useWorkflowForm()
  // * HOOKS
  const isEditable = edit?.overAll?.stepId === stepId

  // ! remove rule
  const removeRule = (ruleId: string) => {
    const filterRules = rules?.filter((existRule) => existRule?.id !== ruleId)
    setValue(`steps.${stepIdx}.rules`, filterRules)
  }
  const ruleActions = (ruleId: string | null, editted: boolean) => {
    return editted ? (
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
                ruleId: null,
              },
            }))
          }
        >
          <X className="text-muted-foreground" />
        </Button>
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          type="button"
          className="hover:text-primary"
          onClick={() => removeRule(ruleId as string)}
        >
          <Minus className="text-destructive" />
        </Button>
      </>
    ) : (
      <Button
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        className="hover:text-primary"
        onClick={() =>
          setEdit((prev) => ({
            ...prev,
            isRule: {
              ruleId: ruleId,
            },
          }))
        }
      >
        <Pen className="text-muted-foreground" />
      </Button>
    )
  }

  return (
    <FeatureCard title="Rules" value={`showRules_${stepId}`}>
      {/* //* DROPPED RULES */}
      <Droppable
        id={`emailRules-${stepId}`}
        type="step"
        dropData={{
          stepId: stepId,
        }}
        className="p-1 min-h-fit"
      >
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
                  edit?.isRule?.ruleId === rule?.id || isEditable
                return (
                  <TableRow key={rule.id}>
                    <TableCell>{rule?.subComponentType}</TableCell>
                    <TableCell>
                      {isEditted ? (
                        <Input
                          placeholder="Your title"
                          defaultValue={rule?.ruleTitle}
                          onBlur={(e) =>
                            setValue(
                              `steps.${stepIdx}.rules.${ruleIdx}.ruleTitle`,
                              e?.target?.value
                            )
                          }
                        />
                      ) : (
                        rule.ruleTitle
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditted ? (
                        <Input
                          placeholder="Your description"
                          defaultValue={rule?.ruleDescription}
                          onBlur={(e) =>
                            setValue(
                              `steps.${stepIdx}.rules.${ruleIdx}.ruleDescription`,
                              e?.target?.value
                            )
                          }
                        />
                      ) : (
                        rule.ruleDescription
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {ruleActions(`${rule?.id}`, isEditted)}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center"
                >
                  No Rule Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Droppable>

      {/* //* special feature rule components */}
      {rules?.map((rule, ruleIdx) => {
        const SpecialComponent =
          ruleFeatureComponents?.[
            rule?.subComponentType as keyof typeof ruleFeatureComponents
          ]
        if (!SpecialComponent) return null
        return (
          <Suspense
            key={`${rule?.subComponentType}_${rule?.id}`}
            fallback={<Skeleton className="h-10" />}
          >
            <SpecialComponent rule={rule} />
          </Suspense>
        )
      })}
    </FeatureCard>
  )
}

const tableHeaders = ["Name", "Title", "Description", "Action"]
