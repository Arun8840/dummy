"use client"
import { useSurveyStore } from "@/lib/stores/survey-management/survey"
import { CustomCard } from "@/utils/ui/custom-card"
import SortableItem from "@/utils/ui/dnd-components/sortable-item"
import React, { memo, useState } from "react"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Minus, Plus } from "lucide-react"

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
      <CustomCard title={template?.name} className="hidden sm:block h-full">
        <div className="text-muted-foreground text-center py-12">
          No items in this template.
        </div>
      </CustomCard>
    )
  }

  const categoryIds =
    template?.children?.map((cat) => cat?.id).filter(Boolean) ?? []

  return (
    <CustomCard title={template?.name} className="p-1 divide-y h-full">
      <SortableContext
        items={categoryIds}
        strategy={verticalListSortingStrategy}
      >
        {template?.children?.map((group, idx) => (
          <TreeNode
            key={group?.id ?? idx}
            node={group}
            order={idx + 1}
            depth={0}
          />
        ))}
      </SortableContext>
    </CustomCard>
  )
})

const TreeNode: React.FC<TreeNodeProps> = memo(({ node, order, depth }) => {
  const hasChildren = Array.isArray(node?.children) && node.children.length > 0
  const [expanded, setExpanded] = useState<boolean>(false)
  const displayName =
    node?.name === "" || node?.name == null
      ? node?.subComponentType
      : node?.name

  const sortableParams = {
    sortable: true,
    component: node,
    index: node?.order,
  }

  const questionIds = hasChildren
    ? node?.children?.map((child: any) => child?.id).filter(Boolean) ?? []
    : []

  const handleToggle = () => setExpanded((prev) => !prev)

  return (
    <div
      className={
        depth > 0 ? "pl-3 border-l border-dashed border-primary/40" : ""
      }
    >
      <SortableItem id={node?.id} data={sortableParams}>
        <div className="flex items-center gap-x-1">
          {/* Only show icon if has children */}
          {hasChildren ? (
            expanded ? (
              <Minus
                onClick={handleToggle}
                size={13}
                className="text-destructive cursor-pointer"
              />
            ) : (
              <Plus
                onClick={handleToggle}
                size={13}
                className="text-primary cursor-pointer"
              />
            )
          ) : (
            <small>{order} .</small>
          )}
          <small>{displayName ?? "Untitled"}</small>
        </div>
      </SortableItem>

      {hasChildren && expanded && (
        <SortableContext
          items={questionIds}
          strategy={verticalListSortingStrategy}
        >
          {node?.children?.map((child: any, idx: number) => (
            <TreeNode
              key={child?.id ?? idx}
              node={child}
              order={idx + 1}
              depth={depth + 1}
            />
          ))}
        </SortableContext>
      )}
    </div>
  )
})
