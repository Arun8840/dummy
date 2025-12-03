"use client";

import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { OuUsers } from "@/types/client-management/ou-module-types";
import { DataTable } from "@/utils/ui/data-table/table-component";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Warning } from "@/utils/ui/warning";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { useConfirm } from "@/hooks/use-confirm";

export const InactiveUserTemplates = () => {
  const clientData = useStore((s) => s.loginExp);
  const ouId = clientData?.user?.ouId ?? "";

  const { data, isLoading, isError } =
    trpc.organizationalUnits.getOuInactiveUsers.useQuery({
      ouId,
    });
  const utils = trpc.useUtils();
  const enable = trpc.organizationalUnits.enableUser.useMutation();
  const remove = trpc.organizationalUnits.removeUser.useMutation();
  const [DeleteModal, confirmDelete] = useConfirm(
    "Remove user",
    "This user will be removed from the organizational unit. Are you sure you want to proceed?",
    "destructive"
  );

  if (isLoading) {
    return <Skeleton className="w-full h-[100px]" />;
  }

  if (isError) {
    return (
      <Warning
        title="Error loading users"
        description="There was a problem loading users for this organizational unit. Please try again later."
        variant="destructive"
      />
    );
  }
  const users = data?.data || [];

  // ! enable user
  const handle_enableUser = (email: string) => {
    enable.mutate(
      { email },
      {
        onSuccess: async (data) => {
          toast.success(data.message, {
            position: "top-center",
          });
          // Invalidate both the inactive and active OU user lists for this OU
          await utils.organizationalUnits.getOuInactiveUsers.invalidate({
            ouId,
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

  // ! remove user
  const handleRemoveUser = async (email: string) => {
    const confirm = await confirmDelete();
    if (!confirm || remove.isPending) return;
    remove.mutate(
      { email },
      {
        onSuccess: async (data) => {
          toast.success(data?.message, {
            position: "top-center",
          });
          await utils.organizationalUnits.getOuInactiveUsers.invalidate({
            ouId,
          });
        },
        onError(error) {
          toast.error(error?.message, {
            position: "top-center",
          });
        },
      }
    );
  };

  const columns: ColumnDef<OuUsers>[] = [
    {
      accessorKey: "profilePicture", // Assuming there is a field for user avatar/profile picture
      header: "User",
      cell: ({ row }) => {
        const firstName = row.getValue("firstName") as string;
        const fallBackName = firstName.charAt(0).toUpperCase();
        return (
          <Avatar className="bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {fallBackName}
            </AvatarFallback>
          </Avatar>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("firstName")}</div>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lastName")}</div>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("username")}</div>
      ),
    },
    {
      header: "Enable User",
      cell: ({ row }) => {
        const userRow = row.original;
        return (
          <Switch
            onCheckedChange={() => handle_enableUser(userRow?.username)}
          />
        );
      },
    },
    {
      accessorKey: "roleIds",
      header: "Role",
      cell: ({ row }) => {
        const roleIds = row.getValue("roleIds") as string[];
        return <div>roles</div>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const user = row?.original;
        return (
          <div className="lowercase">
            <Button
              onClick={() => handleRemoveUser(user?.username)}
              size={"icon-sm"}
              variant={"ghost"}
            >
              <Trash2Icon fill="currentColor" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DeleteModal isPending={remove?.isPending} />
      <DataTable
        searchBy="username"
        columns={columns}
        data={users || []}
        title={"Inactive Users"}
      />
    </div>
  );
};
