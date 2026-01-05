import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface Flex_Flow_RuleProps {
  rule: Rule
}

export const Flex_Flow_Rule: React.FC<Flex_Flow_RuleProps> = ({ rule }) => {
  return (
    <FeatureCard title="Flex Flow Rule">
      Configure flexible workflow routing in this step.
    </FeatureCard>
  )
}
