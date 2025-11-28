"use client";

import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/utils/ui/data-table/table-component";
import { ColumnDef } from "@tanstack/react-table";
import { OrganizationalUnit } from "@/types/client-management/client-types";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  BadgeCheckIcon,
  BadgeXIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetModalState } from "@/hooks/use-modal-state";
import { ModalDrawer } from "@/utils/ui/modal-drawer";
import { CreateClientOrganizationalUnitForm } from "./create-client-ou-form";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import {
  decryptClient,
  encryptClient,
} from "@/utils/functions/encrypt/client-encryption";

interface ClientDetailsProps {
  clientId: string;
}

export const ClientOuTable = ({
  clientId: clientTemplateId,
}: ClientDetailsProps) => {
  const decryptedClientId = decryptClient(clientTemplateId);
  const ou = trpc.organizationalUnits.getOus.useQuery({
    clientId: decryptedClientId,
  });
  // * hook
  const utils = trpc.useUtils();

  const removeOu = trpc.organizationalUnits.removeOu.useMutation();
  const { open, isOpen, setIsOpen } = useGetModalState({
    value: "create-client-ou",
  });
  const [DeleteModal, confirmDelete] = useConfirm(
    "Remove organizational unit",
    "This organizational unit will be removed from the client. Are you sure you want to proceed?",
    "destructive"
  );
  if (ou.isLoading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  const data = ou?.data?.data || [];

  const createOrganizationalUnit = () => {
    return (
      <Button type="button" onClick={open}>
        <Plus /> Organizational Unit
      </Button>
    );
  };

  // ! remove organizational unit
  const removeOrganizationalUnit = async (ouId: string) => {
    const confirm = await confirmDelete();
    if (!confirm || removeOu.isPending) return;
    removeOu.mutateAsync(
      {
        ouId: ouId,
      },
      {
        onSuccess: async (data) => {
          toast.success(data.message, {
            position: "top-center",
          });
          await utils.organizationalUnits.getOus.invalidate({
            clientId: clientTemplateId,
          });
        },
        onError(error) {
          toast.error(error.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  // ! make default organizational unit
  const setDefaultOrganizationalUnit = async (value: boolean) => {};

  const columns: ColumnDef<OrganizationalUnit>[] = [
    // TODO: "Logo" column placeholder: replace with logo when available.
    {
      accessorKey: "name",
      header: "Ou Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "ouId",
      header: "Ou ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("ouId")}</div>
      ),
    },
    {
      accessorKey: "thirdpartyId",
      header: "Third Party ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("thirdpartyId")}</div>
      ),
    },
    {
      accessorKey: "planName",
      header: "Plan",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("planName")}</div>
      ),
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => {
        const isActive = row.getValue("active") as boolean;
        return isActive ? (
          <BadgeCheckIcon
            className="text-green-600 dark:text-green-400"
            size={16}
          />
        ) : (
          <BadgeXIcon className="text-red-600 dark:text-red-400" size={16} />
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value = row.getValue("status") as string;
        const isPublished = value === "Published";
        return (
          <Badge
            data-published={isPublished}
            variant="secondary"
            className="data-[published=true]:bg-blue-500 data-[published=true]:text-white dark:data-[published=true]:bg-blue-600 dark:text-white"
          >
            <BadgeCheckIcon size={14} className="mr-1" />
            {value}
          </Badge>
        );
      },
    },
    {
      accessorKey: "defaultBu",
      header: "Set Default OU",
      cell: ({ row }) => {
        const isDefaultOu = row.getValue("defaultBu") as boolean;

        return (
          <Switch
            defaultChecked={isDefaultOu}
            onCheckedChange={(checked) => setDefaultOrganizationalUnit(checked)}
          />
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const ou = row.original;
        const encryptedId = encryptClient(ou?.id);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open {ou?.name}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/clients/${clientTemplateId}/ou/${encryptedId}`}>
                  <ArrowUpRight /> {ou?.name}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => removeOrganizationalUnit(ou?.id)}
                variant="destructive"
              >
                <Trash />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="w-full">
      <ModalDrawer
        title="Create Organizational Unit"
        open={isOpen}
        setOpen={setIsOpen}
      >
        <CreateClientOrganizationalUnitForm clientId={clientTemplateId} />
      </ModalDrawer>
      {/* //! delete modal */}
      <DeleteModal isPending={removeOu?.isPending} />
      <DataTable
        createAction={createOrganizationalUnit}
        columns={columns}
        data={data}
        title={"OrganizationalUnit"}
      />
    </div>
  );
};
