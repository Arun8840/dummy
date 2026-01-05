import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Rule } from "@/types/survey-management/workflow-types"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface Auto_Assign_Entity_EmailProps {
  rule: Rule
}

export const Auto_Assign_Entity_Email: React.FC<
  Auto_Assign_Entity_EmailProps
> = ({ rule }) => {
  return (
    <FeatureCard
      title={`${rule?.name} (${rule?.columns?.length || 0})`}
      value={`Columns: ${rule?.columns?.length || 0}`}
    >
      <Droppable
        id={`step-rule-table-${rule?.id}`}
        type="step"
        dropData={{
          stepId: rule?.containerId,
        }}
        className="p-1 min-h-fit"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entity Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rule?.columns && rule?.columns?.length > 0 ? (
              rule?.columns?.map((column, columnIdx) => {
                return (
                  <TableRow key={column?.key}>
                    <TableCell>{column?.value}</TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={rule?.columns?.length}
                  className="text-center"
                >
                  No Column Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Droppable>
    </FeatureCard>
  )
}
