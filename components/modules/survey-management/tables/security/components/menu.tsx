import { Button } from "@/components/ui/button"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus } from "lucide-react"
import { useTableForm } from "../table-context-provider"

export const TableMenu = () => {
  const form = useTableForm()
  // const {} = form.watch()
  return (
    <CustomCard
      className="border-0"
      title="Menus"
      description="This table allows you to manage menus. You can add or edit menu items, and assign their slot/position so that the menu appears in the main dashboard menu items."
    >
      <Button size={"icon-sm"}>
        <Plus />
      </Button>
    </CustomCard>
  )
}
