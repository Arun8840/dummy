"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";

interface ModalComponentProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const ModalDrawer = ({
  children,
  open,
  title,
  description,
  setOpen,
}: ModalComponentProps) => {
  // * MODAL WRAPPER

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description ?? "Fill out the form below to create a new template."}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex items-center justify-center overflow-y-auto">
          <div className="w-full h-full max-w-lg  p-3 pt-0">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
