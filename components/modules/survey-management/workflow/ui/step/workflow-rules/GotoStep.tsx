import { Rule } from "@/types/survey-management/workflow-types"
import { FeatureCard } from "@/utils/ui/feature-card"
import React from "react"

interface GotoStepProps {
  rule: Rule
}

export const GotoStep: React.FC<GotoStepProps> = ({ rule }) => {
  return <FeatureCard title="Goto Step">Automatically go to step</FeatureCard>
}
