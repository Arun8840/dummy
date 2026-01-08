"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import React from "react"

interface ModalComponentProps {
  children: React.ReactNode
  title: string
  description?: string
  open: boolean
  setOpen: (value: boolean) => void
  direction?: "top" | "bottom" | "left" | "right"
}

export const ModalDrawer = ({
  children,
  open,
  title,
  description,
  setOpen,
  direction = "right",
}: ModalComponentProps) => {
  // * MODAL WRAPPER

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={direction}>
        <SheetHeader className="pb-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description ?? "Fill out the form below to create a new template."}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col gap-2  overflow-y-auto">
          <div className="size-full  p-3 pt-0">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
