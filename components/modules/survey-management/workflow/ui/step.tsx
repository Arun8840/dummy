"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Step as StepType } from "@/types/survey-management/workflow-types"
import { CustomCard } from "@/utils/ui/custom-card"
import { Minus, Trash } from "lucide-react"
import React, { CSSProperties, HTMLAttributes } from "react"

interface StepProps extends HTMLAttributes<HTMLDivElement> {
  value: StepType
  stepIdx: number
}

const baseClass = "w-full flex-1 shadow-md"
export const Step: React.FC<StepProps> = ({ value, className, stepIdx }) => {
  const { name, color } = value
  const stepName = name && name.trim() !== "" ? name : "Step"

  const colorVariables = {
    "--step-color": color,
  } as CSSProperties

  const deleteAction = () => {
    return (
      <Button
        size={"icon-sm"}
        variant={"ghost"}
        type="button"
        className="text-destructive"
      >
        <Minus fill="currentColor" />
      </Button>
    )
  }
  return (
    <div style={colorVariables} className="flex items-center gap-2">
      <Badge className="size-10 rounded-lg z-1">{stepIdx + 1}</Badge>
      <CustomCard
        CardAction={deleteAction()}
        title={stepName}
        className={cn(baseClass, className)}
      >
        <Input placeholder="name" defaultValue={stepName} />
      </CustomCard>
    </div>
  )
}
