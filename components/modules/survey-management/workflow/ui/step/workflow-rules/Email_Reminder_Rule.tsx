import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface Email_Reminder_RuleProps {
  rule: Rule
}

export const Email_Reminder_Rule: React.FC<Email_Reminder_RuleProps> = ({
  rule,
}) => {
  return (
    <FeatureCard title="Email Reminder Rule">
      Send reminder emails for incomplete responses in this step.
    </FeatureCard>
  )
}

const tableHeaders = ["Entity Email", "Actions"]
