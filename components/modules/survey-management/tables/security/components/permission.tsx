"use client"
import { Button } from "@/components/ui/button"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus } from "lucide-react"
import { useTableForm } from "../table-context-provider"
import { trpc } from "@/trpc/client"
import { PermissionType } from "@/types"
import React, { useState } from "react"
import { Chip } from "@/utils/ui/chip"
import { PermissionSchemaInput } from "../../schema"
import { CreateMenuPermissionForm } from "../../module-forms/create-permission-form"
import { toast } from "sonner"

interface TablePermissionProps {
  permissions: PermissionType[]
  tableIdx: number
}
export const TablePermission: React.FC<TablePermissionProps> = ({
  permissions = [],
  tableIdx,
}) => {
  // *HOOKS
  const form = useTableForm()
  const currentTable = form.getValues(`tables.${tableIdx}`)
  const [permissionForm, setPermissionForm] = useState(false)
  const create = trpc.table.addComponent.useMutation()
  const remove = trpc.table.removeComponent.useMutation()

  const triggerForm = () => {
    setPermissionForm(!permissionForm)
  }
  const handleCreatePermission = async (data: PermissionSchemaInput) => {
    const request = {
      templateId: currentTable?.containerId as string,
      containerId: currentTable?.id,
      componentType: "Permission" as const,
      permissions: [
        {
          ...data,
        },
      ],
    }

    create.mutate(request, {
      onSuccess(res) {
        toast.success(res?.message, {
          position: "top-center",
        })
        const newPermission = Array.isArray(res?.data)
          ? (res?.data as PermissionType[])
          : []
        const updatedPermission = [
          ...permissions,
          newPermission?.[0],
        ] as PermissionType[]

        form.setValue(`tables.${tableIdx}.permissions`, updatedPermission)
        triggerForm()
      },
      onError(error) {
        toast.success(error?.message, {
          position: "top-center",
        })
      },
    })
  }

  const removePermission = (permission: PermissionType) => {
    const request = {
      componentId: permission?.id,
      componentType: "Permission",
      containerId: permission?.containerId,
      newIndex: -1,
      path: "",
      publish: null,
      subComponentType: "Permission",
      templateId: currentTable?.containerId as string,
      column: null,
    }

    const filteredPermission = permissions?.filter(
      (existPermission) => existPermission?.id !== permission?.id
    )
    remove.mutate(request, {
      onSuccess(res) {
        toast.success(res?.message, {
          position: "top-center",
        })
        form.setValue(`tables.${tableIdx}.permissions`, filteredPermission)
      },
      onError(error) {
        toast.success(error?.message, {
          position: "top-center",
        })
      },
    })
  }
  return (
    <CustomCard
      className="border-0"
      title="Permissions"
      description="This table allows you to manage permissions. You can add or edit permissions, and assign them to roles for fine-grained access control throughout your application."
    >
      {permissionForm ? (
        <CreateMenuPermissionForm
          onCreate={handleCreatePermission}
          onClose={triggerForm}
          isPending={create?.isPending}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {permissions?.map((permission, permissionIdx) => {
            return (
              <Chip
                key={`permission_dnfasnfsafd_${permissionIdx}`}
                label={permission?.action}
                onRemove={() => removePermission(permission)}
              />
            )
          })}
          <Button
            onClick={triggerForm}
            type="button"
            size={"icon"}
            variant={"outline"}
            className="border-dashed"
          >
            <Plus />
          </Button>
        </div>
      )}
    </CustomCard>
  )
}
