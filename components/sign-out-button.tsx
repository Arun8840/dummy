"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import React from "react"

interface SignOutButtonProps {
  children?: React.ReactNode | undefined | null
  className?: string
}

const baseClass = "shadow-none"
export default function SignOutButton({
  children,
  className,
}: SignOutButtonProps) {
  const signOuthandler = () => {
    signOut({ callbackUrl: "/auth/login" })
  }
  return (
    <Button
      variant={"destructive"}
      className={cn(baseClass, className)}
      onClick={signOuthandler}
      size={"sm"}
    >
      {children ?? <h1>"Sign-out"</h1>}
    </Button>
  )
}
