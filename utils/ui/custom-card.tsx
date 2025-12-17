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
}

const baseClass = "p-2 shadow-none rounded-md gap-2"
export const CustomCard: React.FC<CustomCardTypes> = ({
  title,
  description,
  children,
  className,
  ...OtherProps
}) => {
  return (
    <Card className={cn(baseClass, className)}>
      {(title || description) && (
        <CardHeader className="p-0">
          {title && (
            <CardTitle className="w-fit p-2 ring ring-green-600/40 bg-green-600/10 rounded">
              {title}
            </CardTitle>
          )}
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
