"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";
import { trpc } from "@/trpc/client";
import { OuUsers } from "@/types/client-management/ou-module-types";
import { DataTable } from "@/utils/ui/data-table/table-component";
import { ModalDrawer } from "@/utils/ui/modal-drawer";
import { ColumnDef } from "@tanstack/react-table";
import { Pen, Plus } from "lucide-react";
import { CreateUserForm } from "../module-forms/create-user-form";
import { useGetModalState } from "@/hooks/use-modal-state";
import { useGetRoles } from "@/hooks/use-get-roles";
import { toast } from "sonner";

export default function UserTemplates() {
  const clientData = useStore((s) => s.loginExp);
  const clientId = clientData?.user?.clientId ?? "";
  const ouId = clientData?.user?.ouId ?? "";

  // * hook
  const utils = trpc.useUtils();
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-client-user",
  });
  const { data: publihsedRole, isLoading: isRoleLoading } = useGetRoles();
  const { isLoading, data } = trpc.clientAdmin.users.getAllUsers.useQuery({
    clientId: clientId,
  });
  const disable = trpc.organizationalUnits.disableUser.useMutation();

  const userItems = data?.data || [];

  if (isLoading) {
    return (
      <div className="size-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  // ! disable user
  const handle_disableUser = (email: string) => {
    disable.mutate(
      { email },
      {
        onSuccess: async (data) => {
          toast.success(data.message, {
            position: "top-center",
          });

          await utils.clientAdmin.users.getAllUsers.invalidate({ clientId });
        },
        onError(error) {
          toast.error(error.message, {
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
      header: "Disable User",
      cell: ({ row }) => {
        const userRow = row.original;
        return (
          <Switch
            onCheckedChange={() => handle_disableUser(userRow?.username)}
            defaultChecked
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
      cell: ({ row }) => (
        <div className="lowercase">
          <Button size={"icon-sm"} variant={"ghost"}>
            <Pen fill="currentColor" />
          </Button>
        </div>
      ),
    },
  ];

  // * create user
  const createUser = () => {
    return (
      <Button
        title="Create Client"
        type="button"
        size={"sm"}
        variant="gradient"
        className="w-full sm:w-auto"
        onClick={open}
      >
        <Plus /> Create User
      </Button>
    );
  };
  return (
    <div>
      <ModalDrawer
        title="Create User"
        description="Fill out the form below to create a new user."
        open={isOpen}
        setOpen={setIsOpen}
      >
        <CreateUserForm
          clientId={clientId!}
          publihsedRoles={{
            loading: isRoleLoading,
            data: publihsedRole,
          }}
          ouId={ouId}
        />
      </ModalDrawer>
      <DataTable
        searchBy="username"
        columns={columns}
        data={userItems}
        title={"Users"}
        createAction={createUser}
      />
    </div>
  );
}
