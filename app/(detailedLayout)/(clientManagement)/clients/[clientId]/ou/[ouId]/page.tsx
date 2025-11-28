import React from "react"

interface OuPageProps {
  params: {
    ouId: string
  }
}
export default async function ouPage({ params }: OuPageProps) {
  const { ouId } = await params
  return <div>ouPage:{ouId}</div>
}
