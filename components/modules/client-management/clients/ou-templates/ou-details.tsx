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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, Pen } from "lucide-react";
import { FeatureCard } from "@/utils/ui/feature-card";
import { decryptClient } from "@/utils/functions/encrypt/client-encryption";

interface ClientDetailsProps {
  ouId: string;
}

export const OuDetails = ({ ouId: ouTemplateId }: ClientDetailsProps) => {
  const decryptedOuId = decryptClient(ouTemplateId);

  const organizationalUnit = trpc.organizationalUnits.getOuById.useQuery({
    ouId: decryptedOuId,
  });

  if (organizationalUnit.isLoading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  const { name, ouId, clientName, thirdpartyId, planName, status } =
    organizationalUnit?.data?.data || {};

  return (
    <FeatureCard title="Organizational Unit Information">
      <Table>
        <TableHeader>
          <TableRow>
            {ouTableHeaders.map((header, idx) => (
              <TableHead
                key={header}
                className={header === "Action" ? "text-right" : undefined}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{ouId}</TableCell>
            <TableCell>{clientName}</TableCell>
            <TableCell>{thirdpartyId}</TableCell>
            <TableCell>{planName}</TableCell>
            <TableCell>
              <Badge
                data-published={status === "Published"}
                variant="secondary"
                className=" data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
              >
                <BadgeCheckIcon />
                {status}
              </Badge>
            </TableCell>

            <TableCell>
              <Switch />
            </TableCell>
            <TableCell className="text-right">
              <Button variant={"ghost"} size={"icon-sm"}>
                <Pen fill="currentColor" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FeatureCard>
  );
};

const ouTableHeaders = [
  "Name",
  "Ou Number",
  "Client",
  "Third Party ID",
  "Plan Name",
  "Status",
  "Active",
  "Action",
];
