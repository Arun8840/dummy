"use client"
import { Badge } from "@/components/ui/badge"
import { FeatureCard } from "@/utils/ui/feature-card"
import { BadgeCheckIcon, Send } from "lucide-react"
import { WorkflowProps } from "."
import { Button } from "@/components/ui/button"

export const WorkflowInfo = ({ template }: WorkflowProps) => {
  const { status, name, createdBy, modifiedBy } = template
  const isPublished = status === "Published"
  return (
    <FeatureCard
      title={`${name} Info`}
      value="showWorkflowInfo"
      className="flex flex-col"
    >
      <div className="flex items-center gap-3">
        <Badge data-published={isPublished}>
          <BadgeCheckIcon size={16} />
          {status}
        </Badge>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div>
            <span className="font-medium text-muted-foreground mr-1">
              Created By:
            </span>
            <span>{createdBy}</span>
          </div>
          <div>
            <span className="font-medium text-muted-foreground mr-1">
              Last Updated By:
            </span>
            <span>{modifiedBy}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size={"sm"} variant="default">
            <Send />
            Publish
          </Button>
          <Button size={"sm"} variant="outline">
            Modify
          </Button>
        </div>
      </div>
    </FeatureCard>
  )
}
