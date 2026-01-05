import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface Survey_Pdf_Transfer_RuleProps {
  rule: Rule
}

export const Survey_Pdf_Transfer_Rule: React.FC<
  Survey_Pdf_Transfer_RuleProps
> = ({ rule }) => {
  return (
    <FeatureCard title="Survey PDF Transfer Rule">
      Automatically transfer generated Survey PDFs from this step.
    </FeatureCard>
  )
}
