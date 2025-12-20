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

interface TableMenuProps {
  menus: MenuType[]
  tableIdx: number
}

export const TableMenu: React.FC<TableMenuProps> = ({ menus, tableIdx }) => {
  // *HOOKS
  const form = useTableForm()
  const menuTemplateId = form.watch(`tables.${tableIdx}.menuTemplateId`)
  const {
    isLoading: isSlotLoading,
    data: slots,
    isError,
  } = useGetSlots({ menuTemplateId })
  const { isLoading: isMenuTemplateLoading, data: menuTemplates } =
    useGetMenuTemplates()

  const handleSelectSlot = (slotId: string) => {
    const findSlot = slots?.find((existSlot) => existSlot?.id === slotId)
    console.log(findSlot)
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
      <Badge className="flex items-center gap-1 bg-blue-700 text-primary pr-1 py-1 w-full">
        <span className="mr-1">{value?.action}</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-5 p-0 ml-1 rounded-full"
          type="button"
          onClick={() => removeMenuPermission(value)}
          tabIndex={0}
        >
          <X className="w-4 h-4" />
        </Button>
      </Badge>
    )
  }
  return (
    <CustomCard
      className="border-0 p-0"
      title="Menus"
      description="This table allows you to manage menus. You can add or edit menu items, and assign their slot/position so that the menu appears in the main dashboard menu items."
      CardAction={<SelectMenuTemplate />}
    >
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
                <div className="grid lg:grid-cols-4 gap-2">
                  {menu?.permissions?.map((permission, permissionIdx) => {
                    return (
                      <PermissionChip
                        key={`menuPermission_${permission?.id}`}
                        value={permission}
                      />
                    )
                  })}

                  <Badge
                    variant={"outline"}
                    className="flex items-center gap-1 pr-1 py-1 w-full border border-dashed hover:bg-secondary transition-colors"
                  >
                    <Plus />
                  </Badge>
                </div>
              </CustomCard>
            )
          })}
        {/* // *ADD NEW TABLE MENU */}
        <CustomCard className="grid place-items-center border-dashed hover:bg-secondary transition-colors">
          <Plus />
        </CustomCard>
      </div>
    </CustomCard>
  )
}
