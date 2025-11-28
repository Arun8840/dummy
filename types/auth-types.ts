// Language key/value pair
export interface Language {
  key: string
  value: string
}

// User structure
export interface User {
  username: string
  clientId: string
  ouId: string
  firstName: string
  lastName: string
  languages: Language[]
  multilingual: boolean
  mfa: boolean
  defaultLanguage: string
  currentLanguage: string
  themeId: string
  image?: string
}

// Landing Page Menu structure
export interface LandingPageMenu {
  id: string
  templateId: string
  containerId: string
  menuId: string
  name: string
  iname: string
  tname: string
  path: string
  iconName: string
  order: number
}

// The combined response for login experience API
export interface LoginExperienceResponse {
  user: User
  landingPageMenu: LandingPageMenu
}
