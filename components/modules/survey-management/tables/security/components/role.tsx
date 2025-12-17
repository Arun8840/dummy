import { Button } from "@/components/ui/button"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus } from "lucide-react"

export const TableRole = () => {
  return (
    <CustomCard
      title="Roles"
      className="border-0"
      description="This table allows you to manage roles. You can add or edit roles, and assign permissions to them for flexible and hierarchical access control throughout your application."
    >
      <Button size={"icon-sm"}>
        <Plus />
      </Button>
    </CustomCard>
  )
}
