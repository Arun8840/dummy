"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"
import superjson from "superjson"
import { AppRouter } from "./routers"
import { makeQueryClient } from "./query-client"
import { signOut } from "next-auth/react"
export const trpc = createTRPCReact<AppRouter>()
let clientQueryClientSingleton: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient())
}

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return ""
    if (process.env.NEXT_CLIENT_SERVICE_BASE_URL)
      return process.env.NEXT_CLIENT_SERVICE_BASE_URL
    return "http://localhost:3000"
  })()
  return `${base}/api/trpc`
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
          async fetch(input, init) {
            const res = await fetch(input, init)

            if (res?.status === 401) {
              await signOut({ redirectTo: "/auth/login" })
            }
            return res
          },
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
