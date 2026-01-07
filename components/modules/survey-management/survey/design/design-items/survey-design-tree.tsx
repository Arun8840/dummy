"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { CustomCard } from "@/utils/ui/custom-card"
import React, { memo } from "react"
interface TreeNodeProps {
  node: any
  order: number
  depth: number
}
export const DesignTree = memo(() => {
  const template = useSurveyStore((state) => state?.surveyTemplate)

  // Only render if children is a non-empty array
  if (!template?.children?.length) {
    return (
      <CustomCard title={template?.name} className="hidden sm:block h-full p-1">
        <div className="text-muted-foreground text-center py-12">No items in this template.</div>
      </CustomCard>
    )
  }

  return (
    <CustomCard title={template?.name} className="p-1 divide-y h-full">
      {template?.children?.map((group, idx) =>
        <TreeNode
          key={group?.id ?? idx}
          node={group}
          order={idx + 1}
          depth={0}
        />
      )}
    </CustomCard>
  )
})

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, order, depth }) => {

  const hasChildren = Array.isArray(node?.children) && node.children.length > 0

  // If node.name is an empty string, set it to node.subComponentType
  const displayName = (node?.name === "" || node?.name == null) ? node?.subComponentType : node?.name
  return (
    <div className={depth > 0 ? "pl-3 border-l border-dashed border-primary/40" : ""}>
      <div className="py-0.5">
        <small>
          {order}. {displayName ?? "Untitled"}
        </small>
      </div>
      {hasChildren &&
        node?.children?.map((child: any, idx: number) => (
          <TreeNode
            key={child?.id ?? idx}
            node={child}
            order={idx + 1}
            depth={depth + 1}
          />
        ))}
    </div>
  )
})
