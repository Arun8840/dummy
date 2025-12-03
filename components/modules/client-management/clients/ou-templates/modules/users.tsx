"use client"

import { trpc } from "@/trpc/client"
import { ModulePropsTypes } from "../ou-modules"
import { Skeleton } from "@/components/ui/skeleton"
import { ColumnDef } from "@tanstack/react-table"
import { OuUsers } from "@/types/client-management/ou-module-types"
import { DataTable } from "@/utils/ui/data-table/table-component"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Pen, Plus } from "lucide-react"
import { Warning } from "@/utils/ui/warning"
import { ModalDrawer } from "@/utils/ui/modal-drawer"
import { CreateUserForm } from "./module-forms/create-user-form"
import { useGetModalState } from "@/hooks/use-modal-state"
import { useGetRoles } from "@/hooks/use-get-roles"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

export const Users = ({ ouId, clientId }: ModulePropsTypes) => {
  // * hook
  const { open, isOpen, setIsOpen, close } = useGetModalState({
    value: "create-ou-user",
  })
  const { data: publihsedRole, isLoading: isRoleLoading } = useGetRoles()
  const utils = trpc.useUtils()
  const { data, isLoading, isError } =
    trpc.organizationalUnits.getOuUsers.useQuery({
      ouId,
    })
  const disable = trpc.organizationalUnits.disableUser.useMutation()

  if (isLoading) {
    return <Skeleton className="w-full h-[100px]" />
  }

  if (isError) {
    return (
      <Warning
        title="Error loading users"
        description="There was a problem loading users for this organizational unit. Please try again later."
        variant="destructive"
      />
    )
  }
  const users = data?.data || []
  // ! disable user
  const handle_disableUser = (email: string) => {
    disable.mutate(
      { email },
      {
        onSuccess: async (data) => {
          toast.success(data.message, {
            position: "top-center",
          })
          await Promise.all([
            utils.organizationalUnits.getOuInactiveUsers.invalidate({ ouId }),
            utils.organizationalUnits.getOuUsers.invalidate({ ouId }),
          ])
        },
        onError(error) {
          toast.error(error.message, {
            position: "top-center",
          })
        },
      }
    )
  }
  const columns: ColumnDef<OuUsers>[] = [
    {
      accessorKey: "profilePicture", // Assuming there is a field for user avatar/profile picture
      header: "User",
      cell: ({ row }) => {
        const firstName = row.getValue("firstName") as string
        const fallBackName = firstName.charAt(0).toUpperCase()
        return (
          <Avatar className="bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {fallBackName}
            </AvatarFallback>
          </Avatar>
        )
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
        const userRow = row.original
        return (
          <Switch
            onCheckedChange={() => handle_disableUser(userRow?.username)}
            defaultChecked
          />
        )
      },
    },
    {
      accessorKey: "roleIds",
      header: "Role",
      cell: ({ row }) => {
        const roleIds = row.getValue("roleIds") as string[]
        return <div>roles</div>
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
  ]

  const createUser = () => {
    return (
      <Button
        title="Create Client"
        type="button"
        onClick={open}
        size={"sm"}
        variant="gradient"
        className="w-full sm:w-auto"
      >
        <Plus /> Create User
      </Button>
    )
  }

  return (
    <div>
      <ModalDrawer
        title="Create Organizational Unit User"
        description="Fill out the form below to create a new user for this Organizational Unit."
        open={isOpen}
        setOpen={setIsOpen}
      >
        <CreateUserForm
          clientId={clientId!}
          ouId={ouId}
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
  )
}
