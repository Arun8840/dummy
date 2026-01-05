import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import React from "react"

interface WarningProps {
  variant: "default" | "destructive"
  title: string
  description?: string
  className?: string
  actions?: React.ReactElement
}

const baseClass = "w-fit flex flex-col gap-2"
export const Warning = ({
  title,
  variant = "default",
  description,
  className,
  actions
}: WarningProps) => {
  return (
    <div className="size-full flex justify-center items-center">
      <Alert variant={variant} className={cn(baseClass, className)}>
        <AlertTitle className="flex gap-2"><AlertCircle />{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
          {actions}
        </AlertDescription>
      </Alert>
    </div>
  )
}
