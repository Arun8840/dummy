"use client"
import { Role } from "@/types/survey-management/workflow-types"
import { Chip } from "@/utils/ui/chip"
import Droppable from "@/utils/ui/dnd-components/droppable"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"
import { useWorkflowForm } from "../../design/workflow-provider"

interface WorkflowRolesProps {
  stepId: string
  roles: Role[]
  stepIdx: number
}
export const WorkflowRoles: React.FC<WorkflowRolesProps> = ({
  roles,
  stepId,
  stepIdx,
}) => {
  const { edit, setValue } = useWorkflowForm()
  const isEditable = edit?.overAll?.stepId === stepId || false

  // !remove
  const removeRoleToStep = (roleId: string) => {
    const filterRole = roles?.filter((existRole) => existRole?.key !== roleId)
    setValue(`steps.${stepIdx}.roles`, filterRole)
  }
  return (
    <FeatureCard
      title={`Roles (${roles?.length})`}
      value={`showWorkflowRoles_${stepId}`}
    >
      <Droppable
        id={`role-${stepId}`}
        type="roles"
        dropData={{
          stepId: stepId,
        }}
        className="p-1 min-h-fit"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {roles && roles.length > 0 ? (
            roles.map((role, roleIdx) => (
              <Chip
                disabled={!isEditable}
                key={`stepRoles_${role?.key}_${roleIdx}`}
                label={role?.value}
                onRemove={() => removeRoleToStep(role?.key)}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground border border-dashed rounded-lg size-full grid place-items-center min-h-16">
              No roles found. You can add or drop a role here.
            </div>
          )}
        </div>
      </Droppable>
    </FeatureCard>
  )
}

const tableHeaders = ["Email", "Action"]
