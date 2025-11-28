"use client";

import { trpc } from "@/trpc/client";
import { ModulePropsTypes } from "../ou-modules";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { OuUsers } from "@/types/client-management/ou-module-types";
import { DataTable } from "@/utils/ui/data-table/table-component";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Warning } from "@/utils/ui/warning";
import { ModalDrawer } from "@/utils/ui/modal-drawer";
import { CreateUserForm } from "./module-forms/create-user-form";
import { useGetModalState } from "@/hooks/use-modal-state";
import { useGetRoles } from "@/hooks/use-get-roles";

export const Users = ({ ouId }: ModulePropsTypes) => {
  // * hook
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-ou-user",
  });
  const { data: publihsedRole, isLoading: isRoleLoading } = useGetRoles();

  const { data, isLoading, isError } =
    trpc.organizationalUnits.getOuUsers.useQuery({
      ouId,
    });

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
      cell: ({ row }) => <Switch defaultChecked />,
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
      cell: ({ row }) => <div className="lowercase"></div>,
    },
  ];

  const createUser = () => {
    return (
      <Button onClick={open} size={"sm"}>
        <Plus />
        Create User
      </Button>
    );
  };

  return (
    <div>
      <ModalDrawer
        title="Create Organizational Unit User"
        description="Fill out the form below to create a new user for this Organizational Unit."
        open={isOpen}
        setOpen={setIsOpen}
      >
        <CreateUserForm
          publihsedRoles={{
            loading: isRoleLoading,
            data: publihsedRole,
          }}
        />
      </ModalDrawer>
      <DataTable
        searchBy="username"
        columns={columns}
        data={users || []}
        title={"Users"}
        createAction={createUser}
      />
    </div>
  );
};
