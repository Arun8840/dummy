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
import { getDate } from "@/utils/functions/helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, Pen } from "lucide-react";
import { FeatureCard } from "@/utils/ui/feature-card";
import { decryptClient } from "@/utils/functions/encrypt/client-encryption";

interface ClientDetailsProps {
  clientId: string;
}

export const ClientDetails = ({
  clientId: clientTemplateId,
}: ClientDetailsProps) => {
  const decryptedClientId = decryptClient(clientTemplateId);

  const client = trpc.clients.template.useQuery({
    clientId: decryptedClientId,
  });

  if (client.isLoading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  const {
    name,
    active,
    createdUserId,
    email,
    status,
    modifiedDate,
    modifiedUserId,
    clientId,
  } = client?.data?.data || {};

  const modifiedDateString = getDate(modifiedDate);
  return (
    <FeatureCard title="Client Information">
      <Table>
        <TableHeader>
          <TableRow>
            {clientTableHeaders.map((header, idx) => (
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
            <TableCell>{clientId}</TableCell>
            <TableCell>{email}</TableCell>
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
            <TableCell>{createdUserId}</TableCell>
            <TableCell>{modifiedUserId}</TableCell>
            <TableCell>{modifiedDateString}</TableCell>
            <TableCell>
              <Switch defaultChecked={active} />
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
const clientTableHeaders = [
  "Name",
  "ClientId",
  "Email",
  "Status",
  "Created By",
  "Last Updated By",
  "Last Updated Date",
  "Active",
  "Action",
];
