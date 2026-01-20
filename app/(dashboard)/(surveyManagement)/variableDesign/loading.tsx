import { Spinner } from "@/components/ui/spinner"
import React from "react"

export default function loading() {
  return (
    <div className="size-full grid place-items-center">
      <Spinner />
    </div>
  )
}
