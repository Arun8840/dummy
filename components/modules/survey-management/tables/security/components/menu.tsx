"use client"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus } from "lucide-react"
import { useTableForm } from "../table-context-provider"
import { MenuType } from "@/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetSlots } from "@/hooks/use-get-slots"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetMenuTemplates } from "@/hooks/use-get-menu"

interface TableMenuProps {
  menus: MenuType[]
  tableIdx: number
  menuTemplateId: string
}
interface SelectSlotProps {
  handleSelect: (value: MenuType) => void
}
export const TableMenu: React.FC<TableMenuProps> = ({ menus, tableIdx, menuTemplateId }) => {
  // *HOOKS
  const form = useTableForm()
  const { isLoading, data: slots, isError } = useGetSlots({ menuTemplateId })
  const { isLoading: isMenuTemplateLoading, data: menuTemplates } = useGetMenuTemplates()

  const handleSelectSlot = (slotValue: MenuType) => {

  }

  if (isLoading || isMenuTemplateLoading) {
    return <Skeleton className="h-10" />
  }

  console.log(menuTemplates)
  return (
    <CustomCard
      className="border-0 p-0"
      title="Menus"
      description="This table allows you to manage menus. You can add or edit menu items, and assign their slot/position so that the menu appears in the main dashboard menu items."
    >
      <div className="grid grid-cols-6 gap-1">
        {
          menus && menus?.map((menu, menuIdx) => {
            return <CustomCard title={`${menuIdx + 1}.${menu?.name}`} key={`tableMenu_${menu?.id}`} className="p-1 gap-0">
              <SelectSlot handleSelect={handleSelectSlot} />
            </CustomCard>
          })
        }
        {/* // *ADD NEW TABLE MENU */}
        <CustomCard className="grid place-items-center border-dashed hover:bg-secondary transition-colors min-h-40">
          <Plus />
        </CustomCard>
      </div>
    </CustomCard>
  )
}

const SelectSlot = ({ handleSelect }: SelectSlotProps) => {
  return <Select>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select Menu Slot" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
}