import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react"

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onRemove: () => void
  className?: string
  label: string
}

const baseClass = "flex items-center justify-between"
export const Chip: React.FC<ChipProps> = ({
  onRemove,
  className,
  label,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      variant="secondary"
      type="button"
      tabIndex={0}
      className={cn(baseClass, className)}
    >
      <span>{label}</span>
      {!disabled && (
        <div onClick={onRemove}>
          <X />
        </div>
      )}
    </Button>
  )
}
