"use client"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus, X } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CreateMenuForm } from "../../module-forms/create-menu-form"
import { CreateMenuPermissionForm } from "../../module-forms/create-permission-form"
import { MenuSchemaInput } from "../../schema"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
interface TableMenuProps {
  menus: MenuType[]
  tableIdx: number
}

type ModalType = "MENU" | "MENUPERMISSION" | "PERMISSION" | null

export const TableMenu: React.FC<TableMenuProps> = ({ menus, tableIdx }) => {
  // *HOOKS
  const form = useTableForm()
  const create = trpc.table.createMenu.useMutation()
  const currentTable = form?.getValues(`tables.${tableIdx}`)
  const menuTemplateId = form.watch(`tables.${tableIdx}.menuTemplateId`)
  const {
    isLoading: isSlotLoading,
    data: slots,
    isError,
  } = useGetSlots({ menuTemplateId })
  const { isLoading: isMenuTemplateLoading, data: menuTemplates } =
    useGetMenuTemplates()
  const [showForm, setShowForm] = useState<ModalType>(null)

  const triggerForm = (type: ModalType) => {
    setShowForm(type)
  }
  const handleSelectSlot = (slotId: string) => {
    const findSlot = slots?.find((existSlot) => existSlot?.id === slotId)
    console.log(findSlot)
  }

  // *CREATE MENU
  const handleCreateMenu = async (data: MenuSchemaInput) => {
    const request = {
      templateId: currentTable?.containerId,
      containerId: currentTable?.id,
      componentType: "Menu",
      menu: {
        ...data,
      },
    }
    create.mutate(request, {
      onSuccess(res) {
        toast.success(res?.message, {
          position: "top-center",
        })
        const updatedMenus = [...menus, res?.data] as MenuType[]
        form.setValue(`tables.${tableIdx}.menus`, updatedMenus)
        triggerForm(null)
      },
      onError(error) {
        toast.success(error?.message, {
          position: "top-center",
        })
      },
    })
  }

  const removeMenuPermission = (value: PermissionType) => {
    console.log(value)
  }

  if (isMenuTemplateLoading) {
    return <Skeleton className="h-10" />
  }

  const SelectMenuTemplate = () => {
    return (
      <Select
        onValueChange={(e) =>
          form.setValue(`tables.${tableIdx}.menuTemplateId`, e)
        }
        defaultValue={menuTemplateId || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder={"Select Menu Template"} />
        </SelectTrigger>
        <SelectContent>
          {menuTemplates?.length > 0 ? (
            menuTemplates?.map((template) => {
              return (
                <SelectItem
                  key={`menuTemplate_${template?.id}`}
                  value={template?.id}
                >
                  {template?.name}
                </SelectItem>
              )
            })
          ) : (
            <SelectItem value="" disabled>
              No menu templates found
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    )
  }

  const SelectSlot = ({ defaultValue }: { defaultValue: string | null }) => {
    return (
      <Select
        onValueChange={handleSelectSlot}
        defaultValue={defaultValue || ""}
      >
        <SelectTrigger
          disabled={isSlotLoading || slots?.length === 0}
          className="w-full"
        >
          <SelectValue placeholder="Select Menu Slot" />
        </SelectTrigger>
        <SelectContent>
          {slots?.length > 0 ? (
            slots
              .filter((slot) => !!slot?.id)
              .map((slot) => {
                return (
                  <SelectItem key={`slotMenu_${slot.id}`} value={slot.id}>
                    {slot.name}
                  </SelectItem>
                )
              })
          ) : (
            <SelectItem value="__no_slots_found__" disabled>
              No slots found select menu template
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    )
  }

  const PermissionChip = ({ value }: { value: PermissionType }) => {
    return (
      <Button
        variant="secondary"
        type="button"
        onClick={() => removeMenuPermission(value)}
        tabIndex={0}
      >
        <small>{value?.action}</small>
        <X />
      </Button>
    )
  }

  return (
    <CustomCard
      className="border-0 p-0"
      title="Menus"
      description="This table allows you to manage menus. You can add or edit menu items, and assign their slot/position so that the menu appears in the main dashboard menu items."
      CardAction={<SelectMenuTemplate />}
    >
      {showForm === "MENU" ? (
        <CreateMenuForm
          isPending={create?.isPending}
          onCreate={handleCreateMenu}
          onClose={() => setShowForm(null)}
        />
      ) : showForm === "MENUPERMISSION" ? (
        <CreateMenuPermissionForm onClose={() => setShowForm(null)} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {menus &&
            menus?.map((menu, menuIdx) => {
              return (
                <CustomCard
                  title={`${menuIdx + 1}.${menu?.name}`}
                  key={`tableMenu_${menu?.id}`}
                  className="p-1 gap-0 hover:shadow transition-shadow"
                >
                  <SelectSlot defaultValue={menu?.slotName || null} />
                  {/* //* menu permission items */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {menu?.permissions?.map((permission, permissionIdx) => {
                      return (
                        <PermissionChip
                          key={`menuPermission_${permission?.id}`}
                          value={permission}
                        />
                      )
                    })}

                    <Button
                      onClick={() => triggerForm("MENUPERMISSION")}
                      type="button"
                      variant={"outline"}
                      className="size-full border-dashed"
                    >
                      <Plus />
                    </Button>
                  </div>
                </CustomCard>
              )
            })}
          {/* // *ADD NEW TABLE MENU */}

          <Button
            onClick={() => triggerForm("MENU")}
            type="button"
            variant={"outline"}
            className="size-full border-dashed min-h-30"
          >
            <Plus />
          </Button>
        </div>
      )}
    </CustomCard>
  )
}
