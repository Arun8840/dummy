import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface WarningProps {
  variant: "default" | "destructive"
  title: string
  description?: string
}
export const Warning = ({
  title,
  variant = "default",
  description,
}: WarningProps) => {
  return (
    <div className="size-full flex justify-center items-center">
      <Alert variant={variant} className="w-fit">
        <AlertCircle />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  )
}
