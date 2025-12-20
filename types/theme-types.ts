type ThemeColors =
  | "Yellow"
  | "Blue"
  | "Violet"
  | "Green"
  | "Teal"
  | "Zinc"
  | "Orange"
  | "Pink"

interface ThemeColorStateParams {
  themeColor: ThemeColors
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}
