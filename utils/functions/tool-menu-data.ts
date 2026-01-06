import { ToolMenuType } from "@/types/dashboard-types"
import * as Icons from "lucide-react"

const menuData: Record<string, ToolMenuType[]> = {
  "/client": [
    {
      title: "Design",
      url: "#",
      icon: Icons.Pen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Icons.Settings,
    },
  ],
  "/client/ou": [
    {
      title: "Roles",
      url: "/roles",
      icon: Icons.Star,
    },
    {
      title: "Users",
      url: "/users",
      icon: Icons.User,
    },
    {
      title: "Inactive Users",
      url: "/inactiveUsers",
      icon: Icons.UserRoundX,
    },
    {
      title: "Users Group",
      url: "/userGroup",
      icon: Icons.Users,
    },
  ],
  "/table": [
    {
      title: "Design",
      url: "/table",
      icon: Icons.Pen,
    },
    {
      title: "Preview",
      url: "id/preview",
      icon: Icons.Eye,
    },
    {
      title: "Publish",
      url: "/publish",
      icon: Icons.Send,
    },
    {
      title: "Security",
      url: "/security",
      icon: Icons.ShieldHalfIcon,
    },
  ],
  "/surveyDesign": [
    {
      title: "Design",
      url: "/",
      icon: Icons.Pen,
    },
    {
      title: "Preview",
      url: "id/preview",
      icon: Icons.Eye,
    },
    {
      title: "Publish",
      url: "/publish",
      icon: Icons.Send,
    },
    {
      title: "Security",
      url: "/security",
      icon: Icons.ShieldHalfIcon,
    },
    {
      title: "settings",
      url: "/settings",
      icon: Icons.Settings,
    },
  ],
}

export const toolMenu = (currentPath: string): ToolMenuType[] => {
  const backItem: ToolMenuType = {
    title: "Back",
    url: null,
    icon: Icons.ArrowLeft,
  }

  if (currentPath.startsWith("/client")) {
    return [...menuData["/client"], backItem]
  }
  // Check for path like /clients/:clientId/ou and match to /client/ou menu data
  const clientsOuRegex = /^\/clients\/[^\/]+\/ou/
  const tableRegex = /^\/table\/[^\/]+/
  const surveyRegex = /^\/surveyDesign\/[^\/]+/
  if (clientsOuRegex.test(currentPath)) {
    return [...menuData["/client/ou"], backItem]
  }
  if (tableRegex.test(currentPath)) {
    return [...menuData["/table"], backItem]
  }
  if (surveyRegex.test(currentPath)) {
    return [...menuData["/surveyDesign"], backItem]
  }
  return [backItem]
}
