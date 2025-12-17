import React, { createContext, useContext } from "react"
import { UseFormReturn } from "react-hook-form"
import { TableTemplate } from "@/types/survey-management/table-types"

type TableFormContextType = UseFormReturn<TableTemplate>

const TableFormContext = createContext<TableFormContextType | undefined>(
  undefined
)

export const useTableForm = () => {
  const context = useContext(TableFormContext)
  if (!context) {
    throw new Error("useTableForm must be used within a TableFormProvider")
  }
  return context
}

interface TableFormProviderProps {
  value: TableFormContextType
  children: React.ReactNode
}

export const TableFormProvider: React.FC<TableFormProviderProps> = ({
  value,
  children,
}) => (
  <TableFormContext.Provider value={value}>
    {children}
  </TableFormContext.Provider>
)
