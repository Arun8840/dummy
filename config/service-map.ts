// src/config/service-map.ts
export const SERVICE_MAP = {
  auth: "https://skyapp.aadhavan.com/api/auth/v1",
  app: "https://skyapp.aadhavan.com/api/app/v1",
  user: "https://skyapp.aadhavan.com/api/user/v1",
  dashboard: "https://skyapp.aadhavan.com/api/dashboard/v1",
} as const

export type TenantKey = keyof typeof SERVICE_MAP
