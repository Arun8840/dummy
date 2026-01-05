import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface Email_Notification_Status_RuleProps {
  rule: Rule
}

export const Email_Notification_Status_Rule: React.FC<
  Email_Notification_Status_RuleProps
> = ({ rule }) => {
  return (
    <FeatureCard title="Email Notification Status Rule">
      Configure notifications to be sent when the status changes in this step.
    </FeatureCard>
  )
}
