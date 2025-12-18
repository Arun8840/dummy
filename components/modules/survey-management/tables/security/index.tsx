"use client"
import { TableTemplate } from "@/types/survey-management/table-types"
import React from "react"
import { TableMenu, TablePermission, TableRole } from "./components"
import { useForm } from "react-hook-form"
import { TableFormProvider } from "./table-context-provider"
import { CustomCard } from "@/utils/ui/custom-card"

interface TableSecurityProps {
  template: TableTemplate
}
export const TableSecurity: React.FC<TableSecurityProps> = ({ template }) => {
  const form = useForm<TableTemplate>({
    defaultValues: template,
  })

  const tables = form.getValues("tables")
  return (
    <section className="flex flex-col gap-2">

      <TableFormProvider value={form}>
        {tables?.length > 0 &&
          tables?.map((value, tableIdx) => {
            return (
              <CustomCard
                key={value?.id}
                title={value?.name}
                className="divide-y"
              >
                <TableMenu menus={value?.menus} tableIdx={tableIdx} menuTemplateId={value?.menuTemplateId} />
                {/* <TablePermission permissions={[]} tableIdx={tableIdx} />
                <TableRole roles={[]} tableIdx={tableIdx} /> */}
              </CustomCard>
            )
          })}
      </TableFormProvider>
    </section>
  )
}
