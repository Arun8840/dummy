"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCustomTheme } from "@/context/Theme-provider"
import { cn } from "@/lib/utils"
import { SwatchBook } from "lucide-react"
import { useTheme } from "next-themes"
import React from "react"

type ThemeOption = {
  name: string
  light: string
  dark: string
}

type ThemeSelectorProps = {
  className?: string
}
const availableColors: ThemeOption[] = [
  {
    name: "Yellow",
    light: "bg-yellow-400",
    dark: "bg-yellow-700",
  },
  {
    name: "Blue",
    light: "bg-blue-400",
    dark: "bg-blue-700",
  },
  {
    name: "Violet",
    light: "bg-violet-400",
    dark: "bg-violet-700",
  },
  {
    name: "Green",
    light: "bg-green-400",
    dark: "bg-green-700",
  },
  {
    name: "Teal",
    light: "bg-teal-400",
    dark: "bg-teal-700",
  },
  {
    name: "Zinc",
    light: "bg-zinc-400",
    dark: "bg-zinc-700",
  },
  {
    name: "Orange",
    light: "bg-orange-400",
    dark: "bg-orange-700",
  },
  {
    name: "Pink",
    light: "bg-pink-300",
    dark: "bg-pink-700",
  },
]

const baseClass = "shadow-none"
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
  const { themeColor, setThemeColor } = useCustomTheme()
  const { theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"icon"}
          className={cn(baseClass, className)}
          variant="outline"
          aria-label="Select theme color"
        >
          <SwatchBook />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableColors.map((color, idx) => (
          <DropdownMenuItem
            key={color.name}
            onSelect={() => setThemeColor(color.name as ThemeColors)}
            className={`${
              themeColor === color.name ? "bg-accent" : ""
            } mb-0.5 last:mb-0`}
          >
            <span
              className={`size-3 rounded-full ${
                theme === "light" ? color.light : color.dark
              }`}
            />
            <small>{color.name}</small>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
