import { Button } from '@/components/ui/button'
import { AssociateTables } from '@/types/survey-management/survey-types'
import { DataTable } from '@/utils/ui/data-table/table-component'
import Droppable from '@/utils/ui/dnd-components/droppable'
import { Warning } from '@/utils/ui/warning'
import { ColumnDef } from '@tanstack/react-table'
import { Minus } from 'lucide-react'
import React from 'react'

interface MasterTableProps {
    publihserId: string
    associatedTables: AssociateTables[]
}

interface FilterColumnProps {
    filters: AssociateTables
    publihserId: string
}
export const MasterTable: React.FC<MasterTableProps> = ({ publihserId, associatedTables }) => {

    const hasTables = Array.isArray(associatedTables) && associatedTables?.length > 0


    return (
        hasTables ?
            <FilterColumns filters={associatedTables?.[0]} publihserId={publihserId} />
            : <Warning
                title='No Master Tables Associated'
                description='There are currently no associated tables. Drag and drop a master table here to associate it with this survey publisher.'
                variant='default'
                className='border-0 bg-inherit'
            />
    )
}


const FilterColumns: React.FC<FilterColumnProps> = ({ filters, publihserId }) => {

    const columns: ColumnDef<AssociateTables>[] = [
        {
            accessorKey: "tableName",
            header: "Table Name",
            cell: ({ row }) => <div className="capitalize">{row.getValue("tableName")}</div>,
        },
        {
            header: "Value",
            cell: ({ row }) => <div className="capitalize">
                Filter columns
            </div>,
        },
        {
            header: "Actions",
            cell: ({ row }) => <div className="capitalize">
                <Button size={"icon-sm"} type='button' variant={"outline"}>
                    <Minus className='text-destructive' />
                </Button>
            </div>,
        }
    ]
    const additionalData = {
        containerId: publihserId,
        componentTemplateId: filters?.table?.templateId,
        tableId: filters?.aaTableId
    }

    return <div>
        <Droppable id={filters?.aaTableId}
            type="associatedTableColumn"
            className='size-full'
            dropData={additionalData}
        >
            <DataTable columns={columns} data={[]} title={`Master Tables - ${filters?.tableName}`} searchBy='tableName' />
        </Droppable>
    </div>
}