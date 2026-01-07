type ThemeColors =
  | "Yellow"
  | "Blue"
  | "Violet"
  | "Green"
  | "Teal"
  | "Zinc"
  | "Orange"
  | "Pink"
  | "CandyLand"
  | "BoldTech"

interface ThemeColorStateParams {
  themeColor: ThemeColors
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}
