"use client"
import setGlobalColorTheme from "@/lib/theme-colors"
import { ThemeProviderProps, useTheme } from "next-themes"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

// Make sure these types are defined in your project, here are quick definitions:
type ThemeColorStateParams = {
  themeColor: ThemeColors
  setThemeColor: Dispatch<SetStateAction<ThemeColors>>
}

const ThemeContext = createContext<ThemeColorStateParams | undefined>(undefined)

export default function CustomThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  // Load from localStorage or use default
  const getSavedThemeColor = () => {
    try {
      return (
        (typeof window !== "undefined" && localStorage.getItem("themeColor")) ||
        "Blue"
      )
    } catch {
      return "Blue"
    }
  }

  const [themeColor, setThemeColor] = useState<ThemeColors>("Zinc")

  // On mount, set mounted and restore themeColor
  useEffect(() => {
    setIsMounted(true)
    const saved = getSavedThemeColor() as ThemeColors
    setThemeColor(saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When theme or themeColor changes, update localStorage and set global CSS vars
  useEffect(() => {
    if (isMounted && theme) {
      localStorage.setItem("themeColor", themeColor)
      setGlobalColorTheme(theme as "light" | "dark", themeColor)
    }
  }, [themeColor, theme, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

// * hook
export function useCustomTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}
