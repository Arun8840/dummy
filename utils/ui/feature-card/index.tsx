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
}
const baseClass = "w-full border rounded-lg bg-card"
export const FeatureCard = ({
  children,
  title,
  className,
}: FeatureCardProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className={cn(baseClass, className)}
    >
      <AccordionItem value="item-1">
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
