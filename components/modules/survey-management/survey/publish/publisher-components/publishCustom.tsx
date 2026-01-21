import { DesignPublihserComponentProps } from '@/types'

import React from 'react'
import { Wrapper } from '../wrapper'
import { MasterTable } from '../master-table'
import Droppable from '@/utils/ui/dnd-components/droppable'

export const PublishCustom: React.FC<DesignPublihserComponentProps> = ({ value }) => {
    const additionalData = {
        containerId: value?.id
    }
    return (
        <Wrapper publihser={value}>
            <Droppable id={value?.id}
                type="associatedTable"
                className='size-full'
                dropData={additionalData}
            >
                <MasterTable publihserId={value?.id} associatedTables={value?.associatedTables} />
            </Droppable>
        </Wrapper>
    )
}
