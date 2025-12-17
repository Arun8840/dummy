import { ColumnDef } from "@tanstack/react-table"
import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface DataTableProps<TData, TValue> {
  initialPageSize?: number
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string | null
  searchBy?: string
  createAction?: React.ComponentType<ButtonProps>
}
