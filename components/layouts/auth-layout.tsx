import React from "react"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="bg-background">{children}</section>
}
