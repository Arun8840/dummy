"use client"
import { CustomCard } from "@/utils/ui/custom-card"
import { Minus, Plus, Trash } from "lucide-react"
import { useTableForm } from "../table-context-provider"
import { MenuType, PermissionType } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetSlots } from "@/hooks/use-get-slots"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetMenuTemplates } from "@/hooks/use-get-menu"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import { CreateMenuForm } from "../../module-forms/create-menu-form"
import { CreateMenuPermissionForm } from "../../module-forms/create-permission-form"
import { MenuSchemaInput, PermissionSchemaInput } from "../../schema"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Chip } from "@/utils/ui/chip"

interface TableMenuProps {
  menus: MenuType[]
  tableIdx: number
}

type ModalType = "MENU" | "MENUPERMISSION" | null
interface FormStateType {
  type: ModalType
  menuId: string | null
}

export const TableMenu: React.FC<TableMenuProps> = ({ menus, tableIdx }) => {
  const form = useTableForm()
  const create = trpc.table.addComponent.useMutation()
  const remove = trpc.table.removeComponent.useMutation()
  const save = trpc.table.save.useMutation()

  // Current table and states
  const currentTable = useMemo(
    () => form.getValues(`tables.${tableIdx}`),
    [form, tableIdx]
  )
  const menuTemplateId = form.watch(`tables.${tableIdx}.menuTemplateId`)
  const { isLoading: isSlotLoading, data: slots } = useGetSlots({
    menuTemplateId,
  })
  const { isLoading: isMenuTemplateLoading, data: menuTemplates } =
    useGetMenuTemplates()
  const [showForm, setShowForm] = useState<FormStateType | null>(null)

  // Generic async handler for toast
  const handleMutation = (
    mutateFn: Function,
    request: any,
    { onSuccess, onError }: { onSuccess?: Function; onError?: Function } = {}
  ) =>
    mutateFn(request, {
      onSuccess: (res: any) => {
        toast.success(res?.message, { position: "top-center" })
        onSuccess?.(res)
      },
      onError: (err: any) => {
        toast.error(err?.message ?? "An error occurred", {
          position: "top-center",
        })
        onError?.(err)
      },
    })

  // Save current table
  const saveAction = async () => {
    const request = {
      componentId: currentTable?.id,
      componentType: currentTable?.componentType,
      containerId: currentTable?.containerId,
      newIndex: -1,
      path: "",
      publish: null,
      subComponentType: currentTable?.subComponentType,
      templateId: currentTable?.containerId,
      column: null,
      component: { ...currentTable },
    }
    handleMutation(save.mutate, request)
  }

  // Modal trigger
  const triggerForm = (type: ModalType, menuId?: string | null) => {
    setShowForm(type ? { type, menuId: menuId ?? null } : null)
  }

  // Selecting menu template
  const handleSelectMenuTemplate = async (menuTempId: string) => {
    form.setValue(`tables.${tableIdx}.menuTemplateId`, menuTempId)
    await saveAction()
  }

  // Selecting slot
  const handleSelectSlot = async (slotId: string, menuIdx: number) => {
    const findSlot = slots?.find((s) => s?.id === slotId)
    const currentMenu = currentTable?.menus?.[menuIdx]
    const updatedMenu = {
      ...currentMenu,
      slotId: slotId || "",
      slotName: findSlot?.slotName || "",
      slotType: findSlot?.slotType || "",
      slot: true,
    }
    form.setValue(`tables.${tableIdx}.menus.${menuIdx}`, updatedMenu)
    await saveAction()
  }

  // Create menu
  const handleCreateMenu = async (data: MenuSchemaInput) => {
    const request = {
      templateId: currentTable?.containerId,
      containerId: currentTable?.id,
      componentType: "Menu",
      menu: { ...data },
    }
    handleMutation(create.mutate, request, {
      onSuccess: (res: any) => {
        const updatedMenus = [...(menus ?? []), res?.data]
        form.setValue(`tables.${tableIdx}.menus`, updatedMenus)
        setShowForm(null)
      },
    })
  }

  // Create menu permission
  const handleCreateMenuPermission = async (data: PermissionSchemaInput) => {
    const findMenuIndex = menus?.findIndex((m) => m?.id === showForm?.menuId)
    if (findMenuIndex === -1 || findMenuIndex == null) return
    const currentMenu = menus?.[findMenuIndex]
    if (!currentMenu) return
    const request = {
      templateId: currentTable?.containerId,
      containerId: showForm?.menuId as string,
      componentType: "Permission" as const,
      permissions: [{ ...data }],
    }
    handleMutation(create.mutate, request, {
      onSuccess: (res: any) => {
        const newPermission = Array.isArray(res?.data) ? res?.data[0] : null
        const updatedPermissions = [
          ...(currentMenu.permissions ?? []),
          ...(newPermission ? [newPermission] : []),
        ]
        form.setValue(
          `tables.${tableIdx}.menus.${findMenuIndex}.permissions`,
          updatedPermissions
        )
        setShowForm(null)
      },
    })
  }

  // Remove menu
  const removeMenu = (menu: MenuType) => {
    const request = {
      componentId: menu?.id,
      componentType: "Menu",
      containerId: menu?.containerId,
      newIndex: -1,
      path: "",
      publish: null,
      subComponentType: "Menu",
      templateId: currentTable?.containerId,
      column: null,
    }
    handleMutation(remove.mutate, request, {
      onSuccess: () => {
        const filteredMenu = (menus ?? []).filter((m) => m.id !== menu?.id)
        form.setValue(`tables.${tableIdx}.menus`, filteredMenu)
      },
    })
  }

  // Remove menu permission
  const removeMenuPermission = (
    permission: PermissionType,
    menuIdx: number
  ) => {
    const currentMenu = menus?.[menuIdx]?.id
    const request = {
      componentId: permission?.id,
      componentType: "Permission",
      containerId: currentMenu,
      newIndex: -1,
      path: "",
      publish: null,
      subComponentType: "Permission",
      templateId: currentTable?.containerId,
      column: null,
    }
    handleMutation(remove.mutate, request, {
      onSuccess: () => {
        const filteredPermissions = (
          menus?.[menuIdx]?.permissions ?? []
        ).filter((p) => p.id !== permission.id)
        form.setValue(
          `tables.${tableIdx}.menus.${menuIdx}.permissions`,
          filteredPermissions
        )
      },
    })
  }

  // Select menu template component
  const SelectMenuTemplate = () => (
    <Select
      onValueChange={handleSelectMenuTemplate}
      defaultValue={menuTemplateId ?? ""}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Menu Template" />
      </SelectTrigger>
      <SelectContent>
        {menuTemplates?.length > 0 ? (
          menuTemplates.map((t) => (
            <SelectItem key={t?.id} value={t?.id}>
              {t?.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="" disabled>
            No menu templates found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )

  // Select slot component
  const SelectSlot = ({
    defaultValue,
    menuIdx,
  }: {
    defaultValue: string | null
    menuIdx: number
  }) => (
    <Select
      onValueChange={(e) => handleSelectSlot(e, menuIdx)}
      defaultValue={defaultValue ?? ""}
    >
      <SelectTrigger
        disabled={isSlotLoading || !slots?.length}
        className="w-full"
      >
        <SelectValue placeholder="Select Menu Slot" />
      </SelectTrigger>
      <SelectContent>
        {slots?.length ? (
          slots
            .filter((s) => !!s?.id)
            .map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))
        ) : (
          <SelectItem value="__no_slots_found__" disabled>
            No slots found select menu template
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )

  if (isMenuTemplateLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {Array.from({ length: menus?.length || 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-30" />
        ))}
      </div>
    )
  }

  return (
    <CustomCard
      className="border-0 p-0"
      title="Menus"
      description="This table allows you to manage menus. You can add or edit menu items, and assign their slot/position so that the menu appears in the main dashboard menu items."
      CardAction={<SelectMenuTemplate />}
    >
      {showForm?.type === "MENU" ? (
        <CreateMenuForm
          isPending={create.isPending}
          onCreate={handleCreateMenu}
          onClose={() => setShowForm(null)}
        />
      ) : showForm?.type === "MENUPERMISSION" ? (
        <CreateMenuPermissionForm
          isPending={create.isPending}
          onCreate={handleCreateMenuPermission}
          onClose={() => setShowForm(null)}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {(menus || []).map((menu, menuIdx) => (
            <CustomCard
              title={`${menuIdx + 1} . ${menu?.name}`}
              key={menu?.id}
              className="p-1 gap-0 hover:shadow transition-shadow"
              CardAction={
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="ml-auto"
                  disabled={remove.isPending}
                  onClick={() => removeMenu(menu)}
                  aria-label="Remove menu"
                >
                  <Minus color="red" />
                </Button>
              }
            >
              <SelectSlot
                defaultValue={menu?.slotId ?? null}
                menuIdx={menuIdx}
              />
              <div className="flex items-center flex-wrap gap-2 mt-1">
                {(menu?.permissions ?? []).map((permission, permissionIdx) => (
                  <Chip
                    disabled={remove.isPending}
                    label={permission?.action}
                    key={permission?.id}
                    onRemove={() => removeMenuPermission(permission, menuIdx)}
                  />
                ))}
                <Button
                  onClick={() => triggerForm("MENUPERMISSION", menu?.id)}
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-dashed"
                >
                  <Plus />
                </Button>
              </div>
            </CustomCard>
          ))}
          {/* Add new menu */}
          <Button
            onClick={() => triggerForm("MENU")}
            type="button"
            variant="outline"
            className="size-full border-dashed min-h-30"
          >
            <Plus />
          </Button>
          {remove.isPending && (
            <div className="col-span-full text-center animate-pulse">
              <Badge variant={"secondary"} className="mx-auto">
                Removing . . .
              </Badge>
            </div>
          )}
        </div>
      )}
    </CustomCard>
  )
}
