import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { PermissionType, RoleWithPermissions } from "@/types"
import { CustomCard } from "@/utils/ui/custom-card"
import React from "react"
import { useTableForm } from "../table-context-provider"
import { trpc } from "@/trpc/client"
import { Check, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useGetSecurityPermissions } from "@/hooks/use-get-all-security-permissions"
import { useGetResourceRoles } from "@/hooks/use-get-resource-roles copy"
import { Chip } from "@/utils/ui/chip"

type RoleResponseType = {
  key: string
  trigger: boolean | null
  value: string
}
interface TableRoleProps {
  roles: RoleWithPermissions[]
  tableIdx: number
}
export const TableRole: React.FC<TableRoleProps> = ({ roles, tableIdx }) => {
  // *HOOKS
  const form = useTableForm()
  const currentTable = form.getValues(`tables.${tableIdx}`)

  const { isLoading: isRoleLoading, data: resourceRolesItems } =
    useGetResourceRoles()
  const { isLoading: isPermissionLoading, data: permissionItems } =
    useGetSecurityPermissions({
      templateId: currentTable?.containerId ?? "",
      tenant: "table/management",
    })

  const create = trpc.table.addComponent.useMutation()
  const remove = trpc.table.removeComponent.useMutation()
  const assignRoleToPermission = trpc.table.assignRolePermission.useMutation()

  const resourceRoles = resourceRolesItems as RoleResponseType[]
  const allPermissions = permissionItems as PermissionType[]

  const isPending =
    create?.isPending || remove?.isPending || assignRoleToPermission?.isPending
  const isLoading = isRoleLoading || isPermissionLoading

  const addRole = (role: RoleResponseType) => {
    const existed = roles?.some((existRole) => existRole?.roleId === role?.key)
    if (!existed) {
      const request = {
        templateId: currentTable?.containerId as string,
        containerId: currentTable?.id as string,
        componentType: "Role",
        resourceRole: {
          roleId: role.key,
          roleName: role.value,
          permissions: [],
        },
      }
      create.mutate(request, {
        onSuccess(res) {
          toast.success(res?.message, { position: "top-center" })
          const newRole = res?.data as RoleWithPermissions
          const updatedRoles = [...(roles || []), newRole]
          form.setValue(`tables.${tableIdx}.roles`, updatedRoles)
        },
        onError(error) {
          toast.error(error?.message, { position: "top-center" })
        },
      })
      return
    } else {
      const request = {
        componentId: role?.key,
        componentType: "Role",
        containerId: currentTable?.id as string,
        newIndex: -1,
        path: "",
        publish: null,
        subComponentType: "Role",
        templateId: currentTable?.containerId as string,
        column: null,
      }
      const filteredRole = roles?.filter(
        (existRole) => existRole?.roleId !== role?.key
      )
      remove.mutate(request, {
        onSuccess(res) {
          toast.success(res?.message, { position: "top-center" })
          form.setValue(`tables.${tableIdx}.roles`, filteredRole)
        },
        onError(error) {
          toast.error(error?.message, { position: "top-center" })
        },
      })
    }
  }
  const assignPermissionRole = (roleIdx: number, permissionId: string) => {
    const currentRole = roles?.[roleIdx]
    if (!currentRole) return

    const hasPermission = currentRole.permissions?.some(
      (per) => per?.id === permissionId
    )
    const findedPermission = allPermissions?.find(
      (existPer) => existPer?.id === permissionId
    ) as PermissionType

    let updatedPermissions
    if (hasPermission) {
      updatedPermissions = currentRole.permissions.filter(
        (per) => per?.id !== findedPermission?.id
      )
    } else {
      updatedPermissions = [
        ...(currentRole.permissions || []),
        findedPermission,
      ]
    }

    form.setValue(
      `tables.${tableIdx}.roles.${roleIdx}.permissions`,
      updatedPermissions
    )
    const request = {
      templateId: currentTable?.containerId as string,
      tableId: currentTable?.id as string,
      tableRoles: roles,
    }

    assignRoleToPermission.mutate(request, {
      onSuccess(res) {
        toast.success(res?.message, { position: "top-center" })
      },
      onError(error) {
        toast.error(error?.message, { position: "top-center" })
      },
    })
  }
  const roleSelector = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isLoading} className="w-fit">
            {isPending ? <Spinner /> : <Plus />}
            Add Role
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {resourceRoles && resourceRoles.length > 0 ? (
            resourceRoles.map((resourceRole, roleIdx) => {
              const isChecked = roles?.some(
                (selectedRole) => selectedRole?.roleId === resourceRole?.key
              )
              return (
                <DropdownMenuItem
                  disabled={isPending}
                  aria-checked={isChecked}
                  key={resourceRole.key ?? roleIdx}
                  onSelect={(e) => {
                    e?.preventDefault()
                    addRole(resourceRole)
                  }}
                >
                  {isChecked && <Check className="text-primary" />}
                  {resourceRole.value}
                </DropdownMenuItem>
              )
            })
          ) : (
            <DropdownMenuItem disabled>No roles available</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const rolePermissionSelector = (roleIdx: number) => {
    const currentRolePermissions = roles?.[roleIdx]?.permissions || []
    return (
      <Select
        onValueChange={(e) => assignPermissionRole(roleIdx, e)}
        disabled={isLoading || isPending}
      >
        <SelectTrigger className="w-full">Add Role Permission</SelectTrigger>
        <SelectContent>
          {allPermissions?.map((permission, permissionIdx) => {
            const selected = currentRolePermissions?.some(
              (selected) => selected?.id === permission?.id
            )
            return (
              <SelectItem
                aria-checked={selected}
                key={permission?.id ?? permissionIdx}
                value={permission?.id}
                className="aria-checked:bg-accent my-0.5"
              >
                {`${permission?.action} (${permission?.resourceGroup})` ||
                  "Unnamed permission"}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    )
  }
  const getPermissions = (permissions: PermissionType[], roleIdx: number) => {
    return permissions?.map((rolePermission, rolePermissionIdx) => {
      return (
        <Chip
          key={rolePermission?.id ?? rolePermissionIdx}
          label={rolePermission?.action}
          onRemove={() => assignPermissionRole(roleIdx, rolePermission?.id)}
        />
      )
    })
  }
  return (
    <CustomCard
      title="Roles"
      className="border-0"
      description="This table allows you to manage roles. You can add or edit roles, and assign permissions to them for flexible and hierarchical access control throughout your application."
    >
      {roleSelector()}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {roles?.length > 0 &&
          roles?.map((role, roleIdx) => {
            return (
              <CustomCard
                className="gap-0"
                title={`${roleIdx + 1} . ${role?.roleName}`}
                key={`table_role_4645_${role?.roleName}`}
              >
                {rolePermissionSelector(roleIdx)}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2 pt-1">
                  {getPermissions(role?.permissions || [], roleIdx)}
                </div>
              </CustomCard>
            )
          })}
      </div>
    </CustomCard>
  )
}
