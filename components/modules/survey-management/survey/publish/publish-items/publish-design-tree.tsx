"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { CustomCard } from "@/utils/ui/custom-card"
import React, { memo } from "react"

interface TreeNodeProps {
  node: any
  order: number
}
export const PublishTree = memo(() => {
  const template = useSurveyStore((state) => state?.surveyPublisherTemplate)

  // Only render if children is a non-empty array
  if (!template?.publishers?.length) {
    return (
      <CustomCard title={template?.name} className="hidden sm:block h-full">
        <div className="text-muted-foreground text-sm  text-center py-12">
          No items in this template.
        </div>
      </CustomCard>
    )
  }


  return (
    <CustomCard title={template?.name} className="p-1 divide-y h-full">
      {template?.publishers?.map((group, idx) => (
        <TreeNode
          key={group?.id ?? idx}
          node={group}
          order={idx + 1}
        />
      ))}
    </CustomCard>
  )
})

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, order }) => {
  const displayName =
    node?.name === "" || node?.name == null
      ? node?.subComponentType
      : node?.name


  return (
    <div className="flex items-center gap-x-1 pb-1">
      <small>{order} .</small>
      <small>{displayName ?? "Untitled"}</small>
    </div>
  )
})
