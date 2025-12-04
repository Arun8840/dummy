"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  BadgeCheckIcon,
  BadgeXIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTable } from "@/utils/ui/data-table/table-component";

import { getDate } from "@/utils/functions/helpers";
import { Badge } from "@/components/ui/badge";
import { useGetModalState } from "@/hooks/use-modal-state";
import { ModalDrawer } from "@/utils/ui/modal-drawer";
import Link from "next/link";
import { encryptClient } from "@/utils/functions/encrypt/client-encryption";
import { ClientPlan } from "@/types/client-management/client-plan-types";

interface ClientTemplateDataProps {
  data: ClientPlan[];
}

// Correct columns for workflow templates (field names and accessorKeys)
const columns: ColumnDef<ClientPlan>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientName")}</div>
    ),
  },

  {
    accessorKey: "ouName",
    header: () => <div className="text-left">Organizational Unit</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("ouName")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status") as "Draft" | "Published";
      const isPublished = value === "Published";
      return (
        <Badge
          data-published={isPublished}
          variant="secondary"
          className=" data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
        >
          <BadgeCheckIcon />
          {value}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const template = row.original;
      const encryptedId = encryptClient(template?.id);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/clientPlan/${encryptedId}`}>
                <ArrowUpRight /> {template?.name}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ClientPlanTableData({ data }: ClientTemplateDataProps) {
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-client-plan",
  });

  const createAction = () => {
    return (
      <Button
        title="Create Client"
        type="button"
        onClick={open}
        size={"sm"}
        variant="gradient"
        className="w-full sm:w-auto"
      >
        <Plus /> Create Client Plan
      </Button>
    );
  };
  return (
    <div className="w-full">
      {/* <ModalDrawer title="Create Client" open={isOpen} setOpen={setIsOpen}>
        <CreateClientForm />
      </ModalDrawer> */}
      <DataTable
        createAction={createAction}
        columns={columns}
        data={data || []}
        title={"Client Plans"}
      />
    </div>
  );
}
