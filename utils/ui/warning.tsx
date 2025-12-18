import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

interface WarningProps {
  variant: "default" | "destructive"
  title: string
  description?: string
  className?: string
}

const baseClass = "w-fit"
export const Warning = ({
  title,
  variant = "default",
  description,
  className
}: WarningProps) => {
  return (
    <div className="size-full flex justify-center items-center">
      <Alert variant={variant} className={cn(baseClass, className)}>
        <AlertCircle />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  )
}
