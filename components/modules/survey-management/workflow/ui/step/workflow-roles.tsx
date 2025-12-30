"use client"
import { Role } from "@/types/survey-management/workflow-types"
import { Chip } from "@/utils/ui/chip"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface WorkflowRolesProps {
  stepId: string
  roles: Role[]
  stepIdx: number
}
export const WorkflowRoles: React.FC<WorkflowRolesProps> = ({
  roles,
  stepId,
}) => {
  return (
    <FeatureCard
      title={`Roles (${roles?.length})`}
      value={`showWorkflowRoles_${stepId}`}
    >
      <div>
        {roles && roles.length > 0 ? (
          roles.map((role, roleIdx) => (
            <Chip
              key={`stepRoles_${role?.key}`}
              label={role?.value}
              onRemove={() => console.log("called")}
            />
          ))
        ) : (
          <span className="text-center">No Roles Found</span>
        )}
      </div>
    </FeatureCard>
  )
}

const tableHeaders = ["Email", "Action"]
