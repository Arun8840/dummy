"use client";

import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSignIcon, Pen } from "lucide-react";
import { FeatureCard } from "@/utils/ui/feature-card";
import { ClientPlan } from "@/types/client-management/client-plan-types";

interface ClientPlanDetailsProps {
  plan: ClientPlan;
}

export const ClientPlanDetails = ({ plan }: ClientPlanDetailsProps) => {
  const {
    name,
    description,
    header,
    subHeader,
    region,
    currency,
    monthlyPrice,
  } = plan || {};

  return (
    <FeatureCard title="Client Plan Information">
      <Table>
        <TableHeader>
          <TableRow>
            {clientPlanTableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{name ?? "-"}</TableCell>
            <TableCell>{description ?? "-"}</TableCell>
            <TableCell>{header ?? "-"}</TableCell>
            <TableCell>{subHeader ?? "-"}</TableCell>
            <TableCell className="text-blue-500">{region ?? "-"}</TableCell>
            <TableCell>{currency ?? "-"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-green-500">
                <DollarSignIcon size={16} />
                <span>{monthlyPrice ?? "-"}</span>
              </div>
            </TableCell>
            <TableCell>
              <Button size="icon-sm" variant="ghost">
                <Pen fill="currentColor" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FeatureCard>
  );
};

const clientPlanTableHeaders = [
  "Name",
  "Description",
  "Header",
  "Sub-Header",
  "Region",
  "Currency",
  "Monthly Price",
  "Edit",
];
