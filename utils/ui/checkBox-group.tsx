import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export interface CheckboxGroupTypes
  extends React.HTMLAttributes<HTMLLabelElement> {
  label: React.ReactNode
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  checkboxProps?: React.ComponentProps<typeof Checkbox>
  labelClassName?: string
  disabled?: boolean
}

export const CheckboxGroup: React.FC<CheckboxGroupTypes> = ({
  label,
  id,
  checked,
  defaultChecked,
  onCheckedChange,
  className,
  labelClassName,
  checkboxProps,
  disabled = false,
  ...rest
}) => (
  <Label
    htmlFor={id}
    className={[
      "flex items-center gap-3 p-2 rounded-lg cursor-pointer has-[[aria-checked=true]]:bg-secondary transition-colors",
      labelClassName,
      className,
      disabled ? "opacity-60 cursor-not-allowed" : "",
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    <Checkbox
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      {...checkboxProps}
    />
    <span className={disabled ? "text-muted-foreground" : undefined}>
      {label}
    </span>
  </Label>
)

export default CheckboxGroup
