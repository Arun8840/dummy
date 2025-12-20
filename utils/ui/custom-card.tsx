import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

interface CustomCardTypes extends HTMLAttributes<HTMLDivElement> {
  title?: string | undefined
  description?: string | undefined
  CardAction?: React.ReactNode
}

const baseClass = "p-2 shadow-none rounded-md gap-2"
export const CustomCard: React.FC<CustomCardTypes> = ({
  title,
  description,
  children,
  className,
  CardAction,
  ...OtherProps
}) => {
  return (
    <Card className={cn(baseClass, className)}>
      {(title || description) && (
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            {title && <CardTitle className="p-2">{title}</CardTitle>}
            {CardAction}
          </div>
          {description && (
            <CardDescription className="text-xs px-1">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="p-1 flex flex-col gap-1">{children}</CardContent>
    </Card>
  )
}
