import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface FeatureCardProps {
  children: React.ReactNode;
  title: string;
}
export const FeatureCard = ({ children, title }: FeatureCardProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full border rounded-lg"
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
  );
};
