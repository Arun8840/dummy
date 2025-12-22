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
  const tables = form.watch("tables")

  return (
    <section className="size-full flex flex-col gap-3">
      <TableFormProvider value={form}>
        {tables?.length > 0 &&
          tables?.map((value, tableIdx) => {
            return (
              <CustomCard
                key={value?.id}
                title={`${tableIdx + 1}. ${value?.name}`}
              >
                <TableMenu menus={value?.menus} tableIdx={tableIdx} />
                <TablePermission
                  permissions={value?.permissions || []}
                  tableIdx={tableIdx}
                />
                <TableRole roles={value?.roles || []} tableIdx={tableIdx} />
              </CustomCard>
            )
          })}
      </TableFormProvider>
    </section>
  )
}
