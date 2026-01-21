import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Warning } from '@/utils/ui/warning'
import { PublisherComponentType } from '@/types/survey-management/survey-types'
import { publisherComponents } from './publisher-components'


interface MemoizedPublishersProps {
    publisher: PublisherComponentType
}

export const MemoizedPublishers: React.FC<MemoizedPublishersProps> = ({
    publisher,
}) => {
    const publisherType = publisher?.subComponentType
    const Component = publisherComponents[publisherType as keyof typeof publisherComponents]

    if (!Component) {
        return (
            <Warning
                title={`publisher Not Found: ${publisherType}`}
                description="No valid React component was found for this publisher type."
                variant="destructive"
                className="w-full"
            />
        )
    }

    return (
        <Suspense
            fallback={<PublisherSkeleton />}
        >
            <Component value={publisher} />
        </Suspense>
    )
}

const PublisherSkeleton = () => {
    return <Skeleton className="w-full h-28 rounded-xl" />
}
