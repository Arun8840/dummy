"use client"
import { Skeleton } from '@/components/ui/skeleton'
import { trpc } from '@/trpc/client'
import { CustomCard } from '@/utils/ui/custom-card'
import { Warning } from '@/utils/ui/warning'
import { Pie, PieChart, Tooltip } from 'recharts';
import { CustomTooltip } from '../custom-tooltip'
import CustomLabel from '../custom-label'


export const Assignments = () => {
    const { isPending, isError, data } = trpc.mainDashboard.getAssignments.useQuery()

    if (isPending) {
        return (
            <Skeleton className='size-full' />
        )
    }

    if (isError) {
        return (
            <Warning
                title="Failed to Load Assignments"
                description="An error occurred while retrieving your survey assignments. Please try again later or contact support if this issue persists."
                variant="destructive"
                className='border-none lg:w-1/2 bg-inherit'
            />
        )
    }

    const assignments = data?.data

    const realData = assignments?.values && assignments?.values?.map((val, valIdx) => {
        return {
            name: val?.label, value: val?.data, fill: val?.color
        }
    })

    return (
        <CustomCard
            title={assignments?.title}
            description="View and manage surveys currently assigned to you. Track your progress and upcoming deadlines from this dashboard."
            className='divide-y'
        >
            <PieChart
                className='size-full flex-1 text-xs'
                responsive>
                <Pie
                    data={realData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    isAnimationActive={false}
                    label={(props) => <CustomLabel {...props} />}
                />
                <Tooltip
                    content={<CustomTooltip />}
                />
            </PieChart>
        </CustomCard>
    )
}
