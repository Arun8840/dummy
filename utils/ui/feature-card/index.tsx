import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import React from "react"

interface FeatureCardProps {
  children: React.ReactNode
  title: string
  className?: string
  value?: string
}
const baseClass = "w-full border rounded-lg bg-card"
export const FeatureCard = ({
  children,
  title,
  className,
  value = "Item",
}: FeatureCardProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={value}
      className={cn(baseClass, className)}
    >
      <AccordionItem value={value}>
        <AccordionTrigger className="rounded-none px-3">
          {title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance px-4 font-sans">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
