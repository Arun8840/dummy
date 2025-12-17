import { Button } from "@/components/ui/button"
import { CustomCard } from "@/utils/ui/custom-card"
import { Plus } from "lucide-react"
import React from "react"

export const TablePermission = () => {
  return (
    <CustomCard
      className="border-0"
      title="Permissions"
      description="This table allows you to manage permissions. You can add or edit permissions, and assign them to roles for fine-grained access control throughout your application."
    >
      <Button size={"icon-sm"}>
        <Plus />
      </Button>
    </CustomCard>
  )
}
